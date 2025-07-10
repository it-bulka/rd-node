import type { ClassType, Token, InstanceWrapper, Provider } from './types'

class Container {
  #registered = new Map<Token, InstanceWrapper>();

  register<T extends Token>(token: T, provider: Provider | ClassType, isController: boolean = false) {
    if(this.#registered.get(token)) throw new Error('Token already registered')
    const wrapper = this.defineRegisterWrapper(provider, isController)
    this.#registered.set(token, wrapper);
  }

  resolve(token: Token): InstanceType<ClassType> {
    const wrapper = this.#registered.get(token)
    if(!wrapper) {
      const t = token as any
      const tokenName: string  = t.name || t.description || t
      throw new Error(`Token ${tokenName} is not registered.`)
    }

    if (!wrapper.isResolved) {
      wrapper.instance = this.defineInstance(wrapper)
      wrapper.isResolved = true
    }

    return wrapper.instance
  }

  private defineInstance(wrapper: InstanceWrapper) {
    if('useValue' in wrapper) return wrapper.useValue

    if('useClass'  in wrapper) {
      const deps = this.resolveConstructorDeps(wrapper.useClass, wrapper.provider)
      return new wrapper.useClass(...deps)
    }
  }

  private resolveConstructorDeps(cls: ClassType, token: Token) {
    const paramTypes: ClassType[] = Reflect.getMetadata('design:paramtypes', cls) || [];

    return paramTypes.map(dep => {
      if(dep === token) throw new Error(`Circular dependency detected for token ${token.name}.`)
      return this.resolve(dep)
    });
  }

  private defineRegisterWrapper(provider: Provider | ClassType, isController: boolean = false): InstanceWrapper {
    if('useValue' in provider) return provider
    if('useClass' in provider) return provider

    // if controllers: [Class] or providers: [Class]
    return {
      provider,
      useClass: provider,
      isController
    }
  }
}

export const  container = new Container()
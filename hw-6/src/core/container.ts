import { ClassType } from './types'

class Container {
  #singletones = new Map();
  #registered = new Map();

  register<T extends Function>(token: T, member: T) {
    if(this.#registered.get(token)) throw new Error('Token already registered');
    this.#registered.set(token, member);
  }

  resolve<T>(token: ClassType<T>): T {
    if(this.#singletones.has(token)) return this.#singletones.get(token)

    const cls = this.#registered.get(token)
    if(!cls)  throw new Error(`Token ${token.name} is not registered.`)

    const deps = Reflect.getMetadata('design:paramtypes', token) as ClassType[] ?? []
    const resolved = new cls(...deps.map(d => {
      if(d === token) throw new Error(`Circular dependency detected for token ${token.name}.`)

      return this.resolve(d)
    }))

    this.#singletones.set(token, resolved)
    return resolved
  }
}

export const  container = new Container()
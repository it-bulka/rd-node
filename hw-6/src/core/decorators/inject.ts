import { META_KEYS } from '@core/consts'

type InjectionMetadata = {
  where: 'constructor'
  token: string | Symbol
  index: number
} | {
  where: 'property'
  token: string | Symbol
  name: string | Symbol
}

export function Inject(token: string | Symbol): ParameterDecorator & PropertyDecorator  {
  return function (target, propertyKey, parameterIndex?) {
    if (typeof parameterIndex === 'number') {
      if (propertyKey === undefined) {
        // Constructor injection
        const injections: InjectionMetadata[] = Reflect.getMetadata(META_KEYS.token_injection, target) || []
        injections.push({ where: 'constructor', token, index: parameterIndex })
        Reflect.defineMetadata(META_KEYS.token_injection, injections, target)
      } else {
        // Method injection
        throw Error(`Invalid token ${token} injection. Only constructor or property injection available with @Inject`)
      }
    } else if (propertyKey !== undefined && parameterIndex === undefined) {
      // Property injection
      const injections: InjectionMetadata[] = Reflect.getMetadata(META_KEYS.token_injection, target.constructor)  || []

      injections.push({ where: 'property', token, name: propertyKey })
      Reflect.defineMetadata(META_KEYS.token_injection, injections, target)
    }
  }
}
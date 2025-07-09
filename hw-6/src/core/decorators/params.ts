import { META_KEYS } from '../consts'
import { ArgumentMetadata } from '../types';

export function Param(data?: string): ParameterDecorator {
  return function (target, propertyKey, index){
    const name = propertyKey as string
    const ps = Reflect.getMetadata('design:paramtypes', target, name) ?? []
    const metatype = ps[index]

    const params: ArgumentMetadata[] = Reflect.getMetadata(META_KEYS.params, target.constructor) ?? []
    params.push({ index, metatype, type: 'param', data, name })

    Reflect.defineMetadata(META_KEYS.params, params, target.constructor)
  }
}

export function Body(data?: string): ParameterDecorator {
  return function (target, propertyKey, index){
    const name = propertyKey as string
    const ps = Reflect.getMetadata('design:paramtypes', target, name) ?? []
    const metatype = ps[index]

    const params: ArgumentMetadata[] = Reflect.getMetadata(META_KEYS.params, target.constructor) ?? []
    params.push({ index, metatype, type: 'body', name })

    Reflect.defineMetadata(META_KEYS.params, params, target.constructor)
  }
}

export function Query(data?: string): ParameterDecorator {
  return function (target, propertyKey, index){
    const name = propertyKey as string
    const ps = Reflect.getMetadata('design:paramtypes', target, name) ?? []
    const metatype = ps[index]

    const params: ArgumentMetadata[] = Reflect.getMetadata(META_KEYS.params, target.constructor) ?? []
    params.push({ index, metatype, type: 'query', data, name })

    Reflect.defineMetadata(META_KEYS.params, params, target.constructor)
  }
}
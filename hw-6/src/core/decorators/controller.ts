import { META_KEYS } from '@core/consts'

export function Controller(prefix: string = ''): ClassDecorator {
  return function (target){
    Reflect.defineMetadata(META_KEYS.prefix, prefix, target)
  }
}

export function isController(target: any) {
  return Reflect.hasMetadata(META_KEYS.prefix, target)
}
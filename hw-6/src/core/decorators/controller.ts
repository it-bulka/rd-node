import { META_KEYS } from '@core/consts'
import { ClassType } from '@core/types';

export function Controller(prefix: string = ''): ClassDecorator {
  return function (target){
    Reflect.defineMetadata(META_KEYS.prefix, { prefix }, target)
  }
}

export function isController(target: any) {
  return Reflect.hasMetadata(META_KEYS.prefix, target)
}

export function assertIsController(Ctr: any, parentModule: ClassType) {
  const controllerMeta = Reflect.getMetadata(META_KEYS.prefix, Ctr)
  if (!controllerMeta) {
    throw new Error(`Not valid controller ${Ctr.name || String(Ctr)} in ${parentModule.name}`)
  }

  return controllerMeta
}
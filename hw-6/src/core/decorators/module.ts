import { META_KEYS } from '@core/consts'
import { ModuleType } from '@core/types'

export function Module(metadata: ModuleType ) {
  return function (target: any) {
    Reflect.defineMetadata(META_KEYS.module, metadata, target)
  }
}
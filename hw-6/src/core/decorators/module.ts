import { META_KEYS } from '@core/consts'

export function Module(metadata: { controllers?: any[], providers?: any[] }) {
  return function (target: any) {
    Reflect.defineMetadata(META_KEYS.module, metadata, target)
  }
}
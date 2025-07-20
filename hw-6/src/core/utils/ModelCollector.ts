import { ClassType, ModuleType } from '@core/types'
import { META_KEYS } from '@core/consts';
// TODO: add logic for exports dependencies
export class ModuleCollector {
  modules = new Set<ClassType>()

  collect(module: ClassType) {
    const moduleMeta: ModuleType | undefined = Reflect.getMetadata(META_KEYS.module, module)
    if(!moduleMeta) {
      const name = module.name || String(module)
      throw new Error(`${name} is not a valid module`)
    }

    if(!this.modules.has(module)) {
      this.modules.add(module)
    }

    moduleMeta.imports?.forEach(m => this.collect(m))

    return this.modules
  }
}

export const modulesCollector = new ModuleCollector();
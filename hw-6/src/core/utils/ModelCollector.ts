import { ModuleType } from '@core/types'
// TODO: add logic for exports dependencies
export class ModuleCollector {
  modules = new Set<ModuleType>()

  collect(module: ModuleType) {
    if(!this.modules.has(module)) {
      this.modules.add(module)
    }

    module.imports?.forEach(m => this.collect(m))

    return this.modules
  }
}

export const modulesCollector = new ModuleCollector();
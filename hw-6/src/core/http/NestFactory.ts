import express, { Router, Express } from 'express'
import { META_KEYS } from '@core/consts'
import { ModuleType, RoutesMetadata } from '@core/types'
import { FilterType, PipeType, GuardType } from '@core/decorators'
import { container } from '@core/container'
import { asyncHandler } from '@core/http/aync.handler'
import { GuardsMiddleware } from '@core/http/guards.middleware'
import { FiltersMiddleware } from '@core/http/filters.middleware'
import { PipeMiddleware } from '@core/http/pipes.middleware'
import { modulesCollector } from '@core/utils'

export class NestFactory {
  #app: Express = express()
  #router: Router = express.Router()

  protected globalGuards: GuardType[] = []
  protected globalPipes: PipeType[] = []
  protected globalFilters: FilterType[] = []

  private static instance: NestFactory | null = null
  private constructor() {}


  static create(appModule: ModuleType) {
    if (!NestFactory.instance) NestFactory.instance = new NestFactory()
    const instance = NestFactory.instance

    const modules = modulesCollector.collect(appModule)
    modules.forEach(instance.proccesControllers)

    const PORT = 3000
    instance.#app.listen(PORT, () =>{
      console.log(`Listening on: ${PORT}`)
    })

    return {
      useGlobalGuards: (...guards: GuardType[]): void => { instance.globalGuards.push(...guards) },
      useGlobalPipes: (...pipes: PipeType[]): void => { instance.globalPipes.push(...pipes) },
      useGlobalFilters: (...filters: FilterType[]): void => { instance.globalFilters.push(...filters) },
      set: instance.#app.set,
      use: instance.#app.use
    }
  }

  proccesControllers(module: ModuleType) {
    const getMeta = Reflect.getMetadata

    const metamodule: ModuleType = getMeta(META_KEYS.module, module)
    if (!metamodule) return

    for (let Ctr of metamodule.controllers) {
      // TODO: add register via Inject(token)
      container.register(Ctr, Ctr, true)

      const prefix: string = getMeta(META_KEYS.prefix, Ctr)
      const routes: RoutesMetadata = getMeta(META_KEYS.routes, Ctr)

      const controllerInstance = container.resolve(Ctr)
      routes.forEach(route => {
        const handler = (controllerInstance as any)[route.handlerName]
        const path = prefix + route.path

        this.#router[route.method](
          path,
          asyncHandler(GuardsMiddleware(Ctr, handler, this.globalGuards)),
          asyncHandler(PipeMiddleware(controllerInstance, handler, this.globalPipes)),
          asyncHandler(FiltersMiddleware(handler)),
        )
      })
    }
  }
}
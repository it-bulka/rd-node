import express, { Router, Express } from 'express'
import { META_KEYS } from '@core/consts'
import { ClassType, ModuleType, RoutesMetadata } from '@core/types'
import { FilterType, PipeType, GuardType, assertIsController } from '@core/decorators'
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


  static create(appModule: ClassType) {
    if (!NestFactory.instance) NestFactory.instance = new NestFactory()
    const instance = NestFactory.instance

    try {
      const modules = modulesCollector.collect(appModule)
      modules.forEach((m) => instance.proccesControllers(m)) // not to lose this at proccesControllers
      instance.#app.use(instance.#router)
    } catch (err) {
      console.log('Invalid Structure Error:', err)
      process.exit(1)
    }

    return {
      useGlobalGuards: (...guards: GuardType[]): void => { instance.globalGuards.push(...guards) },
      useGlobalPipes: (...pipes: PipeType[]): void => { instance.globalPipes.push(...pipes) },
      useGlobalFilters: (...filters: FilterType[]): void => { instance.globalFilters.push(...filters) },
      set: instance.#app.set.bind(instance.#app),
      use: instance.#app.use.bind(instance.#app),
      listen: instance.#app.listen.bind(instance.#app),
      get: instance.#app.get.bind(instance.#app)
    }
  }

  proccesControllers(module: ClassType) {
    const getMeta = Reflect.getMetadata

    const metamodule: ModuleType = getMeta(META_KEYS.module, module)
    if (!metamodule) return

    for (let Ctr of metamodule.controllers) {
      assertIsController(Ctr, module)
      container.register(Ctr, Ctr, true)

      const prefix: string = getMeta(META_KEYS.prefix, Ctr)?.prefix || ''
      const routes: RoutesMetadata = getMeta(META_KEYS.routes, Ctr) || []

      const controllerInstance = container.resolve(Ctr)
      routes?.forEach(route => {
        const handler = (controllerInstance as any)[route.handlerName]
        let additionalPath = route.path.startsWith('/') ? route.path : `/${route.path}`
        let path = prefix + additionalPath
        if(path === '') path = '/'
console.log('path', path)
console.log('handlerName', route.handlerName)
console.log('handler', handler)
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
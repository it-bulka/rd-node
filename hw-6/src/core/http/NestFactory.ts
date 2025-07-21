import express, { Router, Express, RequestHandler } from 'express'
import { META_KEYS } from '@core/consts'
import { ClassType, ModuleType, RoutesMetadata } from '@core/types'
import { FilterType, PipeType, GuardType, assertIsController } from '@core/decorators'
import { container } from '@core/container'
import { GuardsMiddleware } from '@core/http/guards.middleware'
import { FiltersMiddleware } from '@core/http/filters.middleware'
import { PipeMiddleware } from '@core/http/pipes.middleware'
import { errorHandler, modulesCollector, notFound, sortRoutes } from '@core/utils'

export class NestFactory {
  #app: Express = express()
  #router: Router = express.Router()

  protected globalGuards: GuardType[] = []
  protected globalPipes: PipeType[] = []
  protected globalFilters: FilterType[] = []

  private customMiddlewares: RequestHandler[] = []

  private static instance: NestFactory | null = null
  private constructor() {
    this.proccessCustomMiddlewares()
    this.proccessGlobalTopMiddlewares()
  }

  static create(appModule: ClassType) {
    if (!NestFactory.instance) NestFactory.instance = new NestFactory()
    const instance = NestFactory.instance

    return {
      useGlobalGuards: (...guards: GuardType[]): void => { instance.globalGuards.push(...guards) },
      useGlobalPipes: (...pipes: PipeType[]): void => { instance.globalPipes.push(...pipes) },
      useGlobalFilters: (...filters: FilterType[]): void => { instance.globalFilters.push(...filters) },
      set: instance.#app.set.bind(instance.#app),
      use: instance.use.bind(instance),
      get: instance.#app.get.bind(instance.#app),
      listen: (...args: Parameters<Express['listen']>) => {
        instance.proccessCustomMiddlewares()
        instance.proccessGlobalTopMiddlewares()
        instance.initCore(appModule)            // call location to maintain order of middleware (cors, morgan, json etc. and after all that handlers)
        instance.#app.use(notFound)
        instance.#app.use(errorHandler)

        const fn = instance.#app.listen.bind(instance.#app)
        return fn(...args)
      },
    }
  }

  initCore(appModule: ClassType) {
    try {
      const modules = modulesCollector.collect(appModule)
      modules.forEach((m) => this.proccesControllers(m)) // not to lose this at proccesControllers
      this.#app.use(this.#router)
    } catch (err) {
      console.log('Invalid Structure Error:', err)
      process.exit(1)
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
      routes?.sort(sortRoutes).forEach(route => {
        const handler = (controllerInstance as any)[route.handlerName]
        let additionalPath = route.path.startsWith('/') ? route.path : `/${route.path}`
        let path = prefix + additionalPath
        if(path === '') path = '/'
console.log('path', path)
console.log('handlerName', route.handlerName)
console.log('handler', handler)

        const handlersChain = [
          GuardsMiddleware(Ctr, handler, this.globalGuards),
          PipeMiddleware(controllerInstance, handler, this.globalPipes)
        ]
        this.#router[route.method](path, FiltersMiddleware(Ctr, handlersChain, this.globalFilters))
      })
    }
  }

  proccessGlobalTopMiddlewares() {
    this.#app.use(express.json())
    this.#app.use(express.urlencoded({ extended: true }))
  }

  proccessCustomMiddlewares() {
    this.customMiddlewares.map((arg) => this.#app.use(arg))
  }

  use(arg: RequestHandler){
    this.customMiddlewares.push(arg)
  }
}
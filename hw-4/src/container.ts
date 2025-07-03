import { BrewsModel } from './models/brews.model'
import { BrewsService } from './services/brews.service'
import { BrewsController } from './controllers/brews.controller'
import { objectMap, type ClassWithScope } from './utils/Object.map'
import { asClass, createContainer } from 'awilix'

const brewModule: Record<string, ClassWithScope> = {
  brewsModel: BrewsModel,
  brewsController: BrewsController,
  brewsService: BrewsService
}

export const container = createContainer({ injectionMode: 'CLASSIC'})
  .register(
    objectMap(brewModule, (value) => asClass(value)[value.scope]())
  )
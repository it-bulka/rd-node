import { Router } from 'express'
import { makeClassInvoker } from 'awilix-express'

import { validate, validateParams, validateQuery } from '@/middleware'
import { brewDto, brewParamsSchema, brewQuerySchema } from '@/dto/brew.dto'
import { BrewsController } from '@/controllers/brews.controller'

const router = Router()
const cls = makeClassInvoker(BrewsController)

router.route('/')
  .get(validateQuery(brewQuerySchema), cls('all'))
  .post(validate(brewDto), cls('create'))

router.use('/:id', validateParams(brewParamsSchema))
router.route('/:id')
  .get(cls('findOne'))
  .delete(cls('deleteOne'))
  .post(validate(brewDto), cls('update'))


export default router
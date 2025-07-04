import { Router } from 'express'
import { makeClassInvoker } from 'awilix-express'
import { z } from 'zod'

import { validate, validateParams, validateQuery } from '@/middleware'
import { brewDto, brewParamsSchema, brewQuerySchema } from '@/dto/brew.dto'
import { BrewsController } from '@/controllers/brews.controller'
import { registry } from '@/openapi/registry.ts'
import { SuccessResponse, ErrorResponse } from '@/utils/zodResponses.ts'

const router = Router()
const cls = makeClassInvoker(BrewsController)

router.route('/')
  .get(validateQuery(brewQuerySchema), cls('all'))
  .post(validate(brewDto), cls('create'))

router.use('/:id', validateParams(brewParamsSchema))
router.route('/:id')
  .get(cls('findOne'))
  .delete(cls('deleteOne'))
  .put(validate(brewDto), cls('update'))

/**
 * OpenAPI
 * */

const PATH = '/brews'

export const BrewSuccess = SuccessResponse(brewDto)
export const BrewListSuccess = SuccessResponse(z.array(brewDto))
export const BrewError = ErrorResponse()

registry.registerPath({
  path: PATH,
  method: 'get',
  tags: ['Brews'],
  operationId: 'getAllBrews',
  summary: 'Get All Brews',
  description: 'Return all brews, you are free to filter by methods and/or rating setting filters as query params.',
  request: {
    query: brewQuerySchema,
  },
  responses: {
    200: {
      description: 'List of Brews',
      content: {'application/json': {schema: BrewListSuccess }}
    },
    400: {
      description: 'Not Appropriate Query',
      content: {'application/json': {schema: ErrorResponse('query') }}
    }
  }

})

registry.registerPath({
  path: PATH,
  method: 'post',
  tags: ['Brews'],
  operationId: 'createBrew',
  summary: 'Create Brew',
  request: {
    body: {required: true, content: {'application/json': {schema: brewDto}}}
  },
  responses: {
    200: {
      description: 'Created Brew',
      content: {'application/json': {schema: BrewSuccess }}
    }
  }

})
registry.registerPath({
  path: `${PATH}/{id}`,
  method: 'get',
  tags: ['Brews'],
  operationId: 'getBrewById',
  summary: 'Get Brew by ID',
  request: {params: brewParamsSchema},
  responses: {
    200: {
      description: 'Brew',
      content: {'application/json': {schema: BrewSuccess }}
    },
    400: {description: 'Validation error'},
    404: {
      description: 'Brew Not Found',
      content: {'application/json': {schema: BrewError }}
    }
  }
})

registry.registerPath({
  path: `${PATH}/{id}`,
  method: 'put',
  tags: ['Brews'],
  operationId: 'updateBrewById',
  summary: 'Update Brew by ID (update full body)',
  request: {
    params: brewParamsSchema,
    body: {required: true, content: {'application/json': {schema: brewDto }}}
  },
  responses: {
    200: {
      description: 'Updated Brew',
      content: {'application/json': {schema: BrewSuccess }}
    },
    400: {description: 'Validation error'},
    404: {
      description: 'Brew Not Found',
      content: {'application/json': {schema: BrewError }}
    }
  }
})

registry.registerPath({
  path: `${PATH}/{id}`,
  method: 'delete',
  tags: ['Brews'],
  operationId: 'deleteBrew',
  summary: 'Delete Brew by ID',
  request: {params: brewParamsSchema},
  responses: {
    200: {
      description: 'Deleted Brew',
      content: {'application/json': {schema: BrewSuccess }}
    },
    400: {description: 'Validation error'},
  }
})




export default router
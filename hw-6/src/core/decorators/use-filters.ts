import type { ClassType, ArgumentHost } from '@core/types'

export interface ExceptionFilter<T = any> {
  catch(exception: T, host: ArgumentHost): void
}

type FilterType = ClassType<ExceptionFilter> | InstanceType<ClassType<ExceptionFilter>>

const FILTER_METADATA = Symbol('filter')

export function UseFilters(filters: FilterType[]): ClassDecorator | MethodDecorator {
  return function (target, propertyKey) {
    const where = propertyKey ? (target as any)[propertyKey] : target
    Reflect.defineMetadata(FILTER_METADATA, filters, where)
  }
}

// TODO: inner logic of running all exceptions
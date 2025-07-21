import type { ClassType, ArgumentHost } from '@core/types'
import { Request, Response } from 'express';
import { container } from '@core/container';
import { ExpressExecutionContext, isClass } from '@core/utils';
import { ArgumentHostContext } from '@core/utils';

export interface ExceptionFilter<T = any> {
  catch(exception: T, host: ArgumentHost): void
}

export type FilterType = ClassType<ExceptionFilter> | InstanceType<ClassType<ExceptionFilter>>

const FILTER_METADATA = Symbol('filter')

export function UseFilters(...filters: FilterType[]): ClassDecorator & MethodDecorator {
  return function (target: any, propertyKey?: string | symbol) {
    const where = propertyKey ? (target as any)[propertyKey] : target
    Reflect.defineMetadata(FILTER_METADATA, filters, where)
  }
}

// TODO: inner logic of running all exceptions
const getFilters = (handler: Function, controllerClass:  Function, globalFilter: FilterType[] = []): FilterType[] => {
  const controllerFilters = Reflect.getMetadata(FILTER_METADATA, controllerClass) ?? [];
  const routeFilters =  Reflect.getMetadata(FILTER_METADATA, handler) ?? [];

  globalFilter.push(
    ...controllerFilters,
    ...routeFilters
  );

  return globalFilter;
}

export async function runFilters(
  controllerClass: Function,
  handler: Function,
  req: Request,
  res: Response,
  exception: any,
  globalFilters: FilterType[] = []
) {
  const filters: FilterType[] = getFilters(handler, controllerClass, globalFilters)

  for (const FilterCtor of filters) {
    let filterInstance;

    if(isClass(FilterCtor)) {
      if (!container.isRegistered(FilterCtor)) container.register(FilterCtor, FilterCtor);
      filterInstance = container.resolve(FilterCtor)
    } else {
      filterInstance = FilterCtor
    }

    const host = new ArgumentHostContext(req, res)
    await Promise.resolve(filterInstance.catch(exception, host));
  }
};
import { ClassType, ExecutionContext } from '@core/types'
import { container } from '@core/container'
import { ExpressExecutionContext } from '@core/utils'
import { Request, Response } from 'express'

export interface CanActivate {
  canActivate(context: ExecutionContext): boolean | Promise<boolean>
}

export type GuardType = ClassType<CanActivate>

const GUARD_METADATA = Symbol('guard')

export function UseGuards(guards: GuardType[]): ClassDecorator | MethodDecorator {
  return function (target, propertyKey) {
    const where = propertyKey ? (target as any)[propertyKey] : target;
    Reflect.defineMetadata(GUARD_METADATA, guards, where)
  }
}

const getGuards = (handler: Function, controllerClass:  Function, globalGuards: GuardType[] = []): GuardType[] => {
  const controllerGuards = Reflect.getMetadata(GUARD_METADATA, controllerClass) ?? [];
  const routeGuards =  Reflect.getMetadata(GUARD_METADATA, handler) ?? [];

  globalGuards.push(
    ...controllerGuards,
    ...routeGuards
  );

  return globalGuards;
}

export async function runGuards(
  controllerClass: Function,
  handler: Function,
  req: Request,
  res: Response,
  globalGuards: GuardType[] = []
): Promise<boolean | string> {
  const guards: GuardType[] = getGuards(handler, controllerClass, globalGuards)

  for (const GuardCtor of guards) {
    const guardInstance = container.resolve(GuardCtor);
    const ctx = new ExpressExecutionContext(controllerClass, handler, req, res)

    const can = await Promise.resolve( guardInstance.canActivate(ctx) )
    if (!can) return GuardCtor.name
  }
  return true
}
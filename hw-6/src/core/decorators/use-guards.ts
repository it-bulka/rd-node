import { ClassType, ExecutionContext } from '@core/types'

export interface CanActivate {
  canActivate(context: ExecutionContext): boolean | Promise<boolean>
}

export type GuardType = ClassType<CanActivate> | InstanceType<ClassType<CanActivate>>

const GUARD_METADATA = Symbol('guard')

export function UseGuards(guards: GuardType[]): ClassDecorator | MethodDecorator {
  return function (target, propertyKey) {
    const where = propertyKey ? (target as any)[propertyKey] : target;
    Reflect.defineMetadata(GUARD_METADATA, guards, where)
  }
}

// TODO: inner logic of running all guards
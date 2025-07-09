import { ClassType, ArgumentMetadata } from '../types'

export interface TypeTransform<T = any, R = any> {
  transform(value: T, metadata: ArgumentMetadata): R | Promise<R>
}

type PipeType = ClassType<TypeTransform> | InstanceType<ClassType<TypeTransform>>

const PIPES_METADATA = Symbol('pipes')

// on class or method
export function UsePipes(...pipes: PipeType[]): ClassDecorator | MethodDecorator {
  return function (target, propertyKey) {
    const where = propertyKey ? (target as any)[propertyKey] : target;
    Reflect.defineMetadata(PIPES_METADATA, pipes, where)
  }
}

// TODO: inner logic of running all pipes
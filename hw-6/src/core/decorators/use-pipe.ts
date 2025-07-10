import { ClassType, ArgumentMetadata } from '../types'
import { container } from '@core/container'
import { isClass } from '@core/utils'

export interface TypeTransform<T = any, R = any> {
  transform(value: T, metadata: ArgumentMetadata): R | Promise<R>
}

export type PipeType = ClassType<TypeTransform> | InstanceType<ClassType<TypeTransform>>

const PIPES_METADATA = Symbol('pipes')

// on class or method
export function UsePipes(...pipes: PipeType[]): ClassDecorator | MethodDecorator {
  return function (target, propertyKey) {
    const where = propertyKey ? (target as any)[propertyKey] : target;
    Reflect.defineMetadata(PIPES_METADATA, pipes, where)
  }
}

export const getPipes = (handler: Function, controllerClass:  Function, globalPipes: PipeType[]) => {
  const controllerPipes = Reflect.getMetadata(PIPES_METADATA, controllerClass) ?? [];
  const routePipes =  Reflect.getMetadata(PIPES_METADATA, handler) ?? [];

  globalPipes.push(
    ...controllerPipes,
    ...routePipes
  )

  return globalPipes
}

export const runPipes = async ({
  handler,
  controllerClass,
  globalPipes,
  value,
  meta
}: {
  handler: Function,
  controllerClass: Function,
  globalPipes: PipeType[],
  value: unknown,
  meta: ArgumentMetadata
}) => {
  const pipes = getPipes(handler, controllerClass, globalPipes)

  let transformed = value

  for (const PipeCtor of pipes) {
    const pipeInstance = isClass(PipeCtor) ? container.resolve<TypeTransform>(PipeCtor) : PipeCtor;

    transformed = await Promise.resolve(
      pipeInstance.transform(transformed, meta)
    );
  }
  return transformed
}
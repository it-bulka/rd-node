import type { Request, Response, NextFunction } from 'express'
import { runPipes, PipeType } from '@core/decorators'
import { ArgumentMetadata, ClassType } from '@core/types'
import { extractParams } from '@core/utils'
import { META_KEYS } from '@core/consts'
import { HttpException } from '@core';

class PipeError extends Error {
  constructor(message: string) {
    super(message);
    this.name = "PipeError";
  }
}

const getHandlerArgs = async (controller: Function, handler: Function, req: Request, globalPipes: PipeType[]) => {
  const paramMeta: Array<ArgumentMetadata> = Reflect.getMetadata(META_KEYS.params, controller) ?? [];
  const methodMeta: Array<ArgumentMetadata> = paramMeta
    .filter(m => m.name === handler.name);
  const sortedMeta = [...methodMeta].sort((a, b) => a.index - b.index);
  const args: any[] = [];
  for (const metadata of sortedMeta) {
    const extracted = extractParams(req, metadata.type);
    const argument = metadata.data ? extracted[metadata.data] : extracted;

    try {
      args[metadata.index] = await runPipes({
        controllerClass: controller,
        handler,
        value: argument,
        meta:metadata,
        globalPipes
      });
    } catch (error: any) {
      if (error instanceof HttpException) {
        throw error;
      }
      throw new PipeError(error.message || error);
    }
  }

  return args;
}

export const PipeMiddleware = (instance: InstanceType<ClassType>, handler: Function, globalPipes: PipeType[]) =>
  async (req: Request, res: Response, next: NextFunction) => {
    const args = await getHandlerArgs(instance.constructor, handler, req, globalPipes);

    const result = await handler.apply(instance, args);
    res.json(result);
  }
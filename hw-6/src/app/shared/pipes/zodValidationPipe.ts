import { TypeTransform, UsePipes } from '@core';
import { ArgumentMetadata } from '@core/types';
import { ZodType } from 'zod';
import { BadRequestException } from '@core';

export class ZodValidation<T> implements TypeTransform {
  constructor(private readonly zodSchema: ZodType<T>) {}
  transform(value: any, metadata: ArgumentMetadata): T {
    const result = this.zodSchema.safeParse(value);
    const type = metadata.type;

    if (!result.success) {
      const formattedErr = result.error.errors.map((err) => ({
        path: err.path.join('.'),
        message: err.message,
      }));

      throw new BadRequestException({
        message: 'Validation failed',
        errors: formattedErr,
        where: type,
      });
    }

    return result.data;
  }
}

export function ZodValidationPipe<T>(schema: ZodType<T>) {
  return UsePipes(new ZodValidation(schema));
}
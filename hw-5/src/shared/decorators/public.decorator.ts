import { SetMetadata } from '@nestjs/common';
import { AUTH_REFLECT_TOKEN } from '@guards/auth.guard';

export const Public = () => SetMetadata(AUTH_REFLECT_TOKEN, true)
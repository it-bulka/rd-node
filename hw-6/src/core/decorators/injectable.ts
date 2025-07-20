import { container } from '../container';
import { ClassType } from '@core/types';

export function Injectable(): ClassDecorator {
  return function (target: Function) {
    container.register(target, target as ClassType)
  }
}
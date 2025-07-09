import { container } from '../container';

export function Injectable(): ClassDecorator {
  return function (target){
    container.register(target, target)
  }
}
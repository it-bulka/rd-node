import { ClassType } from '@core/types'

export function isClass<T>(obj: any): obj is ClassType<T> {
  return "prototype" in obj;
}
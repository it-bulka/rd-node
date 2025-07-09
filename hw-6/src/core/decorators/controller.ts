export function Controller(prefix: string = ''): ClassDecorator {
  return function (target){
    Reflect.defineMetadata('prefix', prefix, target)
  }
}

export function isController(target: any) {
  return Reflect.hasMetadata('prefix', target)
}
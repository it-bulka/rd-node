import { META_KEYS } from '../consts'

type Methods = 'get' | 'post' | 'put' | 'patch' | 'delete'

function Route(method: Methods, path: string = ''): MethodDecorator {
  return function (target, propertyKey, descriptor) {
    const paths = Reflect.getMetadata(META_KEYS.routes, target.constructor) || []
    paths.push({ method, path, handlerName: propertyKey })

    Reflect.defineMetadata(META_KEYS.routes, paths, target.constructor)
  }
}

export const Get = (path?: string) => Route('get', path)
export const Post = (path?: string) => Route('post', path)
export const Put = (path?: string) => Route('put', path)
export const Patch = (path?: string) => Route('patch', path)
export const Delete = (path?: string) => Route('delete', path)
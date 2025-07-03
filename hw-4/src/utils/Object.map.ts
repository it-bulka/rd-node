export type ClassWithScope = {
  new (...args: any[]): any
  scope: 'singleton' | 'scoped'
}

export function objectMap<T extends Record<string, ClassWithScope>, U>(
  obj: T,
  fn: (value: T[keyof T], key: keyof T, obj: T) => U
): Record<keyof T, U> {
  return Object.entries(obj).reduce((acc, [key, value]) => {
    acc[key as keyof T] = fn(value as T[keyof T], key as keyof T, obj)
    return acc

  }, {} as Record<keyof T, U>)
}

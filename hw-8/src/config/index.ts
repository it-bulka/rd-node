export interface EnvType {
  PORT: string
  NODE_ENV: 'development' | 'production'
}

export const config = {
  env: (process.env.NODE_ENV || 'development') as EnvType['NODE_ENV'],
}
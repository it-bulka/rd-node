import { OpenApiGeneratorV3 } from '@asteasolutions/zod-to-openapi'
import { registry } from '@/openapi/registry.ts'

export const geterateZodSpec = (baseUrl: string) => {
  const zodSpec = new OpenApiGeneratorV3(registry.definitions).generateDocument({
    openapi: '3.0.0',
    info: { title: 'Brews Api' , version: '1.0.0' },
    servers: [
      { url: baseUrl }
    ]
  })

  return zodSpec
}

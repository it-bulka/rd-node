import 'reflect-metadata'
import { NestFactory } from '@core/http/NestFactory'
import AppModule from './app/app.module'

const bootstrap = async () => {
  const app = NestFactory.create(AppModule)

  app.listen(3000, () => {
    console.log('Server started on port 3000')
  })
}

bootstrap()

process.on('uncaughtException', (err) => {
  console.error('Uncaught Exception:', err)
})


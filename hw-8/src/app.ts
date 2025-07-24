import express from 'express';
import helmet from 'helmet';
import cors from 'cors'
import rateLimit from 'express-rate-limit';
import compression from 'compression'
import { zipController } from '@/controllers/zip.controller';
import { upload } from '@/utils/multer';
import { validateFilesExist, errorHandler, notFound } from '@/middleware';
import { setLogger } from '@/utils';
import { config } from '@/config';

export const createApp = async () => {
  const app = express()

  app.use(helmet())
  app.use(cors())
  app.use(rateLimit({
    windowMs: 60_000,
    limit: 10,
    standardHeaders: true,
    legacyHeaders: false,
  }))
  app.use(compression())

  await setLogger(app, config.env)

  app.post('/zip', upload.array('zip'), validateFilesExist, zipController.post)
  app.use(notFound)
  app.use(errorHandler)

  return app
}
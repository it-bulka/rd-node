import express from 'express';
import helmet from 'helmet';
import cors from 'cors'
import rateLimit from 'express-rate-limit';
import compression from 'compression'
import { zipController } from '@/controllers/zip.controller';
import { upload } from '@/utils/multer';

export const createApp = () => {
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

  app.post('/zip', upload.array('zip'), zipController.post)

  return app
}
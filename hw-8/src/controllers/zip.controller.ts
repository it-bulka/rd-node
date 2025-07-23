import { Request, Response} from 'express';

class ZipController {
  post(req: Request, res: Response) {
    const filePath = req.file?.path

  }
}

export const zipController = new ZipController()


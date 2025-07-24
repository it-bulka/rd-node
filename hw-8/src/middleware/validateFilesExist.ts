import { Request, Response, NextFunction } from 'express';

export const validateFilesExist = (req: Request, res: Response, next: NextFunction) => {
  if(!req.files || !req.files.length){
    return res.status(400).json({ error: 'No files uploaded' });
  }

  next()
}
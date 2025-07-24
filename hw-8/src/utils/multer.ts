import multer from 'multer';
import { Request, Response, NextFunction } from 'express';

const storage = multer.diskStorage({
  destination: (req, file, cb) => cb(null, 'uploads'),
});

export const upload = multer({
  storage,
  fileFilter: (req, file, cb) => {
    if (file.mimetype === 'application/zip' || file.mimetype === 'application/x-zip-compressed') {
      cb(null, true);
    } else {
      const err = new Error('Only ZIP archives are allowed');
      Object.assign(err, { status: 400 });
      cb(err);
    }
  }
});
import { ParseFilePipe, MaxFileSizeValidator, FileTypeValidator } from '@nestjs/common';

export const ImageParseFilePipe  = new ParseFilePipe({
  validators: [
    new MaxFileSizeValidator({
      maxSize: 1024 * 1024 * 10,
      message: 'Max file size must be not greater than 10MB',
    }),
    new FileTypeValidator({
      fileType: /image\/(jpeg|png)$/,
    })
  ]
})
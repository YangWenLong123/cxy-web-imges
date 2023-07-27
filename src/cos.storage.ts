import * as COS from 'cos-nodejs-sdk-v5';
import * as Multer from 'multer';
import { v4 as uuidv4 } from 'uuid';
import * as querystring from 'querystring';

export const cos = new COS({
  SecretId: 'AKIDHVgW9iGl9LNF0b1GKI3iGetxRo1DH9pH',
  SecretKey: 'JPHvLXZNx1tXxEJ9lALK6dw666nOyXwK',
  FileParallelLimit: 5, //文件上传并发数
});

export function cosUpload(bucket: string, region: string): Multer.Options {
  const storage = Multer.diskStorage({
    filename: (req, file, cb) => {
      // console.log('file', file);

      const uniqueFileKey =
        uuidv4() + '-' + querystring.unescape(file.originalname);
      cb(null, uniqueFileKey);
    },
  });

  return {
    storage,
    fileFilter: (req, file, cb) => {
      if (file.mimetype.startsWith('image/')) {
        cb(null, true);
      } else {
        cb(null, false);
        return cb(new Error('Only .png, .jpg, .jpeg and .gif format allowed!'));
      }
    },
    limits: {
      fileSize: 50 * 1024 * 1024,
    },
  };
}

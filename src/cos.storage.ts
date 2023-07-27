/*
 * @Author: along
 * @Description:
 * @Date: 2023-07-27 15:30:47
 * @LastEditors: along
 * @LastEditTime: 2023-07-27 17:03:28
 * @FilePath: /cxy-web-imges/src/cos.storage.ts
 */
import * as COS from 'cos-nodejs-sdk-v5';
import * as Multer from 'multer';
import { v4 as uuidv4 } from 'uuid';
import * as querystring from 'querystring';

export const cos = new COS({
  SecretId: '',
  SecretKey: '',
  FileParallelLimit: 5, //文件上传并发数
});

export function cosUpload(bucket: string, region: string): Multer.Options {
  const storage = Multer.diskStorage({
    filename: (req, file, cb) => {
      // console.log('file', file);

      const uniqueFileKey =
        uuidv4() + '--' + querystring.unescape(file.originalname);
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

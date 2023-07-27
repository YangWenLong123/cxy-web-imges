/*
 * @Author: along
 * @Description:
 * @Date: 2023-07-27 10:01:57
 * @LastEditors: along
 * @LastEditTime: 2023-07-27 16:57:38
 * @FilePath: /cxy-web-imges/src/app.controller.ts
 */
import {
  Controller,
  Post,
  UseInterceptors,
  UploadedFile,
  Req,
  Get,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { cos, cosUpload } from './cos.storage';
import * as querystring from 'querystring';
const fs = require('fs');

@Controller('upload')
export class UploadController {
  @Post('single')
  @UseInterceptors(
    FileInterceptor('file', cosUpload('along-1254323745', 'ap-nanjing')),
  )
  async uploadSingle(@UploadedFile() file, @Req() request) {
    const originalFilename = file.filename;

    const params = {
      Bucket: 'along-1254323745',
      Region: 'ap-nanjing',
      Key: originalFilename,
      Body: fs.createReadStream(file.path), // 文件流读取
    };

    try {
      await cos.putObject(params);

      return {
        code: 1,
        message: 'success',
        url: `https://along-1254323745.cos.ap-nanjing.myqcloud.com/${originalFilename}`,
      };
    } catch (error) {
      return {
        code: 0,
        message: error,
      };
    }
  }

  @Get('get')
  async findAll() {
    try {
      const get = await cos.getBucket({
        Bucket: 'along-1254323745',
        Region: 'ap-nanjing',
      });

      const Contents = get.Contents.reduce((c, n) => {
        c.push({
          size: n.Size,
          url: `https://along-1254323745.cos.ap-nanjing.myqcloud.com/${n.Key}`,
          name: n.Key.split('--')[1],
        });
        return c;
      }, []);

      return {
        code: 1,
        message: 'success',
        list: Contents,
      };
    } catch (error) {
      return {
        code: 0,
        message: error,
      };
    }
  }
}

/*
 * @Author: along
 * @Description:
 * @Date: 2023-07-27 10:01:57
 * @LastEditors: along
 * @LastEditTime: 2023-07-27 14:52:35
 * @FilePath: /cxy-web-img/src/app.controller.ts
 */
import {
  Controller,
  Post,
  UseInterceptors,
  UploadedFile,
  Req,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { cos, cosUpload } from './cos.storage';
import * as querystring from 'querystring';
const fs = require('fs');

@Controller('upload')
export class UploadController {
  @Post()
  @UseInterceptors(
    FileInterceptor('file', cosUpload('along-1254323745', 'ap-nanjing')),
  )
  async uploadSingle(@UploadedFile() file, @Req() request) {
    // const originalFilename = decodeURIComponent(
    //   request.headers['x-original-filename'],
    // );

    const originalFilename = file.filename;

    const params = {
      Bucket: 'along-1254323745',
      Region: 'ap-nanjing',
      Key: originalFilename,
      Body: fs.createReadStream(file.path), // 文件流读取
    };

    await cos.putObject(params);

    const get = await cos.getBucket({
      Bucket: 'along-1254323745',
      Region: 'ap-nanjing',
    });

    return {
      url: `https://along-1254323745.cos.ap-nanjing.myqcloud.com/${originalFilename}`,
      list: get.Contents,
    };
  }
}

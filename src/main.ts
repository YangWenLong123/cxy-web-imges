/*
 * @Author: along
 * @Description:
 * @Date: 2023-07-27 15:30:47
 * @LastEditors: along
 * @LastEditTime: 2023-07-28 22:53:33
 * @FilePath: /cxy-web-imges/src/main.ts
 */
import { NestExpressApplication } from '@nestjs/platform-express';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import * as cors from 'cors';

async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule);
  // 允许所有来源的跨域请求
  app.use(
    cors({
      origin: [
        'http://localhost:8888',
        'http://xyz.alongweb.top',
        'http://xyz.zxxweb.top',
      ],
      methods: ['GET', 'POST'],
    }),
  );

  await app.listen(3000);
}
bootstrap();

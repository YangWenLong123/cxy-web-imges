import { Module } from '@nestjs/common';
import { UploadController } from './app.controller';
import { AppService } from './app.service';

@Module({
  imports: [],
  controllers: [UploadController],
  providers: [AppService],
})
export class AppModule {}

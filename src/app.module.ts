import { Module } from '@nestjs/common';
import { MulterModule } from '@nestjs/platform-express';
import { UploadController } from './upload/upload.controller';
import { UploadService } from './upload/upload.service';

@Module({
  imports: [
    MulterModule.register({
      dest: './uploads', // Pasta onde os arquivos serão salvos
    }),
  ],
  controllers: [UploadController],
  providers: [UploadService],
})
export class AppModule {}

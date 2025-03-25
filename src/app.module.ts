import { Module } from '@nestjs/common';
import { UploadController } from './upload/upload.controller';
import { UploadService } from './upload/upload.service';
import { PrismaService } from './prisma.service';

@Module({
  imports: [],
  controllers: [UploadController],
  providers: [UploadService, PrismaService],
})
export class AppModule {}

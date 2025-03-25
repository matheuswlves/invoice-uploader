import { Controller, Post, UseInterceptors, UploadedFile, Body, Get, Param } from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { UploadService } from './upload.service.ts';

@Controller('upload')
export class UploadController {
  constructor(private readonly uploadService: UploadService) {}

  @Post()
  @UseInterceptors(FileInterceptor('file'))
  async uploadFile(@UploadedFile() file: Express.Multer.File) {
    return this.uploadService.processFile(file);
  }

  @Get(':id/ask')
  async askQuestion(@Param('id') id: string, @Body('question') question: string) {
    return this.uploadService.askLLM(id, question);
  }
}

import { Controller, Post, UploadedFile, UseInterceptors } from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import { UploadService } from './upload.service'; 

@Controller('upload')
export class UploadController {
  constructor(private readonly uploadService: UploadService) {}

  @Post()
  @UseInterceptors(FileInterceptor('file', {
    storage: diskStorage({
      destination: './uploads', // Diretório onde o arquivo será armazenado
      filename: (req, file, callback) => {
        callback(null, file.originalname); // Nome do arquivo
      },
    }),
  }))
  async uploadFile(
    @UploadedFile() file: Express.Multer.File
  ): Promise<{ id: number; filename: string; extractedText: string }> {
    return this.uploadService.processFile(file);
  }
}


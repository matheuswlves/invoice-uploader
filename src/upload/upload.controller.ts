import { Controller, Post, Get, Param, Body, UploadedFile } from '@nestjs/common';
import { UploadService } from './upload.service';
import { FileInterceptor } from '@nestjs/platform-express';
import { UseInterceptors } from '@nestjs/common';

@Controller('upload')
export class UploadController {
  constructor(private readonly uploadService: UploadService) {}

  @Post()
  @UseInterceptors(FileInterceptor('file'))  // Usando o interceptor para lidar com arquivos
  async uploadFile(@UploadedFile() file: Express.Multer.File): Promise<{ id: number; filename: string; extractedText: string }> {
    // Certifique-se de que o tipo de retorno esteja correto
    const document = await this.uploadService.processFile(file);
    return {
      id: document.id,
      filename: document.filename,
      extractedText: document.extractedText
    };
  }

  @Get(':id/ask')
  async askQuestion(
    @Param('id') id: string, 
    @Body('question') question: string
  ): Promise<{ answer: string }> {
    // Chamando a função askLLM e tratando caso a resposta seja null
    const result = await this.uploadService.askLLM(id, question);

    // Se o resultado for null, retornamos uma string padrão
    return {
      answer: result.answer || 'Resposta não encontrada'
    };
  }
}




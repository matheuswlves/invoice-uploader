import { Injectable } from '@nestjs/common';
import * as Tesseract from 'tesseract.js';
import { PrismaService } from '../prisma.service';
import { Configuration, OpenAIApi } from 'openai';

@Injectable()
export class UploadService {
  private openai: OpenAIApi;

  constructor(private prisma: PrismaService) {
    const config = new Configuration({ apiKey: process.env.OPENAI_API_KEY });
    this.openai = new OpenAIApi(config);
  }

  async processFile(file: Express.Multer.File) {
    const text = (await Tesseract.recognize(file.path)).data.text;
    const document = await this.prisma.document.create({
      data: { filename: file.originalname, extractedText: text }
    });
    return document;
  }

  async askLLM(documentId: string, question: string) {
    const document = await this.prisma.document.findUnique({ where: { id: Number(documentId) } });
    if (!document) throw new Error('Documento não encontrado');

    const response = await this.openai.createChatCompletion({
      model: 'gpt-4',
      messages: [{ role: 'system', content: `Baseado neste texto extraído: ${document.extractedText}, responda: ${question}` }]
    });

    return { answer: response.data.choices[0].message?.content };
  }
}

import { Injectable } from '@nestjs/common';
import { Express } from 'express';
import OpenAI from 'openai';

@Injectable()
export class UploadService {
  private openai: OpenAI;

  constructor() {
    this.openai = new OpenAI({
      apiKey: process.env.OPENAI_API_KEY, 
    });
  }

  async processFile(file: Express.Multer.File): Promise<{ id: number; filename: string; extractedText: string }> {
    const extractedText = 'Texto extraído de exemplo';
    return {
      id: 1,
      filename: file.originalname,
      extractedText,
    };
  }

  async askQuestion(id: string, question: string): Promise<{ answer: string }> {
    const response = await this.openai.chat.completions.create({
      model: 'gpt-4',
      messages: [
        { role: 'system', content: 'Você é um assistente útil.' },
        { role: 'user', content: question },
      ],
    });

    const answer = response.choices[0].message.content || 'Não foi possível gerar uma resposta no momento.';
    return { answer };
  }
}

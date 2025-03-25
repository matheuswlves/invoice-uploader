import { PrismaService } from '../prisma.service';
export declare class UploadService {
    private prisma;
    private openai;
    constructor(prisma: PrismaService);
    processFile(file: Express.Multer.File): Promise<{
        filename: string;
        id: number;
        extractedText: string;
    }>;
    askLLM(documentId: string, question: string): Promise<{
        answer: any;
    }>;
}

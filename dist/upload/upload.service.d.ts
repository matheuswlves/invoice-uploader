import { PrismaService } from '../prisma.service';
export declare class UploadService {
    private prisma;
    private openai;
    constructor(prisma: PrismaService);
    processFile(file: Express.Multer.File): Promise<any>;
    askLLM(documentId: string, question: string): Promise<{
        answer: any;
    }>;
}

import { UploadService } from './upload.service';
export declare class UploadController {
    private readonly uploadService;
    constructor(uploadService: UploadService);
    uploadFile(file: Express.Multer.File): Promise<{
        id: number;
        filename: string;
        extractedText: string;
    }>;
    askQuestion(id: string, question: string): Promise<{
        answer: string;
    }>;
}

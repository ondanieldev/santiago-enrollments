import PDFMake from 'pdfmake';
import { TDocumentDefinitions } from 'pdfmake/interfaces';
import { resolve } from 'path';
import { v4 } from 'uuid';
import fs from 'fs';

interface IRequest {
    docDefinition: TDocumentDefinitions;
    deleteFileName?: string;
}

class GeneratePDFService {
    public async execute({
        docDefinition,
        deleteFileName,
    }: IRequest): Promise<string> {
        const fonts = {
            Arial: {
                normal: resolve(
                    __dirname,
                    '..',
                    '..',
                    '..',
                    'assets',
                    'fonts',
                    `arial.ttf`,
                ),
                bold: resolve(
                    __dirname,
                    '..',
                    '..',
                    '..',
                    'assets',
                    'fonts',
                    `arialbd.ttf`,
                ),
            },
        };

        const printer = new PDFMake(fonts);

        const fileHash = v4();

        const fileName = `${fileHash}.pdf`;

        const filePath = resolve(
            __dirname,
            '..',
            '..',
            '..',
            '..',
            'tmp',
            fileName,
        );

        const pdfDoc = printer.createPdfKitDocument(docDefinition);

        pdfDoc.pipe(fs.createWriteStream(filePath));

        pdfDoc.end();

        if (deleteFileName) {
            const deletePath = resolve(
                __dirname,
                '..',
                '..',
                '..',
                '..',
                'tmp',
                deleteFileName,
            );

            try {
                const fileAlreadyExists = await fs.promises.stat(deletePath);

                if (fileAlreadyExists) {
                    await fs.promises.unlink(deletePath);
                }
            } catch {}
        }

        return fileName;
    }
}

export default GeneratePDFService;

import path from 'path';
import PDFMake from 'pdfmake';
import { v4 } from 'uuid';
import fs from 'fs';

import IPDFProvider from '../models/IPDFProvider';
import { TDocumentDefinitions } from 'pdfmake/interfaces'; // eslint-disable-line

export default class PDFMakePDFProvider implements IPDFProvider {
    public async generate(
        documentDefinition: TDocumentDefinitions,
    ): Promise<string> {
        const fonts = {
            Arial: {
                normal: path.resolve(__dirname, '..', 'fonts', 'arial.ttf'),
                bold: path.resolve(__dirname, '..', 'fonts', 'arialbd.ttf'),
            },
        };

        const printer = new PDFMake(fonts);

        const fileHash = v4();

        const filename = `${fileHash}.pdf`;

        const filePath = path.resolve(
            __dirname,
            '..',
            '..',
            '..',
            '..',
            '..',
            '..',
            'tmp',
            filename,
        );

        const pdfDoc = printer.createPdfKitDocument(documentDefinition);

        pdfDoc.pipe(fs.createWriteStream(filePath));

        pdfDoc.end();

        return filename;
    }

    public async delete(filename: string): Promise<void> {
        const filePath = path.resolve(
            __dirname,
            '..',
            '..',
            '..',
            '..',
            '..',
            '..',
            'tmp',
            filename,
        );

        try {
            const fileAlreadyExists = await fs.promises.stat(filePath);

            if (fileAlreadyExists) {
                await fs.promises.unlink(filePath);
            }
        } catch {}
    }
}

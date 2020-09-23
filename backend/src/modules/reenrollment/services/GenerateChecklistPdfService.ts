import PDFMake from 'pdfmake';
import mongoose from 'mongoose';
import fs from 'fs';
import { resolve } from 'path';
import { v4 } from 'uuid';
import { TDocumentDefinitions } from 'pdfmake/interfaces';

import AppError from '@shared/errors/AppError';
import {
    ReenrollmentSchema,
    IReenrollment,
} from '@modules/reenrollment/infra/mongoose/schemas/ReenrollmentSchema';

interface IRequest {
    _id: string;
}

class GenerateChecklistPdfService {
    public async execute({ _id }: IRequest): Promise<string> {
        const Reenrollment = mongoose.model<IReenrollment>(
            'Reenrollment',
            ReenrollmentSchema,
        );

        const reenrollment = await Reenrollment.findOne({
            student_name: _id,
        });

        if (!reenrollment) {
            throw new AppError('Rematrícula inválida!');
        }

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

        const docDefinition = {
            pageSize: 'A4',
            pageOrientation: 'portrait',
            pageMargins: [25, 25, 25, 25],
            info: {
                title: 'Ficha de Rematrícula',
                author: 'Colégio Santiago',
                subject: 'Ficha de Rematrícula',
                keywords: 'Ficha, Rematrícula',
                creator: 'Colégio Santiago',
                producer: 'Colégio Santiago',
            },
            content: [],
            styles: {
                heading: {
                    font: 'Arial',
                    fontSize: 12,
                    bold: true,
                    alignment: 'center',
                },
                subheading: {
                    font: 'Arial',
                    fontSize: 11,
                    bold: true,
                },
            },
            defaultStyle: {
                font: 'Arial',
                fontSize: 11,
                lineHeight: 1.33,
            },
        } as TDocumentDefinitions;

        // .fontSize(14)
        // .text('Checklist', { align: 'center' })
        // .moveDown()
        // .font(arial)
        // .fontSize(12)
        // .text('02 fotos 3x4', { align: 'left', continued: true })
        // .text('Data: _____/_____/_____ Hora: _____/_____', {
        //     align: 'right',
        // })
        // .text('Certidão de nascimento do aluno', {
        //     align: 'left',
        //     continued: true,
        // })
        // .text('Data: _____/_____/_____ Hora: _____/_____', {
        //     align: 'right',
        // })
        // .text('CPF', { align: 'left', continued: true })
        // .text('Data: _____/_____/_____ Hora: _____/_____', {
        //     align: 'right',
        // })
        // .text('RG', { align: 'left', continued: true })
        // .text('Data: _____/_____/_____ Hora: _____/_____', {
        //     align: 'right',
        // })
        // .text('Comprovante de residência', {
        //     align: 'left',
        //     continued: true,
        // })
        // .text('Data: _____/_____/_____ Hora: _____/_____', {
        //     align: 'right',
        // })
        // .text('Carteira de plano de saúde', {
        //     align: 'left',
        //     continued: true,
        // })
        // .text('Data: _____/_____/_____ Hora: _____/_____', {
        //     align: 'right',
        // })
        // .text('Declaração de transferência escolar', {
        //     align: 'left',
        //     continued: true,
        // })
        // .text('Data: _____/_____/_____ Hora: _____/_____', {
        //     align: 'right',
        // })
        // .text('Declaração de quitação mensalidade', {
        //     align: 'left',
        //     continued: true,
        // })
        // .text('Data: _____/_____/_____ Hora: _____/_____', {
        //     align: 'right',
        // })
        // .text('Histórico escolar', { align: 'left', continued: true })
        // .text('Data: _____/_____/_____ Hora: _____/_____', {
        //     align: 'right',
        // })
        // .text('Cartão de vacina', { align: 'left', continued: true })
        // .text('Data: _____/_____/_____ Hora: _____/_____', {
        //     align: 'right',
        // });

        const fileHash = v4();
        const fileName = `checklist-${fileHash}.pdf`;
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

        await Reenrollment.findOneAndUpdate(
            {
                student_name: _id,
            },
            {
                checklist: fileName,
            },
            {
                useFindAndModify: false,
            },
        );

        if (reenrollment.checklist) {
            const deletePath = resolve(
                __dirname,
                '..',
                '..',
                '..',
                '..',
                'tmp',
                reenrollment.checklist,
            );

            fs.unlinkSync(deletePath);
        }

        return fileName;
    }
}

export default GenerateChecklistPdfService;

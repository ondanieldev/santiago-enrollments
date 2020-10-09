import { injectable, inject } from 'tsyringe';
import path from 'path';
import { TDocumentDefinitions } from 'pdfmake/interfaces'; // eslint-disable-line

import AppError from '@shared/errors/AppError';
import IReenrollmentsRepository from '@modules/reenrollment/repositories/IReenrollmentsRepository';
import IPDFProvider from '@shared/containers/providers/PDFProvider/models/IPDFProvider';
import { formatGrade } from '@shared/utils/formatFunctions';

@injectable()
class GenerateMonthlyControlPdfService {
    constructor(
        @inject('ReenrollmentsRepository')
        private reenrollmentsRepository: IReenrollmentsRepository,

        @inject('PDFProvider')
        private pdfProvider: IPDFProvider,
    ) {}

    public async execute(enrollment_number: number): Promise<string> {
        const reenrollment = await this.reenrollmentsRepository.getByEnrollmentNumber(
            enrollment_number,
        );

        if (!reenrollment) {
            throw new AppError(
                'Não é possível gerar o controle de uma matrícula que não existe!',
            );
        }

        const gradeName = formatGrade(reenrollment.grade_name);

        const logoImage = path.resolve(
            __dirname,
            '..',
            '..',
            '..',
            'assets',
            'images',
            'logo.png',
        );

        const documentDefinition = {
            pageSize: 'A4',
            pageOrientation: 'portrait',
            pageMargins: [20, 20, 20, 20],
            info: {
                title: 'Controle de Mensalidade Escolar',
                author: 'Colégio Santiago',
                subject: 'Controle de Mensalidade Escolar',
                keywords: 'Controle, Mensalidade',
                creator: 'Colégio Santiago',
                producer: 'Colégio Santiago',
            },
            styles: {
                heading: {
                    fontSize: 10,
                    bold: true,
                    alignment: 'center',
                },
                phrase: {
                    alignment: 'center',
                },
                tableHeader: {
                    alignment: 'center',
                    bold: true,
                },
            },
            defaultStyle: {
                font: 'Arial',
                fontSize: 9,
                lineHeight: 1.25,
                alignment: 'justify',
            },
            content: [
                {
                    columns: [
                        {
                            image: logoImage,
                            width: 65,
                            alignment: 'center',
                        },
                        {
                            text: [
                                {
                                    text: 'Colégio Santiago',
                                    style: 'heading',
                                },
                                {
                                    text:
                                        '\n"Dá instrução ao sábio e ele se fará mais sábio, ensina o justo e ele crescerá em entendimento" Prov. 9,9',
                                    style: 'phrase',
                                },
                                {
                                    text: `\nControle de Mensalidade Escolar — Ano ${reenrollment.enrollment_year}`,
                                    style: 'heading',
                                },
                            ],
                        },
                        {
                            text: '',
                            width: 65,
                        },
                    ],
                },
                {
                    text: `${reenrollment.student_name} — ${gradeName}`,
                    style: 'heading',
                },
                {
                    columns: [
                        {
                            text: [
                                { text: 'Pai: ', bold: true },
                                reenrollment.student_father_name,
                            ],
                        },
                        {
                            text: [
                                { text: 'Mãe: ', bold: true },
                                reenrollment.student_mother_name,
                            ],
                            alignment: 'right',
                        },
                    ],
                },
                {
                    columns: [
                        {
                            text: [
                                { text: 'Mensalidade: ', bold: true },
                                `R$ ${reenrollment.monthly_value}`,
                            ],
                        },
                        {
                            text: [
                                { text: 'Desconto: ', bold: true },
                                `${reenrollment.discount_percent}%`,
                            ],
                            alignment: 'center',
                        },
                        {
                            text: [
                                {
                                    text: 'Mensalidade com desconto: ',
                                    bold: true,
                                },
                                `R$ ${
                                    reenrollment.monthly_value -
                                    (reenrollment.monthly_value *
                                        reenrollment.discount_percent) /
                                        100
                                }`,
                            ],
                            alignment: 'right',
                        },
                    ],
                },
                {
                    table: {
                        body: [
                            [
                                { text: 'Mês', style: 'tableHeader' },
                                {
                                    text: 'Data de\npagamento',
                                    style: 'tableHeader',
                                },
                                { text: 'Valor', style: 'tableHeader' },
                                { text: 'Obs', style: 'tableHeader' },
                                {
                                    text: 'Assinatura\ndiretoria',
                                    style: 'tableHeader',
                                },
                                {
                                    text: 'Assinatura\nfuncionário',
                                    style: 'tableHeader',
                                },
                                {
                                    text: 'Assinatura\nresponsável\npelo aluno',
                                    style: 'tableHeader',
                                },
                            ],
                            [
                                {
                                    text: `Matrícula/\nRematrícula\n${reenrollment.enrollment_year}`,
                                    style: 'tableHeader',
                                },
                                {
                                    text: '\n_____/_____',
                                    alignment: 'center',
                                },
                                {
                                    columns: [
                                        {
                                            text: [
                                                '(   ) Matrícula:',
                                                '\n(   ) Material didático:',
                                                '\n(   ) Outros:',
                                                {
                                                    text: '\nTotal:',
                                                    bold: true,
                                                },
                                            ],
                                        },
                                        {
                                            text:
                                                'R$_______________\nR$_______________\nR$_______________\nR$_______________',
                                            alignment: 'right',
                                        },
                                    ],
                                },
                                '(   ) Cartão\n(   ) Dinheiro\n(   ) Cheque\n(   ) Depósito',
                                ' ',
                                ' ',
                                ' ',
                            ],
                            [
                                {
                                    text: '\nFevereiro',
                                    style: 'tableHeader',
                                },
                                {
                                    text: '\n_____/_____',
                                    alignment: 'center',
                                },
                                {
                                    columns: [
                                        {
                                            text: [
                                                '(   ) Mensalidade:',
                                                '\n(   ) Outros:',
                                                {
                                                    text: '\nTotal:',
                                                    bold: true,
                                                },
                                            ],
                                        },
                                        {
                                            text:
                                                'R$_______________\nR$_______________\nR$_______________',
                                            alignment: 'right',
                                        },
                                    ],
                                },
                                '(   ) Cartão\n(   ) Dinheiro\n(   ) Cheque\n(   ) Depósito',
                                ' ',
                                ' ',
                                ' ',
                            ],
                            [
                                {
                                    text: '\nMarço',
                                    style: 'tableHeader',
                                },
                                {
                                    text: '\n_____/_____',
                                    alignment: 'center',
                                },
                                {
                                    columns: [
                                        {
                                            text: [
                                                '(   ) Mensalidade:',
                                                '\n(   ) Outros:',
                                                {
                                                    text: '\nTotal:',
                                                    bold: true,
                                                },
                                            ],
                                        },
                                        {
                                            text:
                                                'R$_______________\nR$_______________\nR$_______________',
                                            alignment: 'right',
                                        },
                                    ],
                                },
                                '(   ) Cartão\n(   ) Dinheiro\n(   ) Cheque\n(   ) Depósito',
                                ' ',
                                ' ',
                                ' ',
                            ],
                            [
                                {
                                    text: '\nAbril',
                                    style: 'tableHeader',
                                },
                                {
                                    text: '\n_____/_____',
                                    alignment: 'center',
                                },
                                {
                                    columns: [
                                        {
                                            text: [
                                                '(   ) Mensalidade:',
                                                '\n(   ) Outros:',
                                                {
                                                    text: '\nTotal:',
                                                    bold: true,
                                                },
                                            ],
                                        },
                                        {
                                            text:
                                                'R$_______________\nR$_______________\nR$_______________',
                                            alignment: 'right',
                                        },
                                    ],
                                },
                                '(   ) Cartão\n(   ) Dinheiro\n(   ) Cheque\n(   ) Depósito',
                                ' ',
                                ' ',
                                ' ',
                            ],
                            [
                                {
                                    text: '\nMaio',
                                    style: 'tableHeader',
                                },
                                {
                                    text: '\n_____/_____',
                                    alignment: 'center',
                                },
                                {
                                    columns: [
                                        {
                                            text: [
                                                '(   ) Mensalidade:',
                                                '\n(   ) Outros:',
                                                {
                                                    text: '\nTotal:',
                                                    bold: true,
                                                },
                                            ],
                                        },
                                        {
                                            text:
                                                'R$_______________\nR$_______________\nR$_______________',
                                            alignment: 'right',
                                        },
                                    ],
                                },
                                '(   ) Cartão\n(   ) Dinheiro\n(   ) Cheque\n(   ) Depósito',
                                ' ',
                                ' ',
                                ' ',
                            ],
                            [
                                {
                                    text: '\nJunho',
                                    style: 'tableHeader',
                                },
                                {
                                    text: '\n_____/_____',
                                    alignment: 'center',
                                },
                                {
                                    columns: [
                                        {
                                            text: [
                                                '(   ) Mensalidade:',
                                                '\n(   ) Outros:',
                                                {
                                                    text: '\nTotal:',
                                                    bold: true,
                                                },
                                            ],
                                        },
                                        {
                                            text:
                                                'R$_______________\nR$_______________\nR$_______________',
                                            alignment: 'right',
                                        },
                                    ],
                                },
                                '(   ) Cartão\n(   ) Dinheiro\n(   ) Cheque\n(   ) Depósito',
                                ' ',
                                ' ',
                                ' ',
                            ],
                            [
                                {
                                    text: '\nJulho',
                                    style: 'tableHeader',
                                },
                                {
                                    text: '\n_____/_____',
                                    alignment: 'center',
                                },
                                {
                                    columns: [
                                        {
                                            text: [
                                                '(   ) Mensalidade:',
                                                '\n(   ) Outros:',
                                                {
                                                    text: '\nTotal:',
                                                    bold: true,
                                                },
                                            ],
                                        },
                                        {
                                            text:
                                                'R$_______________\nR$_______________\nR$_______________',
                                            alignment: 'right',
                                        },
                                    ],
                                },
                                '(   ) Cartão\n(   ) Dinheiro\n(   ) Cheque\n(   ) Depósito',
                                ' ',
                                ' ',
                                ' ',
                            ],
                            [
                                {
                                    text: '\nAgosto',
                                    style: 'tableHeader',
                                },
                                {
                                    text: '\n_____/_____',
                                    alignment: 'center',
                                },
                                {
                                    columns: [
                                        {
                                            text: [
                                                '(   ) Mensalidade:',
                                                '\n(   ) Outros:',
                                                {
                                                    text: '\nTotal:',
                                                    bold: true,
                                                },
                                            ],
                                        },
                                        {
                                            text:
                                                'R$_______________\nR$_______________\nR$_______________',
                                            alignment: 'right',
                                        },
                                    ],
                                },
                                '(   ) Cartão\n(   ) Dinheiro\n(   ) Cheque\n(   ) Depósito',
                                ' ',
                                ' ',
                                ' ',
                            ],
                            [
                                {
                                    text: '\nSetembro',
                                    style: 'tableHeader',
                                },
                                {
                                    text: '\n_____/_____',
                                    alignment: 'center',
                                },
                                {
                                    columns: [
                                        {
                                            text: [
                                                '(   ) Mensalidade:',
                                                '\n(   ) Outros:',
                                                {
                                                    text: '\nTotal:',
                                                    bold: true,
                                                },
                                            ],
                                        },
                                        {
                                            text:
                                                'R$_______________\nR$_______________\nR$_______________',
                                            alignment: 'right',
                                        },
                                    ],
                                },
                                '(   ) Cartão\n(   ) Dinheiro\n(   ) Cheque\n(   ) Depósito',
                                ' ',
                                ' ',
                                ' ',
                            ],
                            [
                                {
                                    text: '\nOutubro',
                                    style: 'tableHeader',
                                },
                                {
                                    text: '\n_____/_____',
                                    alignment: 'center',
                                },
                                {
                                    columns: [
                                        {
                                            text: [
                                                '(   ) Mensalidade:',
                                                '\n(   ) Outros:',
                                                {
                                                    text: '\nTotal:',
                                                    bold: true,
                                                },
                                            ],
                                        },
                                        {
                                            text:
                                                'R$_______________\nR$_______________\nR$_______________',
                                            alignment: 'right',
                                        },
                                    ],
                                },
                                '(   ) Cartão\n(   ) Dinheiro\n(   ) Cheque\n(   ) Depósito',
                                ' ',
                                ' ',
                                ' ',
                            ],
                            [
                                {
                                    text: '\nNovembro',
                                    style: 'tableHeader',
                                },
                                {
                                    text: '\n_____/_____',
                                    alignment: 'center',
                                },
                                {
                                    columns: [
                                        {
                                            text: [
                                                '(   ) Mensalidade:',
                                                '\n(   ) Outros:',
                                                {
                                                    text: '\nTotal:',
                                                    bold: true,
                                                },
                                            ],
                                        },
                                        {
                                            text:
                                                'R$_______________\nR$_______________\nR$_______________',
                                            alignment: 'right',
                                        },
                                    ],
                                },
                                '(   ) Cartão\n(   ) Dinheiro\n(   ) Cheque\n(   ) Depósito',
                                ' ',
                                ' ',
                                ' ',
                            ],
                            [
                                {
                                    text: '\nDezembro',
                                    style: 'tableHeader',
                                },
                                {
                                    text: '\n_____/_____',
                                    alignment: 'center',
                                },
                                {
                                    columns: [
                                        {
                                            text: [
                                                '(   ) Mensalidade:',
                                                '\n(   ) Outros:',
                                                {
                                                    text: '\nTotal:',
                                                    bold: true,
                                                },
                                            ],
                                        },
                                        {
                                            text:
                                                'R$_______________\nR$_______________\nR$_______________',
                                            alignment: 'right',
                                        },
                                    ],
                                },
                                '(   ) Cartão\n(   ) Dinheiro\n(   ) Cheque\n(   ) Depósito',
                                ' ',
                                ' ',
                                ' ',
                            ],
                        ],
                        widths: ['auto', 'auto', 'auto', 'auto', '*', '*', '*'],
                    },
                },
            ],
        } as TDocumentDefinitions;

        const fileName = await this.pdfProvider.generate(documentDefinition);

        if (reenrollment.monthly_control) {
            await this.pdfProvider.delete(reenrollment.monthly_control);
        }

        await this.reenrollmentsRepository.updateMonthlyControl(
            reenrollment.enrollment_number,
            fileName,
        );

        return fileName;
    }
}

export default GenerateMonthlyControlPdfService;

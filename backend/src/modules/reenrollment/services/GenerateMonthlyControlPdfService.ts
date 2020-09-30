import path from 'path';
import { TDocumentDefinitions } from 'pdfmake/interfaces'; // eslint-disable-line

import ReenrollmentsRepository from '@modules/reenrollment/infra/mongoose/repositories/ReenrollmentsRepository';
import GeneratePDFService from '@modules/reenrollment/services/GeneratePDFService';
// import IPrettierEnrollmentDTO from '@modules/reenrollment/dtos/IPrettierEnrollmentDTO';
import { IReenrollmentsRepository } from '@modules/reenrollment/repositories/IReenrollmentsRepository';

class GenerateMonthlyControlPdfService {
    private reenrollmentsRepository: IReenrollmentsRepository;

    constructor() {
        this.reenrollmentsRepository = new ReenrollmentsRepository();
    }

    // reenrollment: IPrettierEnrollmentDTO,
    public async execute(): Promise<string> {
        const logoImage = path.resolve(
            __dirname,
            '..',
            '..',
            '..',
            'assets',
            'images',
            'logo.png',
        );

        const docDefinition = {
            pageSize: 'A4',
            pageOrientation: 'portrait',
            pageMargins: [25, 25, 25, 25],
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
                    font: 'Arial',
                    fontSize: 12,
                    bold: true,
                    alignment: 'center',
                },
                phrase: {
                    font: 'Arial',
                    fontSize: 10,
                    alignment: 'center',
                },
                tableHeader: {
                    font: 'Arial',
                    fontSize: 9,
                    alignment: 'center',
                    bold: true,
                },
            },
            defaultStyle: {
                font: 'Arial',
                fontSize: 9,
                lineHeight: 1.33,
                alignment: 'justify',
            },
            content: [
                {
                    columns: [
                        {
                            image: logoImage,
                            width: 80,
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
                                        '\n"Dá instrução ao sábio e ele se fará mais sábio,\nensina o justo e ele crescerá em entendimento" Prov. 9,9',
                                    style: 'phrase',
                                },
                                {
                                    text:
                                        '\nControle de Mensalidade Escolar — 2021',
                                    style: 'heading',
                                },
                            ],
                        },
                        {
                            text: '',
                            width: 80,
                        },
                    ],
                },
                {
                    columns: [
                        {
                            text: [
                                { text: 'Aluno(a): ', bold: true },
                                'Daniel Oliveira Nascimento',
                            ],
                        },
                        {
                            text: [{ text: 'Turma: ', bold: true }, '1º Ano'],
                            alignment: 'right',
                        },
                    ],
                },
                {
                    columns: [
                        {
                            text: [
                                { text: 'Mensalidade: ', bold: true },
                                'R$ 500,00',
                            ],
                        },
                        {
                            text: [{ text: 'Desconto: ', bold: true }, '10%'],
                            alignment: 'center',
                        },
                        {
                            text: [
                                {
                                    text: 'Mensalidade com desconto: ',
                                    bold: true,
                                },
                                'R$ 450,00',
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
                                    text: 'Matrícula/\nRematrícula\n2021',
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
                                    text: '\n\nJaneiro',
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
                                    text: '\n\nFevereiro',
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
                                    text: '\n\nMarço',
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
                                    text: '\n\nAbril',
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
                                    text: '\n\nMaio',
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
                                    text: '\n\nJunho',
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
                                    text: '\n\nJulho',
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
                                    text: '\n\nAgosto',
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
                                    text: '\n\nSetembro',
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
                                    text: '\n\nOutubro',
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
                                    text: '\n\nNovembro',
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
                                    text: '\n\nDezembro',
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
                        ],
                    },
                },
            ],
        } as TDocumentDefinitions;

        const generatePDF = new GeneratePDFService();

        const fileName = await generatePDF.execute({
            docDefinition,
            // deleteFileName: reenrollment.checklist,
        });

        // await this.reenrollmentsRepository.updateChecklist({
        //     enrollment_number: reenrollment.enrollment_number,
        //     checklist: fileName,
        // });

        return fileName;
    }
}

export default GenerateMonthlyControlPdfService;

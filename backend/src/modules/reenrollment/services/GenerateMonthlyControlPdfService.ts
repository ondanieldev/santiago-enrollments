import path from 'path';
import { TDocumentDefinitions } from 'pdfmake/interfaces'; // eslint-disable-line

import ReenrollmentsRepository from '@modules/reenrollment/infra/mongoose/repositories/ReenrollmentsRepository';
import GeneratePDFService from '@modules/reenrollment/services/GeneratePDFService';
import IPrettierEnrollmentDTO from '@modules/reenrollment/dtos/IPrettierEnrollmentDTO';
import { IReenrollmentsRepository } from '@modules/reenrollment/repositories/IReenrollmentsRepository';

interface IRequest {
    reenrollment: IPrettierEnrollmentDTO;
    contract_year: string;
    discount_percent: number;
    monthly_value?: number;
}

class GenerateMonthlyControlPdfService {
    private reenrollmentsRepository: IReenrollmentsRepository;

    constructor() {
        this.reenrollmentsRepository = new ReenrollmentsRepository();
    }

    public async execute({
        reenrollment,
        discount_percent,
        contract_year,
        monthly_value,
    }: IRequest): Promise<string> {
        const monthlyValue =
            contract_year === '2020'
                ? monthly_value || 0
                : reenrollment.monthly_value || 0;
        const monthlyWithDiscount =
            monthlyValue - (monthlyValue * discount_percent) / 100;

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
                                    text: `\nControle de Mensalidade Escolar — Ano ${contract_year}`,
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
                    text: `${reenrollment.student_name} — ${reenrollment.grade_name}`,
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
                                `R$ ${monthlyValue}`,
                            ],
                        },
                        {
                            text: [
                                { text: 'Desconto: ', bold: true },
                                `${discount_percent}%`,
                            ],
                            alignment: 'center',
                        },
                        {
                            text: [
                                {
                                    text: 'Mensalidade com desconto: ',
                                    bold: true,
                                },
                                `R$ ${monthlyWithDiscount}`,
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

        const generatePDF = new GeneratePDFService();

        const fileName = await generatePDF.execute({
            docDefinition,
            deleteFileName: reenrollment.monthly_control,
        });

        await this.reenrollmentsRepository.updateMonthlyControl({
            enrollment_number: reenrollment.enrollment_number,
            monthly_control: fileName,
        });

        return fileName;
    }
}

export default GenerateMonthlyControlPdfService;

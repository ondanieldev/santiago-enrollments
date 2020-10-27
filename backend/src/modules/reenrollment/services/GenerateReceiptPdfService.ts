import { injectable, inject } from 'tsyringe';
import path from 'path';
import { TDocumentDefinitions } from 'pdfmake/interfaces'; // eslint-disable-line
import { format as formatDate } from 'date-fns';

import AppError from '@shared/errors/AppError';
import IReenrollmentsRepository from '@modules/reenrollment/repositories/IReenrollmentsRepository';
import IPDFProvider from '@shared/containers/providers/PDFProvider/models/IPDFProvider';
import { formatGrade } from '@shared/utils/formatFunctions';

@injectable()
class GenerateReceiptPdfService {
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

        const studentArticle =
            reenrollment.student_gender === 'male' ? 'do aluno' : 'da aluna';

        let enrollmentValue = '';

        switch (reenrollment.enrollment_payment_format) {
            case 'financing':
                enrollmentValue = `Matrícula a prazo: R$ ${reenrollment.monthly_value} sendo este parcelado em (${reenrollment.enrollment_payment_times} vezes)`;
                break;
            case 'in_cash':
                enrollmentValue = `Matrícula à vista: R$ ${reenrollment.monthly_value}`;
                break;
            case 'dont_show':
                enrollmentValue = '';
                break;
            default:
                enrollmentValue = '';
                break;
        }

        let materialsValue = '';

        switch (reenrollment.materials_payment_format) {
            case 'financing':
                materialsValue = `Materiais didáticos a prazo: R$ ${reenrollment.materials_payment_value} sendo este parcelado em ${reenrollment.materials_payment_times} vezes)`;
                break;
            case 'in_cash':
                materialsValue = `Materiais didáticos à vista: R$ ${reenrollment.materials_payment_value}`;
                break;
            case 'dont_show':
                materialsValue =
                    'Lembramos que ainda falta o pagamento dos livros didáticos - Sistema de Ensino Anglo';
                break;
            default:
                materialsValue = '';
                break;
        }

        const imageLogo = path.resolve(
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
                title: 'Recibo',
                author: 'Colégio Santiago',
                subject: 'Recibo',
                keywords: 'Recibo, Pagamento',
                creator: 'Colégio Santiago',
                producer: 'Colégio Santiago',
            },
            styles: {
                heading: {
                    fontSize: 14,
                    bold: true,
                    alignment: 'center',
                },
                subheading: {
                    fontSize: 12,
                    bold: true,
                },
            },
            defaultStyle: {
                font: 'Arial',
                fontSize: 10,
                lineHeight: 1.25,
                alignment: 'justify',
            },
            content: [
                {
                    columns: [
                        {
                            image: imageLogo,
                            width: 90,
                            alignment: 'left',
                        },
                        {
                            text: [
                                {
                                    text: `RECIBO`,
                                    style: 'heading',
                                    width: '*',
                                },
                                {
                                    text: `\nContrato nº ${reenrollment.enrollment_number}`,
                                    style: 'heading',
                                    width: '*',
                                },
                            ],
                        },
                        {
                            text: `Betim, ${formatDate(
                                new Date(),
                                'dd/MM/yyyy',
                            )}`,
                            style: 'subheading',
                            alignment: 'right',
                            width: 90,
                        },
                    ],
                },
                {
                    columns: [
                        {
                            text: `Recebi ${studentArticle} ${reenrollment.student_name}`,
                            alignment: 'left',
                        },
                        {
                            text: `Valor da mensalidade R$ ${
                                reenrollment.monthly_value -
                                (reenrollment.monthly_value *
                                    reenrollment.discount_percent) /
                                    100
                            }`,
                            alignment: 'center',
                        },
                        {
                            text: `Turma ${gradeName}`,
                            alignment: 'right',
                        },
                    ],
                },
                'A importância abaixo referente ao pagamento de:',
                enrollmentValue,
                materialsValue,
                {
                    text:
                        'Obs: Conforme o contrato de prestação de serviço, cláusula 1ª - 5ª, a matrícula do aluno só será concretizada após a regularização do pagamento. Na cláusula 3ª - 4ª, a matrícula só será efetivada para o próximo ano letivo com a regularização dos pagamentos das mensaildades de fevereiro a dezembro conforme o ano de estudo e a entrega de todos os documentos solicitados no ato da matrícula. (Histórico, contrato, declaração de inexistência de débito na escola de origem, certidão de nascimento, foto e CPF e RG dos responsáveis.)',
                    fontSize: 9,
                },
                '\nCiente dos registros acima: ________________________________________',
                '\nSecreatria: ________________________________________',
                {
                    text:
                        '\nRua Rio Grande do Sul, nº 863 — Bairro Espírito Santo — Betim — MG. Telefone (31) 3595-2156. Site www.colegiosantiago.com.br\nEste documento não é valido para declaração de I.R.',
                    fontSize: 9,
                },
                // CÓPIA
                '\n\n',
                {
                    svg: `<svg width="2000" height="10">
                            <line x1="-1000" y1="0" x2="1000" y2="0" style="stroke:rgb(0,0,0);stroke-width:2" />
                        </svg>`,
                    margin: [-50, 0, 0, 0],
                },
                '\n',
                {
                    columns: [
                        {
                            image: imageLogo,
                            width: 90,
                            alignment: 'left',
                        },
                        {
                            text: [
                                {
                                    text: `RECIBO`,
                                    style: 'heading',
                                    width: '*',
                                },
                                {
                                    text: `\nContrato nº ${reenrollment.enrollment_number}`,
                                    style: 'heading',
                                    width: '*',
                                },
                            ],
                        },
                        {
                            text: `Betim, ${formatDate(
                                new Date(),
                                'dd/MM/yyyy',
                            )}`,
                            style: 'subheading',
                            alignment: 'right',
                            width: 90,
                        },
                    ],
                },
                {
                    columns: [
                        {
                            text: `Recebi ${studentArticle} ${reenrollment.student_name}`,
                            alignment: 'left',
                        },
                        {
                            text: `Valor da mensalidade R$ ${
                                reenrollment.monthly_value -
                                (reenrollment.monthly_value *
                                    reenrollment.discount_percent) /
                                    100
                            }`,
                            alignment: 'center',
                        },
                        {
                            text: `Turma ${gradeName}`,
                            alignment: 'right',
                        },
                    ],
                },
                'A importância abaixo referente ao pagamento de:',
                enrollmentValue,
                materialsValue,
                {
                    text:
                        'Obs: Conforme o contrato de prestação de serviço, cláusula 1ª - 5ª, a matrícula do aluno só será concretizada após a regularização do pagamento. Na cláusula 3ª - 4ª, a matrícula só será efetivada para o próximo ano letivo com a regularização dos pagamentos das mensaildades de fevereiro a dezembro conforme o ano de estudo e a entrega de todos os documentos solicitados no ato da matrícula. (Histórico, contrato, declaração de inexistência de débito na escola de origem, certidão de nascimento, foto e CPF e RG dos responsáveis.)',
                    fontSize: 9,
                },
                '\nCiente dos registros acima: ________________________________________',
                '\nSecreatria: ________________________________________',
                {
                    text:
                        '\nRua Rio Grande do Sul, nº 863 — Bairro Espírito Santo — Betim — MG. Telefone (31) 3595-2156. Site www.colegiosantiago.com.br\nEste documento não é valido para declaração de I.R.',
                    fontSize: 9,
                },
            ],
        } as TDocumentDefinitions;

        const fileName = await this.pdfProvider.generate(documentDefinition);

        if (reenrollment.receipt) {
            await this.pdfProvider.delete(reenrollment.receipt);
        }

        await this.reenrollmentsRepository.updateReceipt(
            reenrollment.enrollment_number,
            fileName,
        );

        return fileName;
    }
}

export default GenerateReceiptPdfService;

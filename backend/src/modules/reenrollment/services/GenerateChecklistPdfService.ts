import { injectable, inject } from 'tsyringe';
import path from 'path';
import { TDocumentDefinitions } from 'pdfmake/interfaces'; // eslint-disable-line
import { format as formatDate } from 'date-fns';

import AppError from '@shared/errors/AppError';
import IReenrollmentsRepository from '@modules/reenrollment/repositories/IReenrollmentsRepository';
import IPDFProvider from '@shared/containers/providers/PDFProvider/models/IPDFProvider';

@injectable()
class GenerateChecklistPdfService {
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
                'Não é possível gerar o checklist de uma matrícula que não existe!',
            );
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
                title: 'Checklist de Documentos',
                author: 'Colégio Santiago',
                subject: 'Checklist de Documentos',
                keywords: 'Checklist, Documentos',
                creator: 'Colégio Santiago',
                producer: 'Colégio Santiago',
            },
            styles: {
                heading: {
                    fontSize: 12,
                    bold: true,
                    alignment: 'center',
                },
                subheading: {
                    fontSize: 10,
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
                            width: 65,
                            alignment: 'center',
                        },
                        {
                            text: [
                                {
                                    text: `Checklist de Documentos de Matrícula/Rematrícula - Ano ${reenrollment.enrollment_year}`,
                                    style: 'heading',
                                },
                                {
                                    text: `\nDocumento Emitido em ${formatDate(
                                        new Date(),
                                        'dd/MM/yyyy',
                                    )}`,
                                    style: 'subheading',
                                    alignment: 'center',
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
                    text: '\nIdentificação do Aluno',
                    style: 'subheading',
                },
                // ALUNO
                {
                    columns: [
                        `Nome: ${reenrollment.student_name}`,
                        {
                            text: `Turma: ${reenrollment.grade_name}`,
                            alignment: 'right',
                        },
                    ],
                },
                {
                    columns: [
                        `Data de Nascimento: ${formatDate(
                            reenrollment.student_birth_date,
                            'dd/MM/yyyy',
                        )}`,
                        {
                            text: `Naturalidade: ${reenrollment.student_birth_city}`,
                            alignment: 'center',
                            width: '*',
                        },
                        {
                            text: `UF: ${reenrollment.student_birth_state}`,
                            alignment: 'right',
                        },
                    ],
                },
                {
                    columns: [
                        `Nacionalidade: ${reenrollment.student_nacionality}`,
                        {
                            text: `Sexo: ${reenrollment.student_gender}`,
                            alignment: 'center',
                            width: '*',
                        },
                        {
                            text: `Cor/Raça: ${reenrollment.student_race}`,
                            alignment: 'right',
                        },
                    ],
                },
                // RESPONSÁVEL FINANCEIRO
                {
                    text: '\nResponsável Financeiro',
                    style: 'subheading',
                },
                `Nome: ${reenrollment.financial_name}`,
                `E-mail: ${reenrollment.financial_email}`,
                `CEP: ${reenrollment.financial_address_cep}`,
                `Endereço: Rua ${reenrollment.financial_address_street} - Número ${reenrollment.financial_address_number} ${reenrollment.financial_address_complement} - Bairro ${reenrollment.financial_address_neighborhood} - Cidade ${reenrollment.financial_address_city}`,
                {
                    columns: [
                        `RG: ${reenrollment.financial_rg}`,
                        {
                            text: `CPF: ${reenrollment.financial_cpf}`,
                            alignment: 'right',
                        },
                    ],
                },
                {
                    columns: [
                        `Aniversário: ${formatDate(
                            reenrollment.financial_birth_date,
                            'MM/yyyy',
                        )}`,
                        {
                            text: `Grau de Instrução: ${reenrollment.financial_education_level}`,
                            alignment: 'right',
                        },
                    ],
                },
                {
                    columns: [
                        `Profissão: ${reenrollment.financial_profission}`,
                        {
                            text: `Telefone Comercial: ${reenrollment.financial_commercial_phone}`,
                            alignment: 'right',
                        },
                    ],
                },
                {
                    columns: [
                        `Telefone Fixo: ${reenrollment.financial_residencial_phone}`,
                        {
                            text: `Telefone Celular: ${reenrollment.financial_personal_phone}`,
                            alignment: 'right',
                        },
                    ],
                },
                // RESPONSÁVEL SOLIDÁRIO
                {
                    text: '\nResponsável Solidário',
                    style: 'subheading',
                },
                `Nome: ${reenrollment.supportive_name}`,
                `E-mail: ${reenrollment.supportive_email}`,
                {
                    columns: [
                        `RG: ${reenrollment.supportive_rg}`,
                        {
                            text: `CPF: ${reenrollment.supportive_cpf}`,
                            alignment: 'right',
                        },
                    ],
                },
                {
                    columns: [
                        `Aniversário: ${formatDate(
                            reenrollment.supportive_birth_date,
                            'MM/yyyy',
                        )}`,
                        {
                            text: `Grau de Instrução: ${reenrollment.supportive_education_level}`,
                            alignment: 'center',
                            width: '*',
                        },
                        {
                            text: `Profissão: ${reenrollment.supportive_profission}`,
                            alignment: 'right',
                        },
                    ],
                },
                // Checklist
                {
                    columns: [
                        {
                            text: `\n\n\n02 fotos 3x4\n
                            CPF pai (  ) mãe (  )\n
                            RG  pai (  ) mãe (  )\n
                            Histórico escolar\n
                            Cartão de vacina\n
                            Carteira de plano de saúde\n
                            Comprovante de residência\n
                            Certidão de nascimento do aluno\n
                            Declaração de transferência escolar\n
                            Declaração de quitação de débito da escola de origem\n
                            Laudo — Aluno com Deficiência/Necesidades Especiais\n
                            Relatório — Aluno com Deficiência/Necesidades Especiais\n\n\n`,
                            width: 'auto',
                        },
                        {
                            width: '*',
                            alignment: 'right',
                            text: `\n\n\nAssinatura: __________ Data: ____/____ Hora: ____:____\n
                            Assinatura: __________ Data: ____/____ Hora: ____:____\n
                            Assinatura: __________ Data: ____/____ Hora: ____:____\n
                            Assinatura: __________ Data: ____/____ Hora: ____:____\n
                            Assinatura: __________ Data: ____/____ Hora: ____:____\n
                            Assinatura: __________ Data: ____/____ Hora: ____:____\n
                            Assinatura: __________ Data: ____/____ Hora: ____:____\n
                            Assinatura: __________ Data: ____/____ Hora: ____:____\n
                            Assinatura: __________ Data: ____/____ Hora: ____:____\n
                            Assinatura: __________ Data: ____/____ Hora: ____:____\n
                            Assinatura: __________ Data: ____/____ Hora: ____:____\n
                            Assinatura: __________ Data: ____/____ Hora: ____:____\n\n\n`,
                        },
                    ],
                },
                {
                    columns: [
                        '______________________________\nSECRETARIA',
                        '______________________________\nDIREÇÃO',
                        '______________________________\nATENDENTE',
                    ],
                    alignment: 'center',
                },
            ],
        } as TDocumentDefinitions;

        const fileName = await this.pdfProvider.generate(documentDefinition);

        if (reenrollment.checklist) {
            await this.pdfProvider.delete(reenrollment.checklist);
        }

        await this.reenrollmentsRepository.updateChecklist(
            reenrollment.enrollment_number,
            fileName,
        );

        return fileName;
    }
}

export default GenerateChecklistPdfService;

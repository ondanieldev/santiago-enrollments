import mongoose from 'mongoose';
import { resolve } from 'path';
import { TDocumentDefinitions } from 'pdfmake/interfaces'; // eslint-disable-line
import { format as formatDate } from 'date-fns';

import AppError from '@shared/errors/AppError';
import PrettierDataService from '@modules/reenrollment/services/PrettierDataService';
import GeneratePDFService from '@modules/reenrollment/services/GeneratePDFService';
import {
    ReenrollmentSchema,
    IReenrollment,
} from '@modules/reenrollment/infra/mongoose/schemas/ReenrollmentSchema';

interface IRequest {
    enrollment_number: number;
}

class GenerateChecklistPdfService {
    public async execute({ enrollment_number }: IRequest): Promise<string> {
        const Reenrollment = mongoose.model<IReenrollment>(
            'Reenrollment',
            ReenrollmentSchema,
        );

        const reenrollmentFromDB = await Reenrollment.findOne({
            enrollment_number,
        });

        if (!reenrollmentFromDB) {
            throw new AppError('Rematrícula inválida!');
        }

        const prettierData = new PrettierDataService();

        const reenrollment = prettierData.execute(reenrollmentFromDB);

        const docDefinition = {
            pageSize: 'A4',
            pageOrientation: 'portrait',
            pageMargins: [25, 25, 25, 25],
            info: {
                title: 'Checklist',
                author: 'Colégio Santiago',
                subject: 'Checklist',
                keywords: 'Ficha, Rematrícula',
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
                subheading: {
                    font: 'Arial',
                    fontSize: 11,
                    bold: true,
                },
            },
            defaultStyle: {
                font: 'Arial',
                fontSize: 10,
                lineHeight: 1.33,
            },
            content: [
                {
                    columns: [
                        {
                            image: resolve(
                                __dirname,
                                '..',
                                '..',
                                '..',
                                'assets',
                                'images',
                                'logo.png',
                            ),
                            width: 90,
                            alignment: 'center',
                        },
                        {
                            text: [
                                {
                                    text: 'Checklist',
                                    style: 'heading',
                                    alignment: 'center',
                                },
                                {
                                    text: `\nEmitido em ${formatDate(
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
                            width: 90,
                        },
                    ],
                },
                {
                    text: '\nIdentificação do Aluno',
                    style: 'subheading',
                },
                // ALUNO
                `Nome: ${reenrollment.student_name}`,
                {
                    columns: [
                        {
                            width: 'auto',
                            text: `Data de Nascimento: ${formatDate(
                                reenrollment.student_birth_date,
                                'dd/MM/yyyy',
                            )}`,
                        },
                        {
                            width: '*',
                            text: `Naturalidade: ${reenrollment.student_birth_city}`,
                            alignment: 'center',
                        },
                        {
                            width: 'auto',
                            text: `UF: ${reenrollment.student_birth_state}`,
                        },
                    ],
                },
                {
                    columns: [
                        {
                            width: 'auto',
                            text: `Nacionalidade: ${reenrollment.student_nacionality}`,
                        },
                        {
                            width: '*',
                            text: `Sexo: ${reenrollment.student_gender}`,
                            alignment: 'center',
                        },
                        {
                            width: 'auto',
                            text: `Cor/Raça: ${reenrollment.student_race}`,
                        },
                    ],
                },
                // RESPONSÁVEL FINANCEIRO
                {
                    text: '\nResponsável Financeiro',
                    style: 'subheading',
                },
                {
                    text: `Nome: ${reenrollment.financial_name}`,
                },
                {
                    text: `E-mail: ${reenrollment.financial_email}`,
                },
                {
                    text: `CEP: ${reenrollment.financial_address_cep}`,
                },
                {
                    text: `Endereço: Rua ${reenrollment.financial_address_street} - Número ${reenrollment.financial_address_number} ${reenrollment.financial_address_complement} - Bairro ${reenrollment.financial_address_neighborhood} - Cidade ${reenrollment.financial_address_city}`,
                },
                {
                    columns: [
                        {
                            width: '*',
                            text: `RG: ${reenrollment.financial_rg}`,
                        },
                        {
                            width: 'auto',
                            text: `CPF: ${reenrollment.financial_cpf}`,
                            alignment: 'right',
                        },
                    ],
                },
                {
                    columns: [
                        {
                            width: '*',
                            text: `Aniversário: ${formatDate(
                                reenrollment.financial_birth_date,
                                'MM/yyyy',
                            )}`,
                        },
                        {
                            width: 'auto',
                            text: `Grau de Instrução: ${reenrollment.financial_education_level}`,
                            alignment: 'right',
                        },
                    ],
                },
                {
                    columns: [
                        {
                            width: '*',
                            text: `Profissão: ${reenrollment.financial_profission}`,
                        },
                        {
                            width: 'auto',
                            text: `Telefone Comercial: ${reenrollment.financial_commercial_phone}`,
                            alignment: 'right',
                        },
                    ],
                },
                {
                    columns: [
                        {
                            width: '*',
                            text: `Telefone Fixo: ${reenrollment.financial_residencial_phone}`,
                        },
                        {
                            width: 'auto',
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
                {
                    text: `Nome: ${reenrollment.supportive_name}`,
                },
                {
                    text: `E-mail: ${reenrollment.supportive_email}`,
                },
                {
                    columns: [
                        {
                            width: '*',
                            text: `RG: ${reenrollment.supportive_rg}`,
                        },
                        {
                            width: 'auto',
                            text: `CPF: ${reenrollment.supportive_cpf}`,
                            alignment: 'right',
                        },
                    ],
                },
                {
                    columns: [
                        {
                            width: 'auto',
                            text: `Aniversário: ${formatDate(
                                reenrollment.supportive_birth_date,
                                'MM/yyyy',
                            )}`,
                        },
                        {
                            width: '*',
                            text: `Grau de Instrução: ${reenrollment.supportive_education_level}`,
                            alignment: 'center',
                        },
                        {
                            width: 'auto',
                            text: `Profissão: ${reenrollment.supportive_profission}`,
                        },
                    ],
                },
                // Checklist
                {
                    text: '\nChecklist',
                    style: 'subheading',
                },
                {
                    columns: [
                        {
                            width: 'auto',
                            text: `
                            02 fotos 3x4\n
                            Certidão de nascimento do aluno\n
                            CPF\n
                            RG\n
                            Comprovante de residência\n
                            Carteira de plano de saúde\n
                            Declaração de transferência escolar\n
                            Histórico escolar\n
                            Cartão de vacina\n
                            `,
                        },
                        {
                            width: '*',
                            alignment: 'right',
                            text: `
                            Assinatura: _______________ Data: _____/_____/_____ Hora: _____/_____\n
                            Assinatura: _______________ Data: _____/_____/_____ Hora: _____/_____\n
                            Assinatura: _______________ Data: _____/_____/_____ Hora: _____/_____\n
                            Assinatura: _______________ Data: _____/_____/_____ Hora: _____/_____\n
                            Assinatura: _______________ Data: _____/_____/_____ Hora: _____/_____\n
                            Assinatura: _______________ Data: _____/_____/_____ Hora: _____/_____\n
                            Assinatura: _______________ Data: _____/_____/_____ Hora: _____/_____\n
                            Assinatura: _______________ Data: _____/_____/_____ Hora: _____/_____\n
                            Assinatura: _______________ Data: _____/_____/_____ Hora: _____/_____`,
                        },
                    ],
                },
                {
                    columns: [
                        '____________________\nSECRETARIA',
                        '____________________\nRESPONSÁVEL',
                        '____________________\nDIREÇÃO',
                    ],
                    alignment: 'center',
                },
            ],
        } as TDocumentDefinitions;

        const generatePDF = new GeneratePDFService();

        const fileName = await generatePDF.execute({
            docDefinition,
            deleteFileName: reenrollment.checklist,
        });

        await Reenrollment.findOneAndUpdate(
            {
                enrollment_number,
            },
            {
                checklist: fileName,
            },
            {
                useFindAndModify: false,
            },
        );

        return fileName;
    }
}

export default GenerateChecklistPdfService;

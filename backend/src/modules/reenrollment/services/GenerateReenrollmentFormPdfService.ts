import mongoose from 'mongoose';
import { resolve } from 'path';
import { TDocumentDefinitions } from 'pdfmake/interfaces'; // eslint-disable-line
import { format as formatDate } from 'date-fns';

import PrettierDataService from '@modules/reenrollment/services/PrettierDataService';
import GeneratePDFService from '@modules/reenrollment/services/GeneratePDFService';
import AppError from '@shared/errors/AppError';
import {
    ReenrollmentSchema,
    IReenrollment,
} from '@modules/reenrollment/infra/mongoose/schemas/ReenrollmentSchema';

interface IRequest {
    enrollment_number: number;
}

class GenerateReenrollmentFormPdfService {
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
                title: 'Ficha de Rematrícula',
                author: 'Colégio Santiago',
                subject: 'Ficha de Rematrícula',
                keywords: 'Ficha, Rematrícula',
                creator: 'Colégio Santiago',
                producer: 'Colégio Santiago',
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
                            text: `Ficha de Matrícula - Ano 2021\nEmitido em ${formatDate(
                                new Date(),
                                'dd/MM/yyyy',
                            )}`,
                            style: 'heading',
                            alignment: 'center',
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
                {
                    text: `Nome: ${reenrollment.student_name}`,
                },
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
                    text: `CEP: ${reenrollment.supportive_address_cep}`,
                },
                {
                    text: `Endereço: Rua ${reenrollment.supportive_address_street} - Número ${reenrollment.supportive_address_number} ${reenrollment.supportive_address_complement} - Bairro ${reenrollment.supportive_address_neighborhood} - Cidade ${reenrollment.supportive_address_city}`,
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
                            width: '*',
                            text: `Aniversário: ${formatDate(
                                reenrollment.supportive_birth_date,
                                'MM/yyyy',
                            )}`,
                        },
                        {
                            width: 'auto',
                            text: `Grau de Instrução: ${reenrollment.supportive_education_level}`,
                            alignment: 'right',
                        },
                    ],
                },
                {
                    columns: [
                        {
                            width: '*',
                            text: `Profissão: ${reenrollment.supportive_profission}`,
                        },
                        {
                            width: 'auto',
                            text: `Telefone Comercial: ${reenrollment.supportive_commercial_phone}`,
                            alignment: 'right',
                        },
                    ],
                },
                {
                    columns: [
                        {
                            width: '*',
                            text: `Telefone Fixo: ${reenrollment.supportive_residencial_phone}`,
                        },
                        {
                            width: 'auto',
                            text: `Telefone Celular: ${reenrollment.supportive_personal_phone}`,
                            alignment: 'right',
                        },
                    ],
                },
                // DADOS COMPLEMENTARES
                {
                    text: '\nDados complementares',
                    style: 'subheading',
                },
                {
                    text: `Escola de Origem: ${reenrollment.student_origin_school}`,
                },
                {
                    text: `${
                        reenrollment.student_ease_relating
                            ? 'O aluno possui facilidade em se relacionar.'
                            : 'O aluno não possui facilidade em se relacionar.'
                    }`,
                },
                {
                    text: `${
                        reenrollment.student_health_plan
                            ? `Plano de Saúde: ${reenrollment.student_health_plan}`
                            : 'Declarado pelo responsável que o aluno não possui plano de saúde.'
                    }`,
                },
                {
                    text: `${
                        reenrollment.student_food_alergy
                            ? `Alergia a Alimentos: ${reenrollment.student_food_alergy}`
                            : 'Declarado pelo responsável que o aluno não possui alergia a alimentos.'
                    }`,
                },
                {
                    text: `${
                        reenrollment.student_medication_alergy
                            ? `Plano de Saúde: ${reenrollment.student_medication_alergy}`
                            : 'Declarado pelo responsável que o aluno não possui alergia a remédios'
                    }`,
                },
                {
                    text: `${
                        reenrollment.student_health_problem
                            ? `Problema de Saúde: ${reenrollment.student_health_problem}`
                            : 'Declarado pelo responsável que o aluno não possui problema de saúde.'
                    }`,
                },
                {
                    text: `${
                        reenrollment.student_special_necessities
                            ? `Necessidades Especiais: ${reenrollment.student_special_necessities}`
                            : 'Declarado pelo responsável que o aluno não é portador de necessidades especiais.'
                    }`,
                },
                {
                    text:
                        '\nComprometo-me a regularização dos documentos solicitados pelo colégio de acordo com a legislação em vigor. Esta ficha de matrícula é parte do contrato de Prestação de Serviços Educacionais por adesão, assinado entre as partes conforme o ano letivo em estudo.',
                    alignment: 'justify',
                },
                {
                    text: '\nAssinatura do Responsável',
                    alignment: 'center',
                },
                {
                    text: '\n______________________________',
                    alignment: 'center',
                },
                {
                    text: reenrollment.financial_name,
                    alignment: 'center',
                },
                {
                    text: formatDate(new Date(), 'dd/MM/yyyy'),
                    alignment: 'center',
                },
            ],
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

        const generatePDF = new GeneratePDFService();

        const fileName = await generatePDF.execute({
            docDefinition,
            deleteFileName: reenrollment.reenrollment_form,
        });

        await Reenrollment.findOneAndUpdate(
            {
                enrollment_number,
            },
            {
                reenrollment_form: fileName,
            },
            {
                useFindAndModify: false,
            },
        );

        return fileName;
    }
}

export default GenerateReenrollmentFormPdfService;

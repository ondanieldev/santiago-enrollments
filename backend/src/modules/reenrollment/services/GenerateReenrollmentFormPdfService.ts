import path from 'path';
import { TDocumentDefinitions } from 'pdfmake/interfaces'; // eslint-disable-line
import { format as formatDate } from 'date-fns';

import ReenrollmentsRepository from '@modules/reenrollment/infra/mongoose/repositories/ReenrollmentsRepository';
import GeneratePDFService from '@modules/reenrollment/services/GeneratePDFService';
import IPrettierEnrollmentDTO from '@modules/reenrollment/dtos/IPrettierEnrollmentDTO';
import { IReenrollmentsRepository } from '@modules/reenrollment/repositories/IReenrollmentsRepository';

class GenerateReenrollmentFormPdfService {
    private reenrollmentsRepository: IReenrollmentsRepository;

    constructor() {
        this.reenrollmentsRepository = new ReenrollmentsRepository();
    }

    public async execute(
        reenrollment: IPrettierEnrollmentDTO,
    ): Promise<string> {
        const imageLogo = path.resolve(
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
                title: 'Ficha de Matrícula',
                author: 'Colégio Santiago',
                subject: 'Ficha de Matrícula',
                keywords: 'Ficha, Matrícula',
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
                                    text: 'Ficha de Matrícula - Ano 2021',
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
                `Nome: ${reenrollment.student_name}`,
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
                `CEP: ${reenrollment.supportive_address_cep}`,
                `Endereço: Rua ${reenrollment.supportive_address_street} - Número ${reenrollment.supportive_address_number} ${reenrollment.supportive_address_complement} - Bairro ${reenrollment.supportive_address_neighborhood} - Cidade ${reenrollment.supportive_address_city}`,
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
                            alignment: 'right',
                        },
                    ],
                },
                {
                    columns: [
                        `Profissão: ${reenrollment.supportive_profission}`,
                        {
                            text: `Telefone Comercial: ${reenrollment.supportive_commercial_phone}`,
                            alignment: 'right',
                        },
                    ],
                },
                {
                    columns: [
                        `Telefone Fixo: ${reenrollment.supportive_residencial_phone}`,
                        {
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
                    text: `Escola de Origem: ${
                        reenrollment.student_origin_school || 'Colégio Santiago'
                    }`,
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
                '\nComprometo-me a regularização dos documentos solicitados pelo colégio de acordo com a legislação em vigor. Esta ficha de matrícula é parte do contrato de Prestação de Serviços Educacionais por adesão, assinado entre as partes conforme o ano letivo em estudo.',
                {
                    text: '\n\n______________________________',
                    alignment: 'center',
                },
                {
                    text: 'RESPONSÁVEL FINANCEIRO',
                    alignment: 'center',
                },
                {
                    text: reenrollment.financial_name.toUpperCase(),
                    alignment: 'center',
                },
                {
                    text: '\nBETIM, MG',
                    alignment: 'center',
                },
                {
                    text: formatDate(new Date(), 'dd/MM/yyyy'),
                    alignment: 'center',
                },
            ],
        } as TDocumentDefinitions;

        const generatePDF = new GeneratePDFService();

        const fileName = await generatePDF.execute({
            docDefinition,
            deleteFileName: reenrollment.reenrollment_form,
        });

        await this.reenrollmentsRepository.updateReenrollmentForm({
            enrollment_number: reenrollment.enrollment_number,
            reenrollment_form: fileName,
        });

        return fileName;
    }
}

export default GenerateReenrollmentFormPdfService;

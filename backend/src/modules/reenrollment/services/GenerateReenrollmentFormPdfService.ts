import PDFMake from 'pdfmake';
import mongoose from 'mongoose';
import fs from 'fs';
import { v4 } from 'uuid';
import { resolve } from 'path';
import { TDocumentDefinitions } from 'pdfmake/interfaces';
import { format as formatDate } from 'date-fns';

import AppError from '@shared/errors/AppError';
import {
    ReenrollmentSchema,
    IReenrollment,
} from '@modules/reenrollment/infra/mongoose/schemas/ReenrollmentSchema';

interface IRequest {
    _id: string;
}

class GenerateReenrollmentFormPdfService {
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

        reenrollment.student_name = this.capitalize(reenrollment.student_name);
        reenrollment.student_birth_city = this.capitalize(
            reenrollment.student_birth_city,
        );
        reenrollment.student_birth_state = this.capitalize(
            reenrollment.student_birth_state,
        );
        reenrollment.student_nacionality = this.capitalize(
            reenrollment.student_nacionality,
        );
        reenrollment.financial_name = this.capitalize(
            reenrollment.financial_name,
        );
        reenrollment.financial_email = reenrollment.financial_email.toLowerCase();
        reenrollment.financial_address_street = this.capitalize(
            reenrollment.financial_address_street,
        );
        reenrollment.financial_address_neighborhood = this.capitalize(
            reenrollment.financial_address_neighborhood,
        );
        reenrollment.financial_address_complement = this.capitalize(
            reenrollment.financial_address_complement,
        );
        reenrollment.financial_address_city = this.capitalize(
            reenrollment.financial_address_city,
        );
        reenrollment.financial_profission = this.capitalize(
            reenrollment.financial_profission,
        );
        reenrollment.supportive_name = this.capitalize(
            reenrollment.supportive_name,
        );
        reenrollment.supportive_email = reenrollment.supportive_email.toLowerCase();
        reenrollment.supportive_address_street = this.capitalize(
            reenrollment.supportive_address_street,
        );
        reenrollment.supportive_address_neighborhood = this.capitalize(
            reenrollment.supportive_address_neighborhood,
        );
        reenrollment.supportive_address_complement = this.capitalize(
            reenrollment.supportive_address_complement,
        );
        reenrollment.supportive_address_city = this.capitalize(
            reenrollment.supportive_address_city,
        );
        reenrollment.supportive_profission = this.capitalize(
            reenrollment.supportive_profission,
        );
        reenrollment.student_origin_school = this.capitalize(
            reenrollment.student_origin_school,
        );
        reenrollment.student_health_plan = this.capitalize(
            reenrollment.student_health_plan,
        );
        reenrollment.student_food_alergy = this.capitalize(
            reenrollment.student_food_alergy,
        );
        reenrollment.student_medication_alergy = this.capitalize(
            reenrollment.student_medication_alergy,
        );
        reenrollment.student_health_problem = this.capitalize(
            reenrollment.student_health_problem,
        );
        reenrollment.student_special_necessities = this.capitalize(
            reenrollment.student_special_necessities,
        );

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
                            text: `Sexo: ${this.formatGender(
                                reenrollment.student_gender,
                            )}`,
                            alignment: 'center',
                        },
                        {
                            width: 'auto',
                            text: `Cor/Raça: ${this.formatRace(
                                reenrollment.student_race,
                            )}`,
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
                            text: `Grau de Instrução: ${this.formatEducationLevel(
                                reenrollment.financial_education_level,
                            )}`,
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
                            text: `Grau de Instrução: ${this.formatEducationLevel(
                                reenrollment.supportive_education_level,
                            )}`,
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

        const fileHash = v4();
        const fileName = `ficha-${fileHash}.pdf`;
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
                reenrollment_form: fileName,
            },
            {
                useFindAndModify: false,
            },
        );

        if (reenrollment.reenrollment_form) {
            const deletePath = resolve(
                __dirname,
                '..',
                '..',
                '..',
                '..',
                'tmp',
                reenrollment.reenrollment_form,
            );

            fs.unlinkSync(deletePath);
        }

        return fileName;
    }

    private capitalize(str: string): string {
        if (typeof str === 'string') {
            return str
                .toLowerCase()
                .replace(/(^\w{1})|(\s+\w{1})/g, letter =>
                    letter.toUpperCase(),
                );
        }
        return '';
    }

    private formatGender(gender: 'male' | 'female'): string {
        switch (gender) {
            case 'male':
                return 'Masculino';
            case 'female':
                return 'Feminino';
            default:
                return '-';
        }
    }

    private formatRace(
        race: 'white' | 'brown' | 'black' | 'indigenous' | 'yellow',
    ): string {
        switch (race) {
            case 'white':
                return 'Branco';
            case 'brown':
                return 'Pardo';
            case 'black':
                return 'Negro';
            case 'indigenous':
                return 'Indígena';
            case 'yellow':
                return 'Amarelo';
            default:
                return '-';
        }
    }

    private formatEducationLevel(
        educationLevel:
            | 'elementary_incompleted'
            | 'elementary_completed'
            | 'highschool_incompleted'
            | 'highschool_completed'
            | 'university_incompleted'
            | 'university_completed',
    ): string {
        switch (educationLevel) {
            case 'elementary_incompleted':
                return 'Fundamental Incompleto';
            case 'elementary_completed':
                return 'Fundamental Completo';
            case 'highschool_incompleted':
                return 'Segundo Grau Incompleto';
            case 'highschool_completed':
                return 'Segundo Grau Completo';
            case 'university_incompleted':
                return 'Superior Incompleto';
            case 'university_completed':
                return 'Superior Completo';
            default:
                return '-';
        }
    }
}

export default GenerateReenrollmentFormPdfService;

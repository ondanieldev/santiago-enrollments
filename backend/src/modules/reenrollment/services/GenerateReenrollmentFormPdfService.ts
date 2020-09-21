import PDFKit from 'pdfkit';
import mongoose from 'mongoose';
import fs from 'fs';
import { v4 } from 'uuid';
import { resolve } from 'path';
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
        const pdf = new PDFKit();

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

        const arial = resolve(
            __dirname,
            '..',
            '..',
            '..',
            'assets',
            'fonts',
            `arial.ttf`,
        );

        const arialBold = resolve(
            __dirname,
            '..',
            '..',
            '..',
            'assets',
            'fonts',
            `arialbd.ttf`,
        );

        // Defaults
        pdf.lineGap(1.5);

        // Header
        pdf.font(arialBold)
            .fontSize(14)
            .text('Ficha de Rematrícula - Ano 2021', { align: 'center' })
            .fontSize(12)
            .text(
                `Contrato emitido em ${formatDate(new Date(), 'dd/MM/yyyy')}`,
                { align: 'center' },
            )
            .moveDown();

        // Student Data
        pdf.font(arialBold)
            .fontSize(12)
            .text('Identificação do aluno:')
            .font(arial)
            .fontSize(12)
            .text(`Nome do aluno: ${reenrollment.student_name}`)
            .text(
                `Data de nascimento: ${formatDate(
                    reenrollment.student_birth_date,
                    'dd/MM/yyyy',
                )}`,
                {
                    align: 'left',
                    continued: true,
                },
            )
            .text(`Naturalidade: ${reenrollment.student_birth_city}`, {
                align: 'center',
                continued: true,
            })
            .text(`UF: ${reenrollment.student_birth_state}`, { align: 'right' })
            .text(`Nacionalidade: ${reenrollment.student_nacionality}`, {
                align: 'left',
                continued: true,
            })
            .text(`Sexo: ${this.formatGender(reenrollment.student_gender)}`, {
                align: 'right',
            })
            .text(
                `Cor/Raça (solicitação do senso escolar): ${this.formatRace(
                    reenrollment.student_race,
                )}`,
            )
            .moveDown();

        // Financial Responsible reenrollment
        pdf.font(arialBold)
            .fontSize(12)
            .text('Responsável financeiro:')
            .font(arial)
            .fontSize(12)
            .text(`Nome: ${reenrollment.financial_name}`)
            .text(
                `Aniversário: ${formatDate(
                    reenrollment.financial_birth_date,
                    'MM/yyyy',
                )}`,
                { align: 'left', continued: true },
            )
            .text(`E-mail: ${reenrollment.financial_email}`, { align: 'right' })
            .text(`Profissão: ${reenrollment.financial_profission}`, {
                align: 'left',
                continued: true,
            })
            .text(
                `Grau de instrução: ${this.formatEducationLevel(
                    reenrollment.financial_education_level,
                )}`,
                { align: 'right' },
            )
            .text(`RG: ${reenrollment.financial_rg}`, {
                align: 'left',
                continued: true,
            })
            .text(`CPF: ${reenrollment.financial_cpf}`, {
                align: 'center',
                continued: true,
            })
            .text(`CEP: ${reenrollment.financial_address_cep}`, {
                align: 'right',
            })
            .text(
                `Endereço: rua ${reenrollment.financial_address_street} - número ${reenrollment.financial_address_number} ${reenrollment.financial_address_complement} - bairro ${reenrollment.financial_address_neighborhood} - cidade ${reenrollment.financial_address_city}`,
            )
            .text(
                `Telefone fixo: ${reenrollment.financial_residencial_phone}`,
                { align: 'left', continued: true },
            )
            .text(
                `Telefone comercial: ${reenrollment.financial_commercial_phone}`,
                { align: 'center', continued: true },
            )
            .text(
                `Telefone celular: ${reenrollment.financial_personal_phone}`,
                { align: 'right' },
            )
            .moveDown();

        // Supportive Responsible reenrollment
        pdf.font(arialBold)
            .fontSize(12)
            .text('Responsável solidário:')
            .font(arial)
            .fontSize(12)
            .text(`Nome: ${reenrollment.supportive_name}`)
            .text(
                `Aniversário: ${formatDate(
                    reenrollment.supportive_birth_date,
                    'MM/yyyy',
                )}`,
                { align: 'left', continued: true },
            )
            .text(`E-mail: ${reenrollment.supportive_email}`, {
                align: 'right',
            })
            .text(`Profissão: ${reenrollment.supportive_profission}`, {
                align: 'left',
                continued: true,
            })
            .text(
                `Grau de instrução: ${this.formatEducationLevel(
                    reenrollment.supportive_education_level,
                )}`,
                { align: 'right' },
            )
            .text(`RG: ${reenrollment.supportive_rg}`, {
                align: 'left',
                continued: true,
            })
            .text(`CPF: ${reenrollment.supportive_cpf}`, {
                align: 'center',
                continued: true,
            })
            .text(`CEP: ${reenrollment.supportive_address_cep}`, {
                align: 'right',
            })
            .text(
                `Endereço: rua ${reenrollment.supportive_address_street} - número ${reenrollment.supportive_address_number} ${reenrollment.supportive_address_complement} - bairro ${reenrollment.supportive_address_neighborhood} - cidade ${reenrollment.supportive_address_city}`,
            )
            .text(
                `Telefone fixo: ${reenrollment.supportive_residencial_phone}`,
                { align: 'left', continued: true },
            )
            .text(
                `Telefone comercial: ${reenrollment.supportive_commercial_phone}`,
                { align: 'center', continued: true },
            )
            .text(
                `Telefone celular: ${reenrollment.supportive_personal_phone}`,
                { align: 'right' },
            )
            .moveDown();

        // Complementar Student reenrollment
        pdf.font(arialBold)
            .fontSize(12)
            .text('Dados complementares:')
            .font(arial)
            .fontSize(12)
            .text(`Escola de origem: ${reenrollment.student_origin_school}`)
            .text(
                `${
                    reenrollment.student_ease_relating ? 'Tem' : 'Não tem'
                } facilidade de se relacionar com as pessoas (colegas, professores)`,
            )
            .text(
                `${
                    reenrollment.student_health_plan
                        ? `Convênio de saúde: ${reenrollment.student_health_plan}`
                        : 'Declarado pelo responsável que o aluno não possui convênio de sáude'
                }`,
            )
            .text(
                `${
                    reenrollment.student_food_alergy
                        ? `Alergia a alimentos: ${reenrollment.student_food_alergy}`
                        : 'Declarado pelo responsável que o aluno não possui alergia a alimentos'
                }`,
            )
            .text(
                `${
                    reenrollment.student_medication_alergy
                        ? `Alergia a medicamentos: ${reenrollment.student_medication_alergy}`
                        : 'Declarado pelo responsável que o aluno não possui alergia a medicamentos'
                }`,
            )
            .text(
                `${
                    reenrollment.student_health_problem
                        ? `Problema de sáude: ${reenrollment.student_health_problem}`
                        : 'Declarado pelo responsável que o aluno não possui problema de saúde'
                }`,
            )
            .text(
                `${
                    reenrollment.student_special_necessities
                        ? `Necessidades especiais: ${reenrollment.student_special_necessities}`
                        : 'Declarado pelo responsável que o aluno não é portador de necessidades especiais'
                }`,
            )
            .moveDown();

        // Footer
        pdf.text(
            'Comprometo-me a regularização dos documentos solicitados pelo colégio de acordo com a legislação em vigor. Esta ficha de matrícula é parte do contrato de Prestação de Serviços Educacionais por adesão, assinado entre as partes conforme o ano letivo em estudo.',
            { align: 'justify' },
        )
            .moveDown()
            .text('Assinatura do responsável:', { align: 'center' })
            .moveDown()
            .text('______________________________', { align: 'center' });

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

        pdf.pipe(fs.createWriteStream(`${filePath}`));

        pdf.end();

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

    private formatGender(gender: 'male' | 'female'): string {
        switch (gender) {
            case 'male':
                return 'masculino';
            case 'female':
                return 'feminino';
            default:
                return '-';
        }
    }

    private formatRace(
        race: 'white' | 'brown' | 'black' | 'indigenous' | 'yellow',
    ): string {
        switch (race) {
            case 'white':
                return 'branco';
            case 'brown':
                return 'pardo';
            case 'black':
                return 'negro';
            case 'indigenous':
                return 'indígena';
            case 'yellow':
                return 'amarelo';
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
                return 'fundamental incompleto';
            case 'elementary_completed':
                return 'fundamental completo';
            case 'highschool_incompleted':
                return 'segundo grau imcompleto';
            case 'highschool_completed':
                return 'segundo grau completo';
            case 'university_incompleted':
                return 'superior incompleto';
            case 'university_completed':
                return 'superior completo';
            default:
                return '-';
        }
    }
}

export default GenerateReenrollmentFormPdfService;

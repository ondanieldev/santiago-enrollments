import PDFKit from 'pdfkit';
import mongoose from 'mongoose';
import fs from 'fs';
import { v4 } from 'uuid';
import { resolve } from 'path';

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
            .fontSize(16)
            .text('Ficha de Rematrícula - Ano 2021', { align: 'center' })
            .fontSize(12)
            .text(`Contrato emitido em ${Date.now()}`, { align: 'center' })
            .moveDown();

        // Student Data
        pdf.font(arialBold)
            .fontSize(14)
            .text('Identificação do aluno:', { align: 'center' })
            .font(arial)
            .fontSize(12)
            .text(`Nome do aluno: ${reenrollment.student_name}`)
            .text(
                `Data de nascimento: ${reenrollment.student_birth_date} | Naturalidade: ${reenrollment.student_birth_city} | UF: ${reenrollment.student_birth_state}`,
            )
            .text(
                `Nacionalidade: ${reenrollment.student_nacionality} | Sexo: ${reenrollment.student_gender}`,
            )
            .text(
                `Cor/Raça (solicitação do senso escolar): ${reenrollment.student_race}`,
            )
            .moveDown();

        // Financial Responsible reenrollment
        pdf.font(arialBold)
            .fontSize(14)
            .text('Responsável financeiro:', { align: 'center' })
            .font(arial)
            .fontSize(12)
            .text(`Nome: ${reenrollment.financial_name}`)
            .text(
                `Aniversário: ${reenrollment.financial_birth_date} | Profissão: ${reenrollment.financial_profission} | Grau de instrução: ${reenrollment.financial_education_level}`,
            )
            .text(`E-mail: ${reenrollment.financial_email}`)
            .text(
                `CPF: ${reenrollment.financial_cpf} | RG: ${reenrollment.financial_rg}`,
            )
            .text(
                `Endereço: rua ${reenrollment.financial_address_street} - número ${reenrollment.financial_address_number} - complemento ${reenrollment.financial_address_complement} - bairro ${reenrollment.financial_address_neighborhood} - cidade ${reenrollment.financial_address_city}`,
            )
            .text(`CEP: ${reenrollment.financial_address_cep}`)
            .text(
                `Telefone fixo: ${reenrollment.financial_residencial_phone} | Telefone comercial: ${reenrollment.financial_commercial_phone}`,
            )
            .text(`Telefone celular: ${reenrollment.financial_personal_phone}`)
            .moveDown();

        // Supportive Responsible reenrollment
        pdf.font(arialBold)
            .fontSize(14)
            .text('Responsável solidário:', { align: 'center' })
            .font(arial)
            .fontSize(12)
            .text(`Nome: ${reenrollment.supportive_name}`)
            .text(
                `Aniversário: ${reenrollment.supportive_birth_date} | Profissão: ${reenrollment.supportive_profission} | Grau de instrução: ${reenrollment.supportive_education_level}`,
            )
            .text(`E-mail: ${reenrollment.supportive_email}`)
            .text(
                `CPF: ${reenrollment.supportive_cpf} | RG: ${reenrollment.supportive_rg}`,
            )
            .text(
                `Endereço: rua ${reenrollment.supportive_address_street} - número ${reenrollment.supportive_address_number} - complemento ${reenrollment.supportive_address_complement} - bairro ${reenrollment.supportive_address_neighborhood} - cidade ${reenrollment.supportive_address_city}`,
            )
            .text(`CEP: ${reenrollment.supportive_address_cep}`)
            .text(
                `Telefone fixo: ${reenrollment.supportive_residencial_phone} | Telefone comercial: ${reenrollment.supportive_commercial_phone}`,
            )
            .text(`Telefone celular: ${reenrollment.supportive_personal_phone}`)
            .moveDown();

        // Complementar Student reenrollment
        pdf.font(arialBold)
            .fontSize(14)
            .text('Dados complementares:', { align: 'center' })
            .font(arial)
            .fontSize(12)
            .text(`Escola de origem: ${reenrollment.student_origin_school}`)
            .text(
                `Tem facilidade de se relacionar com as pessoas (colegas, professores)? ${
                    reenrollment.student_ease_relating ? 'Sim' : 'Não'
                }`,
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
        pdf.moveDown()
            .text(
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
}

export default GenerateReenrollmentFormPdfService;

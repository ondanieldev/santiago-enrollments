import PDFKit from 'pdfkit';
import fs from 'fs';
import { v4 } from 'uuid';
import { resolve } from 'path';

import NewReenrollmentDTO from '@modules/reenrollment/dtos/NewReenrollmentDTO';

class GenerateEnrollmentFormPdfService {
    public execute(data: NewReenrollmentDTO): void {
        const pdf = new PDFKit();

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
            .text(`Nome do aluno: ${data.student_name}`)
            .text(
                `Data de nascimento: ${data.student_birth_date} | Naturalidade: ${data.student_birth_city} | UF: ${data.student_birth_state}`,
            )
            .text(
                `Nacionalidade: ${data.student_nacionality} | Sexo: ${data.student_gender}`,
            )
            .text(
                `Cor/Raça (solicitação do senso escolar): ${data.student_race}`,
            )
            .moveDown();

        // Financial Responsible Data
        pdf.font(arialBold)
            .fontSize(14)
            .text('Responsável financeiro:', { align: 'center' })
            .font(arial)
            .fontSize(12)
            .text(`Nome: ${data.financial_name}`)
            .text(
                `Aniversário: ${data.financial_birth_date} | Profissão: ${data.financial_profission} | Grau de instrução: ${data.financial_education_level}`,
            )
            .text(`E-mail: ${data.financial_email}`)
            .text(`CPF: ${data.financial_cpf} | RG: ${data.financial_rg}`)
            .text(
                `Endereço: rua ${data.financial_address_street} - número ${data.financial_address_number} - complemento ${data.financial_address_complement} - bairro ${data.financial_address_neighborhood} - cidade ${data.financial_address_city}`,
            )
            .text(`CEP: ${data.financial_address_cep}`)
            .text(
                `Telefone fixo: ${data.financial_residencial_phone} | Telefone comercial: ${data.financial_commercial_phone}`,
            )
            .text(`Telefone celular: ${data.financial_personal_phone}`)
            .moveDown();

        // Supportive Responsible Data
        pdf.font(arialBold)
            .fontSize(14)
            .text('Responsável solidário:', { align: 'center' })
            .font(arial)
            .fontSize(12)
            .text(`Nome: ${data.supportive_name}`)
            .text(
                `Aniversário: ${data.supportive_birth_date} | Profissão: ${data.supportive_profission} | Grau de instrução: ${data.supportive_education_level}`,
            )
            .text(`E-mail: ${data.supportive_email}`)
            .text(`CPF: ${data.supportive_cpf} | RG: ${data.supportive_rg}`)
            .text(
                `Endereço: rua ${data.supportive_address_street} - número ${data.supportive_address_number} - complemento ${data.supportive_address_complement} - bairro ${data.supportive_address_neighborhood} - cidade ${data.supportive_address_city}`,
            )
            .text(`CEP: ${data.supportive_address_cep}`)
            .text(
                `Telefone fixo: ${data.supportive_residencial_phone} | Telefone comercial: ${data.supportive_commercial_phone}`,
            )
            .text(`Telefone celular: ${data.supportive_personal_phone}`)
            .moveDown();

        // Complementar Student Data
        pdf.font(arialBold)
            .fontSize(14)
            .text('Dados complementares:', { align: 'center' })
            .font(arial)
            .fontSize(12)
            .text(`Escola de origem: ${data.student_origin_school}`)
            .text(
                `Tem facilidade de se relacionar com as pessoas (colegas, professores)? ${
                    data.student_ease_relating ? 'Sim' : 'Não'
                }`,
            )
            .text(
                `${
                    data.student_healt_plan
                        ? `Convênio de saúde: ${data.student_healt_plan}`
                        : 'Declarado pelo responsável que o aluno não possui convênio de sáude'
                }`,
            )
            .text(
                `${
                    data.student_food_alergy
                        ? `Alergia a alimentos: ${data.student_food_alergy}`
                        : 'Declarado pelo responsável que o aluno não possui alergia a alimentos'
                }`,
            )
            .text(
                `${
                    data.student_medication_alergy
                        ? `Alergia a medicamentos: ${data.student_medication_alergy}`
                        : 'Declarado pelo responsável que o aluno não possui alergia a medicamentos'
                }`,
            )
            .text(
                `${
                    data.student_health_problem
                        ? `Problema de sáude: ${data.student_health_problem}`
                        : 'Declarado pelo responsável que o aluno não possui problema de saúde'
                }`,
            )
            .text(
                `${
                    data.student_special_necessities
                        ? `Necessidades especiais: ${data.student_special_necessities}`
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

        const filePath = resolve(
            __dirname,
            '..',
            '..',
            '..',
            '..',
            'tmp',
            `ficha-${fileHash}.pdf`,
        );

        pdf.pipe(fs.createWriteStream(`${filePath}`));

        pdf.end();
    }
}

export default GenerateEnrollmentFormPdfService;

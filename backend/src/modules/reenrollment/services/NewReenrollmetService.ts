import { resolve } from 'path';
import handlebars from 'handlebars';
import fs from 'fs';

import nodemailer from '@shared/infra/nodemailer';
import NewReenrollmentDTO from '@modules/reenrollment/dtos/NewReenrollmentDTO';
import ReenrollmentsRepository from '@modules/reenrollment/infra/mongoose/repositories/ReenrollmentsRepository';
import { IReenrollmentsRepository } from '@modules/reenrollment/repositories/IReenrollmentsRepository';

interface IVariables {
    [key: string]: string;
}

interface IParseMail {
    file: string;
    variables: IVariables;
}

class NewEnrollmentService {
    private reenrollmentsRepository: IReenrollmentsRepository;

    constructor() {
        this.reenrollmentsRepository = new ReenrollmentsRepository();
    }

    public async execute(data: NewReenrollmentDTO): Promise<void> {
        await this.reenrollmentsRepository.create(data);

        nodemailer.sendMail({
            from: `"Colégio Santiago" <${process.env.NODEMAILER_USER}>`,
            to: process.env.NODEMAILER_USER,
            subject: 'Nova solicitação de rematrícula!',
            text: `Um novo aluno foi cadastrado no sistema: ${
                data.student_name
            } - ${this.formatGrade(data.grade_name)}!`,
        });

        const studentNameArticle = data.student_gender === 'male' ? 'do' : 'da';

        const html = await this.parse({
            file: resolve(
                __dirname,
                '..',
                '..',
                '..',
                'shared',
                'infra',
                'nodemailer',
                'views',
                'confirm_receive.hbs',
            ),
            variables: {
                studentName: `${studentNameArticle} ${this.capitalize(
                    data.student_name,
                )}`,
                responsibleName: this.capitalize(data.financial_name),
            },
        });

        nodemailer.sendMail({
            from: `"Colégio Santiago" <${process.env.NODEMAILER_USER}>`,
            to: data.financial_email,
            subject: 'Solicitação de rematrícula!',
            html,
        });
    }

    private formatGrade(grade: string): string {
        switch (grade) {
            case 'maternal':
                return 'Maternal';
            case 'first_period':
                return 'Primeiro Período';
            case 'second_period':
                return 'Segundo Período';
            case 'first_year':
                return '1º Ano';
            case 'second_year':
                return '2º Ano';
            case 'third_year':
                return '3º Ano';
            case 'fourth_year':
                return '4º Ano';
            case 'fifth_year':
                return '5º Ano';
            case 'sixth_year':
                return '6º Ano';
            case 'seventh_year':
                return '7º Ano';
            case 'eighth_year':
                return '8º Ano';
            case 'nineth_year':
                return '9º Ano';
            default:
                return '-';
        }
    }

    private async parse({ file, variables }: IParseMail): Promise<string> {
        const templateFileContent = await fs.promises.readFile(file, {
            encoding: 'utf-8',
        });

        const parseTemplate = handlebars.compile(templateFileContent);

        return parseTemplate(variables);
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
}

export default NewEnrollmentService;

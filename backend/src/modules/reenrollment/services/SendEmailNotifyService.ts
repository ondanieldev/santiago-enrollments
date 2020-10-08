import { resolve } from 'path';
import handlebars from 'handlebars';
import fs from 'fs';

import nodemailer from '@shared/infra/nodemailer';
import ReenrollmentsRepository from '@modules/reenrollment/infra/mongoose/repositories/ReenrollmentsRepository';
import { IReenrollmentsRepository } from '@modules/reenrollment/repositories/IReenrollmentsRepository';

interface IVariables {
    [key: string]: string;
}

interface IParseMail {
    file: string;
    variables: IVariables;
}

interface IRequest {
    enrollment_number: number;
    studentGender: 'male' | 'female';
    studentName: string;
    responsibleName: string;
    responsibleEmail: string;
    reenrollmentForm: string;
    contract: string;
    checklist: string;
}

class SendEmailWithDocumentsService {
    private reenrollmentsRepository: IReenrollmentsRepository;

    constructor() {
        this.reenrollmentsRepository = new ReenrollmentsRepository();
    }

    public async execute({
        studentGender,
        studentName,
        responsibleName,
        responsibleEmail,
        reenrollmentForm,
        contract,
        checklist,
        enrollment_number,
    }: IRequest): Promise<void> {
        const studentNameArticle = studentGender === 'male' ? 'do' : 'da';

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
                'enrollment_finished.hbs',
            ),
            variables: {
                studentName: `${studentNameArticle} ${this.capitalize(
                    studentName,
                )}`,
                responsibleName: this.capitalize(responsibleName),
            },
        });

        await nodemailer.sendMail({
            from: `"Colégio Santiago" <${process.env.NODEMAILER_USER}>`,
            to: [responsibleEmail, process.env.NODEMAILER_USER || ''],
            subject: 'Conclusão de Matrícula',
            html,
        });

        await this.reenrollmentsRepository.updateReceivedMailWithDocuments(
            enrollment_number,
        );
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

    private async parse({ file, variables }: IParseMail): Promise<string> {
        const templateFileContent = await fs.promises.readFile(file, {
            encoding: 'utf-8',
        });

        const parseTemplate = handlebars.compile(templateFileContent);

        return parseTemplate(variables);
    }
}

export default SendEmailWithDocumentsService;

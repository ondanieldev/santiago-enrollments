import nodemailer from '@shared/infra/nodemailer';
import { resolve } from 'path';

interface IRequest {
    studentGender: 'male' | 'female';
    studentName: string;
    responsibleName: string;
    responsibleEmail: string;
    reenrollmentForm: string;
    contract: string;
    checklist: string;
}

class SendEmailWithDocumentsService {
    public async execute({
        studentGender,
        studentName,
        responsibleName,
        responsibleEmail,
        reenrollmentForm,
        contract,
        checklist,
    }: IRequest): Promise<void> {
        const reenrollmentFormPath = resolve(
            __dirname,
            '..',
            '..',
            '..',
            '..',
            'tmp',
            reenrollmentForm,
        );

        const contractPath = resolve(
            __dirname,
            '..',
            '..',
            '..',
            '..',
            'tmp',
            contract,
        );

        const checklistPath = resolve(
            __dirname,
            '..',
            '..',
            '..',
            '..',
            'tmp',
            checklist,
        );

        nodemailer.sendMail({
            from: `"Colégio Santiago" <${process.env.NODEMAILER_USER}>`,
            to: responsibleEmail,
            subject: 'Solicitação de Rematrícula',
            text:
                `Olá, ${this.capitalize(responsibleName)}!\n\n` +
                `O processo de matricula para o ano de 2021 ${
                    studentGender === 'male' ? 'do' : 'da'
                } ${this.capitalize(studentName)} foi iniciado!` +
                ' Segue em anexo o contrato de prestação de serviços educacionais,' +
                ' a ficha de matricula e o checklist de documentos.' +
                ' Para darmos continuidade ao processo de rematrícula,' +
                ' pedimos que compareça na escola ou responda a esse e-mail com' +
                ' os referidos documentos devidamente assinados.' +
                '\n\nAtenciosamente,\nEquipe Santiago.',
            attachments: [
                {
                    filename: reenrollmentForm,
                    path: reenrollmentFormPath,
                    contentType: 'application/pdf',
                },
                {
                    filename: contract,
                    path: contractPath,
                    contentType: 'application/pdf',
                },
                {
                    filename: checklist,
                    path: checklistPath,
                    contentType: 'application/pdf',
                },
            ],
        });
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

export default SendEmailWithDocumentsService;

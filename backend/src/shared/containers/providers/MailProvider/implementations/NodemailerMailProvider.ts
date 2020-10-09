import { inject, injectable } from 'tsyringe';
import nodemailer, { Transporter } from 'nodemailer';

import IMailProvider from '../models/IMailProvider';
import ISendMailDTO from '../dtos/ISendMailDTO';
import IMailTemplateProvider from '../../MailTemplateProvider/models/IMailTemplateProvider';

@injectable()
export default class EtherealMailProvider implements IMailProvider {
    private client: Transporter;

    constructor(
        @inject('MailTemplateProvider')
        private mailTemplateProvider: IMailTemplateProvider,
    ) {
        const transporter = nodemailer.createTransport({
            host: 'mail.colegiosantiago.com.br',
            port: 465,
            secure: true,
            auth: {
                user: process.env.NODEMAILER_USER,
                pass: process.env.NODEMAILER_PASS,
            },
        });

        this.client = transporter;
    }

    public async sendMail({
        to,
        from,
        subject,
        body,
    }: ISendMailDTO): Promise<void> {
        await this.client.sendMail({
            from: {
                address: from?.email || 'contato@gobarber.com.br',
                name: from?.name || 'Equipe GoBarber',
            },
            to: [
                {
                    address: to.email,
                    name: to.name,
                },
                {
                    address: process.env.NODEMAILER_USER || '',
                    name: 'Colégio Santiago',
                },
            ],
            subject,
            html: await this.mailTemplateProvider.parse(body),
        });
    }
}

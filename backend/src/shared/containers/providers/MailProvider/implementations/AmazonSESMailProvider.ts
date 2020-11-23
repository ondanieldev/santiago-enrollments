import { injectable, inject } from 'tsyringe';
import SES from 'aws-sdk/clients/ses';
import nodemailer, { Transporter } from 'nodemailer';

import IMailProvider from '../models/IMailProvider';
import ISendMailDTO from '../dtos/ISendMailDTO';
import IMailTemplateProvider from '../../MailTemplateProvider/models/IMailTemplateProvider';

@injectable()
class AmazonSESMailProvider implements IMailProvider {
    private sesClient: Transporter;

    constructor(
        @inject('MailTemplateProvider')
        private mailTemplateProvider: IMailTemplateProvider,
    ) {
        this.sesClient = nodemailer.createTransport({
            SES: new SES({
                region: 'us-east-2',
            }),
        });
    }

    public async sendMail({
        body,
        subject,
        to,
        from,
        attachments,
    }: ISendMailDTO): Promise<void> {
        try {
            await this.sesClient.sendMail({
                from: {
                    address: from?.email || process.env.SES_MAIL || '',
                    name: from?.name || process.env.SES_NAME || '',
                },
                to: [
                    {
                        address: to.email,
                        name: to.name,
                    },
                ],
                subject,
                html: await this.mailTemplateProvider.parse(body),
                attachments: attachments || [],
            });
        } catch {}
    }
}

export default AmazonSESMailProvider;

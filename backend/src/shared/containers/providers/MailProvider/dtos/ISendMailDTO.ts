import IParseMailTemplateDTO from '../../MailTemplateProvider/dtos/IParseMailTemplateDTO';

interface IMailContact {
    name: string;
    email: string;
}

interface IMailAttachment {
    filename: string;
    path: string;
    contentType: string;
}

export default interface ISendMailDTO {
    to: IMailContact;
    from?: IMailContact;
    subject: string;
    body: IParseMailTemplateDTO;
    attachments?: IMailAttachment[];
}

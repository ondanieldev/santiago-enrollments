import { container } from 'tsyringe';

import IMailTemplateProvider from './MailTemplateProvider/models/IMailTemplateProvider';
import HandlebarsMailTemplateProvider from './MailTemplateProvider/implementations/HandlebarsMailTemplateProvider';

import IMailProvider from './MailProvider/models/IMailProvider';
import NodemailerMailProvider from './MailProvider/implementations/NodemailerMailProvider';
import AmazonSESMailProvider from './MailProvider/implementations/AmazonSESMailProvider';

import IPDFProvider from './PDFProvider/models/IPDFProvider';
import PDFMakePDFProvider from './PDFProvider/implementations/PDFMakePDFProvider';

container.registerSingleton<IMailTemplateProvider>(
    'MailTemplateProvider',
    HandlebarsMailTemplateProvider,
);

container.registerInstance<IMailProvider>(
    'MailProvider',
    process.env.MAIL_PROVIDER === 'ethereal'
        ? container.resolve(NodemailerMailProvider)
        : container.resolve(AmazonSESMailProvider),
);

container.registerSingleton<IPDFProvider>('PDFProvider', PDFMakePDFProvider);

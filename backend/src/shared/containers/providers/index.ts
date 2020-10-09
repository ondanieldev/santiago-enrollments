import { container } from 'tsyringe';

import IMailTemplateProvider from './MailTemplateProvider/models/IMailTemplateProvider';
import HandlebarsMailTemplateProvider from './MailTemplateProvider/implementations/HandlebarsMailTemplateProvider';

import IMailProvider from './MailProvider/models/IMailProvider';
import NodemailerMailProvider from './MailProvider/implementations/NodemailerMailProvider';

import IPDFProvider from './PDFProvider/models/IPDFProvider';
import PDFMakePDFProvider from './PDFProvider/implementations/PDFMakePDFProvider';

container.registerSingleton<IMailTemplateProvider>(
    'MailTemplateProvider',
    HandlebarsMailTemplateProvider,
);

container.registerInstance<IMailProvider>(
    'MailProvider',
    container.resolve(NodemailerMailProvider),
);

container.registerSingleton<IPDFProvider>('PDFProvider', PDFMakePDFProvider);

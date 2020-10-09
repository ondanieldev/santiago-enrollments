import { injectable, inject } from 'tsyringe';
import path from 'path';

import AppError from '@shared/errors/AppError';
import IReenrollmentsRepository from '@modules/reenrollment/repositories/IReenrollmentsRepository';
import IMailProvider from '@shared/containers/providers/MailProvider/models/IMailProvider';

@injectable()
class SendEmailWithDocumentsService {
    constructor(
        @inject('ReenrollmentsRepository')
        private reenrollmentsRepository: IReenrollmentsRepository,

        @inject('MailProvider')
        private mailProvider: IMailProvider,
    ) {}

    public async execute(enrollment_number: number): Promise<void> {
        const reenrollment = await this.reenrollmentsRepository.getByEnrollmentNumber(
            enrollment_number,
        );

        if (!reenrollment) {
            throw new AppError(
                'Não é possível enviar um e-mail a respeito de uma matrícula inexistente',
            );
        }

        const tmpFolder = path.resolve(
            __dirname,
            '..',
            '..',
            '..',
            '..',
            'tmp',
        );

        const reenrollmentFormPath = path.resolve(
            tmpFolder,
            reenrollment.reenrollment_form,
        );

        const contractPath = path.resolve(tmpFolder, reenrollment.contract);

        const checklistPath = path.resolve(tmpFolder, reenrollment.checklist);

        const studentNameArticle =
            reenrollment.student_gender === 'male' ? 'do' : 'da';

        await this.mailProvider.sendMail({
            to: {
                name: reenrollment.financial_name,
                email: reenrollment.financial_email,
            },
            subject: '[Santiago] Documentos de Matrícula',
            body: {
                file: 'send_documents.hbs',
                variables: {
                    studentNameArticle,
                    studentName: reenrollment.student_name,
                    responsibleName: reenrollment.financial_name,
                    enrollmentYear: reenrollment.enrollment_year,
                },
            },
            attachments: [
                {
                    filename: reenrollment.reenrollment_form,
                    path: reenrollmentFormPath,
                    contentType: 'application/pdf',
                },
                {
                    filename: reenrollment.contract,
                    path: contractPath,
                    contentType: 'application/pdf',
                },
                {
                    filename: reenrollment.checklist,
                    path: checklistPath,
                    contentType: 'application/pdf',
                },
            ],
        });

        await this.reenrollmentsRepository.updateReceivedMailWithDocuments(
            enrollment_number,
        );
    }
}

export default SendEmailWithDocumentsService;

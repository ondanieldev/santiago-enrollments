import { inject, injectable } from 'tsyringe';

import NewReenrollmentDTO from '@modules/reenrollment/dtos/INewReenrollmentDTO';
import IReenrollmentsRepository from '@modules/reenrollment/repositories/IReenrollmentsRepository';
import IMailProvider from '@shared/containers/providers/MailProvider/models/IMailProvider';
import PrettierDataService from './PrettierDataService';

@injectable()
class NewEnrollmentService {
    constructor(
        @inject('ReenrollmentsRepository')
        private reenrollmentsRepository: IReenrollmentsRepository,

        @inject('MailProvider')
        private mailProvider: IMailProvider,
    ) {}

    public async execute(data: NewReenrollmentDTO): Promise<void> {
        const enrollment = data;

        if (enrollment.grade_name === 'maternal') {
            enrollment.type = 'enrollment';
        }

        const prettierData = new PrettierDataService();

        await this.reenrollmentsRepository.create(
            prettierData.execute(enrollment),
        );

        const studentNameArticle =
            enrollment.student_gender === 'male' ? 'do' : 'da';

        this.mailProvider.sendMail({
            to: {
                name: enrollment.financial_name,
                email: enrollment.financial_email,
            },
            subject: '[Santiago] Solicitação de Matrícula Recebida',
            body: {
                file: 'confirm_receive.hbs',
                variables: {
                    studentNameArticle,
                    studentName: enrollment.student_name,
                    responsibleName: enrollment.financial_name,
                },
            },
        });
    }
}

export default NewEnrollmentService;

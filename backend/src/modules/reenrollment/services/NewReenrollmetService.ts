import { inject, injectable } from 'tsyringe';

import NewReenrollmentDTO from '@modules/reenrollment/dtos/NewReenrollmentDTO';
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
        const prettierData = new PrettierDataService();

        await this.reenrollmentsRepository.create(prettierData.execute(data));

        const studentNameArticle = data.student_gender === 'male' ? 'do' : 'da';

        await this.mailProvider.sendMail({
            to: {
                name: data.financial_name,
                email: data.financial_email,
            },
            subject: '[Santiago] Solicitação de Matrícula Recebida',
            body: {
                file: 'confirm_receive.hbs',
                variables: {
                    studentNameArticle,
                    studentName: data.student_name,
                    responsibleName: data.financial_name,
                },
            },
        });
    }
}

export default NewEnrollmentService;

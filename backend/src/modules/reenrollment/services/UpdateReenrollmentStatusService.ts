import { injectable, inject } from 'tsyringe';

import IReenrollmentsRepository from '@modules/reenrollment/repositories/IReenrollmentsRepository';
import IMailProvider from '@shared/containers/providers/MailProvider/models/IMailProvider';
import AppError from '@shared/errors/AppError';

interface IRequest {
    enrollment_number: number;
    status: boolean;
}

@injectable()
class ChangeReenrollmentStatusService {
    constructor(
        @inject('ReenrollmentsRepository')
        private reenrollmentsRepository: IReenrollmentsRepository,

        @inject('MailProvider')
        private mailProvider: IMailProvider,
    ) {}

    public async execute({
        enrollment_number,
        status,
    }: IRequest): Promise<void> {
        const enrollment = await this.reenrollmentsRepository.getByEnrollmentNumber(
            enrollment_number,
        );

        if (!enrollment) {
            throw new AppError(
                'Não é possível concluir uma matrícula que não existe!',
            );
        }

        await this.reenrollmentsRepository.updatePaidEnrollmentStatus(
            enrollment_number,
            status,
        );

        if (status) {
            await this.mailProvider.sendMail({
                to: {
                    email: enrollment.financial_email,
                    name: enrollment.financial_name,
                },
                subject: '[Santiago] Matrícula Finalizada',
                body: {
                    file: 'enrollment_finished.hbs',
                    variables: {
                        responsibleName: enrollment.financial_name,
                        studentName: enrollment.student_name,
                        studentArticle:
                            enrollment.student_gender === 'male' ? 'do' : 'da',
                        enrollmentYear: enrollment.enrollment_year,
                    },
                },
            });
        }
    }
}

export default ChangeReenrollmentStatusService;

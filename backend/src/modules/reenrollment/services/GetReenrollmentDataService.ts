import { injectable, inject } from 'tsyringe';

import AppError from '@shared/errors/AppError';
import { IReenrollment } from '@modules/reenrollment/infra/mongoose/schemas/ReenrollmentSchema';
import IReenrollmentsRepository from '@modules/reenrollment/repositories/IReenrollmentsRepository';

@injectable()
class IndexEnrollmentsStudentService {
    constructor(
        @inject('ReenrollmentsRepository')
        private reenrollmentsRepository: IReenrollmentsRepository,
    ) {}

    public async execute(enrollment_number: number): Promise<IReenrollment> {
        const reenrollment = await this.reenrollmentsRepository.getByEnrollmentNumber(
            enrollment_number,
        );

        if (!reenrollment) {
            throw new AppError(
                'Não é possível obter os dados de uma matrícula que não existe!',
            );
        }

        return reenrollment;
    }
}

export default IndexEnrollmentsStudentService;

import { injectable, inject } from 'tsyringe';

import AppError from '@shared/errors/AppError';
import { IReenrollment } from '@modules/reenrollment/infra/mongoose/schemas/ReenrollmentSchema';
import IReenrollmentsRepository from '@modules/reenrollment/repositories/IReenrollmentsRepository';

interface IRequest {
    enrollment_number: number;
}

@injectable()
class IndexEnrollmentsStudentService {
    constructor(
        @inject('ReenrollmentsRepository')
        private reenrollmentsRepository: IReenrollmentsRepository,
    ) {}

    public async execute(data: IRequest): Promise<IReenrollment> {
        const { enrollment_number } = data;

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

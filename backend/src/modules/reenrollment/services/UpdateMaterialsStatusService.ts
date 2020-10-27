import { injectable, inject } from 'tsyringe';

import IReenrollmentsRepository from '@modules/reenrollment/repositories/IReenrollmentsRepository';
import AppError from '@shared/errors/AppError';

interface IRequest {
    enrollment_number: number;
    status: boolean;
}

@injectable()
class UpdateMaterialsStatusService {
    constructor(
        @inject('ReenrollmentsRepository')
        private reenrollmentsRepository: IReenrollmentsRepository,
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

        await this.reenrollmentsRepository.updatePaidMaterialsStatus(
            enrollment_number,
            status,
        );
    }
}

export default UpdateMaterialsStatusService;

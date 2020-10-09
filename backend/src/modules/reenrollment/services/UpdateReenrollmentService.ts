import { injectable, inject } from 'tsyringe';

import NewReenrollmentDTO from '@modules/reenrollment/dtos/INewReenrollmentDTO';
import IReenrollmentsRepository from '@modules/reenrollment/repositories/IReenrollmentsRepository';
import AppError from '@shared/errors/AppError';
import PrettierDataService from './PrettierDataService';

interface IRequest extends NewReenrollmentDTO {
    enrollment_number: number;
}

@injectable()
class UpdateEnrollmentService {
    constructor(
        @inject('ReenrollmentsRepository')
        private reenrollmentsRepository: IReenrollmentsRepository,
    ) {}

    public async execute(data: IRequest): Promise<void> {
        const reenrollment = await this.reenrollmentsRepository.getByEnrollmentNumber(
            data.enrollment_number,
        );

        if (!reenrollment) {
            throw new AppError(
                'Não é possível atualizar os dados de uma matrícula inexistente!',
            );
        }

        const prettierDataService = new PrettierDataService();

        Object.assign(reenrollment, prettierDataService.execute(data));

        await this.reenrollmentsRepository.update(reenrollment);
    }
}

export default UpdateEnrollmentService;

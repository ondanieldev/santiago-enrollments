import { inject, injectable } from 'tsyringe';

import IReenrollmentsRepository from '../repositories/IReenrollmentsRepository';
import { IReenrollment } from '../infra/mongoose/schemas/ReenrollmentSchema';

@injectable()
export default class IndexReenrollmentsService {
    constructor(
        @inject('ReenrollmentsRepository')
        private reenrollmentsRepository: IReenrollmentsRepository,
    ) {}

    public async execute(): Promise<IReenrollment[]> {
        const reenrollments = await this.reenrollmentsRepository.index();

        return reenrollments;
    }
}

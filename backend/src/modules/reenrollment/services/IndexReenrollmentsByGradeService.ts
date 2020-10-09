import { injectable, inject } from 'tsyringe';

import { IReenrollment } from '@modules/reenrollment/infra/mongoose/schemas/ReenrollmentSchema';
import IReenrollmentsRepository from '@modules/reenrollment/repositories/IReenrollmentsRepository';

@injectable()
class IndexEnrollmentsStudentService {
    constructor(
        @inject('ReenrollmentsRepository')
        private reenrollmentsRepository: IReenrollmentsRepository,
    ) {}

    public async execute(
        grade_name:
            | 'maternal'
            | 'first_period'
            | 'second_period'
            | 'first_year'
            | 'second_year'
            | 'third_year'
            | 'fourth_year'
            | 'fifth_year'
            | 'sixth_year'
            | 'seventh_year'
            | 'eighth_year'
            | 'nineth_year',
    ): Promise<IReenrollment[] | []> {
        const reenrollments = await this.reenrollmentsRepository.indexByGrade(
            grade_name,
        );

        return reenrollments;
    }
}

export default IndexEnrollmentsStudentService;

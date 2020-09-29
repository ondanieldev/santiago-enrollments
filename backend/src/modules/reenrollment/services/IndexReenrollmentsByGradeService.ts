import ReenrollmentsRepository from '@modules/reenrollment/infra/mongoose/repositories/ReenrollmentsRepository';
import { IReenrollment } from '@modules/reenrollment/infra/mongoose/schemas/ReenrollmentSchema';
import { IReenrollmentsRepository } from '@modules/reenrollment/repositories/IReenrollmentsRepository';

interface IRequest {
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
        | 'nineth_year';
}

class IndexEnrollmentsStudentService {
    private reenrollmentsRepository: IReenrollmentsRepository;

    constructor() {
        this.reenrollmentsRepository = new ReenrollmentsRepository();
    }

    public async execute(data: IRequest): Promise<IReenrollment[] | []> {
        const { grade_name } = data;

        const reenrollments = await this.reenrollmentsRepository.indexByGrade(
            grade_name,
        );

        return reenrollments;
    }
}

export default IndexEnrollmentsStudentService;

import ReenrollmentsRepository from '@modules/reenrollment/infra/mongoose/repositories/ReenrollmentsRepository';
import { IReenrollment } from '@modules/reenrollment/infra/mongoose/schemas/ReenrollmentSchema';
import { IReenrollmentsRepository } from '@modules/reenrollment/repositories/IReenrollmentsRepository';

interface IRequest {
    enrollment_number: number;
}

class IndexEnrollmentsStudentService {
    private reenrollmentsRepository: IReenrollmentsRepository;

    constructor() {
        this.reenrollmentsRepository = new ReenrollmentsRepository();
    }

    public async execute(data: IRequest): Promise<IReenrollment | null> {
        const { enrollment_number } = data;

        const reenrollment = await this.reenrollmentsRepository.getByEnrollmentNumber(
            enrollment_number,
        );

        return reenrollment;
    }
}

export default IndexEnrollmentsStudentService;

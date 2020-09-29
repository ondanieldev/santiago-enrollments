import NewReenrollmentDTO from '@modules/reenrollment/dtos/NewReenrollmentDTO';
import ReenrollmentsRepository from '@modules/reenrollment/infra/mongoose/repositories/ReenrollmentsRepository';
import { IReenrollmentsRepository } from '@modules/reenrollment/repositories/IReenrollmentsRepository';

interface IRequest extends NewReenrollmentDTO {
    enrollment_number: number;
}

class NewEnrollmentService {
    private reenrollmentsRepository: IReenrollmentsRepository;

    constructor() {
        this.reenrollmentsRepository = new ReenrollmentsRepository();
    }

    public async execute(data: IRequest): Promise<void> {
        await this.reenrollmentsRepository.update(data);
    }
}

export default NewEnrollmentService;

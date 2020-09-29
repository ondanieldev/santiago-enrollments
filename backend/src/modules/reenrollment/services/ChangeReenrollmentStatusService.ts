import ReenrollmentsRepository from '@modules/reenrollment/infra/mongoose/repositories/ReenrollmentsRepository';
import { IReenrollmentsRepository } from '@modules/reenrollment/repositories/IReenrollmentsRepository';

interface IRequest {
    enrollment_number: number;
    status: boolean;
}

class ChangeReenrollmentStatusService {
    private reenrollmentsRepository: IReenrollmentsRepository;

    constructor() {
        this.reenrollmentsRepository = new ReenrollmentsRepository();
    }

    public async execute({
        enrollment_number,
        status,
    }: IRequest): Promise<void> {
        await this.reenrollmentsRepository.updatePaidStatus({
            enrollment_number,
            paid: status,
        });
    }
}

export default ChangeReenrollmentStatusService;

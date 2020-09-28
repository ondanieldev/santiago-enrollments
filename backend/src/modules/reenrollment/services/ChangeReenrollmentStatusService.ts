import mongoose from 'mongoose';

import {
    IReenrollment,
    ReenrollmentSchema,
} from '@modules/reenrollment/infra/mongoose/schemas/ReenrollmentSchema';

interface IRequest {
    enrollment_number: number;
    status: boolean;
}

class ChangeReenrollmentStatusService {
    public async execute({
        enrollment_number,
        status,
    }: IRequest): Promise<void> {
        const Reenrollment = mongoose.model<IReenrollment>(
            'Reenrollment',
            ReenrollmentSchema,
        );

        await Reenrollment.findOneAndUpdate(
            {
                enrollment_number,
            },
            {
                paid: status,
            },
            {
                useFindAndModify: false,
            },
        );
    }
}

export default ChangeReenrollmentStatusService;

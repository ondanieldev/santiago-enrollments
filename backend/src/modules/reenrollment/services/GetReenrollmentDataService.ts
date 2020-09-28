import mongoose, { Document } from 'mongoose';

import {
    ReenrollmentSchema,
    IReenrollment,
} from '@modules/reenrollment/infra/mongoose/schemas/ReenrollmentSchema';

interface IRequest {
    enrollment_number: number;
}

class IndexEnrollmentsStudentService {
    public async execute(data: IRequest): Promise<Document | null> {
        const { enrollment_number } = data;

        const Reenrollment = mongoose.model<IReenrollment>(
            'Reenrollment',
            ReenrollmentSchema,
        );

        const reenrollment = await Reenrollment.findOne({
            enrollment_number,
        });

        return reenrollment;
    }
}

export default IndexEnrollmentsStudentService;

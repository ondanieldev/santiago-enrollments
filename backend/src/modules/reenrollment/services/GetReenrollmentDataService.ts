import mongoose, { Document } from 'mongoose';

import {
    ReenrollmentSchema,
    IReenrollment,
} from '@modules/reenrollment/infra/mongoose/schemas/ReenrollmentSchema';

interface IRequest {
    _id: string;
}

class IndexEnrollmentsStudentService {
    public async execute(data: IRequest): Promise<Document | null> {
        const { _id } = data;

        const Reenrollment = mongoose.model<IReenrollment>(
            'Reenrollment',
            ReenrollmentSchema,
        );

        const reenrollment = await Reenrollment.findOne({ student_name: _id });

        return reenrollment;
    }
}

export default IndexEnrollmentsStudentService;

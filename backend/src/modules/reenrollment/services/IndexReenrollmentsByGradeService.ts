import mongoose, { Document } from 'mongoose';

import {
    ReenrollmentSchema,
    IReenrollment,
} from '@modules/reenrollment/infra/mongoose/schemas/ReenrollmentSchema';

interface IRequest {
    grade_name: string;
}

class IndexEnrollmentsStudentService {
    public async execute(data: IRequest): Promise<Document[] | []> {
        const { grade_name } = data;

        const Reenrollment = mongoose.model<IReenrollment>(
            'Reenrollment',
            ReenrollmentSchema,
        );

        const reenrollments = await Reenrollment.find(
            { grade_name },
            '_id student_name',
        ).exec();

        return reenrollments;
    }
}

export default IndexEnrollmentsStudentService;

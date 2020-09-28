import mongoose, { Document } from 'mongoose';

import {
    ReenrollmentSchema,
    IReenrollment,
} from '@modules/reenrollment/infra/mongoose/schemas/ReenrollmentSchema';

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
    public async execute(data: IRequest): Promise<Document[] | []> {
        const { grade_name } = data;

        const Reenrollment = mongoose.model<IReenrollment>(
            'Reenrollment',
            ReenrollmentSchema,
        );

        const reenrollments = await Reenrollment.find(
            { grade_name },
            'enrollment_number student_name paid',
        ).exec();

        return reenrollments;
    }
}

export default IndexEnrollmentsStudentService;

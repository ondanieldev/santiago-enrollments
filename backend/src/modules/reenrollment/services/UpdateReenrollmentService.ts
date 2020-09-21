import mongoose from 'mongoose';

import NewReenrollmentDTO from '@modules/reenrollment/dtos/NewReenrollmentDTO';

import {
    ReenrollmentSchema,
    IReenrollment,
} from '@modules/reenrollment/infra/mongoose/schemas/ReenrollmentSchema';

interface IRequest extends NewReenrollmentDTO {
    _id: string;
}

class NewEnrollmentService {
    public async execute({ _id, ...rest }: IRequest): Promise<void> {
        const Reenrollment = mongoose.model<IReenrollment>(
            'Reenrollment',
            ReenrollmentSchema,
        );

        await Reenrollment.findOneAndUpdate(
            {
                student_name: _id,
            },
            {
                ...rest,
            },
            {
                useFindAndModify: false,
            },
        );
    }
}

export default NewEnrollmentService;

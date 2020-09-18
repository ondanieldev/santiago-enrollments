import mongoose from 'mongoose';

import NewReenrollmentDTO from '@modules/reenrollment/dtos/NewReenrollmentDTO';
import {
    ReenrollmentSchema,
    IReenrollment,
} from '@modules/reenrollment/infra/mongoose/schemas/ReenrollmentSchema';

class NewEnrollmentService {
    public async execute(data: NewReenrollmentDTO): Promise<void> {
        const Reenrollment = mongoose.model<IReenrollment>(
            'Reenrollment',
            ReenrollmentSchema,
        );

        const reenrollment = new Reenrollment(data);

        await reenrollment.save();
    }
}

export default NewEnrollmentService;

import mongoose from 'mongoose';

import NewReenrollmentDTO from '@modules/reenrollment/dtos/NewReenrollmentDTO';
import ReenrollmentSchema from '@modules/reenrollment/infra/mongoose/schemas/ReenrollmentSchema';

class NewEnrollmentService {
    public async execute(data: NewReenrollmentDTO): Promise<void> {
        const Reenrollment = mongoose.model('Reenrollment', ReenrollmentSchema);

        const reenrollment = new Reenrollment(data);

        console.log(reenrollment);

        await reenrollment.save();
    }
}

export default NewEnrollmentService;

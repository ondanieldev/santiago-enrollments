import mongoose, { Model } from 'mongoose';

import NewReenrollmentDTO from '@modules/reenrollment/dtos/INewReenrollmentDTO';
import IReenrollmentsRepository from '@modules/reenrollment/repositories/IReenrollmentsRepository';
import {
    IReenrollment,
    ReenrollmentSchema,
} from '@modules/reenrollment/infra/mongoose/schemas/ReenrollmentSchema';

class ReenrollmentsRepository implements IReenrollmentsRepository {
    private Reenrollment: Model<IReenrollment>;

    constructor() {
        this.Reenrollment = mongoose.model<IReenrollment>(
            'Reenrollment',
            ReenrollmentSchema,
        );
    }

    public async create(data: NewReenrollmentDTO): Promise<IReenrollment> {
        const reenrollment = new this.Reenrollment(data);

        await reenrollment.save();

        return reenrollment;
    }

    public async getByEnrollmentNumber(
        enrollment_number: number,
    ): Promise<IReenrollment | null> {
        const reenrollment = await this.Reenrollment.findOne({
            enrollment_number,
        });

        return reenrollment;
    }

    public async indexByGrade(
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
            | 'nineth_year',
    ): Promise<IReenrollment[] | []> {
        const reenrollments = await this.Reenrollment.find(
            { grade_name },
            'enrollment_number student_name paid received_mail_with_documents',
        ).exec();

        return reenrollments;
    }

    public async update(data: IReenrollment): Promise<IReenrollment> {
        const { enrollment_number } = data;

        await this.Reenrollment.updateOne({ enrollment_number }, data);

        return data;
    }

    public async updateChecklist(
        enrollment_number: number,
        checklist: string,
    ): Promise<void> {
        await this.Reenrollment.updateOne({ enrollment_number }, { checklist });
    }

    public async updateContract(
        enrollment_number: number,
        contract: string,
    ): Promise<void> {
        await this.Reenrollment.updateOne({ enrollment_number }, { contract });
    }

    public async updatePaidStatus(
        enrollment_number: number,
        paid: boolean,
    ): Promise<IReenrollment | null> {
        const reenrollment = await this.Reenrollment.updateOne(
            { enrollment_number },
            { paid },
        );

        return reenrollment;
    }

    public async updateReenrollmentForm(
        enrollment_number: number,
        reenrollment_form: string,
    ): Promise<void> {
        await this.Reenrollment.updateOne(
            { enrollment_number },
            { reenrollment_form },
        );
    }

    public async updateMonthlyControl(
        enrollment_number: number,
        monthly_control: string,
    ): Promise<void> {
        await this.Reenrollment.updateOne(
            { enrollment_number },
            { monthly_control },
        );
    }

    public async updateReceivedMailWithDocuments(
        enrollment_number: number,
    ): Promise<void> {
        await this.Reenrollment.updateOne(
            { enrollment_number },
            { received_mail_with_documents: true },
        );
    }
}

export default ReenrollmentsRepository;

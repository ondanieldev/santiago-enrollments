import mongoose, { Model } from 'mongoose';

import NewReenrollmentDTO from '@modules/reenrollment/dtos/NewReenrollmentDTO';
import {
    IReenrollmentsRepository,
    IUpdate,
    IUpdateChecklist,
    IUpdateContract,
    IUpdatePaidStatus,
    IUpdateReenrollmentForm,
} from '@modules/reenrollment/repositories/IReenrollmentsRepository';
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
            'enrollment_number student_name paid',
        ).exec();

        return reenrollments;
    }

    public async update({
        enrollment_number,
        ...rest
    }: IUpdate): Promise<IReenrollment | null> {
        const reenrollment = await this.Reenrollment.findOneAndUpdate(
            {
                enrollment_number,
            },
            {
                ...rest,
            },
            {
                useFindAndModify: false,
            },
        );

        return reenrollment;
    }

    public async updateChecklist({
        enrollment_number,
        checklist,
    }: IUpdateChecklist): Promise<void> {
        await this.Reenrollment.findOneAndUpdate(
            {
                enrollment_number,
            },
            {
                checklist,
            },
            {
                useFindAndModify: false,
            },
        );
    }

    public async updateContract({
        enrollment_number,
        contract,
    }: IUpdateContract): Promise<void> {
        await this.Reenrollment.findOneAndUpdate(
            {
                enrollment_number,
            },
            {
                contract,
            },
            {
                useFindAndModify: false,
            },
        );
    }

    public async updatePaidStatus({
        enrollment_number,
        paid,
    }: IUpdatePaidStatus): Promise<void> {
        await this.Reenrollment.findOneAndUpdate(
            {
                enrollment_number,
            },
            {
                paid,
            },
            {
                useFindAndModify: false,
            },
        );
    }

    public async updateReenrollmentForm({
        enrollment_number,
        reenrollment_form,
    }: IUpdateReenrollmentForm): Promise<void> {
        await this.Reenrollment.findOneAndUpdate(
            {
                enrollment_number,
            },
            {
                reenrollment_form,
            },
            {
                useFindAndModify: false,
            },
        );
    }
}

export default ReenrollmentsRepository;

import mongoose, { Model } from 'mongoose';

import NewReenrollmentDTO from '@modules/reenrollment/dtos/INewReenrollmentDTO';
import IGetDashboardDataDTO from '@modules/reenrollment/dtos/IGetDashboardDataDTO';
import IReenrollmentsRepository from '@modules/reenrollment/repositories/IReenrollmentsRepository';
import {
    IReenrollment,
    ReenrollmentSchema,
} from '@modules/reenrollment/infra/mongoose/schemas/ReenrollmentSchema';

interface IUpdatePaymentValues {
    enrollment_number: number;
    enrollment_year: '2020' | '2021';
    discount_percent: number;
    monthly_value: number;
    total_value: number;
    enrollment_payment_format: 'in_cash' | 'financing';
    enrollment_payment_times: number;
    materials_payment_format: 'in_cash' | 'financing';
    materials_payment_times: number;
    materials_payment_value: number;
}

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
            'enrollment_number student_name paid received_mail_with_documents type',
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

    public async updatePaidEnrollmentStatus(
        enrollment_number: number,
        paid_enrollment: boolean,
    ): Promise<IReenrollment | null> {
        const reenrollment = await this.Reenrollment.updateOne(
            { enrollment_number },
            { paid_enrollment },
        );

        return reenrollment;
    }

    public async updatePaidMaterialsStatus(
        enrollment_number: number,
        paid_materials: boolean,
    ): Promise<IReenrollment | null> {
        const reenrollment = await this.Reenrollment.updateOne(
            { enrollment_number },
            { paid_materials },
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

    public async updateReceipt(
        enrollment_number: number,
        receipt: string,
    ): Promise<void> {
        await this.Reenrollment.updateOne({ enrollment_number }, { receipt });
    }

    public async updateReceivedMailWithDocuments(
        enrollment_number: number,
    ): Promise<void> {
        await this.Reenrollment.updateOne(
            { enrollment_number },
            { received_mail_with_documents: true },
        );
    }

    public async updatePaymentValues({
        enrollment_number,
        ...rest
    }: IUpdatePaymentValues): Promise<void> {
        await this.Reenrollment.updateOne({ enrollment_number }, rest);
    }

    public async getDashboardData(): Promise<IGetDashboardDataDTO> {
        const students = await this.Reenrollment.find(
            {},
            'student_name grade_name type paid enrollment_number received_mail_with_documents',
        );

        const enrollment_students = students.filter(
            student => student.type === 'enrollment',
        );

        const reenrollment_students = students.filter(
            student => student.type === 'reenrollment',
        );

        const maternal = students.filter(
            student => student.grade_name === 'maternal',
        ).length;

        const first_period = students.filter(
            student => student.grade_name === 'first_period',
        ).length;

        const second_period = students.filter(
            student => student.grade_name === 'second_period',
        ).length;

        const first_year = students.filter(
            student => student.grade_name === 'first_year',
        ).length;

        const second_year = students.filter(
            student => student.grade_name === 'second_year',
        ).length;

        const third_year = students.filter(
            student => student.grade_name === 'third_year',
        ).length;

        const fourth_year = students.filter(
            student => student.grade_name === 'fourth_year',
        ).length;

        const fifth_year = students.filter(
            student => student.grade_name === 'fifth_year',
        ).length;

        const sixth_year = students.filter(
            student => student.grade_name === 'sixth_year',
        ).length;

        const seventh_year = students.filter(
            student => student.grade_name === 'seventh_year',
        ).length;

        const eighth_year = students.filter(
            student => student.grade_name === 'eighth_year',
        ).length;

        const nineth_year = students.filter(
            student => student.grade_name === 'nineth_year',
        ).length;

        const dashboardData = {} as IGetDashboardDataDTO;

        Object.assign(dashboardData, {
            enrollment_students,
            reenrollment_students,
            students_per_grade: [
                { grade_name: 'Maternal', value: maternal },
                { grade_name: '1º período', value: first_period },
                { grade_name: '2º período', value: second_period },
                { grade_name: '1º ano', value: first_year },
                { grade_name: '2º ano', value: second_year },
                { grade_name: '3º ano', value: third_year },
                { grade_name: '4º ano', value: fourth_year },
                { grade_name: '5º ano', value: fifth_year },
                { grade_name: '6º ano', value: sixth_year },
                { grade_name: '7º ano', value: seventh_year },
                { grade_name: '8º ano', value: eighth_year },
                { grade_name: '9º ano', value: nineth_year },
            ],
        });

        return dashboardData;
    }

    public async index(): Promise<IReenrollment[]> {
        const reenrollments = this.Reenrollment.find().sort('grade_name');

        return reenrollments;
    }
}

export default ReenrollmentsRepository;

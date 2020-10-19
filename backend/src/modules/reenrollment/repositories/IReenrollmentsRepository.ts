import { IReenrollment } from '@modules/reenrollment/infra/mongoose/schemas/ReenrollmentSchema';
import NewReenrollmentDTO from '@modules/reenrollment/dtos/INewReenrollmentDTO';
import IGetDashboardDataDTO from '@modules/reenrollment/dtos/IGetDashboardDataDTO';

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

export default interface IReenrollmentsRepository {
    updatePaidStatus(
        enrollment_number: number,
        paid: boolean,
    ): Promise<IReenrollment | null>;
    updateChecklist(
        enrollment_number: number,
        checklist: string,
    ): Promise<void>;
    updateContract(enrollment_number: number, contract: string): Promise<void>;
    updateReenrollmentForm(
        enrollment_number: number,
        reenrollment_form: string,
    ): Promise<void>;
    updateMonthlyControl(
        enrollment_number: number,
        monthly_control: string,
    ): Promise<void>;
    updateReceipt(enrollment_number: number, receipt: string): Promise<void>;
    getByEnrollmentNumber(
        enrollment_number: number,
    ): Promise<IReenrollment | null>;
    indexByGrade(
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
    ): Promise<IReenrollment[] | []>;
    create(data: NewReenrollmentDTO): Promise<IReenrollment>;
    update(data: IReenrollment): Promise<IReenrollment>;
    updateReceivedMailWithDocuments(enrollment_number: number): Promise<void>;
    updatePaymentValues(data: IUpdatePaymentValues): Promise<void>;
    getDashboardData(): Promise<IGetDashboardDataDTO>;
    index(): Promise<IReenrollment[]>;
}

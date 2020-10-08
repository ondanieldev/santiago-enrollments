import { IReenrollment } from '@modules/reenrollment/infra/mongoose/schemas/ReenrollmentSchema';
import NewReenrollmentDTO from '@modules/reenrollment/dtos/NewReenrollmentDTO';

export interface IUpdate extends NewReenrollmentDTO {
    enrollment_number: number;
}

export interface IUpdateChecklist {
    enrollment_number: number;
    checklist: string;
}

export interface IUpdateContract {
    enrollment_number: number;
    contract: string;
}

export interface IUpdateReenrollmentForm {
    enrollment_number: number;
    reenrollment_form: string;
}

export interface IUpdateMonthlyControl {
    enrollment_number: number;
    monthly_control: string;
}

export interface IUpdatePaidStatus {
    enrollment_number: number;
    paid: boolean;
}

export interface IUpdateEmailNotify {
    enrollment_number: number;
    notified: boolean;
}

export interface IReenrollmentsRepository {
    updateChecklist(data: IUpdateChecklist): Promise<void>;
    updateContract(data: IUpdateContract): Promise<void>;
    updateReenrollmentForm(data: IUpdateReenrollmentForm): Promise<void>;
    updateMonthlyControl(data: IUpdateMonthlyControl): Promise<void>;
    updatePaidStatus(data: IUpdatePaidStatus): Promise<IReenrollment | null>;
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
    update(data: IUpdate): Promise<IReenrollment | null>;
    updateReceivedMailWithDocuments(enrollment_number: number): Promise<void>;
}

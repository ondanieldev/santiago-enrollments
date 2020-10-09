import { IReenrollment } from '@modules/reenrollment/infra/mongoose/schemas/ReenrollmentSchema';
import NewReenrollmentDTO from '@modules/reenrollment/dtos/INewReenrollmentDTO';

interface IUpdate extends NewReenrollmentDTO {
    enrollment_number: number;
}

interface IUpdateEmailNotify {
    enrollment_number: number;
    notified: boolean;
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

import { injectable, inject } from 'tsyringe';

import IReenrollmentsRepository from '@modules/reenrollment/repositories/IReenrollmentsRepository';
import AppError from '@shared/errors/AppError';

interface IRequest {
    enrollment_number: number;
    enrollment_year: '2020' | '2021';
    discount_percent: number;
    monthly_value: number;
    total_value: number;
    enrollment_payment_format: 'in_cash' | 'financing' | 'dont_show';
    enrollment_payment_times: number;
    materials_payment_format: 'in_cash' | 'financing' | 'dont_show';
    materials_payment_times: number;
}

@injectable()
class ChangeReenrollmentStatusService {
    constructor(
        @inject('ReenrollmentsRepository')
        private reenrollmentsRepository: IReenrollmentsRepository,
    ) {}

    public async execute({
        enrollment_number,
        enrollment_year,
        discount_percent,
        monthly_value,
        total_value,
        enrollment_payment_format,
        enrollment_payment_times,
        materials_payment_format,
        materials_payment_times,
    }: IRequest): Promise<void> {
        const enrollment = await this.reenrollmentsRepository.getByEnrollmentNumber(
            enrollment_number,
        );

        if (!enrollment) {
            throw new AppError(
                'Não é possível atualizar os valores de uma matrícula inexistente!',
            );
        }

        if (
            discount_percent < 0 ||
            discount_percent > 100 ||
            (discount_percent !== 0 && !discount_percent)
        ) {
            throw new AppError(
                'Não é possível atualizar os valores de uma matrícula com um desconto inválido!',
            );
        }

        if (enrollment_year !== '2020' && enrollment_year !== '2021') {
            throw new AppError(
                'Não é possível atualizar os valores de uma matrícula com um ano de contrato inválido!',
            );
        }

        let monthlyValue = monthly_value;
        let totalValue = total_value;

        if (enrollment_year === '2021') {
            monthlyValue = this.getMonthlyValue(enrollment.grade_name);
            totalValue = monthlyValue * 12;
        }

        const materialsPaymentValue = this.getMaterialsPaymentValue(
            materials_payment_format,
            enrollment.grade_name,
        );

        await this.reenrollmentsRepository.updatePaymentValues({
            enrollment_number,
            enrollment_year,
            discount_percent,
            monthly_value: monthlyValue,
            total_value: totalValue,
            enrollment_payment_format,
            enrollment_payment_times,
            materials_payment_format,
            materials_payment_times,
            materials_payment_value: materialsPaymentValue,
        });
    }

    private getMaterialsPaymentValue(
        materials_payment_format: 'in_cash' | 'financing' | 'dont_show',
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
    ): number {
        if (materials_payment_format === 'dont_show') {
            return 0;
        }

        if (
            grade_name === 'maternal' ||
            grade_name === 'first_period' ||
            grade_name === 'second_period'
        ) {
            return materials_payment_format === 'in_cash' ? 650 : 695;
        }

        if (
            grade_name === 'first_year' ||
            grade_name === 'second_year' ||
            grade_name === 'third_year' ||
            grade_name === 'fourth_year' ||
            grade_name === 'fifth_year'
        ) {
            return materials_payment_format === 'in_cash' ? 1170 : 1280;
        }

        if (grade_name === 'sixth_year' || grade_name === 'seventh_year') {
            return materials_payment_format === 'in_cash' ? 1250 : 1310;
        }

        if (grade_name === 'eighth_year' || grade_name === 'nineth_year') {
            return materials_payment_format === 'in_cash' ? 1470 : 1573;
        }

        return 0;
    }

    private getMonthlyValue(
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
    ) {
        switch (grade_name) {
            case 'maternal':
                return 584;
            case 'first_period':
                return 584;
            case 'second_period':
                return 584;
            case 'first_year':
                return 717;
            case 'second_year':
                return 717;
            case 'third_year':
                return 717;
            case 'fourth_year':
                return 717;
            case 'fifth_year':
                return 717;
            case 'sixth_year':
                return 766;
            case 'seventh_year':
                return 766;
            case 'eighth_year':
                return 766;
            case 'nineth_year':
                return 766;
            default:
                return 0;
        }
    }
}

export default ChangeReenrollmentStatusService;

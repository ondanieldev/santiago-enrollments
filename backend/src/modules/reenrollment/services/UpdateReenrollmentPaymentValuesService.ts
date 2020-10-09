import { injectable, inject } from 'tsyringe';

import IReenrollmentsRepository from '@modules/reenrollment/repositories/IReenrollmentsRepository';
import AppError from '@shared/errors/AppError';

interface IRequest {
    enrollment_number: number;
    enrollment_year: '2020' | '2021';
    discount_percent: number;
    monthly_value: number;
    total_value: number;
    enrollment_payment_format: 'in_cash' | 'financing';
    enrollment_payment_times: number;
    materials_payment_format: 'in_cash' | 'financing';
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
        });
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

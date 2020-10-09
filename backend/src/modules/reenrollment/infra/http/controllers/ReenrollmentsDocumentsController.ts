import { container } from 'tsyringe';
import { Request, Response } from 'express';

import GenerateReenrollmentFormPdfService from '@modules/reenrollment/services/GenerateReenrollmentFormPdfService';
import GenerateContractPdfService from '@modules/reenrollment/services/GenerateContractPdfService';
import GenerateChecklistPdfService from '@modules/reenrollment/services/GenerateChecklistPdfService';
import GenerateMonthlyControlPdfService from '@modules/reenrollment/services/GenerateMonthlyControlPdfService';
import AppError from '@shared/errors/AppError';

class ReenrollmentsPDFsController {
    public async update(
        request: Request,
        response: Response,
    ): Promise<Response> {
        const { enrollment_number } = request.params;

        // const {
        //     contract_year,
        //     discount_percent,
        //     monthly_value,
        //     total_value,
        //     enrollment_payment_format,
        //     enrollment_payment_times,
        //     materials_payment_format,
        //     materials_payment_times,
        // } = request.body;

        const parsedEnrollmentNumber = parseInt(enrollment_number, 10);

        if (typeof parsedEnrollmentNumber !== 'number') {
            throw new AppError('Número de matrícula inválido!');
        }

        // if (
        //     discount_percent < 0 ||
        //     discount_percent > 100 ||
        //     (discount_percent !== 0 && !discount_percent)
        // ) {
        //     throw new AppError('Desconto inválido!');
        // }

        // if (contract_year !== '2020' && contract_year !== '2021') {
        //     throw new AppError('Ano de contrato inválido!');
        // }

        const generateReenrollmentFormPdf = container.resolve(
            GenerateReenrollmentFormPdfService,
        );

        const generateContractPdf = container.resolve(
            GenerateContractPdfService,
        );

        const generateChecklistPdf = container.resolve(
            GenerateChecklistPdfService,
        );

        const generateMonthlyControlPdf = container.resolve(
            GenerateMonthlyControlPdfService,
        );

        const [
            reenrollmentForm,
            contract,
            checklist,
            monthlyControl,
        ] = await Promise.all([
            generateReenrollmentFormPdf.execute(parsedEnrollmentNumber),
            generateContractPdf.execute(parsedEnrollmentNumber),
            generateChecklistPdf.execute(parsedEnrollmentNumber),
            generateMonthlyControlPdf.execute(parsedEnrollmentNumber),
        ]);

        return response.json([
            {
                name: 'Ficha de rematrícula',
                link: reenrollmentForm,
            },
            {
                name: 'Contrato',
                link: contract,
            },
            {
                name: 'Checklist',
                link: checklist,
            },
            {
                name: 'Controle de mensalidade',
                link: monthlyControl,
            },
        ]);
    }
}

export default ReenrollmentsPDFsController;

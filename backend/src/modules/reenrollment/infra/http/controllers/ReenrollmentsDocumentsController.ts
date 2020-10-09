import { container } from 'tsyringe';
import { Request, Response } from 'express';

import AppError from '@shared/errors/AppError';
import UpdateReenrollmentPaymentValuesService from '@modules/reenrollment/services/UpdateReenrollmentPaymentValuesService';
import GenerateReenrollmentFormPdfService from '@modules/reenrollment/services/GenerateReenrollmentFormPdfService';
import GenerateContractPdfService from '@modules/reenrollment/services/GenerateContractPdfService';
import GenerateChecklistPdfService from '@modules/reenrollment/services/GenerateChecklistPdfService';
import GenerateMonthlyControlPdfService from '@modules/reenrollment/services/GenerateMonthlyControlPdfService';

class ReenrollmentsPDFsController {
    public async update(
        request: Request,
        response: Response,
    ): Promise<Response> {
        const { enrollment_number } = request.params;

        const {
            enrollment_year,
            discount_percent,
            monthly_value,
            total_value,
            enrollment_payment_format,
            enrollment_payment_times,
            materials_payment_format,
            materials_payment_times,
        } = request.body;

        const parsedEnrollmentNumber = parseInt(enrollment_number, 10);

        if (typeof parsedEnrollmentNumber !== 'number') {
            throw new AppError('Número de matrícula inválido!');
        }

        const updateReenrollmentPaymentValues = container.resolve(
            UpdateReenrollmentPaymentValuesService,
        );

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

        await updateReenrollmentPaymentValues.execute({
            enrollment_number: parsedEnrollmentNumber,
            enrollment_year,
            discount_percent,
            monthly_value,
            total_value,
            enrollment_payment_format,
            enrollment_payment_times,
            materials_payment_format,
            materials_payment_times,
        });

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

import { Request, Response } from 'express';

import GetReenrollmentDataService from '@modules/reenrollment/services/GetReenrollmentDataService';
import PrettierDataService from '@modules/reenrollment/services/PrettierDataService';
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

        // const { monthly_value, discount_percent } = request.body;

        const number = parseInt(enrollment_number, 10);

        const getReenrollmentData = new GetReenrollmentDataService();

        const reenrollment = await getReenrollmentData.execute({
            enrollment_number: number,
        });

        if (!reenrollment) {
            throw new AppError('Número de matrícula inválido!');
        }

        const prettierData = new PrettierDataService();

        const prettierReenrollment = prettierData.execute(reenrollment);

        const generateReenrollmentFormPdf = new GenerateReenrollmentFormPdfService();

        const reenrollmentForm = await generateReenrollmentFormPdf.execute(
            prettierReenrollment,
        );

        const generateContractPdf = new GenerateContractPdfService();

        const contract = await generateContractPdf.execute(
            prettierReenrollment,
        );

        const generateChecklistPdf = new GenerateChecklistPdfService();

        const checklist = await generateChecklistPdf.execute(
            prettierReenrollment,
        );

        const generateMonthlyControlPdf = new GenerateMonthlyControlPdfService();

        const monthlyControl = await generateMonthlyControlPdf.execute();

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

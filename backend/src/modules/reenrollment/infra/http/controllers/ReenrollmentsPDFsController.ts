import { Request, Response } from 'express';

import GenerateReenrollmentFormPdfService from '@modules/reenrollment/services/GenerateReenrollmentFormPdfService';
import GenerateContractPdfService from '@modules/reenrollment/services/GenerateContractPdfService';
import GenerateChecklistPdfService from '@modules/reenrollment/services/GenerateChecklistPdfService';

class ReenrollmentsPDFsController {
    public async update(
        request: Request,
        response: Response,
    ): Promise<Response> {
        const { enrollment_number } = request.params;

        // const { monthly_value, discount_percent } = request.body;

        const number = parseInt(enrollment_number, 10);

        const generateReenrollmentFormPdf = new GenerateReenrollmentFormPdfService();

        const reenrollmentForm = await generateReenrollmentFormPdf.execute({
            enrollment_number: number,
        });

        const generateContractPdf = new GenerateContractPdfService();

        const contract = await generateContractPdf.execute({
            enrollment_number: number,
        });

        const generateChecklistPdf = new GenerateChecklistPdfService();

        const checklist = await generateChecklistPdf.execute({
            enrollment_number: number,
        });

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
        ]);
    }
}

export default ReenrollmentsPDFsController;

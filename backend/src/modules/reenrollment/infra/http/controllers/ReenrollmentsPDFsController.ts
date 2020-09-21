import { Request, Response } from 'express';

import GenerateReenrollmentFormPdfService from '@modules/reenrollment/services/GenerateReenrollmentFormPdfService';
import GenerateContractPdfService from '@modules/reenrollment/services/GenerateContractPdfService';
import GenerateChecklistPdfService from '@modules/reenrollment/services/GenerateChecklistPdfService';

class ReenrollmentsPDFsController {
    public async update(
        request: Request,
        response: Response,
    ): Promise<Response> {
        const { _id } = request.params;

        const generateReenrollmentFormPdf = new GenerateReenrollmentFormPdfService();

        const reenrollmentForm = await generateReenrollmentFormPdf.execute({
            _id,
        });

        const generateContractPdf = new GenerateContractPdfService();

        const contract = await generateContractPdf.execute({
            _id,
        });

        const generateChecklistPdf = new GenerateChecklistPdfService();

        const checklist = await generateChecklistPdf.execute({
            _id,
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

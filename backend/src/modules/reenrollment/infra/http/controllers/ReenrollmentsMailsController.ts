import { Request, Response } from 'express';

import SendEmailWithDocumentsService from '@modules/reenrollment/services/SendEmailWithDocumentsService';

class ReenrollmentsMailsController {
    public async create(
        request: Request,
        response: Response,
    ): Promise<Response> {
        const {
            checklist,
            contract,
            reenrollmentForm,
            responsibleEmail,
            responsibleName,
            studentGender,
            studentName,
            enrollment_number,
        } = request.body;

        const sendEmailWithDocuments = new SendEmailWithDocumentsService();

        await sendEmailWithDocuments.execute({
            checklist,
            contract,
            reenrollmentForm,
            responsibleEmail,
            responsibleName,
            studentGender,
            studentName,
            enrollment_number,
        });

        return response.json({ ok: true });
    }
}

export default ReenrollmentsMailsController;

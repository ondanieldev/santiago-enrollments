import { Request, Response } from 'express';

import SendEmailWithDocumentsService from '@modules/reenrollment/services/SendEmailWithDocumentsService';

class ReenrollmentsPDFsController {
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
        });

        return response.json({ ok: true });
    }
}

export default ReenrollmentsPDFsController;

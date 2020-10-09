import { container } from 'tsyringe';
import { Request, Response } from 'express';

import SendEmailWithDocumentsService from '@modules/reenrollment/services/SendEmailWithDocumentsService';

class ReenrollmentsMailsController {
    public async create(
        request: Request,
        response: Response,
    ): Promise<Response> {
        const { enrollment_number } = request.params;

        const number = parseInt(enrollment_number, 10);

        const sendEmailWithDocuments = container.resolve(
            SendEmailWithDocumentsService,
        );

        await sendEmailWithDocuments.execute(number);

        return response.status(240).json();
    }
}

export default ReenrollmentsMailsController;

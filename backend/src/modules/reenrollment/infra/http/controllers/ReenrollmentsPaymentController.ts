import { Request, Response } from 'express';

import PayReenrollmentService from '@modules/reenrollment/services/ChangeReenrollmentStatusService';

class ReenrollmentsPaymentController {
    public async update(
        request: Request,
        response: Response,
    ): Promise<Response> {
        const { enrollment_number } = request.params;
        const { status } = request.body;

        const number = parseInt(enrollment_number, 10);

        const payReenrollment = new PayReenrollmentService();

        await payReenrollment.execute({
            enrollment_number: number,
            status,
        });

        return response.json({ ok: true });
    }
}

export default ReenrollmentsPaymentController;

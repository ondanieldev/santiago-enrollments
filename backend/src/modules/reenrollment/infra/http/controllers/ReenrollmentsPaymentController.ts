import { container } from 'tsyringe';
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

        const payReenrollment = container.resolve(PayReenrollmentService);

        await payReenrollment.execute({
            enrollment_number: number,
            status,
        });

        return response.status(204).json();
    }
}

export default ReenrollmentsPaymentController;

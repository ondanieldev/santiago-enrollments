import { container } from 'tsyringe';
import { Request, Response } from 'express';

import UpdateMaterialsStatusService from '@modules/reenrollment/services/UpdateMaterialsStatusService';

class ReenrollmentsMaterialsController {
    public async update(
        request: Request,
        response: Response,
    ): Promise<Response> {
        const { enrollment_number } = request.params;

        const { status } = request.body;

        const number = parseInt(enrollment_number, 10);

        const payMaterials = container.resolve(UpdateMaterialsStatusService);

        await payMaterials.execute({
            enrollment_number: number,
            status,
        });

        return response.status(204).json();
    }
}

export default ReenrollmentsMaterialsController;

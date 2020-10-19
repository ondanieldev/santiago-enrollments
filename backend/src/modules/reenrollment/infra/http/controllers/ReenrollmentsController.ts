import { container } from 'tsyringe';
import { Request, Response } from 'express';

import NewReenrollmentDTO from '@modules/reenrollment/dtos/INewReenrollmentDTO';
import NewReenrollmetService from '@modules/reenrollment/services/NewReenrollmetService';
import IndexReenrollmentsService from '@modules/reenrollment/services/IndexReenrollmentsService';
import GetReenrollmentDataService from '@modules/reenrollment/services/GetReenrollmentDataService';
import UpdateReenrollmentService from '@modules/reenrollment/services/UpdateReenrollmentService';

class ReenrollmentController {
    public async index(
        request: Request,
        response: Response,
    ): Promise<Response> {
        const indexEnrollments = container.resolve(IndexReenrollmentsService);

        const reenrollments = await indexEnrollments.execute();

        return response.json(reenrollments);
    }

    public async get(request: Request, response: Response): Promise<Response> {
        const { enrollment_number } = request.params;

        const getReenrollmentData = container.resolve(
            GetReenrollmentDataService,
        );

        const number = parseInt(enrollment_number, 10);

        const reenrollment = await getReenrollmentData.execute(number);

        return response.json(reenrollment);
    }

    public async create(
        request: Request,
        response: Response,
    ): Promise<Response> {
        const data: NewReenrollmentDTO = request.body;

        const newReenrollmet = container.resolve(NewReenrollmetService);

        await newReenrollmet.execute(data);

        return response.status(204).json();
    }

    public async update(
        request: Request,
        response: Response,
    ): Promise<Response> {
        const data: NewReenrollmentDTO = request.body;

        const { enrollment_number } = request.params;

        const number = parseInt(enrollment_number, 10);

        const updateReenrollment = container.resolve(UpdateReenrollmentService);

        await updateReenrollment.execute({
            enrollment_number: number,
            ...data,
        });

        return response.json(number);
    }
}

export default ReenrollmentController;

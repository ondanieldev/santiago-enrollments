import { Request, Response } from 'express';

import NewReenrollmentDTO from '@modules/reenrollment/dtos/NewReenrollmentDTO';
import NewReenrollmetService from '@modules/reenrollment/services/NewReenrollmetService';
import IndexEnrollmentsByGradeService from '@modules/reenrollment/services/IndexReenrollmentsByGradeService';
import GetReenrollmentDataService from '@modules/reenrollment/services/GetReenrollmentDataService';
import UpdateReenrollmentService from '@modules/reenrollment/services/UpdateReenrollmentService';

class ReenrollmentController {
    public async index(
        request: Request,
        response: Response,
    ): Promise<Response> {
        const { grade_name } = request.query;

        const indexEnrollmentsByGrade = new IndexEnrollmentsByGradeService();

        if (typeof grade_name !== 'string') {
            return response.json([]);
        }

        const reenrollments = await indexEnrollmentsByGrade.execute({
            grade_name,
        });

        return response.json(reenrollments);
    }

    public async get(request: Request, response: Response): Promise<Response> {
        const { _id } = request.params;

        const getReenrollmentData = new GetReenrollmentDataService();

        const reenrollment = await getReenrollmentData.execute({
            _id,
        });

        return response.json(reenrollment);
    }

    public async create(
        request: Request,
        response: Response,
    ): Promise<Response> {
        const data: NewReenrollmentDTO = request.body;

        const newReenrollmet = new NewReenrollmetService();

        await newReenrollmet.execute(data);

        return response.json({ ok: true });
    }

    public async update(
        request: Request,
        response: Response,
    ): Promise<Response> {
        const data: NewReenrollmentDTO = request.body;

        const { _id } = request.params;

        const updateReenrollment = new UpdateReenrollmentService();

        await updateReenrollment.execute({ _id, ...data });

        return response.json(_id);
    }
}

export default ReenrollmentController;

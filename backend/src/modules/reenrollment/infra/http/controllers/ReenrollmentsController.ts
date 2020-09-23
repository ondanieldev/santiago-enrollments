import { Request, Response } from 'express';
import { parseISO } from 'date-fns';

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

        if (
            grade_name !== 'maternal' &&
            grade_name !== 'first_period' &&
            grade_name !== 'second_period' &&
            grade_name !== 'first_year' &&
            grade_name !== 'second_year' &&
            grade_name !== 'third_year' &&
            grade_name !== 'fourth_year' &&
            grade_name !== 'fifth_year' &&
            grade_name !== 'fifth_year' &&
            grade_name !== 'sixth_year' &&
            grade_name !== 'seventh_year' &&
            grade_name !== 'eighth_year' &&
            grade_name !== 'nineth_year'
        ) {
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

        data.financial_birth_date = parseISO(
            data.financial_birth_date.toString(),
        );

        data.supportive_birth_date = parseISO(
            data.supportive_birth_date.toString(),
        );

        data.student_birth_date = parseISO(data.student_birth_date.toString());

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

        data.financial_birth_date = parseISO(
            data.financial_birth_date.toString(),
        );

        data.supportive_birth_date = parseISO(
            data.supportive_birth_date.toString(),
        );

        data.student_birth_date = parseISO(data.student_birth_date.toString());

        await updateReenrollment.execute({ _id, ...data });

        return response.json(_id);
    }
}

export default ReenrollmentController;

import { container } from 'tsyringe';
import { Request, Response } from 'express';

import IndexEnrollmentsByGradeService from '@modules/reenrollment/services/IndexReenrollmentsByGradeService';

class ReenrollmentController {
    public async index(
        request: Request,
        response: Response,
    ): Promise<Response> {
        const { grade_name } = request.params;

        const indexEnrollmentsByGrade = container.resolve(
            IndexEnrollmentsByGradeService,
        );

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

        const reenrollments = await indexEnrollmentsByGrade.execute(grade_name);

        return response.json(reenrollments);
    }
}

export default ReenrollmentController;

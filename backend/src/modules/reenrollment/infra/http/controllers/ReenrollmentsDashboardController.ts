import { Request, Response, NextFunction } from 'express';
import { container } from 'tsyringe';

import GetDashboardDataService from '../../../services/GetDashboardDataService';

export default class ReenrollmentsDashboardController {
    public async index(
        request: Request,
        response: Response,
        _: NextFunction,
    ): Promise<Response> {
        const getDashboardData = container.resolve(GetDashboardDataService);

        const data = await getDashboardData.execute();

        return response.json(data);
    }
}

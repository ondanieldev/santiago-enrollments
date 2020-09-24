import { Request, Response } from 'express';

import AuthenticateUserService from '@modules/session/services/AuthenticateUserService';

class SessionsController {
    public async create(
        request: Request,
        response: Response,
    ): Promise<Response> {
        const { username, password } = request.body;

        const authenticateUser = new AuthenticateUserService();

        const token = await authenticateUser.execute({
            username,
            password,
        });

        return response.json(token);
    }
}

export default SessionsController;

import { sign } from 'jsonwebtoken';

import AppError from '@shared/errors/AppError';
import authConfig from '@config/auth';

interface IRequest {
    username: string;
    password: string;
}

class AuthenticateUserService {
    public async execute({ username, password }: IRequest): Promise<string> {
        if (
            username !== process.env.ADMIN_USERNAME ||
            password !== process.env.ADMIN_PASSWORD
        ) {
            throw new AppError('Credenciais incorretas!', 401);
        }

        const { secret, expiresIn } = authConfig.jwt;

        const token = sign({}, secret, {
            subject: 'admin',
            expiresIn,
        });

        return token;
    }
}

export default AuthenticateUserService;

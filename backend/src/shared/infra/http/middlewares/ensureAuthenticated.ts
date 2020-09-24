import { Request, Response, NextFunction } from 'express';
import { verify } from 'jsonwebtoken';

import AppError from '@shared/errors/AppError';
import authConfig from '@config/auth';

export default function ensureAuthenticated(
    request: Request,
    response: Response,
    next: NextFunction,
): void {
    const authHeader = request.headers.authorization;

    if (!authHeader) {
        throw new AppError('Token JWT faltando!', 401);
    }

    const [, token] = authHeader.split(' ');

    try {
        verify(token, authConfig.jwt.secret);

        return next();
    } catch {
        throw new AppError('Token JWT inválido!', 401);
    }
}

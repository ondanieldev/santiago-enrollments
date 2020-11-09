import 'reflect-metadata';
import 'dotenv/config';

import express, { Request, Response, NextFunction } from 'express';
import 'express-async-errors';

import cors from 'cors';
import path from 'path';

import AppError from '@shared/errors/AppError';
import routes from '@shared/infra/http/routes';

import '@shared/infra/mongoose';
import '@shared/containers';

const app = express();
const port = process.env.AP_API_PORT || 3000;

app.use(cors());
app.use(express.json());
app.use(routes);
app.use(
    '/public',
    express.static(path.resolve(__dirname, '..', '..', '..', '..', 'tmp')),
    express.static(
        path.resolve(__dirname, '..', '..', '..', 'assets', 'images'),
    ),
);

app.use((err: Error, request: Request, response: Response, _: NextFunction) => {
    if (err instanceof AppError) {
        return response.status(err.statusCode).json({
            statusCode: err.statusCode,
            message: err.message,
        });
    }

    console.log(err);

    return response.status(500).json({
        statusCode: 500,
        message: 'Internal server error.',
    });
});

app.listen(port, () => {
    console.log(`Backend running on port ${port}!`);
});

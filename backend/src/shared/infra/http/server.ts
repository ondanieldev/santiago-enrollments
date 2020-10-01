import 'reflect-metadata';
import 'dotenv/config';

import express, { Request, Response, NextFunction } from 'express';
import cors from 'cors';
import path from 'path';
import 'express-async-errors';

import '@shared/infra/mongoose';

import AppError from '@shared/errors/AppError';
import routes from '@shared/infra/http/routes';
import nodemailer from '@shared/infra/nodemailer';

const app = express();
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

    try {
        nodemailer.sendMail({
            from: `"Colégio Santiago" <${process.env.NODEMAILER_USER}>`,
            to: process.env.NODEMAILER_USER,
            subject: 'ERRO NO SERVIDOR',
            text: `O servidor obteve o seguinte erro durante a execução: ${err}`,
        });
    } catch {}

    console.log(err);

    return response.status(500).json({
        statusCode: 500,
        message: 'Internal server error.',
    });
});

app.listen(3333, () => {
    console.log('Backend running on port 3333!');
});

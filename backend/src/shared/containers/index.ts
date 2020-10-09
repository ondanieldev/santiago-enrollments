import { container } from 'tsyringe';

import './providers';

import IReenrollmentsRepository from '@modules/reenrollment/repositories/IReenrollmentsRepository';
import ReenrollmentsRepository from '@modules/reenrollment/infra/mongoose/repositories/ReenrollmentsRepository';

container.registerSingleton<IReenrollmentsRepository>(
    'ReenrollmentsRepository',
    ReenrollmentsRepository,
);

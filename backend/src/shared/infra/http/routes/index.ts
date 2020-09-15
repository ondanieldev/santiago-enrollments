import { Router } from 'express';

import reenrollmentsRouter from '@modules/reenrollment/infra/http/routes/reenrollments.routes';

const routes = Router();

routes.use('/reenrollments', reenrollmentsRouter);

export default routes;

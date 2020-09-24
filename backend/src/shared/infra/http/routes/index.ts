import { Router } from 'express';

import sessionsRouter from '@modules/session/infra/http/routes/sessions.routes';
import reenrollmentsRouter from '@modules/reenrollment/infra/http/routes/reenrollments.routes';

const routes = Router();

routes.use('/sessions', sessionsRouter);
routes.use('/reenrollments', reenrollmentsRouter);

export default routes;

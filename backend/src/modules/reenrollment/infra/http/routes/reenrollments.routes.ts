import { Router } from 'express';

import ReenrollmentsController from '@modules/reenrollment/infra/http/controllers/ReenrollmentsController';
import ReenrollmentsPDFsController from '@modules/reenrollment/infra/http/controllers/ReenrollmentsPDFsController';
import ReenrollmentsMailsController from '@modules/reenrollment/infra/http/controllers/ReenrollmentsMailsController';
import ensureAuthenticated from '@shared/infra/http/middlewares/ensureAuthenticated';

const reenrollmentsRoutes = Router();
const reenrollmentsController = new ReenrollmentsController();
const reenrollmentsPDFsController = new ReenrollmentsPDFsController();
const reenrollmentsMailsController = new ReenrollmentsMailsController();

reenrollmentsRoutes.post('/', reenrollmentsController.create);

reenrollmentsRoutes.get(
    '/',
    ensureAuthenticated,
    reenrollmentsController.index,
);

reenrollmentsRoutes.get(
    '/:_id',
    ensureAuthenticated,
    reenrollmentsController.get,
);

reenrollmentsRoutes.put(
    '/:_id',
    ensureAuthenticated,
    reenrollmentsController.update,
);

reenrollmentsRoutes.patch(
    '/pdfs/:_id',
    ensureAuthenticated,
    reenrollmentsPDFsController.update,
);

reenrollmentsRoutes.post(
    '/mail',
    ensureAuthenticated,
    reenrollmentsMailsController.create,
);

export default reenrollmentsRoutes;

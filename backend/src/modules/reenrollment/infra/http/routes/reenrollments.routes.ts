import { Router } from 'express';

import ReenrollmentsController from '@modules/reenrollment/infra/http/controllers/ReenrollmentsController';
import ReenrollmentsPDFsController from '@modules/reenrollment/infra/http/controllers/ReenrollmentsPDFsController';
import ReenrollmentsMailsController from '@modules/reenrollment/infra/http/controllers/ReenrollmentsMailsController';
import ReenrollmentsPaymentController from '@modules/reenrollment/infra/http/controllers/ReenrollmentsPaymentController';
import ensureAuthenticated from '@shared/infra/http/middlewares/ensureAuthenticated';

const reenrollmentsRoutes = Router();
const reenrollmentsController = new ReenrollmentsController();
const reenrollmentsPDFsController = new ReenrollmentsPDFsController();
const reenrollmentsMailsController = new ReenrollmentsMailsController();
const reenrollmentsPaymentController = new ReenrollmentsPaymentController();

reenrollmentsRoutes.post('/', reenrollmentsController.create);

reenrollmentsRoutes.get(
    '/',
    ensureAuthenticated,
    reenrollmentsController.index,
);

reenrollmentsRoutes.get(
    '/:enrollment_number',
    ensureAuthenticated,
    reenrollmentsController.get,
);

reenrollmentsRoutes.put(
    '/:enrollment_number',
    ensureAuthenticated,
    reenrollmentsController.update,
);

reenrollmentsRoutes.patch(
    '/pdfs/:enrollment_number',
    ensureAuthenticated,
    reenrollmentsPDFsController.update,
);

reenrollmentsRoutes.post(
    '/mail',
    ensureAuthenticated,
    reenrollmentsMailsController.create,
);

reenrollmentsRoutes.patch(
    '/payment/:enrollment_number',
    ensureAuthenticated,
    reenrollmentsPaymentController.update,
);

export default reenrollmentsRoutes;

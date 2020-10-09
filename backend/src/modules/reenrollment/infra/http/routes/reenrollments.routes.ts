import { Router } from 'express';

import ReenrollmentsController from '@modules/reenrollment/infra/http/controllers/ReenrollmentsController';
import ReenrollmentsDocumentsController from '@modules/reenrollment/infra/http/controllers/ReenrollmentsDocumentsController';
import ReenrollmentsDocumentsMailsController from '@modules/reenrollment/infra/http/controllers/ReenrollmentsDocumentsMailsController';
import ReenrollmentsPaymentController from '@modules/reenrollment/infra/http/controllers/ReenrollmentsPaymentController';
import ensureAuthenticated from '@shared/infra/http/middlewares/ensureAuthenticated';

const reenrollmentsRoutes = Router();
const reenrollmentsController = new ReenrollmentsController();
const reenrollmentsDocumentsController = new ReenrollmentsDocumentsController();
const reenrollmentsDocumentsMailsController = new ReenrollmentsDocumentsMailsController();
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
    reenrollmentsDocumentsController.update,
);

reenrollmentsRoutes.post(
    '/mail/:enrollment_number',
    ensureAuthenticated,
    reenrollmentsDocumentsMailsController.create,
);

reenrollmentsRoutes.patch(
    '/payment/:enrollment_number',
    ensureAuthenticated,
    reenrollmentsPaymentController.update,
);

export default reenrollmentsRoutes;

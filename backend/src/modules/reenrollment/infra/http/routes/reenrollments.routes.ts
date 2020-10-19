import { Router } from 'express';

import ReenrollmentsController from '@modules/reenrollment/infra/http/controllers/ReenrollmentsController';
import ReenrollmentsByGradeController from '@modules/reenrollment/infra/http/controllers/ReenrollmentsByGradeController';
import ReenrollmentsDocumentsController from '@modules/reenrollment/infra/http/controllers/ReenrollmentsDocumentsController';
import ReenrollmentsDocumentsMailsController from '@modules/reenrollment/infra/http/controllers/ReenrollmentsDocumentsMailsController';
import ReenrollmentsPaymentController from '@modules/reenrollment/infra/http/controllers/ReenrollmentsPaymentController';
import ReenrollmentsDashboardController from '@modules/reenrollment/infra/http/controllers/ReenrollmentsDashboardController';
import ensureAuthenticated from '@shared/infra/http/middlewares/ensureAuthenticated';

const reenrollmentsRoutes = Router();
const reenrollmentsController = new ReenrollmentsController();
const reenrollmentsByGradeController = new ReenrollmentsByGradeController();
const reenrollmentsDocumentsController = new ReenrollmentsDocumentsController();
const reenrollmentsDocumentsMailsController = new ReenrollmentsDocumentsMailsController();
const reenrollmentsPaymentController = new ReenrollmentsPaymentController();
const reenrollmentsDashboardController = new ReenrollmentsDashboardController();

reenrollmentsRoutes.post('/', reenrollmentsController.create);

reenrollmentsRoutes.get(
    '/',
    ensureAuthenticated,
    reenrollmentsController.index,
);

reenrollmentsRoutes.get(
    '/dashboard',
    ensureAuthenticated,
    reenrollmentsDashboardController.index,
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

reenrollmentsRoutes.get(
    '/grade/:grade_name',
    ensureAuthenticated,
    reenrollmentsByGradeController.index,
);

export default reenrollmentsRoutes;

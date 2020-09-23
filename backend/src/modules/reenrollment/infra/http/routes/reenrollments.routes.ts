import { Router } from 'express';

import ReenrollmentsController from '@modules/reenrollment/infra/http/controllers/ReenrollmentsController';
import ReenrollmentsPDFsController from '@modules/reenrollment/infra/http/controllers/ReenrollmentsPDFsController';

const reenrollmentsRoutes = Router();
const reenrollmentsController = new ReenrollmentsController();
const reenrollmentsPDFsController = new ReenrollmentsPDFsController();

reenrollmentsRoutes.get('/', reenrollmentsController.index);
reenrollmentsRoutes.get('/:_id', reenrollmentsController.get);
reenrollmentsRoutes.put('/:_id', reenrollmentsController.update);
reenrollmentsRoutes.post('/', reenrollmentsController.create);
reenrollmentsRoutes.patch('/:_id', reenrollmentsPDFsController.update);

export default reenrollmentsRoutes;

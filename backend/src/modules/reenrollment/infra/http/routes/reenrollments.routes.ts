import { Router } from 'express';

import ReenrollmentsController from '@modules/reenrollment/infra/http/controllers/ReenrollmentsController';

const reenrollmentsRoutes = Router();
const reenrollmentsController = new ReenrollmentsController();

reenrollmentsRoutes.post('/', reenrollmentsController.create);

export default reenrollmentsRoutes;

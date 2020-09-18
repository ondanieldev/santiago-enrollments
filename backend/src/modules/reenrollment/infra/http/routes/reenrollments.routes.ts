import { Router } from 'express';

import ReenrollmentsController from '@modules/reenrollment/infra/http/controllers/ReenrollmentsController';

const reenrollmentsRoutes = Router();
const reenrollmentsController = new ReenrollmentsController();

reenrollmentsRoutes.get('/', reenrollmentsController.index);
reenrollmentsRoutes.post('/', reenrollmentsController.create);
reenrollmentsRoutes.get('/:_id', reenrollmentsController.get);
reenrollmentsRoutes.put('/:_id', reenrollmentsController.update);

export default reenrollmentsRoutes;

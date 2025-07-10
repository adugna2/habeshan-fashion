// routes/payment.routes.js
import express from 'express';
import { getPaymentMethodsController } from '../controllers/paymentMethod.controller.js';

const router = express.Router();

router.get('/', getPaymentMethodsController);

export default router;

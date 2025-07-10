import express from 'express';
import {
  getAllOrdersController,
  getOrderByIdController,
  createOrderController
} from '../controllers/order.controller.js';

const router = express.Router();

router.get('/', getAllOrdersController);
router.get('/:id', getOrderByIdController);
router.post('/', createOrderController); // For placing a new order

export default router;

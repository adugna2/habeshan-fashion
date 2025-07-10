// controllers/paymentMethod.controller.js
import * as paymentMethodService from '../services/paymentMethodService.js';

export const getPaymentMethodsController = async (req, res) => {
  try {
    const methods = await paymentMethodService.getAllPaymentMethods();
    res.status(200).json(methods);
  } catch (error) {
    console.error('Error fetching payment methods:', error);
    res.status(500).json({ error: 'Failed to fetch payment methods' });
  }
};

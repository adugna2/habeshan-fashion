import {
  createOrder,
  getAllOrders,
  getOrderById,
} from '../services/order.service.js';

// Create a new order
export const createOrderController = async (req, res) => {
  try {
    const orderData = req.body;
    const newOrder = await createOrder(orderData);
    res.status(201).json(newOrder);
  } catch (error) {
    console.error('Error creating order:', error);
    res.status(500).json({ error: 'Server error: Could not create order.' });
  }
};

// Get all orders
export const getAllOrdersController = async (req, res) => {
  try {
    const orders = await getAllOrders();
    res.status(200).json(orders);
  } catch (error) {
    console.error('Error fetching orders:', error);
    res.status(500).json({ error: 'Server error: Could not fetch orders.' });
  }
};

// Get a single order by ID
export const getOrderByIdController = async (req, res) => {
  try {
    const { id } = req.params;
    if (!id) {
      return res.status(400).json({ error: 'Order ID is required' });
    }

    const order = await getOrderById(id);
    if (!order) {
      return res.status(404).json({ error: 'Order not found' });
    }

    res.status(200).json(order);
  } catch (error) {
    console.error('Error fetching order:', error);
    res.status(500).json({ error: 'Server error: Could not fetch order.' });
  }
};

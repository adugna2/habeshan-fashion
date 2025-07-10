// backend/services/order.service.js
import db from '../db.config.js'; // Your DB connection

export const createOrder = (orderData) => {
  return new Promise((resolve, reject) => {
    const { user_id, total_amount, currency, payment_method_id, payment_status, order_status, shipping_address } = orderData;
    const query = `INSERT INTO orders 
      (user_id, total_amount, currency, payment_method_id, payment_status, order_status, shipping_address) 
      VALUES (?, ?, ?, ?, ?, ?, ?)`;

    db.query(query, [
      user_id || null,
      total_amount,
      currency || 'ETB',
      payment_method_id || null,
      payment_status || 'pending',
      order_status || 'pending',
      shipping_address
    ], (err, result) => {
      if (err) return reject(err);
      resolve({ id: result.insertId, ...orderData });
    });
  });
};

export const getAllOrders = () => {
  return new Promise((resolve, reject) => {
    db.query('SELECT * FROM orders', (err, results) => {
      if (err) return reject(err);
      resolve(results);
    });
  });
};

export const getOrderById = (id) => {
  return new Promise((resolve, reject) => {
    db.query('SELECT * FROM orders WHERE id = ?', [id], (err, results) => {
      if (err) return reject(err);
      resolve(results[0]);
    });
  });
};

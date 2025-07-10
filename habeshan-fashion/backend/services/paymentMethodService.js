// services/paymentMethodService.js
import db from '../db.config.js'; // your mysql connection

export const getAllPaymentMethods = () => {
  return new Promise((resolve, reject) => {
    const query = 'SELECT * FROM payment_methods WHERE is_active = TRUE';
    db.query(query, (err, results) => {
      if (err) return reject(err);
      resolve(results);
    });
  });
};

import db from '../db.config.js'; // ✅ Fix: correct path

export const createProduct = (product) => {
  return new Promise((resolve, reject) => {
    const { name, description, price, image } = product;
    const sql = `INSERT INTO products (name, description, price, image) VALUES (?, ?, ?, ?)`;
    db.query(sql, [name, description, price, image], (err, results) => {
      if (err) return reject(err);
      resolve({ id: results.insertId, ...product });
    });
  });
};

export const getAllProductsService = () => {
  return new Promise((resolve, reject) => {
    db.query(`SELECT * FROM products`, (err, results) => {
      if (err) return reject(err);
      resolve(results);
    });
  });
};

export const getProductByIdService = (id) => {
  return new Promise((resolve, reject) => {
    db.query(`SELECT * FROM products WHERE id = ?`, [id], (err, results) => {
      if (err) return reject(err);
      resolve(results[0]);
    });
  });
};

export const updateProductService = (id, data) => {
  return new Promise((resolve, reject) => {
    const fields = [];
    const values = [];

    if (data.name !== undefined) {
      fields.push('name = ?');
      values.push(data.name);
    }
    if (data.description !== undefined) {
      fields.push('description = ?');
      values.push(data.description);
    }
    if (data.price !== undefined) {
      fields.push('price = ?');
      values.push(data.price);
    }
    if (data.image !== undefined) {
      fields.push('image = ?');
      values.push(data.image);
    }

    if (fields.length === 0) {
      return resolve({ affectedRows: 0 });
    }

    const sql = `UPDATE products SET ${fields.join(', ')} WHERE id = ?`;
    values.push(id);

    db.query(sql, values, (err, results) => {
      if (err) return reject(err);
      resolve(results);
    });
  });
};

export const deleteProductService = (id) => {
  return new Promise((resolve, reject) => {
    const sql = `DELETE FROM products WHERE id = ?`;
    db.query(sql, [id], (err, results) => {
      if (err) return reject(err);
      resolve(results);
    });
  });
};

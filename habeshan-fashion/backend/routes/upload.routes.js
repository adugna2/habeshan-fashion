import express from 'express';
import multer from 'multer';
import { createProduct } from '../services/productservices.js';


import { verifyAdmin } from '../middleware/verifyAdmin.js'; // Ensure you have this middleware to check admin permissions

const router = express.Router();
const upload = multer({ dest: 'uploads/' }); // configure storage as you wish

router.post(
  '/products',
  verifyAdmin,
  upload.single('image'), // handle single file upload, field name 'image'
  async (req, res) => {
    try {
      // req.body contains text fields (name, type, color, cost, ...)
      // req.file contains uploaded file info (image)

      const productData = {
        ...req.body,
        image: req.file, // or save file path as you want
        is_new_arrival: req.body.is_new_arrival === 'true', // convert string boolean
      };

      const newProduct = await createProduct(productData);

      res.status(201).json(newProduct);
    } catch (error) {
      res.status(500).json({ error: error.message || 'Server error' });
    }
  }
);

export default router;

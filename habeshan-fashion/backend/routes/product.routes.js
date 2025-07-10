import express from 'express';
import multer from 'multer';
import {
  createProductController,
  getAllProductsController,
  getProductByIdController,
  updateProductController,
  deleteProductController,
} from '../controllers/product.controllers.js';

const router = express.Router();

const upload = multer({ dest: 'uploads/' });

// Create product with image upload
router.post('/', upload.single('image'), createProductController);

// Get all products
router.get('/', getAllProductsController);

// Get product by id
router.get('/:id', getProductByIdController);

// Update product by id with optional image
router.put('/:id', upload.single('image'), updateProductController);

// Delete product by id
router.delete('/:id', deleteProductController);

export default router;

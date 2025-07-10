import {
  createProduct,
  getAllProductsService,
  getProductByIdService,
  updateProductService,
  deleteProductService,
} from '../services/productservices.js';

// Create a new product
export const createProductController = async (req, res) => {
  try {
    const { name, description, price } = req.body;
    const image = req.file?.filename || null;

    if (!name || !price || !image) {
      return res.status(400).json({ error: 'Product Name, Price, and Image are required.' });
    }

    const numericPrice = parseFloat(price);
    if (isNaN(numericPrice) || numericPrice < 0) {
      return res.status(400).json({ error: 'Price must be a valid non-negative number.' });
    }

    const newProduct = await createProduct({
      name,
      description: description || '',
      price: numericPrice,
      image,
    });

    res.status(201).json(newProduct);
  } catch (error) {
    console.error('Error in createProductController:', error);
    res.status(500).json({ error: 'Server error: Could not create product.' });
  }
};

// Get all products
export const getAllProductsController = async (req, res) => {
  try {
    const products = await getAllProductsService();
    res.status(200).json(products);
  } catch (error) {
    console.error('Error in getAllProductsController:', error);
    res.status(500).json({ error: 'Server error: Could not fetch products.' });
  }
};

// Get product by ID
export const getProductByIdController = async (req, res) => {
  try {
    const { id } = req.params;
    if (!id || isNaN(parseInt(id))) {
      return res.status(400).json({ error: 'Invalid product ID.' });
    }

    const product = await getProductByIdService(id);
    if (!product) {
      return res.status(404).json({ error: 'Product not found.' });
    }

    res.status(200).json(product);
  } catch (error) {
    console.error('Error in getProductByIdController:', error);
    res.status(500).json({ error: 'Server error: Could not fetch product.' });
  }
};

// Update product by ID
export const updateProductController = async (req, res) => {
  try {
    const { id } = req.params;
    const { name, description, price } = req.body;
    const image = req.file?.filename;

    if (!id || isNaN(parseInt(id))) {
      return res.status(400).json({ error: 'Invalid product ID.' });
    }

    if (!name && !description && !price && !image) {
      return res.status(400).json({ error: 'At least one field must be provided for update.' });
    }

    let numericPrice = price;
    if (price !== undefined && price !== null) {
      numericPrice = parseFloat(price);
      if (isNaN(numericPrice) || numericPrice < 0) {
        return res.status(400).json({ error: 'Price must be a valid non-negative number if provided.' });
      }
    }

    const updateResult = await updateProductService(id, {
      name,
      description,
      price: numericPrice,
      image,
    });

    if (updateResult.affectedRows === 0) {
      return res.status(404).json({ error: 'Product not found or no changes made.' });
    }

    const updatedProduct = await getProductByIdService(id);
    res.status(200).json(updatedProduct);
  } catch (error) {
    console.error('Error in updateProductController:', error);
    res.status(500).json({ error: 'Server error: Could not update product.' });
  }
};

// Delete product by ID
export const deleteProductController = async (req, res) => {
  try {
    const { id } = req.params;
    if (!id || isNaN(parseInt(id))) {
      return res.status(400).json({ error: 'Invalid product ID.' });
    }

    const deleteResult = await deleteProductService(id);
    if (deleteResult.affectedRows === 0) {
      return res.status(404).json({ error: 'Product not found.' });
    }

    res.status(200).json({ message: 'Product deleted successfully.' });
  } catch (error) {
    console.error('Error in deleteProductController:', error);
    res.status(500).json({ error: 'Server error: Could not delete product.' });
  }
};

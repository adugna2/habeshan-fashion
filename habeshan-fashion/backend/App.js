import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import path from 'path';
import { fileURLToPath } from 'url';

import productRoutes from './routes/product.routes.js';
import contactRoutes from './routes/contact.routes.js';
import adminRoutes from './routes/admin.routes.js';
import uploadRoutes from './routes/upload.routes.js';

import orderRoutes from './routes/order.routes.js';
// import paymentRoutes from './routes/payment.routes.js';




dotenv.config();

const app = express();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

app.use(cors({ origin: 'http://localhost:8080', credentials: true }));
app.use(express.json());

app.use('/uploads', express.static(path.join(__dirname, 'uploads')));
app.use('/api/orders', orderRoutes);
app.use('/api/products', productRoutes);
app.use('/api/admin', adminRoutes);
app.use('/api/contact', contactRoutes);
app.use('/api/upload', uploadRoutes);
// app.use('/api/payment', paymentRoutes);
import paymentRoutes from './routes/payment.routes.js';

app.use('/api/payment-methods', paymentRoutes);
// app.use('/api/payment-methods', paymentRoutes);
app.get('/', (_, res) => res.send('✅ API is running'));

app.listen(process.env.PORT || 5000, () =>
  console.log(`🚀 Server at http://localhost:${process.env.PORT || 5000}`)
);

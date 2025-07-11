// homepage/backend/routes/productRoutes.js
import express from 'express';
import { getProducts } from '../controllers/productController.js';

const router = express.Router();

router.get('/', getProducts);

export default router;

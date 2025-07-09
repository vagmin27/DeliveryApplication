// homepage/backend/routes/cartRoutes.js
import express from 'express';
import {
    addToCart,
    getCart,
    removeFromCart
} from '../controllers/cartController.js';
import authMiddleware from '../middleware/authMiddleware.js';

const router = express.Router();

router.get('/', authMiddleware, getCart);
router.post('/add', authMiddleware, addToCart);
router.post('/remove', authMiddleware, removeFromCart);

export default router;

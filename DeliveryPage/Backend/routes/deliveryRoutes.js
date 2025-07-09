import express from 'express';
import {
    createOrUpdateDelivery,
    getDeliveryInfo
} from '../controllers/deliveryController.js';
import authMiddleware from '../middlewares/authMiddleware.js';

const router = express.Router();

router.get('/', authMiddleware, getDeliveryInfo);
router.post('/', authMiddleware, createOrUpdateDelivery); // for testing/admin use

export default router;

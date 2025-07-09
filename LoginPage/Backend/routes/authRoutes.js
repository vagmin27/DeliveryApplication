import express from 'express';
import { check } from 'express-validator';
import { login, register } from '../controllers/authController.js';

const router = express.Router();

router.post('/login', [
    check('email', 'Email is required').isEmail(),
    check('password', 'Password is required').notEmpty()
], login);

router.post('/register', [
    check('name', 'Name is required').notEmpty(),
    check('email', 'Email is required').isEmail(),
    check('password', 'Password should be 6+ characters').isLength({ min: 6 }),
    check('role', 'Role must be customer or agent').isIn(['customer', 'agent'])
], register);

export default router;

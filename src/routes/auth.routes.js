import { Router } from 'express';
import {
  register,
  login,
  getProfile
} from '../controllers/auth.controller.js';

import {
  validateRegister,
  validateLogin
} from '../validations/auth.validation.js';

import authMiddleware from '../middlewares/auth.middleware.js';

const router = Router();

/* ===============================
   AUTH ROUTES
================================ */
router.post('/signup', validateRegister, register);
router.post('/login', validateLogin, login);
router.get('/profile', authMiddleware, getProfile);

export default router;

import { Router } from 'express';
import {
  createOrder,
  verifyPayment,
  getRazorpayKey,
  getPaymentDetails
} from '../controllers/payment.controller.js';
import authMiddleware from '../middlewares/auth.middleware.js';

const router = Router();

/* ===============================
   GET RAZORPAY KEY
   Public route - needed by frontend
================================ */
router.get('/key', getRazorpayKey);

/* ===============================
   CREATE RAZORPAY ORDER
   Protected route - user must be logged in
================================ */
router.post('/create-order', authMiddleware, createOrder);

/* ===============================
   VERIFY PAYMENT
   Protected route - user must be logged in
================================ */
router.post('/verify', authMiddleware, verifyPayment);

/* ===============================
   GET PAYMENT DETAILS
   Protected route - for debugging & admin
================================ */
router.get('/details/:paymentId', authMiddleware, getPaymentDetails);

export default router;

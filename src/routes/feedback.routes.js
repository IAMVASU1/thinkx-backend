import { Router } from 'express';
import {
  submitFeedback,
  getAllFeedback
} from '../controllers/feedback.controller.js';

import authMiddleware from '../middlewares/auth.middleware.js';
import roleMiddleware from '../middlewares/role.middleware.js';

const router = Router();

/* ===============================
   SUBMIT FEEDBACK
================================ */
router.post(
  '/',
  authMiddleware,
  submitFeedback
);

/* ===============================
   VIEW ALL FEEDBACK (ADMIN)
================================ */
router.get(
  '/',
  authMiddleware,
  roleMiddleware('ADMIN'),
  getAllFeedback
);

export default router;

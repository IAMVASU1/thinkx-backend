import { Router } from 'express';
import {
  getDashboardStats,
  approveSuccessStory,
  getAllUsers
} from '../controllers/admin.controller.js';

import { getAllDonations } from '../controllers/donation.controller.js';
import { getAllFeedback } from '../controllers/feedback.controller.js';

import authMiddleware from '../middlewares/auth.middleware.js';
import roleMiddleware from '../middlewares/role.middleware.js';

const router = Router();

/* ===============================
   DASHBOARD
================================ */
router.get(
  '/dashboard',
  authMiddleware,
  roleMiddleware('ADMIN'),
  getDashboardStats
);

/* ===============================
   USERS MANAGEMENT
================================ */
router.get(
  '/users',
  authMiddleware,
  roleMiddleware('ADMIN'),
  getAllUsers
);

/* ===============================
   APPROVE SUCCESS STORIES
================================ */
router.put(
  '/success-story/:id/approve',
  authMiddleware,
  roleMiddleware('ADMIN'),
  approveSuccessStory
);

/* ===============================
   DONATIONS
================================ */
router.get(
  '/donations',
  authMiddleware,
  roleMiddleware('ADMIN'),
  getAllDonations
);

/* ===============================
   FEEDBACK
================================ */
router.get(
  '/feedback',
  authMiddleware,
  roleMiddleware('ADMIN'),
  getAllFeedback
);

export default router;

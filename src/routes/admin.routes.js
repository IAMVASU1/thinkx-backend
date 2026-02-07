import { Router } from 'express';
import {
  getDashboardStats,
  approveSuccessStory,
  getAllUsers,
  getActivityLog,
  getReports,
  getModerationQueue,
  approveModerationItem,
  rejectModerationItem
} from '../controllers/admin.controller.js';

import { getAllDonations } from '../controllers/donation.controller.js';
import { getAllFeedback } from '../controllers/feedback.controller.js';

import authMiddleware from '../middlewares/auth.middleware.js';
import roleMiddleware from '../middlewares/role.middleware.js';

const router = Router();

/* ===============================
   DASHBOARD STATS
================================ */
router.get(
  '/dashboard/stats',
  authMiddleware,
  roleMiddleware('ADMIN'),
  getDashboardStats
);

/* ===============================
   ACTIVITY LOG
================================ */
router.get(
  '/activity-log',
  authMiddleware,
  roleMiddleware('ADMIN'),
  getActivityLog
);

/* ===============================
   REPORTS
================================ */
router.get(
  '/reports',
  authMiddleware,
  roleMiddleware('ADMIN'),
  getReports
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
   MODERATION QUEUE
================================ */
router.get(
  '/moderation/queue',
  authMiddleware,
  roleMiddleware('ADMIN'),
  getModerationQueue
);

/* ===============================
   APPROVE MODERATION ITEM
================================ */
router.post(
  '/moderation/:itemId/approve',
  authMiddleware,
  roleMiddleware('ADMIN'),
  approveModerationItem
);

/* ===============================
   REJECT MODERATION ITEM
================================ */
router.post(
  '/moderation/:itemId/reject',
  authMiddleware,
  roleMiddleware('ADMIN'),
  rejectModerationItem
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

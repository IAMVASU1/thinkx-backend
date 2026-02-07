import { Router } from 'express';
import {
  getMyDonations,
  getAllDonations,
  getDonationStats,
  getDonationsByInitiative
} from '../controllers/donation.controller.js';

import authMiddleware from '../middlewares/auth.middleware.js';
import roleMiddleware from '../middlewares/role.middleware.js';

const router = Router();

/* ===============================
   NOTE: Donation creation is now handled via 
   /api/payment/create-order and /api/payment/verify
================================ */

/* ===============================
   MY DONATIONS
================================ */
router.get(
  '/my-donations',
  authMiddleware,
  getMyDonations
);

/* ===============================
   DONATION STATS
================================ */
router.get(
  '/stats',
  authMiddleware,
  getDonationStats
);

/* ===============================
   GET DONATIONS BY INITIATIVE
================================ */
router.get(
  '/initiative/:initiative',
  authMiddleware,
  getDonationsByInitiative
);

/* ===============================
   ALL DONATIONS (ADMIN)
================================ */
router.get(
  '/',
  authMiddleware,
  roleMiddleware('ADMIN'),
  getAllDonations
);

export default router;

import { Router } from 'express';
import {
  createDonation,
  getMyDonations,
  getAllDonations
} from '../controllers/donation.controller.js';

import authMiddleware from '../middlewares/auth.middleware.js';
import roleMiddleware from '../middlewares/role.middleware.js';
import { validateDonation } from '../validations/donation.validation.js';

const router = Router();

/* ===============================
   CREATE DONATION
================================ */
router.post(
  '/',
  authMiddleware,
  validateDonation,
  createDonation
);

/* ===============================
   MY DONATIONS
================================ */
router.get(
  '/my',
  authMiddleware,
  getMyDonations
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

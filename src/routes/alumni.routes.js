import { Router } from 'express';

/* Controllers */
import {
  upsertProfile,
  getMyProfile,
  getAlumniDirectory,
  getAlumniStats,
  getAlumniActivities
} from '../controllers/alumni.controller.js';

import { postJob } from '../controllers/job.controller.js';
import { createEvent } from '../controllers/event.controller.js';
import { submitSuccessStory } from '../controllers/successStory.controller.js';
import { submitFeedback } from '../controllers/feedback.controller.js';

/* Middlewares */
import authMiddleware from '../middlewares/auth.middleware.js';
import roleMiddleware from '../middlewares/role.middleware.js';

/* Validations */
import { validateJob } from '../validations/job.validation.js';
import { validateEvent } from '../validations/event.validation.js';

const router = Router();

/* ===============================
   ALUMNI STATS
================================ */
router.get(
  '/stats',
  authMiddleware,
  getAlumniStats
);

/* ===============================
   ALUMNI ACTIVITIES
================================ */
router.get(
  '/activities',
  authMiddleware,
  getAlumniActivities
);

/* ===============================
   ALUMNI PROFILE
================================ */
router.post(
  '/profile',
  authMiddleware,
  roleMiddleware('ALUMNI'),
  upsertProfile
);

router.get(
  '/profile/me',
  authMiddleware,
  roleMiddleware('ALUMNI'),
  getMyProfile
);

/* ===============================
   ALUMNI DIRECTORY
================================ */
router.get(
  '/directory',
  authMiddleware,
  getAlumniDirectory
);

/* ===============================
   JOBS
================================ */
router.post(
  '/jobs',
  authMiddleware,
  roleMiddleware('ALUMNI'),
  validateJob,
  postJob
);

/* ===============================
   EVENTS
================================ */
router.post(
  '/events',
  authMiddleware,
  roleMiddleware('ALUMNI'),
  validateEvent,
  createEvent
);

/* ===============================
   DONATIONS
   Note: Donations are now handled via Payment Gateway
   Use: POST /api/payment/create-order
   Then: POST /api/payment/verify
================================ */

/* ===============================
   SUCCESS STORIES
================================ */
router.post(
  '/success-stories',
  authMiddleware,
  roleMiddleware('ALUMNI'),
  submitSuccessStory
);

/* ===============================
   FEEDBACK
================================ */
router.post(
  '/feedback',
  authMiddleware,
  submitFeedback
);

export default router;

import { Router } from 'express';
import {
  postJob,
  getJobs,
  applyForJob
} from '../controllers/job.controller.js';

import authMiddleware from '../middlewares/auth.middleware.js';
import roleMiddleware from '../middlewares/role.middleware.js';
import { validateJob } from '../validations/job.validation.js';

const router = Router();

/* ===============================
   POST JOB
================================ */
router.post(
  '/',
  authMiddleware,
  roleMiddleware('ALUMNI', 'ADMIN'),
  validateJob,
  postJob
);

/* ===============================
   GET ALL JOBS
================================ */
router.get(
  '/',
  authMiddleware,
  getJobs
);

/* ===============================
   APPLY FOR JOB
================================ */
router.post(
  '/:id/apply',
  authMiddleware,
  roleMiddleware('STUDENT', 'ALUMNI'),
  applyForJob
);

export default router;

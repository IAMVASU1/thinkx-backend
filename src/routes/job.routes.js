import { Router } from 'express';
import {
  postJob,
  getJobs,
  getJobById,
  getMyJobs,
  updateJob,
  deleteJob,
  applyForJob,
  getJobApplications
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
   GET MY JOBS
================================ */
router.get(
  '/my-jobs',
  authMiddleware,
  getMyJobs
);

/* ===============================
   GET JOB BY ID
================================ */
router.get(
  '/:id',
  authMiddleware,
  getJobById
);

/* ===============================
   UPDATE JOB
================================ */
router.put(
  '/:id',
  authMiddleware,
  roleMiddleware('ALUMNI', 'ADMIN'),
  updateJob
);

/* ===============================
   DELETE JOB
================================ */
router.delete(
  '/:id',
  authMiddleware,
  roleMiddleware('ALUMNI', 'ADMIN'),
  deleteJob
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

/* ===============================
   GET JOB APPLICATIONS
================================ */
router.get(
  '/:id/applications',
  authMiddleware,
  getJobApplications
);

export default router;

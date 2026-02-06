import { Router } from 'express';
import {
  submitSuccessStory,
  getApprovedStories
} from '../controllers/successStory.controller.js';

import authMiddleware from '../middlewares/auth.middleware.js';
import roleMiddleware from '../middlewares/role.middleware.js';

const router = Router();

/* ===============================
   SUBMIT SUCCESS STORY
================================ */
router.post(
  '/',
  authMiddleware,
  roleMiddleware('ALUMNI'),
  submitSuccessStory
);

/* ===============================
   GET APPROVED STORIES
================================ */
router.get(
  '/',
  authMiddleware,
  getApprovedStories
);

export default router;

import { Router } from 'express';
import {
  submitSuccessStory,
  getApprovedStories,
  getStoryById,
  updateStory,
  deleteStory,
  likeStory,
  addComment,
  getComments
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

/* ===============================
   GET STORY BY ID
================================ */
router.get(
  '/:id',
  authMiddleware,
  getStoryById
);

/* ===============================
   UPDATE STORY
================================ */
router.put(
  '/:id',
  authMiddleware,
  roleMiddleware('ALUMNI'),
  updateStory
);

/* ===============================
   DELETE STORY
================================ */
router.delete(
  '/:id',
  authMiddleware,
  roleMiddleware('ALUMNI'),
  deleteStory
);

/* ===============================
   LIKE STORY
================================ */
router.post(
  '/:id/like',
  authMiddleware,
  likeStory
);

/* ===============================
   ADD COMMENT
================================ */
router.post(
  '/:id/comments',
  authMiddleware,
  addComment
);

/* ===============================
   GET COMMENTS
================================ */
router.get(
  '/:id/comments',
  authMiddleware,
  getComments
);

export default router;

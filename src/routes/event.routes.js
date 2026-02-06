import { Router } from 'express';
import {
  createEvent,
  getEvents,
  registerForEvent
} from '../controllers/event.controller.js';

import authMiddleware from '../middlewares/auth.middleware.js';
import roleMiddleware from '../middlewares/role.middleware.js';
import { validateEvent } from '../validations/event.validation.js';

const router = Router();

/* ===============================
   CREATE EVENT
================================ */
router.post(
  '/',
  authMiddleware,
  roleMiddleware('ALUMNI', 'ADMIN'),
  validateEvent,
  createEvent
);

/* ===============================
   GET ALL EVENTS
================================ */
router.get(
  '/',
  authMiddleware,
  getEvents
);

/* ===============================
   REGISTER FOR EVENT
================================ */
router.post(
  '/:id/register',
  authMiddleware,
  registerForEvent
);

export default router;

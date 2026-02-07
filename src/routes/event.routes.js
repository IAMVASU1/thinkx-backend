import { Router } from 'express';
import {
  createEvent,
  getEvents,
  getEventById,
  updateEvent,
  deleteEvent,
  registerForEvent,
  unregisterFromEvent,
  getMyEvents,
  getEventAttendees
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
   GET MY EVENTS
================================ */
router.get(
  '/my-events',
  authMiddleware,
  getMyEvents
);

/* =======================================
   GET EVENT BY ID  (must come after /my-events)
================================ */
router.get(
  '/:id',
  authMiddleware,
  getEventById
);

/* ===============================
   UPDATE EVENT
================================ */
router.put(
  '/:id',
  authMiddleware,
  roleMiddleware('ALUMNI', 'ADMIN'),
  updateEvent
);

/* ===============================
   DELETE EVENT
================================ */
router.delete(
  '/:id',
  authMiddleware,
  roleMiddleware('ALUMNI', 'ADMIN'),
  deleteEvent
);

/* ===============================
   REGISTER FOR EVENT
================================ */
router.post(
  '/:id/register',
  authMiddleware,
  registerForEvent
);

/* ===============================
   UNREGISTER FROM EVENT
================================ */
router.post(
  '/:id/unregister',
  authMiddleware,
  unregisterFromEvent
);

/* ===============================
   GET EVENT ATTENDEES
================================ */
router.get(
  '/:id/attendees',
  authMiddleware,
  getEventAttendees
);

export default router;

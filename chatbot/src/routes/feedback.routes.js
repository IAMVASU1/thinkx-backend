import { Router } from 'express';
import { createFeedback, getFeedback, getFeedbackById, updateFeedback, deleteFeedback } from '../controllers/feedback.controller.js';

const router = Router();

router.post('/', createFeedback);
router.get('/', getFeedback);
router.get('/:id', getFeedbackById);
router.put('/:id', updateFeedback);
router.delete('/:id', deleteFeedback);

export default router;

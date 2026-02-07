import { Router } from 'express';
import {
  createSuccessStory,
  getSuccessStories,
  getSuccessStoryById,
  updateSuccessStory,
  deleteSuccessStory
} from '../controllers/successStories.controller.js';

const router = Router();

router.post('/', createSuccessStory);
router.get('/', getSuccessStories);
router.get('/:id', getSuccessStoryById);
router.put('/:id', updateSuccessStory);
router.delete('/:id', deleteSuccessStory);

export default router;

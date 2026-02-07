import { Router } from 'express';
import { chat } from '../controllers/chat.controller.js';
import { chatLimiter } from '../middleware/rateLimit.js';

const router = Router();

router.post('/', chatLimiter, chat);

export default router;

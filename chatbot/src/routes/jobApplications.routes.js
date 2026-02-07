import { Router } from 'express';
import {
  createJobApplication,
  getJobApplications,
  getJobApplicationById,
  updateJobApplication,
  deleteJobApplication
} from '../controllers/jobApplications.controller.js';

const router = Router();

router.post('/', createJobApplication);
router.get('/', getJobApplications);
router.get('/:id', getJobApplicationById);
router.put('/:id', updateJobApplication);
router.delete('/:id', deleteJobApplication);

export default router;

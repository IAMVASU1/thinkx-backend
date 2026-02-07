import { Router } from 'express';
import {
  createAlumniProfile,
  getAlumniProfiles,
  getAlumniProfileById,
  updateAlumniProfile,
  deleteAlumniProfile
} from '../controllers/alumniProfiles.controller.js';

const router = Router();

router.post('/', createAlumniProfile);
router.get('/', getAlumniProfiles);
router.get('/:id', getAlumniProfileById);
router.put('/:id', updateAlumniProfile);
router.delete('/:id', deleteAlumniProfile);

export default router;

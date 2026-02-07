import { Router } from 'express';
import { createDonation, getDonations, getDonationById, updateDonation, deleteDonation } from '../controllers/donations.controller.js';

const router = Router();

router.post('/', createDonation);
router.get('/', getDonations);
router.get('/:id', getDonationById);
router.put('/:id', updateDonation);
router.delete('/:id', deleteDonation);

export default router;

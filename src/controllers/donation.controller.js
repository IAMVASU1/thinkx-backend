import Donation from '../models/Donation.model.js';
import processPayment from '../services/payment.service.js';
 

/* ===============================
   CREATE DONATION
================================ */
export const createDonation = async (req, res) => {
  try {
    const { amount, purpose, paymentId } = req.body;

    if (!amount || !purpose) {
      return res.status(400).json({ message: 'Amount and purpose required' });
    }

    const donation = await Donation.create({
      donor: req.user.id,
      amount,
      purpose,
      paymentId,
      paymentStatus: 'SUCCESS'
    });

    res.status(201).json({
      success: true,
      donation
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

/* ===============================
   MY DONATIONS
================================ */
export const getMyDonations = async (req, res) => {
  try {
    const donations = await Donation.find({ donor: req.user.id });

    res.status(200).json({
      success: true,
      donations
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

/* ===============================
   ALL DONATIONS (ADMIN)
================================ */
export const getAllDonations = async (req, res) => {
  try {
    const donations = await Donation.find()
      .populate('donor', 'name email');

    res.status(200).json({
      success: true,
      count: donations.length,
      donations
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

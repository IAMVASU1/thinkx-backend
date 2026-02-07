import Donation from '../models/Donation.js';

export const createDonation = async (req, res, next) => {
  try {
    const donation = await Donation.create(req.body);
    res.status(201).json({ success: true, donation });
  } catch (error) {
    next(error);
  }
};

export const getDonations = async (req, res, next) => {
  try {
    const donations = await Donation.find().sort({ createdAt: -1 }).limit(100).lean();
    res.status(200).json({ success: true, count: donations.length, donations });
  } catch (error) {
    next(error);
  }
};

export const getDonationById = async (req, res, next) => {
  try {
    const donation = await Donation.findById(req.params.id).lean();
    if (!donation) {
      return res.status(404).json({ message: 'Donation not found' });
    }
    res.status(200).json({ success: true, donation });
  } catch (error) {
    next(error);
  }
};

export const updateDonation = async (req, res, next) => {
  try {
    const donation = await Donation.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true
    }).lean();
    if (!donation) {
      return res.status(404).json({ message: 'Donation not found' });
    }
    res.status(200).json({ success: true, donation });
  } catch (error) {
    next(error);
  }
};

export const deleteDonation = async (req, res, next) => {
  try {
    const donation = await Donation.findByIdAndDelete(req.params.id).lean();
    if (!donation) {
      return res.status(404).json({ message: 'Donation not found' });
    }
    res.status(200).json({ success: true, message: 'Donation deleted' });
  } catch (error) {
    next(error);
  }
};

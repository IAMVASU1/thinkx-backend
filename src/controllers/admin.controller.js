import User from '../models/User.model.js';
import SuccessStory from '../models/SuccessStory.model.js';
import Donation from '../models/Donation.model.js';

/* ===============================
   DASHBOARD STATS
================================ */
export const getDashboardStats = async (req, res) => {
  try {
    const users = await User.countDocuments();
    const alumni = await User.countDocuments({ role: 'ALUMNI' });
    const donations = await Donation.countDocuments();

    res.status(200).json({
      success: true,
      stats: {
        totalUsers: users,
        alumniCount: alumni,
        totalDonations: donations
      }
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

/* ===============================
   APPROVE SUCCESS STORY
================================ */
export const approveSuccessStory = async (req, res) => {
  try {
    const story = await SuccessStory.findByIdAndUpdate(
      req.params.id,
      { approved: true },
      { new: true }
    );

    if (!story) {
      return res.status(404).json({ message: 'Story not found' });
    }

    res.status(200).json({
      success: true,
      message: 'Story approved',
      story
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

/* ===============================
   GET ALL USERS
================================ */
export const getAllUsers = async (req, res) => {
  try {
    const users = await User.find().select('-password');

    res.status(200).json({
      success: true,
      count: users.length,
      users
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

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

/* ===============================
   ACTIVITY LOG
================================ */
export const getActivityLog = async (req, res) => {
  try {
    const limit = req.query.limit || 10;

    // Stub activity log - returns user creation/updates
    const users = await User.find()
      .select('name email createdAt')
      .limit(parseInt(limit))
      .sort({ createdAt: -1 });

    const activities = users.map(user => ({
      type: 'user_created',
      description: `User ${user.name} registered`,
      actor: user.name,
      timestamp: user.createdAt
    }));

    res.status(200).json({
      success: true,
      activities
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

/* ===============================
   GET REPORTS
================================ */
export const getReports = async (req, res) => {
  try {
    const totalUsers = await User.countDocuments();
    const alumni = await User.countDocuments({ role: 'ALUMNI' });
    const students = await User.countDocuments({ role: 'STUDENT' });
    const totalDonations = await Donation.countDocuments();
    const unapprovedStories = await SuccessStory.countDocuments({ approved: false });

    res.status(200).json({
      success: true,
      reports: {
        userStats: {
          total: totalUsers,
          alumni,
          students,
          admin: totalUsers - alumni - students
        },
        donations: totalDonations,
        pendingStories: unapprovedStories
      }
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

/* ===============================
   GET MODERATION QUEUE
================================ */
export const getModerationQueue = async (req, res) => {
  try {
    const status = req.query.status || 'pending';

    const stories = await SuccessStory.find({ approved: status === 'pending' ? false : true })
      .populate('alumni', 'name email')
      .limit(20);

    res.status(200).json({
      success: true,
      queue: stories.map(story => ({
        id: story._id,
        type: 'success_story',
        title: story.title,
        content: story.story.substring(0, 100) + '...',
        submittedBy: story.alumni?.name,
        status: story.approved ? 'approved' : 'pending',
        createdAt: story.createdAt
      }))
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

/* ===============================
   APPROVE MODERATION ITEM
================================ */
export const approveModerationItem = async (req, res) => {
  try {
    const story = await SuccessStory.findByIdAndUpdate(
      req.params.itemId,
      { approved: true },
      { new: true }
    );

    if (!story) {
      return res.status(404).json({ message: 'Item not found' });
    }

    res.status(200).json({
      success: true,
      message: 'Item approved',
      item: story
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

/* ===============================
   REJECT MODERATION ITEM
================================ */
export const rejectModerationItem = async (req, res) => {
  try {
    const story = await SuccessStory.findByIdAndDelete(req.params.itemId);

    if (!story) {
      return res.status(404).json({ message: 'Item not found' });
    }

    res.status(200).json({
      success: true,
      message: 'Item rejected and deleted'
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

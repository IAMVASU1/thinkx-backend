import AlumniProfile from '../models/AlumniProfile.model.js';
import User from '../models/User.model.js';
import Event from '../models/Event.model.js';

/* ===============================
   CREATE / UPDATE PROFILE
================================ */
export const upsertProfile = async (req, res) => {
  try {
    const profile = await AlumniProfile.findOneAndUpdate(
      { user: req.user.id },
      { ...req.body, user: req.user.id },
      { new: true, upsert: true }
    );

    res.status(200).json({
      success: true,
      profile
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

/* ===============================
   GET MY PROFILE
================================ */
export const getMyProfile = async (req, res) => {
  try {
    const profile = await AlumniProfile
      .findOne({ user: req.user.id })
      .populate('user', 'name email');

    if (!profile) {
      return res.status(404).json({ message: 'Profile not found' });
    }

    res.status(200).json({ success: true, profile });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

/* ===============================
   ALUMNI DIRECTORY
================================ */
export const getAlumniDirectory = async (req, res) => {
  try {
    const filters = req.query;

    const alumni = await AlumniProfile
      .find(filters)
      .populate('user', 'name email');

    res.status(200).json({
      success: true,
      count: alumni.length,
      alumni
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

/* ===============================
   ALUMNI STATS
================================ */
export const getAlumniStats = async (req, res) => {
  try {
    const totalAlumni = await User.countDocuments({ role: 'ALUMNI' });
    const mentors = await AlumniProfile.countDocuments({ isMentor: true });
    const totalProfiles = await AlumniProfile.countDocuments();

    res.status(200).json({
      success: true,
      stats: {
        totalAlumni,
        activeProfiles: totalProfiles,
        mentors
      }
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

/* ===============================
   ALUMNI ACTIVITIES
================================ */
export const getAlumniActivities = async (req, res) => {
  try {
    const limit = req.query.limit || 10;

    const events = await Event.find()
      .populate('createdBy', 'name')
      .limit(parseInt(limit))
      .sort({ createdAt: -1 });

    res.status(200).json({
      success: true,
      activities: events.map(event => ({
        type: 'event',
        title: event.title,
        actor: event.createdBy?.name || 'Unknown',
        date: event.createdAt,
        data: event
      }))
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

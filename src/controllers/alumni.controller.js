import AlumniProfile from '../models/AlumniProfile.model.js';

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

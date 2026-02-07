import AlumniProfile from '../models/AlumniProfile.js';

export const createAlumniProfile = async (req, res, next) => {
  try {
    const profile = await AlumniProfile.create(req.body);
    res.status(201).json({ success: true, profile });
  } catch (error) {
    next(error);
  }
};

export const getAlumniProfiles = async (req, res, next) => {
  try {
    const profiles = await AlumniProfile.find()
      .populate('user', 'name email role')
      .limit(100)
      .lean();
    res.status(200).json({ success: true, count: profiles.length, profiles });
  } catch (error) {
    next(error);
  }
};

export const getAlumniProfileById = async (req, res, next) => {
  try {
    const profile = await AlumniProfile.findById(req.params.id)
      .populate('user', 'name email role')
      .lean();
    if (!profile) {
      return res.status(404).json({ message: 'Alumni profile not found' });
    }
    res.status(200).json({ success: true, profile });
  } catch (error) {
    next(error);
  }
};

export const updateAlumniProfile = async (req, res, next) => {
  try {
    const profile = await AlumniProfile.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true
    })
      .populate('user', 'name email role')
      .lean();
    if (!profile) {
      return res.status(404).json({ message: 'Alumni profile not found' });
    }
    res.status(200).json({ success: true, profile });
  } catch (error) {
    next(error);
  }
};

export const deleteAlumniProfile = async (req, res, next) => {
  try {
    const profile = await AlumniProfile.findByIdAndDelete(req.params.id).lean();
    if (!profile) {
      return res.status(404).json({ message: 'Alumni profile not found' });
    }
    res.status(200).json({ success: true, message: 'Alumni profile deleted' });
  } catch (error) {
    next(error);
  }
};

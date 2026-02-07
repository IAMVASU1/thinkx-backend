import JobApplication from '../models/JobApplication.js';

export const createJobApplication = async (req, res, next) => {
  try {
    const application = await JobApplication.create(req.body);
    res.status(201).json({ success: true, application });
  } catch (error) {
    next(error);
  }
};

export const getJobApplications = async (req, res, next) => {
  try {
    const applications = await JobApplication.find()
      .sort({ createdAt: -1 })
      .limit(100)
      .lean();
    res.status(200).json({ success: true, count: applications.length, applications });
  } catch (error) {
    next(error);
  }
};

export const getJobApplicationById = async (req, res, next) => {
  try {
    const application = await JobApplication.findById(req.params.id).lean();
    if (!application) {
      return res.status(404).json({ message: 'Job application not found' });
    }
    res.status(200).json({ success: true, application });
  } catch (error) {
    next(error);
  }
};

export const updateJobApplication = async (req, res, next) => {
  try {
    const application = await JobApplication.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true
    }).lean();
    if (!application) {
      return res.status(404).json({ message: 'Job application not found' });
    }
    res.status(200).json({ success: true, application });
  } catch (error) {
    next(error);
  }
};

export const deleteJobApplication = async (req, res, next) => {
  try {
    const application = await JobApplication.findByIdAndDelete(req.params.id).lean();
    if (!application) {
      return res.status(404).json({ message: 'Job application not found' });
    }
    res.status(200).json({ success: true, message: 'Job application deleted' });
  } catch (error) {
    next(error);
  }
};

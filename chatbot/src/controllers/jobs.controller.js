import Job from '../models/Job.js';

export const createJob = async (req, res, next) => {
  try {
    const job = await Job.create(req.body);
    res.status(201).json({ success: true, job });
  } catch (error) {
    next(error);
  }
};

export const getJobs = async (req, res, next) => {
  try {
    const jobs = await Job.find().sort({ createdAt: -1 }).limit(50).lean();
    res.status(200).json({ success: true, count: jobs.length, jobs });
  } catch (error) {
    next(error);
  }
};

export const getJobById = async (req, res, next) => {
  try {
    const job = await Job.findById(req.params.id).lean();
    if (!job) {
      return res.status(404).json({ message: 'Job not found' });
    }
    res.status(200).json({ success: true, job });
  } catch (error) {
    next(error);
  }
};

export const updateJob = async (req, res, next) => {
  try {
    const job = await Job.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true
    }).lean();
    if (!job) {
      return res.status(404).json({ message: 'Job not found' });
    }
    res.status(200).json({ success: true, job });
  } catch (error) {
    next(error);
  }
};

export const deleteJob = async (req, res, next) => {
  try {
    const job = await Job.findByIdAndDelete(req.params.id).lean();
    if (!job) {
      return res.status(404).json({ message: 'Job not found' });
    }
    res.status(200).json({ success: true, message: 'Job deleted' });
  } catch (error) {
    next(error);
  }
};

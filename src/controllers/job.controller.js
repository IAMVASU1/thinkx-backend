import Job from '../models/Job.model.js';
import JobApplication from '../models/JobApplication.model.js';

/* ===============================
   POST JOB
================================ */
export const postJob = async (req, res) => {
  try {
    const { title, company, description, location, jobType } = req.body;

    if (!title || !company || !description) {
      return res.status(400).json({ message: 'Required fields missing' });
    }

    const job = await Job.create({
      title,
      company,
      description,
      location,
      jobType,
      postedBy: req.user.id
    });

    res.status(201).json({
      success: true,
      job
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

/* ===============================
   GET JOBS
================================ */
export const getJobs = async (req, res) => {
  try {
    const jobs = await Job.find({ isActive: true })
      .populate('postedBy', 'name email');

    res.status(200).json({
      success: true,
      jobs
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

/* ===============================
   APPLY FOR JOB
================================ */
export const applyForJob = async (req, res) => {
  try {
    const { resumeUrl } = req.body;

    if (!resumeUrl) {
      return res.status(400).json({ message: 'Resume URL required' });
    }

    const application = await JobApplication.create({
      job: req.params.id,
      applicant: req.user.id,
      resumeUrl
    });

    res.status(201).json({
      success: true,
      application
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

/* ===============================
   GET JOB BY ID
================================ */
export const getJobById = async (req, res) => {
  try {
    const job = await Job.findById(req.params.id).populate('postedBy', 'name email');

    if (!job) {
      return res.status(404).json({ message: 'Job not found' });
    }

    res.status(200).json({
      success: true,
      job
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

/* ===============================
   GET MY JOBS
================================ */
export const getMyJobs = async (req, res) => {
  try {
    const jobs = await Job.find({ postedBy: req.user.id });

    res.status(200).json({
      success: true,
      jobs
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

/* ===============================
   UPDATE JOB
================================ */
export const updateJob = async (req, res) => {
  try {
    const job = await Job.findById(req.params.id);

    if (!job) {
      return res.status(404).json({ message: 'Job not found' });
    }

    if (job.postedBy.toString() !== req.user.id) {
      return res.status(403).json({ message: 'Unauthorized to update this job' });
    }

    const updated = await Job.findByIdAndUpdate(req.params.id, req.body, { new: true });

    res.status(200).json({
      success: true,
      job: updated
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

/* ===============================
   DELETE JOB
================================ */
export const deleteJob = async (req, res) => {
  try {
    const job = await Job.findById(req.params.id);

    if (!job) {
      return res.status(404).json({ message: 'Job not found' });
    }

    if (job.postedBy.toString() !== req.user.id) {
      return res.status(403).json({ message: 'Unauthorized to delete this job' });
    }

    await Job.findByIdAndDelete(req.params.id);

    res.status(200).json({
      success: true,
      message: 'Job deleted successfully'
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

/* ===============================
   GET JOB APPLICATIONS
================================ */
export const getJobApplications = async (req, res) => {
  try {
    const job = await Job.findById(req.params.id);

    if (!job) {
      return res.status(404).json({ message: 'Job not found' });
    }

    if (job.postedBy.toString() !== req.user.id) {
      return res.status(403).json({ message: 'Unauthorized' });
    }

    const applications = await JobApplication.find({ job: req.params.id })
      .populate('applicant', 'name email');

    res.status(200).json({
      success: true,
      applications,
      count: applications.length
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

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

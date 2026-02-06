import mongoose from 'mongoose';

const jobApplicationSchema = new mongoose.Schema(
  {
    job: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Job',
      required: true
    },

    applicant: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true
    },

    resumeUrl: {
      type: String,
      required: true
    },

    status: {
      type: String,
      enum: ['APPLIED', 'SHORTLISTED', 'REJECTED', 'HIRED'],
      default: 'APPLIED'
    }
  },
  { timestamps: true }
);

export default mongoose.model('JobApplication', jobApplicationSchema);

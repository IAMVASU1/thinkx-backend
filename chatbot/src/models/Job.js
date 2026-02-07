import mongoose from 'mongoose';

const jobSchema = new mongoose.Schema(
  {
    title: { type: String, required: true },
    company: { type: String, required: true },
    description: { type: String, required: true },
    location: { type: String },
    jobType: { type: String, enum: ['FULL_TIME', 'PART_TIME', 'INTERNSHIP'], default: 'FULL_TIME' },
    postedBy: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    isActive: { type: Boolean, default: true }
  },
  { timestamps: true }
);

export default mongoose.model('Job', jobSchema);

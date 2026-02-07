import mongoose from 'mongoose';

const alumniProfileSchema = new mongoose.Schema(
  {
    user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    graduationYear: { type: Number, required: true },
    degree: { type: String, required: true },
    department: { type: String, required: true },
    currentCompany: { type: String },
    designation: { type: String },
    location: { type: String },
    bio: { type: String },
    skills: [{ type: String }],
    linkedinUrl: { type: String },
    isMentor: { type: Boolean, default: false }
  },
  { timestamps: true }
);

export default mongoose.model('AlumniProfile', alumniProfileSchema);

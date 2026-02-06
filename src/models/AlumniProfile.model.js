import mongoose from 'mongoose';

const alumniProfileSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true
    },

    graduationYear: {
      type: Number,
      required: true
    },

    degree: {
      type: String,
      required: true
    },

    department: {
      type: String,
      required: true
    },

    currentCompany: String,
    designation: String,

    location: String,

    bio: String,

    skills: [String],

    linkedinUrl: String,

    isMentor: {
      type: Boolean,
      default: false
    }
  },
  { timestamps: true }
);

export default mongoose.model('AlumniProfile', alumniProfileSchema);

import mongoose from 'mongoose';

const successStorySchema = new mongoose.Schema(
  {
    alumni: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true
    },

    title: {
      type: String,
      required: true
    },

    story: {
      type: String,
      required: true
    },

    image: {
      url: {
        type: String,
        default: null
      },
      path: {
        type: String,
        default: null
      }
    },

    approved: {
      type: Boolean,
      default: false
    }
  },
  { timestamps: true }
);

export default mongoose.model('SuccessStory', successStorySchema);

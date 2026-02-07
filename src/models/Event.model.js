import mongoose from 'mongoose';

const eventSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true
    },

    description: String,

    date: {
      type: Date,
      required: true
    },

    location: String,

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

    createdBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true
    },

    attendees: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
      }
    ]
  },
  { timestamps: true }
);

export default mongoose.model('Event', eventSchema);

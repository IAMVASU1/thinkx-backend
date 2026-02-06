import mongoose from 'mongoose';

const donationSchema = new mongoose.Schema(
  {
    donor: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true
    },

    amount: {
      type: Number,
      required: true
    },

    purpose: {
      type: String,
      required: true
    },

    paymentId: String,

    paymentStatus: {
      type: String,
      enum: ['PENDING', 'SUCCESS', 'FAILED'],
      default: 'SUCCESS'
    }
  },
  { timestamps: true }
);

export default mongoose.model('Donation', donationSchema);

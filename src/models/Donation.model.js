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

    // Razorpay Payment Details
    razorpayOrderId: {
      type: String,
      required: true
    },

    razorpayPaymentId: {
      type: String
    },

    razorpaySignature: {
      type: String
    },

    paymentStatus: {
      type: String,
      enum: ['PENDING', 'SUCCESS', 'FAILED'],
      default: 'PENDING'
    },

    // Legacy field for backward compatibility
    paymentId: String
  },
  { timestamps: true }
);

export default mongoose.model('Donation', donationSchema);

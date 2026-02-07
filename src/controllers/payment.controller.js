import crypto from 'crypto';
import razorpayInstance from '../config/razorpay.js';
import Donation from '../models/Donation.model.js';

/* ===============================
   CREATE RAZORPAY ORDER
================================ */
export const createOrder = async (req, res) => {
  try {
    const { amount, purpose } = req.body;

    // Validate inputs
    if (!amount || !purpose) {
      return res.status(400).json({
        success: false,
        message: 'Amount and purpose are required'
      });
    }

    if (amount < 1) {
      return res.status(400).json({
        success: false,
        message: 'Amount must be at least ₹1'
      });
    }

    // Create Razorpay order
    const options = {
      amount: amount * 100, // Convert to paise (₹1 = 100 paise)
      currency: 'INR',
      receipt: `receipt_${Date.now()}`,
      notes: {
        purpose: purpose,
        userId: req.user.id
      }
    };

    console.log('Creating Razorpay order with options:', options);
    const order = await razorpayInstance.orders.create(options);
    console.log('✓ Order created successfully:', order.id);

    // Create pending donation record
    const donation = await Donation.create({
      donor: req.user.id,
      amount,
      purpose,
      razorpayOrderId: order.id,
      paymentStatus: 'PENDING'
    });

    res.status(200).json({
      success: true,
      data: {
        orderId: order.id,
        amount: order.amount,
        currency: order.currency,
        donationId: donation._id
      },
      message: 'Order created successfully'
    });
  } catch (error) {
    console.error('Create order error:', error);
    
    // Check if it's a Razorpay authentication error
    if (error.statusCode === 401) {
      return res.status(500).json({
        success: false,
        message: '❌ Razorpay Authentication Failed',
        error: 'Invalid Razorpay credentials. Please check your RAZORPAY_KEY_ID and RAZORPAY_KEY_SECRET in .env file',
        details: error.error?.description || 'Authentication failed'
      });
    }
    
    res.status(500).json({
      success: false,
      message: 'Failed to create order',
      error: error.message || 'Unknown error occurred',
      details: error.error?.description
    });
  }
};

/* ===============================
   VERIFY PAYMENT
================================ */
export const verifyPayment = async (req, res) => {
  try {
    const {
      razorpay_order_id,
      razorpay_payment_id,
      razorpay_signature,
      donationId
    } = req.body;

    // Validate inputs
    if (!razorpay_order_id || !razorpay_payment_id || !razorpay_signature || !donationId) {
      return res.status(400).json({
        success: false,
        message: 'Missing payment verification details'
      });
    }

    // Verify signature
    const generatedSignature = crypto
      .createHmac('sha256', process.env.RAZORPAY_KEY_SECRET)
      .update(`${razorpay_order_id}|${razorpay_payment_id}`)
      .digest('hex');

    if (generatedSignature !== razorpay_signature) {
      // Update donation as failed
      await Donation.findByIdAndUpdate(donationId, {
        paymentStatus: 'FAILED'
      });

      return res.status(400).json({
        success: false,
        message: 'Payment verification failed - Invalid signature'
      });
    }

    // Signature is valid - update donation record
    const donation = await Donation.findByIdAndUpdate(
      donationId,
      {
        razorpayPaymentId: razorpay_payment_id,
        razorpaySignature: razorpay_signature,
        paymentId: razorpay_payment_id, // For backward compatibility
        paymentStatus: 'SUCCESS'
      },
      { new: true }
    ).populate('donor', 'name email');

    if (!donation) {
      return res.status(404).json({
        success: false,
        message: 'Donation record not found'
      });
    }

    res.status(200).json({
      success: true,
      message: 'Payment verified successfully',
      donation
    });
  } catch (error) {
    console.error('Verify payment error:', error);
    res.status(500).json({
      success: false,
      message: 'Payment verification failed',
      error: error.message
    });
  }
};

/* ===============================
   GET RAZORPAY KEY
================================ */
export const getRazorpayKey = async (req, res) => {
  try {
    res.status(200).json({
      success: true,
      key: process.env.RAZORPAY_KEY_ID
    });
  } catch (error) {
    console.error('Get key error:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to get Razorpay key'
    });
  }
};

/* ===============================
   GET PAYMENT DETAILS
================================ */
export const getPaymentDetails = async (req, res) => {
  try {
    const { paymentId } = req.params;

    if (!paymentId) {
      return res.status(400).json({
        success: false,
        message: 'Payment ID is required'
      });
    }

    // Fetch payment details from Razorpay
    const payment = await razorpayInstance.payments.fetch(paymentId);

    res.status(200).json({
      success: true,
      payment: {
        id: payment.id,
        amount: payment.amount / 100, // Convert paise to rupees
        currency: payment.currency,
        status: payment.status,
        method: payment.method,
        email: payment.email,
        contact: payment.contact,
        createdAt: new Date(payment.created_at * 1000)
      }
    });
  } catch (error) {
    console.error('Get payment details error:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to fetch payment details',
      error: error.message
    });
  }
};

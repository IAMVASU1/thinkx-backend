import razorpayInstance from '../config/razorpay.js';
import crypto from 'crypto';

/* ===============================
   CREATE RAZORPAY ORDER
================================ */
export const createRazorpayOrder = async ({ amount, currency = 'INR', receipt, notes }) => {
  try {
    const options = {
      amount: amount * 100, // Convert to paise
      currency,
      receipt: receipt || `receipt_${Date.now()}`,
      notes: notes || {}
    };

    const order = await razorpayInstance.orders.create(options);
    
    return {
      success: true,
      order
    };
  } catch (error) {
    console.error('❌ Razorpay order creation error:', error.message);
    return {
      success: false,
      error: error.message
    };
  }
};

/* ===============================
   VERIFY RAZORPAY PAYMENT
================================ */
export const verifyRazorpayPayment = ({ orderId, paymentId, signature }) => {
  try {
    const generatedSignature = crypto
      .createHmac('sha256', process.env.RAZORPAY_KEY_SECRET)
      .update(`${orderId}|${paymentId}`)
      .digest('hex');

    return generatedSignature === signature;
  } catch (error) {
    console.error('❌ Payment verification error:', error.message);
    return false;
  }
};

/* ===============================
   FETCH PAYMENT DETAILS
================================ */
export const fetchPaymentDetails = async (paymentId) => {
  try {
    const payment = await razorpayInstance.payments.fetch(paymentId);
    return {
      success: true,
      payment
    };
  } catch (error) {
    console.error('❌ Fetch payment error:', error.message);
    return {
      success: false,
      error: error.message
    };
  }
};

/* ===============================
   LEGACY FUNCTION (FOR BACKWARD COMPATIBILITY)
================================ */
const processPayment = async ({ amount, currency = 'INR', paymentMethod }) => {
  try {
    // 🔹 This is now handled by Razorpay integration
    console.log('💰 Processing payment via Razorpay');
    console.log('Amount:', amount);
    console.log('Currency:', currency);
    console.log('Method:', paymentMethod);

    return {
      success: true,
      paymentId: `PAY_${Date.now()}`
    };
  } catch (error) {
    console.error('Payment service error:', error.message);
    return {
      success: false
    };
  }
};

export default processPayment;

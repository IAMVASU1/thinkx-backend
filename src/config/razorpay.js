import Razorpay from 'razorpay';
import dotenv from 'dotenv';

dotenv.config();

/* ===============================
   RAZORPAY INSTANCE
================================ */

// Validate Razorpay credentials
const keyId = process.env.RAZORPAY_KEY_ID?.trim();
const keySecret = process.env.RAZORPAY_KEY_SECRET?.trim();

if (!keyId || !keySecret) {
  console.error('❌ ERROR: Razorpay credentials missing in .env file');
  console.error('Please add RAZORPAY_KEY_ID and RAZORPAY_KEY_SECRET to your .env file');
  process.exit(1);
}

console.log('✓ Razorpay Key ID:', keyId);
console.log('✓ Razorpay Key Secret:', keySecret ? '***' + keySecret.slice(-4) : 'MISSING');

const razorpayInstance = new Razorpay({
  key_id: keyId,
  key_secret: keySecret
});

export default razorpayInstance;

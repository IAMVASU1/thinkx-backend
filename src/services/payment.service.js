const processPayment = async ({ amount, currency = 'INR', paymentMethod }) => {
  try {
    // 🔹 Real payment gateway integration goes here
    console.log('💰 Processing payment');
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

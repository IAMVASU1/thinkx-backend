export const validateDonation = (req, res, next) => {
  const { amount, purpose } = req.body;

  if (!amount || amount <= 0) {
    return res.status(400).json({
      message: 'Valid donation amount is required'
    });
  }

  if (!purpose) {
    return res.status(400).json({
      message: 'Donation purpose is required'
    });
  }

  next();
};
 
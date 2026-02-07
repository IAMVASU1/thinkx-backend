import Donation from '../models/Donation.model.js';

/* ===============================
   NOTE: Donation creation is now handled via 
   Payment Controller (create-order + verify flow)
================================ */

/* ===============================
   MY DONATIONS
================================ */
export const getMyDonations = async (req, res) => {
  try {
    // Only show successful donations
    const donations = await Donation.find({ 
      donor: req.user.id,
      paymentStatus: 'SUCCESS'
    }).sort({ createdAt: -1 });

    const totalDonated = donations.reduce((sum, donation) => sum + donation.amount, 0);

    res.status(200).json({
      success: true,
      count: donations.length,
      totalDonated,
      donations
    });
  } catch (error) {
    res.status(500).json({ 
      success: false,
      message: error.message 
    });
  }
};

/* ===============================
   ALL DONATIONS (ADMIN)
================================ */
export const getAllDonations = async (req, res) => {
  try {
    const { status } = req.query;
    
    // Filter by status if provided, otherwise show only successful
    const filter = status ? { paymentStatus: status.toUpperCase() } : { paymentStatus: 'SUCCESS' };
    
    const donations = await Donation.find(filter)
      .populate('donor', 'name email')
      .sort({ createdAt: -1 });

    const totalAmount = donations.reduce((sum, donation) => sum + donation.amount, 0);

    res.status(200).json({
      success: true,
      count: donations.length,
      totalAmount,
      donations
    });
  } catch (error) {
    res.status(500).json({ 
      success: false,
      message: error.message 
    });
  }
};

/* ===============================
   DONATION STATS
================================ */
export const getDonationStats = async (req, res) => {
  try {
    // Only count successful donations
    const totalDonations = await Donation.countDocuments({ paymentStatus: 'SUCCESS' });
    const totalAmount = await Donation.aggregate([
      { $match: { paymentStatus: 'SUCCESS' } },
      { $group: { _id: null, total: { $sum: '$amount' } } }
    ]);

    // Get donations by status
    const statusBreakdown = await Donation.aggregate([
      { $group: { _id: '$paymentStatus', count: { $sum: 1 }, total: { $sum: '$amount' } } }
    ]);

    res.status(200).json({
      success: true,
      stats: {
        totalDonations,
        totalAmount: totalAmount[0]?.total || 0,
        statusBreakdown
      }
    });
  } catch (error) {
    res.status(500).json({ 
      success: false,
      message: error.message 
    });
  }
};

/* ===============================
   GET DONATIONS BY INITIATIVE
================================ */
export const getDonationsByInitiative = async (req, res) => {
  try {
    const { initiative } = req.params;
    const donations = await Donation.find({ purpose: initiative })
      .populate('donor', 'name email');

    res.status(200).json({
      success: true,
      count: donations.length,
      donations
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

import Feedback from '../models/Feedback.model.js';

/* ===============================
   SUBMIT FEEDBACK
================================ */
export const submitFeedback = async (req, res) => {
  try {
    const { message, rating } = req.body;

    if (!message) {
      return res.status(400).json({ message: 'Message is required' });
    }

    const feedback = await Feedback.create({
      user: req.user.id,
      message,
      rating
    });

    res.status(201).json({
      success: true,
      feedback
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

/* ===============================
   GET ALL FEEDBACK (ADMIN)
================================ */
export const getAllFeedback = async (req, res) => {
  try {
    const feedback = await Feedback.find()
      .populate('user', 'name email');

    res.status(200).json({
      success: true,
      count: feedback.length,
      feedback
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

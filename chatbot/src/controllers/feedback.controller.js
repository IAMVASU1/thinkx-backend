import Feedback from '../models/Feedback.js';

export const createFeedback = async (req, res, next) => {
  try {
    const feedback = await Feedback.create(req.body);
    res.status(201).json({ success: true, feedback });
  } catch (error) {
    next(error);
  }
};

export const getFeedback = async (req, res, next) => {
  try {
    const feedback = await Feedback.find().sort({ createdAt: -1 }).limit(100).lean();
    res.status(200).json({ success: true, count: feedback.length, feedback });
  } catch (error) {
    next(error);
  }
};

export const getFeedbackById = async (req, res, next) => {
  try {
    const feedbackItem = await Feedback.findById(req.params.id).lean();
    if (!feedbackItem) {
      return res.status(404).json({ message: 'Feedback not found' });
    }
    res.status(200).json({ success: true, feedback: feedbackItem });
  } catch (error) {
    next(error);
  }
};

export const updateFeedback = async (req, res, next) => {
  try {
    const feedbackItem = await Feedback.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true
    }).lean();
    if (!feedbackItem) {
      return res.status(404).json({ message: 'Feedback not found' });
    }
    res.status(200).json({ success: true, feedback: feedbackItem });
  } catch (error) {
    next(error);
  }
};

export const deleteFeedback = async (req, res, next) => {
  try {
    const feedbackItem = await Feedback.findByIdAndDelete(req.params.id).lean();
    if (!feedbackItem) {
      return res.status(404).json({ message: 'Feedback not found' });
    }
    res.status(200).json({ success: true, message: 'Feedback deleted' });
  } catch (error) {
    next(error);
  }
};

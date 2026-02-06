import SuccessStory from '../models/SuccessStory.model.js';

/* ===============================
   SUBMIT SUCCESS STORY
================================ */
export const submitSuccessStory = async (req, res) => {
  try {
    const { title, story } = req.body;

    if (!title || !story) {
      return res.status(400).json({ message: 'Title and story required' });
    }

    const successStory = await SuccessStory.create({
      alumni: req.user.id,
      title,
      story
    });

    res.status(201).json({
      success: true,
      successStory
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

/* ===============================
   GET APPROVED STORIES
================================ */
export const getApprovedStories = async (req, res) => {
  try {
    const stories = await SuccessStory.find({ approved: true })
      .populate('alumni', 'name email');

    res.status(200).json({
      success: true,
      stories
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

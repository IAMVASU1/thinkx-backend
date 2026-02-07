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

/* ===============================
   GET STORY BY ID
================================ */
export const getStoryById = async (req, res) => {
  try {
    const story = await SuccessStory.findById(req.params.id)
      .populate('alumni', 'name email');

    if (!story) {
      return res.status(404).json({ message: 'Story not found' });
    }

    res.status(200).json({
      success: true,
      story
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

/* ===============================
   UPDATE STORY
================================ */
export const updateStory = async (req, res) => {
  try {
    const story = await SuccessStory.findById(req.params.id);

    if (!story) {
      return res.status(404).json({ message: 'Story not found' });
    }

    if (story.alumni.toString() !== req.user.id) {
      return res.status(403).json({ message: 'Unauthorized to update this story' });
    }

    const updated = await SuccessStory.findByIdAndUpdate(req.params.id, req.body, { new: true });

    res.status(200).json({
      success: true,
      story: updated
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

/* ===============================
   DELETE STORY
================================ */
export const deleteStory = async (req, res) => {
  try {
    const story = await SuccessStory.findById(req.params.id);

    if (!story) {
      return res.status(404).json({ message: 'Story not found' });
    }

    if (story.alumni.toString() !== req.user.id) {
      return res.status(403).json({ message: 'Unauthorized to delete this story' });
    }

    await SuccessStory.findByIdAndDelete(req.params.id);

    res.status(200).json({
      success: true,
      message: 'Story deleted successfully'
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

/* ===============================
   LIKE STORY (Stub)
================================ */
export const likeStory = async (req, res) => {
  try {
    const story = await SuccessStory.findById(req.params.id);

    if (!story) {
      return res.status(404).json({ message: 'Story not found' });
    }

    res.status(200).json({
      success: true,
      message: 'Story liked'
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

/* ===============================
   ADD COMMENT (Stub)
================================ */
export const addComment = async (req, res) => {
  try {
    const { text } = req.body;

    if (!text) {
      return res.status(400).json({ message: 'Comment text required' });
    }

    const story = await SuccessStory.findById(req.params.id);

    if (!story) {
      return res.status(404).json({ message: 'Story not found' });
    }

    res.status(201).json({
      success: true,
      message: 'Comment added'
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

/* ===============================
   GET COMMENTS (Stub)
================================ */
export const getComments = async (req, res) => {
  try {
    const story = await SuccessStory.findById(req.params.id);

    if (!story) {
      return res.status(404).json({ message: 'Story not found' });
    }

    res.status(200).json({
      success: true,
      comments: []
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

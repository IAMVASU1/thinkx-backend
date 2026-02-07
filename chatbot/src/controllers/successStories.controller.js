import SuccessStory from '../models/SuccessStory.js';

export const createSuccessStory = async (req, res, next) => {
  try {
    const story = await SuccessStory.create(req.body);
    res.status(201).json({ success: true, story });
  } catch (error) {
    next(error);
  }
};

export const getSuccessStories = async (req, res, next) => {
  try {
    const stories = await SuccessStory.find().sort({ createdAt: -1 }).limit(100).lean();
    res.status(200).json({ success: true, count: stories.length, stories });
  } catch (error) {
    next(error);
  }
};

export const getSuccessStoryById = async (req, res, next) => {
  try {
    const story = await SuccessStory.findById(req.params.id).lean();
    if (!story) {
      return res.status(404).json({ message: 'Success story not found' });
    }
    res.status(200).json({ success: true, story });
  } catch (error) {
    next(error);
  }
};

export const updateSuccessStory = async (req, res, next) => {
  try {
    const story = await SuccessStory.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true
    }).lean();
    if (!story) {
      return res.status(404).json({ message: 'Success story not found' });
    }
    res.status(200).json({ success: true, story });
  } catch (error) {
    next(error);
  }
};

export const deleteSuccessStory = async (req, res, next) => {
  try {
    const story = await SuccessStory.findByIdAndDelete(req.params.id).lean();
    if (!story) {
      return res.status(404).json({ message: 'Success story not found' });
    }
    res.status(200).json({ success: true, message: 'Success story deleted' });
  } catch (error) {
    next(error);
  }
};

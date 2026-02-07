import SuccessStory from '../models/SuccessStory.model.js';
import { uploadImage, deleteImage } from '../services/upload.service.js';

/* ===============================
   SUBMIT SUCCESS STORY
================================ */
export const submitSuccessStory = async (req, res) => {
  try {
    const { title, story } = req.body;

    if (!title || !story) {
      return res.status(400).json({ message: 'Title and story required' });
    }

    const storyData = {
      alumni: req.user.id,
      title,
      story
    };

    // Handle image upload if file is provided
    if (req.file) {
      try {
        const uploadResult = await uploadImage(req.file, 'success-stories');
        storyData.image = {
          url: uploadResult.url,
          path: uploadResult.path
        };
      } catch (uploadError) {
        return res.status(400).json({ 
          success: false,
          message: `Image upload failed: ${uploadError.message}` 
        });
      }
    }

    const successStory = await SuccessStory.create(storyData);

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
    const stories = await SuccessStory.find()
      .populate('alumni', 'name email')
      .sort({ createdAt: -1 });

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

    const updateData = { ...req.body };

    // Handle image upload if new file is provided
    if (req.file) {
      try {
        // Delete old image if exists
        if (story.image && story.image.path) {
          await deleteImage(story.image.path);
        }

        // Upload new image
        const uploadResult = await uploadImage(req.file, 'success-stories');
        updateData.image = {
          url: uploadResult.url,
          path: uploadResult.path
        };
      } catch (uploadError) {
        return res.status(400).json({ 
          success: false,
          message: `Image upload failed: ${uploadError.message}` 
        });
      }
    }

    const updated = await SuccessStory.findByIdAndUpdate(req.params.id, updateData, { new: true });

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

    // Delete image from storage if exists
    if (story.image && story.image.path) {
      try {
        await deleteImage(story.image.path);
      } catch (error) {
        console.error('Error deleting image:', error);
        // Continue with story deletion even if image deletion fails
      }
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
   ADMIN DELETE STORY
================================ */
export const adminDeleteStory = async (req, res) => {
  try {
    const story = await SuccessStory.findById(req.params.id);
    if (!story) {
      return res.status(404).json({ message: 'Story not found' });
    }
    if (story.image && story.image.path) {
      try {
        await deleteImage(story.image.path);
      } catch (error) {
        console.error('Error deleting image:', error);
      }
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

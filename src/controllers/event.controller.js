import Event from '../models/Event.model.js';
import sendNotification from '../services/notification.service.js';
import { uploadImage, deleteImage } from '../services/upload.service.js';


/* ===============================
   CREATE EVENT
================================ */
export const createEvent = async (req, res) => {
  try {
    const { title, description, date, location } = req.body;

    if (!title || !date) {
      return res.status(400).json({ message: 'Title and date required' });
    }

    const eventData = {
      title,
      description,
      date,
      location,
      createdBy: req.user.id
    };

    // Handle image upload if file is provided
    if (req.file) {
      try {
        const uploadResult = await uploadImage(req.file, 'events');
        eventData.image = {
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

    const event = await Event.create(eventData);

    res.status(201).json({
      success: true,
      event
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

/* ===============================
   GET ALL EVENTS
================================ */
export const getEvents = async (req, res) => {
  try {
    console.log("fetching");
    
    const events = await Event.find()
      .populate('createdBy', 'name email');

    console.log(events);
    
    res.status(200).json({
      success: true,
      events
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

/* ===============================
   REGISTER FOR EVENT
================================ */
export const registerForEvent = async (req, res) => {
  try {
    const event = await Event.findById(req.params.id);

    if (!event) {
      return res.status(404).json({ message: 'Event not found' });
    }

    if (event.attendees.includes(req.user.id)) {
      return res.status(400).json({ message: 'Already registered' });
    }

    event.attendees.push(req.user.id);
    await event.save();

    res.status(200).json({
      success: true,
      message: 'Registered successfully'
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

/* ===============================
   GET EVENT BY ID
================================ */
export const getEventById = async (req, res) => {
  try {
    const event = await Event.findById(req.params.id)
      .populate('createdBy', 'name email')
      .populate('attendees', 'name email');

    if (!event) {
      return res.status(404).json({ message: 'Event not found' });
    }

    res.status(200).json({
      success: true,
      event
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

/* ===============================
   UPDATE EVENT
================================ */
export const updateEvent = async (req, res) => {
  try {
    const event = await Event.findById(req.params.id);

    if (!event) {
      return res.status(404).json({ message: 'Event not found' });
    }

    if (event.createdBy.toString() !== req.user.id) {
      return res.status(403).json({ message: 'Unauthorized to update this event' });
    }

    const updateData = { ...req.body };

    // Handle image upload if new file is provided
    if (req.file) {
      try {
        // Delete old image if exists
        if (event.image && event.image.path) {
          await deleteImage(event.image.path);
        }

        // Upload new image
        const uploadResult = await uploadImage(req.file, 'events');
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

    const updated = await Event.findByIdAndUpdate(req.params.id, updateData, { new: true });

    res.status(200).json({
      success: true,
      event: updated
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

/* ===============================
   DELETE EVENT
================================ */
export const deleteEvent = async (req, res) => {
  try {
    const event = await Event.findById(req.params.id);

    if (!event) {
      return res.status(404).json({ message: 'Event not found' });
    }

    if (event.createdBy.toString() !== req.user.id) {
      return res.status(403).json({ message: 'Unauthorized to delete this event' });
    }

    // Delete image from storage if exists
    if (event.image && event.image.path) {
      try {
        await deleteImage(event.image.path);
      } catch (error) {
        console.error('Error deleting image:', error);
        // Continue with event deletion even if image deletion fails
      }
    }

    await Event.findByIdAndDelete(req.params.id);

    res.status(200).json({
      success: true,
      message: 'Event deleted successfully'
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

/* ===============================
   UNREGISTER FROM EVENT
================================ */
export const unregisterFromEvent = async (req, res) => {
  try {
    const event = await Event.findById(req.params.id);

    if (!event) {
      return res.status(404).json({ message: 'Event not found' });
    }

    if (!event.attendees.includes(req.user.id)) {
      return res.status(400).json({ message: 'Not registered for this event' });
    }

    event.attendees = event.attendees.filter(id => id.toString() !== req.user.id);
    await event.save();

    res.status(200).json({
      success: true,
      message: 'Unregistered successfully'
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

/* ===============================
   GET MY EVENTS
================================ */
export const getMyEvents = async (req, res) => {
  try {
    const events = await Event.find({ createdBy: req.user.id })
      .populate('attendees', 'name email');

    res.status(200).json({
      success: true,
      events
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

/* ===============================
   GET EVENT ATTENDEES
================================ */
export const getEventAttendees = async (req, res) => {
  try {
    const event = await Event.findById(req.params.id).populate('attendees', 'name email');

    if (!event) {
      return res.status(404).json({ message: 'Event not found' });
    }

    res.status(200).json({
      success: true,
      attendees: event.attendees,
      count: event.attendees.length
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

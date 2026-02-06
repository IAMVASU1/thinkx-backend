import Event from '../models/Event.model.js';
import sendNotification from '../services/notification.service.js';


/* ===============================
   CREATE EVENT
================================ */
export const createEvent = async (req, res) => {
  try {
    const { title, description, date, location } = req.body;

    if (!title || !date) {
      return res.status(400).json({ message: 'Title and date required' });
    }

    const event = await Event.create({
      title,
      description,
      date,
      location,
      createdBy: req.user.id
    });

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
    const events = await Event.find()
      .populate('createdBy', 'name email');

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

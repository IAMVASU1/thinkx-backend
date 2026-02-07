import Event from '../models/Event.js';

export const createEvent = async (req, res, next) => {
  try {
    const event = await Event.create(req.body);
    res.status(201).json({ success: true, event });
  } catch (error) {
    next(error);
  }
};

export const getEvents = async (req, res, next) => {
  try {
    const events = await Event.find().sort({ date: 1 }).limit(100).lean();
    res.status(200).json({ success: true, count: events.length, events });
  } catch (error) {
    next(error);
  }
};

export const getEventById = async (req, res, next) => {
  try {
    const event = await Event.findById(req.params.id).lean();
    if (!event) {
      return res.status(404).json({ message: 'Event not found' });
    }
    res.status(200).json({ success: true, event });
  } catch (error) {
    next(error);
  }
};

export const updateEvent = async (req, res, next) => {
  try {
    const event = await Event.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true
    }).lean();
    if (!event) {
      return res.status(404).json({ message: 'Event not found' });
    }
    res.status(200).json({ success: true, event });
  } catch (error) {
    next(error);
  }
};

export const deleteEvent = async (req, res, next) => {
  try {
    const event = await Event.findByIdAndDelete(req.params.id).lean();
    if (!event) {
      return res.status(404).json({ message: 'Event not found' });
    }
    res.status(200).json({ success: true, message: 'Event deleted' });
  } catch (error) {
    next(error);
  }
};

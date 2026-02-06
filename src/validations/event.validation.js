export const validateEvent = (req, res, next) => {
  const { title, date } = req.body;

  if (!title || !date) {
    return res.status(400).json({
      message: 'Event title and date are required'
    });
  }

  const eventDate = new Date(date);
  if (isNaN(eventDate.getTime())) {
    return res.status(400).json({
      message: 'Invalid date format'
    });
  }

  next();
};

export const validateJob = (req, res, next) => {
  const { title, company, description } = req.body;

  if (!title || !company || !description) {
    return res.status(400).json({
      message: 'Title, company, and description are required'
    });
  }

  next();
};

import Survey from '../models/Survey.js';

export const createSurvey = async (req, res, next) => {
  try {
    const survey = await Survey.create(req.body);
    res.status(201).json({ success: true, survey });
  } catch (error) {
    next(error);
  }
};

export const getSurveys = async (req, res, next) => {
  try {
    const surveys = await Survey.find().sort({ createdAt: -1 }).limit(100).lean();
    res.status(200).json({ success: true, count: surveys.length, surveys });
  } catch (error) {
    next(error);
  }
};

export const getSurveyById = async (req, res, next) => {
  try {
    const survey = await Survey.findById(req.params.id).lean();
    if (!survey) {
      return res.status(404).json({ message: 'Survey not found' });
    }
    res.status(200).json({ success: true, survey });
  } catch (error) {
    next(error);
  }
};

export const updateSurvey = async (req, res, next) => {
  try {
    const survey = await Survey.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true
    }).lean();
    if (!survey) {
      return res.status(404).json({ message: 'Survey not found' });
    }
    res.status(200).json({ success: true, survey });
  } catch (error) {
    next(error);
  }
};

export const deleteSurvey = async (req, res, next) => {
  try {
    const survey = await Survey.findByIdAndDelete(req.params.id).lean();
    if (!survey) {
      return res.status(404).json({ message: 'Survey not found' });
    }
    res.status(200).json({ success: true, message: 'Survey deleted' });
  } catch (error) {
    next(error);
  }
};

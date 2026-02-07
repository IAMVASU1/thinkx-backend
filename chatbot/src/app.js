import express from 'express';
import cors from 'cors';

import userRoutes from './routes/users.routes.js';
import alumniProfileRoutes from './routes/alumniProfiles.routes.js';
import jobRoutes from './routes/jobs.routes.js';
import jobApplicationRoutes from './routes/jobApplications.routes.js';
import eventRoutes from './routes/events.routes.js';
import donationRoutes from './routes/donations.routes.js';
import feedbackRoutes from './routes/feedback.routes.js';
import successStoryRoutes from './routes/successStories.routes.js';
import surveyRoutes from './routes/surveys.routes.js';
import chatRoutes from './routes/chat.routes.js';
import errorMiddleware from './middleware/error.js';
import { globalLimiter } from './middleware/rateLimit.js';

const app = express();

app.use(cors());
app.use(express.json({ limit: '1mb' }));
app.use(express.urlencoded({ extended: true }));
app.use(globalLimiter);

app.get('/', (req, res) => {
  res.status(200).json({
    success: true,
    message: 'Alumni Chatbot API is running'
  });
});

app.use('/api/users', userRoutes);
app.use('/api/alumni-profiles', alumniProfileRoutes);
app.use('/api/jobs', jobRoutes);
app.use('/api/job-applications', jobApplicationRoutes);
app.use('/api/events', eventRoutes);
app.use('/api/donations', donationRoutes);
app.use('/api/feedback', feedbackRoutes);
app.use('/api/success-stories', successStoryRoutes);
app.use('/api/surveys', surveyRoutes);
app.use('/api/chat', chatRoutes);

app.use(errorMiddleware);

export default app;

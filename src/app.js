import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';

// Routes
import authRoutes from './routes/auth.routes.js';
import alumniRoutes from './routes/alumni.routes.js';
import jobRoutes from './routes/job.routes.js';
import eventRoutes from './routes/event.routes.js';
import donationRoutes from './routes/donation.routes.js';
import successStoryRoutes from './routes/successStory.routes.js';
import feedbackRoutes from './routes/feedback.routes.js';
import adminRoutes from './routes/admin.routes.js';

// Middlewares
import errorMiddleware from './middlewares/error.middleware.js';

dotenv.config();

const app = express();

/* ===============================
   GLOBAL MIDDLEWARES
================================ */
// CORS configuration with explicit origins and credentials support
const corsOptions = {
  origin: [
    'http://localhost:3000',
    'http://localhost:8081',
    'http://127.0.0.1:3000',
    'http://127.0.0.1:8081',
    'http://10.162.253.112:5000',
    'http://10.162.253.112:3000',
    'http://10.162.253.112:8081',
    'exp://localhost:8081',
    'exp://10.162.253.112:8081',
    '*'
  ],
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization', 'authorization'],
  optionsSuccessStatus: 200
};

app.use(cors(corsOptions));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

/* ===============================
   HEALTH CHECK
================================ */
app.get('/', (req, res) => {
   console.log('Health check endpoint hit!');
   res.status(200).json({
      success: true,
      message: 'Alumni Association API is running 🚀'
   });
});

/* ===============================
   API ROUTES
================================ */
app.use('/api/auth', authRoutes);
app.use('/api/alumni', alumniRoutes);
app.use('/api/jobs', jobRoutes);
app.use('/api/events', eventRoutes);
app.use('/api/donations', donationRoutes);
app.use('/api/success-stories', successStoryRoutes);
app.use('/api/feedback', feedbackRoutes);
app.use('/api/admin', adminRoutes);

/* ===============================
   ERROR HANDLER
================================ */
app.use(errorMiddleware);

export default app;

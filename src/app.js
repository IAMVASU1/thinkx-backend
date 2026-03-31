import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import path from 'path';
import { fileURLToPath } from 'url';

// Routes
import authRoutes from './routes/auth.routes.js';
import alumniRoutes from './routes/alumni.routes.js';
import jobRoutes from './routes/job.routes.js';
import eventRoutes from './routes/event.routes.js';
import donationRoutes from './routes/donation.routes.js';
import paymentRoutes from './routes/payment.routes.js';
import successStoryRoutes from './routes/successStory.routes.js';
import feedbackRoutes from './routes/feedback.routes.js';
import adminRoutes from './routes/admin.routes.js';

// Middlewares
import errorMiddleware from './middlewares/error.middleware.js';

dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();

/* ===============================
   GLOBAL MIDDLEWARES
================================ */
// CORS configuration - Allow all origins (development mode)
const corsOptions = {
  origin: function (origin, callback) {
    // Allow requests with no origin (like mobile apps, Postman, or file://)
    if (!origin) return callback(null, true);
    
    // Allow all origins
    callback(null, true);
  },
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization', 'authorization'],
  optionsSuccessStatus: 200
};

app.use(cors(corsOptions));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

/* ===============================
   SERVE STATIC FILES (Test Page)
================================ */
app.use('/test', express.static(path.join(__dirname, '..')));

/* ===============================
   HEALTH CHECK
================================ */
app.get('/', (req, res) => {
   console.log('Health check endpoint hit!');
   res.status(200).json({
      success: true,
      message: 'Alumni Association API is running 🚀',
      endpoints: {
         api: '/api',
         razorpayTest: 'http://localhost:5000/test/test-razorpay.html',
         docs: '/api/payment/key'
      }
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
app.use('/api/payment', paymentRoutes);
app.use('/api/success-stories', successStoryRoutes);
app.use('/api/feedback', feedbackRoutes);
app.use('/api/admin', adminRoutes);

/* ===============================
   ERROR HANDLER
================================ */
app.use(errorMiddleware);

export default app;

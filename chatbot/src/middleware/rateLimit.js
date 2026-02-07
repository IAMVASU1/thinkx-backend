import rateLimit from 'express-rate-limit';

export const globalLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 300,
  standardHeaders: true,
  legacyHeaders: false
});

// Stricter rate limiting for chat to prevent hitting Gemini API quota
export const chatLimiter = rateLimit({
  windowMs: 1 * 60 * 1000, // 1 minute
  max: 5, // Only 5 requests per minute to protect free tier quota
  standardHeaders: true,
  legacyHeaders: false,
  message: {
    success: false,
    message: 'Too many chat requests. Please wait a moment before sending another message.',
    error: 'RATE_LIMIT'
  }
});

// OPENAI - TURNED OFF (keeping for reference)
// import openai from '../config/openai.js';

// GEMINI AI - TURNED OFF (keeping for reference)
// import geminiModel from '../config/gemini.js';

// OLLAMA - ACTIVE (Local/Offline AI)
import { generateWithOllama } from '../config/ollama.js';
import User from '../models/User.js';
import AlumniProfile from '../models/AlumniProfile.js';
import Job from '../models/Job.js';
import Event from '../models/Event.js';
import SuccessStory from '../models/SuccessStory.js';
import { buildSystemPrompt } from '../utils/promptBuilder.js';
import { getCachedResponse, setCachedResponse, generateCacheKey } from '../utils/responseCache.js';

export const chat = async (req, res, next) => {
  try {
    const { message, userId } = req.body;
    if (!message || !userId) {
      return res.status(400).json({ message: 'message and userId are required' });
    }

    // Check cache first to reduce API calls
    const cacheKey = generateCacheKey(userId, message);
    const cachedReply = getCachedResponse(cacheKey);
    if (cachedReply) {
      return res.status(200).json({
        success: true,
        reply: cachedReply,
        cached: true
      });
    }

    const user = await User.findById(userId).select('-password').lean();
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    const profile = await AlumniProfile.findOne({ user: user._id }).lean();

    // Fetch less data to reduce token usage
    const jobs = await Job.find({ isActive: true }).sort({ createdAt: -1 }).limit(3).lean();
    const events = await Event.find().sort({ date: 1 }).limit(3).lean();
    const successStories = await SuccessStory.find({ approved: true }).sort({ createdAt: -1 }).limit(2).lean();

    const orFilters = [];
    if (profile?.department) orFilters.push({ department: profile.department });
    if (profile?.degree) orFilters.push({ degree: profile.degree });
    if (profile?.location) orFilters.push({ location: profile.location });
    if (profile?.skills?.length) orFilters.push({ skills: { $in: profile.skills } });

    const relevantQuery = orFilters.length > 0
      ? { $or: orFilters, user: { $ne: user._id } }
      : { user: { $ne: user._id } };

    const relevantAlumni = await AlumniProfile.find(relevantQuery)
      .populate('user', 'name email role')
      .limit(3)
      .lean();

    const systemPrompt = buildSystemPrompt({
      user,
      profile,
      jobs,
      events,
      successStories,
      relevantAlumni
    });

    // OLLAMA IMPLEMENTATION (Local/Offline AI)
    const prompt = `${systemPrompt}\n\nUser Query: ${message}`;
    
    try {
      const outputText = await generateWithOllama(prompt);

      // Cache the response
      setCachedResponse(cacheKey, outputText);

      res.status(200).json({
        success: true,
        reply: outputText
      });
    } catch (apiError) {
      console.error('Ollama API Error:', apiError);
      
      // Handle Ollama-specific errors
      if (apiError.message?.includes('ECONNREFUSED') || apiError.message?.includes('fetch failed')) {
        return res.status(503).json({
          success: false,
          message: 'Ollama service is not running. Please start Ollama at http://localhost:11434',
          error: 'OLLAMA_NOT_RUNNING'
        });
      }
      
      // Generic API error
      return res.status(500).json({
        success: false,
        message: 'Failed to generate response. Please try again.',
        error: 'AI_SERVICE_ERROR',
        details: process.env.NODE_ENV === 'development' ? apiError.message : undefined
      });
    }

    // GEMINI AI IMPLEMENTATION - TURNED OFF
    // const prompt = `${systemPrompt}\n\nUser Query: ${message}`;
    // try {
    //   const result = await geminiModel.generateContent(prompt);
    //   const response = await result.response;
    //   const outputText = response.text() || 'No response generated.';
    //   setCachedResponse(cacheKey, outputText);
    //   res.status(200).json({
    //     success: true,
    //     reply: outputText
    //   });
    // } catch (apiError) {
    //   console.error('Gemini API Error:', apiError);
    //   if (apiError.status === 429 || apiError.message?.includes('429') || apiError.message?.includes('quota')) {
    //     const retryAfter = apiError.errorDetails?.find(d => d['@type']?.includes('RetryInfo'))?.retryDelay || '60s';
    //     return res.status(429).json({
    //       success: false,
    //       message: `AI service rate limit exceeded. Please try again in ${retryAfter}.`,
    //       error: 'RATE_LIMIT_EXCEEDED',
    //       retryAfter: retryAfter
    //     });
    //   }
    //   if (apiError.status === 404 || apiError.message?.includes('404')) {
    //     return res.status(500).json({
    //       success: false,
    //       message: 'AI model configuration error. Please contact support.',
    //       error: 'MODEL_NOT_FOUND'
    //     });
    //   }
    //   return res.status(500).json({
    //     success: false,
    //     message: 'Failed to generate response. Please try again.',
    //     error: 'AI_SERVICE_ERROR',
    //     details: process.env.NODE_ENV === 'development' ? apiError.message : undefined
    //   });
    // }

    // OPENAI IMPLEMENTATION - TURNED OFF
    // const response = await openai.responses.create({
    //   model: 'gpt-4o-mini',
    //   input: [
    //     { role: 'system', content: systemPrompt },
    //     { role: 'user', content: message }
    //   ],
    //   temperature: 0.2,
    //   max_output_tokens: 350
    // });
    // const outputText = response.output_text || 'No response generated.';

  } catch (error) {
    next(error);
  }
};

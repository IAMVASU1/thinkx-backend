// GEMINI CONFIG - TURNED OFF (keeping for reference)
// Uncomment below code to switch back to Gemini

/*
// Ensure environment variables are loaded first
import '../loadEnv.js';
import { GoogleGenerativeAI } from '@google/generative-ai';

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

// Using gemini-2.0-flash-lite-001 (stable version, cost-efficient and low latency)
const model = genAI.getGenerativeModel({ 
  model: 'gemini-2.0-flash-lite-001',
  generationConfig: {
    temperature: 0.7,
    maxOutputTokens: 300, // Reduced to save tokens
  }
});

export default model;
*/

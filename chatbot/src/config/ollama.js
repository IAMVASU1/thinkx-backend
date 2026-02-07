// Ensure environment variables are loaded first
import '../loadEnv.js';
import axios from 'axios';

const OLLAMA_API_URL = process.env.OLLAMA_API_URL || 'http://localhost:11434/api/generate';
const OLLAMA_MODEL = process.env.OLLAMA_MODEL || 'qwen2.5:7b';

/**
 * Generate text using local Ollama model
 * @param {string} prompt - The prompt to send to Ollama
 * @returns {Promise<string>} - Generated text response
 */
export const generateWithOllama = async (prompt) => {
  try {
    const response = await axios.post(
      OLLAMA_API_URL,
      {
        model: OLLAMA_MODEL,
        prompt: prompt,
        stream: false
      },
      {
        timeout: 120000, // 2 minutes timeout for slow PCs
        headers: {
          'Content-Type': 'application/json'
        }
      }
    );

    // Ollama returns response in data.response
    if (!response.data || !response.data.response) {
      console.error('Unexpected Ollama response:', response.data);
      throw new Error('Invalid response from Ollama');
    }

    return response.data.response;

  } catch (error) {
    console.error('Full Ollama Error:', error?.response?.data || error.message);
    
    if (error.code === 'ECONNREFUSED') {
      throw new Error('Ollama service is not running at ' + OLLAMA_API_URL);
    }
    
    if (error.response?.status === 404) {
      throw new Error('Ollama API endpoint not found. Make sure Ollama is running and the model exists.');
    }

    throw new Error('Ollama API error: ' + error.message);
  }
};

export default { generateWithOllama };

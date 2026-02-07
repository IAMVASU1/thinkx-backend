// Quick test to verify Ollama is working correctly
import axios from 'axios';

const OLLAMA_URL = 'http://localhost:11434/api/generate';
const MODEL = 'qwen2.5:7b';

console.log('🧪 Testing Ollama connection...\n');
console.log('Endpoint:', OLLAMA_URL);
console.log('Model:', MODEL);
console.log('---');

async function testOllama() {
  try {
    console.log('\n📡 Sending test request...');
    
    const response = await axios.post(
      OLLAMA_URL,
      {
        model: MODEL,
        prompt: 'Say hello in 5 words',
        stream: false
      },
      {
        timeout: 120000
      }
    );

    console.log('✅ SUCCESS!\n');
    console.log('Response:', response.data.response);
    console.log('\n✅ Ollama is working correctly! You can now start the server.\n');
    
  } catch (error) {
    console.error('❌ ERROR!\n');
    
    if (error.code === 'ECONNREFUSED') {
      console.error('🔴 Ollama service is not running!');
      console.error('   Start Ollama and try again.\n');
    } else if (error.response?.status === 404) {
      console.error('🔴 Model not found or wrong endpoint!');
      console.error('   Check if model exists: ollama list');
      console.error('   Model name must be exactly:', MODEL, '\n');
    } else {
      console.error('Error details:', error?.response?.data || error.message, '\n');
    }
    
    process.exit(1);
  }
}

testOllama();

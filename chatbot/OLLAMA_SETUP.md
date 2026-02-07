# Ollama Setup Guide

## 🎯 Current Configuration
Your backend is now using **Ollama** - a local/offline AI model running on your machine.

## ✅ What's Changed
- **Switched from**: Gemini AI (online, quota-limited)
- **Switched to**: Ollama (offline, unlimited, private)
- **Endpoint**: http://localhost:11434/api/generate ✅
- **Model**: qwen2.5:7b

## 🧪 STEP 1: Test Ollama First (IMPORTANT)

Before starting the server, verify Ollama is working:

```powershell
node test-ollama.js
```

If you see ✅ SUCCESS → Proceed to start server.
If you see ❌ ERROR → Fix Ollama first.

### Manual Test (Alternative)
```powershell
curl http://localhost:11434/api/generate -Method Post -ContentType "application/json" -Body '{"model":"qwen2.5:7b","prompt":"hello","stream":false}'
```

## 🚀 STEP 2: Start Server

```powershell
npm start
```

## 📝 Configuration

### Current Setup in `.env`:
```env
OLLAMA_API_URL=http://localhost:11434/api/generate
OLLAMA_MODEL=qwen2.5:7b
```

### ⚠️ Model Name MUST Match Exactly

Check installed models:
```bash
ollama list
```

You should see:
```
qwen2.5:7b
```

Model name must be **EXACT**:
- ✅ `qwen2.5:7b`
- ❌ `qwen` 
- ❌ `qwen2.5`
- ❌ `qwen:7b`

## 🔄 Using Different Models

### Install a new model:
```bash
ollama pull llama2
ollama pull mistral
ollama pull phi
```

### Update `.env`:
```env
OLLAMA_MODEL=mistral
```

## ⚡ Benefits
- ✅ **No API keys needed**
- ✅ **No quota limits**
- ✅ **Works offline**
- ✅ **Data privacy** (runs locally)
- ✅ **No costs**
- ✅ **2 min timeout** for stability

## 🔧 Troubleshooting

### ❌ "Ollama service is not running"
1. Make sure Ollama is installed: https://ollama.ai
2. Start the Ollama service
3. Verify: `curl http://localhost:11434`

### ❌ "404 Not Found"
- Wrong endpoint URL
- **Solution**: Must use `/api/generate` (already configured correctly)

### ❌ "Model not found"
- Model name doesn't match installed model
- **Solution**: Run `ollama list` and update OLLAMA_MODEL in `.env`

### ❌ Slow Responses
- Normal for local models
- 2-minute timeout configured
- Use smaller models (phi, mistral) for faster responses

## 📊 Performance Tips

| Model       | Size   | Speed  | Quality |
|-------------|--------|--------|---------|
| phi         | 2.7GB  | Fast   | Good    |
| mistral     | 4.1GB  | Medium | Better  |
| qwen2.5:7b  | 4.7GB  | Medium | Great   |
| llama2      | 3.8GB  | Medium | Good    |

## 🔙 Switch Back to Other AI Services

### To Gemini:
1. Edit `src/controllers/chat.controller.js`
2. Uncomment Gemini code, comment Ollama code
3. Uncomment `src/config/gemini.js`
4. Restart server

### To OpenAI:
1. Edit `src/controllers/chat.controller.js`
2. Uncomment OpenAI code, comment Ollama code
3. Uncomment `src/config/openai.js`
4. Add valid `OPENAI_API_KEY` to `.env`
5. Restart server

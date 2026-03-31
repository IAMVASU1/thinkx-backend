# Chatbot API Testing Guide

## ✅ Fixed Issue

**Problem:** `req.body` was undefined causing destructuring error

**Solution:** 
- Added better error handling and debugging in chat controller
- Added validation checks for empty request body
- Added content-type validation
- Created test HTML page for easy testing

---

## 🚀 Quick Start

### 1. Make Sure Ollama is Running

```bash
# Check if Ollama is running
curl http://localhost:11434/api/generate

# If not running, start Ollama
ollama serve

# Make sure you have the model
ollama pull qwen2.5:7b
```

### 2. Start the Chatbot Server

```bash
cd chatbot
npm run dev
```

Server will run on: **http://localhost:5001**

---

## 🧪 Testing Methods

### Option 1: Use the Test HTML Page (Easiest)

1. **Open the test page:**
   - Navigate to: `d:\SGP\thinkx-backend\chatbot\test-chat.html`
   - Or visit: `http://localhost:5001/test/chatbot/test-chat.html` (if served)

2. **Get a User ID:**
   ```bash
   # Connect to MongoDB and get a user ID
   # Or use the registration endpoint to create a test user
   ```

3. **Fill in the form:**
   - API URL: `http://localhost:5001/api`
   - User ID: Your MongoDB user ID
   - Message: Ask any question

4. **Click "Send Message"**

---

### Option 2: Using Postman

**Request:**
```
POST http://localhost:5001/api/chat
Content-Type: application/json
```

**Body (raw JSON):**
```json
{
  "userId": "65abc123def456789",
  "message": "What jobs are available?"
}
```

**Expected Response:**
```json
{
  "success": true,
  "reply": "Here are the available jobs...",
  "cached": false
}
```

---

### Option 3: Using cURL

```bash
curl -X POST http://localhost:5001/api/chat \
  -H "Content-Type: application/json" \
  -d '{
    "userId": "65abc123def456789",
    "message": "Tell me about upcoming events"
  }'
```

---

### Option 4: Using JavaScript/Fetch

```javascript
async function testChat() {
  const response = await fetch('http://localhost:5001/api/chat', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      userId: '65abc123def456789',
      message: 'What jobs are available?'
    })
  });
  
  const data = await response.json();
  console.log(data);
}

testChat();
```

---

## 📋 Example Questions

Try these questions with the chatbot:

1. **Job Queries:**
   - "What jobs are available?"
   - "Show me software engineering jobs"
   - "Are there any remote positions?"

2. **Event Queries:**
   - "Tell me about upcoming events"
   - "What events are happening this month?"
   - "Any networking events?"

3. **Alumni Queries:**
   - "Who are the alumni from Computer Science?"
   - "Connect me with alumni in my field"
   - "Alumni working in tech companies?"

4. **Success Stories:**
   - "What are the recent success stories?"
   - "Tell me inspiring stories"
   - "Alumni achievements?"

5. **General:**
   - "How can I get involved?"
   - "What opportunities are there?"
   - "Tell me about the alumni network"

---

## 🐛 Common Errors & Solutions

### Error: "Request body is empty"

**Cause:** Missing or incorrect Content-Type header

**Solution:**
```bash
# Make sure you set Content-Type header
Content-Type: application/json
```

### Error: "message and userId are required"

**Cause:** Missing required fields in request body

**Solution:**
```json
{
  "userId": "REQUIRED - MongoDB User ID",
  "message": "REQUIRED - Your question"
}
```

### Error: "User not found"

**Cause:** Invalid or non-existent userId

**Solution:**
- Check if the userId exists in your MongoDB users collection
- Create a new user first or use an existing valid user ID

### Error: Connection refused

**Cause:** Server not running

**Solution:**
```bash
cd chatbot
npm run dev
```

### Error: "Ollama connection failed"

**Cause:** Ollama is not running

**Solution:**
```bash
# Start Ollama
ollama serve

# Pull the model if needed
ollama pull qwen2.5:7b
```

---

## 🔍 Debugging

### Check Server Logs

The improved error handling will show:
```
Request body: { userId: '...', message: '...' }
Content-Type: application/json
```

### Check Response

**Success Response:**
```json
{
  "success": true,
  "reply": "AI generated response...",
  "cached": false
}
```

**Error Response:**
```json
{
  "success": false,
  "message": "Error description",
  "hint": "Helpful hint for fixing",
  "received": { "message": true, "userId": false }
}
```

---

## 📊 API Endpoints

| Endpoint | Method | Description |
|----------|--------|-------------|
| `/api/chat` | POST | Send message to chatbot |
| `/api/users` | GET | Get all users |
| `/api/jobs` | GET | Get all jobs |
| `/api/events` | GET | Get all events |
| `/api/success-stories` | GET | Get success stories |

---

## 💡 Tips

1. **Use the HTML test page** - It's the easiest way to test
2. **Check Ollama first** - Make sure `ollama serve` is running
3. **Get a valid User ID** - Query your MongoDB to get one
4. **Check Content-Type** - Always use `application/json`
5. **Monitor logs** - Server logs show detailed debugging info

---

## 🎯 Quick Test Checklist

- [ ] Ollama is running (`ollama serve`)
- [ ] Model is downloaded (`ollama list` shows qwen2.5:7b)
- [ ] Chatbot server is running (`npm run dev` in chatbot folder)
- [ ] Server is on port 5001
- [ ] You have a valid userId from MongoDB
- [ ] Content-Type header is set to application/json
- [ ] Request body includes both userId and message

---

## 🚀 Production Deployment

When deploying to production:

1. **Change PORT** in `.env` if needed
2. **Update CORS settings** in `app.js`
3. **Set proper rate limits** in middleware
4. **Use environment variables** for sensitive data
5. **Consider using Redis** for response caching
6. **Monitor API usage** and costs

---

**Happy Testing! 🎉**

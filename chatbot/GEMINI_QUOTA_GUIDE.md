# Gemini API Quota Management

## Current Setup
- **Model**: gemini-2.0-flash-lite-001
- **Rate Limiting**: 5 requests per minute per user
- **Response Caching**: 5 minutes TTL

## Quota Exceeded Solutions

### Immediate Solutions (Free Tier)

1. **Wait for Quota Reset**
   - Free tier resets: Every 24 hours
   - When you get a 429 error, wait the specified retry time (usually 60s)

2. **Get a New API Key**
   - Visit: https://aistudio.google.com/app/apikey
   - Create a new project and generate a new key
   - Update `GEMINI_API_KEY` in `.env`

3. **Use Multiple API Keys (Rotation)**
   - Create 2-3 API keys
   - Rotate between them when one hits the limit

### Long-term Solutions

4. **Enable Billing (Recommended)**
   - Visit: https://console.cloud.google.com/billing
   - Enable billing for higher quotas
   - Much more generous limits (15 RPM, 1M TPM, 1500 RPD)

5. **Monitor Usage**
   - Check: https://ai.dev/rate-limit
   - Track API usage patterns

### Free Tier Limits
- **Requests per minute (RPM)**: 15
- **Requests per day (RPD)**: 1,500
- **Tokens per minute (TPM)**: 1,000,000

## Current Protections
- ✅ Rate limiting (5 req/min)
- ✅ Response caching (5 min)
- ✅ Better error handling
- ✅ Retry-after support

## API Key Location
Update your key in: `chatbot/.env`
```
GEMINI_API_KEY=your_new_key_here
```

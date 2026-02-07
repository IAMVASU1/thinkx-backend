// Simple in-memory cache to reduce API calls
const cache = new Map();
const CACHE_TTL = 5 * 60 * 1000; // 5 minutes

export const getCachedResponse = (key) => {
  const cached = cache.get(key);
  if (cached && Date.now() - cached.timestamp < CACHE_TTL) {
    return cached.response;
  }
  return null;
};

export const setCachedResponse = (key, response) => {
  cache.set(key, {
    response,
    timestamp: Date.now()
  });
  
  // Clean old entries if cache gets too large
  if (cache.size > 100) {
    const oldestKey = cache.keys().next().value;
    cache.delete(oldestKey);
  }
};

export const generateCacheKey = (userId, message) => {
  return `${userId}:${message.toLowerCase().trim()}`;
};

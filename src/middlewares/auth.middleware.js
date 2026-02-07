import jwt from 'jsonwebtoken';

const authMiddleware = (req, res, next) => {
  const authHeader = req.headers.authorization;

  // Log incoming request details for debugging
  console.log('[AUTH] Incoming request:', {
    method: req.method,
    path: req.path,
    hasAuthHeader: !!authHeader,
    authHeader: authHeader ? authHeader.substring(0, 20) + '...' : 'none'
  });

  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    console.warn('[AUTH] Authorization header missing or invalid format');
    return res.status(401).json({
      message: 'Authorization token missing',
      details: 'Expected "Authorization: Bearer <token>" header'
    });
  }

  const token = authHeader.split(' ')[1]?.trim();
  if (!token) {
    console.warn('[AUTH] Token extraction failed');
    return res.status(401).json({
      message: 'Authorization token missing',
      details: 'Token could not be extracted from Authorization header'
    });
  }

  if (!process.env.JWT_SECRET) {
    console.error('[AUTH] JWT_SECRET not configured in environment');
    return res.status(500).json({
      message: 'Server configuration error',
      details: 'JWT secret not configured'
    });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    console.log('[AUTH] Token verified successfully:', {
      userId: decoded.id,
      role: decoded.role,
      iat: new Date(decoded.iat * 1000).toISOString(),
      exp: new Date(decoded.exp * 1000).toISOString()
    });
    req.user = decoded;
    next();
  } catch (error) {
    console.error('[AUTH] Token verification failed:', {
      errorName: error.name,
      message: error.message,
      tokenPreview: token.substring(0, 20) + '...'
    });
    return res.status(401).json({
      message: 'Invalid or expired token',
      details: error.message
    });
  }
};

export default authMiddleware;

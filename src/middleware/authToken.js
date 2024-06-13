import jwt from 'jsonwebtoken';

const SECRET_KEY = 'your-secret-key';

// Funktion för att autentisera token
function authenticateToken(req, res, next) {

  // Hämta token från header
  const token = req.header('Authorization')?.split(' ')[1];
  if (!token) {
    return res.status(401).json({ error: 'Access denied. No token provided.' });
  }

  // Verifiera token
  try {
    const decoded = jwt.verify(token, SECRET_KEY);
    req.user = decoded;
    next();
  } catch (error) {
    res.status(400).json({ error: 'Invalid token' });
  }
}

export { authenticateToken };
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';

// Hämtar USER_SECRET_KEY från .env-filen
dotenv.config();
const USER_SECRET_KEY = process.env.USER_SECRET_KEY;

// Funktion för att autentisera en token
function authenticateToken(req, res, next) {
  
  // Hämta token från Authorization-header
  const token = req.header('Authorization')?.split(' ')[1];
  if (!token) {
    return res.status(401).json({ error: 'Access denied. No token provided.' });
  }
 // Försök verifiera token
  try {
    const decoded = jwt.verify(token, USER_SECRET_KEY);
    req.user = decoded;
    next();
  } catch (error) {
    res.status(400).json({ error: 'Invalid token' });
  }

  next();
}

export { authenticateToken };

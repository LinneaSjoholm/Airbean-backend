import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';

dotenv.config();
const USER_SECRET_KEY = process.env.USER_SECRET_KEY;

function authenticateToken(req, res, next) {
  const token = req.header('Authorization')?.split(' ')[1];
  if (!token) {
    return res.status(401).json({ error: 'Access denied. No token provided.' });
  }

  try {
    const decoded = jwt.verify(token, USER_SECRET_KEY);
    req.user = decoded;
    next();
  } catch (error) {
    res.status(400).json({ error: 'Invalid token' });
  }
}

export { authenticateToken };

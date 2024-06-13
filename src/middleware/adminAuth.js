import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';

// Hämta ADMIN_SECRET_KEY från .env-filen
dotenv.config();
const ADMIN_SECRET_KEY = process.env.ADMIN_SECRET_KEY;

// Funktion för att autentisera en administratör
function authenticateAdminToken(req, res, next) {

    // Hämta token från Authorization-header
    const token = req.header('Authorization')?.split(' ')[1];
    if(!token) {
        return res.status(401).json({ error: 'Access denied. Only administrators can perform this action.' });
    } 
    // Försök verifiera token
    try {
        const decoded = jwt.verify(token, ADMIN_SECRET_KEY);

        // Om användaren inte är en administratör, skicka en 401-status och ett felmeddelande
        if(decoded.role !== "admin") {
            return res.status(401).json({ error: 'Access denied. Only administrators can perform this action.' });
        }

        // Spara användaren i req.admin
        req.admin = decoded;

    } catch (error) {
        res.status(400).json({ error: 'Invalid token' });
    };

    next();
};

export { authenticateAdminToken };
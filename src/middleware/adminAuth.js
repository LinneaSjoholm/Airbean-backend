import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';

dotenv.config();
const ADMIN_SECRET_KEY = process.env.ADMIN_SECRET_KEY;

function authenticateAdminToken(req, res, next) {
    const token = req.header('Authorization')?.split(' ')[1];
    if(!token) {
        return res.status(401).json({ error: 'Access denied. Only administrators can perform this action.' });
    } 

    try {
        const decoded = jwt.verify(token, ADMIN_SECRET_KEY);
        if(decoded.role !== "admin") {
            return res.status(401).json({ error: 'Access denied. Only administrators can perform this action.' });
        }
        req.admin = decoded;
        next();
    } catch (error) {
        res.status(400).json({ error: 'Invalid token' });
    };
};

export { authenticateAdminToken };
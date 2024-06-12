
import jwt from 'jsonwebtoken';

const SECRET_KEY = 'admin-secret-key';

function authenticateAdminToken(req, res, next) {
    const token = req.header('Authorization')?.split(' ')[1];
    if(!token) {
        return res.status(401).json({ error: 'Access denied. No token provided.' });
    } 

    try {
        const decoded = jwt.verify(token, SECRET_KEY);
        if(decoded.role !== "admin") {
            return res.status(401).json({ error: 'Access denied. Not an admin.' });
        }
        req.admin = decoded;
        next();
    } catch (error) {
        res.status(400).json({ error: 'Invalid token' });
    };
};

export { authenticateAdminToken };
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
dotenv.config();
export const authenticateToken = (req, res, next) => {
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1]; // Extract the token from the Authorization header
    if (!token) {
        return res.status(401).json({ message: 'Token not provided, authorization denied' });
    }
    try {
        const secret = process.env.JWT_SECRET_KEY;
        const decoded = jwt.verify(token, secret); // Verify the token
        req.user = decoded; // Attach the decoded user to the request object
        return next(); // Continue with the request
    }
    catch (error) {
        return res.status(403).json({ message: 'Invalid or expired token' });
    }
};

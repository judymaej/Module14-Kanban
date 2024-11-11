import { Router } from 'express';
import { User } from '../models/user.js';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';
import dotenv from 'dotenv';
dotenv.config();
export const login = async (req, res) => {
    try {
        const { username, password } = req.body;
        // Check if the user exists
        const user = await User.findOne({ where: { username } });
        if (!user) {
            return res.status(400).json({ message: 'Invalid username or password.' });
        }
        // Check if the password is correct
        const validPassword = await bcrypt.compare(password, user.password);
        if (!validPassword) {
            return res.status(400).json({ message: 'Invalid username or password.' });
        }
        // Create and sign a JWT token
        const token = jwt.sign({ username: user.username, id: user.id }, process.env.JWT_SECRET_KEY || '', { expiresIn: '1h' } // Set token expiration time
        );
        // Return the token as the response
        return res.json({ token });
    }
    catch (error) {
        console.error('Error during login:', error);
        return res.status(500).json({ message: 'Internal server error' });
    }
};
const router = Router();
// POST /login - Login a user
router.post('/login', login);
export default router;

import { Router } from 'express';
import authRoutes from './auth-routes.js';
import apiRoutes from './api/index.js';
import { authenticateToken } from '../middleware/auth.js';
const router = Router();
// Use the auth routes
router.use('/auth', authRoutes);
// Use the API routes
router.use('/api', authenticateToken, apiRoutes);
export default router;

import express from 'express';
import { register, login, deleteUser, updateUser } from '../controllers/userController.js';
import { authenticateToken } from '../middlewares/authMiddleware.js';

const router = express.Router();

router.post('/register', register);
router.post('/login', login);
router.delete('/:userId', authenticateToken, deleteUser); // Protect the route
router.put('/:userId', authenticateToken, updateUser); // Add update route

export default router;

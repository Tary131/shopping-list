import express from 'express';
import { createGroup, addUserToGroup, deleteGroup, removeUserFromGroup, updateGroup } from '../controllers/groupController.js';
import { authenticateToken } from '../middlewares/authMiddleware.js';

const router = express.Router();

router.post('/', authenticateToken, createGroup);
router.put('/addUser', authenticateToken, addUserToGroup);
router.delete('/:groupId', authenticateToken, deleteGroup);
router.put('/removeUser', authenticateToken, removeUserFromGroup);
router.put('/:groupId', authenticateToken, updateGroup); // Add update route

export default router;

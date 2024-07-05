import express from 'express';
import { createList, getUserLists, getGroupLists, deleteList, updateList } from '../controllers/listController.js';
import { authenticateToken } from '../middlewares/authMiddleware.js';
import { checkGroupMembership } from "../middlewares/checkGroupMembership.js";

const router = express.Router();

router.post('/', authenticateToken, createList);
router.get('/user', authenticateToken, getUserLists);
router.get('/group/:groupId', authenticateToken, checkGroupMembership, getGroupLists);
router.delete('/:id', authenticateToken, deleteList);
router.put('/:id', authenticateToken, updateList); // Add update route

export default router;

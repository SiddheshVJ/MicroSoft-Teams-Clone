import express from 'express';
import TaskController from '../controllers/taskController';

const router = express.Router();

// Create task route
router.post('/', TaskController.createTask);

// Get task by ID route
router.get('/:taskId', TaskController.getTaskById);

// Update task route
router.put('/:taskId', TaskController.updateTask);

// Delete task route
router.delete('/:taskId', TaskController.deleteTask);

// Add comment to task route
router.post('/:taskId/add-comment', TaskController.addComment);

// Remove comment from task route
router.delete('/:taskId/remove-comment/:commentId', TaskController.removeComment);

export default router;

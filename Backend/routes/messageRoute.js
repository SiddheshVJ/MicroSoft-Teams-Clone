import express from 'express';
import MessageController from '../controllers/messageController';

const router = express.Router();

// Create message route
router.post('/', MessageController.createMessage);

// Get message by ID route
router.get('/:messageId', MessageController.getMessageById);

// Update message route
router.put('/:messageId', MessageController.updateMessage);

// Delete message route
router.delete('/:messageId', MessageController.deleteMessage);

export default router;

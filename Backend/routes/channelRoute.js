import express from 'express';
import ChannelController from '../controllers/channelController';

const router = express.Router();

// Create channel route
router.post('/', ChannelController.createChannel);

// Get channel by ID route
router.get('/:channelId', ChannelController.getChannelById);

// Update channel route
router.put('/:channelId', ChannelController.updateChannel);

// Delete channel route
router.delete('/:channelId', ChannelController.deleteChannel);

// Add message to channel route
router.post('/:channelId/add-message', ChannelController.addMessage);

// Remove message from channel route
router.delete('/:channelId/remove-message/:messageId', ChannelController.removeMessage);

export default router;

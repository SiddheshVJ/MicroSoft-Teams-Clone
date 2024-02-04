import express from 'express';
import ChatRoomController from '../controllers/chatRoomController';

const router = express.Router();

// Create chat room route
router.post('/', ChatRoomController.createChatRoom);

// Get chat room by ID route
router.get('/:roomId', ChatRoomController.getChatRoomById);

// Update chat room route
router.put('/:roomId', ChatRoomController.updateChatRoom);

// Delete chat room route
router.delete('/:roomId', ChatRoomController.deleteChatRoom);

// Add participant to chat room route
router.post('/:roomId/add-participant', ChatRoomController.addParticipant);

// Remove participant from chat room route
router.delete('/:roomId/remove-participant/:participantId', ChatRoomController.removeParticipant);

export default router;

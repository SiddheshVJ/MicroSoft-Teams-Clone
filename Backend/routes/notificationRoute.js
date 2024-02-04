import express from 'express';
import NotificationController from '../controllers/notificationController';

const router = express.Router();

// Get notifications for user route
router.get('/', NotificationController.getUserNotifications);

// Mark notification as read route
router.put('/:notificationId/mark-as-read', NotificationController.markAsRead);

// Delete notification route
router.delete('/:notificationId', NotificationController.deleteNotification);

export default router;

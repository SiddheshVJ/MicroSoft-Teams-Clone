import express from 'express';
import CalendarEventController from '../controllers/calendarEventController';

const router = express.Router();

// Create calendar event route
router.post('/', CalendarEventController.createCalendarEvent);

// Get calendar event by ID route
router.get('/:eventId', CalendarEventController.getCalendarEventById);

// Update calendar event route
router.put('/:eventId', CalendarEventController.updateCalendarEvent);

// Delete calendar event route
router.delete('/:eventId', CalendarEventController.deleteCalendarEvent);

export default router;

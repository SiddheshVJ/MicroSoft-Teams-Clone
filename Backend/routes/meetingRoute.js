import express from 'express';
import MeetingController from '../controllers/meetingController';

const router = express.Router();

// Create meeting route
router.post('/', MeetingController.createMeeting);

// Get meeting by ID route
router.get('/:meetingId', MeetingController.getMeetingById);

// Update meeting route
router.put('/:meetingId', MeetingController.updateMeeting);

// Delete meeting route
router.delete('/:meetingId', MeetingController.deleteMeeting);

// Add participant to meeting route
router.post('/:meetingId/add-participant', MeetingController.addParticipant);

// Remove participant from meeting route
router.delete('/:meetingId/remove-participant/:participantId', MeetingController.removeParticipant);

export default router;

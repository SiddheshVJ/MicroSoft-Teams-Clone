import express from 'express';
import TeamController from '../controllers/teamController';

const router = express.Router();

// Create team route
router.post('/', TeamController.createTeam);

// Get team by ID route
router.get('/:teamId', TeamController.getTeamById);

// Update team route
router.put('/:teamId', TeamController.updateTeam);

// Delete team route
router.delete('/:teamId', TeamController.deleteTeam);

// Add member to team route
router.post('/:teamId/add-member', TeamController.addMember);

// Remove member from team route
router.delete('/:teamId/remove-member/:memberId', TeamController.removeMember);

export default router;

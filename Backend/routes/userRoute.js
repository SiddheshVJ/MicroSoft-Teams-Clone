import express from 'express';
import { registerUser, loginUser, resetPassword, updatePassword, forgotPassword, getUserProfile, updateUserProfile, getAllUsers, getUserById, updateUserById, deleteUserById } from '../controllers/userController';
import { authMiddleware } from '../middleware/authMiddleware'

const router = express.Router();

// User registration route
router.post('/register', registerUser);

// User login route
router.post('/login', loginUser);

// User profile route
router.get('/profile', authMiddleware, getUserProfile);

// Update user profile route
router.put('/profile', authMiddleware, updateUserProfile);

// Forgot password route
router.post('/forgot-password', forgotPassword);

// Reset password route
router.put('/reset-password/:token', resetPassword);

// Get all users route (admin only)
router.get('/', getAllUsers);

// Get user by ID route (admin only)
router.get('/:userId', getUserById);

// Update user by ID route (admin only)
router.put('/:userId', updateUserById);

// Delete user by ID route (admin only)
router.delete('/:userId', deleteUserById);

export default router;

import express from 'express';
import UserController from '../controllers/userController';

const router = express.Router();

// User registration route
router.post('/register', UserController.registerUser);

// User login route
router.post('/login', UserController.loginUser);

// User profile route
router.get('/profile', UserController.getUserProfile);

// Update user profile route
router.put('/profile', UserController.updateUserProfile);

// Forgot password route
router.post('/forgot-password', UserController.forgotPassword);

// Reset password route
router.put('/reset-password/:token', UserController.resetPassword);

// Get all users route (admin only)
router.get('/', UserController.getAllUsers);

// Get user by ID route (admin only)
router.get('/:userId', UserController.getUserById);

// Update user by ID route (admin only)
router.put('/:userId', UserController.updateUserById);

// Delete user by ID route (admin only)
router.delete('/:userId', UserController.deleteUserById);

export default router;

import User from '../models/userModel.js';
import bcrypt from 'bcrypt';
import crypto from 'crypto';
import sendEmail from '../config/emailConfig.js'; // Import the transporter object
import { generateToken } from '../config/jwtToken.js';
import { generateRefreshToken } from '../config/refreshToken.js';

// Function to register a new user
export const registerUser = async (req, res) => {
    try {
        const { firstName, lastName, email, mobile, password } = req.body;

        // Check if user already exists
        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return res.status(400).json({ message: 'User already exists' });
        }

        // Hash the password
        const hashedPassword = await bcrypt.hash(password, 10);

        // Create a new user
        const newUser = new User({
            firstName,
            lastName,
            email,
            mobile,
            password: hashedPassword
        });

        // Save the user to the database
        await newUser.save();

        res.status(201).json({ message: 'User registered successfully' });
    } catch (error) {
        console.error('Error registering user:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
};

// Function to login a user
export const loginUser = async (req, res) => {
    try {
        const { email, password } = req.body;

        // Find user by email
        const user = await User.findOne({ email });
        if (!user) {
            return res.status(401).json({ message: 'Invalid email or password' });
        }

        // Check if password matches
        const passwordMatch = await bcrypt.compare(password, user.password);
        if (!passwordMatch) {
            return res.status(401).json({ message: 'Invalid email or password' });
        }

        // Generate JWT token
        const token = generateToken(user._id);
        const refreshToken = generateRefreshToken(user._id);

        res.status(200).json({ token, refreshToken });
    } catch (error) {
        console.error('Error logging in user:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
};

// Function to reset password
export const resetPassword = async (req, res) => {
    try {
        const { email } = req.body;

        // Find user by email
        const user = await User.findOne({ email });
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }

        // Generate password reset token
        const resetToken = crypto.randomBytes(20).toString('hex');
        user.passwordResetToken = resetToken;
        user.passwordResetExpires = Date.now() + 3600000; // Token expires in 1 hour
        await user.save();

        // Send email with password reset link (you need to implement this part)

        res.status(200).json({ message: 'Password reset email sent successfully' });
    } catch (error) {
        console.error('Error resetting password:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
};

// Function to update password
export const updatePassword = async (req, res) => {
    try {
        const { token, newPassword } = req.body;

        // Find user by password reset token
        const user = await User.findOne({ passwordResetToken: token, passwordResetExpires: { $gt: Date.now() } });
        if (!user) {
            return res.status(400).json({ message: 'Invalid or expired token' });
        }

        // Hash the new password
        const hashedPassword = await bcrypt.hash(newPassword, 10);
        user.password = hashedPassword;
        user.passwordResetToken = undefined;
        user.passwordResetExpires = undefined;
        await user.save();

        res.status(200).json({ message: 'Password updated successfully' });
    } catch (error) {
        console.error('Error updating password:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
};

// Function to get user profile
export const getUserProfile = async (req, res) => {
    try {
        // Get user from request object
        const user = req.user;

        // Send user profile in response
        res.status(200).json(user);
    } catch (error) {
        console.error('Error fetching user profile:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
};

// Function to update user profile
export const updateUserProfile = async (req, res) => {
    try {
        // Get user from request object
        const user = req.user;

        // Update user profile
        user.firstName = req.body.firstName || user.firstName;
        user.lastName = req.body.lastName || user.lastName;
        user.email = req.body.email || user.email;
        user.mobile = req.body.mobile || user.mobile;

        // Save updated user profile
        await user.save();

        res.status(200).json({ message: 'User profile updated successfully' });
    } catch (error) {
        console.error('Error updating user profile:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
};

// Function to get all users (admin only)
export const getAllUsers = async (req, res) => {
    try {
        // Get all users from database
        const users = await User.find({});

        res.status(200).json(users);
    } catch (error) {
        console.error('Error fetching all users:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
};

// Function to get user by ID (admin only)
export const getUserById = async (req, res) => {
    try {
        // Get user ID from request parameters
        const userId = req.params.userId;

        // Find user by ID
        const user = await User.findById(userId);
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }

        res.status(200).json(user);
    } catch (error) {
        console.error('Error fetching user by ID:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
};

// Function to update user by ID (admin only)
export const updateUserById = async (req, res) => {
    try {
        // Get user ID from request parameters
        const userId = req.params.userId;

        // Find user by ID
        const user = await User.findById(userId);
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }

        // Update user details
        user.firstName = req.body.firstName || user.firstName;
        user.lastName = req.body.lastName || user.lastName;
        user.email = req.body.email || user.email;
        user.mobile = req.body.mobile || user.mobile;

        // Save updated user details
        await user.save();

        res.status(200).json({ message: 'User updated successfully' });
    } catch (error) {
        console.error('Error updating user by ID:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
};

// Function to delete user by ID (admin only)
export const deleteUserById = async (req, res) => {
    try {
        // Get user ID from request parameters
        const userId = req.params.userId;

        // Find and delete user by ID
        const user = await User.findByIdAndDelete(userId);
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }

        res.status(200).json({ message: 'User deleted successfully' });
    } catch (error) {
        console.error('Error deleting user by ID:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
};

// Function to search users (admin only)
export const searchUsers = async (req, res) => {
    try {
        // Get search query from request parameters
        const { query } = req.query;

        // Search users by name or email
        const users = await User.find({
            $or: [
                { firstName: { $regex: query, $options: 'i' } },
                { lastName: { $regex: query, $options: 'i' } },
                { email: { $regex: query, $options: 'i' } }
            ]
        });

        res.status(200).json(users);
    } catch (error) {
        console.error('Error searching users:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
};


// Function to send password reset email
export const forgotPassword = async (req, res) => {
    try {
        const { email } = req.body;

        // Find user by email
        const user = await User.findOne({ email });
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }

        // Generate password reset token
        const resetToken = crypto.randomBytes(20).toString('hex');
        user.passwordResetToken = resetToken;
        user.passwordResetExpires = Date.now() + 3600000; // Token expires in 1 hour
        await user.save();

        // Send password reset email
        const mailOptions = {
            from: 'your_email@gmail.com',
            to: user.email,
            subject: 'Password Reset',
            text: `You are receiving this email because you (or someone else) has requested a password reset for your account.\n\n
                    Please click on the following link, or paste this into your browser to complete the process:\n\n
                    http://${req.headers.host}/reset-password/${resetToken}\n\n
                    If you did not request this, please ignore this email and your password will remain unchanged.\n`
        };

        sendEmail.sendMail(mailOptions, (error, info) => {
            if (error) {
                console.error('Error sending password reset email:', error);
                res.status(500).json({ message: 'Error sending password reset email' });
            } else {
                console.log('Password reset email sent:', info.response);
                res.status(200).json({ message: 'Password reset email sent successfully' });
            }
        });
    } catch (error) {
        console.error('Error sending password reset email:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
};


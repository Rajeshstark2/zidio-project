const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/User');

// JWT Secret
const JWT_SECRET = process.env.JWT_SECRET || 'zidio-super-secret-jwt-key-2024';

// Register Route
router.post('/register', async (req, res) => {
  const { name, email, password, securityQuestion, securityAnswer } = req.body;

  try {
    const existingUser = await User.findOne({ email });

    if (existingUser) {
      return res.status(400).json({ message: 'User already exists' });
    }

    // Hash password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, 10);
    const hashedSecurityAnswer = await bcrypt.hash(securityAnswer, 10);

    const newUser = new User({
      name,
      email,
      password: hashedPassword,
      securityQuestion,
      securityAnswer: hashedSecurityAnswer
    });

    await newUser.save();

    // Create JWT token
    const token = jwt.sign(
      { userId: newUser._id },
      JWT_SECRET,
      { expiresIn: '24h' }
    );

    console.log('✅ User Registered:', newUser.email);
    res.status(201).json({
      message: 'User registered successfully',
      token,
      user: {
        id: newUser._id,
        name: newUser.name,
        email: newUser.email
      }
    });
  } catch (err) {
    console.error('❌ Register error:', err);
    console.error('Error details:', {
      name: err.name,
      message: err.message,
      stack: err.stack
    });
    res.status(500).json({ 
      message: 'Server error',
      error: err.message
    });
  }
});

// Login Route
router.post('/login', async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await User.findOne({ email });

    if (!user) {
      return res.status(401).json({ message: 'Invalid credentials' });
    }

    // Verify password
    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch) {
      return res.status(401).json({ message: 'Invalid credentials' });
    }

    // Create JWT token
    const token = jwt.sign(
      { userId: user._id },
      JWT_SECRET,
      { expiresIn: '24h' }
    );

    console.log('✅ User Logged In:', user.email);
    res.status(200).json({
      message: 'Login successful',
      token,
      user: {
        id: user._id,
        name: user.name,
        email: user.email
      }
    });
  } catch (err) {
    console.error('❌ Login error:', err);
    console.error('Error details:', {
      name: err.name,
      message: err.message,
      stack: err.stack
    });
    res.status(500).json({ 
      message: 'Server error',
      error: err.message
    });
  }
});

// Forgot Password - Verify Email
router.post('/forgot-password/verify-email', async (req, res) => {
  const { email } = req.body;

  try {
    const user = await User.findOne({ email });

    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    res.status(200).json({
      message: 'Email verified',
      securityQuestion: user.securityQuestion
    });
  } catch (err) {
    console.error('❌ Forgot password error:', err);
    res.status(500).json({ message: 'Server error' });
  }
});

// Forgot Password - Verify Security Answer
router.post('/forgot-password/verify-answer', async (req, res) => {
  const { email, securityAnswer } = req.body;

  try {
    const user = await User.findOne({ email });

    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    const isMatch = await bcrypt.compare(securityAnswer, user.securityAnswer);

    if (!isMatch) {
      return res.status(401).json({ message: 'Incorrect security answer' });
    }

    res.status(200).json({ message: 'Security answer verified' });
  } catch (err) {
    console.error('❌ Security answer verification error:', err);
    res.status(500).json({ message: 'Server error' });
  }
});

// Forgot Password - Reset Password
router.post('/forgot-password/reset', async (req, res) => {
  const { email, newPassword } = req.body;

  try {
    const user = await User.findOne({ email });

    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    // Hash new password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(newPassword, 10);

    user.password = hashedPassword;
    await user.save();

    res.status(200).json({ message: 'Password reset successfully' });
  } catch (err) {
    console.error('❌ Password reset error:', err);
    res.status(500).json({ message: 'Server error' });
  }
});

module.exports = router;

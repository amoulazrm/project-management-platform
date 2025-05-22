const User = require('../models/User');
const jwt = require('jsonwebtoken');

// Get current user
exports.getCurrentUser = async (req, res) => {
  try {
    // User is already set by auth middleware
    const user = req.user;
    
    res.status(200).json({
      success: true,
      user: {
        _id: user._id,
        name: user.name,
        email: user.email
      }
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Something went wrong',
      error: error.message
    });
  }
};

// Register a new user
exports.register = async (req, res) => {
const { name, email, password } = req.body;
try {
// Check if the user already exists
const existingUser = await User.findOne({ email });
if (existingUser) {
return res.status(400).json({ 
success: false,
message: 'User already exists' 
});
}

// Create a new user
const user = new User({ name, email, password });
await user.save();

// Generate token
const token = jwt.sign(
{ userId: user._id },
process.env.JWT_SECRET || 'your-secret-key',
{ expiresIn: '24h' }
);

res.status(201).json({
success: true,
message: 'User registered successfully',
token,
user: {
_id: user._id,
name: user.name,
email: user.email
}
});
} catch (error) {
res.status(500).json({
success: false,
message: 'Something went wrong',
error: error.message
});
}
};

// Login a user
exports.login = async (req, res) => {
const { email, password } = req.body;
try {
// Check if the user exists
const user = await User.findOne({ email });
if (!user) {
return res.status(400).json({
success: false,
message: 'Invalid credentials'
});
}

// Compare passwords (plain text in this simple version)
if (user.password !== password) {
return res.status(400).json({
success: false,
message: 'Invalid credentials'
});
}

// Generate token
const token = jwt.sign(
{ userId: user._id },
process.env.JWT_SECRET || 'your-secret-key',
{ expiresIn: '24h' }
);

res.status(200).json({
success: true,
message: 'Login successful',
token,
user: {
_id: user._id,
name: user.name,
email: user.email
}
});
} catch (error) {
res.status(500).json({
success: false,
message: 'Something went wrong',
error: error.message
});
}
};
const User = require('../models/User');
// Register a new user
exports.register = async (req, res) => {
const { email, password } = req.body;
try {
// Check if the user already exists
const existingUser = await User.findOne({ email });
if (existingUser) {
return res.status(400).json({ message: 'User already exists' });
}
// Create a new user
const user = new User({ email, password });
await user.save();
res.status(201).json({
success: true,
message: 'User registered successfully',
data: user
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
res.status(200).json({
success: true,
message: 'Login successful',
data: user
});
} catch (error) {
res.status(500).json({
success: false,
message: 'Something went wrong',
error: error.message
});
}
};
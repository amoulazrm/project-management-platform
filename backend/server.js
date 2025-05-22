require('dotenv').config(); // Load environment variables

const express = require('express');
const cors = require('cors'); // Import CORS package
const app = express();

const connectDB = require('./src/config/db'); // MongoDB connection
const authRoutes = require('./src/routes/authRoutes');
const taskRoutes = require('./src/routes/taskRoutes');
const projectRoutes = require('./src/routes/projectRoutes');


// Connect to MongoDB
connectDB();

app.use(cors()); // Enable CORS for all origins

app.use(express.json()); // Middleware to parse JSON

// Routes
app.use('/api/auth', authRoutes);
app.use('/api/tasks', taskRoutes);
app.use('/api/projects', projectRoutes);

// Default Route
app.get('/', (req, res) => {
  res.send('Welcome to the API!');
});

// Server setup
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

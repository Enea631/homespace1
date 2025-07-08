const express = require('express');
const dotenv = require('dotenv');
const cors = require('cors');
const connectDB = require('./db');
const contactRoute = require('./route/ContactRoute');
const proRoute = require('./route/proRoute');
const AgentRoute = require('./route/AgentRoute')
const path = require('path');
const auth = require('./route/auth')


dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

// Root route for testing
app.get('/', (req, res) => {
  res.send('API is running...');
});

// Serve static images
app.use('/images', express.static(path.join(__dirname, 'images')));

// Connect to database
connectDB();

// Routes
app.use('/api/contact', contactRoute);
app.use('/api/properties', proRoute);
app.use('/api/agents', AgentRoute);
app.use("/api/auth", auth);

// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ message: 'Server Error', error: err.message });
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});

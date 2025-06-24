const express = require('express');
const dotenv = require('dotenv');
const cors = require('cors');
const connectDB = require('./db');
const contactRoute = require('./route/ContactRoute');
const proRoute = require('./route/proRoute');
const path = require('path');
const prListRoute = require('./route/prListRoute')

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

// Serve static images from /images folder
app.use('/images', express.static(path.join(__dirname, 'images')));

connectDB();

app.use('/api/contact', contactRoute);
app.use('/api/properties', proRoute);
app.use('/api/propertieslist', prListRoute);


const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});

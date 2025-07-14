const express = require('express');
const multer = require('multer');
const path = require('path');
const Agent = require('../models/Agent');
const jwt = require('jsonwebtoken');

const router = express.Router();

// Setup multer storage
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'images/'); // make sure this folder exists
  },
  filename: (req, file, cb) => {
    const ext = path.extname(file.originalname);
    cb(null, Date.now() + ext);
  }
});

const upload = multer({ storage });

// Middleware to verify JWT token and extract user info
function verifyToken(req, res, next) {
  const authHeader = req.headers.authorization;
  if (!authHeader) return res.status(401).json({ message: 'No token provided' });

  const token = authHeader.split(' ')[1];
  if (!token) return res.status(401).json({ message: 'No token provided' });

  jwt.verify(token, 'secretkey', (err, decoded) => {
    if (err) return res.status(401).json({ message: 'Invalid token' });
    req.user = decoded; // contains id and role
    next();
  });
}

// GET logged-in agent info
router.get('/me', verifyToken, async (req, res) => {
  try {
    const agent = await Agent.findById(req.user.id).select('-password');
    if (!agent) return res.status(404).json({ message: 'Agent not found' });
    res.json(agent);
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
});

// CREATE new agent with optional image upload
router.post('/', upload.single('image'), async (req, res) => {
  try {
    const { name, email, phone, description } = req.body;
    const imageUrl = req.file ? `/images/${req.file.filename}` : null;

    const newAgent = new Agent({ name, email, phone, description, imageUrl });
    const savedAgent = await newAgent.save();

    res.status(201).json(savedAgent);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

// READ all agents
router.get('/', async (req, res) => {
  try {
    const agents = await Agent.find();
    res.json(agents);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// READ single agent by ID
router.get('/:id', async (req, res) => {
  try {
    const agent = await Agent.findById(req.params.id);
    if (!agent) return res.status(404).json({ error: 'Agent not found' });
    res.json(agent);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// UPDATE agent by ID with optional image upload
router.put('/:id', upload.single('image'), async (req, res) => {
  try {
    const { name, email, phone, description } = req.body;
    const updateData = { name, email, phone, description };

    if (req.file) {
      updateData.imageUrl = `/images/${req.file.filename}`;
    }

    const updatedAgent = await Agent.findByIdAndUpdate(req.params.id, updateData, { new: true });
    if (!updatedAgent) return res.status(404).json({ error: 'Agent not found' });

    res.json(updatedAgent);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

// DELETE agent by ID
router.delete('/:id', async (req, res) => {
  try {
    const deletedAgent = await Agent.findByIdAndDelete(req.params.id);
    if (!deletedAgent) return res.status(404).json({ error: 'Agent not found' });

    res.json({ message: 'Agent deleted' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;

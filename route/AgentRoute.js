const express = require('express');
const multer = require('multer');
const path = require('path');
const Agent = require('../models/Agent');

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

// CREATE new agent with image upload
router.post('/', upload.single('image'), async (req, res) => {
  try {
    const { name, description } = req.body;
    const imageUrl = req.file ? `/images/${req.file.filename}` : null;

    const newAgent = new Agent({ name, description, imageUrl });
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

// UPDATE agent by ID (optional image upload)
router.put('/:id', upload.single('image'), async (req, res) => {
  try {
    const { name, description } = req.body;
    const updateData = { name, description };

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

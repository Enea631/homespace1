const express = require('express');
const multer = require('multer');
const path = require('path');
const House = require('../models/properties');

const router = express.Router();

// Setup multer storage - files go to 'images/' with timestamped filenames
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'images/'); // ensure this folder exists
  },
  filename: function (req, file, cb) {
    const ext = path.extname(file.originalname);
    cb(null, Date.now() + ext);
  }
});

const upload = multer({ storage });

// CREATE a new house with multiple image upload
router.post('/', upload.array('images', 5), async (req, res) => {
  try {
    const { body, files } = req;

    // Map uploaded files to URLs for frontend access
    const imageUrls = files.map(file => `/images/${file.filename}`);

    const houseData = {
      ...body,
      imageUrls
    };

    // Optionally, you want to store the agent id from body if provided:
    // Make sure agent field exists in House schema
    // e.g. houseData.agent = body.agent;

    const house = new House(houseData);
    const savedHouse = await house.save();

    res.status(201).json(savedHouse);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// READ all houses, filter by agent if query param exists
router.get('/', async (req, res) => {
  try {
    const filter = {};
    if (req.query.agent) {
      filter.agent = req.query.agent;
    }
    const houses = await House.find(filter);
    res.json(houses);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// READ single house by ID
router.get('/:id', async (req, res) => {
  try {
    const house = await House.findById(req.params.id);
    if (!house) return res.status(404).json({ error: 'House not found' });
    res.json(house);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// UPDATE house by ID, optional new images upload
router.put('/:id', upload.array('images', 5), async (req, res) => {
  try {
    const { body, files } = req;

    // If new images uploaded, replace imageUrls with new ones
    if (files && files.length > 0) {
      body.imageUrls = files.map(file => `/images/${file.filename}`);
    }

    const updatedHouse = await House.findByIdAndUpdate(req.params.id, body, { new: true });
    if (!updatedHouse) return res.status(404).json({ error: 'House not found' });

    res.json(updatedHouse);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// DELETE house by ID
router.delete('/:id', async (req, res) => {
  try {
    const deletedHouse = await House.findByIdAndDelete(req.params.id);
    if (!deletedHouse) return res.status(404).json({ error: 'House not found' });

    res.json({ message: 'House deleted' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;

const express = require('express');
const multer = require('multer');
const path = require('path');
const House = require('../models/properties');

const router = express.Router();

// Setup multer storage - stores files in 'uploads/' folder with original filename
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'uploads/'); // make sure this folder exists or create it
  },
  filename: function (req, file, cb) {
    // Use timestamp + original file extension to avoid overwrites
    const ext = path.extname(file.originalname);
    cb(null, Date.now() + ext);
  }
});

const upload = multer({ storage });

// CREATE a new house with image upload (array of images)
router.post('/', upload.array('images', 5), async (req, res) => {
  try {
    const { body, files } = req;

    // Map uploaded files to URLs or paths
    // For example, if you serve 'uploads' as static, you can store relative URLs
    const imageUrls = files.map(file => `/uploads/${file.filename}`);

    // Combine body and imageUrls to create house
    const houseData = {
      ...body,
      imageUrls
    };

    const house = new House(houseData);
    const savedHouse = await house.save();

    res.status(201).json(savedHouse);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// READ all houses
router.get('/', async (req, res) => {
  try {
    const houses = await House.find();
    res.json(houses);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// READ a single house by ID
router.get('/:id', async (req, res) => {
  try {
    const house = await House.findById(req.params.id);
    if (!house) return res.status(404).json({ error: 'House not found' });
    res.json(house);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// UPDATE a house by ID (optional image upload)
router.put('/:id', upload.array('images', 5), async (req, res) => {
  try {
    const { body, files } = req;

    // If new images uploaded, add their URLs
    if (files && files.length > 0) {
      body.imageUrls = files.map(file => `/uploads/${file.filename}`);
    }

    const updatedHouse = await House.findByIdAndUpdate(
      req.params.id,
      body,
      { new: true }
    );

    if (!updatedHouse) return res.status(404).json({ error: 'House not found' });
    res.json(updatedHouse);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// DELETE a house by ID
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

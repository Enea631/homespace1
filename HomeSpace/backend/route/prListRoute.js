// routes/propertyListRoutes.js
import express from 'express';
import PropertyList from '../models/prList.js';  // Adjust path if needed

const router = express.Router();

// GET all properties
router.get('/', async (req, res) => {
  try {
    const properties = await PropertyList.find();
    res.json(properties);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// GET a single property by ID
router.get('/:id', async (req, res) => {
  try {
    const property = await PropertyList.findById(req.params.id);
    if (!property) return res.status(404).json({ error: 'Property not found' });
    res.json(property);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// POST a new property
router.post('/', async (req, res) => {
  try {
    const newProperty = new PropertyList(req.body);
    const savedProperty = await newProperty.save();
    res.status(201).json(savedProperty);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// PUT update a property by ID
router.put('/:id', async (req, res) => {
  try {
    const updatedProperty = await PropertyList.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );
    if (!updatedProperty) return res.status(404).json({ error: 'Property not found' });
    res.json(updatedProperty);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// DELETE a property by ID
router.delete('/:id', async (req, res) => {
  try {
    const deletedProperty = await PropertyList.findByIdAndDelete(req.params.id);
    if (!deletedProperty) return res.status(404).json({ error: 'Property not found' });
    res.json({ message: 'Property deleted' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

export default router;

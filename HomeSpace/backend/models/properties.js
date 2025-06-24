const mongoose = require('mongoose');

const propertiesSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  price: {
    type: Number,
    required: true,
  },
  address: {
    street: String,
    city: String,
    state: String,
  },
  mapLink: {
    type: String, // e.g., Google Maps URL
  },
  bedrooms: {
    type: Number,
    required: true,
  },
  bathrooms: {
    type: Number,
    required: true,
  },
  size: {
    type: Number, // in square meters
    required: true,
  },
  description: {
    type: String,
  },
  imageUrls: {
    type: [String],
  },
  listedDate: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model('Property', propertiesSchema);

const mongoose = require('mongoose');

const prListSchema = new mongoose.Schema({
  title: { type: String, required: true },
  price: { type: Number, required: true },
  location: { type: String, required: true },
  imageUrl: { type: String, required: true },
}, {
  timestamps: true,
});

const PropertyList = mongoose.model('PropertyList', prListSchema);

module.exports = PropertyList;

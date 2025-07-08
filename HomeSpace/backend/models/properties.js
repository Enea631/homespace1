const mongoose = require('mongoose');

const propertiesSchema = new mongoose.Schema({
  title: { type: String, required: true },
  price: { type: Number, required: true },
  address: {
    street: String,
    city: String,
  },
  mapLink: { type: String },
  bedrooms: { type: Number, required: true },
  bathrooms: { type: Number, required: true },
  size: { type: Number, required: true },
  description: { type: String },
  imageUrls: { type: [String] },
  listedDate: { type: Date, default: Date.now },
  category: { type: String, required: true },
  propertyType: { type: String },
  agent: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Agent',
    required: true,
    index: true, // 🔹 Add index for performance
  }
});

module.exports = mongoose.model('Property', propertiesSchema);

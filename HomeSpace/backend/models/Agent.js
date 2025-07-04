const mongoose = require('mongoose');

const agentSchema = new mongoose.Schema({
  name: { type: String, required: true },
  description: String,
  imageUrl: String, 
}, { timestamps: true });

module.exports = mongoose.model('Agent', agentSchema);

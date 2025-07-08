const mongoose = require('mongoose');

const agentSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  phone: { type: String, required: true },
  description: { type: String, default: "" },
  imageUrl: { type: String, default: "" },
  isActive: { type: Boolean, default: true }
}, { timestamps: true });

// 🔹 Virtual field to get all properties for this agent
agentSchema.virtual('properties', {
  ref: 'Property',            // The model to use
  localField: '_id',          // Field on Agent
  foreignField: 'agent'       // Field on Property
});

// 🔹 Enable virtuals in toJSON and toObject
agentSchema.set('toObject', { virtuals: true });
agentSchema.set('toJSON', { virtuals: true });

module.exports = mongoose.model('Agent', agentSchema);

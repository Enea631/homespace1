const mongoose = require('mongoose');

const agentSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true }, // for login/contact
  password: { type: String, required: true }, // store hashed password
  phone: { type: String, required: true }, // agent phone number
  description: { type: String, default: "" },
  imageUrl: { type: String, default: "" }, // profile picture
  isActive: { type: Boolean, default: true } // can be used to disable login
}, { timestamps: true });

module.exports = mongoose.model('Agent', agentSchema);

// routes/auth.js
const express = require('express');
const router = express.Router();
const User = require('../models/user');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

router.post('/login', async (req, res) => {
  const { name, password } = req.body;
  console.log('🟡 Login request body:', req.body);

  try {
    const user = await User.findOne({ name });
    if (!user) {
      console.log('🔴 No user found with name:', name);
      return res.status(400).json({ message: 'Invalid credentials' });
    }

    console.log('🟢 Found user:', user.name);
    console.log('🔑 Comparing password:', password, 'with hash:', user.password);

    const match = await bcrypt.compare(password, user.password);
    if (!match) {
      console.log('🔴 Password mismatch');
      return res.status(400).json({ message: 'Invalid credentials' });
    }

    const token = jwt.sign({ id: user._id, role: user.role }, 'secretkey', { expiresIn: '1h' });

    console.log('✅ Login successful for:', user.name);
    res.json({ token, user: { id: user._id, name: user.name, role: user.role } });
  } catch (err) {
    console.error('🔥 Server error during login:', err);
    res.status(500).json({ message: 'Server error' });
  }
});




module.exports = router;

const mongoose = require('mongoose')

const connectDB = async () => {
  try {
    await mongoose.connect("mongodb+srv://eneaburimi910:1234abc@cluster0.lfsswp9.mongodb.net/")
    console.log(' MongoDB connected')
  } catch (err) {
    console.error(' MongoDB connection failed:', err.message)
    process.exit(1)
  }
}

module.exports = connectDB

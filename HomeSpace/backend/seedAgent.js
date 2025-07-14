const mongoose = require('mongoose');

const Agent = require('./models/Agent');

// Connect to MongoDB
mongoose.connect("mongodb+srv://eneaburimi910:1234abc@cluster0.lfsswp9.mongodb.net/", {
  useNewUrlParser: true,
  useUnifiedTopology: true,
}).then(() => console.log("MongoDB connected"))
  .catch((err) => console.error("Connection error:", err));

const seedAgents = async () => {
  try {
    // Clear existing agents
    await Agent.deleteMany({});

  
    const agents = [
      {
        name: 'Abedin Ismeti',
        email: 'john@example.com',
        phone: '0681234567',
        description: 'Experienced in city apartments.',
        imageUrl: '/images/agent1.jpg',
      },
      {
        name: 'Elira Dauti',
        email: 'elira@example.com',
        phone: '0698765432',
        description: 'Luxury villa specialist.',
        imageUrl: '/images/agent3.jpg',
      },
      {
        name: 'Ardit Kola',
        email: 'ardit@example.com',
        phone: '0671237890',
        description: 'Focused on rental listings.',
        imageUrl: '/images/agent2.jpg',
      },
      {
        name: 'Linda Meta',
        email: 'linda@example.com',
        phone: '0689988776',
        description: 'Helping families find homes.',
        imageUrl: '/images/agent4.jpg',
      }
    ];

    await Agent.insertMany(agents);
    console.log('Agents seeded successfully!');
  } catch (error) {
    console.error('Seeding failed:', error);
  } finally {
    mongoose.disconnect();
  }
};

seedAgents();




















































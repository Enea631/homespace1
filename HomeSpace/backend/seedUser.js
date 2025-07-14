const mongoose = require('mongoose');
const User = require('./models/user');
const Agent = require('./models/Agent'); // ✅ Make sure path is correct

async function seedUsers() {
  console.log('🌱 Starting seed script...');

  await mongoose.connect("mongodb+srv://eneaburimi910:1234abc@cluster0.lfsswp9.mongodb.net/", {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  });

  console.log('✅ Connected to MongoDB');

  // 🔍 Fetch existing agents
  const agents = await Agent.find({});

  const staffAgentMap = {
    staff1: agents.find(a => a.name === "Abedin Ismeti")?._id,
    staff2: agents.find(a => a.name === "Elira Dauti")?._id,
    staff3: agents.find(a => a.name === "Ardit Kola")?._id,
    staff4: agents.find(a => a.name === "Linda Meta")?._id,
  };

  // ✅ Plain text passwords (they'll be hashed by the model)
  const users = [
    { name: 'admin', password: '1', role: 'admin' },
    { name: 'staff1', password: '1', role: 'staff', agent: staffAgentMap.staff1 },
    { name: 'staff2', password: '1', role: 'staff', agent: staffAgentMap.staff2 },
    { name: 'staff3', password: '1', role: 'staff', agent: staffAgentMap.staff3 },
    { name: 'staff4', password: '1', role: 'staff', agent: staffAgentMap.staff4 },
  ];

  await User.deleteMany({});
  console.log('🧹 Removed old users');

  for (const userData of users) {
    const user = new User({
      name: userData.name,
      password: userData.password, // ✅ plain password
      role: userData.role,
      agent: userData.agent,
    });

    await user.save();
    console.log(`✅ Created user: ${user.name}`);
  }

  console.log('✅ All users seeded!');
  await mongoose.disconnect();
}

seedUsers();

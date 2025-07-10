const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const User = require('./models/user');
const Agent = require('./models/Agent'); // make sure path is correct

async function seedUsers() {
  console.log('🌱 Starting seed script...');

  await mongoose.connect("mongodb+srv://eneaburimi910:1234abc@cluster0.lfsswp9.mongodb.net/", {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  });

  console.log('✅ Connected to MongoDB');

  // Fetch existing agents by name or email to get their _ids
  const agents = await Agent.find({});

  // Map your staff users to agents here by agent name or email
  // Example: staff1 -> agent "Abedin Ismeti", staff2 -> "Elira Dauti", etc.
  const staffAgentMap = {
    staff1: agents.find(a => a.name === "Abedin Ismeti")?._id,
    staff2: agents.find(a => a.name === "Elira Dauti")?._id,
    staff3: agents.find(a => a.name === "Ardit Kola")?._id,
    staff4: agents.find(a => a.name === "Linda Meta")?._id,
  };

  const users = [
    { name: 'admin', password: 'admin123', role: 'admin' },
    { name: 'staff1', password: 'staff1', role: 'staff', agent: staffAgentMap.staff1 },
    { name: 'staff2', password: 'staff2', role: 'staff', agent: staffAgentMap.staff2 },
    { name: 'staff3', password: 'staff3', role: 'staff', agent: staffAgentMap.staff3 },
    { name: 'staff4', password: 'staff4', role: 'staff', agent: staffAgentMap.staff4 },
  ];

  await User.deleteMany({});
  console.log('🧹 Removed old users');

  for (const userData of users) {
    // Hash password before saving
    const hashedPassword = await bcrypt.hash(userData.password, 10);
    const user = new User({
      name: userData.name,
      password: hashedPassword,
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

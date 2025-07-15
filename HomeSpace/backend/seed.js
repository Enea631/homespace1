 const mongoose = require('mongoose');
const House = require('./models/properties'); // Adjust path if needed

const MONGO_URI = "mongodb+srv://eneaburimi910:1234abc@cluster0.lfsswp9.mongodb.net/";
const agentMap = {
  'John Doe': new mongoose.Types.ObjectId('68750bf0e481d9173cd63f15'),
  'Anna Smith': new mongoose.Types.ObjectId('68750bf0e481d9173cd63f16'),
  'Michael Brown': new mongoose.Types.ObjectId('68750bf0e481d9173cd63f17'),
  'default': new mongoose.Types.ObjectId('68750bf0e481d9173cd63f18')
};

const houses = [
  {
    title: 'Modern Villa in Tirana',
    price: 230000,
    address: {
      street: 'Rruga e Elbasanit',
      city: 'Tirana',
    },
    bedrooms: 4,
    bathrooms: 2,
    size: 320,
    description: `This beautifully designed modern villa offers a perfect combination of comfort and style, featuring four spacious bedrooms and two full bathrooms. Situated in a quiet, well-established neighborhood, the house boasts an open-plan living area with large windows that flood the space with natural light. The kitchen is fully equipped with modern appliances and ample counter space, ideal for family gatherings or entertaining guests. Outside, you'll find a private garden with a covered patio perfect for alfresco dining, plus a sparkling in-ground pool for relaxation during warm Albanian summers. With easy access to schools, shopping centers, and the city center, this home provides both tranquility and convenience.`,
    imageUrls: [
      '/images/foto1.1.jpg',
      '/images/foto1.2.jpg',
      '/images/foto1.3.jpg',
      '/images/foto1.4.jpg',
    ],
    mapLink: "https://www.google.com/maps?q=41.3204322,19.8262368",
    category: "for sale",
    propertyType: "villa",
    agent: agentMap['John Doe'],
  },
  {
    title: 'Cozy Villa Near the Lake',
    price: 225000,
    address: {
      street: 'Rruga Sami Frashëri',
      city: 'Tirana',
    },
    bedrooms: 5,
    bathrooms: 3,
    size: 300,
    description: `This spacious five-bedroom villa offers a warm and inviting atmosphere just minutes from the picturesque lake of Tirana. Featuring three bathrooms and multiple living areas, the home is perfect for large families or hosting visitors. The main living room flows seamlessly into a modern kitchen with high-end finishes and a breakfast nook. Upstairs, you'll find a large game room ideal for family fun or a home theater setup. The backyard includes a covered patio and landscaped gardens that provide privacy and a peaceful retreat from city life. Located close to highways and local amenities, this villa balances natural beauty with practical convenience.`,
    imageUrls: [
      '/images/foto2.1.jpg',
      '/images/foto2.2.jpg',
      '/images/foto2.3.jpg',
      '/images/foto2.4.jpg',
    ],
    mapLink: "https://www.google.com/maps?q=41.321013,19.8139757",
    category: "for sale",
    propertyType: "villa",
    agent: agentMap['John Doe'],
  },
  {
    title: 'Luxury Villa in City Center',
    price: 450000,
    address: {
      street: 'Bulevardi Dëshmorët e Kombit',
      city: 'Tirana',
    },
    bedrooms: 4,
    bathrooms: 3,
    size: 380,
    description: `Experience city living at its finest in this stunning four-bedroom luxury villa located just steps from Tirana's vibrant city center. The home features three modern bathrooms and a spacious game room perfect for entertainment or a private home office. The open-concept layout offers elegant living and dining spaces that flow effortlessly into a chef’s kitchen equipped with premium appliances and quartz countertops. Outside, enjoy a charming front porch and a large backyard patio that overlooks a beautifully manicured garden. Additional highlights include an attached garage, smart home technology, and high-end finishes throughout, making this property a true urban oasis.`,
    imageUrls: [
      '/images/foto3.1.jpg',
      '/images/foto3.2.jpg',
      '/images/foto3.3.jpg',
      '/images/foto3.4.jpg',
    ],
    mapLink: "https://www.google.com/maps?q=41.3214731,19.8200013",
    category: "for sale",
    propertyType: "villa",
    agent: agentMap['John Doe'],
  },
  {
    title: 'Stylish Villa in Blloku',
    price: 350000,
    address: {
      street: 'Bulevardi Dëshmorët e Kombit',
      city: 'Tirana',
    },
    bedrooms: 3,
    bathrooms: 2,
    size: 230,
    description: `Nestled in the desirable Blloku neighborhood, this stylish three-bedroom, two-bathroom single-story home offers an airy open floor plan with high ceilings and abundant natural light. A cozy rock wood-burning fireplace anchors the family room, providing warmth and character. The home includes a versatile loft space that overlooks the living area, ideal for an office or creative studio. Step outside to a spacious backyard surrounded by mature trees and lush greenery, ensuring privacy and peaceful outdoor living. The primary bedroom features its own private patio and direct backyard access, perfect for relaxing mornings or evening gatherings.`,
    imageUrls: [
      '/images/foto4.1.jpg',
      '/images/foto4.2.jpg',
      '/images/foto4.3.jpg',
      '/images/foto4.4.jpg',
    ],
    mapLink: "https://www.google.com/maps?q=41.319109,19.8207495",
    category: "for sale",
    propertyType: "villa",
    agent: agentMap['Anna Smith'],
  },
  {
    title: 'Elegant Family Home',
    price: 320000,
    address: {
      street: 'Rruga e Kavajës',
      city: 'Tirana',
    },
    bedrooms: 4,
    bathrooms: 3,
    size: 280,
    description: `This elegant four-bedroom family home is designed with comfort and functionality in mind. The spacious living areas feature hardwood floors and large windows overlooking the landscaped front yard. The kitchen is equipped with modern cabinetry, stainless steel appliances, and a large island perfect for meal prep or casual dining. Upstairs, the master suite includes a walk-in closet and a luxurious en-suite bathroom with double vanities and a soaking tub. The backyard is fully fenced and ideal for children and pets, with a covered patio space for outdoor dining and entertaining. The property is located near top-rated schools and convenient shopping centers.`,
    imageUrls: [
      '/images/foto5.1.jpg',
      '/images/foto5.2.jpg',
      '/images/foto5.3.jpg',
      '/images/foto5.4.jpg',
    ],
    mapLink: "https://www.google.com/maps?q=41.316,19.826",
    category: "for sale",
    propertyType: "villa",
    agent: agentMap['John Doe'],
  },
  {
    title: 'Contemporary Home with Pool',
    price: 400000,
    address: {
      street: 'Rruga e Dibrës',
      city: 'Tirana',
    },
    bedrooms: 5,
    bathrooms: 3,
    size: 350,
    description: `This contemporary five-bedroom home boasts a sleek design with clean lines and open spaces. The heart of the home is a chef's kitchen with granite countertops, a center island, and high-end appliances. The living room opens to the backyard where you'll find a beautiful swimming pool surrounded by a stone patio and landscaped gardens, creating a private oasis. Upstairs includes a spacious master suite with a private balcony, walk-in closet, and spa-like bathroom. This property is perfect for families who enjoy indoor-outdoor living and entertaining in style.`,
    imageUrls: [
      '/images/foto6.1.jpg',
      '/images/foto6.2.jpg',
      '/images/foto6.3.jpg',
      '/images/foto6.4.jpg',
    ],
    mapLink: "https://www.google.com/maps?q=41.310,19.810",
    category: "for sale",
    propertyType: "apartament",
    agent: agentMap['Michael Brown'],
  },
  {
    title: 'Spacious Modern Villa',
    price: 480000,
    address: {
      street: 'Rruga e Kavajës',
      city: 'Tirana',
    },
    bedrooms: 4,
    bathrooms: 4,
    size: 400,
    description: `This spacious modern villa offers four large bedrooms and four full bathrooms, perfectly suited for a growing family or hosting guests. The open concept design allows for seamless flow between the kitchen, dining, and living areas, all finished with high ceilings and contemporary lighting. The outdoor space includes a large deck overlooking manicured gardens and a built-in barbecue area for outdoor entertaining. Additional features include a two-car garage, home office space, and energy-efficient systems throughout the home.`,
    imageUrls: [
      '/images/foto7.1.jpg',
      '/images/foto7.2.jpg',
      '/images/foto7.3.jpg',
      '/images/foto7.4.jpg',
    ],
    mapLink: "https://www.google.com/maps?q=41.315,19.823",
    category: "for sale",
    propertyType: "villa",
    agent: agentMap['John Doe'],
  },
  {
    title: 'Modern Apartment in Downtown',
    price: 1200,
    address: {
      street: 'Rruga e Elbasanit',
      city: 'Tirana',
    },
    bedrooms: 2,
    bathrooms: 1,
    size: 85,
    description: `Located in the vibrant downtown district, this modern two-bedroom apartment offers city living at its best. The open-plan living and dining area feature floor-to-ceiling windows that provide stunning views of the city skyline. The kitchen is fitted with sleek cabinetry and modern appliances, including a dishwasher and built-in microwave. Residents enjoy secure parking, a fitness center, and easy access to public transportation, shopping, and restaurants. This apartment is ideal for young professionals or couples looking for a stylish urban home.`,
    imageUrls: [
      '/images/foto8.1.jpg',
      '/images/foto8.2.jpg',
      '/images/foto8.3.jpg',
      '/images/foto8.4.jpg',
    ],
    mapLink: "https://www.google.com/maps?q=41.321,19.823",
    category: "for rent",
    propertyType: "apartament",
    agent: agentMap['Anna Smith'],
  },
  {
    title: 'Cozy Studio',
    price: 700,
    address: {
      street: 'Rruga Sami Frashëri',
      city: 'Tirana',
    },
    bedrooms: 1,
    bathrooms: 1,
    size: 45,
    description: `This charming studio apartment offers a compact yet functional living space, perfect for singles or students. The unit includes a small kitchen with modern appliances, a cozy living area, and a bathroom with updated fixtures. Located in a lively neighborhood with cafes, shops, and easy access to public transit, it is ideal for those seeking affordable city living without sacrificing convenience.`,
    imageUrls: [
      '/images/foto9.1.jpg',
      '/images/foto9.2.jpg',
      '/images/foto9.3.jpg',
      '/images/foto9.4.jpg',
    ],
    mapLink: "https://www.google.com/maps?q=41.320,19.815",
    category: "for rent",
    propertyType: "apartament",
    agent: agentMap['Michael Brown'],
  },
  {
    title: 'Luxury Penthouse',
    price: 3500,
    address: {
      street: 'Bulevardi Dëshmorët e Kombit',
      city: 'Tirana',
    },
    bedrooms: 3,
    bathrooms: 2,
    size: 150,
    description: `This luxury penthouse offers panoramic city views from its large terrace, featuring three bedrooms and two bathrooms. The modern kitchen opens to the spacious living and dining areas, designed for both entertaining and relaxation. High-end finishes and smart home features make this a standout residence in Tirana's most prestigious building. Residents have access to a rooftop pool, gym, and 24/7 security.`,
    imageUrls: [
      '/images/foto10.1.jpg',
      '/images/foto10.2.jpg',
      '/images/foto10.3.jpg',
      '/images/foto10.4.jpg',
    ],
    mapLink: "https://www.google.com/maps?q=41.322,19.820",
    category: "for rent",
    propertyType: "apartament",
    agent: agentMap['Anna Smith'],
  },
  {
    title: 'Charming Family Villa',
    price: 275000,
    address: {
      street: 'Rruga e Dibrës',
      city: 'Tirana',
    },
    bedrooms: 4,
    bathrooms: 2,
    size: 310,
    description: `Located in a quiet residential area, this charming four-bedroom villa combines classic architecture with modern amenities. The home features two bathrooms, a large kitchen with an adjoining dining room, and a spacious living room with a fireplace. The outdoor area includes a covered patio and a large backyard with mature trees, perfect for family gatherings or outdoor activities.`,
    imageUrls: [
      '/images/foto11.1.jpg',
      '/images/foto11.2.jpg',
      '/images/foto11.3.jpg',
      '/images/foto11.4.jpg',
    ],
    mapLink: "https://www.google.com/maps?q=41.317,19.817",
    category: "for sale",
    propertyType: "villa",
    agent: agentMap['Michael Brown'],
  },
  {
    title: 'Elegant Downtown Apartment',
    price: 1400,
    address: {
      street: 'Rruga e Kavajës',
      city: 'Tirana',
    },
    bedrooms: 2,
    bathrooms: 1,
    size: 90,
    description: `This elegant two-bedroom apartment offers modern amenities and stylish finishes in the heart of downtown Tirana. Featuring a fully equipped kitchen, hardwood floors, and a private balcony, it is perfect for professionals or small families. Secure parking and building amenities add to the convenience.`,
    imageUrls: [
      '/images/foto12.1.jpg',
      '/images/foto12.2.jpg',
      '/images/foto12.3.jpg',
      '/images/foto12.4.jpg',
    ],
    mapLink: "https://www.google.com/maps?q=41.319,19.822",
    category: "for rent",
    propertyType: "apartament",
    agent: agentMap['John Doe'],
  },
  {
    title: 'Modern Family Home',
    price: 310000,
    address: {
      street: 'Rruga Sami Frashëri',
      city: 'Tirana',
    },
    bedrooms: 4,
    bathrooms: 3,
    size: 295,
    description: `This modern family home features four bedrooms, three bathrooms, and a spacious open-plan living area with hardwood flooring. The kitchen includes stainless steel appliances and a breakfast bar. The backyard is fully fenced and includes a deck for outdoor entertaining.`,
    imageUrls: [
      '/images/foto13.1.jpg',
      '/images/foto13.2.jpg',
      '/images/foto13.3.jpg',
      '/images/foto13.4.jpg',
    ],
    mapLink: "https://www.google.com/maps?q=41.320,19.818",
    category: "for sale",
    propertyType: "villa",
    agent: agentMap['Anna Smith'],
  },
  {
    title: 'Cozy Suburban Apartment',
    price: 900,
    address: {
      street: 'Rruga e Elbasanit',
      city: 'Tirana',
    },
    bedrooms: 2,
    bathrooms: 1,
    size: 75,
    description: `This cozy suburban apartment offers two bedrooms and one bathroom with modern fixtures. The kitchen is open to the living area and includes updated appliances. Residents enjoy access to nearby parks and public transportation.`,
    imageUrls: [
      '/images/foto14.1.jpg',
      '/images/foto14.2.jpg',
      '/images/foto14.3.jpg',
      '/images/foto14.4.jpg',
    ],
    mapLink: "https://www.google.com/maps?q=41.321,19.819",
    category: "for rent",
    propertyType: "apartament",
    agent: agentMap['Michael Brown'],
  },
  {
    title: 'Spacious Villa with Garden',
    price: 390000,
    address: {
      street: 'Rruga e Kavajës',
      city: 'Tirana',
    },
    bedrooms: 5,
    bathrooms: 4,
    size: 410,
    description: `This spacious villa offers five bedrooms and four bathrooms with ample living space for a large family. The home features a large garden area, perfect for children and pets, and a covered patio for outdoor dining. The kitchen is fully equipped with modern appliances and includes a breakfast nook.`,
    imageUrls: [
      '/images/foto15.1.jpg',
      '/images/foto15.2.jpg',
      '/images/foto15.3.jpg',
      '/images/foto15.4.jpg',
    ],
    mapLink: "https://www.google.com/maps?q=41.318,19.824",
    category: "for sale",
    propertyType: "villa",
    agent: agentMap['John Doe'],
  },
];

async function seed() {
  try {
    await mongoose.connect(MONGO_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log('MongoDB connected');

    // Clear existing data
    await House.deleteMany({});
    console.log('Existing houses removed');

    // Insert new houses
    await House.insertMany(houses);
    console.log('Houses inserted successfully');

    mongoose.disconnect();
  } catch (error) {
    console.error('Error seeding database:', error);
  }
}

seed();

import mongoose from 'mongoose';
import House from './models/properties.js';

const MONGO_URI = "mongodb+srv://eneaburimi910:1234abc@cluster0.lfsswp9.mongodb.net/homespace"; // Replace with your actual DB name

const houses = [
    {
        title: 'Modern Villa in Tirana',
        price: 230000,
        location: 'Tirana, Albania',
        address: {
            street: 'Rruga e Elbasanit',
            city: 'Tirana',
        },
        bedrooms: 4,
        bathrooms: 2,
        size: 320,
        description: "Welcome to this well-maintained and deceptively modest single-story home featuring 4 bedrooms, 2 bathrooms, and a layout perfect for both privacy and family living. Located in a peaceful residential neighborhood just minutes from Tirana's city center, this charming home offers a blend of comfort, functionality, and character.The cozy yet open- concept living and dining area flows seamlessly into a practical galley kitchen, making it ideal for both everyday use and entertaining.A sun - filled family room opens up to a private backyard complete with a covered patio and in -ground pool, perfect for relaxing or enjoying warm Tirana afternoons.The primary suite serves as a quiet retreat, while the additional bedrooms offer flexible space for guests, a home office, or growing families.With an attached two - car garage, classic brick exterior and easy access to major highways, shopping, and schools, this home combines suburban tranquility with urban convenience—all in one of Tirana most recognizable neighborhoods.",
        imageUrls: [
            '/images/foto1.1.jpg',
            '/images/foto1.2.jpg',
            '/images/foto1.3.jpg',
            '/images/foto1.4.jpg',
        ],
        mapLink: "https://www.google.com/maps?q=41.3204322,19.8262368",
    },
    {
        title: 'Cozy villa',
        price: 225000,
        location: 'Tirana, Albania',
        address: {
            street: 'Rruga Sami Frashëri',
            city: 'Tirana',
        },
        bedrooms: 5,
        bathrooms: 3,
        size: 300,
        description: ' Welcome a beautifully maintained 5-bedroom, 3-bathroom home built in 2018. Offering the perfect mix of modern design, space, and location. This two-story gem features a private office, a large upstairs game room, and a downstairs primary bedroom with a full bath, perfect for multigenerational living. The remaining 4 bedrooms are upstairs. The spacious kitchen opens up to the living and dining areas, while the upstairs loft offers a second living space perfect for movie nights, a home gym, or play area. Step outside to your beautiful backyard featuring a covered patio-ideal for relaxing, grilling, or enjoying outdoor time year-round. Located just steps from the lake of Tirana, this home offers an easy commute to highways, main roads and countless shopping, dining, and entertainment options nearby. Dont miss out on this move-in ready home in a friendly community, close to all the action!',
        imageUrls: [
            '/images/foto2.1.jpg',
            '/images/foto2.2.jpg',
            '/images/foto2.3.jpg',
            '/images/foto2.4.jpg',
        ],
        mapLink: "https://www.google.com/maps?q=41.321013,19.8139757",
    },
    {
        title: 'Luxury villa in City Center',
        price: 450000,
        location: 'Tirana, Albania',
        address: {
            street: 'Bulevardi Dëshmorët e Kombit',
            city: 'Tirana',
        },
        bedrooms: 4,
        bathrooms: 2,
        size: 380,
        description: "Beautiful 4-bedroom home with a game room aswell. Prime location near the city Centre. Welcome to this spacious and versatile two-story home featuring 4 bedrooms, 3 bathrooms, and plenty of room to grow! Thoughtfully designed, the primary suite is located downstairs for added privacy, while three additional bedrooms and a large game room are upstairs, perfect for family living or entertaining. The open-concept living and dining areas flow into a modern kitchen, making it the heart of the home. Step outside to enjoy a beautiful front porch and a large back patio overlooking a nicely sized backyard, perfect for relaxing or hosting gatherings. Highlights include: Primary bedroom downstairs.Upstairs game room.A front porch & a large back patio. Great yard space and easy access to mostly any place in Tirana",


        imageUrls: [
            '/images/foto3.1.jpg',
            '/images/foto3.2.jpg',
            '/images/foto3.3.jpg',
            '/images/foto3.4.jpg',
        ],
        mapLink: "https://www.google.com/maps?q=41.3214731,19.8200013",
    },
    {
        title: 'Stylish villa in Blloku',
        price: 350000,
        location: 'Tirana, Albania',
        address: {
            street: 'Bulevardi Dëshmorët e Kombit',
            city: 'Tirana',
        },
        bedrooms: 3,
        bathrooms: 2,
        size: 230,
        description: 'This charming single-story home features three bedrooms and two bathrooms and is located in the desirable Lake Of Tirana. The beautiful open floor plan allows for plenty of natural light throughout, with high ceilings in the family room that includes a cozy rock wood-burning fireplace. Additionally, there is a loft area measuring 15x10, which opens to the living area and would be perfect for an office and not included in the total square footage. This loft features a large window that overlooks a lush backyard with mature trees, providing a view of the amazing greenbelt, complete with natural habitat and deer, ensuring privacy with no back neighbors. The primary bedroom includes a private patio and a separate entrance leading to the spacious backyard. You can enjoy multiple sitting areas beneath the mature trees, making it a great space for entertaining or relaxing. This home is located the University of Tirana. Such an amazing home is a must-see!',
        imageUrls: [
            '/images/foto4.1.jpg',
            '/images/foto4.2.jpg',
            '/images/foto4.3.jpg',
            '/images/foto4.4.jpg',
        ],
        mapLink: "https://www.google.com/maps?q=41.319109,19.8207495",
    },
];

const seedDB = async () => {
    try {
        await mongoose.connect(MONGO_URI, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        });

        console.log('MongoDB connected. Seeding...');

        await House.deleteMany();
        await House.insertMany(houses);

        console.log('Seeding completed.');
        process.exit();
    } catch (err) {
        console.error('Seeding error:', err.message);
        process.exit(1);
    }
};

seedDB();

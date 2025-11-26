const mongoose = require('mongoose');
const Brand = require('./models/Brand');
require('dotenv').config();

const seedBrands = async () => {
  try {
    // Connect to MongoDB
    await mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/salon_management');
    console.log('✅ Connected to MongoDB');

    // Clear existing brands
    await Brand.deleteMany({});
    console.log('🗑️ Cleared existing brands');

    // Initial brands data
    const initialBrands = [
      {
        name: 'KEUNE',
        description: 'Premium hair care products from Netherlands',
        image: '/keune.png',
        isActive: true
      },
      {
        name: 'L\'OREAL',
        description: 'Professional Makeup, Skin care & Hair Products',
        image: '/loreal.png',
        isActive: true
      },
      {
        name: 'jEVAL',
        description: 'Professional hair care products',
        image: '/jeval.png',
        isActive: true
      },
      {
        name: 'Dreamron',
        description: 'Professional cosmetic and beauty products',
        image: '/dreamron.jpeg',
        isActive: true
      }
    ];

    // Insert brands
    const createdBrands = await Brand.insertMany(initialBrands);
    console.log(`🌱 Seeded ${createdBrands.length} brands:`);
    createdBrands.forEach(brand => {
      console.log(`   ✓ ${brand.name} - ${brand.description}`);
    });

    console.log('✅ Brand seeding completed successfully!');
    
  } catch (error) {
    console.error('❌ Error seeding brands:', error);
  } finally {
    mongoose.connection.close();
    console.log('📊 Database connection closed');
  }
};

// Run the seed script
if (require.main === module) {
  seedBrands();
}

module.exports = seedBrands;
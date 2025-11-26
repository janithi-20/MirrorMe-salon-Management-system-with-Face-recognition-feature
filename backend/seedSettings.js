const mongoose = require('mongoose');
const Settings = require('./models/Settings');
require('dotenv').config();

const seedSettings = async () => {
  try {
    // Connect to MongoDB
    await mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/salon_management');
    console.log('✅ Connected to MongoDB');

    // Clear existing settings
    await Settings.deleteMany({});
    console.log('🗑️ Cleared existing settings');

    // Initial settings data
    const initialSettings = [
      {
        key: 'weekdays',
        category: 'businessHours',
        label: 'Weekdays',
        value: 'Monday - Friday: 9:00 AM - 6:00 PM',
        type: 'text',
        description: 'Business hours for weekdays'
      },
      {
        key: 'weekends',
        category: 'businessHours',
        label: 'Weekends',
        value: 'Saturday - Sunday: 9:00 AM - 7:00 PM',
        type: 'text',
        description: 'Business hours for weekends'
      },
      {
        key: 'phone',
        category: 'contact',
        label: 'Phone Number',
        value: '+94 77 123 4567',
        type: 'phone',
        description: 'Main phone number'
      },
      {
        key: 'email',
        category: 'contact',
        label: 'Email Address',
        value: 'info@mirrormesalon.com',
        type: 'email',
        description: 'Main email address'
      },
      {
        key: 'address',
        category: 'contact',
        label: 'Address',
        value: '123 Elegance Street, Colombo, Sri Lanka',
        type: 'textarea',
        description: 'Physical address'
      },
      {
        key: 'website',
        category: 'contact',
        label: 'Website',
        value: 'www.mirrormesalon.com',
        type: 'url',
        description: 'Website URL'
      }
    ];

    // Insert settings
    const createdSettings = await Settings.insertMany(initialSettings);
    console.log(`🌱 Seeded ${createdSettings.length} settings:`);
    createdSettings.forEach(setting => {
      console.log(`   ✓ ${setting.category}.${setting.key} = ${setting.value}`);
    });

    console.log('✅ Settings seeding completed successfully!');
    
  } catch (error) {
    console.error('❌ Error seeding settings:', error);
  } finally {
    mongoose.connection.close();
    console.log('📊 Database connection closed');
  }
};

// Run the seed script
if (require.main === module) {
  seedSettings();
}

module.exports = seedSettings;
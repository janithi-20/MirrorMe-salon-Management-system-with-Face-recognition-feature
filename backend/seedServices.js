const mongoose = require('mongoose');
const Service = require('./models/Service');
require('dotenv').config();

const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/salon_management');
    console.log('✅ MongoDB connected for service seeding');
  } catch (error) {
    console.error('❌ MongoDB connection error:', error.message);
    process.exit(1);
  }
};

const seedServices = async () => {
  try {
    // Clear existing services
    await Service.deleteMany({});
    
    // Sample services data
    const servicesData = [
      {
        category: 'Haircut & Styling',
        slug: 'haircut',
        description: 'Professional haircuts and trendy styles tailored to suit your personality and occasion.',
        categoryImage: '/haircut-images/hair.jpg',
        displayOrder: 1,
        subServices: [
          { name: 'Cut & Re-Style (Advance)', price: 4000, image: '/haircut-images/cut-restyle-advance.jpg' },
          { name: 'Fringe Cut', price: 1000, image: '/haircut-images/fringe-cut.jpg' },
          { name: 'Trim', price: 1400, image: '/haircut-images/trim.jpg' },
          { name: 'Cut & Re-Style (Regular)', price: 2900, image: '/haircut-images/cut-restyle-regular.jpg' },
          { name: 'Hair Wash & Blast Dry', price: 2000, image: '/haircut-images/hair-wash.jpg' },
          { name: 'Blow Dry - Short', price: 2400, image: '/haircut-images/blowdry-short-hair.jpg' },
          { name: 'Blow Dry - Medium', price: 3900, image: '/haircut-images/blowdry-medium-hair.jpg' },
          { name: 'Blow Dry - Long', price: 4500, image: '/haircut-images/blowdry-long-hair.jpg' },
          { name: 'Braiding Per Strand - Short', price: 1300, image: '/haircut-images/braiding-short.jpg' }
        ]
      },
      {
        category: 'Waxing',
        slug: 'waxing',
        description: 'Smooth and silky skin with safe, hygienic, and gentle waxing services.',
        categoryImage: '/waxing-images/waxing.jpg',
        displayOrder: 2,
        subServices: [
          { name: 'Full Body', price: 5900, image: '/waxing-images/full-body.jpg' },
          { name: 'Stomach', price: 950, image: '/waxing-images/stomach.jpg' },
          { name: 'Half Leg', price: 1450, image: '/waxing-images/half-legs.jpg' },
          { name: 'Half Arms', price: 1350, image: '/waxing-images/half-arms.jpg' },
          { name: 'Classic Full Legs', price: 2200, image: '/waxing-images/classic-full-legs.jpg' },
          { name: 'Classic Full Arms', price: 1800, image: '/waxing-images/classic-full-arms.jpg' }
        ]
      },
      {
        category: 'Skin Treatments',
        slug: 'skin-treatments',
        description: 'Refreshing facials and advanced skin care to keep your skin fresh, glowing, and healthy.',
        categoryImage: '/skin-images/skin.jpg',
        displayOrder: 3,
        subServices: [
          { name: 'Face Shaving', price: 4400, image: '/skin-images/faceshaving.jpg' },
          { name: 'Upper Threading', price: 200, image: '/skin-images/upperthreading.jpg' },
          { name: 'Galvanic Treatment', price: 1400, image: '/skin-images/galvanic.webp' },
          { name: 'Classic Clean Up', price: 3800, image: '/skin-images/cleanup.jpg' },
          { name: 'Brightening Clean Up (Ume Care)', price: 6800, image: '/skin-images/brightingcleanup.jpg' },
          { name: 'Basic Clean Up (Sothys)', price: 9800, image: '/skin-images/basiccleaning.jpg' }
        ]
      },
      {
        category: 'Nails',
        slug: 'nails',
        description: 'Stylish nail grooming and creative designs that give your nails a perfect finish.',
        categoryImage: '/nails-images/nails.jpg',
        displayOrder: 4,
        subServices: [
          { name: 'Gel Individual', price: 900, image: '/nails-images/gel-individual.jpg' },
          { name: 'Gel Nail Soak Off', price: 1700, image: '/nails-images/gel-nail-soak-off.jpg' },
          { name: 'Normal Color', price: 1100, image: '/nails-images/normal-colour.jpg' },
          { name: 'Gel Color (Express Mani)', price: 2300, image: '/nails-images/gel-colour-express.jpg' },
          { name: 'Nail Art Rein Stone/Sticker/ Each', price: 1800, image: '/nails-images/nail-art-rein-stone-sticker.jpg' }
        ]
      },
      {
        category: 'Manicure & Pedicure',
        slug: 'manicure-pedicure',
        description: 'Relaxing hand and foot care treatments for soft, clean, and polished results.',
        categoryImage: '/manicure-images/manicure.jpg',
        displayOrder: 5,
        subServices: [
          { name: 'Luxury Pedicure - Massage Chair', price: 8100, image: '/manicure-images/luxury-pedicure-massage-chair.jpg' },
          { name: 'Premium Pedicure', price: 6800, image: '/manicure-images/premium-pedicure.jpg' },
          { name: 'Classic Manicure', price: 2300, image: '/manicure-images/classic-manicure.jpg' },
          { name: 'Classic Pedicure', price: 2300, image: '/manicure-images/classic-pedicure.jpg' },
          { name: 'Spa Manicure', price: 4400, image: '/manicure-images/spa-manicure.jpg' },
          { name: 'Spa Pedicure', price: 4800, image: '/manicure-images/spa-pedicure.jpg' },
          { name: 'Soak Up Pedicure', price: 5800, image: '/manicure-images/soak-up-pedicure.jpg' }
        ]
      },
      {
        category: 'Dressings & Make-Up',
        slug: 'dressings',
        description: 'Expert saree draping and outfit styling for weddings, parties, and special events.',
        categoryImage: '/dressing-images/dressing.jpg',
        displayOrder: 6,
        subServices: [
          { name: 'Full Dressing (Early Morning)', price: 2500, image: '/dressing-images/full-dressing-early-morning.jpg' },
          { name: 'Full Dressing Derma', price: 6500, image: '/dressing-images/full-dressing-derma.jpg' },
          { name: 'Full Dressing Mac', price: 10300, image: '/dressing-images/full-dressing-mac.jpg' },
          { name: 'Saree Draping', price: 2000, image: '/dressing-images/saree-drapping.jpg' },
          { name: 'Make-Up (Mac)', price: 8000, image: '/dressing-images/makeup-mac.jpg' },
          { name: 'Make-Up (Derma)', price: 4200, image: '/dressing-images/makeup-derma.jpg' },
          { name: 'Hair Style', price: 3100, image: '/dressing-images/hairstyle.jpg' },
          { name: 'Add-on Eye Lashes', price: 1800, image: '/dressing-images/eye-lashes.jpg' }
        ]
      }
    ];

    // Insert sample data
    const insertedServices = await Service.insertMany(servicesData);

    console.log('✅ Services seeded successfully!');
    console.log(`📊 Created ${insertedServices.length} service categories`);
    console.log(`🛍️ Total sub-services: ${insertedServices.reduce((total, service) => total + service.subServices.length, 0)}`);

  } catch (error) {
    console.error('❌ Error seeding services:', error);
  } finally {
    mongoose.connection.close();
  }
};

// Run if called directly
if (require.main === module) {
  connectDB().then(() => seedServices());
}

module.exports = { seedServices };
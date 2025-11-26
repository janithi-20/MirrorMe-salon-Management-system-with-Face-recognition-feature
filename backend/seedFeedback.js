const mongoose = require('mongoose');
const User = require('./models/User');
const Feedback = require('./models/Feedback');

// Sample users for testing
const sampleUsers = [
  {
    customerId: 'CUST001',
    firstName: 'Sonali',
    lastName: 'De Silva',
    email: 'sonali.desilva@gmail.com',
    phoneNumber: '+94 77 123 4567',
    password: 'hashedpassword123',
    isVerified: true
  },
  {
    customerId: 'CUST002',
    firstName: 'Michael',
    lastName: 'Fernando',
    email: 'michael.fernando@gmail.com',
    phoneNumber: '+94 77 234 5678',
    password: 'hashedpassword123',
    isVerified: true
  },
  {
    customerId: 'CUST003',
    firstName: 'Jessica',
    lastName: 'Perera',
    email: 'jessica.perera@gmail.com',
    phoneNumber: '+94 77 345 6789',
    password: 'hashedpassword123',
    isVerified: true
  },
  {
    customerId: 'CUST004',
    firstName: 'Rajitha',
    lastName: 'Silva',
    email: 'rajitha.silva@gmail.com',
    phoneNumber: '+94 77 456 7890',
    password: 'hashedpassword123',
    isVerified: true
  }
];

const seedFeedback = async () => {
  try {
    // Connect to MongoDB
    await mongoose.connect('mongodb://localhost:27017/salon-management');
    console.log('🔗 Connected to MongoDB');

    // Clear existing feedback and users (for testing)
    console.log('🧹 Clearing existing feedback and test users...');
    await Feedback.deleteMany({});
    await User.deleteMany({ customerId: { $in: ['CUST001', 'CUST002', 'CUST003', 'CUST004'] } });

    // Create sample users
    console.log('👥 Creating sample users...');
    const createdUsers = await User.insertMany(sampleUsers);
    console.log(`✅ Created ${createdUsers.length} sample users`);

    // Sample feedback with different statuses
    const sampleFeedback = [
      {
        user: createdUsers[0]._id,
        name: 'Sonali De Silva',
        email: createdUsers[0].email,
        message: 'They remember my preferences and service history, which makes me feel valued. The staff is incredibly professional.',
        rating: 5,
        status: 'approved',
        approvedAt: new Date(),
        approvedBy: 'Admin'
      },
      {
        user: createdUsers[1]._id,
        name: 'Michael Fernando',
        email: createdUsers[1].email,
        message: 'The face recognition feature is a game-changer! It speeds up check-in and adds a personal touch to the whole experience.',
        rating: 4,
        status: 'approved',
        approvedAt: new Date(),
        approvedBy: 'Admin'
      },
      {
        user: createdUsers[2]._id,
        name: 'Jessica Perera',
        email: createdUsers[2].email,
        message: 'Booking appointments online is so easy and convenient compared to calling. The website is user-friendly.',
        rating: 4,
        status: 'approved',
        approvedAt: new Date(),
        approvedBy: 'Admin'
      },
      {
        user: createdUsers[3]._id,
        name: 'Rajitha Silva',
        email: createdUsers[3].email,
        message: 'Service was okay but the waiting time was too long. Could improve on time management.',
        rating: 2,
        status: 'pending'
      },
      {
        user: createdUsers[0]._id,
        name: 'Sonali De Silva',
        email: createdUsers[0].email,
        message: 'Amazing staff and great atmosphere. Will definitely come back!',
        rating: 5,
        status: 'pending'
      },
      {
        user: createdUsers[1]._id,
        name: 'Michael Fernando',
        email: createdUsers[1].email,
        message: 'Poor service quality, very disappointed with my haircut.',
        rating: 1,
        status: 'rejected',
        adminResponse: 'Thank you for your feedback. We have spoken with the stylist and are working to improve our services.'
      }
    ];

    // Create sample feedback
    console.log('💬 Creating sample feedback...');
    const createdFeedback = await Feedback.insertMany(sampleFeedback);
    console.log(`✅ Created ${createdFeedback.length} sample feedback entries`);

    // Display summary
    console.log('\\n📊 Feedback Summary:');
    const approvedCount = await Feedback.countDocuments({ status: 'approved' });
    const pendingCount = await Feedback.countDocuments({ status: 'pending' });
    const rejectedCount = await Feedback.countDocuments({ status: 'rejected' });
    
    console.log(`   Approved: ${approvedCount}`);
    console.log(`   Pending: ${pendingCount}`);
    console.log(`   Rejected: ${rejectedCount}`);
    console.log(`   Total: ${approvedCount + pendingCount + rejectedCount}`);

    console.log('\\n🎉 Feedback seeding completed successfully!');
    console.log('\\n👤 Sample Users Created:');
    createdUsers.forEach(user => {
      console.log(`   ${user.firstName} ${user.lastName} (${user.email}) - ID: ${user._id}`);
    });

    console.log('\\n🔐 You can use these user IDs to test the feedback submission API');
    
    await mongoose.connection.close();
    console.log('🔌 Database connection closed');
    
  } catch (error) {
    console.error('❌ Error seeding feedback:', error);
    process.exit(1);
  }
};

// Run the seeding
seedFeedback();
// Seed team members data
require('dotenv').config();
const mongoose = require('mongoose');
const TeamMember = require('./models/TeamMember');

const teamMembers = [
  {
    name: 'Lewis Fernandiz',
    position: 'Hair Stylist',
    specialization: 'Hair Stylist',
    experience: '5+ years experience',
    email: 'lewis@mirrorme.com',
    phone: '+94 77 123 4567',
    address: 'Colombo 03',
    salary: 85000,
    joinDate: new Date('2019-03-15'),
    status: 'active',
    specialties: ['Hair Cutting', 'Hair Styling', 'Hair Washing'],
    image: '/Lewis.jpg',
    bio: 'Expert hair stylist with over 5 years of experience in modern hair cutting and styling techniques.',
    displayOrder: 1
  },
  {
    name: 'Angela Diano',
    position: 'Junior Hair Stylist',
    specialization: 'Junior Hair Stylist',
    experience: '1+ years experience',
    email: 'angela@mirrorme.com',
    phone: '+94 77 234 5678',
    address: 'Colombo 07',
    salary: 45000,
    joinDate: new Date('2024-01-10'),
    status: 'active',
    specialties: ['Hair Cutting', 'Hair Washing'],
    image: '/Angela.jpg',
    bio: 'Passionate junior hair stylist focused on learning and delivering excellent hair care services.',
    displayOrder: 2
  },
  {
    name: 'Kylie Nellina',
    position: 'Nail Artist',
    specialization: 'Nail Artist',
    experience: '3 years experience',
    email: 'kylie@mirrorme.com',
    phone: '+94 77 345 6789',
    address: 'Colombo 05',
    salary: 55000,
    joinDate: new Date('2022-06-01'),
    status: 'active',
    specialties: ['Nail Art', 'Manicure', 'Pedicure', 'Gel Nails'],
    image: '/Kylie.jpg',
    bio: 'Creative nail artist specializing in intricate nail art designs and premium nail care services.',
    displayOrder: 3
  },
  {
    name: 'Shalini Neha',
    position: 'Massage Therapist',
    specialization: 'Massage Therapist',
    experience: '5 years experience',
    email: 'shalini@mirrorme.com',
    phone: '+94 77 456 7890',
    address: 'Colombo 04',
    salary: 65000,
    joinDate: new Date('2020-09-12'),
    status: 'active',
    specialties: ['Body Massage', 'Face Massage', 'Relaxation Therapy'],
    image: '/Shalini.jpg',
    bio: 'Certified massage therapist providing relaxing and therapeutic massage treatments.',
    displayOrder: 4
  },
  {
    name: 'Ethan Kal',
    position: 'Color Specialist',
    specialization: 'Color Specialist',
    experience: '5+ years experience',
    email: 'ethan@mirrorme.com',
    phone: '+94 77 567 8901',
    address: 'Colombo 06',
    salary: 75000,
    joinDate: new Date('2019-11-20'),
    status: 'active',
    specialties: ['Hair Coloring', 'Highlights', 'Hair Treatments'],
    image: '/Ethan.jpg',
    bio: 'Professional color specialist with expertise in modern hair coloring techniques and treatments.',
    displayOrder: 5
  },
  {
    name: 'Marie De Zoya',
    position: 'Skincare Specialist',
    specialization: 'Skincare Specialist',
    experience: '4+ years experience',
    email: 'marie@mirrorme.com',
    phone: '+94 77 678 9012',
    address: 'Colombo 08',
    salary: 70000,
    joinDate: new Date('2021-02-28'),
    status: 'active',
    specialties: ['Facial Treatments', 'Skin Analysis', 'Anti-aging Treatments'],
    image: '/Marie.jpg',
    bio: 'Experienced skincare specialist focused on facial treatments and advanced skincare solutions.',
    displayOrder: 6
  }
];

async function seedTeamMembers() {
  try {
    await mongoose.connect(process.env.DB_URI || 'mongodb://localhost/salon_management');
    console.log('📚 Connected to database');

    // Clear existing team members
    await TeamMember.deleteMany({});
    console.log('🧹 Cleared existing team members');

    // Insert new team members
    const insertedMembers = await TeamMember.insertMany(teamMembers);
    console.log(`👥 Successfully seeded ${insertedMembers.length} team members`);

    // Display created team members
    console.log('\n📋 Team Members Created:');
    insertedMembers.forEach((member, index) => {
      console.log(`${index + 1}. ${member.name} - ${member.position} (${member.experience})`);
    });

    console.log('\n✅ Team members seeded successfully!');
    process.exit(0);
  } catch (error) {
    console.error('❌ Error seeding team members:', error);
    process.exit(1);
  }
}

seedTeamMembers();
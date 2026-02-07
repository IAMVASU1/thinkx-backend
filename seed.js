import mongoose from 'mongoose';
import bcryptjs from 'bcryptjs';
import dotenv from 'dotenv';

dotenv.config();

// Import models
import User from './src/models/User.model.js';
import AlumniProfile from './src/models/AlumniProfile.model.js';
import Event from './src/models/Event.model.js';
import Job from './src/models/Job.model.js';
import SuccessStory from './src/models/SuccessStory.model.js';
import Donation from './src/models/Donation.model.js';

const MONGO_URI = process.env.MONGO_URI;

async function seedDatabase() {
  try {
    // Connect to MongoDB
    await mongoose.connect(MONGO_URI);
    console.log('✅ Connected to MongoDB');

    // Clear existing data
    console.log('🗑️  Clearing existing data...');
    await Promise.all([
      User.deleteMany({}),
      AlumniProfile.deleteMany({}),
      Event.deleteMany({}),
      Job.deleteMany({}),
      SuccessStory.deleteMany({}),
      Donation.deleteMany({})
    ]);
    console.log('✅ Database cleared');

    // Hash password
    const hashedPassword = await bcryptjs.hash('password123', 10);

    // Create Users
    console.log('👥 Creating users...');
    const users = await User.insertMany([
      {
        name: 'Admin User',
        email: 'admin@alumni.com',
        password: hashedPassword,
        role: 'ADMIN',
        isActive: true
      },
      {
        name: 'Raj Kumar',
        email: 'raj@alumni.com',
        password: hashedPassword,
        role: 'ALUMNI',
        isActive: true
      },
      {
        name: 'Priya Sharma',
        email: 'priya@alumni.com',
        password: hashedPassword,
        role: 'ALUMNI',
        isActive: true
      },
      {
        name: 'Arjun Singh',
        email: 'arjun@alumni.com',
        password: hashedPassword,
        role: 'ALUMNI',
        isActive: true
      },
      {
        name: 'Test Alumni',
        email: 'alumni@test1.com',
        password: hashedPassword,
        role: 'ALUMNI',
        isActive: true
      },
      {
        name: 'Student User 1',
        email: 'student1@alumni.com',
        password: hashedPassword,
        role: 'STUDENT',
        isActive: true
      },
      {
        name: 'Student User 2',
        email: 'student2@alumni.com',
        password: hashedPassword,
        role: 'STUDENT',
        isActive: true
      }
    ]);
    console.log('✅ Created 7 users');

    // Create Alumni Profiles
    console.log('📋 Creating alumni profiles...');
    await AlumniProfile.insertMany([
      {
        user: users[1]._id,
        graduationYear: 2020,
        degree: 'B.Tech',
        department: 'Computer Science',
        currentCompany: 'Google India',
        designation: 'Software Engineer',
        location: 'Bangalore',
        bio: 'Passionate about building scalable software solutions.',
        skills: ['JavaScript', 'React', 'Node.js', 'MongoDB'],
        linkedinUrl: 'https://linkedin.com/in/raj-kumar',
        isMentor: true
      },
      {
        user: users[2]._id,
        graduationYear: 2019,
        degree: 'B.Tech',
        department: 'Information Technology',
        currentCompany: 'Microsoft',
        designation: 'Senior Developer',
        location: 'Hyderabad',
        bio: 'Expert in cloud technologies and DevOps.',
        skills: ['Python', 'AWS', 'Docker', 'Kubernetes'],
        linkedinUrl: 'https://linkedin.com/in/priya-sharma',
        isMentor: true
      },
      {
        user: users[3]._id,
        graduationYear: 2021,
        degree: 'B.Tech',
        department: 'Computer Science',
        currentCompany: 'Amazon',
        designation: 'Junior Developer',
        location: 'Mumbai',
        bio: 'Learning and growing in the tech industry.',
        skills: ['Java', 'Spring Boot', 'SQL'],
        linkedinUrl: 'https://linkedin.com/in/arjun-singh',
        isMentor: false
      },
      {
        user: users[4]._id,
        graduationYear: 2020,
        degree: 'B.Tech',
        department: 'Computer Science',
        currentCompany: 'Accenture',
        designation: 'Consultant',
        location: 'Delhi',
        bio: 'Technology consultant with 3+ years experience.',
        skills: ['Full Stack Development', 'Mobile App Development', 'System Design'],
        linkedinUrl: 'https://linkedin.com/in/test-alumni',
        isMentor: true
      }
    ]);
    console.log('✅ Created 4 alumni profiles');

    // Create Events
    console.log('📅 Creating events...');
    const events = await Event.insertMany([
      {
        title: 'Tech Talk: Web Development Trends 2024',
        description: 'Join us for an exciting discussion on latest web development trends and technologies.',
        date: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000), // 7 days from now
        location: 'Virtual - Google Meet',
        createdBy: users[1]._id,
        attendees: [users[5]._id, users[6]._id]
      },
      {
        title: 'Alumni Networking Dinner',
        description: 'Connect with fellow alumni and share your career experiences over dinner.',
        date: new Date(Date.now() + 14 * 24 * 60 * 60 * 1000), // 14 days from now
        location: 'Bangalore Club, Bangalore',
        createdBy: users[2]._id,
        attendees: [users[1]._id, users[3]._id, users[5]._id]
      },
      {
        title: 'Cloud Computing Workshop',
        description: 'Hands-on workshop on AWS and cloud architecture best practices.',
        date: new Date(Date.now() + 21 * 24 * 60 * 60 * 1000), // 21 days from now
        location: 'Microsoft Office, Hyderabad',
        createdBy: users[2]._id,
        attendees: [users[1]._id, users[6]._id]
      },
      {
        title: 'Career Development Seminar',
        description: 'Learn strategies for career growth and professional development.',
        date: new Date(Date.now() + 10 * 24 * 60 * 60 * 1000), // 10 days from now
        location: 'Online',
        createdBy: users[0]._id,
        attendees: [users[4]._id, users[5]._id, users[6]._id]
      },
      {
        title: 'Startup Pitching Event',
        description: 'Alumni entrepreneurs showcase their startup ideas and innovations.',
        date: new Date(Date.now() + 28 * 24 * 60 * 60 * 1000), // 28 days from now
        location: 'Innovation Hub, Mumbai',
        createdBy: users[3]._id,
        attendees: [users[1]._id, users[2]._id]
      }
    ]);
    console.log('✅ Created 5 events');

    // Create Jobs
    console.log('💼 Creating job postings...');
    await Job.insertMany([
      {
        title: 'Senior Full Stack Developer',
        company: 'Google India',
        description: 'We are looking for experienced full stack developers to join our team.',
        location: 'Bangalore',
        jobType: 'FULL_TIME',
        postedBy: users[1]._id,
        isActive: true
      },
      {
        title: 'Cloud Architect',
        company: 'Microsoft',
        description: 'Design and implement cloud solutions for enterprise clients.',
        location: 'Hyderabad',
        jobType: 'FULL_TIME',
        postedBy: users[2]._id,
        isActive: true
      },
      {
        title: 'React Developer',
        company: 'Startup Inc',
        description: 'Build modern web applications using React and Node.js.',
        location: 'Bangalore',
        jobType: 'FULL_TIME',
        postedBy: users[3]._id,
        isActive: true
      },
      {
        title: 'Python Backend Developer',
        company: 'Tech Solutions',
        description: 'Develop scalable backend services using Python and Django.',
        location: 'Mumbai',
        jobType: 'FULL_TIME',
        postedBy: users[4]._id,
        isActive: true
      },
      {
        title: 'Mobile App Developer (Part-time)',
        company: 'Mobile Startups',
        description: 'Build iOS and Android applications for innovative startups.',
        location: 'Remote',
        jobType: 'PART_TIME',
        postedBy: users[1]._id,
        isActive: true
      },
      {
        title: 'DevOps Internship',
        company: 'Cloud Platforms Ltd',
        description: 'Learn and work on DevOps practices and CI/CD pipelines.',
        location: 'Pune',
        jobType: 'INTERNSHIP',
        postedBy: users[2]._id,
        isActive: true
      }
    ]);
    console.log('✅ Created 6 job postings');

    // Create Success Stories
    console.log('📖 Creating success stories...');
    await SuccessStory.insertMany([
      {
        alumni: users[1]._id,
        title: 'From Intern to Senior Engineer at Google',
        story: 'Started as an intern at Google in 2018 and worked my way up to Senior Engineer. The key was continuous learning and taking on challenging projects. The alumni network played a crucial role in my career development.',
        approved: true
      },
      {
        alumni: users[2]._id,
        title: 'Leading Cloud Transformation at Microsoft',
        story: 'My journey at Microsoft has been incredible. Started as a developer and now leading cloud architecture initiatives. The skills I learned in college and the mentorship from senior alumni helped me achieve this.',
        approved: true
      },
      {
        alumni: users[3]._id,
        title: 'Startup Success: Building SaaS Product',
        story: 'I left my corporate job to start my own SaaS company. It was challenging but rewarding. The alumni network provided valuable connections and mentorship throughout the journey.',
        approved: true
      },
      {
        alumni: users[4]._id,
        title: 'Transition to Management and Leadership',
        story: 'After 4 years in development, I transitioned to management. The leadership programs and alumni mentors guided me through this transformation successfully.',
        approved: true
      }
    ]);
    console.log('✅ Created 4 success stories');

    // Create Donations
    console.log('💰 Creating donations...');
    await Donation.insertMany([
      {
        donor: users[1]._id,
        amount: 50000,
        purpose: 'Scholarship Fund',
        paymentId: 'PAY_2024_001',
        paymentStatus: 'SUCCESS'
      },
      {
        donor: users[2]._id,
        amount: 100000,
        purpose: 'Infrastructure Development',
        paymentId: 'PAY_2024_002',
        paymentStatus: 'SUCCESS'
      },
      {
        donor: users[3]._id,
        amount: 25000,
        purpose: 'Student Welfare',
        paymentId: 'PAY_2024_003',
        paymentStatus: 'SUCCESS'
      },
      {
        donor: users[4]._id,
        amount: 75000,
        purpose: 'Library Enhancement',
        paymentId: 'PAY_2024_004',
        paymentStatus: 'SUCCESS'
      },
      {
        donor: users[1]._id,
        amount: 35000,
        purpose: 'Sports Development',
        paymentId: 'PAY_2024_005',
        paymentStatus: 'SUCCESS'
      }
    ]);
    console.log('✅ Created 5 donations');

    console.log('\n✨ Database seeding completed successfully!');
    console.log('\n📊 Summary:');
    console.log('   - 7 Users created');
    console.log('   - 4 Alumni Profiles created');
    console.log('   - 5 Events created');
    console.log('   - 6 Jobs created');
    console.log('   - 4 Success Stories created');
    console.log('   - 5 Donations created');
    console.log('\n🔐 Test Credentials:');
    console.log('   Email: alumni@test1.com');
    console.log('   Password: password123');
    console.log('   Role: ALUMNI');

    process.exit(0);
  } catch (error) {
    console.error('❌ Error seeding database:', error.message);
    process.exit(1);
  }
}

// Run seeding
seedDatabase();

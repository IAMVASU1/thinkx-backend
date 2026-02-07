import mongoose from 'mongoose';
import dotenv from 'dotenv';
import User from '../src/models/User.js';
import AlumniProfile from '../src/models/AlumniProfile.js';
import Job from '../src/models/Job.js';
import JobApplication from '../src/models/JobApplication.js';
import Event from '../src/models/Event.js';
import Donation from '../src/models/Donation.js';
import Feedback from '../src/models/Feedback.js';
import SuccessStory from '../src/models/SuccessStory.js';
import Survey from '../src/models/Survey.js';

dotenv.config();

const seed = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);

    await User.deleteMany({});
    await AlumniProfile.deleteMany({});
    await Job.deleteMany({});
    await JobApplication.deleteMany({});
    await Event.deleteMany({});
    await Donation.deleteMany({});
    await Feedback.deleteMany({});
    await SuccessStory.deleteMany({});
    await Survey.deleteMany({});

    const users = await User.insertMany([
      { name: 'Ava Miller', email: 'ava@example.com', password: 'password123', role: 'ALUMNI' },
      { name: 'Noah Patel', email: 'noah@example.com', password: 'password123', role: 'ALUMNI' },
      { name: 'Mia Chen', email: 'mia@example.com', password: 'password123', role: 'ALUMNI' },
      { name: 'Admin User', email: 'admin@example.com', password: 'password123', role: 'ADMIN' }
    ]);

    await AlumniProfile.insertMany([
      {
        user: users[0]._id,
        graduationYear: 2022,
        degree: 'B.Tech',
        department: 'CSE',
        currentCompany: 'Initech',
        designation: 'Backend Engineer',
        location: 'Austin, TX',
        bio: 'Working on scalable APIs.',
        skills: ['Node.js', 'MongoDB'],
        linkedinUrl: 'https://linkedin.com/in/ava-miller',
        isMentor: true
      },
      {
        user: users[1]._id,
        graduationYear: 2021,
        degree: 'B.Tech',
        department: 'IT',
        currentCompany: 'DataPulse',
        designation: 'Data Scientist',
        location: 'Seattle, WA',
        bio: 'Data and ML enthusiast.',
        skills: ['Python', 'ML'],
        linkedinUrl: 'https://linkedin.com/in/noah-patel',
        isMentor: false
      },
      {
        user: users[2]._id,
        graduationYear: 2020,
        degree: 'B.Tech',
        department: 'ECE',
        currentCompany: 'Voltix',
        designation: 'Embedded Engineer',
        location: 'San Jose, CA',
        bio: 'IoT systems and firmware.',
        skills: ['C++', 'IoT'],
        linkedinUrl: 'https://linkedin.com/in/mia-chen',
        isMentor: true
      }
    ]);

    await Job.insertMany([
      {
        title: 'Backend Engineer',
        company: 'Initech',
        description: 'Build APIs and services for the alumni platform.',
        location: 'Austin, TX',
        postedBy: users[0]._id
      },
      {
        title: 'Data Scientist',
        company: 'DataPulse',
        description: 'Work on alumni job matching models.',
        location: 'Seattle, WA',
        postedBy: users[1]._id
      }
    ]);

    await JobApplication.insertMany([
      {
        job: (await Job.findOne({ title: 'Backend Engineer' }))._id,
        applicant: users[2]._id,
        resumeUrl: 'https://example.com/resume/mia.pdf',
        status: 'APPLIED'
      }
    ]);

    await Event.insertMany([
      {
        title: 'Alumni Meetup',
        description: 'Annual alumni networking event.',
        date: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000),
        location: 'Austin, TX',
        createdBy: users[3]._id,
        attendees: [users[0]._id, users[1]._id]
      }
    ]);

    await Donation.insertMany([
      {
        donor: users[0]._id,
        amount: 100,
        purpose: 'Scholarship Fund',
        paymentId: 'PAY123',
        paymentStatus: 'SUCCESS'
      }
    ]);

    await Feedback.insertMany([
      { user: users[1]._id, message: 'Great platform!', rating: 5 }
    ]);

    await SuccessStory.insertMany([
      {
        alumni: users[0]._id,
        title: 'From Student to Engineer',
        story: 'Started as a student mentor, now leading backend team.',
        approved: true
      }
    ]);

    await Survey.insertMany([
      {
        question: 'Which topics interest you most?',
        options: [
          { text: 'Career Guidance', count: 2 },
          { text: 'Networking', count: 5 }
        ],
        createdBy: users[3]._id
      }
    ]);

    console.log('Seed data inserted');
    process.exit(0);
  } catch (error) {
    console.error('Seed error:', error.message);
    process.exit(1);
  }
};

seed();

/**
 * Database Seeder - Populate sample data for testing
 * Run: node backend/seed.js
 */

import mongoose from 'mongoose'
import User from './models/User.js'
import Discussion from './models/Discussion.js'
import Study from './models/Study.js'
import { config } from './config/env.js'

const seedDatabase = async () => {
  try {
    // Connect to database
    await mongoose.connect(config.mongodbUri)
    console.log('Connected to MongoDB')

    // Clear existing data
    await User.deleteMany({})
    await Discussion.deleteMany({})
    await Study.deleteMany({})
    console.log('Cleared existing data')

    // Create sample users
    const users = await User.create([
      {
        fullName: 'Dr. Sarah Johnson',
        email: 'sarah.johnson@hospital.com',
        password: 'password123',
        role: 'doctor',
        specialization: 'Cardiology',
        phoneNumber: '+1-555-0100',
        bio: 'Experienced cardiologist with 10+ years of practice',
        isVerified: true,
      },
      {
        fullName: 'Dr. Ahmed Hassan',
        email: 'ahmed.hassan@clinic.com',
        password: 'password123',
        role: 'doctor',
        specialization: 'Neurology',
        phoneNumber: '+1-555-0101',
        bio: 'Specialized in neurological disorders',
        isVerified: true,
      },
      {
        fullName: 'John Patient',
        email: 'john.patient@email.com',
        password: 'password123',
        role: 'patient',
        phoneNumber: '+1-555-0102',
        bio: 'Looking for medical guidance',
        isVerified: true,
      },
      {
        fullName: 'Maria Garcia',
        email: 'maria.garcia@email.com',
        password: 'password123',
        role: 'patient',
        phoneNumber: '+1-555-0103',
        bio: 'Health enthusiast',
        isVerified: true,
      },
      {
        fullName: 'Admin User',
        email: 'admin@dronline.com',
        password: 'admin123456',
        role: 'admin',
        phoneNumber: '+1-555-0104',
        isVerified: true,
      },
    ])

    console.log(`Created ${users.length} users`)

    // Create sample discussions
    const discussions = await Discussion.create([
      {
        title: 'Managing Hypertension Naturally',
        description:
          'Looking for natural remedies and lifestyle changes to manage high blood pressure. Has anyone had success with diet and exercise modifications?',
        category: 'experiences',
        author: users[2]._id,
        tags: ['hypertension', 'lifestyle', 'prevention'],
        views: 234,
        likes: [users[0]._id, users[1]._id],
        status: 'open',
        replies: [
          {
            user: users[0]._id,
            content: 'Regular exercise and low sodium diet are crucial. I recommend consulting with a nutritionist.',
          },
          {
            user: users[3]._id,
            content: 'Stress management and meditation have helped me significantly!',
          },
        ],
      },
      {
        title: 'Recent Advances in Cardiac Imaging',
        description:
          'Discussion about the latest cardiac imaging technologies including 3D echocardiography and AI-assisted analysis.',
        category: 'research',
        author: users[0]._id,
        tags: ['cardiology', 'imaging', 'AI', 'research'],
        views: 567,
        likes: [users[1]._id, users[2]._id],
        status: 'open',
        replies: [
          {
            user: users[1]._id,
            content: 'The AI integration has significantly improved diagnostic accuracy in our clinic.',
          },
        ],
      },
      {
        title: 'Understanding Migraine Triggers',
        description: 'Share your experience with migraine triggers and what remedies work best for you.',
        category: 'questions',
        author: users[3]._id,
        tags: ['neurology', 'migraine', 'treatment'],
        views: 123,
        likes: [users[0]._id],
        status: 'open',
        replies: [],
      },
    ])

    console.log(`Created ${discussions.length} discussions`)

    // Create sample studies
    const studies = await Study.create([
      {
        title: 'Novel Treatment Approach for Type 2 Diabetes',
        description:
          'A comprehensive study on new insulin-independent treatments showing promising results in clinical trials.',
        condition: 'Diabetes',
        author: users[0]._id,
        source: 'Journal of Clinical Endocrinology',
        content:
          'Recent clinical trials show that combination therapy with GLP-1 agonists and SGLT-2 inhibitors provides superior glycemic control...',
        tags: ['diabetes', 'treatment', 'clinical-trial', 'endocrinology'],
        likes: [users[2]._id, users[3]._id],
        shares: 45,
      },
      {
        title: 'Cardiovascular Risk Factors in COVID-19 Patients',
        description: 'Analysis of long-term cardiovascular complications in COVID-19 survivors.',
        condition: 'Cardiology',
        author: users[1]._id,
        source: 'Nature Cardiovascular Research',
        content:
          'Our research indicates that COVID-19 patients have increased risk of myocardial infarction and stroke...',
        tags: ['covid-19', 'cardiology', 'risk-factors'],
        likes: [users[0]._id],
        shares: 62,
      },
      {
        title: 'Neuroplasticity in Stroke Recovery',
        description:
          'Understanding how the brain adapts and recovers after stroke through neuroplasticity mechanisms.',
        condition: 'Neurology',
        author: users[1]._id,
        source: 'Stroke Journal',
        content:
          'Recent advances in neuroimaging have revealed remarkable plasticity in stroke recovery when combined with intensive rehabilitation...',
        tags: ['stroke', 'neurology', 'rehabilitation', 'neuroplasticity'],
        likes: [users[0]._id, users[2]._id, users[3]._id],
        shares: 89,
      },
    ])

    console.log(`Created ${studies.length} studies`)

    console.log('\n✅ Database seeding completed successfully!')
    console.log('\nTest Credentials:')
    console.log('Doctor: sarah.johnson@hospital.com / password123')
    console.log('Patient: john.patient@email.com / password123')
    console.log('Admin: admin@dronline.com / admin123456')

    process.exit(0)
  } catch (error) {
    console.error('Error seeding database:', error)
    process.exit(1)
  }
}

seedDatabase()

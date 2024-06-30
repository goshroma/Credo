const path = require('path');
require('dotenv').config();
const mongoose = require('mongoose');
const connectDB = require('./db');
const User = require(path.join(__dirname, '..', 'Models', 'User'));
const Volunteer = require(path.join(__dirname, '..', 'Models', 'Volunteer'));
const NGOEvent = require(path.join(__dirname, '..', 'Models', 'NGOEvent'));

const seedData = async () => {
  try {
    
    console.log('Connecting to the database...');
    await connectDB();
    console.log('CONNECTED TO DATABASE SUCCESSFULLY');

    const existingUser = await User.findOne({ email: 'ram@example.com' });
    if (!existingUser) {
      const user1 = await User.create({
        username: 'ram123',
        email: 'ram@example.com',
        password: 'Password123!',
        dateOfBirth: new Date('2000-01-01'),
      });
      console.log('User created:', user1);
    } else {
      console.log('User already exists:', existingUser);
    }
    const existingVolunteer = await Volunteer.findOne({
      'location.city': 'New Delhi',
      'location.state': 'Delhi',
      'location.country': 'India',
    });
    if (!existingVolunteer) {
      const volunteer1 = await Volunteer.create({
        name: 'Ram Chandra',
        location: {
          city: 'New Delhi',
          state: 'Delhi',
          country: 'India',
        },
        preferences: {
          skills: ['Teaching', 'Web Development'],
          causes: ['Education', 'Technology'],
        },
      });
      console.log('Volunteer created:', volunteer1);
    } else {
      console.log('Volunteer already exists:', existingVolunteer);
    }
    const existingEvent = await NGOEvent.findOne({
      title: 'Teach Kids to Code',
      date: new Date('2024-07-15'),
      'location.city': 'New Delhi',
      'location.state': 'Delhi',
      'location.country': 'India',
    });
    if (!existingEvent) {
      const event1 = await NGOEvent.create({
        title: 'Teach Kids to Code',
        description: 'A workshop to introduce kids to programming',
        date: new Date('2024-07-15'),
        location: {
          city: 'New Delhi',
          state: 'Delhi',
          country: 'India',
        },
        requiredSkills: ['Teaching', 'Programming'],
        cause: ['Education', 'Technology'],
      });
      console.log('Event created:', event1);
    } else {
      console.log('Event already exists:', existingEvent);
    }

    console.log('Seeding completed successfully');
  } catch (error) {
    console.error(`Error: ${error.message}`);
  } finally {
    
    mongoose.disconnect();
  }
};
seedData();

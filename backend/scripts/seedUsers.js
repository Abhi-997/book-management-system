require('dotenv').config();
const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const User = require('../models/User');

const users = [
  {
    username: 'user1',
    password: bcrypt.hashSync('pass1', 10),
    role: 'user'
  },
  {
    username: 'author1',
    password: bcrypt.hashSync('pass2', 10),
    role: 'author'
  },
  {
    username: 'admin',
    password: bcrypt.hashSync('admin', 10),
    role: 'admin'
  }
];

async function seedDB() {
  await mongoose.connect(process.env.MONGODB_URI);
  await User.deleteMany();
  await User.insertMany(users);
  console.log('Database seeded!');
  process.exit();
}

seedDB();
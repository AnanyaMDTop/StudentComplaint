require('dotenv').config();
const mongoose = require('mongoose');
const User = require('./models/User');

mongoose.connect(process.env.MONGO_URI)
  .then(async () => {
    const admin = new User({
      username: 'superadmin',
      password: 'admin123', // will be hashed by pre-save hook
      role: 'admin'
    });
    await admin.save();
    console.log('Admin created');
    mongoose.disconnect();
  })
  .catch(err => console.error(err));
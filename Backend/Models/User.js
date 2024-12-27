// models/User.js

const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  username: { 
    type: String, 
    required: true, 
    unique: true,
    trim: true,
    minlength: 3
  },
  email: { 
    type: String, 
    required: true, 
    unique: true,
    trim: true,
    lowercase: true
  },
  password: { 
    type: String, 
    required: true,
    minlength: 6
  },
  contact: {
    type: String,
    trim: true
  },
  sex: {
    type: String,
    enum: ['male', 'female', 'other']
  },
  bio: {
    type: String,
    maxlength: 500
  },
  profilePicture: {
    type: String
  },
  createdAt: { 
    type: Date, 
    default: Date.now 
  }
});

// Create a virtual for the user's full profile
userSchema.virtual('profile').get(function() {
  return {
    id: this._id,
    username: this.username,
    email: this.email,
    contact: this.contact,
    sex: this.sex,
    bio: this.bio,
    profilePicture: this.profilePicture,
    createdAt: this.createdAt
  };
});

// Add method to hide sensitive data when converting to JSON
userSchema.methods.toJSON = function() {
  const user = this.toObject();
  delete user.password;
  return user;
};

const User = mongoose.model('User', userSchema);

module.exports = User;
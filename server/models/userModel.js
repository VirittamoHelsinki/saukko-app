// Import required modules and libraries
const mongoose = require('mongoose');
const jwt = require('jsonwebtoken');
const config = require('../utils/config');

const userSchema = new mongoose.Schema({
    name: {
        type: String 
    },
    email: {
        type: String,
        required: true,
        unique: true,
    },
    passwordHash: {
        type: String,
        required: true,
    },
    role: {
        type: String,
        required: true,
        enum: ['customer', 'admin', 'teacher', 'supervisor'],
    }
});

// next are the methods that we can use on the User model

// method to generate reset-password token
userSchema.methods.generateResetPasswordToken = function generateResetPasswordToken() {
  return jwt.sign({
    id: this._id,
  }, config.JWT_SECRET, 
  { expiresIn: '1h' })
}

// method to generate reset-password token and link
userSchema.methods.generateResetPasswordLink = function generateResetPasswordLink() {
  return `${config.EMAIL_SERVICE_HOST}/reset-password/${this.generateResetPasswordToken()}`
}

// method to generate JWT token for authentication
userSchema.methods.generateJWT = function generateJWT() {
  return jwt.sign({
    email: this.email,
    name: this.name,
    role: this.role,
  }, config.JWT_SECRET,
  { expiresIn: 30 * 60 })
}


// Transform the returned object to remove the passwordHash and __v properties
userSchema.set('toJSON', {
    transform: (document, returnedObject) => {
        delete returnedObject.__v;
        delete returnedObject.passwordHash;
    },
});

const User = mongoose.model('User', userSchema);

module.exports = User;

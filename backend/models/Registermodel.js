const mongoose = require('mongoose');

const registerSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true },
  phone: { type: String, required: true },
  yearOfPassing: { type: String },
  currentlyWorking: { type: String },
  yearOfJoining: { type: String },
  departmentCode: { type: String },
  rollNumber: { type: String },
  registrationNumber: { type: String },
  password: { type: String },
  company: { type: String },
  mentorStatus: { type: Boolean, default: false },
  skills: { type: String },
  githubLink: { type: String },
  codingPlatformLink: { type: String }
});

const registerModel = mongoose.models.RegisteredUser || mongoose.model('RegisteredUser', registerSchema);

module.exports = registerModel;

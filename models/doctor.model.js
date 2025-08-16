const mongoose = require('mongoose');

const doctorSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String },
  specialization: { type: String },
  phone: { type: String },
  location: { type: String },
  isVerified: { type: Boolean, default: false },
  createdBy: { type: mongoose.Schema.Types.ObjectId, ref: "Rep" },
}, { timestamps: true });

module.exports = mongoose.model('Doctor', doctorSchema);

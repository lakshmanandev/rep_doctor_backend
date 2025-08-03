const mongoose = require('mongoose');

const medicineSchema = new mongoose.Schema({
  name: { type: String, required: true },
  brand: { type: String },
  dosage: { type: String },
  description: { type: String },
  price: { type: Number },
  createdBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Rep', // who added this medicine
  },
}, { timestamps: true });

module.exports = mongoose.model('Medicine', medicineSchema);

const Medicine = require('../models/medicine.model');

exports.create = async (data, repId) => {
  const med = await Medicine.create({ ...data, createdBy: repId });
  return { message: 'Medicine created', medicine: med };
};

exports.getAll = async () => {
  return await Medicine.find().populate('createdBy', 'name email');
};

exports.getById = async (id) => {
  return await Medicine.findById(id).populate('createdBy', 'name email');
};

exports.update = async (id, data) => {
  const med = await Medicine.findByIdAndUpdate(id, data, { new: true });
  if (!med) throw new Error('Medicine not found');
  return { message: 'Updated', medicine: med };
};

exports.remove = async (id) => {
  const deleted = await Medicine.findByIdAndDelete(id);
  if (!deleted) throw new Error('Medicine not found');
};

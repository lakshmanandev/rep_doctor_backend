const Medicine = require("../models/medicine.model");

exports.createMedicine = async (data, repId) => {
  return await Medicine.create({ ...data, createdBy: repId });
};

exports.getAllMedicines = async () => {
  return await Medicine.find();
};

exports.getMedicineById = async (id) => {
  return await Medicine.findById(id);
};

exports.updateMedicine = async (id, data) => {
  return await Medicine.findByIdAndUpdate(id, data, { new: true });
};

exports.deleteMedicine = async (id) => {
  return await Medicine.findByIdAndDelete(id);
};

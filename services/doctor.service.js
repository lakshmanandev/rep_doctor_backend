const Doctor = require("../models/doctor.model");

exports.createDoctor = async (data, repId) => {
  return await Doctor.create({ ...data, createdBy: repId });
};

exports.updateDoctor = async (id, data) => {
  return await Doctor.findByIdAndUpdate(id, data, { new: true });
};

exports.getAllDoctors = async () => {
  return await Doctor.find();
};

exports.getDoctorById = async (id) => {
  return await Doctor.findById(id);
};

exports.deleteDoctor = async (id) => {
  return await Doctor.findByIdAndDelete(id);
};

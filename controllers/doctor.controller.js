const doctorService = require("../services/doctor.service");
const { success, error } = require("../utils/response.util");

exports.createDoctor = async (req, res) => {
  try {
    const repId = req.user.id;

    // If file uploaded, set profilePic path
    let doctorData = { ...req.body };
    if (req.file) {
      doctorData.profilePic = `/uploads/${req.file.filename}`;
    }

    const doctor = await doctorService.createDoctor(doctorData, repId);
    return success(res, doctor, 201);
  } catch (err) {
    return error(res, err.message, 400);
  }
};

exports.getDoctors = async (req, res) => {
  try {
    const doctors = await doctorService.getAllDoctors();
    return success(res, doctors);
  } catch (err) { return error(res, err.message); }
};

exports.getDoctor = async (req, res) => {
  try {
    const doctor = await doctorService.getDoctorById(req.params.id);
    if (!doctor) return error(res, "Not found", 404);
    return success(res, doctor);
  } catch (err) { return error(res, err.message); }
};

exports.updateDoctor = async (req, res) => {
  try {
    const doctorId = req.params.id;
    let updateData = { ...req.body };

    if (req.file) {
      updateData.profilePic = `/uploads/${req.file.filename}`;
    }

    const doctor = await doctorService.updateDoctor(doctorId, updateData);
    return success(res, doctor, 200);
  } catch (err) {
    return error(res, err.message, 400);
  }
};

exports.deleteDoctor = async (req, res) => {
  try {
    await doctorService.deleteDoctor(req.params.id);
    return success(res, "Deleted");
  } catch (err) { return error(res, err.message); }
};

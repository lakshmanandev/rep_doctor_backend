const doctorService = require("../services/doctor.service");
const { success, error } = require("../utils/response.util");

exports.createDoctor = async (req, res) => {
  try {
    const repId = req.user.id;
    const doctor = await doctorService.createDoctor(req.body, repId);
    return success(res, doctor, 201);
  } catch (err) { return error(res, err.message, 400); }
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
    const updated = await doctorService.updateDoctor(req.params.id, req.body);
    return success(res, updated);
  } catch (err) { return error(res, err.message); }
};

exports.deleteDoctor = async (req, res) => {
  try {
    await doctorService.deleteDoctor(req.params.id);
    return success(res, "Deleted");
  } catch (err) { return error(res, err.message); }
};

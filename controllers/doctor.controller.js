const doctorService = require('../services/doctor.service');

exports.getAllDoctors = async (req, res) => {
  try {
    const doctors = await doctorService.fetchAllDoctors();
    res.json(doctors);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.getDoctorById = async (req, res) => {
  try {
    const doctor = await doctorService.fetchDoctorById(req.params.id);
    res.json(doctor);
  } catch (err) {
    res.status(404).json({ error: err.message });
  }
};

exports.createDoctor = async (req, res) => {
  try {
    const newDoctor = await doctorService.createDoctor(req.body);
    res.status(201).json(newDoctor);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

exports.updateDoctor = async (req, res) => {
  try {
    const updatedDoctor = await doctorService.updateDoctor(req.params.id, req.body);
    res.json(updatedDoctor);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

exports.deleteDoctor = async (req, res) => {
  try {
    await doctorService.deleteDoctor(req.params.id);
    res.json({ message: 'Doctor deleted' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

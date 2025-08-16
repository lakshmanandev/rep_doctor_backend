// Example only — logic can include MongoDB, bcrypt, JWT, etc.
const Rep = require('../models/rep.model');
const Doctor = require('../models/doctor.model');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');


const signToken = (payload) =>
    jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: process.env.JWT_EXPIRES_IN || "7d" });

// Register Rep
exports.registerRep = async ({ name, email, password }) => {
    const existing = await Rep.findOne({ email });
    if (existing) throw new Error("Email already used");
    const salt = await bcrypt.genSalt(10);
    const hash = await bcrypt.hash(password, salt);
    const rep = await Rep.create({ name, email, password: hash });
    const token = signToken({ id: rep._id, role: rep.role });
    return { rep, token };
};

// Login Rep
exports.loginRep = async ({ email, password }) => {
    const rep = await Rep.findOne({ email });
  if (!rep) throw new Error("Invalid credentials");
  const match = await bcrypt.compare(password, rep.password);
  if (!match) throw new Error("Invalid credentials");
  const token = signToken({ id: rep._id, role: rep.role });
  return { rep, token };
};




// 🔐 Register Doctor
exports.registerDoctor = async ({  name, email, password, phone, specialization }) => {
    const existing = await Doctor.findOne({ email });
    if (existing) throw new Error("Email already used");
    const salt = await bcrypt.genSalt(10);
    const hash = await bcrypt.hash(password, salt);
    const doctor = await Doctor.create({ name, email, password: hash, phone, specialization });
    const token = signToken({ id: doctor._id, role: "doctor" });
    return { doctor, token };
};

// 🔐 Login Doctor (already explained earlier)
exports.loginDoctor = async ({ email, password }) => {
    const doctor = await Doctor.findOne({ email });
  if (!doctor) throw new Error("Invalid credentials");
  if (!doctor.password) throw new Error("Doctor has no password set");
  const match = await bcrypt.compare(password, doctor.password);
  if (!match) throw new Error("Invalid credentials");
  const token = signToken({ id: doctor._id, role: "doctor" });
  return { doctor, token };
};
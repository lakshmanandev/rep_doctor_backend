// Example only — logic can include MongoDB, bcrypt, JWT, etc.
const Rep = require('../models/rep.model');
const Doctor = require('../models/doctor.model');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');


// Register Rep
exports.handleRepRegister = async ({ name, email, password }) => {
    const exist = await Rep.findOne({ email });
    if (exist) throw new Error('Email already exists');

    const hashed = await bcrypt.hash(password, 10);
    const rep = await Rep.create({ name, email, password: hashed });

    return { message: 'Rep registered', rep: { id: rep._id, name: rep.name, email: rep.email } };
};

// Login Rep
exports.handleRepLogin = async ({ email, password }) => {
    const rep = await Rep.findOne({ email });
    if (!rep) throw new Error('Rep not found');

    const match = await bcrypt.compare(password, rep.password);
    if (!match) throw new Error('Invalid password');

    const token = jwt.sign({ id: rep._id, role: 'rep' }, process.env.JWT_SECRET, { expiresIn: '7d' });

    return {
        message: 'Login successful',
        token,
        rep: { id: rep._id, name: rep.name, email: rep.email }
    };
};




// 🔐 Register Doctor
exports.handleDoctorRegister = async ({ name, email, password, specialization }) => {
    const existingDoctor = await Doctor.findOne({ email });
    if (existingDoctor) throw new Error('Email already registered');

    const hashedPassword = await bcrypt.hash(password, 10);

    const newDoctor = new Doctor({
        name,
        email,
        password: hashedPassword,
        specialization,
    });

    await newDoctor.save();

    return {
        message: 'Doctor registered successfully',
        doctor: {
            id: newDoctor._id,
            name: newDoctor.name,
            email: newDoctor.email,
            specialization: newDoctor.specialization,
        },
    };
};

// 🔐 Login Doctor (already explained earlier)
exports.handleDoctorLogin = async ({ email, password }) => {
    const doctor = await Doctor.findOne({ email });
    if (!doctor) throw new Error('Doctor not found');

    const isMatch = await bcrypt.compare(password, doctor.password);
    if (!isMatch) throw new Error('Invalid password');

    const token = jwt.sign({ id: doctor._id }, process.env.JWT_SECRET, { expiresIn: '7d' });

    return {
        message: 'Login successful',
        token,
        doctor: {
            id: doctor._id,
            name: doctor.name,
            email: doctor.email,
            specialization: doctor.specialization,
        },
    };
};
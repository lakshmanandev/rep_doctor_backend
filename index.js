const express = require('express');
const path = require("path");
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config();
const authRoutes = require('./routes/auth.routes');
const doctorRoutes = require('./routes/doctor.routes');
const medicineRoutes = require('./routes/medicine.routes');
const fs = require("fs");

const app = express();

// Middlewares
app.use(cors());
app.use(express.json());

// Connect DB
mongoose.connect(process.env.MONGO_URI)
    .then(() => console.log('MongoDB connected'))
    .catch((err) => console.log(err));

// Sample Route
app.get('/', (req, res) => {
    res.send('API is running....');
});

const PORT = process.env.PORT || 5000;

const uploadPath = path.join(__dirname, "uploads");
if (!fs.existsSync(uploadPath)) {
    fs.mkdirSync(uploadPath);
}

app.post("/sim-info", (req, res) => {
    console.log("📩 Body from app:", req.body);

    // Operator auto inject headers
    console.log("📩 Headers from operator:");
    console.log("x-msisdn:", req.headers["x-msisdn"]);
    console.log("x-up-calling-line-id:", req.headers["x-up-calling-line-id"]);

    // Decide number
    const msisdn =
        req.headers["x-msisdn"] || req.headers["x-up-calling-line-id"] || null;

    console.log("📩 Detected MSISDN:", msisdn);

    res.json({
        success: true,
        simData: req.body,
        detectedNumber: msisdn,
    });
});

app.use("/uploads", express.static(uploadPath));
app.use('/api/auth', authRoutes);
app.use('/api/doctors', doctorRoutes);
app.use('/api/medicine', medicineRoutes);
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));

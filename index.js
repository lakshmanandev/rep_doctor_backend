const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config();
const authRoutes = require('./routes/auth.routes');
const doctorRoutes = require('./routes/doctor.routes');
const medicineRoutes = require('./routes/medicine.routes');

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

app.use('/api/auth', authRoutes);
app.use('/api/doctors', doctorRoutes);
app.use('/api/medicine', medicineRoutes);
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));

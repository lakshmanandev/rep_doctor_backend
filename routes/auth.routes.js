const express = require('express');
const router = express.Router();
const authController = require('../controllers/auth.controller');

// Rep login/register
router.post('/rep-register', authController.repRegister);
router.post('/rep-login', authController.repLogin);


// doctor login/register
router.post('/doctor-register', authController.doctorRegister);
router.post('/doctor-login', authController.doctorLogin);

module.exports = router;

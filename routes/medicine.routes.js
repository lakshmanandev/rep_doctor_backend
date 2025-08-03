const express = require('express');
const router = express.Router();
const medicineController = require('../controllers/medicine.controller');
const verifyToken = require('../middlewares/auth.middleware');

// Rep-only routes
router.post('/', verifyToken, medicineController.createMedicine);
router.get('/', medicineController.getAllMedicines);
router.get('/:id', medicineController.getMedicineById);
router.put('/:id', verifyToken, medicineController.updateMedicine);
router.delete('/:id', verifyToken, medicineController.deleteMedicine);

module.exports = router;

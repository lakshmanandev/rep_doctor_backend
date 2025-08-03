const medicineService = require('../services/medicine.service');

exports.createMedicine = async (req, res) => {
  try {
    const result = await medicineService.create(req.body, req.doctor.id);
    res.status(201).json(result);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

exports.getAllMedicines = async (req, res) => {
  const result = await medicineService.getAll();
  res.json(result);
};

exports.getMedicineById = async (req, res) => {
  const result = await medicineService.getById(req.params.id);
  res.json(result);
};

exports.updateMedicine = async (req, res) => {
  try {
    const result = await medicineService.update(req.params.id, req.body);
    res.json(result);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

exports.deleteMedicine = async (req, res) => {
  try {
    await medicineService.remove(req.params.id);
    res.json({ message: 'Medicine deleted' });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

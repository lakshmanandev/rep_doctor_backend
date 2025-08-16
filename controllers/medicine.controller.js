const medicineService = require("../services/medicine.service");
const { success, error } = require("../utils/response.util");

exports.createMedicine = async (req, res) => {
  try {
    const repId = req.user.id;
    const med = await medicineService.createMedicine(req.body, repId);
    return success(res, med, 201);
  } catch (err) { return error(res, err.message, 400); }
};

exports.getMedicines = async (req, res) => {
  try {
    const meds = await medicineService.getAllMedicines();
    return success(res, meds);
  } catch (err) { return error(res, err.message); }
};

exports.getMedicine = async (req, res) => {
  try {
    const med = await medicineService.getMedicineById(req.params.id);
    if (!med) return error(res, "Not found", 404);
    return success(res, med);
  } catch (err) { return error(res, err.message); }
};

exports.updateMedicine = async (req, res) => {
  try {
    const updated = await medicineService.updateMedicine(req.params.id, req.body);
    return success(res, updated);
  } catch (err) { return error(res, err.message); }
};

exports.deleteMedicine = async (req, res) => {
  try {
    await medicineService.deleteMedicine(req.params.id);
    return success(res, "Deleted");
  } catch (err) { return error(res, err.message); }
};

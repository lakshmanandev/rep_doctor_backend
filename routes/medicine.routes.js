const express = require("express");
const router = express.Router();
const medicineController = require("../controllers/medicine.controller");
const { verifyToken, allowRoles } = require("../middlewares/auth.middleware");

// Rep creates/updates/deletes medicine
router.post("/", verifyToken, allowRoles("rep"), medicineController.createMedicine);
router.put("/:id", verifyToken, allowRoles("rep"), medicineController.updateMedicine);
router.delete("/:id", verifyToken, allowRoles("rep"), medicineController.deleteMedicine);

// Anyone authenticated (doctor or rep) can list and read medicines
router.get("/", verifyToken, medicineController.getMedicines);
router.get("/:id", verifyToken, medicineController.getMedicine);

module.exports = router;

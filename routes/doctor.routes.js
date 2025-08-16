const express = require("express");
const router = express.Router();
const doctorController = require("../controllers/doctor.controller");
const { verifyToken, allowRoles } = require("../middlewares/auth.middleware");

// Rep-only CRUD for doctors
router.post("/", verifyToken, allowRoles("rep"), doctorController.createDoctor);
router.post("/list", verifyToken, allowRoles("rep"), doctorController.getDoctors);
router.get("/:id", verifyToken, allowRoles("rep"), doctorController.getDoctor);
router.put("/:id", verifyToken, allowRoles("rep"), doctorController.updateDoctor);
router.delete("/:id", verifyToken, allowRoles("rep"), doctorController.deleteDoctor);

module.exports = router;


const express = require("express");
const router = express.Router();

const {
  getDashboardStats,
  getAllStudents,
  getStudentById,
  updateStudentStatus,
  deleteStudent
} = require("../controllers/adminController");

const {
  protect,
  adminOnly
} = require("../middleware/authMiddleware");

// Every route in this file requires admin access
router.use(protect, adminOnly);

router.get("/dashboard", getDashboardStats);
router.get("/students", getAllStudents);
router.get("/students/:id", getStudentById);
router.patch("/students/:id/status", updateStudentStatus);
router.delete("/students/:id", deleteStudent);

module.exports = router;

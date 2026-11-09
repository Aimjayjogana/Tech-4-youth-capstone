
const express = require("express");
const router = express.Router();

const {
  enrollCourse,
  getMyEnrollments,
  getAllEnrollments,
  updateEnrollmentStatus
} = require("../controllers/enrollmentController");

const {
  protect,
  adminOnly
} = require("../middleware/authMiddleware");

// Student routes
router.post("/:courseId", protect, enrollCourse);
router.get("/my-enrollments", protect, getMyEnrollments);

// Admin routes
router.get("/admin/all", protect, adminOnly, getAllEnrollments);

router.patch(
  "/admin/:id/status",
  protect,
  adminOnly,
  updateEnrollmentStatus
);

module.exports = router;

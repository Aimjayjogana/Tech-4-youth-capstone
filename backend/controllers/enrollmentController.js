
const Enrollment = require("../models/Enrollment");
const Course = require("../models/Course");

// STUDENT: ENROLL IN A COURSE
const enrollCourse = async (req, res) => {
  try {
    const course = await Course.findOne({
      _id: req.params.courseId,
      isPublished: true
    });

    if (!course) {
      return res.status(404).json({
        message: "Course not found or unavailable."
      });
    }

    const enrollment = await Enrollment.create({
      student: req.user._id,
      course: course._id
    });

    return res.status(201).json({
      success: true,
      message: "Course enrollment submitted successfully!",
      enrollment
    });

  } catch (error) {
    if (error.code === 11000) {
      return res.status(409).json({
        message: "You are already enrolled in this course."
      });
    }

    console.error("Enrollment error:", error.message);

    return res.status(500).json({
      message: "Failed to enroll in course."
    });
  }
};

// STUDENT: VIEW MY ENROLLMENTS
const getMyEnrollments = async (req, res) => {
  try {
    const enrollments = await Enrollment.find({
      student: req.user._id
    })
      .populate("course")
      .sort({ createdAt: -1 });

    return res.status(200).json({
      success: true,
      count: enrollments.length,
      enrollments
    });

  } catch (error) {
    return res.status(500).json({
      message: "Failed to fetch your enrollments."
    });
  }
};

// ADMIN: VIEW ALL ENROLLMENTS
const getAllEnrollments = async (req, res) => {
  try {
    const enrollments = await Enrollment.find()
      .populate("student", "fullName email")
      .populate("course", "title category duration")
      .sort({ createdAt: -1 });

    return res.status(200).json({
      success: true,
      count: enrollments.length,
      enrollments
    });

  } catch (error) {
    return res.status(500).json({
      message: "Failed to fetch enrollments."
    });
  }
};

// ADMIN: UPDATE ENROLLMENT STATUS
const updateEnrollmentStatus = async (req, res) => {
  try {
    const { status } = req.body;

    const allowedStatuses = [
      "pending",
      "approved",
      "rejected",
      "completed"
    ];

    if (!allowedStatuses.includes(status)) {
      return res.status(400).json({
        message: "Invalid enrollment status."
      });
    }

    const enrollment = await Enrollment.findByIdAndUpdate(
      req.params.id,
      { status },
      { new: true, runValidators: true }
    )
      .populate("student", "fullName email")
      .populate("course", "title");

    if (!enrollment) {
      return res.status(404).json({
        message: "Enrollment not found."
      });
    }

    return res.status(200).json({
      success: true,
      message: "Enrollment status updated successfully!",
      enrollment
    });

  } catch (error) {
    return res.status(500).json({
      message: "Failed to update enrollment status."
    });
  }
};

module.exports = {
  enrollCourse,
  getMyEnrollments,
  getAllEnrollments,
  updateEnrollmentStatus
};


const User = require("../models/User");
const Course = require("../models/Course");
const Enrollment = require("../models/Enrollment");
const mongoose = require("mongoose");

// Get dashboard statistics
const getDashboardStats = async (req, res) => {
  try {
    const [
      totalStudents,
      totalCourses,
      totalEnrollments,
      pendingEnrollments,
      approvedEnrollments,
      completedEnrollments
    ] = await Promise.all([
      User.countDocuments({ role: "student" }),
      Course.countDocuments(),
      Enrollment.countDocuments(),
      Enrollment.countDocuments({ status: "pending" }),
      Enrollment.countDocuments({ status: "approved" }),
      Enrollment.countDocuments({ status: "completed" })
    ]);

    res.status(200).json({
      totalStudents,
      totalCourses,
      totalEnrollments,
      pendingEnrollments,
      approvedEnrollments,
      completedEnrollments
    });
  } catch (error) {
    res.status(500).json({
      message: "Unable to retrieve dashboard statistics"
    });
  }
};

// Get all registered students
const getAllStudents = async (req, res) => {
  try {
    const page = Math.max(1, parseInt(req.query.page, 10) || 1);
    const limit = Math.min(
      100,
      Math.max(1, parseInt(req.query.limit, 10) || 10)
    );

    const search = (req.query.search || "").trim();

    const filter = { role: "student" };

    if (search) {
      const safeSearch = search.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");

      filter.$or = [
        { fullName: { $regex: safeSearch, $options: "i" } },
        { email: { $regex: safeSearch, $options: "i" } }
      ];
    }

    const [students, totalStudents] = await Promise.all([
      User.find(filter)
        .select("-password")
        .sort({ createdAt: -1 })
        .skip((page - 1) * limit)
        .limit(limit),

      User.countDocuments(filter)
    ]);

    res.status(200).json({
      students,
      currentPage: page,
      totalPages: Math.ceil(totalStudents / limit),
      totalStudents
    });
  } catch (error) {
    res.status(500).json({
      message: "Unable to retrieve students"
    });
  }
};

// Get one student by ID
const getStudentById = async (req, res) => {
  try {
    if (!mongoose.isValidObjectId(req.params.id)) {
      return res.status(400).json({
        message: "Invalid student ID"
      });
    }

    const student = await User.findOne({
      _id: req.params.id,
      role: "student"
    }).select("-password");

    if (!student) {
      return res.status(404).json({
        message: "Student not found"
      });
    }

    res.status(200).json({ student });
  } catch (error) {
    res.status(500).json({
      message: "Unable to retrieve student"
    });
  }
};

// Activate or deactivate a student
const updateStudentStatus = async (req, res) => {
  try {
    const { isActive } = req.body;

    if (typeof isActive !== "boolean") {
      return res.status(400).json({
        message: "isActive must be true or false"
      });
    }

    if (!mongoose.isValidObjectId(req.params.id)) {
      return res.status(400).json({
        message: "Invalid student ID"
      });
    }

    const student = await User.findOneAndUpdate(
      {
        _id: req.params.id,
        role: "student"
      },
      { isActive },
      {
        new: true,
        runValidators: true
      }
    ).select("-password");

    if (!student) {
      return res.status(404).json({
        message: "Student not found"
      });
    }

    res.status(200).json({
      message: isActive
        ? "Student account activated"
        : "Student account deactivated",
      student
    });
  } catch (error) {
    res.status(500).json({
      message: "Unable to update student status"
    });
  }
};

// Delete a student account
const deleteStudent = async (req, res) => {
  try {
    if (!mongoose.isValidObjectId(req.params.id)) {
      return res.status(400).json({
        message: "Invalid student ID"
      });
    }

    const student = await User.findOne({
      _id: req.params.id,
      role: "student"
    });

    if (!student) {
      return res.status(404).json({
        message: "Student not found"
      });
    }

    // Remove the student's enrollment records too
    await Enrollment.deleteMany({
      student: student._id
    });

    await student.deleteOne();

    res.status(200).json({
      message: "Student account and enrollment records deleted"
    });
  } catch (error) {
    res.status(500).json({
      message: "Unable to delete student account"
    });
  }
};

module.exports = {
  getDashboardStats,
  getAllStudents,
  getStudentById,
  updateStudentStatus,
  deleteStudent
};
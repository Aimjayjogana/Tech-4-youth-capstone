
const express = require("express");
const router = express.Router();

const Course = require("../models/Course");

// GET all published courses
router.get("/", async (req, res) => {
  try {
    const courses = await Course.find({ isPublished: true })
      .sort({ createdAt: -1 });

    res.status(200).json({
      success: true,
      count: courses.length,
      courses
    });
  } catch (error) {
    console.error("Error fetching courses:", error.message);

    res.status(500).json({
      success: false,
      message: "Failed to fetch courses"
    });
  }
});

// GET one course by ID
router.get("/:id", async (req, res) => {
  try {
    const course = await Course.findOne({
      _id: req.params.id,
      isPublished: true
    });

    if (!course) {
      return res.status(404).json({
        success: false,
        message: "Course not found"
      });
    }

    res.status(200).json({
      success: true,
      course
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Failed to fetch course"
    });
  }
});

module.exports = router;

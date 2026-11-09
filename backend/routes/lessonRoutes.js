
const express = require("express");
const router = express.Router();

const mongoose = require("mongoose");
const Lesson = require("../models/Lesson");
const Course = require("../models/Course");

// GET all published lessons for a course
router.get("/course/:courseId", async (req, res) => {
  try {
    const { courseId } = req.params;

    if (!mongoose.isValidObjectId(courseId)) {
      return res.status(400).json({
        success: false,
        message: "Invalid course ID"
      });
    }

    const course = await Course.findOne({
      _id: courseId,
      isPublished: true
    });

    if (!course) {
      return res.status(404).json({
        success: false,
        message: "Course not found"
      });
    }

    const lessons = await Lesson.find({
      course: courseId,
      isPublished: true
    }).sort({ order: 1 });

    res.status(200).json({
      success: true,
      course,
      count: lessons.length,
      lessons
    });
  } catch (error) {
    console.error("Error fetching lessons:", error.message);

    res.status(500).json({
      success: false,
      message: "Failed to retrieve lessons"
    });
  }
});

module.exports = router;

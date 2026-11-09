
const Course = require("../models/Course");

// GET ALL PUBLISHED COURSES
const getCourses = async (req, res) => {
  try {
    const courses = await Course.find({ isPublished: true })
      .sort({ createdAt: -1 });

    res.status(200).json({
      success: true,
      count: courses.length,
      courses
    });
  } catch (error) {
    res.status(500).json({
      message: "Failed to fetch courses."
    });
  }
};

// GET SINGLE COURSE
const getCourseById = async (req, res) => {
  try {
    const course = await Course.findOne({
      _id: req.params.id,
      isPublished: true
    });

    if (!course) {
      return res.status(404).json({
        message: "Course not found."
      });
    }

    res.status(200).json({
      success: true,
      course
    });
  } catch (error) {
    res.status(500).json({
      message: "Failed to fetch course."
    });
  }
};

// ADMIN: GET ALL COURSES
const getAdminCourses = async (req, res) => {
  try {
    const courses = await Course.find().sort({ createdAt: -1 });

    res.status(200).json({
      success: true,
      courses
    });
  } catch (error) {
    res.status(500).json({
      message: "Failed to fetch courses."
    });
  }
};

// ADMIN: CREATE COURSE
const createCourse = async (req, res) => {
  try {
    const {
      title,
      description,
      instructor,
      category,
      duration,
      level,
      image,
      price
    } = req.body;

    if (
      !title ||
      !description ||
      !instructor ||
      !category ||
      !duration
    ) {
      return res.status(400).json({
        message: "Please provide all required course details."
      });
    }

    const course = await Course.create({
      title,
      description,
      instructor,
      category,
      duration,
      level,
      image,
      price
    });

    res.status(201).json({
      success: true,
      message: "Course created successfully!",
      course
    });
  } catch (error) {
    res.status(500).json({
      message: "Failed to create course."
    });
  }
};

// ADMIN: UPDATE COURSE
const updateCourse = async (req, res) => {
  try {
    const course = await Course.findByIdAndUpdate(
      req.params.id,
      req.body,
      {
        new: true,
        runValidators: true
      }
    );

    if (!course) {
      return res.status(404).json({
        message: "Course not found."
      });
    }

    res.status(200).json({
      success: true,
      message: "Course updated successfully!",
      course
    });
  } catch (error) {
    res.status(500).json({
      message: "Failed to update course."
    });
  }
};

// ADMIN: DELETE COURSE
const deleteCourse = async (req, res) => {
  try {
    const course = await Course.findByIdAndDelete(req.params.id);

    if (!course) {
      return res.status(404).json({
        message: "Course not found."
      });
    }

    res.status(200).json({
      success: true,
      message: "Course deleted successfully!"
    });
  } catch (error) {
    res.status(500).json({
      message: "Failed to delete course."
    });
  }
};

// ADMIN: PUBLISH / UNPUBLISH COURSE
const toggleCoursePublish = async (req, res) => {
  try {
    const course = await Course.findById(req.params.id);

    if (!course) {
      return res.status(404).json({
        message: "Course not found."
      });
    }

    course.isPublished = !course.isPublished;

    await course.save();

    res.status(200).json({
      success: true,
      message: course.isPublished
        ? "Course published successfully!"
        : "Course unpublished successfully!",
      course
    });
  } catch (error) {
    res.status(500).json({
      message: "Failed to update course status."
    });
  }
};

module.exports = {
  getCourses,
  getCourseById,
  getAdminCourses,
  createCourse,
  updateCourse,
  deleteCourse,
  toggleCoursePublish
};


require("dotenv").config();

const connectDB = require("../config/db");
const Course = require("../models/Course");

const courses = [
  {
    title: "HTML Fundamentals",
    description: "Learn how to create website structures.",
    instructor: "The Net Ninja",
    category: "Web Development",
    duration: "Self-paced",
    level: "Beginner",
    price: 0,
    isPublished: true,
    playlistUrl: "https://www.youtube.com/results?search_query=net+ninja+html"
  },
  {
    title: "CSS & Web Design",
    description: "Learn how to style beautiful websites.",
    instructor: "The Net Ninja",
    category: "Web Design",
    duration: "Self-paced",
    level: "Beginner",
    price: 0,
    isPublished: true,
    playlistUrl: "https://www.youtube.com/results?search_query=net+ninja+css"
  },
  {
    title: "JavaScript",
    description: "Learn how to make websites interactive.",
    instructor: "The Net Ninja",
    category: "Programming",
    duration: "Self-paced",
    level: "Beginner",
    price: 0,
    isPublished: true,
    playlistUrl: "https://www.youtube.com/results?search_query=net+ninja+javascript"
  },
  {
    title: "React Development",
    description: "Learn how to build websites with React.",
    instructor: "The Net Ninja",
    category: "Frontend Development",
    duration: "Self-paced",
    level: "Beginner",
    price: 0,
    isPublished: true,
    playlistUrl: "https://www.youtube.com/results?search_query=net+ninja+react"
  },
  {
    title: "Node.js",
    description: "Learn how to build backend applications.",
    instructor: "The Net Ninja",
    category: "Backend Development",
    duration: "Self-paced",
    level: "Beginner",
    price: 0,
    isPublished: true,
    playlistUrl: "https://www.youtube.com/results?search_query=net+ninja+node"
  },
  {
    title: "MongoDB",
    description: "Learn how to store and manage data.",
    instructor: "The Net Ninja",
    category: "Database",
    duration: "Self-paced",
    level: "Beginner",
    price: 0,
    isPublished: true,
    playlistUrl: "https://www.youtube.com/results?search_query=net+ninja+mongodb"
  },
  {
    title: "Git",
    description: "Learn how to track changes in your code.",
    instructor: "The Net Ninja",
    category: "Version Control",
    duration: "Self-paced",
    level: "Beginner",
    price: 0,
    isPublished: true,
    playlistUrl: "https://www.youtube.com/results?search_query=net+ninja+git"
  },
  {
    title: "GitHub",
    description: "Learn how to upload and share your projects.",
    instructor: "The Net Ninja",
    category: "Version Control",
    duration: "Self-paced",
    level: "Beginner",
    price: 0,
    isPublished: true,
    playlistUrl: "https://www.youtube.com/results?search_query=net+ninja+github"
  }
];

const seedCourses = async () => {
  try {
    await connectDB();

    for (const course of courses) {
      await Course.updateOne(
        { title: course.title },
        { $set: course },
        { upsert: true }
      );
    }

    console.log("Eight courses added or updated successfully!");
    process.exit(0);
  } catch (error) {
    console.error("Course seeding failed:", error.message);
    process.exit(1);
  }
};

seedCourses();

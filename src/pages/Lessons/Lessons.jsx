
import { useParams, Link } from "react-router-dom";
import { useEffect, useState } from "react";
import "./Lessons.css";

const API_URL = import.meta.env.VITE_API_URL || "http://localhost:5000";

const youtubeLinks = {
  javascript: "https://www.youtube.com/results?search_query=net+ninja+javascript",
  html: "https://www.youtube.com/results?search_query=net+ninja+html",
  css: "https://www.youtube.com/results?search_query=net+ninja+css",
  react: "https://www.youtube.com/results?search_query=net+ninja+react",
  mongodb: "https://www.youtube.com/results?search_query=net+ninja+mongodb",
  node: "https://www.youtube.com/results?search_query=net+ninja+node",
  git: "https://www.youtube.com/results?search_query=net+ninja+git",
  github: "https://www.youtube.com/results?search_query=net+ninja+github"
};

function Lessons() {
  const { courseId } = useParams();

  const [course, setCourse] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchCourse = async () => {
      try {
        const response = await fetch(`${API_URL}/api/courses/${courseId}`);
        const data = await response.json();

        if (!response.ok) {
          throw new Error(data.message || "Unable to load course.");
        }

        setCourse(data.course);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchCourse();
  }, [courseId]);

  if (loading) {
    return <div className="lessons-message">Loading course...</div>;
  }

  if (error) {
    return <div className="lessons-message error">{error}</div>;
  }

  if (!course) {
    return <div className="lessons-message">Course not found.</div>;
  }

  const courseKey = course.title.toLowerCase().includes("javascript")
    ? "javascript"
    : course.title.toLowerCase().includes("html")
    ? "html"
    : course.title.toLowerCase().includes("css")
    ? "css"
    : course.title.toLowerCase().includes("react")
    ? "react"
    : course.title.toLowerCase().includes("mongodb")
    ? "mongodb"
    : course.title.toLowerCase().includes("node")
    ? "node"
    : course.title.toLowerCase().includes("github")
    ? "github"
    : course.title.toLowerCase().includes("git")
    ? "git"
    : null;

  const youtubeUrl = courseKey ? youtubeLinks[courseKey] : null;

  return (
    <main className="lessons-page">
      <Link to="/courses" className="back-link">
        ← Back to Courses
      </Link>

      <section className="lessons-header">
        <span className="lessons-tag">TECH 4 YOUTH LEARNING</span>
        <h1>{course.title}</h1>
        <p>{course.description}</p>

        <div className="lessons-course-info">
          <span>{course.level}</span>
          <span>{course.duration}</span>
          <span>Free Course</span>
        </div>
      </section>

      <section className="lessons-content">
        <div className="lessons-heading">
          <h2>Start Learning</h2>
          <span>Net Ninja Tutorials</span>
        </div>

        <div className="empty-lessons">
          <h3>Ready to start learning?</h3>
          <p>
            Explore tutorials for {course.title} on the Net Ninja YouTube
            channel.
          </p>

          {youtubeUrl ? (
            <a
              href={youtubeUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="lesson-button"
            >
              Watch Tutorials on YouTube →
            </a>
          ) : (
            <p>No YouTube link is configured for this course yet.</p>
          )}
        </div>
      </section>
    </main>
  );
}

export default Lessons;

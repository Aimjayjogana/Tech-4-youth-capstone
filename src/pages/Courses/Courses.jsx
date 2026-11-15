
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import "./Courses.css";

const API_URL = import.meta.env.VITE_API_URL;

function Courses() {
  const [courses, setCourses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const fetchCourses = async () => {
    try {
      setLoading(true);
      setError("");

      if (!API_URL) {
        throw new Error("Server configuration is missing. Please try again later.");
      }

      const response = await fetch(
        `${API_URL.replace(/\/+$/, "")}/api/courses`
      );

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || "Failed to load courses.");
      }

      setCourses(
        Array.isArray(data)
          ? data
          : Array.isArray(data.courses)
          ? data.courses
          : []
      );
    } catch (err) {
      setError(err.message || "Unable to load courses.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCourses();
  }, []);

  return (
    <main className="courses-page">
      <section className="courses-hero">
        <div className="courses-hero-content">
          <span className="section-label">
            <span className="label-dot"></span>
            EXPLORE AND LEARN
          </span>

          <h1>
            Learn Today.
            <span> Build Tomorrow.</span>
          </h1>

          <p>
            Discover practical technology courses, develop valuable skills,
            and take the next step toward your future in technology.
          </p>

          <div className="courses-hero-note">
            <span className="hero-note-icon">✦</span>
            Practical skills. Real opportunities.
          </div>
        </div>

        <div className="courses-hero-decoration" aria-hidden="true">
          <div className="hero-circle hero-circle-one"></div>
          <div className="hero-circle hero-circle-two"></div>
          <div className="hero-code-card">
            <span className="code-dot"></span>
            <span className="code-dot"></span>
            <span className="code-dot"></span>
            <div className="code-lines">
              <span></span>
              <span></span>
              <span></span>
              <span></span>
            </div>
            <strong>{"<Learn />"}</strong>
          </div>
        </div>
      </section>

      <section className="courses-section">
        <div className="courses-section-heading">
          <div>
            <span className="section-label">YOUR NEXT STEP STARTS HERE</span>
            <h2>Explore Our Courses</h2>
            <p>Choose a course and start building your skills.</p>
          </div>

          {!loading && !error && courses.length > 0 && (
            <span className="courses-count">
              {courses.length} {courses.length === 1 ? "Course" : "Courses"}
            </span>
          )}
        </div>

        {loading ? (
          <div className="courses-state">
            <div className="courses-spinner"></div>
            <h3>Loading courses</h3>
            <p>Please wait while we prepare your learning experience.</p>
          </div>
        ) : error ? (
          <div className="courses-state courses-state-error">
            <div className="state-icon">!</div>
            <h3>Unable to load courses</h3>
            <p>{error}</p>
            <button type="button" onClick={fetchCourses}>
              Try Again
            </button>
          </div>
        ) : courses.length === 0 ? (
          <div className="courses-state">
            <div className="state-icon">📚</div>
            <h3>No courses available yet</h3>
            <p>New learning opportunities will appear here soon.</p>
          </div>
        ) : (
          <div className="courses-grid">
            {courses.map((course) => (
              <article className="course-card" key={course._id}>
                <div className="course-card-top">
                  {course.thumbnail ? (
                    <div className="course-image">
                      <img
                        src={course.thumbnail}
                        alt={course.title || "Course"}
                        loading="lazy"
                      />
                    </div>
                  ) : (
                    <div className="course-image course-image-placeholder">
                      <span>✦</span>
                    </div>
                  )}

                  {course.category && (
                    <span className="course-category">
                      {course.category}
                    </span>
                  )}
                </div>

                <div className="course-card-content">
                  <h3>{course.title}</h3>

                  <p>
                    {course.description ||
                      "Explore this course and develop practical technology skills."}
                  </p>

                  <div className="course-card-footer">
                    <Link
                      to={`/courses/${course._id}/lessons`}
                      className="course-link"
                    >
                      Start Learning
                      <span aria-hidden="true">→</span>
                    </Link>
                  </div>
                </div>
              </article>
            ))}
          </div>
        )}
      </section>
    </main>
  );
}

export default Courses;

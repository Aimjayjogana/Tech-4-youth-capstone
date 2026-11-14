
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import "./Courses.css";

const API_URL =
  import.meta.env.VITE_API_URL || "http://localhost:5000";

function Courses() {
  const [courses, setCourses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const fetchCourses = async () => {
    try {
      setLoading(true);
      setError("");

      const response = await fetch(`${API_URL}/api/courses`);
      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || "Failed to load courses.");
      }

      setCourses(Array.isArray(data) ? data : data.courses || []);
    } catch (err) {
      setError(err.message || "Something went wrong while loading courses.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCourses();
  }, []);

  return (
    <main className="courses-page">
      <section className="courses-header">
        <span className="section-label">EXPLORE AND LEARN</span>
        <h1>Explore Our Courses</h1>
        <p>
          Discover practical technology courses and develop the skills
          you need to build your future.
        </p>
      </section>

      {loading ? (
        <div className="courses-message">
          <p>Loading courses...</p>
        </div>
      ) : error ? (
        <div className="courses-message courses-error">
          <p>{error}</p>
          <button type="button" onClick={fetchCourses}>
            Try Again
          </button>
        </div>
      ) : courses.length === 0 ? (
        <div className="courses-message">
          <p>No courses are available at the moment.</p>
        </div>
      ) : (
        <section className="courses-grid">
          {courses.map((course) => (
            <article className="course-card" key={course._id}>
              {course.thumbnail && (
                <div className="course-image">
                  <img
                    src={course.thumbnail}
                    alt={course.title || "Course"}
                  />
                </div>
              )}

              <div className="course-card-content">
                {course.category && (
                  <span className="course-category">
                    {course.category}
                  </span>
                )}

                <h2>{course.title}</h2>

                <p>
                  {course.description ||
                    "Explore this course and develop practical technology skills."}
                </p>

                <Link
                  to={`/courses/${course._id}/lessons`}
                  className="course-link"
                >
                  Start Learning →
                </Link>
              </div>
            </article>
          ))}
        </section>
      )}
    </main>
  );
}

export default Courses;

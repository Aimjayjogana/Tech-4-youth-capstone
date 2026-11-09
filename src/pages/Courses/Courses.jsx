
import { useEffect, useMemo, useState } from "react";
import { Link } from "react-router-dom";
import "./Courses.css";

const API_URL = import.meta.env.VITE_API_URL || "http://localhost:5000";

function Courses() {
  const [courses, setCourses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [search, setSearch] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All");

  useEffect(() => {
    const fetchCourses = async () => {
      try {
        const response = await fetch(`${API_URL}/api/courses`);

        if (!response.ok) {
          throw new Error("Unable to load courses.");
        }

        const data = await response.json();
        setCourses(data.courses || []);
      } catch (err) {
        setError(err.message || "Something went wrong.");
      } finally {
        setLoading(false);
      }
    };

    fetchCourses();
  }, []);

  const categories = useMemo(() => {
    return [
      "All",
      ...new Set(courses.map((course) => course.category).filter(Boolean)),
    ];
  }, [courses]);

  const filteredCourses = useMemo(() => {
    return courses.filter((course) => {
      const matchesSearch = [
        course.title,
        course.description,
        course.category,
      ]
        .filter(Boolean)
        .join(" ")
        .toLowerCase()
        .includes(search.toLowerCase());

      const matchesCategory =
        selectedCategory === "All" ||
        course.category === selectedCategory;

      return matchesSearch && matchesCategory;
    });
  }, [courses, search, selectedCategory]);

  if (loading) {
    return <div className="courses-message">Loading courses...</div>;
  }

  if (error) {
    return <div className="courses-message error">{error}</div>;
  }

  return (
    <main className="courses-page">

      <section className="courses-hero">
        <span className="courses-tag">LEARN • BUILD • GROW</span>

        <h1>Explore Our Courses</h1>

        <p>
          Discover practical technology courses designed to help you
          develop valuable skills and become a confident developer.
        </p>

        <div className="courses-hero-stats">
          <div>
            <strong>{courses.length}</strong>
            <span>Available Courses</span>
          </div>

          <div>
            <strong>100%</strong>
            <span>Free Learning</span>
          </div>

          <div>
            <strong>∞</strong>
            <span>Opportunities</span>
          </div>
        </div>
      </section>

      <section className="courses-section">

        <div className="courses-heading">
          <div>
            <span className="courses-section-label">YOUR LEARNING JOURNEY</span>
            <h2>Find Your Course</h2>
            <p>Choose a learning track and start building your skills.</p>
          </div>

          <span className="course-count">
            {filteredCourses.length} Courses
          </span>
        </div>

        <div className="courses-toolbar">
          <div className="course-search">
            <span>⌕</span>
            <input
              type="text"
              placeholder="Search courses..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              aria-label="Search courses"
            />
          </div>

          <div className="course-filters">
            {categories.map((category) => (
              <button
                key={category}
                type="button"
                className={
                  selectedCategory === category
                    ? "filter-button active"
                    : "filter-button"
                }
                onClick={() => setSelectedCategory(category)}
              >
                {category}
              </button>
            ))}
          </div>
        </div>

        {filteredCourses.length === 0 ? (
          <div className="no-courses">
            <span>🔎</span>
            <h3>No courses found</h3>
            <p>Try another search or select a different category.</p>
            <button
              type="button"
              onClick={() => {
                setSearch("");
                setSelectedCategory("All");
              }}
            >
              Clear Filters
            </button>
          </div>
        ) : (
          <div className="courses-grid">
            {filteredCourses.map((course, index) => (
              <article className="course-card" key={course._id}>
                <div className="course-card-top">
                  <span className="course-category">
                    {course.category}
                  </span>

                  <span className="course-level">
                    {course.level}
                  </span>
                </div>

                <div className="course-card-icon">
                  {["💻", "🌐", "🎨", "⚛️", "🍃", "🟢", "🔧", "🐙"][index % 8]}
                </div>

                <h3>{course.title}</h3>

                <p className="course-description">
                  {course.description}
                </p>

                <div className="course-details">
                  <span>👨‍🏫 {course.instructor}</span>
                  <span>⏱ {course.duration}</span>
                  <span>✓ Free Course</span>
                </div>

                <Link
                  to={`/courses/${course._id}/lessons`}
                  className="course-button"
                >
                  Start Learning →
                </Link>
              </article>
            ))}
          </div>
        )}
      </section>
    </main>
  );
}

export default Courses;

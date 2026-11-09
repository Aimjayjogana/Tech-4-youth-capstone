
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import "./Dashboard.css";

function Dashboard() {
  // Get the logged-in student's information
  let user = null;

  try {
    user = JSON.parse(localStorage.getItem("user") || "null");
  } catch {
    user = null;
  }

  const studentName = user?.fullName || "Student";

  const [enrollments, setEnrollments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  // Fetch the student's real enrollments
  useEffect(() => {
    const fetchEnrollments = async () => {
      try {
        const token = localStorage.getItem("token");

        const response = await fetch(
          "http://localhost:5000/api/enrollments/my-enrollments",
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        const data = await response.json();

        if (!response.ok) {
          throw new Error(data.message || "Failed to load enrollments.");
        }

        setEnrollments(data.enrollments || []);
      } catch (err) {
        setError(err.message || "Something went wrong.");
      } finally {
        setLoading(false);
      }
    };

    fetchEnrollments();
  }, []);

  // Calculate dashboard statistics
  const enrolledCount = enrollments.length;

  const completedCount = enrollments.filter(
    (enrollment) => enrollment.status === "completed"
  ).length;

  const progress =
    enrolledCount > 0
      ? Math.round((completedCount / enrolledCount) * 100)
      : 0;

  const learningStats = [
    {
      title: "Enrolled Courses",
      value: enrolledCount,
      icon: "📚",
    },
    {
      title: "Completed Courses",
      value: completedCount,
      icon: "🏆",
    },
    {
      title: "Learning Progress",
      value: `${progress}%`,
      icon: "📈",
    },
  ];

  return (
    <main className="dashboard-page">
      <section className="dashboard-welcome">
        <div>
          <span className="dashboard-tag">STUDENT DASHBOARD</span>
          <h1>Welcome back, {studentName}! 👋</h1>
          <p>
            Every expert was once a beginner. Keep learning and building
            your future in technology.
          </p>
        </div>

        <Link to="/courses" className="dashboard-explore-button">
          Explore Courses →
        </Link>
      </section>

      <section className="dashboard-stats">
        {learningStats.map((stat) => (
          <article className="dashboard-stat-card" key={stat.title}>
            <div className="dashboard-stat-icon">{stat.icon}</div>
            <div>
              <h2>{stat.value}</h2>
              <p>{stat.title}</p>
            </div>
          </article>
        ))}
      </section>

      <section className="dashboard-learning">
        <div className="dashboard-section-heading">
          <div>
            <span className="dashboard-section-label">YOUR EDUCATION</span>
            <h2>My Learning</h2>
            <p>Continue where your learning journey begins.</p>
          </div>

          <Link to="/courses">View All Courses →</Link>
        </div>

        {loading ? (
          <div className="dashboard-empty-state">
            <h3>Loading your courses...</h3>
          </div>
        ) : error ? (
          <div className="dashboard-empty-state">
            <h3>Unable to load your courses</h3>
            <p>{error}</p>
          </div>
        ) : enrollments.length === 0 ? (
          <div className="dashboard-empty-state">
            <div className="dashboard-empty-icon">📖</div>
            <h3>No courses enrolled yet</h3>
            <p>
              You haven't enrolled in any courses. Explore our free courses
              and start learning today.
            </p>
            <Link to="/courses" className="dashboard-start-button">
              Browse Courses
            </Link>
          </div>
        ) : (
          <div className="dashboard-course-list">
            {enrollments.map((enrollment) => (
              <article
                className="dashboard-course-card"
                key={enrollment._id}
              >
                <div>
                  <h3>
                    {enrollment.course?.title || "Course unavailable"}
                  </h3>
                  <p>
                    Category: {enrollment.course?.category || "General"}
                  </p>
                  <p>
                    Status: {enrollment.status}
                  </p>
                </div>
              </article>
            ))}
          </div>
        )}
      </section>

      <section className="dashboard-motivation">
        <span>💡</span>
        <div>
          <h3>Keep Growing!</h3>
          <p>
            Consistency is the key to becoming a great developer.
            Learn something new every day.
          </p>
        </div>
      </section>
    </main>
  );
}

export default Dashboard;

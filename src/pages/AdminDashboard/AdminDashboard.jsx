import { Link } from "react-router-dom";
import "./AdminDashboard.css";

function AdminDashboard() {
  const stats = [
    { title: "Total Students", value: "0", icon: "👨‍🎓" },
    { title: "Total Courses", value: "8", icon: "📚" },
    { title: "Total Lessons", value: "0", icon: "🎥" },
    { title: "Platform Activity", value: "Active", icon: "📊" },
  ];

  return (
    <main className="admin-dashboard">
      <section className="admin-welcome">
        <div>
          <span className="admin-tag">ADMINISTRATION PANEL</span>
          <h1>Welcome, Administrator 👋</h1>
          <p>Manage your learning platform and help students grow.</p>
        </div>
        <span className="admin-status">● Platform Overview</span>
      </section>

      <section className="admin-stats">
        {stats.map((stat) => (
          <article className="admin-stat-card" key={stat.title}>
            <span className="admin-stat-icon">{stat.icon}</span>
            <div>
              <h2>{stat.value}</h2>
              <p>{stat.title}</p>
            </div>
          </article>
        ))}
      </section>

      <section className="admin-management">
        <div className="admin-section-heading">
          <span className="admin-tag-light">PLATFORM MANAGEMENT</span>
          <h2>Manage Your Platform</h2>
          <p>Quick access to important administration areas.</p>
        </div>

        <div className="admin-management-grid">
          <article className="admin-management-card">
            <span>📚</span>
            <h3>Manage Courses</h3>
            <p>Review and organize the courses available to students.</p>
            <Link to="/courses">View Courses →</Link>
          </article>

          <article className="admin-management-card">
            <span>🎓</span>
            <h3>Manage Students</h3>
            <p>Student management tools will be connected to the backend.</p>
            <Link to="/admin/students">Manage Students →</Link>
          </article>

          <article className="admin-management-card">
            <span>🎥</span>
            <h3>Manage Lessons</h3>
            <p>Organize learning materials and course lessons.</p>
            <button type="button" disabled>Coming Soon</button>
          </article>

          <article className="admin-management-card">
            <span>📊</span>
            <h3>Platform Reports</h3>
            <p>Monitor registrations and learning activity.</p>
            <button type="button" disabled>Coming Soon</button>
          </article>
        </div>
      </section>
    </main>
  );
}

export default AdminDashboard;

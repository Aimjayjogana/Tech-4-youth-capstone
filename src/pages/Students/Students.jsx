import { useEffect, useState } from "react";
import "./Students.css";

function Students() {
  const [students, setStudents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [search, setSearch] = useState("");
  const [updatingId, setUpdatingId] = useState(null);

  const fetchStudents = async () => {
    try {
      const token = localStorage.getItem("token");

      const response = await fetch(
        "http://localhost:5000/api/admin/students?limit=100",
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || "Failed to load students.");
      }

      setStudents(data.students || []);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchStudents();
  }, []);

  const toggleStudentStatus = async (student) => {
    const newStatus = !student.isActive;

    const confirmed = window.confirm(
      `Are you sure you want to ${
        newStatus ? "activate" : "deactivate"
      } ${student.fullName}?`
    );

    if (!confirmed) return;

    try {
      setUpdatingId(student._id);

      const response = await fetch(
        `http://localhost:5000/api/admin/students/${student._id}/status`,
        {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
          body: JSON.stringify({ isActive: newStatus }),
        }
      );

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || "Unable to update student.");
      }

      setStudents((previousStudents) =>
        previousStudents.map((item) =>
          item._id === student._id ? data.student : item
        )
      );

      alert(data.message);
    } catch (err) {
      alert(err.message);
    } finally {
      setUpdatingId(null);
    }
  };

  const filteredStudents = students.filter((student) => {
    const name = student.fullName?.toLowerCase() || "";
    const email = student.email?.toLowerCase() || "";
    const query = search.toLowerCase();

    return name.includes(query) || email.includes(query);
  });

  return (
    <main className="students-page">
      <section className="students-header">
        <div>
          <h1>Manage Students 🎓</h1>
          <p>View and manage all registered Tech 4 Youth students.</p>
        </div>

        <div className="students-count">
          Total Students: {students.length}
        </div>
      </section>

      <section className="students-toolbar">
        <input
          className="students-search"
          type="text"
          placeholder="Search students by name or email..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
      </section>

      {loading ? (
        <p className="students-message">Loading students...</p>
      ) : error ? (
        <p className="students-message students-error">{error}</p>
      ) : filteredStudents.length === 0 ? (
        <p className="students-message">No students found.</p>
      ) : (
        <div className="students-table-container">
          <table className="students-table">
            <thead>
              <tr>
                <th>Name</th>
                <th>Email</th>
                <th>Status</th>
                <th>Joined</th>
                <th>Action</th>
              </tr>
            </thead>

            <tbody>
              {filteredStudents.map((student) => (
                <tr key={student._id}>
                  <td className="student-name">{student.fullName}</td>
                  <td>{student.email}</td>
                  <td>
                    <span
                      className={`student-status ${
                        student.isActive ? "active" : "inactive"
                      }`}
                    >
                      {student.isActive ? "Active" : "Inactive"}
                    </span>
                  </td>
                  <td>
                    {student.createdAt
                      ? new Date(student.createdAt).toLocaleDateString()
                      : "N/A"}
                  </td>
                  <td>
                    <button
                      className={`student-action-button ${
                        student.isActive ? "deactivate" : "activate"
                      }`}
                      type="button"
                      onClick={() => toggleStudentStatus(student)}
                      disabled={updatingId === student._id}
                    >
                      {updatingId === student._id
                        ? "Updating..."
                        : student.isActive
                        ? "Deactivate"
                        : "Activate"}
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </main>
  );
}

export default Students;
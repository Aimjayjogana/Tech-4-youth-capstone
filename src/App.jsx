
import { Routes, Route } from "react-router-dom";

import Navbar from "./components/Navbar/Navbar";
import Footer from "./components/Footer/Footer";
import ProtectedRoute from "./components/ProtectedRoute/ProtectedRoute";

import Students from "./pages/Students/Students";
import AdminDashboard from "./pages/AdminDashboard/AdminDashboard";
import Dashboard from "./pages/Dashboard/Dashboard";
import Home from "./pages/Home/Home";
import Courses from "./pages/Courses/Courses";
import Lessons from "./pages/Lessons/Lessons";
import Login from "./pages/Login/Login";
import Register from "./pages/Register/Register";

import "./App.css";

function App() {
  return (
    <div className="app">
      <Navbar />

      <main className="main-content">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/courses" element={<Courses />} />

          <Route
            path="/courses/:courseId/lessons"
            element={<Lessons />}
          />

          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />

          {/* Student Dashboard Protection */}
          <Route element={<ProtectedRoute allowedRoles={["student"]} />}>
            <Route path="/dashboard" element={<Dashboard />} />
          </Route>

          {/* Admin Dashboard Protection */}
          <Route element={<ProtectedRoute allowedRoles={["admin"]} />}>
             <Route path="/admin-dashboard" element={<AdminDashboard />} />
             <Route path="/admin/students" element={<Students />} />
          </Route>
        </Routes>
      </main>

      <Footer />
    </div>
  );
}

export default App;


import { useState } from "react";
import { Link, NavLink, useNavigate, useLocation } from "react-router-dom";
import "./Navbar.css";

function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);

  const navigate = useNavigate();
  const location = useLocation();

  const closeMenu = () => setMenuOpen(false);

  // Get the currently logged-in user
  let user = null;

  try {
    user = JSON.parse(localStorage.getItem("user") || "null");
  } catch {
    user = null;
  }

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");

    closeMenu();
    navigate("/login");
  };

  return (
    <header className="navbar">
      <div className="navbar-container">
        <Link to="/" className="navbar-logo" onClick={closeMenu}>
          TECH <span>4</span> YOUTH
        </Link>

        <button
          className="hamburger"
          type="button"
          aria-label="Toggle navigation menu"
          aria-expanded={menuOpen}
          onClick={() => setMenuOpen(!menuOpen)}
        >
          <span className={menuOpen ? "bar open" : "bar"}></span>
          <span className={menuOpen ? "bar open" : "bar"}></span>
          <span className={menuOpen ? "bar open" : "bar"}></span>
        </button>

        <nav className={menuOpen ? "nav-links active" : "nav-links"}>
          <NavLink to="/" onClick={closeMenu}>Home</NavLink>

          <NavLink to="/courses" onClick={closeMenu}>Courses</NavLink>

          {user && user.role === "student" && (
            <NavLink to="/dashboard" onClick={closeMenu}>
              Dashboard
            </NavLink>
          )}

          {user && user.role === "admin" && (
            <NavLink to="/admin-dashboard" onClick={closeMenu}>
              Admin Dashboard
            </NavLink>
          )}

          <div className="nav-auth-links">
            {!user ? (
              <>
                <NavLink
                  to="/login"
                  onClick={closeMenu}
                  className="nav-login"
                >
                  Login
                </NavLink>

                <NavLink
                  to="/register"
                  onClick={closeMenu}
                  className="nav-register"
                >
                  Get Started
                </NavLink>
              </>
            ) : (
              <button
                type="button"
                className="nav-login"
                onClick={handleLogout}
              >
                Logout
              </button>
            )}
          </div>
        </nav>
      </div>
    </header>
  );
}

export default Navbar;

import { Link } from "react-router-dom";
import "./Footer.css";

function Footer() {
  return (
    <footer className="footer">
      <div className="footer-container">
        <div className="footer-brand">
          <Link to="/" className="footer-logo">
            TECH <span>4</span> YOUTH
          </Link>
          <p>
            Empowering young people with practical technology skills
            to build a brighter digital future.
          </p>
        </div>

        <div className="footer-links">
          <h3>Quick Links</h3>
          <Link to="/">Home</Link>
          <Link to="/courses">Courses</Link>
          <Link to="/dashboard">Student Dashboard</Link>
          <Link to="/login">Login</Link>
        </div>

        <div className="footer-links">
          <h3>Learning</h3>
          <Link to="/courses">Explore Courses</Link>
          <Link to="/register">Join Our Community</Link>
          <a
            href="https://www.youtube.com/results?search_query=net+ninja+javascript"
            target="_blank"
            rel="noopener noreferrer"
          >
            JavaScript Tutorials
          </a>
          <a
            href="https://www.youtube.com/results?search_query=net+ninja+react"
            target="_blank"
            rel="noopener noreferrer"
          >
            React Tutorials
          </a>
        </div>

        <div className="footer-contact">
          <h3>Get Started</h3>
          <p>Ready to begin your journey into technology?</p>
          <Link to="/register" className="footer-join-button">
            Join Tech 4 Youth →
          </Link>
        </div>
      </div>

      <div className="footer-bottom">
        <p>
          © {new Date().getFullYear()} Tech 4 Youth. All rights reserved.
        </p>
        <p>Built to empower the next generation of developers.</p>
      </div>
    </footer>
  );
}

export default Footer;
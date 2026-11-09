
import { Link } from "react-router-dom";
import "./Home.css";

const features = [
  {
    icon: "💻",
    style: "icon-blue",
    title: "Project-based learning",
    description:
      "Develop practical programming skills through tutorials and projects that help you understand how real applications are built.",
  },
  {
    icon: "📚",
    style: "icon-purple",
    title: "Free video courses",
    description:
      "Access curated learning resources covering eight technology tracks, from web development to essential developer tools.",
  },
  {
    icon: "❤️",
    style: "icon-green",
    title: "Learning opportunities",
    description:
      "Build valuable skills, connect with other learners and prepare yourself for opportunities in the technology industry.",
  },
];

function Home() {
  return (
    <main className="home-page">

      {/* Hero Section */}
      <section className="hero-section">
        <div className="hero-container">

          <div className="hero-content">
            <div className="hero-badge">
              🚀 Free for every young learner
            </div>

            <h1>
              Empowering the Next Generation of{" "}
              <span>Software Developers</span>
            </h1>

            <p className="hero-description">
              Learn to code by building real things. Explore eight practical
              technology courses and develop the skills to turn your ideas
              into real projects.
            </p>

            <div className="hero-buttons">
              <Link to="/courses" className="btn btn-primary">
                📚 Explore Courses
              </Link>

              <Link to="/register" className="btn btn-outline">
                Join Now →
              </Link>
            </div>

            <div className="hero-trust">
              <span>✓ Beginner friendly</span>
              <span>✓ 100% free learning</span>
              <span>✓ Learn at your own pace</span>
            </div>
          </div>

          {/* Coding Illustration */}
          <div className="hero-visual">
            <div className="visual-glow"></div>

            <div className="code-window">
              <div className="window-header">
                <div className="window-dots">
                  <span></span>
                  <span></span>
                  <span></span>
                </div>

                <span className="window-title">
                  my-first-project.js
                </span>
              </div>

              <div className="code-content">
                <div><span className="code-number">01</span> <span className="code-purple">const</span> <span className="code-blue">developer</span> = {"{"}</div>
                <div><span className="code-number">02</span> &nbsp; name: <span className="code-green">"Future Developer"</span>,</div>
                <div><span className="code-number">03</span> &nbsp; skills: [</div>
                <div><span className="code-number">04</span> &nbsp;&nbsp; <span className="code-green">"HTML"</span>,</div>
                <div><span className="code-number">05</span> &nbsp;&nbsp; <span className="code-green">"CSS"</span>,</div>
                <div><span className="code-number">06</span> &nbsp;&nbsp; <span className="code-green">"JavaScript"</span></div>
                <div><span className="code-number">07</span> &nbsp; ],</div>
                <div><span className="code-number">08</span> &nbsp; learning: <span className="code-orange">true</span></div>
                <div><span className="code-number">09</span> {"}"};</div>

                <div className="code-output">
                  <span className="code-number">10</span>{" "}
                  <span className="code-purple">console</span>.log(
                  <span className="code-green">"Hello, World!"</span>);
                </div>
              </div>

              <div className="code-status">
                <span className="status-dot"></span>
                Ready to build something amazing
              </div>
            </div>

            <div className="floating-card floating-card-top">
              <span className="floating-icon">{"</>"}</span>
              <div>
                <strong>Write Code</strong>
                <small>Build your future</small>
              </div>
            </div>

            <div className="floating-card floating-card-bottom">
              <span className="floating-icon">🚀</span>
              <div>
                <strong>Start Learning</strong>
                <small>Your journey begins here</small>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Why Choose Us */}
      <section className="why-section">
        <div className="section-heading">
          <span className="section-label">WHY CHOOSE US</span>
          <h2>Why Tech 4 Youth?</h2>
          <p>
            A learning platform designed to make technology education
            accessible, practical and exciting for young people.
          </p>
        </div>

        <div className="features-grid">
          {features.map((feature) => (
            <article className="feature-card" key={feature.title}>
              <div className={`feature-icon ${feature.style}`}>
                {feature.icon}
              </div>

              <h3>{feature.title}</h3>
              <p>{feature.description}</p>
            </article>
          ))}
        </div>
      </section>

      {/* Courses Preview */}
      <section className="courses-preview">
        <div className="courses-preview-content">
          <span className="section-label">START YOUR JOURNEY</span>

          <h2>Discover What You Can Learn</h2>

          <p>
            Explore eight learning tracks covering programming,
            web development and essential developer tools.
          </p>
        </div>

        <Link to="/courses" className="btn btn-primary">
          View All Courses →
        </Link>
      </section>

      {/* Call to Action */}
      <section className="cta-section">
        <div className="cta-icon">🚀</div>

        <div className="cta-content">
          <h2>Your coding journey starts today</h2>

          <p>
            Create a free account, choose your learning track and take
            the first step towards becoming a developer.
          </p>

          <div className="cta-buttons">
            <Link to="/register" className="btn btn-primary">
              Join Now →
            </Link>

            <Link to="/courses" className="btn btn-cta-outline">
              Explore Courses
            </Link>
          </div>
        </div>
      </section>

    </main>
  );
}

export default Home;

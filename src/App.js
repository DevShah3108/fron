// src/App.js
import React, { useState, useEffect} from 'react';
import axios from 'axios';
import 'bootstrap/dist/css/bootstrap.min.css';
import ProjectCard from './ProjectCard';
import ChatBot from './ChatBot';


import { 
  Navbar, Nav, Container, Row, Col, 
  Button, Form 
} from 'react-bootstrap';
import SkillsSection from './SkillSection';

// Environment-based configuration
const backendBaseURL = process.env.REACT_APP_BACKEND_URL; //|| 'http://localhost:3001';

const App = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });

  // Fix navigation scrolling to account for navbar height
  useEffect(() => {
    const handleScroll = () => {
      const navbarHeight = document.querySelector('.navbar')?.offsetHeight || 80;
      const hash = window.location.hash;
      
      if (hash) {
        const targetElement = document.querySelector(hash);
        if (targetElement) {
          window.scrollTo({
            top: targetElement.offsetTop - navbarHeight,
            behavior: 'smooth'
          });
        }
      }
    };

    window.addEventListener('hashchange', handleScroll);
    return () => window.removeEventListener('hashchange', handleScroll);
  }, []);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post(`${backendBaseURL}/api/send-email`, formData);
      alert('Message sent successfully!');
      setFormData({
        name: '',
        email: '',
        subject: '',
        message: ''
      });
    } catch (error) {
      alert('Failed to send message. Please try again later or contact me directly at devshah31804@gmail.com');
      console.error('API Error:', error.response?.data || error.message);
    }
  };
  


  return (
    <>
      {/* Navbar with Logo */}
      <Navbar bg="dark" variant="dark" expand="lg" fixed="top" className="py-3 shadow-sm">
        <Container>
          <Navbar.Brand href="#home" className="fw-bold d-flex align-items-center">
            <div className="logo-placeholder me-2 rounded-circle d-flex align-items-center justify-content-center" 
                 style={{ width: '40px', height: '40px', backgroundColor: '#6c757d' }}>
              <span className="text-light">DS</span>
            </div>
            DEV R SHAH
          </Navbar.Brand>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="ms-auto">
              <Nav.Link href="#home">Home</Nav.Link>
              <Nav.Link href="#education">Education</Nav.Link>
              <Nav.Link href="#skills">Skills</Nav.Link>
              <Nav.Link href="#projects">Projects</Nav.Link>
              <Nav.Link href="#experience">Experience</Nav.Link>
              <Nav.Link href="#contact">Contact</Nav.Link>
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>

      {/* Main Content */}
      <div style={{ paddingTop: "80px" }}>
        {/* Hero Section */}
        <section id="home" className="py-4 py-md-5" style={{ backgroundColor: '#f8f9fa' }}>
          <Container>
            <Row className="align-items-center">
              <Col md={5} className="mb-4 mb-md-0 d-flex justify-content-center">
                <div className="profile-photo-container">
                  <div className="profile-photo-wrapper">
                    <img 
                      src="./dev.jpg" 
                      alt="Dev Shah" 
                      className="profile-photo-img"
                    />
                  </div>
                </div>
              </Col>

              <Col md={7} className="text-center text-md-start ps-md-5 mt-4 mt-md-0">
                <h1 className="display-4 fw-bold mb-4">Dev Shah</h1>
                <p className="lead text-secondary mb-4" style={{ maxWidth: '600px', lineHeight: 1.75, fontSize: '1.125rem' }}>
                  I'm Dev Shah, an Information Technology(L.Y.) student at SVIT with a passion for software development and AI/ML integration. I thrive on exploring emerging technologies like IoT and turning them into practical, efficient solutions. Committed to continuous learning, I transform ideas into impactful software every day.
                </p>
                <div className="d-flex flex-wrap gap-3 justify-content-center justify-content-md-start">
                  <Button href="#projects" variant="outline-dark" size="lg" className="px-4 py-2 fw-medium">
                    View Projects
                  </Button>
                  <Button href="#contact" variant="dark" size="lg" className="px-4 py-2 fw-medium">
                    Contact Me
                  </Button>
                </div>
              </Col>
            </Row>
          </Container>
        </section>

        {/* Education Section */}
        <section id="education" className="py-4 py-md-5 bg-white">
          <Container>
            <div className="text-center mb-5">
              <h2 className="display-5 fw-bold mb-3">Education</h2>
              <div className="divider mx-auto bg-dark" style={{ width: '60px', height: '2px' }}></div>
            </div>
            <Row className="g-4">
          
              <Col md={4}>
                <div className="h-100 p-4 border">
                  <h4 className="fw-bold mb-3">B.E. in Information Technology</h4>
                  <h5 className="text-muted mb-3">SVIT - Vadodara</h5>
                  <p className="text-muted mb-3">2022 - 2026</p>
                  <p className="text-muted mb-3">CGPA: 8.65</p>
                  <p className="mb-0">
                    I got admission with 100% scholarship in SVIT college. Focused on Data Structures, DBMS, Networks, OS, Software Engineering, Web Development, and AI/ML.
                  </p>
                </div>
              </Col>
              <Col md={4}>
                <div className="h-100 p-4 border">
                  <h4 className="fw-bold mb-3">12th Science (Gujarat Board)</h4>
                  <h5 className="text-muted mb-3">Cell Academy - Surat</h5>
                  <p className="text-muted mb-3">2021 - 2022</p>
                  <p className="text-muted mb-3">Result: 88 PR</p>
                  <p className="mb-0">I learned Maths, Physics and Chemistry with strong interest in science. Maths was my primary focus and most interesting subject.</p>
                </div>
              </Col>
              <Col md={4}>
                <div className="h-100 p-4 border">
                  <h4 className="fw-bold mb-3">10th SSC (GSEB)</h4>
                  <h5 className="text-muted mb-3">V.D. Desai Vadiwala School - Surat</h5>
                  <p className="text-muted mb-3">2019 - 2020</p>
                  <p className="text-muted mb-3">Result: 79%</p>
                  <p className="mb-0">I studied all subjects and got good scores. Sanskrit was my strongest subject at that time, and I excelled in Maths.</p>
                </div>
              </Col>
            </Row>
          </Container>
        </section>

   {/* Skills Section */}
<SkillsSection/>        {/* Projects Section */}
        <section id="projects" className="py-4 py-md-5 bg-white">
          <Container>
            <div className="text-center mb-5">
              <h2 className="display-5 fw-bold mb-3">Projects</h2>
              <div className="divider mx-auto bg-dark" style={{ width: '60px', height: '2px' }}></div>
            </div>
            <Row className="g-4">
              <Col md={6} lg={4}>
                <ProjectCard
          title="Hostel Finding System"
          description="AI-powered hostel finder using computer vision and machine learning to analyze images and provide recommendations based on user preferences."
          technologies={["React Js", "IoT", "Node js", "Mongodb", "FireBase"]}
          images={[
            "./hostelfind1.jpg",
             "./hostelfind2.jpg",
             "./hostelfind3.jpg"
          ]}
        />
              </Col>
              <Col md={6} lg={4}>
                <ProjectCard
          title="Smart Door Lock System"
          description="Advanced security system using facial recognition and voice authentication with automatic locking via proximity sensors."
          technologies={["Raspberry Pi", "IoT", "Computer Vision", "Machine Learning", "Python"]}
          images={[
            "./doorlock.jpg",
            "./doorlock2.jpg"
          ]}
        />
              </Col>
              <Col md={6} lg={4}>
                <ProjectCard 
                  title="Flight Booking System" 
                  description="Dynamic pricing flight booking platform with ML-based demand forecasting for optimized ticket pricing." 
                  technologies={["Python", "Regression", "Flask", "HTML", "CSS", "JavaScript"]}
                  images={[
            "./flightbook1.jpg",
            "./flightbook2.jpg"
          ]}
                />
              </Col>
            </Row>
          </Container>
        </section>

        {/* Experience Section */}
        <section id="experience" className="py-4 py-md-5" style={{ backgroundColor: '#f8f9fa' }}>
          <Container>
            <div className="text-center mb-5">
              <h2 className="display-5 fw-bold mb-3">Work Experience</h2>
              <div className="divider mx-auto bg-dark" style={{ width: '60px', height: '2px' }}></div>
            </div>
            <div className="timeline">
              <div className="timeline-item">
                <div className="timeline-content p-4 border">
                  <div className="d-flex justify-content-between mb-3">
                    <div>
                      <h4 className="fw-bold mb-1">AI/ML Intern</h4>
                      <h5 className="text-muted">Sparks To Ideas</h5>
                    </div>
                    <span className="text-muted">2025 - MAR</span>
                  </div>
                  <ul className="mb-0">
                    <li>Mastered Python libraries essential for AI/ML development</li>
                    <li>Applied pandas, NumPy, scikit-learn, TensorFlow in real projects</li>
                    <li>Developed end-to-end machine learning solutions</li>
                    <li>Created visualizations using Matplotlib and Seaborn</li>
                  </ul>
                </div>
              </div>
            </div>
          </Container>
        </section>

        {/* Contact Section */}
        <section id="contact" className="py-4 py-md-5 bg-white">
          <Container>
            <div className="text-center mb-5">
              <h2 className="display-5 fw-bold mb-3">Contact Me</h2>
              <div className="divider mx-auto bg-dark" style={{ width: '60px', height: '2px' }}></div>
            </div>
            <Row>
              <Col lg={5} className="mb-5 mb-lg-0">
                <div className="p-4 border h-100">
                  <h4 className="fw-bold mb-4">Contact Information</h4>
                  <a href="https://www.google.com/maps/search/Surat" target="_blank" rel="noopener noreferrer" className="d-block contact-link mb-4 p-3 rounded text-decoration-none text-reset">
                    <div className="d-flex align-items-start">
                      <div className="me-3 fs-4">📍</div>
                      <div>
                        <h5 className="fw-medium mb-1">Location</h5>
                        <p className="mb-0 text-muted">Surat, Gujarat, India</p>
                      </div>
                    </div>
                  </a>
                  <a href="https://mail.google.com/mail/?view=cm&fs=1&to=devshah31804@gmail.com" target="_blank" rel="noopener noreferrer" className="d-block contact-link mb-4 p-3 rounded text-decoration-none text-reset">
                    <div className="d-flex align-items-start">
                      <div className="me-3 fs-4">✉️</div>
                      <div>
                        <h5 className="fw-medium mb-1">Email</h5>
                        <p className="mb-0 text-muted">devshah31804@gmail.com</p>
                      </div>
                    </div>
                  </a>
                  <a href="https://linkedin.com/in/devshah4956" target="_blank" rel="noopener noreferrer" className="d-block contact-link p-3 rounded text-decoration-none text-reset">
                    <div className="d-flex align-items-start">
                      <div className="me-3 fs-4">🔗</div>
                      <div>
                        <h5 className="fw-medium mb-1">LinkedIn</h5>
                        <p className="mb-0 text-muted">linkedin.com/in/devshah4956</p>
                      </div>
                    </div>
                  </a>
                </div>
              </Col>
              <div className="chatbot-container" style={{ right: '30px', bottom: '30px' }}>
                <ChatBot/></div>
              <Col lg={7}>
                <div className="p-4 border h-100">
                  <h4 className="fw-bold mb-4">Send a Message</h4>
                  <Form onSubmit={handleSubmit}>
                    <Row>
                      <Col md={6}>
                        <Form.Group className="mb-3">
                          <Form.Label className="fw-medium">Your Name</Form.Label>
                          <Form.Control
                            type="text"
                            name="name"
                            value={formData.name}
                            onChange={handleChange}
                            placeholder="Name"
                            className="py-2"
                          />
                        </Form.Group>
                      </Col>
                      <Col md={6}>
                        <Form.Group className="mb-3">
                          <Form.Label className="fw-medium">Your Email</Form.Label>
                          <Form.Control
                            type="email"
                            name="email"
                            value={formData.email}
                            onChange={handleChange}
                            placeholder="john@example.com"
                            className="py-2"
                          />
                        </Form.Group>
                      </Col>
                    </Row>
                    <Form.Group className="mb-3">
                      <Form.Label className="fw-medium">Subject</Form.Label>
                      <Form.Control
                        type="text"
                        name="subject"
                        value={formData.subject}
                        onChange={handleChange}
                        placeholder="Project Inquiry"
                        className="py-2"
                      />
                    </Form.Group>
                    <Form.Group className="mb-4">
                      <Form.Label className="fw-medium">Message</Form.Label>
                      <Form.Control
                        as="textarea"
                        name="message"
                        rows={5}
                        value={formData.message}
                        onChange={handleChange}
                        placeholder="Your message here..."
                        className="py-2"
                      />
                    </Form.Group>
                    <Button variant="dark" type="submit" className="btn btn-dark w-100 py-2 fw-medium rounded-3 shadow-sm">
                      Send Message
                    </Button>
                  </Form>
                </div>
              </Col>
            </Row>
          </Container>
        </section>
      </div>

      {/* Enhanced Professional Footer */}
      <footer className="bg-dark text-white py-5">
        <Container>
          <Row className="g-4">
            <Col lg={4} className="mb-4 mb-lg-0">
              <div className="d-flex align-items-center mb-4">
                <div className="logo-placeholder me-3 rounded-circle d-flex align-items-center justify-content-center" 
                     style={{ width: '50px', height: '50px', backgroundColor: '#495057' }}>
                  <span className="text-white fs-5">DS</span>
                </div>
                <div>
                  <h3 className="fw-bold mb-0 text-white">
                    Dev Shah
                  </h3>
                  <p className="text-white-50 mb-0">B.E. IT Student at SVIT</p>
                </div>
              </div>
              <p className="text-white-50">
                Transforming ideas into impactful software with expertise in AI/ML, IoT, and full-stack development.
              </p>
              <div className="d-flex gap-3">
                <a href="https://www.linkedin.com/in/devshah4956" target="_blank" rel="noopener noreferrer" className="text-white">
                  <i className="bi bi-linkedin fs-4"></i>
                </a>
                <a href="https://github.com/devshah4956" target="_blank" rel="noopener noreferrer" className="text-white">
                  <i className="bi bi-github fs-4"></i>
                </a>
                <a href="mailto:devshah31804@gmail.com" className="text-white">
                  <i className="bi bi-envelope fs-4"></i>
                </a>
              </div>
            </Col>
            
            <Col lg={4} className="mb-4 mb-lg-0">
              <h5 className="fw-bold mb-4 text-white">Quick Links</h5>
              <div className="d-flex flex-column gap-2">
                <a href="#home" className="text-white text-decoration-none hover-underline">Home</a>
                <a href="#education" className="text-white text-decoration-none hover-underline">Education</a>
                <a href="#skills" className="text-white text-decoration-none hover-underline">Skills</a>
                <a href="#projects" className="text-white text-decoration-none hover-underline">Projects</a>
                <a href="#experience" className="text-white text-decoration-none hover-underline">Experience</a>
                <a href="#contact" className="text-white text-decoration-none hover-underline">Contact</a>
              </div>
            </Col>
            
            <Col lg={4}>
              <h5 className="fw-bold mb-4 text-white">Get In Touch</h5>
              <ul className="list-unstyled">
                <li className="mb-3 d-flex align-items-center">
                  <i className="bi bi-geo-alt me-3 text-info fs-5"></i>
                  <span className="text-white-50">Surat, Gujarat, India</span>
                </li>
                <li className="mb-3 d-flex align-items-center">
                  <i className="bi bi-envelope me-3 text-info fs-5"></i>
                  <a href="https://mail.google.com/mail/?view=cm&fs=1&to=devshah31804@gmail.com"
                  target='_blank' rel="noopener noreferrer" className="text-white-50 text-decoration-none hover-underline">
                    devshah31804@gmail.com
                  </a>
                </li>
                <li className="d-flex align-items-center">
                  <i className="bi bi-linkedin me-3 text-info fs-5"></i>
                  <a href="https://linkedin.com/in/devshah4956" target="_blank" rel="noopener noreferrer" className="text-white-50 text-decoration-none hover-underline">
                    linkedin.com/in/devshah4956
                  </a>
                </li>
              </ul>
            </Col>
          </Row>
          
          <hr className="my-4 bg-white opacity-10" />
          
          <Row className="align-items-center">
            <Col md={6} className="text-center text-md-start mb-3 mb-md-0">
              <p className="text-white-50 mb-0 small">
                &copy; {new Date().getFullYear()} Dev Shah. All rights reserved.
              </p>
            </Col>
            <Col md={6} className="text-center text-md-end">
              <p className="text-white-50 mb-0 small">
                Designed and built with passion using React & Bootstrap
              </p>
            </Col>
          </Row>
        </Container>
        
        {/* Add this style tag for hover effects */}
        <style>{`
        /* Skills Section Styles */
.skill-column {
  background: white;
  transition: transform 0.3s ease, box-shadow 0.3s ease;
  border: 1px solid rgba(0,0,0,0.05);
}

.skill-column:hover {
  transform: translateY(-5px);
  box-shadow: 0 10px 20px rgba(0,0,0,0.1) !important;
}

.skill-card {
  width: 120px;
  padding: 15px 10px;
  border-radius: 12px;
  transition: all 0.3s ease;
  background: rgba(255,255,255,0.7);
}

.skill-card:hover {
  transform: scale(1.05);
  background: white;
  box-shadow: 0 5px 15px rgba(0,0,0,0.1);
}

.skill-icon-wrapper {
  width: 80px;
  height: 80px;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: transform 0.3s ease;
}

.skill-card:hover .skill-icon-wrapper {
  transform: rotate(10deg);
}

.tech-cloud {
  border-radius: 16px;
  background: linear-gradient(135deg, #f0f8ff, #e6f7ff);
  border: 1px solid rgba(0,123,255,0.1);
  position: relative;
  overflow: hidden;
  height: 300px;
}

.tech-cloud-overlay {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: radial-gradient(circle at center, transparent 40%, #f8f9fa 100%);
  pointer-events: none;
}

.tech-tag {
  position: absolute;
  display: inline-block;
  transform: translate(-50%, -50%);
  transform-origin: center;
  border: 1px solid rgba(0, 0, 0, 0.1);
  padding: 8px 16px;
  border-radius: 20px;
  white-space: nowrap;
  background: white;
  opacity: 0.9;
  z-index: 1;
  font-weight: 500;
  transition: all 0.3s ease;
  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);

  animation: moveBubble infinite ease-in-out;
  animation-duration: var(--duration);
  animation-delay: var(--delay);
}

.tech-tag:hover {
  transform: translate(-50%, -50%) scale(1.2);
  z-index: 100;
  animation-play-state: paused;
  opacity: 1;
  box-shadow: 0 5px 15px rgba(0, 0, 0, 0.2);
}

@keyframes moveBubble {
  0% {
    transform: translate(0, 0);
  }
  25% {
    transform: translate(var(--move-x), var(--move-y));
  }
  50% {
    transform: translate(calc(var(--move-x) * -1), var(--move-y));
  }
  75% {
    transform: translate(var(--move-x), calc(var(--move-y) * -1));
  }
  100% {
    transform: translate(0, 0);
  }
}

.bg-primary-light {
  background-color: rgba(13, 110, 253, 0.15) !important;
  color: #0d6efd;
  border-color: rgba(13, 110, 253, 0.2) !important;
}

.bg-danger-light {
  background-color: rgba(220, 53, 69, 0.15) !important;
  color: #dc3545;
  border-color: rgba(220, 53, 69, 0.2) !important;
}

.bg-success-light {
  background-color: rgba(25, 135, 84, 0.15) !important;
  color: #198754;
  border-color: rgba(25, 135, 84, 0.2) !important;
}

.bg-warning-light {
  background-color: rgba(255, 193, 7, 0.15) !important;
  color: #ffc107;
  border-color: rgba(255, 193, 7, 0.2) !important;
}

.bg-info-light {
  background-color: rgba(13, 202, 240, 0.15) !important;
  color: #0dcaf0;
  border-color: rgba(13, 202, 240, 0.2) !important;
}

.bg-purple-light {
  background-color: rgba(111, 66, 193, 0.15) !important;
  color: #6f42c1;
  border-color: rgba(111, 66, 193, 0.2) !important;
}

.bg-dark-light {
  background-color: rgba(33, 37, 41, 0.15) !important;
  color: #212529;
  border-color: rgba(33, 37, 41, 0.2) !important;
}

.bg-secondary-light {
  background-color: rgba(108, 117, 125, 0.15) !important;
  color: #6c757d;
  border-color: rgba(108, 117, 125, 0.2) !important;
}

/* Existing styles from your code */
.hover-underline {
  position: relative;
  display: inline-block;
  transition: all 0.3s ease;
}

.hover-underline:hover {
  color: #0dcaf0 !important;
}

.hover-underline::after {
  content: '';
  position: absolute;
  width: 0;
  height: 2px;
  bottom: -2px;
  left: 0;
  background-color: #0dcaf0;
  transition: width 0.3s ease;
}

.hover-underline:hover::after {
  width: 100%;
}

.logo-placeholder {
  transition: transform 0.3s ease;
}

.logo-placeholder:hover {
  transform: scale(1.1);
}

.divider {
  width: 80px;
  height: 4px;
  background: linear-gradient(90deg, #4361ee, #3a0ca3);
  border-radius: 2px;
}

h2.display-5 {
  color: #212529;
  position: relative;
  padding-bottom: 10px;
}

.gray-shadow-sm {
  box-shadow: 0 .125rem .25rem rgba(128, 128, 128, 0.3);
}

.gray-shadow-sm:hover {
  box-shadow: 0 .25rem .5rem rgba(128, 128, 128, 0.4);
}

/* Ensure sections account for fixed navbar */
section {
  scroll-margin-top: 85px;
}

/* Modern, borderless profile photo */
.profile-photo-container {
  position: relative;
  display: inline-block;
  z-index: 1;
}

.profile-photo-wrapper {
  width: 280px;
  height: 280px;
  border-radius: 50%;
  overflow: hidden;
  position: relative;
  box-shadow: 
    0 15px 35px rgba(0, 0, 0, 0.1),
    0 3px 10px rgba(0, 0, 0, 0.08);
  transition: all 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275);
}

.profile-photo-wrapper:hover {
  transform: scale(1.02);
  box-shadow: 
    0 25px 50px rgba(0, 0, 0, 0.15),
    0 10px 20px rgba(0, 0, 0, 0.1);
}

.profile-photo-img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  object-position: center;
  transition: transform 0.5s ease;
}

.profile-photo-wrapper:hover .profile-photo-img {
  transform: scale(1.05);
}

/* Add a subtle glow effect */
.profile-photo-container::before {
  content: '';
  position: absolute;
  top: -10px;
  left: -10px;
  right: -10px;
  bottom: -10px;
  background: linear-gradient(
    45deg,
    rgba(52, 152, 219, 0.1),
    rgba(155, 89, 182, 0.1),
    rgba(26, 188, 156, 0.1)
  );
  border-radius: 50%;
  z-index: -1;
  animation: rotate 15s linear infinite;
  filter: blur(20px);
}

@keyframes rotate {
  from { transform: rotate(0deg); }
  to { transform: rotate(360deg); }
}

@media (max-width: 768px) {
  .profile-photo-wrapper {
    width: 240px;
    height: 240px;
  }
  
  .tech-cloud {
    height: 250px;
  }
  
  .tech-tag {
    font-size: 0.85rem !important;
    padding: 6px 12px !important;
  }
}`}</style>
      </footer>
    </>
  );
};

export default App;
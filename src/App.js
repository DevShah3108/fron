// src/App.js
import React from 'react';
import axios from 'axios';
import { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import ProjectCard from './ProjectCard';
import { 
  Navbar, Nav, Container, Row, Col, ProgressBar, 
  Card, Button, Form 
} from 'react-bootstrap';




const App = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post('http://localhost:3000/api/send-email', formData);
      alert('Message sent successfully!');
      setFormData({
      name: '',
      email: '',
      subject: '',
      message: ''
    });
    } catch (error) {
      alert('Failed to send message.');
      console.error(error);
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
        <section id="home" className="py-6" style={{ backgroundColor: '#f8f9fa' }}>
          <Container>
            <Row className="align-items-center">
              <Col md={5} className="mb-5 mb-md-0">
                <div className="position-relative">
                  <div className="bg-light position-absolute top-0 start-0 rounded-circle" style={{ width: '300px', height: '300px' }}></div>
                  <img 
                    src="./dev.jpg"alt="Dev Shah" 
                    className="img-fluid rounded-circle position-relative z-1 border" 
                    style={{
    width: '280px',
    height: '280px',
    objectFit: 'cover',
    borderRadius: '50%',
    borderWidth: '5px',
    borderStyle: 'solid',
    borderColor: '#000' // Change to any color you like
  }}
                  />

                </div>
              </Col>
              <Col md={7} className="ps-md-5">
                <h6 className="text-uppercase text-muted mb-3">B.E. IT Student</h6>
                <h1 className="display-4 fw-bold mb-4">Dev Shah</h1>
                <p className="lead text-secondary mb-4" style={{ maxWidth: '600px', lineHeight: 1.75, fontSize: '1.125rem' }}>
                  I'm Dev Shah, an Information Technology undergrad at SVIT with a passion for software development and AI/ML integration. I thrive on exploring emerging technologies like IoT and turning them into practical, efficient solutions. Committed to continuous learning, I transform ideas into impactful software every day.
                </p>
                <div className="d-flex flex-wrap gap-3">
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
        <section id="education" className="py-6 bg-white">
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
        <section id="skills" className="py-6 mb-5" style={{ backgroundColor: '#f8f9fa' }}>
          <Container>
            <div className="text-center mb-5">
              <h2 className="display-5 fw-bold mb-3">Skills & Technologies</h2>
              <div className="divider mx-auto bg-dark" style={{ width: '60px', height: '2px' }}></div>
            </div>
            <Row className="g-4">
              <Col md={6}>
                {[
                  { skill: 'C', level: 95 },
                  { skill: 'Java', level: 90 },
                  { skill: 'Python', level: 80 },
                  { skill: 'IoT', level: 90 },
                  { skill: 'Computer Vision', level: 90 }
                ].map((item, index) => (
                  <div className="mb-4" key={index}>
                    <div className="d-flex justify-content-between mb-2">
                      <span className="fw-medium">{item.skill}</span>
                      <span className="text-muted">{item.level}%</span>
                    </div>
                    <ProgressBar now={item.level} variant="dark" className="rounded-0" style={{ height: '8px' }} />
                  </div>
                ))}
              </Col>
              <Col md={6}>
                {[
                  { skill: 'Basics of Neural Networks', level: 90 },
                  { skill: 'AI/ML', level: 90 },
                  { skill: 'HTML, CSS & JavaScript', level: 90 },
                  { skill: 'React js', level: 60 },
                  { skill: 'Node js & Express js', level: 50 }
                ].map((item, index) => (
                  <div className="mb-4" key={index}>
                    <div className="d-flex justify-content-between mb-2">
                      <span className="fw-medium">{item.skill}</span>
                      <span className="text-muted">{item.level}%</span>
                    </div>
                    <ProgressBar now={item.level} variant="dark" className="rounded-0" style={{ height: '8px' }} />
                  </div>
                ))}
              </Col>
            </Row>
            <div className="mt-5">
              <h5 className="fw-bold mb-4">Used Technologies</h5>
              <div className="d-flex flex-wrap gap-2">
                {['llama.cpp for AI chatbot', 'OpenCV', 'TensorFlow', 'MongoDB', 'AI/ML', 'GrowPi', 'Firebase', 'MySQL'].map((tech, index) => (
                  <span key={index} className="py-1 px-3 border text-muted">
                    {tech}
                  </span>
                ))}
              </div>
            </div>
          </Container>
        </section>

        {/* Projects Section */}
        <section id="projects" className="py-6 bg-white">
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
             // replace with your image paths
            
          ]}
        />
              </Col>
              <Col md={6} lg={4}>
                <ProjectCard
          title="Smart Door Lock System"
          description="Advanced security system using facial recognition and voice authentication with automatic locking via proximity sensors."
          technologies={["Raspberry Pi", "IoT", "Computer Vision", "Machine Learning", "Python"]}
          images={[
            "./doorlock.jpg", // replace with your image paths
            
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
            "./flightbook2.jpg" // replace with your image paths
            
          ]}
                />
              </Col>
            </Row>
          </Container>
        </section>

        {/* Experience Section */}
        <section id="experience" className="py-6" style={{ backgroundColor: '#f8f9fa' }}>
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
        <section id="contact" className="py-6 bg-white">
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
                  <a href="https://mail.google.com/mail/?view=cm&fs=1&to=devshah31804@gmail.com" target="_blank" className="d-block contact-link mb-4 p-3 rounded text-decoration-none text-reset">
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
      <Button variant="dark" type="submit" className="w-100 py-2 fw-medium">
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
            target='_blank' className="text-white-50 text-decoration-none hover-underline">
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
  <style jsx>{`
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
  `}</style>
</footer>
    </>
  );
};

export default App;
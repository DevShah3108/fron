import React, { useState, useEffect, useRef } from 'react';
import { Container, Row, Col } from 'react-bootstrap';

const SkillsSection = () => {
  const [draggedIndex, setDraggedIndex] = useState(null);
  const containerRef = useRef(null);
  const bubblesRef = useRef([]);
  
  const coreTechnologies = [
    { skill: 'C Programming', iconClass: 'bi-code-slash fs-1', color: '#264de4' },
    { skill: 'Java Development', iconClass: 'bi-code-slash fs-1', color: '#5382a1' },
    { skill: 'Python', iconClass: 'bi-code-slash fs-1', color: '#ffd43b' },
    { skill: 'IoT Systems', iconClass: 'bi-cpu fs-1', color: '#20c997' },
    { skill: 'Computer Vision', iconClass: 'bi-eye fs-1', color: '#6f42c1' }
  ];
  
  const webAiTechnologies = [
    { skill: 'Neural Networks', iconClass: 'bi-diagram-3 fs-1', color: '#e83e8c' },
    { skill: 'AI/ML Algorithms', iconClass: 'bi-robot fs-1', color: '#fd7e14' },
    { skill: 'HTML, CSS & JS', iconClass: 'bi-filetype-html fs-1', color: '#e34c26' },
    { skill: 'React.js', iconClass: 'bi-lightning-charge fs-1', color: '#61dafb' },
    { skill: 'Node.js & Express', iconClass: 'bi-filetype-js fs-1', color: '#68a063' }
  ];
  
  const bubbleTechnologies = [
    { name: 'llama.cpp', category: 'ai' },
    { name: 'OpenCV', category: 'ai' },
    { name: 'TensorFlow', category: 'ai' },
    { name: 'MongoDB', category: 'database' },
    { name: 'AI/ML', category: 'ai' },
    { name: 'GrowPi', category: 'iot' },
    { name: 'Firebase', category: 'database' },
    { name: 'MySQL', category: 'database' },
    { name: 'Pandas', category: 'data' },
    { name: 'NumPy', category: 'data' },
    { name: 'Git', category: 'tool' },
    { name: 'Docker', category: 'tool' },
    { name: 'REST API', category: 'web' },
    { name: 'Linux', category: 'os' },
    { name: 'Arduino', category: 'iot' },
    { name: 'Python', category: 'language' },
    { name: 'JavaScript', category: 'language' },
    { name: 'React.js', category: 'web' },
    { name: 'Node.js', category: 'web' },
    { name: 'Computer Vision', category: 'ai' }
  ];
  
  // Initialize positions for bubble technologies
  const [bubblePositions, setBubblePositions] = useState(
    bubbleTechnologies.map(() => {
      return {
        x: 30 + Math.random() * 40,
        y: 30 + Math.random() * 40,
        vx: (Math.random() - 0.5) * 0.8,
        vy: (Math.random() - 0.5) * 0.8,
        isDragging: false,
        size: 0.8 + Math.random() * 0.6
      };
    })
  );
  
  // Animation loop for bubbles
  useEffect(() => {
    let animationFrameId;
    
    const animate = () => {
      setBubblePositions(prevPositions => 
        prevPositions.map((pos, index) => {
          if (pos.isDragging || draggedIndex === index) return pos;
          
          const container = containerRef.current;
          if (!container) return pos;
          
          // Get bubble element to calculate size
          const bubble = bubblesRef.current[index];
          if (!bubble) return pos;
          
          const bubbleRect = bubble.getBoundingClientRect();
          const containerRect = container.getBoundingClientRect();
          
          // Calculate size in percentage
          const bubbleWidth = (bubbleRect.width / containerRect.width) * 100;
          const bubbleHeight = (bubbleRect.height / containerRect.height) * 100;
          
          let newX = pos.x + pos.vx;
          let newY = pos.y + pos.vy;
          let newVx = pos.vx;
          let newVy = pos.vy;
          
          // Boundary collision with bubble size consideration
          if (newX < bubbleWidth/2) {
            newX = bubbleWidth/2;
            newVx = Math.abs(pos.vx) * 0.8;
          } else if (newX > 100 - bubbleWidth/2) {
            newX = 100 - bubbleWidth/2;
            newVx = -Math.abs(pos.vx) * 0.8;
          }
          
          if (newY < bubbleHeight/2) {
            newY = bubbleHeight/2;
            newVy = Math.abs(pos.vy) * 0.8;
          } else if (newY > 100 - bubbleHeight/2) {
            newY = 100 - bubbleHeight/2;
            newVy = -Math.abs(pos.vy) * 0.8;
          }
          
          // Apply friction
          newVx *= 0.995;
          newVy *= 0.995;
          
          return {
            ...pos,
            x: newX,
            y: newY,
            vx: newVx,
            vy: newVy
          };
        })
      );
      
      animationFrameId = requestAnimationFrame(animate);
    };
    
    animationFrameId = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(animationFrameId);
  }, [draggedIndex]);
  
  const handleMouseDown = (index, e) => {
    setDraggedIndex(index);
    setBubblePositions(prev => 
      prev.map((pos, i) => 
        i === index ? {...pos, isDragging: true} : pos
      )
    );
    e.preventDefault();
  };
  
 useEffect(() => {
  if (draggedIndex === null) return;

  const container = containerRef.current;
  if (!container) return;

  const handleMouseMove = (e) => {
    const containerRect = container.getBoundingClientRect();
    const x = ((e.clientX - containerRect.left) / containerRect.width) * 100;
    const y = ((e.clientY - containerRect.top) / containerRect.height) * 100;

    setBubblePositions((prev) =>
      prev.map((pos, i) =>
        i === draggedIndex ? { ...pos, x, y } : pos
      )
    );
  };

  const handleMouseUp = () => {
    if (draggedIndex !== null) {
      setBubblePositions((prev) =>
        prev.map((pos, i) => {
          if (i === draggedIndex) {
            return {
              ...pos,
              isDragging: false,
              vx: (Math.random() - 0.5) * 1.5,
              vy: (Math.random() - 0.5) * 1.5
            };
          }
          return pos;
        })
      );
      setDraggedIndex(null);
    }
  };

  document.addEventListener('mousemove', handleMouseMove);
  document.addEventListener('mouseup', handleMouseUp);

  return () => {
    document.removeEventListener('mousemove', handleMouseMove);
    document.removeEventListener('mouseup', handleMouseUp);
  };
}, [draggedIndex]);


  return (
    <section id="skills" className="py-5 mb-5" style={{ backgroundColor: '#f8f9fa' }}>
      <Container>
        <div className="text-center mb-5">
          <h2 className="display-5 fw-bold mb-3">Skills & Technologies</h2>
          <div className="divider mx-auto bg-dark" style={{ width: '60px', height: '2px' }}></div>
        </div>
        
        <Row className="g-5">
          {/* Core Technologies */}
          <Col lg={6}>
            <div className="skill-column p-4 rounded-4 gray-shadow-sm position-relative overflow-hidden">
              <div className="position-absolute top-0 end-0 bg-primary text-white px-3 py-1 rounded-bl">
                <span className="fw-bold">Core</span>
              </div>
              <h4 className="mb-4 fw-bold text-dark">Core Technologies</h4>
              
              <div className="d-flex flex-wrap gap-3 justify-content-center">
                {coreTechnologies.map((item, index) => (
                  <div className="skill-card text-center" key={index}>
                    <div 
                      className="skill-icon-wrapper mx-auto rounded-circle mb-2" 
                      style={{ backgroundColor: `${item.color}20` }}
                    >
                      <i className={`bi ${item.iconClass}`} style={{ color: item.color }}></i>
                    </div>
                    <span className="fw-medium text-dark">{item.skill}</span>
                  </div>
                ))}
              </div>
            </div>
          </Col>
          
          {/* Web & AI Technologies */}
          <Col lg={6}>
            <div className="skill-column p-4 rounded-4 gray-shadow-sm position-relative overflow-hidden">
              <div className="position-absolute top-0 end-0 bg-danger text-white px-3 py-1 rounded-bl">
                <span className="fw-bold">Web & AI</span>
              </div>
              <h4 className="mb-4 fw-bold text-dark">Web & AI Technologies</h4>
              
              <div className="d-flex flex-wrap gap-3 justify-content-center">
                {webAiTechnologies.map((item, index) => (
                  <div className="skill-card text-center" key={index}>
                    <div 
                      className="skill-icon-wrapper mx-auto rounded-circle mb-2" 
                      style={{ backgroundColor: `${item.color}20` }}
                    >
                      <i className={`bi ${item.iconClass}`} style={{ color: item.color }}></i>
                    </div>
                    <span className="fw-medium text-dark">{item.skill}</span>
                  </div>
                ))}
              </div>
            </div>
          </Col>
        </Row>
        
        {/* Enhanced Used Technologies - Bubble Tag Cloud */}
        <div className="mt-5 p-4 rounded-4 gray-shadow-sm bg-white">
          <h5 className="fw-bold mb-4 text-center">Technologies I've Worked With</h5>
          <div 
            ref={containerRef}
            className="tech-cloud position-relative mx-auto" 
            style={{ height: '300px', cursor: draggedIndex !== null ? 'grabbing' : 'default' }}
          >
            {bubbleTechnologies.map((tech, index) => {
              const pos = bubblePositions[index];
              
              return (
                <div
                  key={index}
                  ref={el => bubblesRef.current[index] = el}
                  className={`tech-tag position-absolute rounded-pill shadow-sm ${
                    tech.category === 'ai' ? 'bg-danger-light' : 
                    tech.category === 'database' ? 'bg-success-light' : 
                    tech.category === 'iot' ? 'bg-primary-light' : 
                    tech.category === 'data' ? 'bg-warning-light' : 
                    tech.category === 'tool' ? 'bg-info-light' : 
                    tech.category === 'web' ? 'bg-purple-light' : 
                    tech.category === 'os' ? 'bg-dark-light' : 'bg-secondary-light'
                  }`}
                  style={{
                    left: `${pos.x}%`,
                    top: `${pos.y}%`,
                    transform: `translate(-50%, -50%) scale(${pos.isDragging ? 1.15 : 1})`,
                    zIndex: pos.isDragging ? 100 : Math.floor(Math.random() * 10) + 1,
                    fontSize: `${pos.size}rem`,
                    padding: '0.5rem 1.2rem',
                    opacity: pos.isDragging ? 1 : 0.9,
                    cursor: 'grab',
                    transition: pos.isDragging ? 'none' : 'transform 0.2s ease, box-shadow 0.2s ease',
                    transformOrigin: 'center',
                    boxShadow: pos.isDragging 
                      ? '0 8px 20px rgba(0,0,0,0.2)' 
                      : '0 4px 10px rgba(0,0,0,0.1)',
                    border: '1px solid rgba(255,255,255,0.3)'
                  }}
                  onMouseDown={(e) => handleMouseDown(index, e)}
                >
                  {tech.name}
                </div>
              );
            })}
            <div className="tech-cloud-overlay"></div>
          </div>
        </div>
      </Container>
      
      <style jsx>{`
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
          display: inline-block;
          cursor: default;
          white-space: nowrap;
          border-radius: 20px;
          transition: all 0.3s ease;
          transform-origin: center;
          user-select: none;
        }
        
        .tech-tag:hover {
          transform: translate(-50%, -50%) scale(1.1) !important;
          box-shadow: 0 5px 15px rgba(0,0,0,0.2) !important;
          z-index: 100 !important;
          opacity: 1 !important;
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
        
        .divider {
          background-color: #212529;
        }
        
        .gray-shadow-sm {
          box-shadow: 0 4px 10px rgba(0,0,0,0.05);
        }
      `}</style>
    </section>
  );
};

export default SkillsSection;

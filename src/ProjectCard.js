import React, { useState, useEffect } from "react";

const ProjectCard = ({ title, description, technologies, images = [] }) => {
  const [currentImage, setCurrentImage] = useState(0);

  // Reset current image when images array changes
  useEffect(() => {
    setCurrentImage(0);
  }, [images.length]);

  // Set up image rotation interval
  useEffect(() => {
    if (images.length <= 1) return;

    const interval = setInterval(() => {
      setCurrentImage(prev => (prev + 1) % images.length);
    }, 3000);

    return () => clearInterval(interval);
  }, [images.length]); // Simplified dependency array

  return (
    <div className="card p-3 shadow-sm h-100">
      {images.length > 0 && (
        <img
          src={images[currentImage]}
          alt={title}
          className="img-fluid mb-3 rounded"
          style={{ height: '200px', objectFit: 'cover', width: '100%' }}
        />
      )}
      <h5>{title}</h5>
      <p>{description}</p>
      <div>
        {technologies.map((tech, idx) => (
          <span key={idx} className="badge bg-secondary me-2">{tech}</span>
        ))}
      </div>
    </div>
  );
};

export default ProjectCard;
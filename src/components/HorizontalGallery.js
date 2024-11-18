import React, { useState } from 'react';
import { useKeenSlider } from 'keen-slider/react';
import 'keen-slider/keen-slider.min.css';
import projectsData from './lib/projectsData.json'; // Importa los datos de los proyectos

// Optional: Include wheel scrolling logic if needed
const WheelControls = (slider) => {
  let touchTimeout;
  let position;
  let wheelActive;

  function dispatch(e, name) {
    position.x -= e.deltaX;
    position.y -= e.deltaY;
    slider.container.dispatchEvent(
      new CustomEvent(name, {
        detail: {
          x: position.x,
          y: position.y,
        },
      })
    );
  }

  function wheelStart(e) {
    position = {
      x: e.pageX,
      y: e.pageY,
    };
    dispatch(e, 'ksDragStart');
  }

  function wheel(e) {
    dispatch(e, 'ksDrag');
  }

  function wheelEnd(e) {
    dispatch(e, 'ksDragEnd');
  }

  function eventWheel(e) {
    if (Math.abs(e.deltaX) > Math.abs(e.deltaY)) {
      e.preventDefault();
      if (!wheelActive) {
        wheelStart(e);
        wheelActive = true;
      }
      wheel(e);
      clearTimeout(touchTimeout);
      touchTimeout = setTimeout(() => {
        wheelActive = false;
        wheelEnd(e);
      }, 50);
    }
  }

  slider.on('created', () => {
    slider.container.addEventListener('wheel', eventWheel, {
      passive: false,
    });
  });
};

function HorizontalGallery({ onProjectChange, onProjectClick }) {
  const [sliderRef] = useKeenSlider({
    loop: true,
    mode: 'free-snap',
    slides: {
      perView: 2.1,
      spacing: 15,
    },
    breakpoints: {
      '(max-width: 768px)': {
        slides: {
          perView: 1.1,
          spacing: 10,
        },
      },
    },
    slideChanged(s) {
      const currentIndex = s.track.details.rel;
      onProjectChange(projectsData[Math.round(currentIndex)]?.title || '');
    }
  }, [WheelControls]);

  const handleMouseOver = (projectTitle) => {
    onProjectChange(projectTitle);
  };

  const handleMouseOut = () => {
    onProjectChange('');
  };

  return (
    <div>
      {/* Gallery slider */}
      <div ref={sliderRef} className="keen-slider">
        {projectsData.map((project, index) => (
          <div
            key={index}
            className="keen-slider__slide"
            onMouseOver={() => handleMouseOver(project.title)}
            onMouseOut={handleMouseOut}
            onClick={() => onProjectClick(project)} // Añadir manejo de clics
          >
            {project.attachments.length > 0 && (
              project.attachments[0].type === 'image' ? (
                <img
                  src={project.attachments[0].url}
                  alt={`${project.title} image`}
                  style={{ 
                    width: 'auto', 
                    height: '90vh', 
                    maxWidth: '1000px',  
                    objectFit: 'contain'  
                  }}
                />
              ) : (
                <video
                  src={project.attachments[0].url}
                  autoPlay
                  muted
                  playsInline
                  loop // Mantén el loop aquí
                  style={{ 
                    width: 'auto', 
                    height: '90vh', 
                    maxWidth: '1000px',  
                    objectFit: 'contain'  
                  }}
                >
                  <source src={project.attachments[0].url} type="video/mp4" />
                </video>
              )
            )}
          </div>
        ))}
      </div>
    </div>
  );
}

export default HorizontalGallery;

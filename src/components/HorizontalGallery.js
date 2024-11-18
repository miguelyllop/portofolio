import React from 'react';
import { useKeenSlider } from 'keen-slider/react';
import 'keen-slider/keen-slider.min.css';

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

export function HorizontalGallery({ projects, onProjectChange, onProjectClick }) {
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
      onProjectChange(projects[Math.round(currentIndex)]?.title || '');
    }
  }, [WheelControls]);

  const handleMouseOver = (projectTitle) => {
    onProjectChange(projectTitle);
  };

  const handleMouseOut = () => {
    onProjectChange('');
  };

  return (
    <div ref={sliderRef} className="keen-slider">
      {projects.map((project, index) => (
        <div
          key={index}
          className="keen-slider__slide"
          onMouseOver={() => handleMouseOver(project.title)}
          onMouseOut={handleMouseOut}
          onClick={() => onProjectClick(project)}
        >
          {project.attachments.length > 0 && (
            project.attachments[0].type === 'image' ? (
              <img
                src={project.attachments[0].url}
                alt={`${project.title} image`}
                className="w-auto h-[90vh] max-w-[1000px] object-contain"
              />
            ) : (
              <video
                src={project.attachments[0].url}
                autoPlay
                muted
                playsInline
                loop
                className="w-auto h-[90vh] max-w-[1000px] object-contain"
              >
                <source src={project.attachments[0].url} type="video/mp4" />
              </video>
            )
          )}
        </div>
      ))}
    </div>
  );
}
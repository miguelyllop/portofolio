import React, { useState, useRef, useEffect } from 'react';
import ReactPlayer from 'react-player';
import { useParams, Link } from 'react-router-dom';

function ProjectItem({ projects }) {
  const { projectId } = useParams(); // Obtén el ID del proyecto desde la URL
  const project = projects.find((p) => p.id === projectId); // Encuentra el proyecto por su ID

  const [currentIndex, setCurrentIndex] = useState(0);
  const galleryRef = useRef(null);

  const handleThumbnailClick = (index) => {
    setCurrentIndex(index);
    const scrollPosition = (galleryRef.current.scrollWidth / project.attachments.length) * index;
    galleryRef.current.scrollTo({ left: scrollPosition, behavior: 'smooth' });
  };

  const handleScroll = () => {
    const galleryWidth = galleryRef.current.scrollWidth;
    const scrollLeft = galleryRef.current.scrollLeft;
    const index = Math.floor((scrollLeft / galleryWidth) * project.attachments.length);
    setCurrentIndex(index);
  };

  useEffect(() => {
    const gallery = galleryRef.current;
    gallery.addEventListener('scroll', handleScroll);
    return () => gallery.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div className="project-item-container">
      <div
        className="main-media-display"
        ref={galleryRef}
        style={{ overflowX: 'auto', whiteSpace: 'nowrap', marginTop: '20px' }}
      >
        <div className="side-by-side-media" style={{ display: 'flex' }}>
          {project.attachments.map((attachment, index) => (
            <div
              key={index}
              className="media-item"
              style={{
                flexShrink: 0,
                width: 'calc(50% - 5px)',
                marginRight: index % 2 === 0 ? '5px' : '0',
                maxHeight: '1000px',
                overflow: 'hidden',
              }}
            >
              {attachment.type === 'image' ? (
                <img
                  src={attachment.url}
                  alt={`Media ${index + 1}`}
                  className="media-content"
                  style={{ height: '100%', width: '100%', objectFit: 'cover' }}
                />
              ) : (
                <ReactPlayer
                  url={attachment.url}
                  width="100%"
                  height="100%"
                  controls
                  muted
                  playing={index === currentIndex} // Autoplay only the current media item
                  style={{ maxHeight: '1000px' }}
                />
              )}
            </div>
          ))}
        </div>
      </div>
      <div className="thumbnail-container" style={{ marginTop: '20px' }}>
        <div className="thumbnail-wrapper">
          {project.attachments.map((attachment, index) => (
            <div key={index} className={`thumbnail ${currentIndex === index ? 'active' : ''}`} onClick={() => handleThumbnailClick(index)}>
              {attachment.type === 'video' ? (
                <ReactPlayer
                  url={attachment.url}
                  width="50px"
                  height="50px"
                  playing={true}
                  muted={true}
                  loop={true}
                />
              ) : (
                <img src={attachment.url} alt={`Thumbnail ${index + 1}`} style={{ width: '50px', height: '50px', objectFit: 'cover' }} />
              )}
            </div>
          ))}
        </div>
      </div>
      <div className="title-description-container">
        <div className="details-left">
          {/* Back to Gallery Button */}
          <Link to="/work" className="back-to-gallery-button">
            Back to Gallery
          </Link>
          <div className="description-right">
            <p className="project-description">{project.description}</p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ProjectItem;

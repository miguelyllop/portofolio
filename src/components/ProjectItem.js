import React, { useState, useEffect, useRef } from 'react';
import { Button } from "../components/ui/button";
import { Card, CardContent } from "../components/ui/card";
import ReactPlayer from 'react-player'

export function ProjectItem({ project, setCurrentProject, setCurrentProjectName, setView }) {
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
    <Card className="w-full max-w-4xl mx-auto">
      <CardContent className="p-6">
        <div
          ref={galleryRef}
          className="overflow-x-auto whitespace-nowrap mb-6"
        >
          <div className="flex space-x-4">
            {project.attachments.map((attachment, index) => (
              <div
                key={index}
                className="flex-shrink-0 w-1/2 max-h-[500px] overflow-hidden"
              >
                {attachment.type === 'image' ? (
                  <img
                    src={attachment.url}
                    alt={`Media ${index + 1}`}
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <ReactPlayer
                    url={attachment.url}
                    width="100%"
                    height="100%"
                    controls
                    muted
                    playing={index === currentIndex}
                  />
                )}
              </div>
            ))}
          </div>
        </div>
        <div className="flex space-x-2 mb-6 overflow-x-auto">
          {project.attachments.map((attachment, index) => (
            <div
              key={index}
              className={`cursor-pointer ${currentIndex === index ? 'ring-2 ring-primary' : ''}`}
              onClick={() => handleThumbnailClick(index)}
            >
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
                <img src={attachment.url} alt={`Thumbnail ${index + 1}`} className="w-[50px] h-[50px] object-cover" />
              )}
            </div>
          ))}
        </div>
        <div className="flex justify-between items-start">
          <Button
            variant="outline"
            onClick={() => {
              setCurrentProject(null);
              setCurrentProjectName('');
              setView('work');
            }}
          >
            Back to Gallery
          </Button>
          <div className="max-w-lg">
            <p className="text-muted-foreground">{project.description}</p>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
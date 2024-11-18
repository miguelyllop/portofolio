import React, { useState, useEffect } from 'react';
import { Button } from "../components/ui/button"
import { cv } from '../data/cv';

export function ProjectIndex({ onProjectClick }) {
  const [sortMethod, setSortMethod] = useState('most-recent');
  const [hoveredProject, setHoveredProject] = useState(null);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

  const projects = [...cv.projects, ...cv.sideProjects];

  const sortedProjects = projects.sort((a, b) => {
    if (sortMethod === 'most-recent') {
      return new Date(b.date) - new Date(a.date);
    } else if (sortMethod === 'a-z') {
      return a.title.localeCompare(b.title);
    }
    return 0;
  });

  const handleMouseMove = (e) => {
    setMousePosition({ x: e.clientX, y: e.clientY });
  };

  useEffect(() => {
    const projectItems = document.querySelectorAll('.project-item');

    projectItems.forEach((item) => {
      item.addEventListener('mousemove', handleMouseMove);
    });

    return () => {
      projectItems.forEach((item) => {
        item.removeEventListener('mousemove', handleMouseMove);
      });
    };
  }, []);

  return (
    <div className="mt-8">
      <div className="mb-4">
        <Button
          variant={sortMethod === 'most-recent' ? 'default' : 'ghost'}
          onClick={() => setSortMethod('most-recent')}
        >
          Most Recent
        </Button>
        <span className="mx-2">,</span>
        <Button
          variant={sortMethod === 'a-z' ? 'default' : 'ghost'}
          onClick={() => setSortMethod('a-z')}
        >
          A — Z
        </Button>
      </div>

      <ul className="space-y-4">
        {sortedProjects.length === 0 ? (
          <p>No projects available.</p>
        ) : (
          sortedProjects.map((project, index) => (
            <li
              key={index}
              className="project-item flex justify-between items-center p-2 hover:bg-accent rounded-md transition-colors duration-200"
              onMouseEnter={() => setHoveredProject(project)}
              onMouseLeave={() => setHoveredProject(null)}
              onClick={() => onProjectClick(project)}
            >
              <h3 className="text-lg font-medium">{project.title}</h3>
              <span
                className="text-sm text-muted-foreground"
                style={{ opacity: hoveredProject === project ? 0.5 : 1, transition: 'opacity 0.2s' }}
              >
                View
              </span>
            </li>
          ))
        )}
      </ul>

      {hoveredProject && hoveredProject.attachments && hoveredProject.attachments.length > 0 && (
        <div
          className="fixed pointer-events-none z-50"
          style={{
            top: `${mousePosition.y + 20}px`,
            left: `${mousePosition.x + 20}px`,
          }}
        >
          {hoveredProject.attachments[0].type === 'image' ? (
            <img
              src={hoveredProject.attachments[0].url}
              alt={hoveredProject.title}
              className="max-w-[300px] max-h-[200px] object-contain shadow-lg rounded-md"
            />
          ) : (
            <video
              src={hoveredProject.attachments[0].url}
              autoPlay
              loop
              muted
              className="max-w-[300px] max-h-[200px] object-contain shadow-lg rounded-md"
            />
          )}
        </div>
      )}
    </div>
  );
}
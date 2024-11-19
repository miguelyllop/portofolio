import React, { useState, useEffect } from 'react';
import { Button } from "./ui/button"
import { cv } from '../data/cv';

export function Navigation({ view, setView, currentProjectName, setCurrentProject, setCurrentProjectName }) {
  const [displayedProjectName, setDisplayedProjectName] = useState(currentProjectName);
  const [fadeClass, setFadeClass] = useState('opacity-100');
  const [showProjectName, setShowProjectName] = useState(true);
  const [profileStatus, setProfileStatus] = useState({ text: 'Loading...', emoji: '' });

  useEffect(() => {
    if (currentProjectName !== displayedProjectName) {
      setFadeClass('opacity-0');

      const timeout = setTimeout(() => {
        setDisplayedProjectName(currentProjectName);
        setFadeClass('opacity-100');
      }, 300);

      return () => clearTimeout(timeout);
    }
  }, [currentProjectName, displayedProjectName]);

  useEffect(() => {
    if (cv.general.status) {
      setProfileStatus(cv.general.status);
    } else {
      setProfileStatus({ text: 'No status available', emoji: '' });
    }
  }, []);

  const handleHomeClick = () => {
    window.location.href = '/';
  };

  const handleWorkClick = () => {
    setView('work');
    setCurrentProject(null);
    setCurrentProjectName('');
  };

  return (
    <nav className="bg-background p-4">
      <div className="container mx-auto flex justify-between items-center">
        <div className="flex items-center space-x-4">
          {view !== 'project' ? (
            <Button variant="ghost" onClick={handleHomeClick} className={view === 'home' ? 'font-bold' : ''}>
              {cv.general.displayName}
            </Button>
          ) : (
            <div 
              className="relative" 
              onMouseEnter={() => setShowProjectName(false)} 
              onMouseLeave={() => setShowProjectName(true)}
            >
              {showProjectName ? (
                <span className="text-foreground">{displayedProjectName}</span>
              ) : (
                <Button variant="ghost" onClick={handleHomeClick}>
                  {cv.general.displayName}
                </Button>
              )}
            </div>
          )}

          {view === 'about' && (
            <span className="text-foreground">
              {profileStatus.emoji && <span className="mr-2">{profileStatus.emoji}</span>}
              <span>{profileStatus.text}</span>
            </span>
          )}

          {view === 'work' && (
            <span className={`text-foreground transition-opacity duration-300 ${fadeClass}`}>
              {displayedProjectName}
            </span>
          )}
        </div>

        <div className="flex space-x-2">
          <Button variant="ghost" onClick={handleWorkClick} className={view === 'work' ? 'font-bold' : ''}>
            Work
          </Button>
          <Button variant="ghost" onClick={() => setView('about')} className={view === 'about' ? 'font-bold' : ''}>
            About
          </Button>
        </div>
      </div>
    </nav>
  );
}
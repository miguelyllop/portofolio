import React, { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom'; // Si estás usando React Router

function Navigation({ view, setView, currentProjectName, setCurrentProject, setCurrentProjectName, projects }) {
  const [displayedProjectName, setDisplayedProjectName] = useState(currentProjectName);
  const [fadeClass, setFadeClass] = useState('fade-in');
  const [showProjectName, setShowProjectName] = useState(true);
  const [profileStatus, setProfileStatus] = useState({ text: 'Loading...', emoji: '' });
  const history = useHistory(); // Usando React Router para la navegación

  useEffect(() => {
    if (currentProjectName !== displayedProjectName) {
      setFadeClass('fade-out');

      const timeout = setTimeout(() => {
        setDisplayedProjectName(currentProjectName);
        setFadeClass('fade-in');
      }, 300);

      return () => clearTimeout(timeout);
    }
  }, [currentProjectName, displayedProjectName]);

  // Update the profile status from cv.general.status
  useEffect(() => {
    if (cv.general.status) {
      setProfileStatus(cv.general.status);
    } else {
      setProfileStatus({ text: 'No status available', emoji: '' });
    }
  }, []); // Only run once on mount

  const handleHomeClick = () => {
    setView('home');
    history.push('/'); // Navegar al inicio usando React Router
  };

  const handleWorkClick = () => {
    setView('work');
    setCurrentProject(null); // Reset current project
    setCurrentProjectName(''); // Reset project name
    history.push('/work'); // Navegar a la vista de trabajo
  };

  const handleProjectClick = (projectName) => {
    setView('project');
    setCurrentProject(projectName);
    setCurrentProjectName(projectName);
    history.push(`/project/${projectName}`); // Navegar a la vista del proyecto
  };

  return (
    <div className="navigation-bar">
      <div className="title-project">
        {view !== 'project' && (
          <button onClick={handleHomeClick} className={view === 'home' ? 'active' : ''}>
            {cv.general.displayName}
          </button>
        )}

        {view === 'project' && (
          <>
            {showProjectName ? (
              <div className="project-name" onMouseEnter={() => setShowProjectName(false)} onMouseLeave={() => setShowProjectName(true)}>
                {displayedProjectName}
              </div>
            ) : (
              <button className="title-project-button" onMouseEnter={() => setShowProjectName(false)} onMouseLeave={() => setShowProjectName(true)} onClick={handleHomeClick}>
                {cv.general.displayName}
              </button>
            )}
          </>
        )}

        {view === 'about' && (
          <span className={`profile-status`}>
            {profileStatus.emoji && <span className="profile-status-emoji">{profileStatus.emoji}</span>}
            <span className="profile-status-text">{profileStatus.text}</span>
          </span>
        )}

        {view === 'work' && (
          <span className={`current-project ${fadeClass}`}>
            {displayedProjectName || 'No project selected'}
          </span>
        )}
      </div>

      <ul className="nav-links">
        <li>
          <button onClick={handleWorkClick} className={view === 'work' ? 'active' : ''}>
            Work
          </button>
          <span>, </span>
        </li>
       
        <li>
          <button onClick={() => setView('about')} className={view === 'about' ? 'active' : ''}>
            About
          </button>
        </li>
      </ul>

      {/* Displaying a list of projects */}
      {view === 'work' && projects && (
        <ul className="projects-list">
          {projects.map((project) => (
            <li key={project.title}>
              <button onClick={() => handleProjectClick(project.title)}>{project.title}</button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

export default Navigation;

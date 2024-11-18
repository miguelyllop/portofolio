import React, { useEffect, useState } from 'react';
import { projects } from './projects'; // Importa los proyectos desde el archivo

function App() {
  const [view, setView] = useState('work');
  const [currentProject, setCurrentProject] = useState(null);
  const [currentProjectName, setCurrentProjectName] = useState('');
  const [isVisible, setIsVisible] = useState(false);
  const [transitionClass, setTransitionClass] = useState('hidden');

  // Filtra los proyectos que tienen archivos adjuntos
  const filteredProjects = projects.filter(project => project.attachments.length > 0);

  const handleProjectChange = (projectName) => {
    setCurrentProjectName(projectName);
  };

  const handleProjectClick = (project) => {
    setCurrentProject(project); // Guarda el proyecto clickeado
    setCurrentProjectName(project.title); // Actualiza el nombre del proyecto
    setView('project'); // Cambia la vista a detalles del proyecto
  };

  useEffect(() => {
    setTransitionClass('hidden');
    setIsVisible(false);

    const timer = setTimeout(() => {
      setIsVisible(true);
      setTransitionClass('visible');
    }, 600);

    return () => clearTimeout(timer);
  }, [view]);

  return (
    <div>
      {/* Componente de navegación */}
      <Navigation 
        view={view} 
        setView={setView} 
        currentProjectName={currentProjectName} 
        setCurrentProject={setCurrentProject} 
        setCurrentProjectName={setCurrentProjectName} 
      />

      {/* Contenido principal con transiciones */}
      <div className={`content ${transitionClass}`}>
        {view === 'work' && (
          <div className="work-view">
            <div className="horizontal-gallery">
              {/* Componente de galería horizontal */}
              <HorizontalGallery 
                projects={filteredProjects} 
                onProjectChange={handleProjectChange} 
                onProjectClick={handleProjectClick}
              />
              <div className="gallery-description">
                <p>
                  Hey, I'm a product designeer who's all about putting people first...
                </p>
              </div>
            </div>
            <div className="project-index">
              {/* Componente de índice de proyectos */}
              <ProjectIndex 
                onProjectClick={handleProjectClick} 
                setDisplayedProjectName={setCurrentProjectName} 
              />
            </div>
          </div>
        )}

        {view === 'project' && currentProject && (
          <div className="project-view">
            {/* Detalles del proyecto */}
            <ProjectItem 
              project={currentProject} 
              setCurrentProject={setCurrentProject} 
              setCurrentProjectName={setCurrentProjectName} 
              setView={setView} 
            />
          </div>
        )}

        {view === 'about' && (
          <div className="about-view">
            <About />
          </div>
        )}
      </div>
    </div>
  );
}

export default App;

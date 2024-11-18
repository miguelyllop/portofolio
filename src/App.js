import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import { projects } from './projects'; // Importa los proyectos desde el archivo
import Navigation from './Navigation'; // Tu componente de navegación
import HorizontalGallery from './HorizontalGallery'; // Componente de galería horizontal
import ProjectIndex from './ProjectIndex'; // Componente de índice de proyectos
import ProjectItem from './ProjectItem'; // Componente de vista de proyecto
import About from './About'; // Componente de vista de "about"

function App() {
  const [currentProject, setCurrentProject] = useState(null);
  const [currentProjectName, setCurrentProjectName] = useState('');
  const [isVisible, setIsVisible] = useState(false);
  const [transitionClass, setTransitionClass] = useState('hidden');

  // Filtra los proyectos que tienen archivos adjuntos
  const filteredProjects = projects.filter(project => project.attachments.length > 0);

  const handleProjectClick = (project) => {
    setCurrentProject(project); // Guarda el proyecto clickeado
    setCurrentProjectName(project.title); // Actualiza el nombre del proyecto
  };

  useEffect(() => {
    setTransitionClass('hidden');
    setIsVisible(false);

    const timer = setTimeout(() => {
      setIsVisible(true);
      setTransitionClass('visible');
    }, 600);

    return () => clearTimeout(timer);
  }, []);

  return (
    <Router>
      <div>
        {/* Componente de navegación */}
        <Navigation 
          currentProjectName={currentProjectName} 
          setCurrentProject={setCurrentProject} 
          setCurrentProjectName={setCurrentProjectName} 
        />

        {/* Contenido principal con transiciones */}
        <div className={`content ${transitionClass}`}>
          <Switch>
            <Route path="/work">
              <div className="work-view">
                <div className="horizontal-gallery">
                  {/* Componente de galería horizontal */}
                  <HorizontalGallery 
                    projects={filteredProjects} 
                    onProjectClick={handleProjectClick}
                  />
                  <div className="gallery-description">
                    <p>
                      Hey, I'm a product designer who's all about putting people first...
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
            </Route>

            <Route path="/project/:projectName">
              {currentProject && (
                <div className="project-view">
                  {/* Detalles del proyecto */}
                  <ProjectItem 
                    project={currentProject} 
                    setCurrentProject={setCurrentProject} 
                    setCurrentProjectName={setCurrentProjectName} 
                  />
                </div>
              )}
            </Route>

            <Route path="/about">
              <div className="about-view">
                <About />
              </div>
            </Route>

            {/* Ruta por defecto */}
            <Route path="/">
              <div className="home-view">
                <h1>Welcome to my Portfolio!</h1>
              </div>
            </Route>
          </Switch>
        </div>
      </div>
    </Router>
  );
}

export default App;

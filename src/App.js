import React, { useState, useEffect } from 'react';
import { Navigation } from './components/Navigation';
import { HorizontalGallery } from './components/HorizontalGallery';
import { ProjectIndex } from './components/ProjectIndex';
import { ProjectItem } from './components/ProjectItem';
import { About } from './components/About';
import { cv } from './data/cv';

export default function App() {
  const [view, setView] = useState('work');
  const [currentProject, setCurrentProject] = useState(null);
  const [currentProjectName, setCurrentProjectName] = useState('');
  const [isVisible, setIsVisible] = useState(false);
  const [transitionClass, setTransitionClass] = useState('opacity-0');

  const allProjects = [...cv.projects, ...cv.sideProjects].filter(x => x.attachments.length > 0);

  const handleProjectChange = (projectName) => {
    setCurrentProjectName(projectName);
  };

  const handleProjectClick = (project) => {
    setCurrentProject(project);
    setCurrentProjectName(project.title);
    setView('project');
  };

  useEffect(() => {
    setTransitionClass('opacity-0');
    setIsVisible(false);
    const timer = setTimeout(() => {
      setIsVisible(true);
      setTransitionClass('opacity-100');
    }, 600);
    return () => clearTimeout(timer);
  }, [view]);

  return (
    <div className="min-h-screen bg-background">
      <Navigation setView={setView} />
      <main className={`transition-opacity duration-500 ${transitionClass}`}>
        {view === 'work' && (
          <div className="container mx-auto px-4 py-8">
            <HorizontalGallery 
              projects={allProjects} 
              onProjectChange={handleProjectChange} 
            />
            <div className="mt-8 text-foreground">
              <p className="mb-4">
                Hey, I'm a product designer who's all about putting people first. I've been diving deep into the world of native iOS design, whipping up intuitive interfaces and animations that make you feel like you're interacting with the real deal. It's like having a little slice of life right in the palm of your hand.
              </p>
              <p className="mb-4">
                I'm not just about following trends or jumping on the latest tech bandwagon. Nah, I'm more into getting to the heart of what makes people tick. I do my homework, chatting with folks, digging through online research, and putting myself in their shoes to really get a feel for what they need, even if they don't know it themselves.
              </p>
              <p>
                At the end of the day, I'm here to make products that don't just look pretty, but actually connect with people on a deeper level.
              </p>
            </div>
            <ProjectIndex 
              projects={allProjects}
              onProjectClick={handleProjectClick}
              setCurrentProjectName={setCurrentProjectName}
            />
          </div>
        )}
        {view === 'project' && currentProject && (
          <ProjectItem 
            project={currentProject}
            setView={setView}
            setCurrentProject={setCurrentProject}
          />
        )}
        {view === 'about' && (
          <About />
        )}
      </main>
    </div>
  );
}
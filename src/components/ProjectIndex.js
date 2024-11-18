import React, { useState } from 'react';
import { Link } from 'react-router-dom';

function ProjectIndex({ projects }) {
  const [sortMethod, setSortMethod] = useState('most-recent');

  const sortedProjects = projects.sort((a, b) => {
    if (sortMethod === 'most-recent') {
      return new Date(b.date) - new Date(a.date);
    } else if (sortMethod === 'a-z') {
      return a.title.localeCompare(b.title);
    }
    return 0;
  });

  return (
    <div>
      <div className="sort-buttons">
        <button
          className={sortMethod === 'most-recent' ? 'active' : ''}
          onClick={() => setSortMethod('most-recent')}
        >
          Most Recent
        </button>
        <span>, </span>
        <button
          className={sortMethod === 'a-z' ? 'active' : ''}
          onClick={() => setSortMethod('a-z')}
        >
          A — Z
        </button>
      </div>

      <ul className="project-list">
        {sortedProjects.length === 0 ? (
          <p>No projects available.</p>
        ) : (
          sortedProjects.map((project, index) => (
            <li key={index} className="project-item">
              <h3>
                <Link to={`/project/${project.id}`}>{project.title}</Link>
              </h3>
            </li>
          ))
        )}
      </ul>
    </div>
  );
}

export default ProjectIndex;

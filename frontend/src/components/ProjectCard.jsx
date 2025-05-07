
import React from 'react';

const ProjectCard = ({ project }) => {
  return (
    <div className="project-card">
      <h3>{project.title}</h3>
      <p>{project.status}</p>
      <p>{project.progress}% Completed</p>
    </div>
  );
};

export default ProjectCard;

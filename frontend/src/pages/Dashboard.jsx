
import React, { useEffect, useState } from 'react';
import ProjectCard from '../components/ProjectCard';
import { getProjects } from '../services/api';

const Dashboard = () => {
  const [projects, setProjects] = useState([]);

  useEffect(() => {
    const fetchProjects = async () => {
      const data = await getProjects();
      setProjects(data);
    };
    fetchProjects();
  }, []);

  return (
    <div>
      {projects.map((project) => (
        <ProjectCard key={project._id} project={project} />
      ))}
    </div>
  );
};

export default Dashboard;

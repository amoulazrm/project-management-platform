import React, { useEffect, useState } from 'react';
import ProjectCard from '../components/ProjectCard';
import { getProjects } from '../services/api';

const Dashboard = () => {
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchProjects = async () => {
      try {
        const token = localStorage.getItem('token');
        const data = await getProjects(token);
        setProjects(data);
      } catch (err) {
        setError('Échec de récupération des projets.');
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchProjects();
  }, []);

  if (loading) return <p>Chargement des projets...</p>;
  if (error) return <p>{error}</p>;

  return (
    <div>
      {projects.length > 0 ? (
        projects.map((project) => (
          <ProjectCard key={project._id} project={project} />
        ))
      ) : (
        <p>Aucun projet trouvé.</p>
      )}
    </div>
  );
};

export default Dashboard;

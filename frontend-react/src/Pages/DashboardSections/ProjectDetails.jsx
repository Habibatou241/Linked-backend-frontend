import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';

const ProjectDetails = () => {
  const { projectId } = useParams();
  const [project, setProject] = useState(null);
  const [datasets, setDatasets] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchProjectDetails = async () => {
      try {
        // Get project details
        const projectResponse = await axios.get(`http://localhost:8000/api/projects/${projectId}/details`, {
          headers: {
            'Authorization': `Bearer ${localStorage.getItem('token')}`,
          }
        });

        // Get project datasets
        const datasetsResponse = await axios.get(`http://localhost:8000/api/datasets`, {
          headers: {
            'Authorization': `Bearer ${localStorage.getItem('token')}`,
          },
          params: {
            project_id: projectId
          }
        });

        if (projectResponse.data.status === 'success') {
          setProject(projectResponse.data.project);
        }
        if (datasetsResponse.data.status === 'success') {
          setDatasets(datasetsResponse.data.datasets);
        }
      } catch (err) {
        setError('Failed to load project details');
      } finally {
        setLoading(false);
      }
    };

    fetchProjectDetails();
  }, [projectId]);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>{error}</div>;

  return (
    <div className="p-6 bg-[#FFF3E0]">
      {project && (
        <>
          <h2 className="text-2xl font-semibold text-[#8B4513] mb-4">{project.name}</h2>
          <p className="text-[#8B4513]/80 mb-6">
            Created on {new Date(project.created_at).toLocaleDateString()}
          </p>
        </>
      )}

      <div className="mt-8">
        <h3 className="text-xl font-semibold text-[#8B4513] mb-4">Datasets</h3>
        <div className="space-y-4">
          {datasets.length === 0 ? (
            <p className="text-gray-500">No datasets found for this project.</p>
          ) : (
            datasets.map(dataset => (
              <div key={dataset.id} className="p-4 bg-white rounded-lg shadow-sm">
                <div className="flex justify-between items-center">
                  <div>
                    <h4 className="text-lg font-medium text-[#8B4513]">{dataset.name}</h4>
                    <p className="text-sm text-gray-500">
                      Uploaded: {new Date(dataset.created_at).toLocaleDateString()}
                    </p>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
};

export default ProjectDetails;
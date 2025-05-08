import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';

const ProjectDetails = () => {
  const { projectId } = useParams();
  const navigate = useNavigate();
  const [project, setProject] = useState(null);
  const [datasets, setDatasets] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [selectedDatasets, setSelectedDatasets] = useState([]);
  const [showMergeModal, setShowMergeModal] = useState(false);
  const [mergedDatasetName, setMergedDatasetName] = useState('');

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

  const handleDelete = async (datasetId) => {
    if (window.confirm('Are you sure you want to delete this dataset?')) {
      try {
        await axios.delete(`http://localhost:8000/api/datasets/${datasetId}`, {
          headers: {
            'Authorization': `Bearer ${localStorage.getItem('token')}`,
          }
        });
        setDatasets(datasets.filter(dataset => dataset.id !== datasetId));
      } catch (err) {
        setError('Failed to delete dataset');
      }
    }
  };

  const handleDatasetSelection = (datasetId) => {
    setSelectedDatasets(prev => {
      if (prev.includes(datasetId)) {
        return prev.filter(id => id !== datasetId);
      } else {
        return [...prev, datasetId];
      }
    });
  };

  const handleMergeDatasets = async () => {
    if (selectedDatasets.length < 2) {
      setError('Please select at least two datasets to merge');
      return;
    }
    setShowMergeModal(true);
  };

  const handleMergeConfirm = async () => {
    try {
      const response = await axios.post('http://localhost:8000/api/datasets/merge', {
        dataset_ids: selectedDatasets,
        new_name: mergedDatasetName,
        project_id: projectId
      }, {
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('token')}`,
        }
      });

      if (response.data.status === 'success') {
        setDatasets([...datasets, response.data.dataset]);
        setSelectedDatasets([]);
        setShowMergeModal(false);
        setMergedDatasetName('');
      }
    } catch (err) {
      setError('Failed to merge datasets');
    }
  };

  const handlePreprocessing = (datasetId) => {
    navigate(`/dashboard/preprocessing/${datasetId}`);
  };

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
        <div className="flex justify-between items-center mb-4">
          <h3 className="text-xl font-semibold text-[#8B4513]">Datasets</h3>
          {selectedDatasets.length >= 2 && (
            <button
              onClick={handleMergeDatasets}
              className="px-4 py-2 bg-[#8B4513] text-white rounded-lg hover:bg-[#9B5523]"
            >
              Fusionner les données selectionnés
            </button>
          )}
        </div>

        <div className="space-y-4">
          {datasets.length === 0 ? (
            <p className="text-gray-500">No datasets found for this project.</p>
          ) : (
            datasets.map(dataset => (
              <div key={dataset.id} className="p-4 bg-white rounded-lg shadow-sm">
                <div className="flex justify-between items-center">
                  <div className="flex items-center space-x-4">
                    <input
                      type="checkbox"
                      checked={selectedDatasets.includes(dataset.id)}
                      onChange={() => handleDatasetSelection(dataset.id)}
                      className="h-4 w-4 text-[#8B4513]"
                    />
                    <div>
                      <h4 className="text-lg font-medium text-[#8B4513]">{dataset.name}</h4>
                      <p className="text-sm text-gray-500">
                        Uploaded: {new Date(dataset.created_at).toLocaleDateString()}
                      </p>
                    </div>
                  </div>
                  <div className="flex space-x-2">
                    <button
                      onClick={() => handlePreprocessing(dataset.id)}
                      className="px-3 py-1 bg-blue-500 text-white rounded hover:bg-blue-600"
                    >
                      Prétraitement
                    </button>
                    <button
                      onClick={() => handleDelete(dataset.id)}
                      className="px-3 py-1 bg-red-500 text-white rounded hover:bg-red-600"
                    >
                      Delete
                    </button>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>
      </div>

      {/* Merge Modal */}
      {showMergeModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
          <div className="bg-white p-6 rounded-lg w-96">
            <h3 className="text-lg font-semibold text-[#8B4513] mb-4">Merge Datasets</h3>
            <input
              type="text"
              value={mergedDatasetName}
              onChange={(e) => setMergedDatasetName(e.target.value)}
              placeholder="Enter name for merged dataset"
              className="w-full p-2 border border-gray-300 rounded mb-4"
            />
            <div className="flex justify-end space-x-2">
              <button
                onClick={() => setShowMergeModal(false)}
                className="px-4 py-2 bg-gray-500 text-white rounded hover:bg-gray-600"
              >
                Cancel
              </button>
              <button
                onClick={handleMergeConfirm}
                className="px-4 py-2 bg-[#8B4513] text-white rounded hover:bg-[#9B5523]"
              >
                Merge
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ProjectDetails;
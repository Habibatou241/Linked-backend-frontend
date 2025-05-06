import React, { useState } from 'react';

const DataPreprocessing = () => {
  const [selectedTypes, setSelectedTypes] = useState({
    missingValues: '',
    duplicates: '',
    outliers: '',
    scaling: ''
  });

  const [selectedMethods, setSelectedMethods] = useState({
    missingValues: '',
    duplicates: '',
    outliers: '',
    scaling: ''
  });

  const preprocessingOptions = {
    missingValues: {
      types: ['Fill', 'Drop'],
      methods: {
        Fill: ['Mean', 'Median', 'Mode'],
        Drop: ['Remove Row', 'Remove Column']
      }
    },
    duplicates: {
      types: ['Drop'],
      methods: {
        Drop: ['Remove Row', 'Remove Column']
      }
    },
    outliers: {
      types: ['Drop'],
      methods: {
        Drop: ['IQR', 'Z-Score']
      }
    },
    scaling: {
      types: ['Standardization', 'Normalization'],
      methods: {
        Standardization: ['Z-Score'],
        Normalization: ['Min-Max']
      }
    }
  };

  // Also modify the renderOptions condition to show methods for outliers even when type is Drop
  // Modify renderOptions to remove the Send button
  const renderOptions = (operation) => (
    <div className="ml-4 space-y-2 mt-2">
      <div className="flex items-center space-x-2">
        <span className="w-20 text-[#8B4513] text-xs">Type:</span>
        <select 
          className="flex-1 p-1.5 border rounded-lg text-[#8B4513] text-xs"
          value={selectedTypes[operation]}
          onChange={(e) => handleTypeChange(operation, e.target.value)}
          placeholder="Select Type"
        >
          <option value="" disabled>Select Type</option>
          {preprocessingOptions[operation].types.map(type => (
            <option key={type} value={type}>{type}</option>
          ))}
        </select>
      </div>
      
      {selectedTypes[operation] && (operation === 'outliers' || selectedTypes[operation] !== 'Drop') && (
        <div className="flex items-center space-x-2">
          <span className="w-20 text-[#8B4513] text-xs">Method:</span>
          <select 
            className="flex-1 p-1.5 border rounded-lg text-[#8B4513] text-xs"
            value={selectedMethods[operation]}
            onChange={(e) => setSelectedMethods({ ...selectedMethods, [operation]: e.target.value })}
          >
            <option value="">Select Method</option>
            {preprocessingOptions[operation].methods[selectedTypes[operation]]?.map(method => (
              <option key={method} value={method}>{method}</option>
            ))}
          </select>
        </div>
      )}
    </div>
  );

  const handleTypeChange = (operation, type) => {
    setSelectedTypes({ ...selectedTypes, [operation]: type });
    setSelectedMethods({ ...selectedMethods, [operation]: '' });
  };

  const handleSendRequest = (operation) => {
    console.log('Sending request:', {
      operation,
      type: selectedTypes[operation],
      method: selectedMethods[operation]
    });
  };

  const renderTableColumns = (columns, startIdx, endIdx) => {
    return columns.slice(startIdx, endIdx).map((column, index) => (
      <th key={startIdx + index} className="px-4 py-2 bg-[#8B4513] text-white text-left w-1/5">
        {column}
      </th>
    ));
  };

  const renderTableCells = (row, startIdx, endIdx) => {
    return row.slice(startIdx, endIdx).map((cell, index) => (
      <td key={startIdx + index} className="px-4 py-2 border-b w-1/5">
        {cell}
      </td>
    ));
  };

  // Sample dataset for demonstration
  const sampleDataset = {
    columns: ['Well_ID', 'Depth', 'Porosity', 'Permeability', 'Lithology'],
    data: [
      ['WELL-001', 2500.5, 0.15, 150.2, 'Sandstone'],
      ['WELL-001', 2501.0, 0.14, 145.8, 'Sandstone'],
      ['WELL-001', 2501.5, 0.16, 160.3, 'Sandstone'],
      ['WELL-001', 2502.0, 0.13, 130.5, 'Shale'],
      ['WELL-001', 2502.5, 0.12, 125.7, 'Shale'],
      ['WELL-001', 2503.0, 0.11, 120.4, 'Shale'],
    ]
  };

  const calculateDatasetStats = (dataset) => {
    return {
      before: {
        columns: dataset.columns.length,
        rows: dataset.data.length,
        missingValues: dataset.data.flat().filter(val => val === null || val === undefined || val === '').length,
        duplicates: dataset.data.length - new Set(dataset.data.map(row => JSON.stringify(row))).size
      },
      after: {
        columns: dataset.columns.length,
        rows: dataset.data.length,
        missingValues: 0,
        duplicates: 0
      }
    };
  };

  return (
    <div className="p-6 flex-1 bg-[#FFF3E0]">
      <h2 className="text-2xl font-semibold text-[#8B4513] text-center mb-4">
        Data Preprocessing
      </h2>

      <div className="mb-8">
        <h3 className="text-xl font-semibold text-[#8B4513] text-center">
          Data Cleaning and Feature Engineering
        </h3>
      </div>

      <div className="flex gap-6">
        {/* Dataset Overview - Left Column (2/3) */}
        <div className="w-2/3 bg-white rounded-lg p-6 shadow-sm">
          <h3 className="text-lg font-semibold text-[#8B4513] mb-4">Dataset Overview</h3>
          <div className="overflow-x-auto">
            <table className="min-w-full mb-6 text-xs">
              <thead>
                <tr>
                  {sampleDataset.columns.map((column, index) => (
                    <th key={index} className="px-4 py-2 bg-[#8B4513] text-white text-left">
                      {column}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {sampleDataset.data.map((row, rowIndex) => (
                  <tr key={rowIndex} className={rowIndex % 2 === 0 ? 'bg-[#FFF3E0]' : 'bg-white'}>
                    {row.map((cell, cellIndex) => (
                      <td key={cellIndex} className="px-4 py-2 border-b">
                        {cell}
                      </td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
            
            <h3 className="text-lg font-semibold text-[#8B4513] my-6">Preprocessed Dataset Recap</h3>
              
            {/* Statistics table */}
            <table className="min-w-full mt-6 text-xs">
              <thead>
                <tr>
                  <th className="px-4 py-2 bg-[#8B4513] text-white text-left">Metrics</th>
                  <th className="px-4 py-2 bg-[#8B4513] text-white text-left">Before</th>
                  <th className="px-4 py-2 bg-[#8B4513] text-white text-left">After</th>
                </tr>
              </thead>
              <tbody>
                {Object.entries(calculateDatasetStats(sampleDataset).before).map(([metric, value], index) => (
                  <tr key={metric} className={index % 2 === 0 ? 'bg-[#FFF3E0]' : 'bg-white'}>
                    <td className="px-4 py-2 border-b font-medium">{metric.charAt(0).toUpperCase() + metric.slice(1)}</td>
                    <td className="px-4 py-2 border-b">{calculateDatasetStats(sampleDataset).before[metric]}</td>
                    <td className="px-4 py-2 border-b">{calculateDatasetStats(sampleDataset).after[metric]}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Preprocessing Options - Right Column (1/3) */}
        <div className="w-1/3 bg-white rounded-lg p-6 shadow-sm">
          <h3 className="text-base font-semibold text-[#8B4513] mb-4">
            Apply data preprocessing techniques to clean and prepare your dataset.
          </h3>
          
          <div className="space-y-4">
            <div>
              <button className="w-full py-1.5 bg-[#8B4513] text-white rounded-lg text-xs">
                Handle Missing Values
              </button>
              {renderOptions('missingValues')}
            </div>

            <div>
              <button className="w-full py-1.5 bg-[#8B4513] text-white rounded-lg text-xs">
                Remove Duplicates
              </button>
              {renderOptions('duplicates')}
            </div>

            <div>
              <button className="w-full py-1.5 bg-[#8B4513] text-white rounded-lg text-xs">
                Remove Outliers
              </button>
              {renderOptions('outliers')}
            </div>

            <div>
              <button className="w-full py-1.5 bg-[#8B4513] text-white rounded-lg text-xs">
                Scale Data
              </button>
              {renderOptions('scaling')}
            </div>

            <button 
              onClick={() => handleSendRequest(operation)}
              className={`w-full py-1.5 text-xs text-[#8B4513] rounded-lg transition-colors ${
                Object.values(selectedTypes).some(type => type) && 
                Object.values(selectedMethods).some(method => method)
                  ? 'bg-green-600 hover:bg-green-700'
                  : 'bg-[#f6d1b6] cursor-not-allowed'
              }`}
              disabled={!Object.values(selectedTypes).some(type => type) || 
                       !Object.values(selectedMethods).some(method => method)}
            >
              Send
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DataPreprocessing;
  

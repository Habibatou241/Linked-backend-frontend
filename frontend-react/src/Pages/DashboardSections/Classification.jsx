import React, { useState } from 'react';
import { DocumentArrowDownIcon, ShareIcon, BookmarkIcon } from '@heroicons/react/24/outline';

const Classification = () => {
  const [features, setFeatures] = useState({
    number: '',
    variables: []
  });

  const [targets, setTargets] = useState({
    number: '',
    variables: []
  });

  const [splitRatio, setSplitRatio] = useState({
    train: '70',
    test: '30'
  });

  const [projectSetup, setProjectSetup] = useState({
    project: '',
    files: []
  });

  // Sample correlation matrix data
  const correlationMatrix = {
    labels: ['Feature1', 'Feature2', 'Feature3', 'Target'],
    data: [
      [1.0, 0.5, -0.3, 0.8],
      [0.5, 1.0, 0.2, 0.6],
      [-0.3, 0.2, 1.0, -0.1],
      [0.8, 0.6, -0.1, 1.0]
    ]
  };

  return (
    <div className="p-6 flex-1 bg-[#FFF3E0]">
    <h2 className="text-2xl font-semibold text-[#8B4513] text-center mb-4">
      Prediction
    </h2>

    <div className="mb-8">
      <h3 className="text-xl font-semibold text-[#8B4513] text-center">
        Feature Selection and Model Setup
      </h3>
    </div>

      <div className="flex gap-6">
        {/* Correlation Matrix - Left Column (2/3) */}
        <div className="w-2/3 bg-white rounded-lg p-6 shadow-sm">
          <h3 className="text-base font-semibold text-[#8B4513] mb-4">Correlation Matrix</h3>
          
          <div className="overflow-x-auto mb-12">
            <table className="min-w-full text-xs">
              <thead>
                <tr>
                  <th className="px-3 py-1.5 bg-[#8B4513] text-white"></th>
                  {correlationMatrix.labels.map((label, index) => (
                    <th key={index} className="px-3 py-1.5 bg-[#8B4513] text-white">{label}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {correlationMatrix.data.map((row, rowIndex) => (
                  <tr key={rowIndex} className={rowIndex % 2 === 0 ? 'bg-[#FFF3E0]' : 'bg-white'}>
                    <td className="px-3 py-1.5 font-medium text-[#8B4513]">
                      {correlationMatrix.labels[rowIndex]}
                    </td>
                    {row.map((value, colIndex) => (
                      <td key={colIndex} className="px-3 py-1.5 text-center">
                        {value.toFixed(2)}
                      </td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <h3 className="text-base font-semibold text-[#8B4513] mb-6">Models Comparison and Evaluation</h3>
          <div className="overflow-x-auto">
            <table className="min-w-full text-xs">
              <thead>
                <tr>
                  <th className="px-3 py-1.5 bg-[#8B4513] text-white">Model</th>
                  <th className="px-3 py-1.5 bg-[#8B4513] text-white">Accuracy</th>
                  <th className="px-3 py-1.5 bg-[#8B4513] text-white">F1 Score</th>
                  <th className="px-3 py-1.5 bg-[#8B4513] text-white">Precision</th>
                  <th className="px-3 py-1.5 bg-[#8B4513] text-white">Training Time</th>
                </tr>
              </thead>
              <tbody>
                <tr className="bg-[#FFF3E0]">
                  <td className="px-3 py-1.5 font-medium text-[#8B4513]">Decision Tree</td>
                  <td className="px-3 py-1.5 text-center">0.856</td>
                  <td className="px-3 py-1.5 text-center">0.842</td>
                  <td className="px-3 py-1.5 text-center">0.837</td>
                  <td className="px-3 py-1.5 text-center">0.45s</td>
                </tr>
                <tr className="bg-[#DDBEA9] bg-opacity-50">
                  <td className="px-4 py-2 font-bold text-[#8B4513]">Random Forest</td>
                  <td className="px-4 py-2 text-center font-semibold">0.912</td>
                  <td className="px-4 py-2 text-center font-semibold">0.898</td>
                  <td className="px-4 py-2 text-center font-semibold">0.912</td>
                  <td className="px-4 py-2 text-center">2.45s</td>
                </tr>
                <tr className="bg-[#FFF3E0]">
                  <td className="px-4 py-2 font-medium text-[#8B4513]">Support Vector Machine</td>
                  <td className="px-4 py-2 text-center">0.176</td>
                  <td className="px-4 py-2 text-center">0.289</td>
                  <td className="px-4 py-2 text-center">0.923</td>
                  <td className="px-4 py-2 text-center">3.78s</td>
                </tr>
                <tr className="bg-white">
                  <td className="px-4 py-2 font-medium text-[#8B4513]">Artificial Neural Network</td>
                  <td className="px-4 py-2 text-center">0.168</td>
                  <td className="px-4 py-2 text-center">0.276</td>
                  <td className="px-4 py-2 text-center">0.928</td>
                  <td className="px-4 py-2 text-center">5.92s</td>
                </tr>
                <tr className="bg-[#FFF3E0]">
                  <td className="px-4 py-2 font-medium text-[#8B4513]">K-Nearest Neighbours</td>
                  <td className="px-4 py-2 text-center">0.203</td>
                  <td className="px-4 py-2 text-center">0.325</td>
                  <td className="px-4 py-2 text-center">0.867</td>
                  <td className="px-4 py-2 text-center">0.32s</td>
                </tr>
                <tr className="bg-white">
                  <td className="px-4 py-2 font-medium text-[#8B4513]">Gradient Boosting</td>
                  <td className="px-4 py-2 text-center">0.165</td>
                  <td className="px-4 py-2 text-center">0.272</td>
                  <td className="px-4 py-2 text-center">0.931</td>
                  <td className="px-4 py-2 text-center">4.15s</td>
                </tr>
                <tr className="bg-[#FFF3E0]">
                  <td className="px-4 py-2 font-medium text-[#8B4513]">Extreme Gradient Boosting</td>
                  <td className="px-4 py-2 text-center">0.156</td>
                  <td className="px-4 py-2 text-center">0.267</td>
                  <td className="px-4 py-2 text-center">0.934</td>
                  <td className="px-4 py-2 text-center">3.21s</td>
                </tr>
                <tr className="bg-white">
                  <td className="px-4 py-2 font-medium text-[#8B4513]">Adaptive Boosting</td>
                  <td className="px-4 py-2 text-center">0.171</td>
                  <td className="px-4 py-2 text-center">0.281</td>
                  <td className="px-4 py-2 text-center">0.926</td>
                  <td className="px-4 py-2 text-center">3.87s</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>

        {/* Model Setup - Right Column (1/3) */}
        <div className="w-1/3 bg-white rounded-lg p-6 shadow-sm">
          <div className="space-y-6">
            {/* Project Setup */}
            <div>
              <h3 className="text-base font-semibold text-[#8B4513] mb-4">Project Setup</h3>
              <div className="space-y-2">
                <select 
                  className="w-full p-1.5 border rounded-lg text-xs text-[#8B4513] cursor-pointer hover:border-[#8B4513]"
                  value={projectSetup.project}
                  onChange={(e) => setProjectSetup({ ...projectSetup, project: e.target.value })}
                >
                  <option value="" disabled>Select project</option>
                  <option value="project1">Project 1</option>
                  <option value="project2">Project 2</option>
                </select>
                <select 
                  className="w-full p-1.5 border text-xs rounded-lg text-[#8B4513] cursor-pointer hover:border-[#8B4513]"
                  multiple
                  size="1"
                  value={projectSetup.files}
                  onChange={(e) =>
                    setProjectSetup({
                      ...projectSetup,
                      files: Array.from(e.target.selectedOptions, option => option.value)
                    })
                  }
                  onClick={(e) => e.currentTarget.size = e.currentTarget.size === 1 ? 4 : 1}
                  onBlur={(e) => e.currentTarget.size = 1}
                >
                  <option value="" disabled>Select files</option>
                  <option value="file1">File 1</option>
                  <option value="file2">File 2</option>
                </select>
              </div>
            </div>

            {/* Features Selection */}
            <div>
              <h3 className="text-base font-semibold text-[#8B4513] mb-4">Features</h3>
              <div className="space-y-2">
                <select 
                  className="w-full p-1.5 border text-xs rounded-lg text-[#8B4513] cursor-pointer hover:border-[#8B4513]"
                  value={features.number}
                  onChange={(e) => setFeatures({...features, number: e.target.value})}
                >
                  <option value="">Select number</option>
                  {[1,2,3,4,5].map(num => (
                    <option key={num} value={num}>{num}</option>
                  ))}
                </select>
                <select 
                  className="w-full p-1.5 border text-xs rounded-lg text-[#8B4513] cursor-pointer hover:border-[#8B4513]"
                  multiple
                  size="1"
                  value={features.variables}
                  onChange={(e) => setFeatures({
                    ...features, 
                    variables: Array.from(e.target.selectedOptions, option => option.value)
                  })}
                  onClick={(e) => e.currentTarget.size = 4}
                  onBlur={(e) => e.currentTarget.size = 1}
                >
                  <option value="" disabled>Select variables</option>
                  <option value="feature1">Feature 1</option>
                  <option value="feature2">Feature 2</option>
                  <option value="feature3">Feature 3</option>
                </select>
              </div>
            </div>

            {/* Targets Selection */}
            <div>
              <h3 className="text-base font-semibold text-[#8B4513] mb-4">Targets</h3>
              <div className="space-y-2">
                <select 
                  className="w-full p-1.5 border text-xs rounded-lg text-[#8B4513] cursor-pointer hover:border-[#8B4513]"
                  value={targets.number}
                  onChange={(e) => setTargets({...targets, number: e.target.value})}
                >
                  <option value="">Select number</option>
                  {[1,2].map(num => (
                    <option key={num} value={num}>{num}</option>
                  ))}
                </select>
                <select 
                  className="w-full p-1.5 border text-xs rounded-lg text-[#8B4513] cursor-pointer hover:border-[#8B4513]"
                  multiple
                  size="1"
                  value={targets.variables}
                  onChange={(e) => setTargets({
                    ...targets, 
                    variables: Array.from(e.target.selectedOptions, option => option.value)
                  })}
                  onClick={(e) => e.currentTarget.size = 4}
                  onBlur={(e) => e.currentTarget.size = 1}
                >
                  <option value="" disabled>Select targets</option>
                  <option value="target1">Target 1</option>
                  <option value="target2">Target 2</option>
                </select>
              </div>
            </div>
           {/* Split Ratio */}
           <div>
              <h3 className="text-base font-semibold text-[#8B4513] mb-4">Split Ratio</h3>
              <div className="flex gap-4">
                <div className="w-1/2">
                  <label className="block text-xs text-[#8B4513] mb-2">Train Data (%)</label>
                  <select 
                    className="w-full p-2 border text-xs rounded-lg text-[#8B4513]"
                    value={splitRatio.train}
                    onChange={(e) => setSplitRatio({
                      train: e.target.value,
                      test: e.target.value === '70' ? '30' : '20'
                    })}
                  >
                    <option value="70">70</option>
                    <option value="80">80</option>
                  </select>
                </div>
                <div className="w-1/2">
                  <label className="block text-xs text-[#8B4513] mb-2">Test Data (%)</label>
                  <select 
                    className="w-full p-2 border text-xs rounded-lg text-[#8B4513]"
                    value={splitRatio.test}
                    disabled
                  >
                    <option value="30">30</option>
                    <option value="20">20</option>
                  </select>
                </div>
              </div>
            </div>

            {/* Predict Button */}
            <button 
              className="w-full py-2 bg-[#8B4513] text-white rounded-lg hover:bg-[#8B4513]/90 transition-colors"
            >
              Predict
            </button>
          </div>
        </div>
      </div>
       {/* Prediction Results Section */}
       <div className="mt-8">
        <h2 className="text-xl font-semibold text-[#8B4513] text-center mb-6">
          Prediction Results
        </h2>
        
        <div className="flex gap-6">
          {/* Initial VS Predicted Variables Column */}
          <div className="w-1/2 bg-white rounded-lg p-6 shadow-sm">
            <h3 className="text-lg font-semibold text-[#8B4513] mb-4">
              Initial VS Predicted Variables
            </h3>
            <div className="overflow-x-auto">
              <table className="min-w-full text-xs">
                <thead>
                  <tr>
                    <th className="px-3 py-1.5 bg-[#8B4513] text-white">Variable</th>
                    <th className="px-3 py-1.5 bg-[#8B4513] text-white">Initial Value</th>
                    <th className="px-3 py-1.5 bg-[#8B4513] text-white">Predicted Value</th>
                    <th className="px-3 py-1.5 bg-[#8B4513] text-white">Difference</th>
                  </tr>
                </thead>
                <tbody>
                  <tr className="bg-[#FFF3E0]">
                    <td className="px-3 py-1.5 font-medium text-[#8B4513]">Variable 1</td>
                    <td className="px-3 py-1.5 text-center">0.856</td>
                    <td className="px-3 py-1.5 text-center">0.842</td>
                    <td className="px-3 py-1.5 text-center">0.014</td>
                  </tr>
                  <tr className="bg-white">
                    <td className="px-3 py-1.5 font-medium text-[#8B4513]">Variable 2</td>
                    <td className="px-3 py-1.5 text-center">0.923</td>
                    <td className="px-3 py-1.5 text-center">0.912</td>
                    <td className="px-3 py-1.5 text-center">0.011</td>
                  </tr>
                  {/* Add more rows as needed */}
                </tbody>
              </table>
            </div>
          </div>

          {/* Log Plot Column */}
          <div className="w-1/2 bg-white rounded-lg p-6 shadow-sm">
            <h3 className="text-lg font-semibold text-[#8B4513] mb-4">
              Log Plot
            </h3>
            <div className="h-[400px] flex items-center justify-center border rounded-lg">
              {/* Here you would integrate your plotting library (e.g., Chart.js, Plotly) */}
              <div className="w-full h-full" id="logPlot">
                {/* Plot will be rendered here */}
                {/* Initial variables: solid lines */}
                {/* Predicted variables: dashed lines (style="stroke-dasharray: 5,5") */}
              </div>
            </div>
            <div className="mt-4 flex justify-center gap-6 text-xs">
              <div className="flex items-center">
                <div className="w-4 h-0.5 bg-[#8B4513] mr-2"></div>
                <span className="text-[#8B4513]">Initial Values</span>
              </div>
              <div className="flex items-center">
                <div className="w-4 h-0.5 border-t-2 border-dashed border-[#8B4513] mr-2"></div>
                <span className="text-[#8B4513]">Predicted Values</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Action Buttons */}
      <div className="mt-8 flex justify-center gap-6">
        <button className="flex items-center gap-2 px-6 py-2 bg-[#8B4513] text-white rounded-lg hover:bg-[#8B4513]/90 transition-colors text-sm">
          <BookmarkIcon className="w-5 h-5" />
          Save
        </button>
        <button className="flex items-center gap-2 px-6 py-2 bg-[#8B4513] text-white rounded-lg hover:bg-[#8B4513]/90 transition-colors text-sm">
          <ShareIcon className="w-5 h-5" />
          Share
        </button>
        <button className="flex items-center gap-2 px-6 py-2 bg-[#8B4513] text-white rounded-lg hover:bg-[#8B4513]/90 transition-colors text-sm">
          <DocumentArrowDownIcon className="w-5 h-5" />
          Export
        </button>
      </div>
    </div>
  );
};

export default Classification;

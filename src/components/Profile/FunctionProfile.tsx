import React from 'react';
import { ArrowLeft, Download, GitBranch, Zap, Shield } from 'lucide-react';
import { AOFunction } from '../../types';

interface FunctionProfileProps {
  func: AOFunction;
  onBack: () => void;
  onDeploy: (func: AOFunction) => void;
}

export const FunctionProfile: React.FC<FunctionProfileProps> = ({ func, onBack, onDeploy }) => {
  const handleDownload = () => {
    window.open('https://github.com/ao-functions/' + func.name.toLowerCase().replace(/\s+/g, '-'), '_blank');
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center space-x-4">
        <button
          onClick={onBack}
          className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
        >
          <ArrowLeft className="h-5 w-5" />
        </button>
        <div>
          <h2 className="text-2xl font-bold text-gray-900">{func.name}</h2>
          <p className="text-gray-600">{func.domain} • {func.capability}</p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 space-y-6">
          <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-200">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Overview</h3>
            <p className="text-gray-700 mb-4">{func.longDescription}</p>
            
            <h4 className="font-semibold text-gray-900 mb-3">Use Cases</h4>
            <ul className="space-y-2">
              {func.useCases.map((useCase, index) => (
                <li key={index} className="flex items-start space-x-2">
                  <div className="w-1.5 h-1.5 bg-blue-500 rounded-full mt-2"></div>
                  <span className="text-gray-700">{useCase}</span>
                </li>
              ))}
            </ul>
          </div>

          <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-200">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Execution Flow</h3>
            {func.name === 'Order Fallout Manager' && (
              <div className="space-y-3">
                <div className="flex items-center space-x-3 p-3 bg-blue-50 rounded-lg">
                  <div className="w-3 h-3 bg-blue-500 rounded-full"></div>
                  <span className="text-sm font-medium">Monitor Order Pipeline</span>
                </div>
                <div className="flex items-center space-x-3 p-3 bg-indigo-50 rounded-lg">
                  <div className="w-3 h-3 bg-indigo-500 rounded-full"></div>
                  <span className="text-sm font-medium">Classify Failure Type</span>
                </div>
                <div className="flex items-center space-x-3 p-3 bg-purple-50 rounded-lg">
                  <div className="w-3 h-3 bg-purple-500 rounded-full"></div>
                  <span className="text-sm font-medium">Select Resolution Strategy</span>
                </div>
                <div className="flex items-center space-x-3 p-3 bg-emerald-50 rounded-lg">
                  <div className="w-3 h-3 bg-emerald-500 rounded-full"></div>
                  <span className="text-sm font-medium">Execute Remediation</span>
                </div>
              </div>
            )}
            
            {func.name === 'FinOps Optimizer' && (
              <div className="space-y-3">
                <div className="flex items-center space-x-3 p-3 bg-blue-50 rounded-lg">
                  <div className="w-3 h-3 bg-blue-500 rounded-full"></div>
                  <span className="text-sm font-medium">Analyze Resource Usage</span>
                </div>
                <div className="flex items-center space-x-3 p-3 bg-indigo-50 rounded-lg">
                  <div className="w-3 h-3 bg-indigo-500 rounded-full"></div>
                  <span className="text-sm font-medium">Compare Against Budget</span>
                </div>
                <div className="flex items-center space-x-3 p-3 bg-purple-50 rounded-lg">
                  <div className="w-3 h-3 bg-purple-500 rounded-full"></div>
                  <span className="text-sm font-medium">Identify Optimization Opportunities</span>
                </div>
                <div className="flex items-center space-x-3 p-3 bg-emerald-50 rounded-lg">
                  <div className="w-3 h-3 bg-emerald-500 rounded-full"></div>
                  <span className="text-sm font-medium">Apply Cost Optimizations</span>
                </div>
              </div>
            )}
            
            {func.name === 'Network Capacity Optimizer' && (
              <div className="space-y-3">
                <div className="flex items-center space-x-3 p-3 bg-blue-50 rounded-lg">
                  <div className="w-3 h-3 bg-blue-500 rounded-full"></div>
                  <span className="text-sm font-medium">Monitor Traffic Patterns</span>
                </div>
                <div className="flex items-center space-x-3 p-3 bg-indigo-50 rounded-lg">
                  <div className="w-3 h-3 bg-indigo-500 rounded-full"></div>
                  <span className="text-sm font-medium">Predict Demand Spikes</span>
                </div>
                <div className="flex items-center space-x-3 p-3 bg-purple-50 rounded-lg">
                  <div className="w-3 h-3 bg-purple-500 rounded-full"></div>
                  <span className="text-sm font-medium">Calculate Optimal Allocation</span>
                </div>
                <div className="flex items-center space-x-3 p-3 bg-emerald-50 rounded-lg">
                  <div className="w-3 h-3 bg-emerald-500 rounded-full"></div>
                  <span className="text-sm font-medium">Adjust Network Configuration</span>
                </div>
              </div>
            )}
            
            {func.name === 'SLA Manager' && (
              <div className="space-y-3">
                <div className="flex items-center space-x-3 p-3 bg-blue-50 rounded-lg">
                  <div className="w-3 h-3 bg-blue-500 rounded-full"></div>
                  <span className="text-sm font-medium">Monitor Service Performance</span>
                </div>
                <div className="flex items-center space-x-3 p-3 bg-indigo-50 rounded-lg">
                  <div className="w-3 h-3 bg-indigo-500 rounded-full"></div>
                  <span className="text-sm font-medium">Compare Against SLA Targets</span>
                </div>
                <div className="flex items-center space-x-3 p-3 bg-purple-50 rounded-lg">
                  <div className="w-3 h-3 bg-purple-500 rounded-full"></div>
                  <span className="text-sm font-medium">Determine Recovery Actions</span>
                </div>
                <div className="flex items-center space-x-3 p-3 bg-emerald-50 rounded-lg">
                  <div className="w-3 h-3 bg-emerald-500 rounded-full"></div>
                  <span className="text-sm font-medium">Trigger Service Recovery</span>
                </div>
              </div>
            )}
            
            {(func.name === 'Sales Quote Personalizer' || func.name === 'Campaign Optimizer' || func.name === 'Network Energy Saver') && (
              <div className="space-y-3">
                <div className="flex items-center space-x-3 p-3 bg-blue-50 rounded-lg">
                  <div className="w-3 h-3 bg-blue-500 rounded-full"></div>
                  <span className="text-sm font-medium">Collect Context Data</span>
                </div>
                <div className="flex items-center space-x-3 p-3 bg-indigo-50 rounded-lg">
                  <div className="w-3 h-3 bg-indigo-500 rounded-full"></div>
                  <span className="text-sm font-medium">Analyze Patterns & Trends</span>
                </div>
                <div className="flex items-center space-x-3 p-3 bg-purple-50 rounded-lg">
                  <div className="w-3 h-3 bg-purple-500 rounded-full"></div>
                  <span className="text-sm font-medium">Generate Optimization Plan</span>
                </div>
                <div className="flex items-center space-x-3 p-3 bg-emerald-50 rounded-lg">
                  <div className="w-3 h-3 bg-emerald-500 rounded-full"></div>
                  <span className="text-sm font-medium">Implement Changes</span>
                </div>
              </div>
            )}
          </div>

          <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-200">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Dependencies</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {Object.entries(func.dependencies).map(([category, items]) => (
                <div key={category}>
                  <h4 className="font-medium text-gray-900 mb-2 capitalize">
                    {category.replace(/([A-Z])/g, ' $1').trim()}
                  </h4>
                  <ul className="space-y-1">
                    {items.map((item, index) => (
                      <li key={index} className="text-sm text-gray-600 bg-gray-50 px-3 py-1 rounded">
                        {item}
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="space-y-6">
          <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-200">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Function Details</h3>
            <div className="space-y-3">
              <div className="flex justify-between">
                <span className="text-gray-600">Version</span>
                <span className="font-medium">{func.version}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Provider</span>
                <span className="font-medium">{func.provider}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Price</span>
                <span className="font-semibold text-emerald-600">{func.price}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Status</span>
                <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                  func.status === 'Active' ? 'bg-green-100 text-green-800' :
                  func.status === 'Deployed' ? 'bg-blue-100 text-blue-800' :
                  'bg-gray-100 text-gray-800'
                }`}>
                  {func.status}
                </span>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-200">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Runtime Modes</h3>
            <div className="space-y-2">
              {func.runtimeModes.map(mode => (
                <div key={mode} className="flex items-center space-x-2">
                  {mode === 'Autonomous' && <Zap className="h-4 w-4 text-blue-500" />}
                  {mode === 'HITL' && <Shield className="h-4 w-4 text-indigo-500" />}
                  {mode === 'HOTL' && <GitBranch className="h-4 w-4 text-purple-500" />}
                  <span className="text-sm font-medium">{mode}</span>
                </div>
              ))}
            </div>
          </div>

          <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-200">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Performance Metrics</h3>
            <div className="space-y-3">
              <div>
                <h4 className="text-sm font-medium text-gray-900 mb-1">KEI</h4>
                <div className="space-y-1">
                  {func.performance.kei.map((metric, index) => (
                    <div key={index} className="text-xs text-gray-600 bg-blue-50 px-2 py-1 rounded">
                      {metric}
                    </div>
                  ))}
                </div>
              </div>
              <div>
                <h4 className="text-sm font-medium text-gray-900 mb-1">KCI</h4>
                <div className="space-y-1">
                  {func.performance.kci.map((metric, index) => (
                    <div key={index} className="text-xs text-gray-600 bg-indigo-50 px-2 py-1 rounded">
                      {metric}
                    </div>
                  ))}
                </div>
              </div>
              <div>
                <h4 className="text-sm font-medium text-gray-900 mb-1">KBI</h4>
                <div className="space-y-1">
                  {func.performance.kbi.map((metric, index) => (
                    <div key={index} className="text-xs text-gray-600 bg-purple-50 px-2 py-1 rounded">
                      {metric}
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>

          <div className="space-y-3">
            <button
              onClick={() => onDeploy(func)}
              className="w-full bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition-colors font-medium"
            >
              Deploy Function
            </button>
            <button
              onClick={handleDownload}
              className="w-full bg-gray-100 text-gray-700 px-6 py-3 rounded-lg hover:bg-gray-200 transition-colors font-medium flex items-center justify-center space-x-2"
            >
              <Download className="h-4 w-4" />
              <span>Download Specification</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
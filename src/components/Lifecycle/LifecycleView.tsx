import React, { useState } from 'react';
import { Play, Pause, RotateCcw, Trash2, Settings, TrendingUp } from 'lucide-react';
import { AOFunction, RuntimeMode } from '../../types';
import { mockAOFunctions } from '../../data/mockData';

interface LifecycleViewProps {
  onConfigure: (func: AOFunction) => void;
}

export const LifecycleView: React.FC<LifecycleViewProps> = ({ onConfigure }) => {
  const [functions, setFunctions] = useState(mockAOFunctions);

  const handleModeChange = (id: string, newMode: RuntimeMode) => {
    setFunctions(prev => prev.map(func => 
      func.id === id ? { ...func, currentMode: newMode } : func
    ));
  };

  const handleStatusChange = (id: string, newStatus: AOFunction['status']) => {
    setFunctions(prev => prev.map(func => 
      func.id === id ? { ...func, status: newStatus } : func
    ));
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Active': return 'bg-green-100 text-green-800';
      case 'Deployed': return 'bg-blue-100 text-blue-800';
      case 'Draft': return 'bg-gray-100 text-gray-800';
      case 'Retired': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getModeColor = (mode: RuntimeMode) => {
    switch (mode) {
      case 'Autonomous': return 'bg-blue-500';
      case 'HITL': return 'bg-indigo-500';
      case 'HOTL': return 'bg-purple-500';
      default: return 'bg-gray-500';
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold text-gray-900">Lifecycle Management</h2>
          <p className="text-gray-600 mt-1">Manage deployment and configuration of AO Functions</p>
        </div>
        <div className="flex items-center space-x-4">
          <div className="text-sm text-gray-500">
            {functions.filter(f => f.status === 'Active').length} Active • 
            {functions.filter(f => f.status === 'Deployed').length} Deployed
          </div>
        </div>
      </div>

      <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50 border-b border-gray-200">
              <tr>
                <th className="text-left px-6 py-4 font-semibold text-gray-900">Function</th>
                <th className="text-left px-6 py-4 font-semibold text-gray-900">Domain</th>
                <th className="text-left px-6 py-4 font-semibold text-gray-900">Status</th>
                <th className="text-left px-6 py-4 font-semibold text-gray-900">Version</th>
                <th className="text-left px-6 py-4 font-semibold text-gray-900">Runtime Mode</th>
                <th className="text-left px-6 py-4 font-semibold text-gray-900">Metrics</th>
                <th className="text-right px-6 py-4 font-semibold text-gray-900">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {functions.map(func => (
                <tr key={func.id} className="hover:bg-gray-50 transition-colors">
                  <td className="px-6 py-4">
                    <div>
                      <div className="font-medium text-gray-900">{func.name}</div>
                      <div className="text-sm text-gray-600">{func.capability}</div>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <span className="text-sm text-gray-700">{func.domain}</span>
                  </td>
                  <td className="px-6 py-4">
                    <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(func.status)}`}>
                      {func.status}
                    </span>
                  </td>
                  <td className="px-6 py-4">
                    <span className="text-sm text-gray-700">{func.version}</span>
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex items-center space-x-2">
                      <div className={`w-2 h-2 rounded-full ${getModeColor(func.currentMode)}`}></div>
                      <select
                        value={func.currentMode}
                        onChange={(e) => handleModeChange(func.id, e.target.value as RuntimeMode)}
                        className="text-sm border border-gray-300 rounded px-2 py-1 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      >
                        {func.runtimeModes.map(mode => (
                          <option key={mode} value={mode}>{mode}</option>
                        ))}
                      </select>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <div className="text-sm">
                      <div className="text-gray-900 font-medium">{func.executionMetrics.successRate}% success</div>
                      <div className="text-gray-600">{func.executionMetrics.frequency} executions</div>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex items-center justify-end space-x-2">
                      <button
                        onClick={() => onConfigure(func)}
                        className="p-1.5 text-gray-600 hover:text-blue-600 hover:bg-blue-50 rounded transition-colors"
                        title="Configure"
                      >
                        <Settings className="h-4 w-4" />
                      </button>
                      <button
                        onClick={() => handleStatusChange(func.id, func.status === 'Active' ? 'Deployed' : 'Active')}
                        className="p-1.5 text-gray-600 hover:text-emerald-600 hover:bg-emerald-50 rounded transition-colors"
                        title={func.status === 'Active' ? 'Pause' : 'Activate'}
                      >
                        {func.status === 'Active' ? <Pause className="h-4 w-4" /> : <Play className="h-4 w-4" />}
                      </button>
                      <button
                        onClick={() => handleStatusChange(func.id, 'Retired')}
                        className="p-1.5 text-gray-600 hover:text-red-600 hover:bg-red-50 rounded transition-colors"
                        title="Retire"
                      >
                        <Trash2 className="h-4 w-4" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-200">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 bg-green-100 rounded-lg flex items-center justify-center">
              <Play className="h-5 w-5 text-green-600" />
            </div>
            <div>
              <div className="text-2xl font-bold text-gray-900">
                {functions.filter(f => f.status === 'Active').length}
              </div>
              <div className="text-sm text-gray-600">Active Functions</div>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-200">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center">
              <TrendingUp className="h-5 w-5 text-blue-600" />
            </div>
            <div>
              <div className="text-2xl font-bold text-gray-900">
                {(functions.reduce((acc, f) => acc + f.executionMetrics.successRate, 0) / functions.length).toFixed(1)}%
              </div>
              <div className="text-sm text-gray-600">Avg Success Rate</div>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-200">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 bg-purple-100 rounded-lg flex items-center justify-center">
              <RotateCcw className="h-5 w-5 text-purple-600" />
            </div>
            <div>
              <div className="text-2xl font-bold text-gray-900">
                {functions.reduce((acc, f) => acc + f.executionMetrics.frequency, 0).toLocaleString()}
              </div>
              <div className="text-sm text-gray-600">Total Executions</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
import React, { useState } from 'react';
import { GitBranch, AlertTriangle, Settings, Play, Zap, Shield, DollarSign, Activity } from 'lucide-react';
import { mockAOFunctions } from '../../data/mockData';

interface Conflict {
  id: string;
  functions: string[];
  resource: string;
  severity: 'high' | 'medium' | 'low';
  description: string;
}

export const CoordinationView: React.FC = () => {
  const [conflicts] = useState<Conflict[]>([
    {
      id: '1',
      functions: ['SLA Manager', 'Network Energy Saver'],
      resource: 'Network Infrastructure',
      severity: 'high',
      description: 'SLA Manager wants to maintain full capacity while Energy Saver wants to reduce power consumption'
    },
    {
      id: '2',
      functions: ['FinOps Optimizer', 'Network Capacity Optimizer'],
      resource: 'Compute Resources',
      severity: 'medium',
      description: 'FinOps wants to reduce costs by scaling down while Capacity Optimizer wants to scale up for performance'
    }
  ]);

  const [priorities, setPriorities] = useState<Record<string, number>>({
    '1': 1, // Order Fallout Manager
    '2': 3, // FinOps Optimizer
    '3': 2, // Network Capacity Optimizer
    '6': 1, // SLA Manager
    '7': 4  // Network Energy Saver
  });

  const [simulationMode, setSimulationMode] = useState(false);

  const getSeverityColor = (severity: string) => {
    switch (severity) {
      case 'high': return 'bg-red-100 text-red-800 border-red-200';
      case 'medium': return 'bg-yellow-100 text-yellow-800 border-yellow-200';
      case 'low': return 'bg-green-100 text-green-800 border-green-200';
      default: return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  const handleRunSimulation = () => {
    setSimulationMode(true);
    setTimeout(() => {
      alert('Coordination simulation completed successfully!');
      setSimulationMode(false);
    }, 2000);
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-3">
          <GitBranch className="h-8 w-8 text-blue-600" />
          <div>
            <h2 className="text-2xl font-bold text-gray-900">Coordination Console</h2>
            <p className="text-gray-600 mt-1">Manage multi-function interactions and resolve conflicts</p>
          </div>
        </div>
        <button
          onClick={handleRunSimulation}
          disabled={simulationMode}
          className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 disabled:bg-gray-400 transition-colors flex items-center space-x-2 font-medium"
        >
          <Play className="h-4 w-4" />
          <span>{simulationMode ? 'Running Simulation...' : 'Run Coordination Simulation'}</span>
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-200">
          <h3 className="text-lg font-semibold text-gray-900 mb-6 text-center">Coordination Graph</h3>
          <div className="relative bg-gradient-to-br from-gray-50 to-blue-50 rounded-xl p-8 h-96 border border-gray-200">
            
            {/* FinOps Optimizer - Top Left */}
            <div className="absolute top-6 left-6 w-28 h-20 bg-emerald-100 border-2 border-emerald-400 rounded-xl flex flex-col items-center justify-center shadow-md hover:shadow-lg transition-shadow">
              <DollarSign className="h-6 w-6 text-emerald-600 mb-1" />
              <span className="text-xs font-bold text-emerald-900 text-center leading-tight">FinOps Optimizer</span>
              <div className="w-2 h-2 bg-emerald-500 rounded-full mt-1"></div>
            </div>

            {/* Network Energy Saver - Top Right */}
            <div className="absolute top-6 right-6 w-28 h-20 bg-green-100 border-2 border-green-400 rounded-xl flex flex-col items-center justify-center shadow-md hover:shadow-lg transition-shadow">
              <Zap className="h-6 w-6 text-green-600 mb-1" />
              <span className="text-xs font-bold text-green-900 text-center leading-tight">Network Energy Saver</span>
              <div className="w-2 h-2 bg-green-500 rounded-full mt-1"></div>
            </div>

            {/* SLA Manager - Bottom Center */}
            <div className="absolute bottom-6 left-1/2 transform -translate-x-1/2 w-28 h-20 bg-blue-100 border-2 border-blue-400 rounded-xl flex flex-col items-center justify-center shadow-md hover:shadow-lg transition-shadow">
              <Shield className="h-6 w-6 text-blue-600 mb-1" />
              <span className="text-xs font-bold text-blue-900 text-center leading-tight">SLA Manager</span>
              <div className="w-2 h-2 bg-blue-500 rounded-full mt-1"></div>
            </div>

            {/* Network Capacity Optimizer - Middle Right */}
            <div className="absolute top-1/2 right-6 transform -translate-y-1/2 w-28 h-20 bg-purple-100 border-2 border-purple-400 rounded-xl flex flex-col items-center justify-center shadow-md hover:shadow-lg transition-shadow">
              <Activity className="h-6 w-6 text-purple-600 mb-1" />
              <span className="text-xs font-bold text-purple-900 text-center leading-tight">Network Capacity Optimizer</span>
              <div className="w-2 h-2 bg-purple-500 rounded-full mt-1"></div>
            </div>
            
            {/* Connection lines with enhanced styling */}
            <svg className="absolute inset-0 w-full h-full pointer-events-none">
              {/* Conflict line between Energy Saver and SLA Manager */}
              <line 
                x1="320" y1="66" 
                x2="200" y2="270" 
                stroke="#ef4444" 
                strokeWidth="3" 
                strokeDasharray="8,4"
                markerEnd="url(#conflict-arrow)"
                className="drop-shadow-sm"
              />
              
              {/* Cooperation line between FinOps and Energy Saver */}
              <line 
                x1="148" y1="66" 
                x2="320" y2="66" 
                stroke="#10b981" 
                strokeWidth="3"
                markerEnd="url(#cooperation-arrow)"
                className="drop-shadow-sm"
              />
              
              {/* Oversight line from SLA to FinOps */}
              <line 
                x1="172" y1="270" 
                x2="120" y2="106" 
                stroke="#6366f1" 
                strokeWidth="3"
                markerEnd="url(#oversight-arrow)"
                className="drop-shadow-sm"
              />

              {/* Conflict line between FinOps and Network Capacity */}
              <line 
                x1="148" y1="86" 
                x2="320" y2="180" 
                stroke="#f59e0b" 
                strokeWidth="3"
                strokeDasharray="6,3"
                markerEnd="url(#warning-arrow)"
                className="drop-shadow-sm"
              />

              <defs>
                <marker id="conflict-arrow" markerWidth="12" markerHeight="12" refX="10" refY="3" orient="auto" markerUnits="strokeWidth">
                  <path d="M0,0 L0,6 L9,3 z" fill="#ef4444"/>
                </marker>
                <marker id="cooperation-arrow" markerWidth="12" markerHeight="12" refX="10" refY="3" orient="auto" markerUnits="strokeWidth">
                  <path d="M0,0 L0,6 L9,3 z" fill="#10b981"/>
                </marker>
                <marker id="oversight-arrow" markerWidth="12" markerHeight="12" refX="10" refY="3" orient="auto" markerUnits="strokeWidth">
                  <path d="M0,0 L0,6 L9,3 z" fill="#6366f1"/>
                </marker>
                <marker id="warning-arrow" markerWidth="12" markerHeight="12" refX="10" refY="3" orient="auto" markerUnits="strokeWidth">
                  <path d="M0,0 L0,6 L9,3 z" fill="#f59e0b"/>
                </marker>
              </defs>
            </svg>

            {/* Enhanced Legend */}
            <div className="absolute bottom-4 left-4 bg-white p-3 rounded-lg border border-gray-200 shadow-sm">
              <div className="text-xs font-semibold text-gray-900 mb-2">Relationship Types</div>
              <div className="space-y-1">
                <div className="flex items-center space-x-2">
                  <div className="w-4 h-0.5 bg-red-500"></div>
                  <span className="text-xs text-gray-700">High Conflict</span>
                </div>
                <div className="flex items-center space-x-2">
                  <div className="w-4 h-0.5 bg-yellow-500"></div>
                  <span className="text-xs text-gray-700">Medium Conflict</span>
                </div>
                <div className="flex items-center space-x-2">
                  <div className="w-4 h-0.5 bg-green-500"></div>
                  <span className="text-xs text-gray-700">Cooperation</span>
                </div>
                <div className="flex items-center space-x-2">
                  <div className="w-4 h-0.5 bg-indigo-500"></div>
                  <span className="text-xs text-gray-700">Oversight</span>
                </div>
              </div>
            </div>

            {/* Status indicator */}
            <div className="absolute top-4 right-4 bg-white p-2 rounded-lg border border-gray-200 shadow-sm">
              <div className="flex items-center space-x-2">
                <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
                <span className="text-xs font-medium text-gray-700">Live Coordination</span>
              </div>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-200">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Active Conflicts</h3>
          <div className="space-y-4">
            {conflicts.map(conflict => (
              <div key={conflict.id} className={`p-4 border-2 rounded-xl ${getSeverityColor(conflict.severity)} transition-all hover:shadow-md`}>
                <div className="flex items-center justify-between mb-3">
                  <span className={`px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wide ${getSeverityColor(conflict.severity)}`}>
                    {conflict.severity} priority
                  </span>
                  <AlertTriangle className="h-5 w-5 text-red-600" />
                </div>
                <h4 className="font-semibold text-gray-900 mb-2">Resource Contention: {conflict.resource}</h4>
                <p className="text-sm text-gray-700 mb-3 leading-relaxed">{conflict.description}</p>
                <div className="text-sm text-gray-600 mb-3">
                  <strong>Conflicting Functions:</strong> 
                  <span className="ml-2 font-mono bg-gray-100 px-2 py-1 rounded">
                    {conflict.functions.join(' ↔ ')}
                  </span>
                </div>
                <div className="flex space-x-2">
                  <button className="text-sm bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors font-medium">
                    Auto-Resolve
                  </button>
                  <button className="text-sm bg-gray-100 text-gray-700 px-4 py-2 rounded-lg hover:bg-gray-200 transition-colors">
                    Manual Review
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-200">
        <h3 className="text-lg font-semibold text-gray-900 mb-6">Priority & Arbitration Settings</h3>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50">
              <tr>
                <th className="text-left px-6 py-4 font-semibold text-gray-900 rounded-tl-lg">Function</th>
                <th className="text-left px-6 py-4 font-semibold text-gray-900">Domain</th>
                <th className="text-left px-6 py-4 font-semibold text-gray-900">Current Priority</th>
                <th className="text-left px-6 py-4 font-semibold text-gray-900">Arbitration Rule</th>
                <th className="text-left px-6 py-4 font-semibold text-gray-900">Status</th>
                <th className="text-right px-6 py-4 font-semibold text-gray-900 rounded-tr-lg">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {mockAOFunctions.filter(f => f.status === 'Active').map(func => (
                <tr key={func.id} className="hover:bg-gray-50 transition-colors">
                  <td className="px-6 py-4">
                    <div className="flex items-center space-x-3">
                      <div className={`w-3 h-3 rounded-full ${
                        func.name === 'FinOps Optimizer' ? 'bg-emerald-500' :
                        func.name === 'Network Energy Saver' ? 'bg-green-500' :
                        func.name === 'SLA Manager' ? 'bg-blue-500' :
                        func.name === 'Network Capacity Optimizer' ? 'bg-purple-500' :
                        'bg-gray-500'
                      }`}></div>
                      <div className="font-medium text-gray-900">{func.name}</div>
                    </div>
                  </td>
                  <td className="px-6 py-4 text-gray-700">{func.domain}</td>
                  <td className="px-6 py-4">
                    <select
                      value={priorities[func.id] || 2}
                      onChange={(e) => setPriorities(prev => ({ ...prev, [func.id]: parseInt(e.target.value) }))}
                      className="px-3 py-2 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-blue-500 focus:border-transparent font-medium"
                    >
                      <option value={1}>1 - Highest</option>
                      <option value={2}>2 - High</option>
                      <option value={3}>3 - Medium</option>
                      <option value={4}>4 - Low</option>
                    </select>
                  </td>
                  <td className="px-6 py-4">
                    <select className="px-3 py-2 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-blue-500 focus:border-transparent">
                      <option>Priority-based</option>
                      <option>Round-robin</option>
                      <option>Resource-aware</option>
                      <option>Time-based</option>
                    </select>
                  </td>
                  <td className="px-6 py-4">
                    <span className="px-3 py-1 bg-green-100 text-green-800 rounded-full text-xs font-medium">
                      Coordinated
                    </span>
                  </td>
                  <td className="px-6 py-4 text-right">
                    <button className="p-2 text-gray-600 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-colors">
                      <Settings className="h-4 w-4" />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-200">
        <h3 className="text-lg font-semibold text-gray-900 mb-6">Coordination Rules & Policies</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="p-5 bg-blue-50 border-2 border-blue-200 rounded-xl">
            <h4 className="font-semibold text-blue-900 mb-3 flex items-center space-x-2">
              <Shield className="h-5 w-5" />
              <span>SLA-First Policy</span>
            </h4>
            <p className="text-sm text-blue-700 mb-3 leading-relaxed">
              SLA Manager (Priority 1) always takes precedence over energy optimization functions during business hours (9 AM - 6 PM)
            </p>
            <div className="text-xs text-blue-600 bg-blue-100 p-2 rounded">
              <strong>Active Relationship:</strong> SLA Manager → overrides → Network Energy Saver
            </div>
          </div>

          <div className="p-5 bg-emerald-50 border-2 border-emerald-200 rounded-xl">
            <h4 className="font-semibold text-emerald-900 mb-3 flex items-center space-x-2">
              <GitBranch className="h-5 w-5" />
              <span>Cost-Energy Coordination</span>
            </h4>
            <p className="text-sm text-emerald-700 mb-3 leading-relaxed">
              FinOps Optimizer and Network Energy Saver coordinate to achieve both cost and energy efficiency during off-peak hours
            </p>
            <div className="text-xs text-emerald-600 bg-emerald-100 p-2 rounded">
              <strong>Active Relationship:</strong> FinOps Optimizer ↔ cooperates ↔ Network Energy Saver
            </div>
          </div>

          <div className="p-5 bg-purple-50 border-2 border-purple-200 rounded-xl">
            <h4 className="font-semibold text-purple-900 mb-3 flex items-center space-x-2">
              <AlertTriangle className="h-5 w-5" />
              <span>Resource Arbitration</span>
            </h4>
            <p className="text-sm text-purple-700 mb-3 leading-relaxed">
              When FinOps and Network Capacity Optimizer conflict over compute resources, priority-based arbitration resolves the conflict
            </p>
            <div className="text-xs text-purple-600 bg-purple-100 p-2 rounded">
              <strong>Active Relationship:</strong> Network Capacity (Priority 2) → overrides → FinOps (Priority 3)
            </div>
          </div>
        </div>
      </div>

      <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-200">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Coordination Relationships Summary</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="p-4 bg-red-50 border-2 border-red-200 rounded-xl">
            <h4 className="font-semibold text-red-900 mb-3 flex items-center space-x-2">
              <AlertTriangle className="h-5 w-5" />
              <span>High Conflict</span>
            </h4>
            <div className="text-sm text-red-700">
              <div className="font-semibold mb-1">SLA Manager ↔ Network Energy Saver</div>
              <div className="text-xs mb-2">Competing for network resource control during peak hours</div>
              <div className="text-xs bg-red-100 p-2 rounded">
                <strong>Resolution:</strong> SLA Manager takes priority during business hours (9 AM - 6 PM)
              </div>
            </div>
          </div>

          <div className="p-4 bg-yellow-50 border-2 border-yellow-200 rounded-xl">
            <h4 className="font-semibold text-yellow-900 mb-3 flex items-center space-x-2">
              <AlertTriangle className="h-5 w-5" />
              <span>Medium Conflict</span>
            </h4>
            <div className="text-sm text-yellow-700">
              <div className="font-semibold mb-1">FinOps ↔ Network Capacity Optimizer</div>
              <div className="text-xs mb-2">Cost optimization vs performance optimization trade-offs</div>
              <div className="text-xs bg-yellow-100 p-2 rounded">
                <strong>Resolution:</strong> Network Capacity (Priority 2) overrides FinOps (Priority 3) during peak load
              </div>
            </div>
          </div>

          <div className="p-4 bg-green-50 border-2 border-green-200 rounded-xl">
            <h4 className="font-semibold text-green-900 mb-3 flex items-center space-x-2">
              <GitBranch className="h-5 w-5" />
              <span>Active Cooperation</span>
            </h4>
            <div className="text-sm text-green-700">
              <div className="font-semibold mb-1">FinOps ↔ Network Energy Saver</div>
              <div className="text-xs mb-2">Aligned cost and energy reduction goals</div>
              <div className="text-xs bg-green-100 p-2 rounded">
                <strong>Strategy:</strong> Coordinated optimization during off-peak hours (6 PM - 9 AM)
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
import React, { useState } from 'react';
import { Plus, Save, Play, Edit, Trash2, ArrowRight, Settings } from 'lucide-react';
import { mockAOFunctions } from '../../data/mockData';

interface OrchestrationChain {
  id: string;
  name: string;
  description: string;
  functions: {
    id: string;
    name: string;
    order: number;
    conditions: string[];
    outputs: string[];
  }[];
  status: 'Draft' | 'Active' | 'Paused';
}

export const OrchestrationView: React.FC = () => {
  const [chains, setChains] = useState<OrchestrationChain[]>([
    {
      id: '1',
      name: 'Service Degradation Response',
      description: 'Automated response chain for service quality issues',
      functions: [
        {
          id: '6',
          name: 'SLA Manager',
          order: 1,
          conditions: ['SLA breach detected', 'Performance < 95%'],
          outputs: ['Service alert', 'Recovery trigger']
        },
        {
          id: '3',
          name: 'Network Capacity Optimizer',
          order: 2,
          conditions: ['Recovery trigger received', 'Network resources available'],
          outputs: ['Capacity adjustment', 'Load balancing update']
        },
        {
          id: '2',
          name: 'FinOps Optimizer',
          order: 3,
          conditions: ['Capacity increased', 'Budget threshold check'],
          outputs: ['Cost impact assessment', 'Budget alert if needed']
        }
      ],
      status: 'Active'
    },
    {
      id: '2',
      name: 'Order Processing Optimization',
      description: 'End-to-end order handling and optimization chain',
      functions: [
        {
          id: '1',
          name: 'Order Fallout Manager',
          order: 1,
          conditions: ['Order failure detected', 'Retry attempts < 3'],
          outputs: ['Failure classification', 'Recovery action']
        },
        {
          id: '4',
          name: 'Sales Quote Personalizer',
          order: 2,
          conditions: ['Order recovery failed', 'Customer retention needed'],
          outputs: ['Personalized offer', 'Discount recommendation']
        },
        {
          id: '5',
          name: 'Campaign Optimizer',
          order: 3,
          conditions: ['Customer engagement needed', 'Marketing budget available'],
          outputs: ['Targeted campaign', 'Customer re-engagement']
        }
      ],
      status: 'Draft'
    },
    {
      id: '3',
      name: 'Sustainable Operations Chain',
      description: 'Balance performance with energy efficiency',
      functions: [
        {
          id: '7',
          name: 'Network Energy Saver',
          order: 1,
          conditions: ['Off-peak hours', 'Low traffic detected'],
          outputs: ['Energy reduction plan', 'Performance impact assessment']
        },
        {
          id: '6',
          name: 'SLA Manager',
          order: 2,
          conditions: ['Performance impact > threshold', 'SLA risk detected'],
          outputs: ['Override energy savings', 'Maintain service levels']
        },
        {
          id: '2',
          name: 'FinOps Optimizer',
          order: 3,
          conditions: ['Energy savings achieved', 'Cost optimization opportunity'],
          outputs: ['Resource reallocation', 'Cost savings report']
        }
      ],
      status: 'Paused'
    }
  ]);

  const [selectedChain, setSelectedChain] = useState<string | null>(null);
  const [showEditor, setShowEditor] = useState(false);
  const [availableFunctions] = useState(mockAOFunctions);

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Active': return 'bg-green-100 text-green-800';
      case 'Draft': return 'bg-gray-100 text-gray-800';
      case 'Paused': return 'bg-yellow-100 text-yellow-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const handleCreateChain = () => {
    setShowEditor(true);
    setSelectedChain(null);
  };

  const handleEditChain = (chainId: string) => {
    setSelectedChain(chainId);
    setShowEditor(true);
  };

  const handleDeleteChain = (chainId: string) => {
    setChains(prev => prev.filter(chain => chain.id !== chainId));
  };

  const handleStatusChange = (chainId: string, newStatus: OrchestrationChain['status']) => {
    setChains(prev => prev.map(chain => 
      chain.id === chainId ? { ...chain, status: newStatus } : chain
    ));
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold text-gray-900">Cross AOF Closed Loop Orchestration</h2>
          <p className="text-gray-600 mt-1">Design and manage multi-function autonomous operation chains</p>
        </div>
        <button
          onClick={handleCreateChain}
          className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors flex items-center space-x-2"
        >
          <Plus className="h-4 w-4" />
          <span>Create Chain</span>
        </button>
      </div>

      {!showEditor ? (
        <div className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-200">
              <div className="flex items-center space-x-3">
                <div className="w-10 h-10 bg-green-100 rounded-lg flex items-center justify-center">
                  <Play className="h-5 w-5 text-green-600" />
                </div>
                <div>
                  <div className="text-2xl font-bold text-gray-900">
                    {chains.filter(c => c.status === 'Active').length}
                  </div>
                  <div className="text-sm text-gray-600">Active Chains</div>
                </div>
              </div>
            </div>

            <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-200">
              <div className="flex items-center space-x-3">
                <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center">
                  <Settings className="h-5 w-5 text-blue-600" />
                </div>
                <div>
                  <div className="text-2xl font-bold text-gray-900">
                    {chains.reduce((acc, chain) => acc + chain.functions.length, 0)}
                  </div>
                  <div className="text-sm text-gray-600">Total Functions</div>
                </div>
              </div>
            </div>

            <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-200">
              <div className="flex items-center space-x-3">
                <div className="w-10 h-10 bg-purple-100 rounded-lg flex items-center justify-center">
                  <ArrowRight className="h-5 w-5 text-purple-600" />
                </div>
                <div>
                  <div className="text-2xl font-bold text-gray-900">
                    {chains.reduce((acc, chain) => acc + (chain.functions.length - 1), 0)}
                  </div>
                  <div className="text-sm text-gray-600">Chain Links</div>
                </div>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
            <div className="px-6 py-4 border-b border-gray-200">
              <h3 className="text-lg font-semibold text-gray-900">Orchestration Chains</h3>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="text-left px-6 py-3 font-semibold text-gray-900">Chain Name</th>
                    <th className="text-left px-6 py-3 font-semibold text-gray-900">Description</th>
                    <th className="text-left px-6 py-3 font-semibold text-gray-900">Functions</th>
                    <th className="text-left px-6 py-3 font-semibold text-gray-900">Status</th>
                    <th className="text-right px-6 py-3 font-semibold text-gray-900">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200">
                  {chains.map(chain => (
                    <tr key={chain.id} className="hover:bg-gray-50 transition-colors">
                      <td className="px-6 py-4">
                        <div className="font-medium text-gray-900">{chain.name}</div>
                      </td>
                      <td className="px-6 py-4">
                        <div className="text-sm text-gray-700">{chain.description}</div>
                      </td>
                      <td className="px-6 py-4">
                        <div className="flex items-center space-x-1">
                          {chain.functions.map((func, index) => (
                            <React.Fragment key={func.id}>
                              <span className="text-xs bg-blue-100 text-blue-800 px-2 py-1 rounded">
                                {func.name.split(' ')[0]}
                              </span>
                              {index < chain.functions.length - 1 && (
                                <ArrowRight className="h-3 w-3 text-gray-400" />
                              )}
                            </React.Fragment>
                          ))}
                        </div>
                      </td>
                      <td className="px-6 py-4">
                        <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(chain.status)}`}>
                          {chain.status}
                        </span>
                      </td>
                      <td className="px-6 py-4">
                        <div className="flex items-center justify-end space-x-2">
                          <button
                            onClick={() => handleEditChain(chain.id)}
                            className="p-1.5 text-gray-600 hover:text-blue-600 hover:bg-blue-50 rounded transition-colors"
                            title="Edit Chain"
                          >
                            <Edit className="h-4 w-4" />
                          </button>
                          <button
                            onClick={() => handleStatusChange(chain.id, chain.status === 'Active' ? 'Paused' : 'Active')}
                            className="p-1.5 text-gray-600 hover:text-emerald-600 hover:bg-emerald-50 rounded transition-colors"
                            title={chain.status === 'Active' ? 'Pause' : 'Activate'}
                          >
                            <Play className="h-4 w-4" />
                          </button>
                          <button
                            onClick={() => handleDeleteChain(chain.id)}
                            className="p-1.5 text-gray-600 hover:text-red-600 hover:bg-red-50 rounded transition-colors"
                            title="Delete Chain"
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

          {chains.map(chain => (
            <div key={chain.id} className="bg-white rounded-xl p-6 shadow-sm border border-gray-200">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-semibold text-gray-900">{chain.name}</h3>
                <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(chain.status)}`}>
                  {chain.status}
                </span>
              </div>
              <p className="text-gray-600 mb-4">{chain.description}</p>
              
              <div className="flex items-center space-x-4 overflow-x-auto pb-2">
                {chain.functions.map((func, index) => (
                  <React.Fragment key={func.id}>
                    <div className="flex-shrink-0 w-48 p-4 bg-blue-50 border border-blue-200 rounded-lg">
                      <div className="flex items-center justify-between mb-2">
                        <span className="text-sm font-medium text-blue-900">{func.name}</span>
                        <span className="text-xs bg-blue-200 text-blue-800 px-2 py-1 rounded-full">
                          Step {func.order}
                        </span>
                      </div>
                      <div className="space-y-2">
                        <div>
                          <div className="text-xs font-medium text-gray-700 mb-1">Conditions:</div>
                          {func.conditions.map((condition, i) => (
                            <div key={i} className="text-xs text-gray-600 bg-white px-2 py-1 rounded">
                              {condition}
                            </div>
                          ))}
                        </div>
                        <div>
                          <div className="text-xs font-medium text-gray-700 mb-1">Outputs:</div>
                          {func.outputs.map((output, i) => (
                            <div key={i} className="text-xs text-gray-600 bg-white px-2 py-1 rounded">
                              {output}
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>
                    {index < chain.functions.length - 1 && (
                      <ArrowRight className="h-6 w-6 text-gray-400 flex-shrink-0" />
                    )}
                  </React.Fragment>
                ))}
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-200">
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-lg font-semibold text-gray-900">
              {selectedChain ? 'Edit Orchestration Chain' : 'Create New Orchestration Chain'}
            </h3>
            <button
              onClick={() => setShowEditor(false)}
              className="text-gray-600 hover:text-gray-900"
            >
              Cancel
            </button>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <div className="lg:col-span-2 space-y-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Chain Name</label>
                <input
                  type="text"
                  placeholder="Enter chain name..."
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Description</label>
                <textarea
                  placeholder="Describe the purpose and workflow of this orchestration chain..."
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent h-20 resize-none"
                />
              </div>

              <div>
                <h4 className="text-sm font-medium text-gray-700 mb-3">Chain Sequence</h4>
                <div className="space-y-3 min-h-40 p-4 border-2 border-dashed border-gray-300 rounded-lg">
                  <div className="text-center text-gray-500">
                    <Plus className="h-8 w-8 mx-auto mb-2 text-gray-400" />
                    <p className="text-sm">Drag AO Functions here to build your orchestration chain</p>
                  </div>
                </div>
              </div>

              <div className="flex space-x-3">
                <button
                  onClick={() => setShowEditor(false)}
                  className="flex-1 bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition-colors font-medium flex items-center justify-center space-x-2"
                >
                  <Save className="h-4 w-4" />
                  <span>Save Chain</span>
                </button>
                <button className="px-6 py-3 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-colors">
                  Test Chain
                </button>
              </div>
            </div>

            <div className="space-y-4">
              <div className="bg-gray-50 rounded-xl p-4">
                <h4 className="font-semibold text-gray-900 mb-3">Available AO Functions</h4>
                <div className="space-y-2 max-h-80 overflow-y-auto">
                  {availableFunctions.map(func => (
                    <div
                      key={func.id}
                      className="p-3 bg-white hover:bg-blue-50 rounded-lg cursor-pointer transition-colors border border-gray-200 hover:border-blue-300"
                      draggable
                    >
                      <div className="text-sm font-medium text-gray-900">{func.name}</div>
                      <div className="text-xs text-gray-600">{func.domain}</div>
                      <div className="text-xs text-gray-500 mt-1">{func.capability}</div>
                    </div>
                  ))}
                </div>
              </div>

              <div className="bg-blue-50 border border-blue-200 rounded-xl p-4">
                <div className="flex items-start space-x-2">
                  <div className="w-2 h-2 bg-blue-500 rounded-full mt-2"></div>
                  <div>
                    <div className="font-medium text-blue-900 text-sm">Chain Design Tips</div>
                    <div className="text-blue-700 text-xs mt-1 space-y-1">
                      <p>• Order functions by logical sequence</p>
                      <p>• Define clear trigger conditions</p>
                      <p>• Specify expected outputs</p>
                      <p>• Consider failure scenarios</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
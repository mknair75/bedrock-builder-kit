import React, { useState } from 'react';
import { Plus, Save, Play, Download, Trash2 } from 'lucide-react';
import { mockAOFunctions, mockTMFApis, mockODAComponents, mockCAMARAApis } from '../../data/mockData';

interface Node {
  id: string;
  type: 'function' | 'api' | 'oda' | 'camara';
  name: string;
  x: number;
  y: number;
}

interface Connection {
  from: string;
  to: string;
}

export const IntegrationView: React.FC = () => {
  const [nodes, setNodes] = useState<Node[]>([]);
  const [connections, setConnections] = useState<Connection[]>([]);
  const [selectedNode, setSelectedNode] = useState<string | null>(null);
  // const [draggedNode, setDraggedNode] = useState<string | null>(null);

  // Initialize with a mock relationship
  React.useEffect(() => {
    const mockNodes: Node[] = [
      { id: 'func-1', type: 'function', name: 'Order Fallout Manager', x: 100, y: 150 },
      { id: 'api-1', type: 'api', name: 'TMF622 Product Ordering', x: 350, y: 100 },
      { id: 'oda-1', type: 'oda', name: 'Product Inventory Management', x: 350, y: 200 },
      { id: 'camara-1', type: 'camara', name: 'Device Status', x: 600, y: 150 }
    ];
    setNodes(mockNodes);
    
    const mockConnections: Connection[] = [
      { from: 'func-1', to: 'api-1' },
      { from: 'func-1', to: 'oda-1' },
      { from: 'api-1', to: 'camara-1' }
    ];
    setConnections(mockConnections);
  }, []);

  const addNode = (item: any, type: 'function' | 'api' | 'oda' | 'camara') => {
    const newNode: Node = {
      id: `${type}-${item.id}-${Date.now()}`,
      type,
      name: item.name,
      x: Math.random() * 300 + 100,
      y: Math.random() * 200 + 100
    };
    setNodes(prev => [...prev, newNode]);
  };

  const removeNode = (nodeId: string) => {
    setNodes(prev => prev.filter(n => n.id !== nodeId));
    setConnections(prev => prev.filter(c => c.from !== nodeId && c.to !== nodeId));
    if (selectedNode === nodeId) {
      setSelectedNode(null);
    }
  };

  const clearCanvas = () => {
    setNodes([]);
    setConnections([]);
    setSelectedNode(null);
  };

  const handleValidate = () => {
    if (nodes.length === 0) {
      alert('Please add some components to validate the integration flow.');
      return;
    }
    alert('Integration flow validated successfully! All connections are properly configured.');
  };

  const handleSave = () => {
    if (nodes.length === 0) {
      alert('Please create an integration flow before saving.');
      return;
    }
    alert('Integration blueprint saved successfully!');
  };

  const handleDeploy = () => {
    if (nodes.length === 0) {
      alert('Please create an integration flow before deploying.');
      return;
    }
    alert('Integration deployed to runtime environment successfully!');
  };

  const handleExport = () => {
    if (nodes.length === 0) {
      alert('Please create an integration flow before exporting.');
      return;
    }
    const spec = {
      nodes,
      connections,
      timestamp: new Date().toISOString()
    };
    const blob = new Blob([JSON.stringify(spec, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'integration-spec.json';
    a.click();
  };

  const getNodeStyle = (node: Node) => {
    const baseStyle = "absolute w-36 h-20 rounded-lg border-2 cursor-pointer transition-all flex flex-col items-center justify-center p-2 text-center";
    const selectedStyle = selectedNode === node.id ? "ring-2 ring-blue-500 shadow-lg" : "";
    
    switch (node.type) {
      case 'function':
        return `${baseStyle} ${selectedStyle} border-blue-300 bg-blue-50 hover:border-blue-400 hover:shadow-md`;
      case 'api':
        return `${baseStyle} ${selectedStyle} border-emerald-300 bg-emerald-50 hover:border-emerald-400 hover:shadow-md`;
      case 'oda':
        return `${baseStyle} ${selectedStyle} border-purple-300 bg-purple-50 hover:border-purple-400 hover:shadow-md`;
      case 'camara':
        return `${baseStyle} ${selectedStyle} border-orange-300 bg-orange-50 hover:border-orange-400 hover:shadow-md`;
      default:
        return `${baseStyle} ${selectedStyle} border-gray-300 bg-gray-50`;
    }
  };

  const getNodeTextColor = (type: string) => {
    switch (type) {
      case 'function': return 'text-blue-900';
      case 'api': return 'text-emerald-900';
      case 'oda': return 'text-purple-900';
      case 'camara': return 'text-orange-900';
      default: return 'text-gray-900';
    }
  };

  const getNodeTypeLabel = (type: string) => {
    switch (type) {
      case 'function': return 'AO Function';
      case 'api': return 'TMF API';
      case 'oda': return 'ODA Component';
      case 'camara': return 'CAMARA API';
      default: return 'Component';
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold text-gray-900">Integration Composer</h2>
          <p className="text-gray-600 mt-1">Visual design canvas for AO Function integration flows</p>
        </div>
        <div className="flex items-center space-x-3">
          <button
            onClick={clearCanvas}
            className="px-4 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-colors"
          >
            Clear Canvas
          </button>
          <button
            onClick={handleValidate}
            className="px-4 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-colors"
          >
            Validate Flow
          </button>
          <button
            onClick={handleSave}
            className="px-4 py-2 bg-blue-100 text-blue-700 rounded-lg hover:bg-blue-200 transition-colors flex items-center space-x-2"
          >
            <Save className="h-4 w-4" />
            <span>Save Blueprint</span>
          </button>
          <button
            onClick={handleExport}
            className="px-4 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-colors flex items-center space-x-2"
          >
            <Download className="h-4 w-4" />
            <span>Export</span>
          </button>
          <button
            onClick={handleDeploy}
            className="px-4 py-2 bg-emerald-600 text-white rounded-lg hover:bg-emerald-700 transition-colors flex items-center space-x-2"
          >
            <Play className="h-4 w-4" />
            <span>Deploy</span>
          </button>
        </div>
      </div>

      <div className="grid grid-cols-12 gap-6">
        {/* Component Panels */}
        <div className="col-span-3 space-y-4">
          <div className="bg-white rounded-xl p-4 shadow-sm border border-gray-200">
            <h3 className="font-semibold text-gray-900 mb-3 text-center">AO Functions</h3>
            <div className="space-y-2 max-h-40 overflow-y-auto">
              {mockAOFunctions.map(func => (
                <div
                  key={func.id}
                  onClick={() => addNode(func, 'function')}
                  className="p-3 bg-blue-50 hover:bg-blue-100 rounded-lg cursor-pointer transition-colors border border-blue-200 hover:border-blue-300"
                >
                  <div className="text-xs font-medium text-blue-900 leading-tight">{func.name}</div>
                  <div className="text-xs text-blue-700 mt-1">{func.domain}</div>
                </div>
              ))}
            </div>
          </div>

          <div className="bg-white rounded-xl p-4 shadow-sm border border-gray-200">
            <h3 className="font-semibold text-gray-900 mb-3 text-center">TMF APIs</h3>
            <div className="space-y-2 max-h-32 overflow-y-auto">
              {mockTMFApis.map(api => (
                <div
                  key={api.id}
                  onClick={() => addNode(api, 'api')}
                  className="p-3 bg-emerald-50 hover:bg-emerald-100 rounded-lg cursor-pointer transition-colors border border-emerald-200 hover:border-emerald-300"
                >
                  <div className="text-xs font-medium text-emerald-900 leading-tight">{api.name}</div>
                  <div className="text-xs text-emerald-700 mt-1">{api.specification}</div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Integration Canvas */}
        <div className="col-span-6">
          <div className="bg-white rounded-xl p-4 shadow-sm border border-gray-200 h-[600px]">
            <div className="flex items-center justify-between mb-4">
              <h3 className="font-semibold text-gray-900">Integration Canvas</h3>
              <div className="text-xs text-gray-500">
                {nodes.length} components • {connections.length} connections
              </div>
            </div>
            <div className="relative w-full h-full bg-gradient-to-br from-gray-50 to-gray-100 rounded-lg border border-gray-200 overflow-hidden">
              {nodes.length === 0 ? (
                <div className="absolute inset-0 flex items-center justify-center text-gray-500">
                  <div className="text-center">
                    <Plus className="h-16 w-16 mx-auto mb-4 text-gray-300" />
                    <p className="text-lg font-medium text-gray-400 mb-2">Build Your Integration</p>
                    <p className="text-sm text-gray-400">Click on components from the side panels to add them to the canvas</p>
                  </div>
                </div>
              ) : (
                <div className="relative w-full h-full">
                  {/* Grid background */}
                  <div className="absolute inset-0 opacity-20">
                    <svg width="100%" height="100%">
                      <defs>
                        <pattern id="grid" width="20" height="20" patternUnits="userSpaceOnUse">
                          <path d="M 20 0 L 0 0 0 20" fill="none" stroke="#e5e7eb" strokeWidth="1"/>
                        </pattern>
                      </defs>
                      <rect width="100%" height="100%" fill="url(#grid)" />
                    </svg>
                  </div>

                  {/* Render connections */}
                  <svg className="absolute inset-0 w-full h-full pointer-events-none">
                    {connections.map((conn, index) => {
                      const fromNode = nodes.find(n => n.id === conn.from);
                      const toNode = nodes.find(n => n.id === conn.to);
                      if (!fromNode || !toNode) return null;
                      
                      return (
                        <line
                          key={index}
                          x1={fromNode.x + 72}
                          y1={fromNode.y + 40}
                          x2={toNode.x + 72}
                          y2={toNode.y + 40}
                          stroke="#6366f1"
                          strokeWidth="3"
                          markerEnd="url(#integration-arrow)"
                          className="drop-shadow-sm"
                        />
                      );
                    })}
                    <defs>
                      <marker id="integration-arrow" markerWidth="12" markerHeight="12" refX="10" refY="3" orient="auto" markerUnits="strokeWidth">
                        <path d="M0,0 L0,6 L9,3 z" fill="#6366f1"/>
                      </marker>
                    </defs>
                  </svg>

                  {/* Render nodes */}
                  {nodes.map(node => (
                    <div
                      key={node.id}
                      style={{ left: node.x, top: node.y }}
                      onClick={() => setSelectedNode(selectedNode === node.id ? null : node.id)}
                      className={getNodeStyle(node)}
                    >
                      <div className={`text-xs font-semibold ${getNodeTextColor(node.type)} leading-tight`}>
                        {node.name}
                      </div>
                      <div className={`text-xs mt-1 ${getNodeTextColor(node.type)} opacity-75`}>
                        {getNodeTypeLabel(node.type)}
                      </div>
                      
                      {selectedNode === node.id && (
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            removeNode(node.id);
                          }}
                          className="absolute -top-2 -right-2 w-5 h-5 bg-red-500 text-white rounded-full flex items-center justify-center hover:bg-red-600 transition-colors"
                        >
                          <Trash2 className="h-3 w-3" />
                        </button>
                      )}
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Right Side Panels */}
        <div className="col-span-3 space-y-4">
          <div className="bg-white rounded-xl p-4 shadow-sm border border-gray-200">
            <h3 className="font-semibold text-gray-900 mb-3 text-center">ODA Components</h3>
            <div className="space-y-2 max-h-32 overflow-y-auto">
              {mockODAComponents.map(component => (
                <div
                  key={component.id}
                  onClick={() => addNode(component, 'oda')}
                  className="p-3 bg-purple-50 hover:bg-purple-100 rounded-lg cursor-pointer transition-colors border border-purple-200 hover:border-purple-300"
                >
                  <div className="text-xs font-medium text-purple-900 leading-tight">{component.name}</div>
                  <div className="text-xs text-purple-700 mt-1">{component.specification}</div>
                </div>
              ))}
            </div>
          </div>

          <div className="bg-white rounded-xl p-4 shadow-sm border border-gray-200">
            <h3 className="font-semibold text-gray-900 mb-3 text-center">CAMARA APIs</h3>
            <div className="space-y-2 max-h-32 overflow-y-auto">
              {mockCAMARAApis.map(api => (
                <div
                  key={api.id}
                  onClick={() => addNode(api, 'camara')}
                  className="p-3 bg-orange-50 hover:bg-orange-100 rounded-lg cursor-pointer transition-colors border border-orange-200 hover:border-orange-300"
                >
                  <div className="text-xs font-medium text-orange-900 leading-tight">{api.name}</div>
                  <div className="text-xs text-orange-700 mt-1">{api.specification}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {nodes.length > 0 && (
        <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-200">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Integration Summary</h3>
          <div className="grid grid-cols-4 gap-6">
            <div className="text-center">
              <h4 className="font-medium text-gray-900 mb-3">AO Functions</h4>
              <div className="text-2xl font-bold text-blue-600 mb-2">
                {nodes.filter(n => n.type === 'function').length}
              </div>
              <div className="space-y-1">
                {nodes.filter(n => n.type === 'function').map(node => (
                  <div key={node.id} className="text-xs text-gray-700 bg-blue-50 px-2 py-1 rounded">
                    {node.name}
                  </div>
                ))}
              </div>
            </div>
            
            <div className="text-center">
              <h4 className="font-medium text-gray-900 mb-3">TMF APIs</h4>
              <div className="text-2xl font-bold text-emerald-600 mb-2">
                {nodes.filter(n => n.type === 'api').length}
              </div>
              <div className="space-y-1">
                {nodes.filter(n => n.type === 'api').map(node => (
                  <div key={node.id} className="text-xs text-gray-700 bg-emerald-50 px-2 py-1 rounded">
                    {node.name}
                  </div>
                ))}
              </div>
            </div>
            
            <div className="text-center">
              <h4 className="font-medium text-gray-900 mb-3">ODA Components</h4>
              <div className="text-2xl font-bold text-purple-600 mb-2">
                {nodes.filter(n => n.type === 'oda').length}
              </div>
              <div className="space-y-1">
                {nodes.filter(n => n.type === 'oda').map(node => (
                  <div key={node.id} className="text-xs text-gray-700 bg-purple-50 px-2 py-1 rounded">
                    {node.name}
                  </div>
                ))}
              </div>
            </div>
            
            <div className="text-center">
              <h4 className="font-medium text-gray-900 mb-3">CAMARA APIs</h4>
              <div className="text-2xl font-bold text-orange-600 mb-2">
                {nodes.filter(n => n.type === 'camara').length}
              </div>
              <div className="space-y-1">
                {nodes.filter(n => n.type === 'camara').map(node => (
                  <div key={node.id} className="text-xs text-gray-700 bg-orange-50 px-2 py-1 rounded">
                    {node.name}
                  </div>
                ))}
              </div>
            </div>
          </div>
          
          <div className="mt-6 pt-4 border-t border-gray-200">
            <div className="flex items-center justify-center space-x-8 text-sm">
              <div className="flex items-center space-x-2">
                <div className="w-4 h-0.5 bg-indigo-500"></div>
                <span className="text-gray-600">Data Flow</span>
              </div>
              <div className="text-gray-500">
                Total Connections: <span className="font-medium text-gray-900">{connections.length}</span>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
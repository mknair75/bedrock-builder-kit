import React, { useState, useEffect } from 'react';
import { Pause, Clock, TrendingUp, Activity } from 'lucide-react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { mockAOFunctions, mockExecutionEvents } from '../../data/mockData';

export const ExecutionView: React.FC = () => {
  const [realtimeData, setRealtimeData] = useState(mockExecutionEvents);
  const [selectedFunction, setSelectedFunction] = useState('all');

  useEffect(() => {
    const interval = setInterval(() => {
      // Simulate real-time updates
      setRealtimeData(prev => {
        const newEvent = {
          id: Math.random().toString(),
          functionId: mockAOFunctions[Math.floor(Math.random() * mockAOFunctions.length)].id,
          timestamp: new Date(),
          status: Math.random() > 0.1 ? 'completed' as const : 'failed' as const,
          step: ['Observe', 'Orient', 'Decide', 'Act'][Math.floor(Math.random() * 4)],
          duration: Math.random() * 5 + 1,
          keiValues: { 'Success Rate': Math.random() * 100 }
        };
        return [newEvent, ...prev.slice(0, 19)];
      });
    }, 5000);

    return () => clearInterval(interval);
  }, []);

  const chartData = Array.from({ length: 24 }, (_, i) => ({
    hour: `${i}:00`,
    executions: Math.floor(Math.random() * 200) + 50,
    success: Math.floor(Math.random() * 50) + 85
  }));

  const filteredEvents = selectedFunction === 'all' 
    ? realtimeData 
    : realtimeData.filter(event => event.functionId === selectedFunction);

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'running': return 'bg-blue-100 text-blue-800';
      case 'completed': return 'bg-green-100 text-green-800';
      case 'failed': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold text-gray-900">Execution Dashboard</h2>
          <p className="text-gray-600 mt-1">Real-time monitoring of AO Function executions</p>
        </div>
        <div className="flex items-center space-x-4">
          <select
            value={selectedFunction}
            onChange={(e) => setSelectedFunction(e.target.value)}
            className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          >
            <option value="all">All Functions</option>
            {mockAOFunctions.map(func => (
              <option key={func.id} value={func.id}>{func.name}</option>
            ))}
          </select>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-200">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center">
              <Activity className="h-5 w-5 text-blue-600" />
            </div>
            <div>
              <div className="text-2xl font-bold text-gray-900">
                {filteredEvents.filter(e => e.status === 'running').length}
              </div>
              <div className="text-sm text-gray-600">Running</div>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-200">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 bg-green-100 rounded-lg flex items-center justify-center">
              <TrendingUp className="h-5 w-5 text-green-600" />
            </div>
            <div>
              <div className="text-2xl font-bold text-gray-900">
                {filteredEvents.filter(e => e.status === 'completed').length}
              </div>
              <div className="text-sm text-gray-600">Completed</div>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-200">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 bg-red-100 rounded-lg flex items-center justify-center">
              <Pause className="h-5 w-5 text-red-600" />
            </div>
            <div>
              <div className="text-2xl font-bold text-gray-900">
                {filteredEvents.filter(e => e.status === 'failed').length}
              </div>
              <div className="text-sm text-gray-600">Failed</div>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-200">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 bg-purple-100 rounded-lg flex items-center justify-center">
              <Clock className="h-5 w-5 text-purple-600" />
            </div>
            <div>
              <div className="text-2xl font-bold text-gray-900">
                {(filteredEvents.reduce((acc, e) => acc + e.duration, 0) / filteredEvents.length).toFixed(1)}s
              </div>
              <div className="text-sm text-gray-600">Avg Duration</div>
            </div>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-200">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Execution Trends</h3>
          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={chartData}>
              <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
              <XAxis dataKey="hour" stroke="#666" />
              <YAxis stroke="#666" />
              <Tooltip 
                contentStyle={{ 
                  backgroundColor: 'white', 
                  border: '1px solid #e5e7eb',
                  borderRadius: '8px'
                }}
              />
              <Line 
                type="monotone" 
                dataKey="executions" 
                stroke="#3B82F6" 
                strokeWidth={2}
                dot={{ fill: '#3B82F6', strokeWidth: 2, r: 4 }}
              />
              <Line 
                type="monotone" 
                dataKey="success" 
                stroke="#10B981" 
                strokeWidth={2}
                dot={{ fill: '#10B981', strokeWidth: 2, r: 4 }}
              />
            </LineChart>
          </ResponsiveContainer>
        </div>

        <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-200">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Live Execution Log</h3>
          <div className="space-y-3 max-h-80 overflow-y-auto">
            {filteredEvents.slice(0, 10).map(event => {
              const func = mockAOFunctions.find(f => f.id === event.functionId);
              return (
                <div key={event.id} className="flex items-center space-x-3 p-3 bg-gray-50 rounded-lg">
                  <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(event.status)}`}>
                    {event.status}
                  </span>
                  <div className="flex-1">
                    <div className="text-sm font-medium text-gray-900">{func?.name}</div>
                    <div className="text-xs text-gray-600">{event.step} • {event.duration}s</div>
                  </div>
                  <div className="text-xs text-gray-500">
                    {event.timestamp.toLocaleTimeString()}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-200">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">KPI Telemetry</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {mockAOFunctions.map(func => (
            <div key={func.id} className="p-4 bg-gray-50 rounded-lg">
              <h4 className="font-medium text-gray-900 mb-3">{func.name}</h4>
              <div className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span className="text-gray-600">Success Rate</span>
                  <span className="font-medium">{func.executionMetrics.successRate}%</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-gray-600">Executions</span>
                  <span className="font-medium">{func.executionMetrics.frequency}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-gray-600">Avg Time</span>
                  <span className="font-medium">{func.executionMetrics.avgExecutionTime}s</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
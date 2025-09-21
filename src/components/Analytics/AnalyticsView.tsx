import React, { useState } from 'react';
import { TrendingUp, TrendingDown, BarChart3, Target, Calendar } from 'lucide-react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, BarChart, Bar } from 'recharts';
import { mockAOFunctions } from '../../data/mockData';

export const AnalyticsView: React.FC = () => {
  const [timeRange, setTimeRange] = useState('7d');

  const performanceData = Array.from({ length: 30 }, (_, i) => ({
    day: `Day ${i + 1}`,
    kei: Math.random() * 20 + 80,
    kci: Math.random() * 15 + 85,
    kbi: Math.random() * 25 + 75
  }));

  const functionComparison = mockAOFunctions.map(func => ({
    name: func.name.split(' ')[0],
    effectiveness: func.executionMetrics.successRate,
    impact: Math.random() * 50 + 50,
    roi: Math.random() * 200 + 100
  }));

  const recommendations = [
    {
      function: 'Order Fallout Manager',
      recommendation: 'Increase retry threshold from 3 to 5 attempts',
      impact: '+2.3% success rate',
      type: 'optimization'
    },
    {
      function: 'FinOps Optimizer',
      recommendation: 'Enable predictive scaling for weekend workloads',
      impact: '-15% cost reduction',
      type: 'cost'
    },
    {
      function: 'Network Capacity Optimizer',
      recommendation: 'Adjust load balancing algorithm weights',
      impact: '+8% throughput improvement',
      type: 'performance'
    }
  ];

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold text-gray-900">Analytics & Insights</h2>
          <p className="text-gray-600 mt-1">Performance analysis and optimization recommendations</p>
        </div>
        <div className="flex items-center space-x-4">
          <select
            value={timeRange}
            onChange={(e) => setTimeRange(e.target.value)}
            className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          >
            <option value="24h">Last 24 Hours</option>
            <option value="7d">Last 7 Days</option>
            <option value="30d">Last 30 Days</option>
            <option value="90d">Last 90 Days</option>
          </select>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-200">
          <div className="flex items-center justify-between">
            <div>
              <div className="text-2xl font-bold text-gray-900">94.2%</div>
              <div className="text-sm text-gray-600">Overall KEI</div>
            </div>
            <div className="w-10 h-10 bg-green-100 rounded-lg flex items-center justify-center">
              <TrendingUp className="h-5 w-5 text-green-600" />
            </div>
          </div>
          <div className="mt-2 flex items-center text-sm text-green-600">
            <TrendingUp className="h-3 w-3 mr-1" />
            <span>+2.1% from last period</span>
          </div>
        </div>

        <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-200">
          <div className="flex items-center justify-between">
            <div>
              <div className="text-2xl font-bold text-gray-900">89.7%</div>
              <div className="text-sm text-gray-600">Overall KCI</div>
            </div>
            <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center">
              <Target className="h-5 w-5 text-blue-600" />
            </div>
          </div>
          <div className="mt-2 flex items-center text-sm text-blue-600">
            <TrendingUp className="h-3 w-3 mr-1" />
            <span>+1.8% from last period</span>
          </div>
        </div>

        <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-200">
          <div className="flex items-center justify-between">
            <div>
              <div className="text-2xl font-bold text-gray-900">$2.4M</div>
              <div className="text-sm text-gray-600">Cost Savings</div>
            </div>
            <div className="w-10 h-10 bg-emerald-100 rounded-lg flex items-center justify-center">
              <BarChart3 className="h-5 w-5 text-emerald-600" />
            </div>
          </div>
          <div className="mt-2 flex items-center text-sm text-emerald-600">
            <TrendingUp className="h-3 w-3 mr-1" />
            <span>+12.5% from last period</span>
          </div>
        </div>

        <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-200">
          <div className="flex items-center justify-between">
            <div>
              <div className="text-2xl font-bold text-gray-900">15.3M</div>
              <div className="text-sm text-gray-600">Total Executions</div>
            </div>
            <div className="w-10 h-10 bg-purple-100 rounded-lg flex items-center justify-center">
              <Calendar className="h-5 w-5 text-purple-600" />
            </div>
          </div>
          <div className="mt-2 flex items-center text-sm text-purple-600">
            <TrendingUp className="h-3 w-3 mr-1" />
            <span>+8.2% from last period</span>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-200">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Performance Trends</h3>
          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={performanceData}>
              <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
              <XAxis dataKey="day" stroke="#666" />
              <YAxis stroke="#666" />
              <Tooltip 
                contentStyle={{ 
                  backgroundColor: 'white', 
                  border: '1px solid #e5e7eb',
                  borderRadius: '8px'
                }}
              />
              <Line type="monotone" dataKey="kei" stroke="#3B82F6" strokeWidth={2} name="KEI" />
              <Line type="monotone" dataKey="kci" stroke="#6366F1" strokeWidth={2} name="KCI" />
              <Line type="monotone" dataKey="kbi" stroke="#8B5CF6" strokeWidth={2} name="KBI" />
            </LineChart>
          </ResponsiveContainer>
        </div>

        <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-200">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Function Effectiveness Comparison</h3>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={functionComparison}>
              <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
              <XAxis dataKey="name" stroke="#666" />
              <YAxis stroke="#666" />
              <Tooltip 
                contentStyle={{ 
                  backgroundColor: 'white', 
                  border: '1px solid #e5e7eb',
                  borderRadius: '8px'
                }}
              />
              <Bar dataKey="effectiveness" fill="#3B82F6" radius={[4, 4, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>

      <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-200">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Optimization Recommendations</h3>
        <div className="space-y-4">
          {recommendations.map((rec, index) => (
            <div key={index} className="p-4 bg-gray-50 rounded-lg border border-gray-200">
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  <h4 className="font-medium text-gray-900">{rec.function}</h4>
                  <p className="text-sm text-gray-700 mt-1">{rec.recommendation}</p>
                  <div className="mt-2 flex items-center space-x-2">
                    <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                      rec.type === 'optimization' ? 'bg-blue-100 text-blue-800' :
                      rec.type === 'cost' ? 'bg-emerald-100 text-emerald-800' :
                      'bg-purple-100 text-purple-800'
                    }`}>
                      {rec.type}
                    </span>
                    <span className="text-sm font-medium text-gray-900">{rec.impact}</span>
                  </div>
                </div>
                <button className="ml-4 px-3 py-1 bg-blue-600 text-white text-sm rounded-lg hover:bg-blue-700 transition-colors">
                  Apply
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
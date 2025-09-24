import React, { useState } from 'react';
import { 
  Search, 
  Play, 
  TrendingUp, 
  Activity, 
  Clock, 
  CheckCircle, 
  XCircle, 
  AlertTriangle,
  Settings,
  BarChart3,
  Zap,
  Users,
  DollarSign
} from 'lucide-react';
import { AOFunction } from '../../types';
import { mockAOFunctions } from '../../data/mockData';

interface AOFunctionDashboardProps {}

interface RuntimeMetrics {
  cpuUsage: number;
  memoryUsage: number;
  activeInstances: number;
  requestsPerMinute: number;
  errorRate: number;
  avgResponseTime: number;
}

interface FunctionWithMetrics extends AOFunction {
  runtimeMetrics: RuntimeMetrics;
}

const mockMetrics: Record<string, RuntimeMetrics> = {
  'smart-order-optimizer': {
    cpuUsage: 78,
    memoryUsage: 65,
    activeInstances: 12,
    requestsPerMinute: 450,
    errorRate: 0.2,
    avgResponseTime: 89
  },
  'dynamic-pricing-ai': {
    cpuUsage: 45,
    memoryUsage: 52,
    activeInstances: 8,
    requestsPerMinute: 320,
    errorRate: 0.1,
    avgResponseTime: 156
  },
  'network-auto-heal': {
    cpuUsage: 92,
    memoryUsage: 78,
    activeInstances: 6,
    requestsPerMinute: 180,
    errorRate: 1.2,
    avgResponseTime: 234
  }
};

export const AOFunctionDashboard: React.FC<AOFunctionDashboardProps> = () => {
  const [selectedFunction, setSelectedFunction] = useState<FunctionWithMetrics | null>(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState<'all' | 'active' | 'inactive'>('all');

  const functionsWithMetrics: FunctionWithMetrics[] = mockAOFunctions.map((func: AOFunction) => ({
    ...func,
    runtimeMetrics: mockMetrics[func.id] || {
      cpuUsage: Math.floor(Math.random() * 100),
      memoryUsage: Math.floor(Math.random() * 100),
      activeInstances: Math.floor(Math.random() * 20) + 1,
      requestsPerMinute: Math.floor(Math.random() * 500) + 50,
      errorRate: Math.random() * 2,
      avgResponseTime: Math.floor(Math.random() * 300) + 50
    }
  }));

  const filteredFunctions = functionsWithMetrics.filter(func => {
    const matchesSearch = func.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         func.domain.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = statusFilter === 'all' || 
                         (statusFilter === 'active' && func.status === 'Active') ||
                         (statusFilter === 'inactive' && func.status !== 'Active');
    return matchesSearch && matchesStatus;
  });

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Active': return 'text-green-600 bg-green-50 border-green-200';
      case 'Deployed': return 'text-blue-600 bg-blue-50 border-blue-200';
      case 'Draft': return 'text-gray-600 bg-gray-50 border-gray-200';
      case 'Retired': return 'text-red-600 bg-red-50 border-red-200';
      default: return 'text-gray-600 bg-gray-50 border-gray-200';
    }
  };

  const getHealthStatus = (errorRate: number) => {
    if (errorRate < 1) return { status: 'healthy', color: 'text-green-600', icon: CheckCircle };
    if (errorRate < 3) return { status: 'warning', color: 'text-yellow-600', icon: AlertTriangle };
    return { status: 'critical', color: 'text-red-600', icon: XCircle };
  };

  const MetricCard: React.FC<{ title: string; value: string | number; icon: React.ElementType; color: string; suffix?: string }> = ({ title, value, icon: Icon, color, suffix = '' }) => (
    <div className="bg-white p-4 rounded-xl shadow-sm border border-gray-200">
      <div className="flex items-center justify-between">
        <div>
          <p className="text-sm font-medium text-gray-500">{title}</p>
          <p className={`text-2xl font-bold ${color}`}>{value}{suffix}</p>
        </div>
        <Icon className={`h-8 w-8 ${color}`} />
      </div>
    </div>
  );

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold text-gray-900">AO Function Dashboard</h2>
          <p className="text-gray-600">Monitor and manage your autonomous operations functions</p>
        </div>
        <div className="flex items-center space-x-3">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
            <input
              type="text"
              placeholder="Search functions..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary/20 focus:border-primary"
            />
          </div>
          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value as any)}
            className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary/20 focus:border-primary"
          >
            <option value="all">All Status</option>
            <option value="active">Active</option>
            <option value="inactive">Inactive</option>
          </select>
        </div>
      </div>

      <div className="grid grid-cols-12 gap-6">
        {/* Function List */}
        <div className="col-span-4">
          <div className="bg-white rounded-xl shadow-sm border border-gray-200">
            <div className="p-4 border-b border-gray-200">
              <h3 className="font-semibold text-gray-900">AO Functions ({filteredFunctions.length})</h3>
            </div>
            <div className="max-h-[600px] overflow-y-auto">
              {filteredFunctions.map((func) => {
                const health = getHealthStatus(func.runtimeMetrics.errorRate);
                const HealthIcon = health.icon;
                
                return (
                  <div
                    key={func.id}
                    onClick={() => setSelectedFunction(func)}
                    className={`p-4 border-b border-gray-100 cursor-pointer transition-colors hover:bg-gray-50 ${
                      selectedFunction?.id === func.id ? 'bg-primary/5 border-primary/20' : ''
                    }`}
                  >
                    <div className="flex items-start justify-between mb-2">
                      <div>
                        <h4 className="font-medium text-gray-900">{func.name}</h4>
                        <p className="text-xs text-gray-500">{func.domain}</p>
                      </div>
                      <div className="flex items-center space-x-2">
                        <HealthIcon className={`h-4 w-4 ${health.color}`} />
                        <span className={`px-2 py-1 rounded-full text-xs font-medium border ${getStatusColor(func.status)}`}>
                          {func.status}
                        </span>
                      </div>
                    </div>
                    <div className="grid grid-cols-2 gap-2 text-xs text-gray-600">
                      <div>CPU: {func.runtimeMetrics.cpuUsage}%</div>
                      <div>Memory: {func.runtimeMetrics.memoryUsage}%</div>
                      <div>Instances: {func.runtimeMetrics.activeInstances}</div>
                      <div>Req/min: {func.runtimeMetrics.requestsPerMinute}</div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>

        {/* Function Details */}
        <div className="col-span-8">
          {selectedFunction ? (
            <div className="space-y-6">
              {/* Function Header */}
              <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
                <div className="flex items-start justify-between mb-4">
                  <div>
                    <h3 className="text-xl font-bold text-gray-900">{selectedFunction.name}</h3>
                    <p className="text-gray-600 mt-1">{selectedFunction.description}</p>
                    <div className="flex items-center space-x-4 mt-2 text-sm text-gray-500">
                      <span>Version: {selectedFunction.version}</span>
                      <span>Provider: {selectedFunction.provider}</span>
                      <span>Mode: {selectedFunction.currentMode}</span>
                    </div>
                  </div>
                  <div className="flex items-center space-x-2">
                    <button className="p-2 text-gray-400 hover:text-gray-600 rounded-lg hover:bg-gray-100">
                      <Settings className="h-5 w-5" />
                    </button>
                    <button className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 flex items-center space-x-2">
                      <Play className="h-4 w-4" />
                      <span>Execute</span>
                    </button>
                  </div>
                </div>

                {/* Runtime Status */}
                <div className="grid grid-cols-6 gap-4">
                  <MetricCard
                    title="CPU Usage"
                    value={selectedFunction.runtimeMetrics.cpuUsage}
                    suffix="%"
                    icon={Activity}
                    color="text-blue-600"
                  />
                  <MetricCard
                    title="Memory"
                    value={selectedFunction.runtimeMetrics.memoryUsage}
                    suffix="%"
                    icon={BarChart3}
                    color="text-green-600"
                  />
                  <MetricCard
                    title="Instances"
                    value={selectedFunction.runtimeMetrics.activeInstances}
                    icon={Users}
                    color="text-purple-600"
                  />
                  <MetricCard
                    title="Requests/min"
                    value={selectedFunction.runtimeMetrics.requestsPerMinute}
                    icon={Zap}
                    color="text-orange-600"
                  />
                  <MetricCard
                    title="Error Rate"
                    value={selectedFunction.runtimeMetrics.errorRate.toFixed(1)}
                    suffix="%"
                    icon={AlertTriangle}
                    color="text-red-600"
                  />
                  <MetricCard
                    title="Avg Response"
                    value={selectedFunction.runtimeMetrics.avgResponseTime}
                    suffix="ms"
                    icon={Clock}
                    color="text-indigo-600"
                  />
                </div>
              </div>

              {/* Performance Metrics */}
              <div className="grid grid-cols-3 gap-6">
                <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
                  <h4 className="font-semibold text-gray-900 mb-4">Key Effectiveness Indicators (KEI)</h4>
                  <div className="space-y-3">
                    {selectedFunction.performance.kei.map((kei, index) => (
                      <div key={index} className="flex items-center justify-between">
                        <span className="text-sm text-gray-600">{kei}</span>
                        <div className="flex items-center space-x-2">
                          <TrendingUp className="h-4 w-4 text-green-500" />
                          <span className="text-sm font-medium text-green-600">+2.3%</span>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
                  <h4 className="font-semibold text-gray-900 mb-4">Key Capability Indicators (KCI)</h4>
                  <div className="space-y-3">
                    {selectedFunction.performance.kci.map((kci, index) => (
                      <div key={index} className="flex items-center justify-between">
                        <span className="text-sm text-gray-600">{kci}</span>
                        <div className="flex items-center space-x-2">
                          <TrendingUp className="h-4 w-4 text-blue-500" />
                          <span className="text-sm font-medium text-blue-600">+1.8%</span>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
                  <h4 className="font-semibold text-gray-900 mb-4">Key Business Indicators (KBI)</h4>
                  <div className="space-y-3">
                    {selectedFunction.performance.kbi.map((kbi, index) => (
                      <div key={index} className="flex items-center justify-between">
                        <span className="text-sm text-gray-600">{kbi}</span>
                        <div className="flex items-center space-x-2">
                          <DollarSign className="h-4 w-4 text-emerald-500" />
                          <span className="text-sm font-medium text-emerald-600">$1.2K</span>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* Dependencies and Use Cases */}
              <div className="grid grid-cols-2 gap-6">
                <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
                  <h4 className="font-semibold text-gray-900 mb-4">Dependencies</h4>
                  <div className="space-y-4">
                    <div>
                      <h5 className="text-sm font-medium text-gray-700 mb-2">Digital Twins</h5>
                      <div className="flex flex-wrap gap-2">
                        {selectedFunction.dependencies.digitalTwins.map((twin, index) => (
                          <span key={index} className="px-2 py-1 bg-blue-50 text-blue-700 rounded text-xs">
                            {twin}
                          </span>
                        ))}
                      </div>
                    </div>
                    <div>
                      <h5 className="text-sm font-medium text-gray-700 mb-2">AI Models</h5>
                      <div className="flex flex-wrap gap-2">
                        {selectedFunction.dependencies.aiModels.map((model, index) => (
                          <span key={index} className="px-2 py-1 bg-purple-50 text-purple-700 rounded text-xs">
                            {model}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>

                <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
                  <h4 className="font-semibold text-gray-900 mb-4">Use Cases</h4>
                  <div className="space-y-2">
                    {selectedFunction.useCases.map((useCase, index) => (
                      <div key={index} className="flex items-start space-x-2">
                        <CheckCircle className="h-4 w-4 text-green-500 mt-0.5 flex-shrink-0" />
                        <span className="text-sm text-gray-600">{useCase}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          ) : (
            <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-12 text-center">
              <Activity className="h-12 w-12 text-gray-300 mx-auto mb-4" />
              <h3 className="text-lg font-medium text-gray-900 mb-2">Select an AO Function</h3>
              <p className="text-gray-500">Choose a function from the list to view its runtime metrics and details</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
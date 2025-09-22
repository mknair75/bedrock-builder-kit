import { useState } from 'react';
import { Search, Filter, Grid, List, Star, Download, Play, Eye } from 'lucide-react';
import { AOFunction } from '../../types';
import { mockAOFunctions } from '../../data/mockData';
import { statusColors, runtimeModeColors } from '../../styles/theme';

interface ModernCatalogViewProps {
  onFunctionSelect: (func: AOFunction) => void;
}

export function ModernCatalogView({ onFunctionSelect }: ModernCatalogViewProps) {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedDomain, setSelectedDomain] = useState('All');
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const [functions] = useState(mockAOFunctions);

  const domains = ['All', ...Array.from(new Set(functions.map(f => f.domain)))];

  const filteredFunctions = functions.filter(func => {
    const matchesSearch = func.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         func.description.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesDomain = selectedDomain === 'All' || func.domain === selectedDomain;
    return matchesSearch && matchesDomain;
  });

  const FunctionCard = ({ func }: { func: AOFunction }) => (
    <div className="modern-card p-6 group">
      <div className="flex items-start justify-between mb-4">
        <div className="flex items-center space-x-3">
          <div className="w-12 h-12 bg-gradient-primary rounded-xl flex items-center justify-center">
            <span className="text-white font-bold text-lg">
              {func.name.charAt(0)}
            </span>
          </div>
          <div>
            <h3 className="text-lg font-semibold text-gray-900 mb-1">
              {func.name}
            </h3>
            <p className="text-sm text-gray-500">{func.domain}</p>
          </div>
        </div>
        
        <div className={`px-3 py-1 rounded-full text-xs font-medium border ${statusColors[func.status.toLowerCase() as keyof typeof statusColors] || statusColors.draft}`}>
          {func.status}
        </div>
      </div>

      <p className="text-gray-600 text-sm mb-4 line-clamp-2">
        {func.description}
      </p>

      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center space-x-4 text-sm text-gray-500">
          <span>v{func.version}</span>
          <span>•</span>
          <span>{func.provider}</span>
        </div>
        
        <div className={`px-2 py-1 rounded-md text-xs font-medium border ${runtimeModeColors[func.currentMode] || runtimeModeColors.Autonomous}`}>
          {func.currentMode}
        </div>
      </div>

      <div className="grid grid-cols-3 gap-4 mb-4 p-3 bg-gray-50 rounded-lg">
        <div className="text-center">
          <div className="text-lg font-semibold text-gray-900">
            {func.executionMetrics.frequency}
          </div>
          <div className="text-xs text-gray-500">Executions</div>
        </div>
        <div className="text-center">
          <div className="text-lg font-semibold text-green-600">
            {func.executionMetrics.successRate}%
          </div>
          <div className="text-xs text-gray-500">Success Rate</div>
        </div>
        <div className="text-center">
          <div className="text-lg font-semibold text-blue-600">
            {func.executionMetrics.avgExecutionTime}ms
          </div>
          <div className="text-xs text-gray-500">Avg Time</div>
        </div>
      </div>

      <div className="flex items-center justify-between">
        <div className="text-lg font-bold text-primary">
          {func.price}
        </div>
        
        <div className="flex items-center space-x-2">
          <button className="p-2 rounded-lg hover:bg-gray-100 transition-colors" title="View Details">
            <Eye className="w-4 h-4 text-gray-600" />
          </button>
          <button className="p-2 rounded-lg hover:bg-gray-100 transition-colors" title="Try Function">
            <Play className="w-4 h-4 text-gray-600" />
          </button>
          <button 
            onClick={() => onFunctionSelect(func)}
            className="px-4 py-2 bg-primary text-white rounded-lg hover:bg-primary/90 transition-colors text-sm font-medium"
          >
            Configure
          </button>
        </div>
      </div>
    </div>
  );

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Function Catalog</h1>
          <p className="text-gray-600">
            Discover and deploy AO functions for your autonomous operations
          </p>
        </div>
        
        <div className="flex items-center space-x-3">
          <div className="flex bg-gray-100 rounded-lg p-1">
            <button
              onClick={() => setViewMode('grid')}
              className={`p-2 rounded-md transition-colors ${
                viewMode === 'grid' ? 'bg-white shadow-sm' : 'hover:bg-gray-200'
              }`}
            >
              <Grid className="w-4 h-4" />
            </button>
            <button
              onClick={() => setViewMode('list')}
              className={`p-2 rounded-md transition-colors ${
                viewMode === 'list' ? 'bg-white shadow-sm' : 'hover:bg-gray-200'
              }`}
            >
              <List className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>

      {/* Filters */}
      <div className="flex flex-col lg:flex-row gap-4">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
          <input
            type="text"
            placeholder="Search functions..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-10 pr-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-primary focus:border-transparent"
          />
        </div>
        
        <select
          value={selectedDomain}
          onChange={(e) => setSelectedDomain(e.target.value)}
          className="px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-primary focus:border-transparent bg-white min-w-[200px]"
        >
          {domains.map(domain => (
            <option key={domain} value={domain}>{domain}</option>
          ))}
        </select>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <div className="bg-white rounded-xl p-6 border border-gray-200">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600">Total Functions</p>
              <p className="text-2xl font-bold text-gray-900">{functions.length}</p>
            </div>
            <div className="w-12 h-12 bg-blue-100 rounded-xl flex items-center justify-center">
              <Grid className="w-6 h-6 text-blue-600" />
            </div>
          </div>
        </div>
        
        <div className="bg-white rounded-xl p-6 border border-gray-200">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600">Active Functions</p>
              <p className="text-2xl font-bold text-gray-900">
                {functions.filter(f => f.status === 'Active').length}
              </p>
            </div>
            <div className="w-12 h-12 bg-green-100 rounded-xl flex items-center justify-center">
              <Play className="w-6 h-6 text-green-600" />
            </div>
          </div>
        </div>
        
        <div className="bg-white rounded-xl p-6 border border-gray-200">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600">Avg Success Rate</p>
              <p className="text-2xl font-bold text-gray-900">
                {Math.round(functions.reduce((acc, f) => acc + f.executionMetrics.successRate, 0) / functions.length)}%
              </p>
            </div>
            <div className="w-12 h-12 bg-purple-100 rounded-xl flex items-center justify-center">
              <Star className="w-6 h-6 text-purple-600" />
            </div>
          </div>
        </div>
        
        <div className="bg-white rounded-xl p-6 border border-gray-200">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600">Total Executions</p>
              <p className="text-2xl font-bold text-gray-900">
                {functions.reduce((acc, f) => acc + f.executionMetrics.frequency, 0).toLocaleString()}
              </p>
            </div>
            <div className="w-12 h-12 bg-orange-100 rounded-xl flex items-center justify-center">
              <Download className="w-6 h-6 text-orange-600" />
            </div>
          </div>
        </div>
      </div>

      {/* Functions Grid */}
      <div className={`
        ${viewMode === 'grid' 
          ? 'grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6' 
          : 'space-y-4'
        }
      `}>
        {filteredFunctions.map((func) => (
          <FunctionCard key={func.id} func={func} />
        ))}
      </div>

      {filteredFunctions.length === 0 && (
        <div className="text-center py-12">
          <div className="w-24 h-24 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <Search className="w-8 h-8 text-gray-400" />
          </div>
          <h3 className="text-lg font-semibold text-gray-900 mb-2">No functions found</h3>
          <p className="text-gray-600">Try adjusting your search criteria</p>
        </div>
      )}
    </div>
  );
}
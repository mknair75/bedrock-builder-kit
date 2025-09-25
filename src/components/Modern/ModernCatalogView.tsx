import { useState } from 'react';
import { Search, Grid, List, Star, Download, Play, Eye, Award, TrendingUp } from 'lucide-react';
import { AOFunction } from '../../types';
import { mockAOFunctions } from '../../data/mockData';

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

  const getStatusBadge = (status: string) => {
    const statusMap = {
      active: 'bg-green-50 text-green-700 border-green-200',
      draft: 'bg-yellow-50 text-yellow-700 border-yellow-200',
      deployed: 'bg-blue-50 text-blue-700 border-blue-200',
      retired: 'bg-gray-50 text-gray-700 border-gray-200'
    };
    return statusMap[status.toLowerCase() as keyof typeof statusMap] || statusMap.draft;
  };

  const getModeColor = (mode: string) => {
    const modeMap = {
      autonomous: 'bg-purple-50 text-purple-700 border-purple-200',
      hybrid: 'bg-blue-50 text-blue-700 border-blue-200',
      manual: 'bg-orange-50 text-orange-700 border-orange-200'
    };
    return modeMap[mode.toLowerCase() as keyof typeof modeMap] || modeMap.autonomous;
  };

  const FunctionCard = ({ func }: { func: AOFunction }) => (
    <div className="modern-card p-6 group hover:shadow-xl transition-all duration-300">
      <div className="flex items-start justify-between mb-6">
        <div className="flex items-center space-x-4">
          <div className="w-14 h-14 bg-gradient-primary rounded-2xl flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform duration-300">
            <span className="text-white font-bold text-xl">
              {func.name.charAt(0)}
            </span>
          </div>
          <div>
            <h3 className="text-xl font-semibold text-foreground mb-1 group-hover:text-primary transition-colors">
              {func.name}
            </h3>
            <p className="text-sm text-muted-foreground font-medium">{func.domain}</p>
          </div>
        </div>
        
        <div className={`px-3 py-1.5 rounded-full text-xs font-semibold border ${getStatusBadge(func.status)}`}>
          {func.status}
        </div>
      </div>

      <p className="text-muted-foreground text-sm mb-6 line-clamp-2 leading-relaxed">
        {func.description}
      </p>

      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center space-x-4 text-sm text-muted-foreground">
          <span className="font-medium">v{func.version}</span>
          <span>•</span>
          <span className="font-medium">{func.provider}</span>
        </div>
        
        <div className={`px-3 py-1.5 rounded-lg text-xs font-semibold border ${getModeColor(func.currentMode)}`}>
          {func.currentMode}
        </div>
      </div>

      <div className="grid grid-cols-3 gap-4 mb-6 p-4 bg-muted/50 rounded-xl border border-border/50">
        <div className="text-center">
          <div className="text-xl font-bold text-foreground mb-1">
            {func.executionMetrics.frequency.toLocaleString()}
          </div>
          <div className="text-xs text-muted-foreground font-medium">Executions</div>
        </div>
        <div className="text-center">
          <div className="text-xl font-bold text-green-600 mb-1">
            {func.executionMetrics.successRate}%
          </div>
          <div className="text-xs text-muted-foreground font-medium">Success Rate</div>
        </div>
        <div className="text-center">
          <div className="text-xl font-bold text-primary mb-1">
            {func.executionMetrics.avgExecutionTime}ms
          </div>
          <div className="text-xs text-muted-foreground font-medium">Avg Time</div>
        </div>
      </div>

      <div className="flex items-center justify-between">
        <div className="text-2xl font-bold bg-gradient-primary bg-clip-text text-transparent">
          {func.price}
        </div>
        
        <div className="flex items-center space-x-2">
          <button className="p-2.5 rounded-xl hover:bg-muted transition-all duration-200 hover:scale-110" title="View Details">
            <Eye className="w-4 h-4 text-muted-foreground" />
          </button>
          <button className="p-2.5 rounded-xl hover:bg-muted transition-all duration-200 hover:scale-110" title="Try Function">
            <Play className="w-4 h-4 text-muted-foreground" />
          </button>
          <button 
            onClick={() => onFunctionSelect(func)}
            className="modern-button-primary px-5 py-2.5 text-sm font-semibold"
          >
            Configure
          </button>
        </div>
      </div>
    </div>
  );

  return (
    <div className="space-y-8">
      {/* Enterprise Hero Section */}
      <div className="relative hero-background rounded-3xl p-8 mb-8 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-enterprise rounded-3xl opacity-50"></div>
        <div className="relative z-10 flex flex-col lg:flex-row lg:items-center lg:justify-between gap-6">
          <div className="space-y-4">
            <div className="flex items-center space-x-3">
              <div className="w-12 h-12 bg-primary/20 rounded-2xl flex items-center justify-center backdrop-blur-sm">
                <Award className="w-6 h-6 text-primary" />
              </div>
              <div>
                <h1 className="text-4xl font-bold bg-gradient-to-r from-primary to-primary-glow bg-clip-text text-transparent">
                  Enterprise Function Catalog
                </h1>
                <p className="text-lg text-muted-foreground mt-1">
                  Mission-critical autonomous operations at enterprise scale
                </p>
              </div>
            </div>
            <div className="flex items-center space-x-6 text-sm">
              <div className="flex items-center space-x-2">
                <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
                <span className="text-muted-foreground font-medium">99.9% Uptime SLA</span>
              </div>
              <div className="flex items-center space-x-2">
                <TrendingUp className="w-4 h-4 text-primary" />
                <span className="text-muted-foreground font-medium">Enterprise Grade Security</span>
              </div>
            </div>
          </div>
          
          <div className="flex items-center space-x-3">
            <div className="flex bg-muted/50 rounded-xl p-1 border border-border/50 backdrop-blur-sm">
            <button
              onClick={() => setViewMode('grid')}
              className={`p-3 rounded-lg transition-all duration-200 ${
                viewMode === 'grid' 
                  ? 'bg-white shadow-md scale-105 text-primary' 
                  : 'hover:bg-white/50 hover:scale-105'
              }`}
            >
              <Grid className="w-5 h-5" />
            </button>
            <button
              onClick={() => setViewMode('list')}
              className={`p-3 rounded-lg transition-all duration-200 ${
                viewMode === 'list' 
                  ? 'bg-white shadow-md scale-105 text-primary' 
                  : 'hover:bg-white/50 hover:scale-105'
              }`}
            >
              <List className="w-5 h-5" />
            </button>
            </div>
          </div>
        </div>
      </div>

      {/* Search and Filters */}
      <div className="flex flex-col lg:flex-row gap-6">
        <div className="relative flex-1 group">
          <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-muted-foreground w-5 h-5 group-focus-within:text-primary transition-colors" />
          <input
            type="text"
            placeholder="Search enterprise functions..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="modern-input pl-12 pr-4 py-4 text-base"
          />
        </div>
        
        <select
          value={selectedDomain}
          onChange={(e) => setSelectedDomain(e.target.value)}
          className="modern-input min-w-[200px] px-4 py-4 text-base font-medium"
        >
          {domains.map(domain => (
            <option key={domain} value={domain}>{domain}</option>
          ))}
        </select>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <div className="modern-stat-card group">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-muted-foreground font-medium mb-2">Total Functions</p>
              <p className="text-3xl font-bold text-foreground">{functions.length}</p>
            </div>
            <div className="w-14 h-14 bg-gradient-to-br from-blue-400 to-blue-600 rounded-2xl flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform duration-300">
              <Grid className="w-7 h-7 text-white" />
            </div>
          </div>
        </div>
        
        <div className="modern-stat-card group">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-muted-foreground font-medium mb-2">Active Functions</p>
              <p className="text-3xl font-bold text-foreground">
                {functions.filter(f => f.status === 'Active').length}
              </p>
            </div>
            <div className="w-14 h-14 bg-gradient-to-br from-green-400 to-green-600 rounded-2xl flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform duration-300">
              <Play className="w-7 h-7 text-white" />
            </div>
          </div>
        </div>
        
        <div className="modern-stat-card group">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-muted-foreground font-medium mb-2">Avg Success Rate</p>
              <p className="text-3xl font-bold text-foreground">
                {Math.round(functions.reduce((acc, f) => acc + f.executionMetrics.successRate, 0) / functions.length)}%
              </p>
            </div>
            <div className="w-14 h-14 bg-gradient-to-br from-purple-400 to-purple-600 rounded-2xl flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform duration-300">
              <Star className="w-7 h-7 text-white" />
            </div>
          </div>
        </div>
        
        <div className="modern-stat-card group">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-muted-foreground font-medium mb-2">Total Executions</p>
              <p className="text-3xl font-bold text-foreground">
                {functions.reduce((acc, f) => acc + f.executionMetrics.frequency, 0).toLocaleString()}
              </p>
            </div>
            <div className="w-14 h-14 bg-gradient-to-br from-orange-400 to-orange-600 rounded-2xl flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform duration-300">
              <Download className="w-7 h-7 text-white" />
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
        <div className="text-center py-16 animate-fade-in">
          <div className="w-32 h-32 bg-gradient-hero rounded-full flex items-center justify-center mx-auto mb-6 shadow-xl">
            <Search className="w-12 h-12 text-primary" />
          </div>
          <h3 className="text-2xl font-semibold text-foreground mb-3">No functions found</h3>
          <p className="text-muted-foreground text-lg">Try adjusting your search criteria</p>
        </div>
      )}
    </div>
  );
}
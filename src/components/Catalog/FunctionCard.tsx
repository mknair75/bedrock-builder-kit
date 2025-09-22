import React from 'react';
import { Download, Info, Play, CreditCard } from 'lucide-react';
import { AOFunction } from '../../types';

interface FunctionCardProps {
  func: AOFunction;
  onViewDetails: (func: AOFunction) => void;
  onDeploy: (func: AOFunction) => void;
  onSubscribe: (func: AOFunction) => void;
  onTry: (func: AOFunction) => void;
}

export const FunctionCard: React.FC<FunctionCardProps> = ({ func, onViewDetails, onDeploy, onSubscribe, onTry }) => {
  const handleDownload = () => {
    // Mock GitHub redirect
    window.open('https://github.com/ao-functions/' + func.name.toLowerCase().replace(/\s+/g, '-'), '_blank');
  };

  const handleDeploy = () => {
    onDeploy(func);
  };

  const handleSubscribe = () => {
    onSubscribe(func);
  };

  const handleTry = () => {
    onTry(func);
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

  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 hover:shadow-lg transition-all duration-300 group">
      <div className="flex items-start justify-between mb-4">
        <div>
          <h3 className="text-lg font-semibold text-gray-900 group-hover:text-blue-600 transition-colors">
            {func.name}
          </h3>
          <p className="text-sm text-gray-600 mt-1">{func.domain}</p>
        </div>
        <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(func.status)}`}>
          {func.status}
        </span>
      </div>

      <p className="text-gray-700 text-sm mb-4 line-clamp-2">{func.description}</p>
      
      <div className="space-y-2 mb-4">
        <div className="flex justify-between text-sm">
          <span className="text-gray-600">Capability:</span>
          <span className="text-gray-900 font-medium">{func.capability}</span>
        </div>
        <div className="flex justify-between text-sm">
          <span className="text-gray-600">Version:</span>
          <span className="text-gray-900 font-medium">{func.version}</span>
        </div>
        <div className="flex justify-between text-sm">
          <span className="text-gray-600">Provider:</span>
          <span className="text-gray-900 font-medium">{func.provider}</span>
        </div>
        <div className="flex justify-between text-sm">
          <span className="text-gray-600">Price:</span>
          <span className="text-emerald-600 font-semibold">{func.price}</span>
        </div>
      </div>

      <div className="grid grid-cols-3 gap-2 mt-4">
        <button
          onClick={() => onViewDetails(func)}
          className="flex items-center justify-center space-x-1 bg-gray-100 text-gray-700 px-2 py-2 rounded-lg hover:bg-gray-200 transition-colors text-xs"
        >
          <Info className="h-4 w-4" />
          <span>Details</span>
        </button>
        <button
          onClick={handleDownload}
          className="flex items-center justify-center bg-gray-100 text-gray-700 px-2 py-2 rounded-lg hover:bg-gray-200 transition-colors text-xs"
        >
          <Download className="h-4 w-4" />
        </button>
        <button
          onClick={handleTry}
          className="flex items-center justify-center space-x-1 bg-purple-600 text-white px-2 py-2 rounded-lg hover:bg-purple-700 transition-colors text-xs"
        >
          <Play className="h-3 w-3" />
          <span>Try</span>
        </button>
      </div>
      <div className="grid grid-cols-2 gap-2 mt-2">
        <button
          onClick={handleSubscribe}
          className="flex items-center justify-center space-x-1 bg-emerald-600 text-white px-2 py-2 rounded-lg hover:bg-emerald-700 transition-colors text-xs"
        >
          <CreditCard className="h-4 w-4" />
          <span>Subscribe</span>
        </button>
        <button
          onClick={handleDeploy}
          className="flex items-center justify-center space-x-1 bg-blue-600 text-white px-2 py-2 rounded-lg hover:bg-blue-700 transition-colors text-xs"
        >
          <Play className="h-4 w-4" />
          <span>Deploy</span>
        </button>
      </div>
    </div>
  );
};
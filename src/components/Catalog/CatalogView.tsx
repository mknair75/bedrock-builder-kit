import React, { useState } from 'react';
import { Search, Filter } from 'lucide-react';
import { AOFunction } from '../../types';
import { mockAOFunctions, domains } from '../../data/mockData';
import { FunctionCard } from './FunctionCard';
import { SubscriptionModal } from './SubscriptionModal';

interface CatalogViewProps {
  onViewDetails: (func: AOFunction) => void;
  onDeploy: (func: AOFunction) => void;
  onTry: (func: AOFunction) => void;
}

export const CatalogView: React.FC<CatalogViewProps> = ({ onViewDetails, onDeploy, onTry }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedDomain, setSelectedDomain] = useState('All Domains');
  const [subscriptionModal, setSubscriptionModal] = useState<{ isOpen: boolean; func: AOFunction | null }>({
    isOpen: false,
    func: null
  });

  const handleSubscribe = (func: AOFunction) => {
    setSubscriptionModal({ isOpen: true, func });
  };

  const handleSubscriptionComplete = () => {
    alert(`Successfully subscribed to ${subscriptionModal.func?.name}!`);
    setSubscriptionModal({ isOpen: false, func: null });
  };

  const handleTry = (func: AOFunction) => {
    onTry(func);
  };

  const filteredFunctions = mockAOFunctions.filter(func => {
    const matchesSearch = func.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         func.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesDomain = selectedDomain === 'All Domains' || func.domain === selectedDomain;
    return matchesSearch && matchesDomain;
  });

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold text-gray-900">AO Function Catalog</h2>
          <p className="text-gray-600 mt-1">Discover and deploy autonomous operations functions</p>
        </div>
        <div className="text-sm text-gray-500">
          {filteredFunctions.length} of {mockAOFunctions.length} functions
        </div>
      </div>

      <div className="flex flex-col md:flex-row space-y-4 md:space-y-0 md:space-x-4">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
          <input
            type="text"
            placeholder="Search functions by name or description..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          />
        </div>
        
        <div className="relative">
          <Filter className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
          <select
            value={selectedDomain}
            onChange={(e) => setSelectedDomain(e.target.value)}
            className="pl-10 pr-8 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent appearance-none bg-white"
          >
            {domains.map(domain => (
              <option key={domain} value={domain}>{domain}</option>
            ))}
          </select>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredFunctions.map(func => (
          <FunctionCard
            key={func.id}
            func={func}
            onViewDetails={onViewDetails}
            onDeploy={onDeploy}
            onSubscribe={handleSubscribe}
            onTry={handleTry}
          />
        ))}
      </div>

      {filteredFunctions.length === 0 && (
        <div className="text-center py-12">
          <div className="text-gray-400 mb-4">
            <Search className="h-12 w-12 mx-auto" />
          </div>
          <h3 className="text-lg font-medium text-gray-900 mb-2">No functions found</h3>
          <p className="text-gray-600">Try adjusting your search terms or filters</p>
        </div>
      )}

      {subscriptionModal.func && (
        <SubscriptionModal
          func={subscriptionModal.func}
          isOpen={subscriptionModal.isOpen}
          onClose={() => setSubscriptionModal({ isOpen: false, func: null })}
          onSubscribe={handleSubscriptionComplete}
        />
      )}
    </div>
  );
};
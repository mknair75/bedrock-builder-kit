import React from 'react';
import { 
  Store, 
  FileText, 
  Settings, 
  Sliders, 
  Globe, 
  Network, 
  Play, 
  BarChart3, 
  GitBranch,
  Target,
  Workflow
} from 'lucide-react';

interface SidebarProps {
  currentView: string;
  onViewChange: (view: string) => void;
}

const navigationItems = [
  { id: 'catalog', label: 'Function Catalog', icon: Store },
  { id: 'onboarding', label: 'Onboard New Function', icon: FileText },
  { id: 'lifecycle', label: 'Lifecycle Management', icon: Settings },
  { id: 'configuration', label: 'Configuration Console', icon: Sliders },
  { id: 'global-config', label: 'Global Configuration', icon: Globe },
  { id: 'integration', label: 'Integration Composer', icon: Network },
  { id: 'intent', label: 'Intent Validation', icon: Target },
  { id: 'execution', label: 'Execution Dashboard', icon: Play },
  { id: 'coordination', label: 'Coordination Console', icon: GitBranch },
  { id: 'orchestration', label: 'Cross AOF Orchestration', icon: Workflow },
  { id: 'analytics', label: 'Analytics & Insights', icon: BarChart3 }
];

export const Sidebar: React.FC<SidebarProps> = ({ currentView, onViewChange }) => {
  return (
    <aside className="w-64 bg-gray-50 border-r border-gray-200 min-h-screen">
      <div className="p-6">
        <nav className="space-y-2">
          {navigationItems.map((item) => {
            const Icon = item.icon;
            const isActive = currentView === item.id;
            
            return (
              <button
                key={item.id}
                onClick={() => onViewChange(item.id)}
                className={`w-full flex items-center space-x-3 px-3 py-2 rounded-lg text-left transition-all duration-200 ${
                  isActive
                    ? 'bg-blue-600 text-white shadow-lg'
                    : 'text-gray-700 hover:bg-white hover:shadow-sm'
                }`}
              >
                <Icon className="h-5 w-5" />
                <span className="font-medium">{item.label}</span>
              </button>
            );
          })}
        </nav>
      </div>
    </aside>
  );
};
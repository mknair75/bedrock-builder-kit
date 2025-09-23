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
    <aside className="w-72 glass-effect border-r border-gray-200/50 min-h-screen">
      <div className="p-6">
        <div className="mb-8">
          <div className="flex items-center space-x-3 mb-6">
            <div className="w-8 h-8 bg-gradient-primary rounded-xl flex items-center justify-center shadow-lg">
              <span className="text-white font-bold text-sm">AO</span>
            </div>
            <div>
              <h2 className="font-bold text-gray-900">Navigation</h2>
              <p className="text-xs text-gray-500">Function Management</p>
            </div>
          </div>
        </div>

        <nav className="space-y-2">
          {navigationItems.map((item) => {
            const Icon = item.icon;
            const isActive = currentView === item.id;
            
            return (
              <button
                key={item.id}
                onClick={() => onViewChange(item.id)}
                  className={`w-full flex items-center space-x-4 px-4 py-3.5 rounded-xl text-left transition-all duration-300 group ${
                    isActive
                      ? 'bg-gradient-primary text-white shadow-xl scale-105'
                      : 'text-gray-700 hover:bg-white/70 hover:shadow-md hover:scale-105'
                  }`}
              >
                <Icon className={`h-5 w-5 transition-transform duration-300 ${isActive ? 'scale-110' : 'group-hover:scale-110'}`} />
                <span className="font-medium text-sm">{item.label}</span>
                {isActive && (
                  <div className="ml-auto w-2 h-2 bg-white rounded-full animate-pulse"></div>
                )}
              </button>
            );
          })}
        </nav>

        <div className="mt-8 p-4 bg-white/50 rounded-2xl border border-gray-200/50">
          <div className="flex items-center space-x-3 mb-3">
            <div className="w-8 h-8 bg-gradient-to-br from-green-400 to-green-600 rounded-xl flex items-center justify-center">
              <span className="text-white text-xs font-bold">✓</span>
            </div>
            <div>
              <p className="text-sm font-semibold text-gray-900">System Status</p>
              <p className="text-xs text-green-600 font-medium">All systems operational</p>
            </div>
          </div>
          <div className="w-full bg-gray-200 rounded-full h-2">
            <div className="bg-gradient-to-r from-green-400 to-green-600 h-2 rounded-full w-full"></div>
          </div>
        </div>
      </div>
    </aside>
  );
};
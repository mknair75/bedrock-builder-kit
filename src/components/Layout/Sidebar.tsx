import React, { useState } from 'react';
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
  Workflow,
  ChevronRight,
  ChevronDown,
  Activity
} from 'lucide-react';

interface SidebarProps {
  currentView: string;
  onViewChange: (view: string) => void;
}

interface NavigationGroup {
  id: string;
  label: string;
  icon: React.ElementType;
  items: NavigationItem[];
}

interface NavigationItem {
  id: string;
  label: string;
  icon: React.ElementType;
}

const navigationGroups: NavigationGroup[] = [
  {
    id: 'functions',
    label: 'Function Management',
    icon: Store,
    items: [
      { id: 'catalog', label: 'Function Catalog', icon: Store },
      { id: 'dashboard', label: 'AO Function Dashboard', icon: Activity },
      { id: 'onboarding', label: 'Onboard New Function', icon: FileText },
      { id: 'lifecycle', label: 'Lifecycle Management', icon: Settings }
    ]
  },
  {
    id: 'operations',
    label: 'Operations & Runtime',
    icon: Play,
    items: [
      { id: 'execution', label: 'Execution Dashboard', icon: Play },
      { id: 'coordination', label: 'Coordination Console', icon: GitBranch },
      { id: 'orchestration', label: 'Cross AOF Orchestration', icon: Workflow }
    ]
  },
  {
    id: 'configuration',
    label: 'Configuration & Integration',
    icon: Settings,
    items: [
      { id: 'configuration', label: 'Configuration Console', icon: Sliders },
      { id: 'global-config', label: 'Global Configuration', icon: Globe },
      { id: 'integration', label: 'Integration Composer', icon: Network },
      { id: 'intent', label: 'Intent Validation', icon: Target }
    ]
  },
  {
    id: 'analytics',
    label: 'Analytics & Insights',
    icon: BarChart3,
    items: [
      { id: 'analytics', label: 'Analytics & Insights', icon: BarChart3 }
    ]
  }
];

export const Sidebar: React.FC<SidebarProps> = ({ currentView, onViewChange }) => {
  const [expandedGroups, setExpandedGroups] = useState<string[]>(['functions', 'operations']);

  const toggleGroup = (groupId: string) => {
    setExpandedGroups(prev => 
      prev.includes(groupId) 
        ? prev.filter(id => id !== groupId)
        : [...prev, groupId]
    );
  };

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

        <nav className="space-y-1">
          {navigationGroups.map((group) => {
            const GroupIcon = group.icon;
            const isExpanded = expandedGroups.includes(group.id);
            
            return (
              <div key={group.id} className="space-y-1">
                {/* Group Header */}
                <button
                  onClick={() => toggleGroup(group.id)}
                  className="w-full flex items-center space-x-3 px-3 py-2 text-left text-gray-600 hover:bg-white/40 rounded-lg transition-all duration-200 group"
                >
                  <GroupIcon className="h-4 w-4" />
                  <span className="font-medium text-sm flex-1">{group.label}</span>
                  {isExpanded ? (
                    <ChevronDown className="h-4 w-4 transition-transform duration-200" />
                  ) : (
                    <ChevronRight className="h-4 w-4 transition-transform duration-200" />
                  )}
                </button>

                {/* Group Items */}
                {isExpanded && (
                  <div className="space-y-1 ml-4 pl-3 border-l border-gray-200/50">
                    {group.items.map((item) => {
                      const Icon = item.icon;
                      const isActive = currentView === item.id;
                      
                      return (
                        <button
                          key={item.id}
                          onClick={() => onViewChange(item.id)}
                          className={`w-full flex items-center space-x-3 px-3 py-2.5 rounded-lg text-left transition-all duration-300 group ${
                            isActive
                              ? 'bg-gradient-primary text-white shadow-lg scale-[1.02] border border-primary/20'
                              : 'text-gray-700 hover:bg-white/60 hover:shadow-sm hover:scale-[1.01]'
                          }`}
                        >
                          <Icon className={`h-4 w-4 transition-transform duration-300 ${isActive ? 'scale-110' : 'group-hover:scale-105'}`} />
                          <span className="font-medium text-xs flex-1">{item.label}</span>
                          {isActive && (
                            <div className="w-1.5 h-1.5 bg-white rounded-full animate-pulse"></div>
                          )}
                        </button>
                      );
                    })}
                  </div>
                )}
              </div>
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
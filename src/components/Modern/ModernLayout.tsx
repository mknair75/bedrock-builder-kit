import { ReactNode, useState } from 'react';
import { NavigationView } from '../../App';
import {
  LayoutDashboard,
  BarChart3,
  Settings,
  Play,
  GitBranch,
  UserPlus,
  RefreshCw,
  Network,
  Layers,
  Target,
  Globe,
  Menu,
  X,
  Sparkles,
} from 'lucide-react';

interface ModernLayoutProps {
  children: ReactNode;
  currentView: NavigationView;
  onViewChange: (view: NavigationView) => void;
}

interface NavItem {
  id: NavigationView;
  label: string;
  icon: React.ComponentType<{ className?: string }>;
  description: string;
}

const navigationItems: NavItem[] = [
  {
    id: 'catalog',
    label: 'Function Catalog',
    icon: LayoutDashboard,
    description: 'Browse and discover AO functions',
  },
  {
    id: 'analytics',
    label: 'Analytics',
    icon: BarChart3,
    description: 'Performance metrics and insights',
  },
  {
    id: 'configuration',
    label: 'Configuration',
    icon: Settings,
    description: 'Configure function parameters',
  },
  {
    id: 'execution',
    label: 'Execution',
    icon: Play,
    description: 'Monitor real-time execution',
  },
  {
    id: 'integration',
    label: 'Integration',
    icon: GitBranch,
    description: 'API and system integrations',
  },
  {
    id: 'onboarding',
    label: 'Onboarding',
    icon: UserPlus,
    description: 'Create new AO functions',
  },
  {
    id: 'lifecycle',
    label: 'Lifecycle',
    icon: RefreshCw,
    description: 'Manage function lifecycle',
  },
  {
    id: 'orchestration',
    label: 'Orchestration',
    icon: Network,
    description: 'Workflow orchestration',
  },
  {
    id: 'coordination',
    label: 'Coordination',
    icon: Layers,
    description: 'Multi-function coordination',
  },
  {
    id: 'intent',
    label: 'Intent',
    icon: Target,
    description: 'Intent-based management',
  },
  {
    id: 'global-config',
    label: 'Global Config',
    icon: Globe,
    description: 'System-wide configuration',
  },
];

export function ModernLayout({ children, currentView, onViewChange }: ModernLayoutProps) {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const currentItem = navigationItems.find(item => item.id === currentView);

  return (
    <div className="flex h-screen bg-gray-50">
      {/* Mobile menu overlay */}
      {isMobileMenuOpen && (
        <div 
          className="fixed inset-0 bg-black bg-opacity-50 z-40 lg:hidden"
          onClick={() => setIsMobileMenuOpen(false)}
        />
      )}

      {/* Sidebar */}
      <aside className={`
        fixed lg:static inset-y-0 left-0 z-50
        ${isSidebarOpen ? 'w-80' : 'w-20'}
        ${isMobileMenuOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'}
        bg-white border-r border-gray-200 transition-all duration-300 ease-in-out
      `}>
        <div className="flex flex-col h-full">
          {/* Header */}
          <div className="flex items-center justify-between p-6 border-b border-gray-200">
            {isSidebarOpen && (
              <div className="flex items-center space-x-3">
                <div className="w-10 h-10 bg-gradient-primary rounded-xl flex items-center justify-center">
                  <Sparkles className="w-6 h-6 text-white" />
                </div>
                <div>
                  <h1 className="text-xl font-bold text-gray-900">AO Functions</h1>
                  <p className="text-sm text-gray-500">Management Platform</p>
                </div>
              </div>
            )}
            <button
              onClick={() => setIsSidebarOpen(!isSidebarOpen)}
              className="p-2 rounded-lg hover:bg-gray-100 transition-colors hidden lg:flex"
            >
              <Menu className="w-5 h-5 text-gray-600" />
            </button>
          </div>

          {/* Navigation */}
          <nav className="flex-1 p-4 space-y-2 overflow-y-auto">
            {navigationItems.map((item) => {
              const Icon = item.icon;
              const isActive = currentView === item.id;
              
              return (
                <button
                  key={item.id}
                  onClick={() => {
                    onViewChange(item.id);
                    setIsMobileMenuOpen(false);
                  }}
                  className={`
                    w-full flex items-center space-x-3 px-4 py-3 rounded-xl text-left
                    transition-all duration-200 group relative
                    ${isActive 
                      ? 'bg-primary text-white shadow-lg shadow-primary/20' 
                      : 'text-gray-700 hover:bg-gray-100 hover:text-primary'
                    }
                  `}
                >
                  <Icon className={`w-5 h-5 flex-shrink-0 ${isActive ? 'text-white' : 'text-gray-400 group-hover:text-primary'}`} />
                  {isSidebarOpen && (
                    <div className="flex-1 min-w-0">
                      <p className={`font-medium truncate ${isActive ? 'text-white' : 'text-gray-900'}`}>
                        {item.label}
                      </p>
                      <p className={`text-sm truncate ${isActive ? 'text-primary-100' : 'text-gray-500'}`}>
                        {item.description}
                      </p>
                    </div>
                  )}
                  
                  {/* Active indicator */}
                  {isActive && !isSidebarOpen && (
                    <div className="absolute right-0 w-1 h-6 bg-white rounded-l-full" />
                  )}
                </button>
              );
            })}
          </nav>

          {/* Footer */}
          {isSidebarOpen && (
            <div className="p-4 border-t border-gray-200">
              <div className="bg-gradient-subtle rounded-xl p-4">
                <h3 className="font-semibold text-gray-900 mb-1">Need Help?</h3>
                <p className="text-sm text-gray-600 mb-3">
                  Check our documentation for guidance
                </p>
                <button className="text-sm font-medium text-primary hover:text-primary/80 transition-colors">
                  View Docs →
                </button>
              </div>
            </div>
          )}
        </div>
      </aside>

      {/* Main content */}
      <div className="flex-1 flex flex-col min-w-0">
        {/* Top bar */}
        <header className="bg-white border-b border-gray-200 px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <button
                onClick={() => setIsMobileMenuOpen(true)}
                className="p-2 rounded-lg hover:bg-gray-100 transition-colors lg:hidden"
              >
                <Menu className="w-5 h-5 text-gray-600" />
              </button>
              
              <div>
                <h2 className="text-2xl font-bold text-gray-900">
                  {currentItem?.label}
                </h2>
                <p className="text-gray-600">
                  {currentItem?.description}
                </p>
              </div>
            </div>

            <div className="flex items-center space-x-4">
              <div className="bg-gradient-primary text-white px-4 py-2 rounded-lg text-sm font-medium">
                Platform v2.1
              </div>
            </div>
          </div>
        </header>

        {/* Page content */}
        <main className="flex-1 overflow-auto p-6">
          {children}
        </main>
      </div>
    </div>
  );
}
import React from 'react';
import { Search, Bell, User, Settings } from 'lucide-react';
import aoPlatformLogo from '../../assets/ao-platform-logo.png';

interface HeaderProps {
  currentView: string;
}

export const Header: React.FC<HeaderProps> = ({ currentView }) => {
  return (
    <header className="glass-effect px-6 py-4 border-b border-gray-200/50 sticky top-0 z-50">
      <div className="flex items-center justify-between max-w-7xl mx-auto">
        <div className="flex items-center space-x-6">
          <div className="flex items-center space-x-3">
            <img 
              src={aoPlatformLogo} 
              alt="AO Platform Logo" 
              className="w-12 h-12 object-contain"
            />
            <div>
              <h1 className="text-xl font-bold bg-gradient-to-r from-primary to-primary-glow bg-clip-text text-transparent">
                AO Platform Enterprise
              </h1>
              <p className="text-xs text-muted-foreground font-medium">v2.1.0 - Enterprise Edition</p>
            </div>
          </div>
          <div className="hidden lg:flex items-center space-x-2 text-sm text-gray-500 bg-white/50 px-4 py-2 rounded-xl border border-gray-200/50 shadow-sm">
            <span>Enterprise Dashboard</span>
            <span>/</span>
            <span className="text-gray-900 font-semibold">{currentView}</span>
          </div>
        </div>

        <div className="flex items-center space-x-4">
          <div className="relative hidden lg:block">
            <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
            <input
              type="text"
              placeholder="Search functions..."
              className="modern-input pl-12 pr-4 py-3 w-80"
            />
          </div>
          
          <button className="relative p-3 text-muted-foreground hover:text-primary hover:bg-accent rounded-xl transition-all duration-200 hover:scale-110 shadow-sm hover:shadow-md">
            <Bell className="h-5 w-5" />
            <span className="absolute top-2 right-2 w-2.5 h-2.5 bg-destructive rounded-full ring-2 ring-background animate-pulse"></span>
          </button>
          
          <button className="p-3 text-muted-foreground hover:text-primary hover:bg-accent rounded-xl transition-all duration-200 hover:scale-110 shadow-sm hover:shadow-md">
            <Settings className="h-5 w-5" />
          </button>
          
          <div className="flex items-center space-x-3 ml-4 pl-4 border-l border-border/50">
            <div className="w-10 h-10 bg-gradient-to-br from-primary/80 to-primary rounded-xl flex items-center justify-center shadow-lg">
              <User className="h-5 w-5 text-white" />
            </div>
            <div className="hidden lg:block">
              <p className="text-sm font-semibold text-foreground">Enterprise Admin</p>
              <p className="text-xs text-muted-foreground">System Administrator</p>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};
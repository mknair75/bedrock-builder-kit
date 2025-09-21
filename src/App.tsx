import React, { useState } from 'react';
import { Header } from './components/Layout/Header';
import { Sidebar } from './components/Layout/Sidebar';
import { CatalogView } from './components/Catalog/CatalogView';
import { FunctionProfile } from './components/Profile/FunctionProfile';
import { LifecycleView } from './components/Lifecycle/LifecycleView';
import { ConfigurationView } from './components/Configuration/ConfigurationView';
import { GlobalConfigView } from './components/GlobalConfig/GlobalConfigView';
import { IntegrationView } from './components/Integration/IntegrationView';
import { IntentView } from './components/Intent/IntentView';
//import IntentView from './components/Intent/IntentView';
import { ExecutionView } from './components/Execution/ExecutionView';
import { CoordinationView } from './components/Coordination/CoordinationView';
import { OrchestrationView } from './components/Orchestration/OrchestrationView';
import { AnalyticsView } from './components/Analytics/AnalyticsView';
import { OnboardingView } from './components/Onboarding/OnboardingView';
import { AOFunction } from './types';

function App() {
  const [currentView, setCurrentView] = useState('catalog');
  const [selectedFunction, setSelectedFunction] = useState<AOFunction | null>(null);
  const [showProfile, setShowProfile] = useState(false);

  const handleViewDetails = (func: AOFunction) => {
    setSelectedFunction(func);
    setShowProfile(true);
  };

  const handleBackToCatalog = () => {
    setShowProfile(false);
    setSelectedFunction(null);
  };

  const handleDeploy = (func: AOFunction) => {
    alert(`Deploying ${func.name} to runtime environment...`);
    setShowProfile(false);
    setCurrentView('lifecycle');
  };

  const handleConfigure = (func: AOFunction) => {
    setSelectedFunction(func);
    setCurrentView('configuration');
  };

  const handleTry = (func: AOFunction) => {
    alert(`Launching trial environment for ${func.name}...`);
  };

  const getViewTitle = () => {
    if (showProfile && selectedFunction) {
      return selectedFunction.name;
    }
    
    switch (currentView) {
      case 'catalog': return 'Function Catalog';
      case 'onboarding': return 'Onboard New Function';
      case 'lifecycle': return 'Lifecycle Management';
      case 'configuration': return 'Configuration Console';
      case 'global-config': return 'Global Configuration';
      case 'integration': return 'Integration Composer';
      case 'intent': return 'Intent Validation';
      case 'execution': return 'Execution Dashboard';
      case 'coordination': return 'Coordination Console';
      case 'orchestration': return 'Cross AOF Orchestration';
      case 'analytics': return 'Analytics & Insights';
      default: return 'Function Catalog';
    }
  };

  const renderCurrentView = () => {
    if (showProfile && selectedFunction) {
      return (
        <FunctionProfile
          func={selectedFunction}
          onBack={handleBackToCatalog}
          onDeploy={handleDeploy}
        />
      );
    }

    switch (currentView) {
      case 'catalog':
        return <CatalogView onViewDetails={handleViewDetails} onDeploy={handleDeploy} onTry={handleTry} />;
      case 'onboarding':
        return <OnboardingView />;
      case 'lifecycle':
        return <LifecycleView onConfigure={handleConfigure} />;
      case 'configuration':
        return <ConfigurationView selectedFunction={selectedFunction} />;
      case 'global-config':
        return <GlobalConfigView />;
      case 'integration':
        return <IntegrationView />;
      case 'intent':
        return <IntentView />;
      case 'execution':
        return <ExecutionView />;
      case 'coordination':
        return <CoordinationView />;
      case 'orchestration':
        return <OrchestrationView />;
      case 'analytics':
        return <AnalyticsView />;
      default:
        return <CatalogView onViewDetails={handleViewDetails} onDeploy={handleDeploy} />;
    }
  };

  return (
    <div className="min-h-screen bg-gray-100">
      <Header currentView={getViewTitle()} />
      <div className="flex">
        <Sidebar 
          currentView={showProfile ? 'catalog' : currentView} 
          onViewChange={(view) => {
            setCurrentView(view);
            setShowProfile(false);
            setSelectedFunction(null);
          }} 
        />
        <main className="flex-1 p-6">
          {renderCurrentView()}
        </main>
      </div>
    </div>
  );
}

export default App;
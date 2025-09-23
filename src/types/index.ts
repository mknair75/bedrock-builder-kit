export interface AOFunction {
  id: string;
  name: string;
  domain: string;
  capability: string;
  version: string;
  provider: string;
  price: string;
  description: string;
  longDescription: string;
  useCases: string[];
  dependencies: {
    digitalTwins: string[];
    aiModels: string[];
    solvers: string[];
    apis: string[];
    policies: string[];
    eventStreams: string[];
  };
  performance: {
    kei: string[];
    kci: string[];
    kbi: string[];
  };
  runtimeModes: RuntimeMode[];
  status: 'Draft' | 'Deployed' | 'Active' | 'Retired';
  currentMode: RuntimeMode;
  executionMetrics: {
    frequency: number;
    successRate: number;
    avgExecutionTime: number;
  };
}

export type RuntimeMode = 'Autonomous' | 'HITL' | 'HOTL';

export type NavigationView = 'catalog' | 'analytics' | 'configuration' | 'execution' | 'integration' | 'onboarding' | 'lifecycle' | 'orchestration' | 'coordination' | 'intent' | 'global-config';

export interface TMFApi {
  id: string;
  name: string;
  specification: string;
  version: string;
  description: string;
}

export interface CAMARAApi {
  id: string;
  name: string;
  specification: string;
  version: string;
  description: string;
}

export interface ExecutionEvent {
  id: string;
  functionId: string;
  timestamp: Date;
  status: 'running' | 'completed' | 'failed';
  step: string;
  duration: number;
  keiValues: Record<string, number>;
}
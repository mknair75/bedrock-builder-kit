import React, { useState } from 'react';
import { Save, AlertTriangle, CheckCircle, Database, Cpu, Settings as SettingsIcon } from 'lucide-react';
import { AOFunction, RuntimeMode } from '../../types';
import { mockAOFunctions } from '../../data/mockData';

interface ConfigurationViewProps {
  selectedFunction?: AOFunction;
}

export const ConfigurationView: React.FC<ConfigurationViewProps> = ({ selectedFunction }) => {
  const [selectedFunctionId, setSelectedFunctionId] = useState(selectedFunction?.id || mockAOFunctions[0].id);
  const [config, setConfig] = useState({
    policies: {
      budgetThreshold: '10000',
      performanceThreshold: '95',
      errorThreshold: '5'
    },
    intentTemplates: [
      'Maintain SLA above {threshold}% for {service}',
      'Optimize cost while preserving {performance_level} performance',
      'Resolve {issue_type} within {timeframe} minutes'
    ],
    decisionModel: 'Advanced ML Model v2.1',
    resourceBindings: {
      telemetrySource: 'Primary Monitoring System',
      apiEndpoint: 'https://api.internal.com/v1',
      eventStream: 'Main Event Bus'
    },
    runtimeMode: 'Autonomous' as RuntimeMode,
    externalIntegrations: {
      dataSources: [] as string[],
      aiMlPipelines: [] as string[],
      controlMechanisms: [] as string[]
    }
  });

  const currentFunction = mockAOFunctions.find(f => f.id === selectedFunctionId);
  const [validationStatus, setValidationStatus] = useState<'valid' | 'warning' | 'error'>('valid');

  const handleSave = () => {
    // Simulate validation
    setValidationStatus('valid');
    setTimeout(() => {
      alert('Configuration saved successfully!');
    }, 500);
  };

  const handleValidation = () => {
    // Simulate validation check
    setValidationStatus('warning');
  };
  const getModeColor = (mode: string) => {
  switch (mode) {
    case 'Autonomous':
      return 'bg-green-500';
    case 'Manual':
      return 'bg-yellow-500';
    case 'Disabled':
      return 'bg-red-500';
    default:
      return 'bg-gray-300';
  }
};

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold text-gray-900">Configuration Console</h2>
        <p className="text-gray-600 mt-1">Fine-tune individual AO Function parameters</p>
      </div>

      <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-200">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Function Selection</h3>
        <select
          value={selectedFunctionId}
          onChange={(e) => setSelectedFunctionId(e.target.value)}
          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
        >
          {mockAOFunctions.map(func => (
            <option key={func.id} value={func.id}>
              {func.name} - {func.domain}
            </option>
          ))}
        </select>
      </div>

      {currentFunction && (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <div className="space-y-6">
            <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-200">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Policy Configuration</h3>
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Budget Threshold ($)
                  </label>
                  <input
                    type="number"
                    value={config.policies.budgetThreshold}
                    onChange={(e) => setConfig(prev => ({
                      ...prev,
                      policies: { ...prev.policies, budgetThreshold: e.target.value }
                    }))}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Performance Threshold (%)
                  </label>
                  <input
                    type="number"
                    value={config.policies.performanceThreshold}
                    onChange={(e) => setConfig(prev => ({
                      ...prev,
                      policies: { ...prev.policies, performanceThreshold: e.target.value }
                    }))}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Error Threshold (%)
                  </label>
                  <input
                    type="number"
                    value={config.policies.errorThreshold}
                    onChange={(e) => setConfig(prev => ({
                      ...prev,
                      policies: { ...prev.policies, errorThreshold: e.target.value }
                    }))}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                </div>
              </div>
            </div>

            <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-200">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Intent Templates</h3>
              <div className="space-y-3">
                {config.intentTemplates.map((template, index) => (
                  <div key={index} className="p-3 bg-gray-50 rounded-lg">
                    <input
                      type="text"
                      value={template}
                      onChange={(e) => {
                        const newTemplates = [...config.intentTemplates];
                        newTemplates[index] = e.target.value;
                        setConfig(prev => ({ ...prev, intentTemplates: newTemplates }));
                      }}
                      className="w-full bg-transparent text-sm text-gray-700 focus:outline-none"
                    />
                  </div>
                ))}
                <button className="text-sm text-blue-600 hover:text-blue-700 font-medium">
                  + Add Template
                </button>
              </div>
            </div>

            <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-200">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Runtime Mode</h3>
              <div className="space-y-3">
                {currentFunction.runtimeModes.map(mode => (
                  <label key={mode} className="flex items-center space-x-3 cursor-pointer">
                    <input
                      type="radio"
                      name="runtimeMode"
                      value={mode}
                      checked={config.runtimeMode === mode}
                      onChange={(e) => setConfig(prev => ({ ...prev, runtimeMode: e.target.value as RuntimeMode }))}
                      className="h-4 w-4 text-blue-600 focus:ring-blue-500"
                    />
                    <span className="text-sm font-medium text-gray-900">{mode}</span>
                    <div className={`w-2 h-2 rounded-full ${getModeColor(mode)}`}></div>
                  </label>
                ))}
              </div>
            </div>
          </div>

          <div className="space-y-6">
            <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-200">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Decision Model</h3>
              <select
                value={config.decisionModel}
                onChange={(e) => setConfig(prev => ({ ...prev, decisionModel: e.target.value }))}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              >
                <option>Advanced ML Model v2.1</option>
                <option>Rule-based Engine v1.5</option>
                <option>Hybrid Model v3.0</option>
              </select>
            </div>

            <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-200">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Resource Bindings</h3>
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Telemetry Source
                  </label>
                  <select
                    value={config.resourceBindings.telemetrySource}
                    onChange={(e) => setConfig(prev => ({
                      ...prev,
                      resourceBindings: { ...prev.resourceBindings, telemetrySource: e.target.value }
                    }))}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  >
                    <option>Primary Monitoring System</option>
                    <option>Secondary Monitoring System</option>
                    <option>External Analytics Platform</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    API Endpoint
                  </label>
                  <input
                    type="url"
                    value={config.resourceBindings.apiEndpoint}
                    onChange={(e) => setConfig(prev => ({
                      ...prev,
                      resourceBindings: { ...prev.resourceBindings, apiEndpoint: e.target.value }
                    }))}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Event Stream
                  </label>
                  <select
                    value={config.resourceBindings.eventStream}
                    onChange={(e) => setConfig(prev => ({
                      ...prev,
                      resourceBindings: { ...prev.resourceBindings, eventStream: e.target.value }
                    }))}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  >
                    <option>Main Event Bus</option>
                    <option>Analytics Event Stream</option>
                    <option>Real-time Event Pipeline</option>
                  </select>
                </div>
              </div>
            </div>

            <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-200">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Validation</h3>
              <button
                onClick={handleValidation}
                className="w-full mb-4 bg-gray-100 text-gray-700 px-4 py-2 rounded-lg hover:bg-gray-200 transition-colors"
              >
                Run Validation Check
              </button>
              
              <div className={`flex items-center space-x-2 p-3 rounded-lg ${
                validationStatus === 'valid' ? 'bg-green-50 text-green-800' :
                validationStatus === 'warning' ? 'bg-yellow-50 text-yellow-800' :
                'bg-red-50 text-red-800'
              }`}>
                {validationStatus === 'valid' && <CheckCircle className="h-4 w-4" />}
                {validationStatus === 'warning' && <AlertTriangle className="h-4 w-4" />}
                {validationStatus === 'error' && <AlertTriangle className="h-4 w-4" />}
                <span className="text-sm font-medium">
                  {validationStatus === 'valid' && 'Configuration is valid'}
                  {validationStatus === 'warning' && 'Minor configuration warnings detected'}
                  {validationStatus === 'error' && 'Configuration errors found'}
                </span>
              </div>
            </div>

            <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-200">
              <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center space-x-2">
                <Database className="h-5 w-5 text-blue-600" />
                <span>External Data Sources</span>
              </h3>
              <div className="space-y-3">
                {config.externalIntegrations.dataSources.map((source, index) => (
                  <div key={index} className="flex items-center space-x-2">
                    <span className="flex-1 text-sm bg-blue-50 px-3 py-2 rounded border">{source}</span>
                    <button
                      onClick={() => {
                        const newSources = config.externalIntegrations.dataSources.filter((_, i) => i !== index);
                        setConfig(prev => ({
                          ...prev,
                          externalIntegrations: { ...prev.externalIntegrations, dataSources: newSources }
                        }));
                      }}
                      className="text-red-600 hover:text-red-800 px-2"
                    >
                      ×
                    </button>
                  </div>
                ))}
                <input
                  type="text"
                  placeholder="Add external data source..."
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  onKeyPress={(e) => {
                    if (e.key === 'Enter' && e.currentTarget.value.trim()) {
                      setConfig(prev => ({
                        ...prev,
                        externalIntegrations: {
                          ...prev.externalIntegrations,
                          dataSources: [...prev.externalIntegrations.dataSources, e.currentTarget.value.trim()]
                        }
                      }));
                      e.currentTarget.value = '';
                    }
                  }}
                />
              </div>
            </div>

            <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-200">
              <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center space-x-2">
                <Cpu className="h-5 w-5 text-purple-600" />
                <span>AI/ML Pipelines</span>
              </h3>
              <div className="space-y-3">
                {config.externalIntegrations.aiMlPipelines.map((pipeline, index) => (
                  <div key={index} className="flex items-center space-x-2">
                    <span className="flex-1 text-sm bg-purple-50 px-3 py-2 rounded border">{pipeline}</span>
                    <button
                      onClick={() => {
                        const newPipelines = config.externalIntegrations.aiMlPipelines.filter((_, i) => i !== index);
                        setConfig(prev => ({
                          ...prev,
                          externalIntegrations: { ...prev.externalIntegrations, aiMlPipelines: newPipelines }
                        }));
                      }}
                      className="text-red-600 hover:text-red-800 px-2"
                    >
                      ×
                    </button>
                  </div>
                ))}
                <input
                  type="text"
                  placeholder="Add AI/ML pipeline..."
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  onKeyPress={(e) => {
                    if (e.key === 'Enter' && e.currentTarget.value.trim()) {
                      setConfig(prev => ({
                        ...prev,
                        externalIntegrations: {
                          ...prev.externalIntegrations,
                          aiMlPipelines: [...prev.externalIntegrations.aiMlPipelines, e.currentTarget.value.trim()]
                        }
                      }));
                      e.currentTarget.value = '';
                    }
                  }}
                />
              </div>
            </div>

            <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-200">
              <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center space-x-2">
                <SettingsIcon className="h-5 w-5 text-emerald-600" />
                <span>Control Mechanisms</span>
              </h3>
              <div className="space-y-3">
                {config.externalIntegrations.controlMechanisms.map((mechanism, index) => (
                  <div key={index} className="flex items-center space-x-2">
                    <span className="flex-1 text-sm bg-emerald-50 px-3 py-2 rounded border">{mechanism}</span>
                    <button
                      onClick={() => {
                        const newMechanisms = config.externalIntegrations.controlMechanisms.filter((_, i) => i !== index);
                        setConfig(prev => ({
                          ...prev,
                          externalIntegrations: { ...prev.externalIntegrations, controlMechanisms: newMechanisms }
                        }));
                      }}
                      className="text-red-600 hover:text-red-800 px-2"
                    >
                      ×
                    </button>
                  </div>
                ))}
                <input
                  type="text"
                  placeholder="Add control mechanism..."
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  onKeyPress={(e) => {
                    if (e.key === 'Enter' && e.currentTarget.value.trim()) {
                      setConfig(prev => ({
                        ...prev,
                        externalIntegrations: {
                          ...prev.externalIntegrations,
                          controlMechanisms: [...prev.externalIntegrations.controlMechanisms, e.currentTarget.value.trim()]
                        }
                      }));
                      e.currentTarget.value = '';
                    }
                  }}
                />
              </div>
            </div>

            <button
              onClick={handleSave}
              className="w-full bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition-colors font-medium flex items-center justify-center space-x-2"
            >
              <Save className="h-4 w-4" />
              <span>Save & Apply Configuration</span>
            </button>
          </div>
        </div>
      )}
    </div>
  );
};
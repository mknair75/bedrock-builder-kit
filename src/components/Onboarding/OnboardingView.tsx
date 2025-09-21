import React, { useState } from 'react';
import { Save, CheckCircle, Send, ArrowLeft, ArrowRight, Plus, X, AlertCircle } from 'lucide-react';

interface OnboardingData {
  // Basic Information
  functionName: string;
  functionId: string;
  version: string;
  businessOwner: string;
  technicalOwner: string;
  domain: string;
  businessDescription: string;
  
  // Capabilities & Maturity
  maturityLevel: string;
  functionalCapabilities: string[];
  valueProposition: string;
  targetKPIs: string[];
  expectedKBIs: string[];
  
  // Technical Packaging
  inputSpecs: string[];
  outputSpecs: string[];
  interfaces: string[];
  dependencies: string[];
  deploymentPackage: string;
  
  // Operational Dependencies
  closedLoops: string[];
  intentTemplates: string[];
  aiAgents: string[];
  aiModels: string[];
  policies: string[];
  odaComponents: string[];
  tmForumApis: string[];
  otherAOFunctions: string[];
  
  // Governance & Security
  lifecycleStage: string;
  stewardshipRoles: string[];
  consumptionPolicies: string[];
  securityRequirements: string[];
  
  // Monetization Settings
  pricingModel: string;
  billingIntegration: string;
  slaOptions: string[];
  
  // Effectiveness & Metrics
  keis: string[];
  kcis: string[];
  kbis: string[];
  
  // Operational Scenarios
  useCases: string[];
  sandboxTests: string[];
  healthChecks: string[];
}

export const OnboardingView: React.FC = () => {
  const [currentStep, setCurrentStep] = useState(1);
  const [formData, setFormData] = useState<OnboardingData>({
    functionName: '',
    functionId: '',
    version: '1.0.0',
    businessOwner: '',
    technicalOwner: '',
    domain: 'Order Handling',
    businessDescription: '',
    maturityLevel: 'Automated',
    functionalCapabilities: [],
    valueProposition: '',
    targetKPIs: [],
    expectedKBIs: [],
    inputSpecs: [],
    outputSpecs: [],
    interfaces: [],
    dependencies: [],
    deploymentPackage: '',
    closedLoops: [],
    intentTemplates: [],
    aiAgents: [],
    aiModels: [],
    policies: [],
    odaComponents: [],
    tmForumApis: [],
    otherAOFunctions: [],
    lifecycleStage: 'Draft',
    stewardshipRoles: [],
    consumptionPolicies: [],
    securityRequirements: [],
    pricingModel: 'Per Execution',
    billingIntegration: 'Enterprise Billing',
    slaOptions: [],
    keis: [],
    kcis: [],
    kbis: [],
    useCases: [],
    sandboxTests: [],
    healthChecks: []
  });

  const steps = [
    { id: 1, title: 'Basic Information', description: 'Function details and ownership' },
    { id: 2, title: 'Capabilities & Maturity', description: 'Functional capabilities and value' },
    { id: 3, title: 'Technical Packaging', description: 'Specifications and interfaces' },
    { id: 4, title: 'Operational Dependencies', description: 'Ecosystem integrations' },
    { id: 5, title: 'Governance & Security', description: 'Policies and security' },
    { id: 6, title: 'Monetization Settings', description: 'Pricing and billing' },
    { id: 7, title: 'Effectiveness & Metrics', description: 'KPIs and measurements' },
    { id: 8, title: 'Operational Scenarios', description: 'Use cases and testing' }
  ];

  const domains = ['Order Handling', 'FinOps', 'Network Ops', 'MarketingOps', 'SalesOps', 'SLA', 'Sustainability'];
  const maturityLevels = ['Augmented', 'Automated', 'Autonomy'];
  const capabilities = ['Reactive', 'Predictive', 'Adaptive', 'Reflective', 'Cognitive', 'Self-Learning'];
  const lifecycleStages = ['Draft', 'Published', 'Deprecated'];
  const pricingModels = ['Per Execution', 'Per Optimization', 'Subscription', 'Outcome-Based'];

  const addArrayItem = (field: keyof OnboardingData, value: string) => {
    if (value.trim()) {
      setFormData(prev => ({
        ...prev,
        [field]: [...(prev[field] as string[]), value.trim()]
      }));
    }
  };

  const removeArrayItem = (field: keyof OnboardingData, index: number) => {
    setFormData(prev => ({
      ...prev,
      [field]: (prev[field] as string[]).filter((_, i) => i !== index)
    }));
  };

  const handleInputChange = (field: keyof OnboardingData, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const nextStep = () => {
    if (currentStep < steps.length) {
      setCurrentStep(currentStep + 1);
    }
  };

  const prevStep = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
    }
  };

  const handleSaveDraft = () => {
    alert('Draft saved successfully!');
  };

  const handleValidate = () => {
    alert('Validation completed successfully!');
  };

  const handleSubmitForApproval = () => {
    alert('Submitted for approval successfully!');
  };

  const ArrayInput: React.FC<{
    label: string;
    items: string[];
    onAdd: (value: string) => void;
    onRemove: (index: number) => void;
    placeholder: string;
    color?: string;
  }> = ({ label, items, onAdd, onRemove, placeholder, color = 'blue' }) => {
    const [inputValue, setInputValue] = useState('');

    const handleAdd = () => {
      if (inputValue.trim()) {
        onAdd(inputValue);
        setInputValue('');
      }
    };

    const handleKeyPress = (e: React.KeyboardEvent) => {
      if (e.key === 'Enter') {
        handleAdd();
      }
    };

    const colorClasses = {
      blue: 'bg-blue-50 text-blue-800 border-blue-200',
      green: 'bg-green-50 text-green-800 border-green-200',
      purple: 'bg-purple-50 text-purple-800 border-purple-200',
      orange: 'bg-orange-50 text-orange-800 border-orange-200',
      indigo: 'bg-indigo-50 text-indigo-800 border-indigo-200',
      emerald: 'bg-emerald-50 text-emerald-800 border-emerald-200',
      red: 'bg-red-50 text-red-800 border-red-200'
    };

    return (
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">{label}</label>
        <div className="flex space-x-2 mb-2">
          <input
            type="text"
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            onKeyPress={handleKeyPress}
            placeholder={placeholder}
            className="flex-1 px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm"
          />
          <button
            type="button"
            onClick={handleAdd}
            className="px-3 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
          >
            <Plus className="h-4 w-4" />
          </button>
        </div>
        <div className="flex flex-wrap gap-2">
          {items.map((item, index) => (
            <span
              key={index}
              className={`inline-flex items-center px-2 py-1 rounded text-xs font-medium border ${colorClasses[color as keyof typeof colorClasses] || colorClasses.blue}`}
            >
              {item}
              <button
                type="button"
                onClick={() => onRemove(index)}
                className="ml-1 hover:text-red-600"
              >
                <X className="h-3 w-3" />
              </button>
            </span>
          ))}
        </div>
      </div>
    );
  };

  const renderStepContent = () => {
    switch (currentStep) {
      case 1:
        return (
          <div className="space-y-6">
            <h3 className="text-lg font-semibold text-gray-900">Basic Information</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Function Name *</label>
                <input
                  type="text"
                  value={formData.functionName}
                  onChange={(e) => handleInputChange('functionName', e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="Enter function name"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Function ID *</label>
                <input
                  type="text"
                  value={formData.functionId}
                  onChange={(e) => handleInputChange('functionId', e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="Enter unique function ID"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Version</label>
                <input
                  type="text"
                  value={formData.version}
                  onChange={(e) => handleInputChange('version', e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Domain *</label>
                <select
                  value={formData.domain}
                  onChange={(e) => handleInputChange('domain', e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                >
                  {domains.map(domain => (
                    <option key={domain} value={domain}>{domain}</option>
                  ))}
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Business Owner *</label>
                <input
                  type="text"
                  value={formData.businessOwner}
                  onChange={(e) => handleInputChange('businessOwner', e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="Enter business owner name"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Technical Owner *</label>
                <input
                  type="text"
                  value={formData.technicalOwner}
                  onChange={(e) => handleInputChange('technicalOwner', e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="Enter technical owner name"
                />
              </div>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Business Description *</label>
              <textarea
                value={formData.businessDescription}
                onChange={(e) => handleInputChange('businessDescription', e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent h-24 resize-none"
                placeholder="Describe the business purpose and value of this AO Function"
              />
            </div>
          </div>
        );

      case 2:
        return (
          <div className="space-y-6">
            <h3 className="text-lg font-semibold text-gray-900">Capabilities & Maturity</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Maturity Level</label>
                <select
                  value={formData.maturityLevel}
                  onChange={(e) => handleInputChange('maturityLevel', e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                >
                  {maturityLevels.map(level => (
                    <option key={level} value={level}>{level}</option>
                  ))}
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Value Proposition</label>
                <textarea
                  value={formData.valueProposition}
                  onChange={(e) => handleInputChange('valueProposition', e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent h-20 resize-none"
                  placeholder="Describe the intended business outcomes"
                />
              </div>
            </div>
            <ArrayInput
              label="Functional Capabilities"
              items={formData.functionalCapabilities}
              onAdd={(value) => addArrayItem('functionalCapabilities', value)}
              onRemove={(index) => removeArrayItem('functionalCapabilities', index)}
              placeholder="Add capability (e.g., Predictive, Adaptive)"
              color="blue"
            />
            <ArrayInput
              label="Target KPIs/KQIs"
              items={formData.targetKPIs}
              onAdd={(value) => addArrayItem('targetKPIs', value)}
              onRemove={(index) => removeArrayItem('targetKPIs', index)}
              placeholder="Add target KPI"
              color="green"
            />
            <ArrayInput
              label="Expected Business Indicators (KBIs)"
              items={formData.expectedKBIs}
              onAdd={(value) => addArrayItem('expectedKBIs', value)}
              onRemove={(index) => removeArrayItem('expectedKBIs', index)}
              placeholder="Add expected business indicator"
              color="purple"
            />
          </div>
        );

      case 3:
        return (
          <div className="space-y-6">
            <h3 className="text-lg font-semibold text-gray-900">Technical Packaging</h3>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Deployment Package</label>
              <input
                type="text"
                value={formData.deploymentPackage}
                onChange={(e) => handleInputChange('deploymentPackage', e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                placeholder="Container image, Helm chart, or GitHub repo link"
              />
            </div>
            <ArrayInput
              label="Input Specifications"
              items={formData.inputSpecs}
              onAdd={(value) => addArrayItem('inputSpecs', value)}
              onRemove={(index) => removeArrayItem('inputSpecs', index)}
              placeholder="Add input specification"
              color="blue"
            />
            <ArrayInput
              label="Output Specifications"
              items={formData.outputSpecs}
              onAdd={(value) => addArrayItem('outputSpecs', value)}
              onRemove={(index) => removeArrayItem('outputSpecs', index)}
              placeholder="Add output specification"
              color="green"
            />
            <ArrayInput
              label="Interfaces"
              items={formData.interfaces}
              onAdd={(value) => addArrayItem('interfaces', value)}
              onRemove={(index) => removeArrayItem('interfaces', index)}
              placeholder="Add interface (API, event bus, stream)"
              color="purple"
            />
            <ArrayInput
              label="Dependencies"
              items={formData.dependencies}
              onAdd={(value) => addArrayItem('dependencies', value)}
              onRemove={(index) => removeArrayItem('dependencies', index)}
              placeholder="Add dependency"
              color="orange"
            />
          </div>
        );

      case 4:
        return (
          <div className="space-y-6">
            <h3 className="text-lg font-semibold text-gray-900">Operational Dependencies</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-4">
                <ArrayInput
                  label="Closed Loop Controllers"
                  items={formData.closedLoops}
                  onAdd={(value) => addArrayItem('closedLoops', value)}
                  onRemove={(index) => removeArrayItem('closedLoops', index)}
                  placeholder="Add closed loop dependency"
                  color="blue"
                />
                <ArrayInput
                  label="Intent Templates"
                  items={formData.intentTemplates}
                  onAdd={(value) => addArrayItem('intentTemplates', value)}
                  onRemove={(index) => removeArrayItem('intentTemplates', index)}
                  placeholder="Add intent template"
                  color="green"
                />
                <ArrayInput
                  label="AI Agents"
                  items={formData.aiAgents}
                  onAdd={(value) => addArrayItem('aiAgents', value)}
                  onRemove={(index) => removeArrayItem('aiAgents', index)}
                  placeholder="Add AI agent"
                  color="purple"
                />
                <ArrayInput
                  label="AI Models"
                  items={formData.aiModels}
                  onAdd={(value) => addArrayItem('aiModels', value)}
                  onRemove={(index) => removeArrayItem('aiModels', index)}
                  placeholder="Add AI model"
                  color="indigo"
                />
              </div>
              <div className="space-y-4">
                <ArrayInput
                  label="Policy Dependencies"
                  items={formData.policies}
                  onAdd={(value) => addArrayItem('policies', value)}
                  onRemove={(index) => removeArrayItem('policies', index)}
                  placeholder="Add policy dependency"
                  color="orange"
                />
                <ArrayInput
                  label="ODA Components"
                  items={formData.odaComponents}
                  onAdd={(value) => addArrayItem('odaComponents', value)}
                  onRemove={(index) => removeArrayItem('odaComponents', index)}
                  placeholder="Add ODA component"
                  color="emerald"
                />
                <ArrayInput
                  label="TM Forum APIs"
                  items={formData.tmForumApis}
                  onAdd={(value) => addArrayItem('tmForumApis', value)}
                  onRemove={(index) => removeArrayItem('tmForumApis', index)}
                  placeholder="Add TM Forum API"
                  color="red"
                />
                <ArrayInput
                  label="Other AO Functions"
                  items={formData.otherAOFunctions}
                  onAdd={(value) => addArrayItem('otherAOFunctions', value)}
                  onRemove={(index) => removeArrayItem('otherAOFunctions', index)}
                  placeholder="Add AO Function dependency"
                  color="blue"
                />
              </div>
            </div>
          </div>
        );

      case 5:
        return (
          <div className="space-y-6">
            <h3 className="text-lg font-semibold text-gray-900">Governance & Security</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Lifecycle Stage</label>
                <select
                  value={formData.lifecycleStage}
                  onChange={(e) => handleInputChange('lifecycleStage', e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                >
                  {lifecycleStages.map(stage => (
                    <option key={stage} value={stage}>{stage}</option>
                  ))}
                </select>
              </div>
            </div>
            <ArrayInput
              label="Stewardship Roles"
              items={formData.stewardshipRoles}
              onAdd={(value) => addArrayItem('stewardshipRoles', value)}
              onRemove={(index) => removeArrayItem('stewardshipRoles', index)}
              placeholder="Add stewardship role"
              color="blue"
            />
            <ArrayInput
              label="Consumption Policies"
              items={formData.consumptionPolicies}
              onAdd={(value) => addArrayItem('consumptionPolicies', value)}
              onRemove={(index) => removeArrayItem('consumptionPolicies', index)}
              placeholder="Add consumption policy"
              color="green"
            />
            <ArrayInput
              label="Security Requirements"
              items={formData.securityRequirements}
              onAdd={(value) => addArrayItem('securityRequirements', value)}
              onRemove={(index) => removeArrayItem('securityRequirements', index)}
              placeholder="Add security requirement"
              color="red"
            />
          </div>
        );

      case 6:
        return (
          <div className="space-y-6">
            <h3 className="text-lg font-semibold text-gray-900">Monetization Settings</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Pricing Model</label>
                <select
                  value={formData.pricingModel}
                  onChange={(e) => handleInputChange('pricingModel', e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                >
                  {pricingModels.map(model => (
                    <option key={model} value={model}>{model}</option>
                  ))}
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Billing Integration</label>
                <input
                  type="text"
                  value={formData.billingIntegration}
                  onChange={(e) => handleInputChange('billingIntegration', e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="Enterprise billing system"
                />
              </div>
            </div>
            <ArrayInput
              label="SLA Options"
              items={formData.slaOptions}
              onAdd={(value) => addArrayItem('slaOptions', value)}
              onRemove={(index) => removeArrayItem('slaOptions', index)}
              placeholder="Add SLA option"
              color="blue"
            />
          </div>
        );

      case 7:
        return (
          <div className="space-y-6">
            <h3 className="text-lg font-semibold text-gray-900">Effectiveness & Metrics</h3>
            <ArrayInput
              label="Key Effectiveness Indicators (KEIs)"
              items={formData.keis}
              onAdd={(value) => addArrayItem('keis', value)}
              onRemove={(index) => removeArrayItem('keis', index)}
              placeholder="Add KEI metric"
              color="blue"
            />
            <ArrayInput
              label="Key Capability Indicators (KCIs)"
              items={formData.kcis}
              onAdd={(value) => addArrayItem('kcis', value)}
              onRemove={(index) => removeArrayItem('kcis', index)}
              placeholder="Add KCI metric"
              color="green"
            />
            <ArrayInput
              label="Key Business Indicators (KBIs)"
              items={formData.kbis}
              onAdd={(value) => addArrayItem('kbis', value)}
              onRemove={(index) => removeArrayItem('kbis', index)}
              placeholder="Add KBI metric"
              color="purple"
            />
          </div>
        );

      case 8:
        return (
          <div className="space-y-6">
            <h3 className="text-lg font-semibold text-gray-900">Operational Scenarios & Testing</h3>
            <ArrayInput
              label="Use Cases / Scenarios"
              items={formData.useCases}
              onAdd={(value) => addArrayItem('useCases', value)}
              onRemove={(index) => removeArrayItem('useCases', index)}
              placeholder="Add use case scenario"
              color="blue"
            />
            <ArrayInput
              label="Sandbox Tests"
              items={formData.sandboxTests}
              onAdd={(value) => addArrayItem('sandboxTests', value)}
              onRemove={(index) => removeArrayItem('sandboxTests', index)}
              placeholder="Add sandbox test"
              color="green"
            />
            <ArrayInput
              label="Health & Readiness Checks"
              items={formData.healthChecks}
              onAdd={(value) => addArrayItem('healthChecks', value)}
              onRemove={(index) => removeArrayItem('healthChecks', index)}
              placeholder="Add health check"
              color="orange"
            />
          </div>
        );

      default:
        return null;
    }
  };

  const renderPreview = () => {
    return (
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Live Preview</h3>
        <div className="bg-gradient-to-br from-blue-50 to-indigo-50 rounded-xl p-6 border border-blue-200">
          <div className="flex items-start justify-between mb-4">
            <div>
              <h4 className="text-lg font-semibold text-gray-900">
                {formData.functionName || 'Function Name'}
              </h4>
              <p className="text-sm text-gray-600 mt-1">{formData.domain}</p>
            </div>
            <span className={`px-2 py-1 rounded-full text-xs font-medium ${
              formData.lifecycleStage === 'Draft' ? 'bg-gray-100 text-gray-800' :
              formData.lifecycleStage === 'Published' ? 'bg-green-100 text-green-800' :
              'bg-red-100 text-red-800'
            }`}>
              {formData.lifecycleStage}
            </span>
          </div>

          <p className="text-gray-700 text-sm mb-4 line-clamp-3">
            {formData.businessDescription || 'Business description will appear here...'}
          </p>
          
          <div className="space-y-2 mb-4">
            <div className="flex justify-between text-sm">
              <span className="text-gray-600">Version:</span>
              <span className="font-medium">{formData.version}</span>
            </div>
            <div className="flex justify-between text-sm">
              <span className="text-gray-600">Maturity:</span>
              <span className="font-medium">{formData.maturityLevel}</span>
            </div>
            <div className="flex justify-between text-sm">
              <span className="text-gray-600">Owner:</span>
              <span className="font-medium">{formData.businessOwner || 'TBD'}</span>
            </div>
            <div className="flex justify-between text-sm">
              <span className="text-gray-600">Pricing:</span>
              <span className="font-medium text-emerald-600">{formData.pricingModel}</span>
            </div>
          </div>

          {formData.functionalCapabilities.length > 0 && (
            <div className="mb-4">
              <div className="text-xs font-medium text-gray-700 mb-2">Capabilities:</div>
              <div className="flex flex-wrap gap-1">
                {formData.functionalCapabilities.slice(0, 3).map((capability, index) => (
                  <span key={index} className="px-2 py-1 bg-blue-100 text-blue-800 rounded text-xs">
                    {capability}
                  </span>
                ))}
                {formData.functionalCapabilities.length > 3 && (
                  <span className="px-2 py-1 bg-gray-100 text-gray-600 rounded text-xs">
                    +{formData.functionalCapabilities.length - 3} more
                  </span>
                )}
              </div>
            </div>
          )}
        </div>
      </div>
    );
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold text-gray-900">Onboard New AO Function</h2>
          <div className="flex items-center space-x-1 text-sm text-gray-500 mt-1">
            <span>Dashboard</span>
            <span>/</span>
            <span>Function Catalog</span>
            <span>/</span>
            <span className="text-gray-900 font-medium">Onboard New</span>
          </div>
        </div>
        <div className="flex items-center space-x-3">
          <button
            onClick={handleSaveDraft}
            className="px-4 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-colors flex items-center space-x-2"
          >
            <Save className="h-4 w-4" />
            <span>Save Draft</span>
          </button>
          <button
            onClick={handleValidate}
            className="px-4 py-2 bg-blue-100 text-blue-700 rounded-lg hover:bg-blue-200 transition-colors flex items-center space-x-2"
          >
            <CheckCircle className="h-4 w-4" />
            <span>Validate</span>
          </button>
          <button
            onClick={handleSubmitForApproval}
            className="px-4 py-2 bg-emerald-600 text-white rounded-lg hover:bg-emerald-700 transition-colors flex items-center space-x-2"
          >
            <Send className="h-4 w-4" />
            <span>Submit for Approval</span>
          </button>
        </div>
      </div>

      <div className="grid grid-cols-12 gap-6">
        {/* Step Navigation */}
        <div className="col-span-3">
          <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-200 sticky top-6">
            <h3 className="font-semibold text-gray-900 mb-4">Onboarding Steps</h3>
            <div className="space-y-2">
              {steps.map((step) => (
                <button
                  key={step.id}
                  onClick={() => setCurrentStep(step.id)}
                  className={`w-full text-left p-3 rounded-lg transition-all ${
                    currentStep === step.id
                      ? 'bg-blue-600 text-white shadow-lg'
                      : 'text-gray-700 hover:bg-gray-50'
                  }`}
                >
                  <div className="flex items-center space-x-3">
                    <div className={`w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold ${
                      currentStep === step.id
                        ? 'bg-white text-blue-600'
                        : 'bg-gray-200 text-gray-600'
                    }`}>
                      {step.id}
                    </div>
                    <div>
                      <div className="font-medium text-sm">{step.title}</div>
                      <div className={`text-xs ${
                        currentStep === step.id ? 'text-blue-100' : 'text-gray-500'
                      }`}>
                        {step.description}
                      </div>
                    </div>
                  </div>
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Main Content */}
        <div className="col-span-6">
          <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-200 min-h-[600px]">
            {renderStepContent()}
            
            {/* Navigation Buttons */}
            <div className="flex justify-between mt-8 pt-6 border-t border-gray-200">
              <button
                onClick={prevStep}
                disabled={currentStep === 1}
                className="flex items-center space-x-2 px-4 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
              >
                <ArrowLeft className="h-4 w-4" />
                <span>Previous</span>
              </button>
              <button
                onClick={nextStep}
                disabled={currentStep === steps.length}
                className="flex items-center space-x-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
              >
                <span>Next</span>
                <ArrowRight className="h-4 w-4" />
              </button>
            </div>
          </div>
        </div>

        {/* Preview Panel */}
        <div className="col-span-3">
          <div className="sticky top-6">
            {renderPreview()}
            
            {/* Progress Indicator */}
            <div className="bg-white rounded-xl p-4 shadow-sm border border-gray-200 mt-4">
              <div className="flex items-center justify-between mb-2">
                <span className="text-sm font-medium text-gray-700">Progress</span>
                <span className="text-sm text-gray-600">{currentStep}/{steps.length}</span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-2">
                <div 
                  className="bg-blue-600 h-2 rounded-full transition-all duration-300"
                  style={{ width: `${(currentStep / steps.length) * 100}%` }}
                ></div>
              </div>
            </div>

            {/* Validation Status */}
            <div className="bg-blue-50 border border-blue-200 rounded-xl p-4 mt-4">
              <div className="flex items-start space-x-2">
                <AlertCircle className="h-5 w-5 text-blue-600 mt-0.5" />
                <div>
                  <div className="font-medium text-blue-900 text-sm">Onboarding Guide</div>
                  <div className="text-blue-700 text-xs mt-1">
                    Complete all steps to submit your AO Function for approval. Required fields are marked with *.
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
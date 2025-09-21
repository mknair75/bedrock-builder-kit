import React, { useState } from 'react';
import { X, Check, AlertCircle, FileText, Code } from 'lucide-react';
import { AOFunction } from '../../types';

interface SubscriptionModalProps {
  func: AOFunction;
  isOpen: boolean;
  onClose: () => void;
  onSubscribe: () => void;
}

export const SubscriptionModal: React.FC<SubscriptionModalProps> = ({ func, isOpen, onClose, onSubscribe }) => {
  const [selectedPlan, setSelectedPlan] = useState('standard');
  const [selectedRegion, setSelectedRegion] = useState('us-east-1');
  const [agreedToTerms, setAgreedToTerms] = useState(false);
  const [showSpec, setShowSpec] = useState(false);
  const [specFormat, setSpecFormat] = useState<'yaml' | 'json'>('yaml');

  if (!isOpen) return null;

  const subscriptionPlans = [
    {
      id: 'basic',
      name: 'Basic',
      price: '$0.01/execution',
      executions: '1,000/month',
      features: ['Basic monitoring', 'Email support', 'Standard SLA']
    },
    {
      id: 'standard',
      name: 'Standard',
      price: func.price,
      executions: '10,000/month',
      features: ['Advanced monitoring', 'Priority support', 'Enhanced SLA', 'Custom policies']
    },
    {
      id: 'enterprise',
      name: 'Enterprise',
      price: '$0.15/execution',
      executions: 'Unlimited',
      features: ['Real-time analytics', '24/7 support', 'Premium SLA', 'Custom integrations', 'Dedicated resources']
    }
  ];

  const regions = [
    { id: 'us-east-1', name: 'US East (N. Virginia)', available: true },
    { id: 'us-west-2', name: 'US West (Oregon)', available: true },
    { id: 'eu-west-1', name: 'Europe (Ireland)', available: true },
    { id: 'ap-southeast-1', name: 'Asia Pacific (Singapore)', available: false }
  ];

  const dependencies = {
    'Closed Loop APIs': ['OODA Loop Controller', 'Decision Engine API', 'Action Executor API'],
    'Intent Handlers': ['Natural Language Processor', 'Intent Classification Service', 'Parameter Extraction Engine'],
    'ODA Canvas Dependencies': ['Product Catalog API', 'Service Inventory API', 'Resource Management API'],
    'Policy Engines': ['Business Rules Engine', 'Compliance Policy Engine', 'Security Policy Framework'],
    'AI Models': ['Anomaly Detection Model', 'Predictive Analytics Model', 'Optimization Algorithm'],
    'AI Agents': ['Decision Support Agent', 'Monitoring Agent', 'Escalation Agent'],
    'Rules Engine': ['Business Logic Engine', 'Workflow Engine', 'Event Processing Engine']
  };

  const hardwareRequirements = {
    'Basic': { cpu: '2 vCPU', memory: '4 GB RAM', storage: '20 GB SSD', network: '1 Gbps' },
    'Standard': { cpu: '4 vCPU', memory: '8 GB RAM', storage: '50 GB SSD', network: '5 Gbps' },
    'Enterprise': { cpu: '8 vCPU', memory: '16 GB RAM', storage: '100 GB SSD', network: '10 Gbps' }
  };

  const generateSpec = () => {
    const spec = {
      name: func.name,
      version: func.version,
      domain: func.domain,
      capability: func.capability,
      provider: func.provider,
      runtimeModes: func.runtimeModes,
      dependencies: func.dependencies,
      performance: func.performance,
      subscription: {
        plan: selectedPlan,
        region: selectedRegion,
        pricing: subscriptionPlans.find(p => p.id === selectedPlan)?.price
      },
      requirements: hardwareRequirements[selectedPlan.charAt(0).toUpperCase() + selectedPlan.slice(1) as keyof typeof hardwareRequirements]
    };

    if (specFormat === 'yaml') {
      return `# AO Function Specification
name: "${spec.name}"
version: "${spec.version}"
domain: "${spec.domain}"
capability: "${spec.capability}"
provider: "${spec.provider}"

runtimeModes:
${spec.runtimeModes.map(mode => `  - ${mode}`).join('\n')}

subscription:
  plan: ${spec.subscription.plan}
  region: ${spec.subscription.region}
  pricing: "${spec.subscription.pricing}"

requirements:
  cpu: "${spec.requirements.cpu}"
  memory: "${spec.requirements.memory}"
  storage: "${spec.requirements.storage}"
  network: "${spec.requirements.network}"

dependencies:
  digitalTwins:
${spec.dependencies.digitalTwins.map(dt => `    - "${dt}"`).join('\n')}
  aiModels:
${spec.dependencies.aiModels.map(model => `    - "${model}"`).join('\n')}`;
    } else {
      return JSON.stringify(spec, null, 2);
    }
  };

  const handleSubscribe = () => {
    if (!agreedToTerms) {
      alert('Please agree to the terms of service');
      return;
    }
    onSubscribe();
    onClose();
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-xl shadow-2xl max-w-4xl w-full max-h-[90vh] overflow-y-auto">
        <div className="flex items-center justify-between p-6 border-b border-gray-200">
          <h2 className="text-xl font-bold text-gray-900">Subscribe to {func.name}</h2>
          <button onClick={onClose} className="p-2 hover:bg-gray-100 rounded-lg transition-colors">
            <X className="h-5 w-5" />
          </button>
        </div>

        <div className="p-6 space-y-6">
          {!showSpec ? (
            <>
              <div>
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Subscription Plans</h3>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  {subscriptionPlans.map(plan => (
                    <div
                      key={plan.id}
                      onClick={() => setSelectedPlan(plan.id)}
                      className={`p-4 border-2 rounded-lg cursor-pointer transition-all ${
                        selectedPlan === plan.id
                          ? 'border-blue-500 bg-blue-50'
                          : 'border-gray-200 hover:border-gray-300'
                      }`}
                    >
                      <h4 className="font-semibold text-gray-900">{plan.name}</h4>
                      <div className="text-2xl font-bold text-blue-600 my-2">{plan.price}</div>
                      <div className="text-sm text-gray-600 mb-3">{plan.executions}</div>
                      <ul className="space-y-1">
                        {plan.features.map((feature, index) => (
                          <li key={index} className="text-xs text-gray-700 flex items-center space-x-1">
                            <Check className="h-3 w-3 text-green-500" />
                            <span>{feature}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  ))}
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-4">Regional Availability</h3>
                  <div className="space-y-2">
                    {regions.map(region => (
                      <label
                        key={region.id}
                        className={`flex items-center space-x-3 p-3 border rounded-lg cursor-pointer transition-colors ${
                          !region.available ? 'opacity-50 cursor-not-allowed' :
                          selectedRegion === region.id ? 'border-blue-500 bg-blue-50' : 'border-gray-200 hover:border-gray-300'
                        }`}
                      >
                        <input
                          type="radio"
                          name="region"
                          value={region.id}
                          checked={selectedRegion === region.id}
                          onChange={(e) => setSelectedRegion(e.target.value)}
                          disabled={!region.available}
                          className="h-4 w-4 text-blue-600 focus:ring-blue-500"
                        />
                        <span className="text-sm font-medium text-gray-900">{region.name}</span>
                        {!region.available && (
                          <span className="text-xs text-red-600 bg-red-100 px-2 py-1 rounded">Coming Soon</span>
                        )}
                      </label>
                    ))}
                  </div>
                </div>

                <div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-4">Hardware Requirements</h3>
                  <div className="p-4 bg-gray-50 rounded-lg">
                    <h4 className="font-medium text-gray-900 mb-2">
                      {selectedPlan.charAt(0).toUpperCase() + selectedPlan.slice(1)} Tier
                    </h4>
                    <div className="space-y-2 text-sm">
                      <div className="flex justify-between">
                        <span className="text-gray-600">CPU:</span>
                        <span className="font-medium">{hardwareRequirements[selectedPlan.charAt(0).toUpperCase() + selectedPlan.slice(1) as keyof typeof hardwareRequirements].cpu}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-600">Memory:</span>
                        <span className="font-medium">{hardwareRequirements[selectedPlan.charAt(0).toUpperCase() + selectedPlan.slice(1) as keyof typeof hardwareRequirements].memory}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-600">Storage:</span>
                        <span className="font-medium">{hardwareRequirements[selectedPlan.charAt(0).toUpperCase() + selectedPlan.slice(1) as keyof typeof hardwareRequirements].storage}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-600">Network:</span>
                        <span className="font-medium">{hardwareRequirements[selectedPlan.charAt(0).toUpperCase() + selectedPlan.slice(1) as keyof typeof hardwareRequirements].network}</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <div>
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Dependencies</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {Object.entries(dependencies).map(([category, items]) => (
                    <div key={category} className="p-4 bg-gray-50 rounded-lg">
                      <h4 className="font-medium text-gray-900 mb-2">{category}</h4>
                      <ul className="space-y-1">
                        {items.map((item, index) => (
                          <li key={index} className="text-sm text-gray-700 flex items-center space-x-2">
                            <div className="w-1.5 h-1.5 bg-blue-500 rounded-full"></div>
                            <span>{item}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  ))}
                </div>
              </div>

              <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
                <div className="flex items-start space-x-3">
                  <AlertCircle className="h-5 w-5 text-yellow-600 mt-0.5" />
                  <div>
                    <h4 className="font-medium text-yellow-900">Terms of Service</h4>
                    <p className="text-sm text-yellow-800 mt-1">
                      By subscribing to this AO Function, you agree to the autonomous operations terms, 
                      data processing policies, and usage limitations. The function will operate within 
                      configured parameters and may make automated decisions affecting your infrastructure.
                    </p>
                    <label className="flex items-center space-x-2 mt-3 cursor-pointer">
                      <input
                        type="checkbox"
                        checked={agreedToTerms}
                        onChange={(e) => setAgreedToTerms(e.target.checked)}
                        className="h-4 w-4 text-blue-600 focus:ring-blue-500 rounded"
                      />
                      <span className="text-sm font-medium text-yellow-900">
                        I agree to the terms of service and autonomous operations policy
                      </span>
                    </label>
                  </div>
                </div>
              </div>

              <div className="flex justify-between">
                <button
                  onClick={() => setShowSpec(true)}
                  className="flex items-center space-x-2 px-4 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-colors"
                >
                  <FileText className="h-4 w-4" />
                  <span>View Specification</span>
                </button>
                <div className="flex space-x-3">
                  <button
                    onClick={onClose}
                    className="px-6 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors"
                  >
                    Cancel
                  </button>
                  <button
                    onClick={handleSubscribe}
                    disabled={!agreedToTerms}
                    className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:bg-gray-400 disabled:cursor-not-allowed transition-colors"
                  >
                    Subscribe & Deploy
                  </button>
                </div>
              </div>
            </>
          ) : (
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <h3 className="text-lg font-semibold text-gray-900">Function Specification</h3>
                <div className="flex items-center space-x-2">
                  <button
                    onClick={() => setSpecFormat('yaml')}
                    className={`px-3 py-1 text-sm rounded ${
                      specFormat === 'yaml' ? 'bg-blue-600 text-white' : 'bg-gray-100 text-gray-700'
                    }`}
                  >
                    YAML
                  </button>
                  <button
                    onClick={() => setSpecFormat('json')}
                    className={`px-3 py-1 text-sm rounded ${
                      specFormat === 'json' ? 'bg-blue-600 text-white' : 'bg-gray-100 text-gray-700'
                    }`}
                  >
                    JSON
                  </button>
                </div>
              </div>
              
              <div className="bg-gray-900 rounded-lg p-4 max-h-96 overflow-y-auto">
                <pre className="text-green-400 text-sm font-mono whitespace-pre-wrap">
                  {generateSpec()}
                </pre>
              </div>

              <div className="flex justify-between">
                <button
                  onClick={() => setShowSpec(false)}
                  className="flex items-center space-x-2 px-4 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-colors"
                >
                  <span>← Back to Subscription</span>
                </button>
                <button
                  onClick={() => {
                    const blob = new Blob([generateSpec()], { type: 'text/plain' });
                    const url = URL.createObjectURL(blob);
                    const a = document.createElement('a');
                    a.href = url;
                    a.download = `${func.name.toLowerCase().replace(/\s+/g, '-')}.${specFormat}`;
                    a.click();
                  }}
                  className="flex items-center space-x-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
                >
                  <Code className="h-4 w-4" />
                  <span>Download {specFormat.toUpperCase()}</span>
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
import React, { useState } from 'react';
import { Send, CheckCircle, AlertCircle, Clock, Target } from 'lucide-react';
import { mockAOFunctions } from '../../data/mockData';

interface ValidationResult {
  status: 'success' | 'warning' | 'error';
  message: string;
  matchingFunctions: string[];
}

export const IntentView: React.FC = () => {
  const [selectedFunctionId, setSelectedFunctionId] = useState(mockAOFunctions[0].id);
  const [intent, setIntent] = useState('');
  const [selectedTemplate, setSelectedTemplate] = useState('');
  const [parameters, setParameters] = useState<Record<string, string>>({});
  const [validationResult, setValidationResult] = useState<ValidationResult | null>(null);
  const [isValidating, setIsValidating] = useState(false);

  const selectedFunction = mockAOFunctions.find(f => f.id === selectedFunctionId);

  const getIntentTemplatesForFunction = (functionName: string) => {
    switch (functionName) {
      case 'Order Fallout Manager':
        return [
          'Resolve order failures for {customer_type} within {timeframe} minutes',
          'Retry failed orders up to {max_attempts} times with {retry_strategy}',
          'Escalate order issues to {escalation_level} when {condition} occurs',
          'Maintain order success rate above {threshold}% for {service_type}'
        ];
      case 'FinOps Optimizer':
        return [
          'Optimize cost while maintaining {performance_level} performance',
          'Reduce cloud spend by {percentage}% without impacting {service_level}',
          'Keep monthly budget under ${budget_limit} for {resource_type}',
          'Scale down {resource} during {time_period} to save {target_savings}%'
        ];
      case 'Network Capacity Optimizer':
        return [
          'Scale {resource} to handle {capacity} load during {time_period}',
          'Maintain network utilization below {threshold}% for {service_area}',
          'Optimize bandwidth allocation for {traffic_type} traffic',
          'Ensure response time stays under {latency_ms}ms for {service_tier}'
        ];
      case 'SLA Manager':
        return [
          'Maintain SLA above {threshold}% for {service} customers',
          'Trigger recovery when {metric} drops below {value} for {duration}',
          'Escalate to {team} when SLA breach affects {customer_count} customers',
          'Prevent SLA violations by monitoring {indicators} every {interval}'
        ];
      case 'Sales Quote Personalizer':
        return [
          'Generate quotes with {discount_range}% discount for {customer_segment}',
          'Personalize pricing based on {criteria} for {product_category}',
          'Optimize quote acceptance rate to {target}% for {sales_region}',
          'Apply dynamic pricing for {product} based on {market_conditions}'
        ];
      case 'Campaign Optimizer':
        return [
          'Optimize {campaign_type} campaigns for {target_metric} improvement',
          'Adjust ad spend to achieve {target_roas} ROAS for {product_line}',
          'Increase conversion rate by {percentage}% for {audience_segment}',
          'Reallocate budget from {low_performing_channel} to {high_performing_channel}'
        ];
      case 'Network Energy Saver':
        return [
          'Reduce energy consumption by {percentage}% during {time_period}',
          'Optimize power usage for {network_segment} while maintaining {performance_level}',
          'Schedule energy savings during {off_peak_hours} for {equipment_type}',
          'Achieve {carbon_reduction}% carbon footprint reduction for {facility}'
        ];
      default:
        return [
          'Maintain performance above {threshold}% for {service}',
          'Optimize {metric} while preserving {constraint}',
          'Resolve {issue_type} within {timeframe} minutes'
        ];
    }
  };

  const intentTemplates = selectedFunction ? getIntentTemplatesForFunction(selectedFunction.name) : [];

  const handleFunctionChange = (functionId: string) => {
    setSelectedFunctionId(functionId);
    setIntent('');
    setSelectedTemplate('');
    setParameters({});
    setValidationResult(null);
  };

  const handleTemplateSelect = (template: string) => {
    setSelectedTemplate(template);
    setIntent(template);
    
    // Extract parameters from template
    const paramMatches = template.match(/{([^}]+)}/g);
    if (paramMatches) {
      const newParams: Record<string, string> = {};
      paramMatches.forEach(match => {
        const param = match.slice(1, -1);
        newParams[param] = '';
      });
      setParameters(newParams);
    } else {
      setParameters({});
    }
  };

  const handleValidate = async () => {
    if (!intent.trim()) return;
    
    setIsValidating(true);
    
    // Simulate validation process
    await new Promise(resolve => setTimeout(resolve, 1500));
    
    // Mock validation result based on selected function
    const mockResult: ValidationResult = {
      status: Math.random() > 0.2 ? 'success' : 'warning',
      message: Math.random() > 0.2 
        ? `Intent successfully parsed and mapped to ${selectedFunction?.name}`
        : 'Intent partially understood - some parameters may need clarification',
      matchingFunctions: selectedFunction ? [selectedFunction.name] : []
    };
    
    setValidationResult(mockResult);
    setIsValidating(false);
  };

  const populateTemplate = () => {
    let populatedIntent = intent;
    Object.entries(parameters).forEach(([key, value]) => {
      if (value) {
        populatedIntent = populatedIntent.replace(`{${key}}`, value);
      }
    });
    return populatedIntent;
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center space-x-3">
        <Target className="h-8 w-8 text-blue-600" />
        <div>
          <h2 className="text-2xl font-bold text-gray-900">Intent Validation</h2>
          <p className="text-gray-600 mt-1">Test autonomous operations intent handling and validation</p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 space-y-6">
          <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-200">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Select AO Function</h3>
            <select
              value={selectedFunctionId}
              onChange={(e) => handleFunctionChange(e.target.value)}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            >
              {mockAOFunctions.map(func => (
                <option key={func.id} value={func.id}>
                  {func.name} - {func.domain}
                </option>
              ))}
            </select>
            
            {selectedFunction && (
              <div className="mt-4 p-4 bg-blue-50 border border-blue-200 rounded-lg">
                <h4 className="font-medium text-blue-900 mb-2">{selectedFunction.name}</h4>
                <p className="text-sm text-blue-700">{selectedFunction.description}</p>
                <div className="mt-2 text-xs text-blue-600">
                  <strong>Capability:</strong> {selectedFunction.capability}
                </div>
              </div>
            )}
          </div>

          <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-200">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Intent Templates</h3>
            <div className="space-y-2 max-h-48 overflow-y-auto">
              {intentTemplates.map((template, index) => (
                <button
                  key={index}
                  onClick={() => handleTemplateSelect(template)}
                  className={`w-full text-left p-3 rounded-lg border transition-colors ${
                    selectedTemplate === template
                      ? 'border-blue-500 bg-blue-50 text-blue-900'
                      : 'border-gray-200 hover:border-gray-300 hover:bg-gray-50'
                  }`}
                >
                  <span className="text-sm">{template}</span>
                </button>
              ))}
            </div>
          </div>

          <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-200">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Intent Input</h3>
            <textarea
              value={intent}
              onChange={(e) => setIntent(e.target.value)}
              placeholder="Enter your autonomous operations intent in natural language..."
              className="w-full h-32 px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none"
            />
            
            {Object.keys(parameters).length > 0 && (
              <div className="mt-4">
                <h4 className="text-sm font-medium text-gray-900 mb-3">Parameters</h4>
                <div className="grid grid-cols-2 gap-3">
                  {Object.entries(parameters).map(([key, value]) => (
                    <div key={key}>
                      <label className="block text-xs font-medium text-gray-700 mb-1 capitalize">
                        {key.replace(/_/g, ' ')}
                      </label>
                      <input
                        type="text"
                        value={value}
                        onChange={(e) => setParameters(prev => ({ ...prev, [key]: e.target.value }))}
                        className="w-full px-2 py-1 text-sm border border-gray-300 rounded focus:ring-1 focus:ring-blue-500 focus:border-transparent"
                        placeholder={`Enter ${key.replace(/_/g, ' ')}`}
                      />
                    </div>
                  ))}
                </div>
              </div>
            )}

            <div className="mt-4 flex space-x-3">
              <button
                onClick={handleValidate}
                disabled={!intent.trim() || isValidating}
                className="flex-1 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 disabled:bg-gray-400 disabled:cursor-not-allowed transition-colors flex items-center justify-center space-x-2"
              >
                {isValidating ? (
                  <>
                    <Clock className="h-4 w-4 animate-spin" />
                    <span>Validating...</span>
                  </>
                ) : (
                  <>
                    <Send className="h-4 w-4" />
                    <span>Validate Intent</span>
                  </>
                )}
              </button>
            </div>
          </div>

          {validationResult && (
            <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-200">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Validation Results</h3>
              <div className={`flex items-start space-x-3 p-4 rounded-lg ${
                validationResult.status === 'success' ? 'bg-green-50 border border-green-200' :
                validationResult.status === 'warning' ? 'bg-yellow-50 border border-yellow-200' :
                'bg-red-50 border border-red-200'
              }`}>
                {validationResult.status === 'success' && <CheckCircle className="h-5 w-5 text-green-600 mt-0.5" />}
                {validationResult.status === 'warning' && <AlertCircle className="h-5 w-5 text-yellow-600 mt-0.5" />}
                {validationResult.status === 'error' && <AlertCircle className="h-5 w-5 text-red-600 mt-0.5" />}
                <div>
                  <div className={`font-medium ${
                    validationResult.status === 'success' ? 'text-green-900' :
                    validationResult.status === 'warning' ? 'text-yellow-900' :
                    'text-red-900'
                  }`}>
                    {validationResult.status === 'success' ? 'Validation Successful' :
                     validationResult.status === 'warning' ? 'Validation Warning' :
                     'Validation Error'}
                  </div>
                  <div className={`text-sm mt-1 ${
                    validationResult.status === 'success' ? 'text-green-700' :
                    validationResult.status === 'warning' ? 'text-yellow-700' :
                    'text-red-700'
                  }`}>
                    {validationResult.message}
                  </div>
                </div>
              </div>

              {validationResult.matchingFunctions.length > 0 && (
                <div className="mt-4">
                  <h4 className="font-medium text-gray-900 mb-2">Target AO Function</h4>
                  <div className="space-y-2">
                    {validationResult.matchingFunctions.map((funcName, index) => (
                      <div key={index} className="flex items-center space-x-2 p-2 bg-blue-50 rounded-lg">
                        <CheckCircle className="h-4 w-4 text-blue-600" />
                        <span className="text-sm text-blue-900 font-medium">{funcName}</span>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          )}
        </div>

        <div className="space-y-6">
          <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-200">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Resolved Intent</h3>
            <div className="p-4 bg-gray-50 rounded-lg min-h-32">
              <pre className="text-sm text-gray-700 whitespace-pre-wrap font-mono">
                {populateTemplate() || 'Intent will appear here after template selection and parameter input...'}
              </pre>
            </div>
          </div>

          <div className="bg-blue-50 border border-blue-200 rounded-xl p-4">
            <div className="flex items-start space-x-2">
              <AlertCircle className="h-5 w-5 text-blue-600 mt-0.5" />
              <div>
                <div className="font-medium text-blue-900 text-sm">Validation Testing</div>
                <div className="text-blue-700 text-xs mt-1">
                  This interface tests intent parsing for the selected AO Function. Production intents are handled through the Integration Composer.
                </div>
              </div>
            </div>
          </div>

          {selectedFunction && (
            <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-200">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Function Context</h3>
              <div className="space-y-3 text-sm">
                <div>
                  <span className="font-medium text-gray-900">Domain:</span>
                  <span className="ml-2 text-gray-700">{selectedFunction.domain}</span>
                </div>
                <div>
                  <span className="font-medium text-gray-900">Capability:</span>
                  <span className="ml-2 text-gray-700">{selectedFunction.capability}</span>
                </div>
                <div>
                  <span className="font-medium text-gray-900">Runtime Modes:</span>
                  <div className="mt-1 flex flex-wrap gap-1">
                    {selectedFunction.runtimeModes.map(mode => (
                      <span key={mode} className="px-2 py-1 bg-gray-100 text-gray-700 rounded text-xs">
                        {mode}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
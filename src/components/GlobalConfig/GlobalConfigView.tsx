import React, { useState } from 'react';
import { Save, Shield, Database, Settings, Globe } from 'lucide-react';

export const GlobalConfigView: React.FC = () => {
  const [config, setConfig] = useState({
    dataSources: {
      primaryTelemetry: 'Prometheus Monitoring',
      secondaryTelemetry: 'Grafana Analytics',
      observabilityFeed: 'OpenTelemetry Collector'
    },
    security: {
      authProvider: 'OAuth 2.0',
      accessLevel: 'Role-based',
      encryptionLevel: 'AES-256'
    },
    policies: {
      complianceStandard: 'SOC 2 Type II',
      securityFramework: 'NIST Cybersecurity',
      dataRetention: '2 years'
    },
    runtime: {
      containerRuntime: 'Kubernetes',
      apiGateway: 'Kong Enterprise',
      defaultOversightMode: 'HITL' as const
    }
  });

  const handleSave = () => {
    alert('Global configuration saved successfully!');
  };

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold text-gray-900">Global Configuration</h2>
        <p className="text-gray-600 mt-1">Environment-wide settings and shared configurations</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="space-y-6">
          <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-200">
            <div className="flex items-center space-x-2 mb-4">
              <Database className="h-5 w-5 text-blue-600" />
              <h3 className="text-lg font-semibold text-gray-900">Data Sources</h3>
            </div>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Primary Telemetry System
                </label>
                <select
                  value={config.dataSources.primaryTelemetry}
                  onChange={(e) => setConfig(prev => ({
                    ...prev,
                    dataSources: { ...prev.dataSources, primaryTelemetry: e.target.value }
                  }))}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                >
                  <option>Prometheus Monitoring</option>
                  <option>DataDog Platform</option>
                  <option>New Relic Observability</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Secondary Telemetry System
                </label>
                <select
                  value={config.dataSources.secondaryTelemetry}
                  onChange={(e) => setConfig(prev => ({
                    ...prev,
                    dataSources: { ...prev.dataSources, secondaryTelemetry: e.target.value }
                  }))}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                >
                  <option>Grafana Analytics</option>
                  <option>Splunk Enterprise</option>
                  <option>Elastic Observability</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Observability Feed
                </label>
                <select
                  value={config.dataSources.observabilityFeed}
                  onChange={(e) => setConfig(prev => ({
                    ...prev,
                    dataSources: { ...prev.dataSources, observabilityFeed: e.target.value }
                  }))}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                >
                  <option>OpenTelemetry Collector</option>
                  <option>Jaeger Distributed Tracing</option>
                  <option>Zipkin Tracing</option>
                </select>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-200">
            <div className="flex items-center space-x-2 mb-4">
              <Shield className="h-5 w-5 text-emerald-600" />
              <h3 className="text-lg font-semibold text-gray-900">Security & Access</h3>
            </div>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Authentication Provider
                </label>
                <select
                  value={config.security.authProvider}
                  onChange={(e) => setConfig(prev => ({
                    ...prev,
                    security: { ...prev.security, authProvider: e.target.value }
                  }))}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                >
                  <option>OAuth 2.0</option>
                  <option>SAML 2.0</option>
                  <option>Active Directory</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Access Control
                </label>
                <select
                  value={config.security.accessLevel}
                  onChange={(e) => setConfig(prev => ({
                    ...prev,
                    security: { ...prev.security, accessLevel: e.target.value }
                  }))}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                >
                  <option>Role-based</option>
                  <option>Attribute-based</option>
                  <option>Multi-factor</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Encryption Level
                </label>
                <select
                  value={config.security.encryptionLevel}
                  onChange={(e) => setConfig(prev => ({
                    ...prev,
                    security: { ...prev.security, encryptionLevel: e.target.value }
                  }))}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                >
                  <option>AES-256</option>
                  <option>AES-192</option>
                  <option>RSA-2048</option>
                </select>
              </div>
            </div>
          </div>
        </div>

        <div className="space-y-6">
          <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-200">
            <div className="flex items-center space-x-2 mb-4">
              <Globe className="h-5 w-5 text-purple-600" />
              <h3 className="text-lg font-semibold text-gray-900">Global Policies</h3>
            </div>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Compliance Standard
                </label>
                <select
                  value={config.policies.complianceStandard}
                  onChange={(e) => setConfig(prev => ({
                    ...prev,
                    policies: { ...prev.policies, complianceStandard: e.target.value }
                  }))}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                >
                  <option>SOC 2 Type II</option>
                  <option>ISO 27001</option>
                  <option>GDPR Compliant</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Security Framework
                </label>
                <select
                  value={config.policies.securityFramework}
                  onChange={(e) => setConfig(prev => ({
                    ...prev,
                    policies: { ...prev.policies, securityFramework: e.target.value }
                  }))}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                >
                  <option>NIST Cybersecurity</option>
                  <option>CIS Controls</option>
                  <option>ISO 27002</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Data Retention Period
                </label>
                <select
                  value={config.policies.dataRetention}
                  onChange={(e) => setConfig(prev => ({
                    ...prev,
                    policies: { ...prev.policies, dataRetention: e.target.value }
                  }))}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                >
                  <option>1 year</option>
                  <option>2 years</option>
                  <option>5 years</option>
                  <option>7 years</option>
                </select>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-200">
            <div className="flex items-center space-x-2 mb-4">
              <Settings className="h-5 w-5 text-indigo-600" />
              <h3 className="text-lg font-semibold text-gray-900">Runtime Parameters</h3>
            </div>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Container Runtime
                </label>
                <select
                  value={config.runtime.containerRuntime}
                  onChange={(e) => setConfig(prev => ({
                    ...prev,
                    runtime: { ...prev.runtime, containerRuntime: e.target.value }
                  }))}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                >
                  <option>Kubernetes</option>
                  <option>Docker Swarm</option>
                  <option>OpenShift</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  API Gateway
                </label>
                <select
                  value={config.runtime.apiGateway}
                  onChange={(e) => setConfig(prev => ({
                    ...prev,
                    runtime: { ...prev.runtime, apiGateway: e.target.value }
                  }))}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                >
                  <option>Kong Enterprise</option>
                  <option>AWS API Gateway</option>
                  <option>Azure API Management</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Default Oversight Mode
                </label>
                <select
                  value={config.runtime.defaultOversightMode}
                  onChange={(e) => setConfig(prev => ({
                    ...prev,
                    runtime: { ...prev.runtime, defaultOversightMode: e.target.value as any }
                  }))}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                >
                  <option value="Autonomous">Autonomous</option>
                  <option value="HITL">Human-in-the-Loop</option>
                  <option value="HOTL">Human-on-the-Loop</option>
                </select>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="flex justify-end">
        <button
          onClick={handleSave}
          className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition-colors font-medium flex items-center space-x-2"
        >
          <Save className="h-4 w-4" />
          <span>Save Global Configuration</span>
        </button>
      </div>
    </div>
  );
};
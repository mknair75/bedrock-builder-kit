import { AOFunction, TMFApi, ExecutionEvent } from '../types';

export const mockAOFunctions: AOFunction[] = [
  {
    id: '1',
    name: 'Order Fallout Manager',
    domain: 'Order Handling',
    capability: 'Closed Loop: Jeopardy Management',
    version: '2.1.0',
    provider: 'TelecomCorp',
    price: '$0.05/execution',
    description: 'Detects, classifies, and resolves failed orders automatically',
    longDescription: 'The Order Fallout Manager provides intelligent order failure detection and resolution capabilities. It monitors order processing pipelines in real-time, automatically classifies failure types, and applies appropriate remediation strategies to minimize customer impact and revenue loss.',
    useCases: [
      'Automatic retry of failed payment processing',
      'Intelligent routing around network outages',
      'Dynamic inventory reallocation for out-of-stock items',
      'Escalation to human agents for complex scenarios'
    ],
    dependencies: {
      digitalTwins: ['Order Processing Twin', 'Inventory Twin'],
      aiModels: ['Failure Classification Model', 'Resolution Strategy Model'],
      solvers: ['Order Optimization Solver'],
      apis: ['Payment Gateway API', 'Inventory Management API'],
      policies: ['Order SLA Policy', 'Customer Priority Policy'],
      eventStreams: ['Order Events', 'Payment Events']
    },
    performance: {
      kei: ['Order Success Rate', 'Mean Time to Resolution'],
      kci: ['Detection Accuracy', 'Resolution Effectiveness'],
      kbi: ['Revenue Recovery Rate', 'Customer Satisfaction Impact']
    },
    runtimeModes: ['Autonomous', 'HITL', 'HOTL'],
    status: 'Active',
    currentMode: 'Autonomous',
    executionMetrics: {
      frequency: 1247,
      successRate: 94.2,
      avgExecutionTime: 2.3
    }
  },
  {
    id: '2',
    name: 'FinOps Optimizer',
    domain: 'FinOps',
    capability: 'Cost Management & Optimization',
    version: '1.8.2',
    provider: 'CloudTech Solutions',
    price: '$0.02/optimization',
    description: 'Manages cloud and IT spend against budget constraints',
    longDescription: 'FinOps Optimizer continuously monitors cloud resource usage and costs, automatically adjusting resource allocation to optimize spend while maintaining performance requirements. It provides intelligent budget management and cost forecasting capabilities.',
    useCases: [
      'Automatic scaling down of non-critical resources during off-peak hours',
      'Budget threshold alerts and automatic cost containment',
      'Resource rightsizing recommendations',
      'Multi-cloud cost optimization strategies'
    ],
    dependencies: {
      digitalTwins: ['Cloud Infrastructure Twin', 'Application Twin'],
      aiModels: ['Cost Prediction Model', 'Usage Pattern Model'],
      solvers: ['Resource Allocation Solver'],
      apis: ['AWS Cost API', 'Azure Billing API', 'GCP Billing API'],
      policies: ['Budget Policy', 'Performance SLA Policy'],
      eventStreams: ['Resource Usage Events', 'Billing Events']
    },
    performance: {
      kei: ['Cost Reduction %', 'Budget Adherence'],
      kci: ['Prediction Accuracy', 'Optimization Effectiveness'],
      kbi: ['Total Cost Savings', 'ROI Improvement']
    },
    runtimeModes: ['Autonomous', 'HITL'],
    status: 'Active',
    currentMode: 'HITL',
    executionMetrics: {
      frequency: 892,
      successRate: 97.8,
      avgExecutionTime: 4.1
    }
  },
  {
    id: '3',
    name: 'Network Capacity Optimizer',
    domain: 'Network Ops',
    capability: 'Capacity Planning & Load Balancing',
    version: '3.0.1',
    provider: 'NetFlow Dynamics',
    price: '$0.08/optimization',
    description: 'Balances service demand with capacity constraints',
    longDescription: 'Network Capacity Optimizer provides intelligent network resource management by continuously monitoring traffic patterns, predicting demand spikes, and automatically adjusting network configurations to maintain optimal performance while minimizing costs.',
    useCases: [
      'Dynamic bandwidth allocation during peak usage',
      'Predictive scaling before traffic spikes',
      'Load balancing across network nodes',
      'Quality of service enforcement'
    ],
    dependencies: {
      digitalTwins: ['Network Infrastructure Twin', 'Traffic Pattern Twin'],
      aiModels: ['Traffic Prediction Model', 'Capacity Planning Model'],
      solvers: ['Network Optimization Solver'],
      apis: ['Network Management API', 'Traffic Analytics API'],
      policies: ['QoS Policy', 'Capacity Policy'],
      eventStreams: ['Network Events', 'Traffic Events']
    },
    performance: {
      kei: ['Network Utilization Efficiency', 'Response Time'],
      kci: ['Prediction Accuracy', 'Load Distribution Effectiveness'],
      kbi: ['Service Quality Score', 'Infrastructure Cost Efficiency']
    },
    runtimeModes: ['Autonomous', 'HITL', 'HOTL'],
    status: 'Deployed',
    currentMode: 'Autonomous',
    executionMetrics: {
      frequency: 2156,
      successRate: 91.5,
      avgExecutionTime: 1.8
    }
  },
  {
    id: '4',
    name: 'Sales Quote Personalizer',
    domain: 'SalesOps',
    capability: 'Quote Generation & Optimization',
    version: '1.5.0',
    provider: 'SalesTech AI',
    price: '$0.15/quote',
    description: 'Generates optimized customer quotes using AI',
    longDescription: 'Sales Quote Personalizer leverages customer data, market intelligence, and pricing models to generate highly personalized and competitive quotes that maximize both customer satisfaction and revenue potential.',
    useCases: [
      'Dynamic pricing based on customer profile and market conditions',
      'Personalized product recommendations within quotes',
      'Competitive analysis and pricing adjustments',
      'Quote optimization for win probability'
    ],
    dependencies: {
      digitalTwins: ['Customer Twin', 'Product Catalog Twin'],
      aiModels: ['Pricing Optimization Model', 'Customer Preference Model'],
      solvers: ['Quote Optimization Solver'],
      apis: ['CRM API', 'Product Catalog API', 'Pricing API'],
      policies: ['Pricing Policy', 'Discount Policy'],
      eventStreams: ['Customer Events', 'Sales Events']
    },
    performance: {
      kei: ['Quote Acceptance Rate', 'Quote Generation Time'],
      kci: ['Personalization Accuracy', 'Pricing Competitiveness'],
      kbi: ['Revenue per Quote', 'Customer Satisfaction Score']
    },
    runtimeModes: ['HITL', 'HOTL'],
    status: 'Active',
    currentMode: 'HITL',
    executionMetrics: {
      frequency: 634,
      successRate: 88.9,
      avgExecutionTime: 3.7
    }
  },
  {
    id: '5',
    name: 'Campaign Optimizer',
    domain: 'MarketingOps',
    capability: 'Marketing Campaign Management',
    version: '2.3.1',
    provider: 'MarketAI Systems',
    price: '$0.03/optimization',
    description: 'Tunes marketing campaigns for better ROI',
    longDescription: 'Campaign Optimizer uses machine learning to continuously optimize marketing campaigns across multiple channels, adjusting targeting, bidding, and creative elements to maximize return on investment and campaign effectiveness.',
    useCases: [
      'Real-time bid optimization for digital advertising',
      'Dynamic audience targeting adjustments',
      'Creative performance optimization',
      'Multi-channel campaign coordination'
    ],
    dependencies: {
      digitalTwins: ['Campaign Twin', 'Customer Segment Twin'],
      aiModels: ['Campaign Performance Model', 'Audience Targeting Model'],
      solvers: ['Campaign Optimization Solver'],
      apis: ['Ad Platform APIs', 'Analytics API', 'Customer Data API'],
      policies: ['Budget Policy', 'Brand Safety Policy'],
      eventStreams: ['Campaign Events', 'Engagement Events']
    },
    performance: {
      kei: ['Campaign ROI', 'Conversion Rate'],
      kci: ['Targeting Accuracy', 'Optimization Speed'],
      kbi: ['Revenue Attribution', 'Customer Acquisition Cost']
    },
    runtimeModes: ['Autonomous', 'HITL'],
    status: 'Active',
    currentMode: 'Autonomous',
    executionMetrics: {
      frequency: 1568,
      successRate: 92.7,
      avgExecutionTime: 2.9
    }
  },
  {
    id: '6',
    name: 'SLA Manager',
    domain: 'SLA',
    capability: 'Service Level Agreement Enforcement',
    version: '2.0.0',
    provider: 'ServiceGuard Inc',
    price: '$0.04/check',
    description: 'Enforces service-level objectives across customers',
    longDescription: 'SLA Manager continuously monitors service performance against defined service level agreements, automatically triggering remediation actions when SLA violations are detected or predicted, ensuring consistent service quality delivery.',
    useCases: [
      'Proactive SLA violation prevention',
      'Automatic service recovery orchestration',
      'Customer-specific SLA enforcement',
      'Performance degradation early warning'
    ],
    dependencies: {
      digitalTwins: ['Service Performance Twin', 'Customer SLA Twin'],
      aiModels: ['SLA Prediction Model', 'Performance Anomaly Model'],
      solvers: ['Service Recovery Solver'],
      apis: ['Monitoring API', 'Service Management API'],
      policies: ['SLA Policy', 'Recovery Policy'],
      eventStreams: ['Service Events', 'Performance Events']
    },
    performance: {
      kei: ['SLA Compliance Rate', 'Recovery Time'],
      kci: ['Violation Prediction Accuracy', 'Recovery Success Rate'],
      kbi: ['Customer Satisfaction', 'Penalty Avoidance']
    },
    runtimeModes: ['Autonomous', 'HITL', 'HOTL'],
    status: 'Active',
    currentMode: 'HITL',
    executionMetrics: {
      frequency: 3421,
      successRate: 96.1,
      avgExecutionTime: 1.2
    }
  },
  {
    id: '7',
    name: 'Network Energy Saver',
    domain: 'Sustainability',
    capability: 'Energy Optimization',
    version: '1.2.0',
    provider: 'GreenTech Solutions',
    price: '$0.01/optimization',
    description: 'Reduces energy use during off-peak hours',
    longDescription: 'Network Energy Saver implements intelligent energy management strategies for network infrastructure, automatically reducing power consumption during off-peak periods while maintaining service quality and availability requirements.',
    useCases: [
      'Dynamic power scaling based on traffic patterns',
      'Intelligent sleep mode scheduling for network equipment',
      'Green routing optimization for reduced energy consumption',
      'Carbon footprint tracking and reporting'
    ],
    dependencies: {
      digitalTwins: ['Network Infrastructure Twin', 'Energy Consumption Twin'],
      aiModels: ['Energy Prediction Model', 'Traffic Pattern Model'],
      solvers: ['Energy Optimization Solver'],
      apis: ['Power Management API', 'Environmental API'],
      policies: ['Sustainability Policy', 'Performance Policy'],
      eventStreams: ['Energy Events', 'Environmental Events']
    },
    performance: {
      kei: ['Energy Reduction %', 'Carbon Footprint Reduction'],
      kci: ['Optimization Accuracy', 'Service Impact'],
      kbi: ['Cost Savings', 'ESG Score Improvement']
    },
    runtimeModes: ['Autonomous', 'HITL'],
    status: 'Deployed',
    currentMode: 'Autonomous',
    executionMetrics: {
      frequency: 1834,
      successRate: 89.3,
      avgExecutionTime: 3.5
    }
  }
];

export const mockTMFApis: TMFApi[] = [
  {
    id: 'tmf622',
    name: 'TMF622 Product Ordering',
    specification: 'Product Ordering Management',
    version: '4.0.0',
    description: 'Manage product ordering lifecycle'
  },
  {
    id: 'tmf641',
    name: 'TMF641 Service Ordering',
    specification: 'Service Ordering Management',
    version: '4.0.0',
    description: 'Handle service provisioning and ordering'
  },
  {
    id: 'tmf648',
    name: 'TMF648 Performance Management',
    specification: 'Performance Management',
    version: '4.0.0',
    description: 'Monitor and manage service performance'
  },
  {
    id: 'tmf678',
    name: 'TMF678 Customer Management',
    specification: 'Customer Management',
    version: '4.0.0',
    description: 'Comprehensive customer data management'
  },
  {
    id: 'tmf688',
    name: 'TMF688 Event Management',
    specification: 'Event Management',
    version: '4.0.0',
    description: 'Event handling and notification management'
  }
];

export const mockODAComponents = [
  {
    id: 'oda-1',
    name: 'Product Catalog Management',
    specification: 'ODA Product Catalog',
    version: '1.0.0',
    description: 'Manage product catalog and offerings'
  },
  {
    id: 'oda-2',
    name: 'Product Inventory Management',
    specification: 'ODA Product Inventory',
    version: '1.0.0',
    description: 'Track and manage product inventory levels'
  },
  {
    id: 'oda-3',
    name: 'Service Catalog Management',
    specification: 'ODA Service Catalog',
    version: '1.0.0',
    description: 'Manage service catalog and definitions'
  },
  {
    id: 'oda-4',
    name: 'Service Inventory Management',
    specification: 'ODA Service Inventory',
    version: '1.0.0',
    description: 'Track and manage service instances'
  },
  {
    id: 'oda-5',
    name: 'Resource Catalog Management',
    specification: 'ODA Resource Catalog',
    version: '1.0.0',
    description: 'Manage resource catalog and specifications'
  },
  {
    id: 'oda-6',
    name: 'Resource Inventory Management',
    specification: 'ODA Resource Inventory',
    version: '1.0.0',
    description: 'Track and manage resource inventory'
  }
];

export const mockCAMARAApis = [
  {
    id: 'camara-1',
    name: 'Device Location',
    specification: 'CAMARA Device Location',
    version: '0.3.0',
    description: 'Retrieve device location information'
  },
  {
    id: 'camara-2',
    name: 'Quality on Demand',
    specification: 'CAMARA QoD',
    version: '0.10.0',
    description: 'Request network quality of service'
  },
  {
    id: 'camara-3',
    name: 'SIM Swap',
    specification: 'CAMARA SIM Swap',
    version: '0.4.0',
    description: 'Detect SIM swap events for security'
  },
  {
    id: 'camara-4',
    name: 'Device Status',
    specification: 'CAMARA Device Status',
    version: '0.5.0',
    description: 'Check device connectivity status'
  },
  {
    id: 'camara-5',
    name: 'Number Verification',
    specification: 'CAMARA Number Verification',
    version: '0.3.0',
    description: 'Verify phone number ownership'
  }
];

export const mockExecutionEvents: ExecutionEvent[] = [
  {
    id: '1',
    functionId: '1',
    timestamp: new Date(Date.now() - 300000),
    status: 'completed',
    step: 'Resolution Applied',
    duration: 2.1,
    keiValues: { 'Order Success Rate': 94.5, 'MTTR': 2.1 }
  },
  {
    id: '2',
    functionId: '2',
    timestamp: new Date(Date.now() - 180000),
    status: 'running',
    step: 'Analyzing Usage Patterns',
    duration: 1.8,
    keiValues: { 'Cost Reduction': 12.3, 'Budget Adherence': 98.7 }
  },
  {
    id: '3',
    functionId: '3',
    timestamp: new Date(Date.now() - 120000),
    status: 'completed',
    step: 'Load Balancing Applied',
    duration: 1.5,
    keiValues: { 'Utilization Efficiency': 87.2, 'Response Time': 45 }
  }
];

export const domains = [
  'All Domains',
  'Order Handling',
  'FinOps',
  'Network Ops',
  'MarketingOps',
  'SalesOps',
  'SLA',
  'Sustainability'
];
// Modern theme configuration
export const modernTheme = 'theme-modern';

// Color palette
export const colors = {
  primary: {
    50: '#f3f4ff',
    100: '#e8eaff',
    500: '#8b5cf6',
    600: '#7c3aed',
    700: '#6d28d9',
    900: '#4c1d95',
  },
  gray: {
    50: '#f9fafb',
    100: '#f3f4f6',
    200: '#e5e7eb',
    300: '#d1d5db',
    400: '#9ca3af',
    500: '#6b7280',
    600: '#4b5563',
    700: '#374151',
    800: '#1f2937',
    900: '#111827',
  },
  green: {
    50: '#f0fdf4',
    100: '#dcfce7',
    500: '#22c55e',
    600: '#16a34a',
  },
  yellow: {
    50: '#fefce8',
    100: '#fef3c7',
    500: '#eab308',
    600: '#ca8a04',
  },
  red: {
    50: '#fef2f2',
    100: '#fee2e2',
    500: '#ef4444',
    600: '#dc2626',
  },
  blue: {
    50: '#eff6ff',
    100: '#dbeafe',
    500: '#3b82f6',
    600: '#2563eb',
  },
};

// Status color mappings
export const statusColors = {
  active: 'bg-green-50 text-green-700 border-green-200',
  draft: 'bg-yellow-50 text-yellow-700 border-yellow-200',
  deployed: 'bg-blue-50 text-blue-700 border-blue-200',
  retired: 'bg-gray-100 text-gray-700 border-gray-200',
  error: 'bg-red-50 text-red-700 border-red-200',
};

// Runtime mode colors
export const runtimeModeColors = {
  Autonomous: 'bg-green-100 text-green-800 border-green-200',
  HITL: 'bg-blue-100 text-blue-800 border-blue-200',
  HOTL: 'bg-purple-100 text-purple-800 border-purple-200',
};
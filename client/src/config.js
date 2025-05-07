// API configuration
export const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000';

// Helper function to get full API URL
export const getApiUrl = (endpoint) => {
    return `${API_URL}${endpoint}`;
}; 
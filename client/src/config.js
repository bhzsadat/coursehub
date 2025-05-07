// API configuration
const API_URL = 'https://coursehub-xpiq.onrender.com';

// Helper function to get full API URL
export const getApiUrl = (endpoint) => {
    return `${API_URL}${endpoint}`;
};

// Default fetch options
export const defaultFetchOptions = {
    method: 'GET',
    headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json'
    }
}; 
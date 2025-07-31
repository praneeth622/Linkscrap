import { API_CONFIG, getCurrentConfig } from './config.js';

class ApiClient {
  constructor() {
    this.config = getCurrentConfig();
  }

  // Get authentication headers (LinkedIn backend doesn't require Supabase auth)
  async getAuthHeaders() {
    return {
      'Content-Type': 'application/json',
      'Accept': 'application/json'
    };
  }

  // Generic request method with retry logic
  async request(endpoint, options = {}) {
    const url = `${this.config.baseUrl}${endpoint}`;
    let lastError;

    for (let attempt = 1; attempt <= this.config.retryAttempts; attempt++) {
      try {
        const headers = await this.getAuthHeaders();
        
        const config = {
          headers: {
            ...headers,
            ...options.headers
          },
          timeout: this.config.timeout,
          ...options
        };

        const response = await fetch(url, config);
        const data = await response.json();

        if (!response.ok) {
          throw new Error(data.message || `HTTP error! status: ${response.status}`);
        }

        return data;
      } catch (error) {
        lastError = error;
        console.error(`API request failed (attempt ${attempt}/${this.config.retryAttempts}):`, error);
        
        // Don't retry on client errors (4xx)
        if (error.message.includes('HTTP error! status: 4')) {
          throw error;
        }
        
        // Wait before retrying (exponential backoff)
        if (attempt < this.config.retryAttempts) {
          await new Promise(resolve => setTimeout(resolve, Math.pow(2, attempt) * 1000));
        }
      }
    }

    throw lastError;
  }

  // HTTP methods
  async get(endpoint, params = {}) {
    const queryString = new URLSearchParams(params).toString();
    const url = queryString ? `${endpoint}?${queryString}` : endpoint;
    return this.request(url, { method: 'GET' });
  }

  async post(endpoint, body) {
    return this.request(endpoint, {
      method: 'POST',
      body: JSON.stringify(body)
    });
  }

  async put(endpoint, body) {
    return this.request(endpoint, {
      method: 'PUT',
      body: JSON.stringify(body)
    });
  }

  async delete(endpoint) {
    return this.request(endpoint, { method: 'DELETE' });
  }

  // Health check
  async checkHealth() {
    try {
      const response = await this.get(API_CONFIG.endpoints.health);
      return {
        healthy: true,
        response
      };
    } catch (error) {
      return {
        healthy: false,
        error: error.message
      };
    }
  }
}

// Create singleton instance
const apiClient = new ApiClient();

// Error handling utility
export function handleApiError(error, context = '') {
  console.error(`API Error ${context}:`, error);
  
  const errorMessages = {
    'Network Error': 'Unable to connect to the server. Please check your internet connection.',
    'HTTP error! status: 400': 'Invalid request data. Please check your input.',
    'HTTP error! status: 401': 'Unauthorized request.',
    'HTTP error! status: 403': 'Access denied.',
    'HTTP error! status: 404': 'Resource not found.',
    'HTTP error! status: 500': 'Server error. Please try again later.',
    'HTTP error! status: 502': 'BrightData API error. Please try again later.',
    'HTTP error! status: 503': 'Service temporarily unavailable.'
  };
  
  const userMessage = errorMessages[error.message] || error.message || 'An unexpected error occurred.';
  
  return {
    success: false,
    error: userMessage,
    originalError: error
  };
}

// Input validation utilities
export function validateLinkedInUrls(urls) {
  const errors = [];
  
  if (!Array.isArray(urls) || urls.length === 0) {
    errors.push('URLs must be a non-empty array');
    return errors;
  }
  
  if (urls.length > 100) {
    errors.push('Maximum 100 URLs allowed per request');
  }
  
  urls.forEach((url, index) => {
    if (typeof url !== 'string') {
      errors.push(`URL at index ${index} must be a string`);
    } else if (url.length > 500) {
      errors.push(`URL at index ${index} is too long (max 500 characters)`);
    } else if (!url.includes('linkedin.com')) {
      errors.push(`URL at index ${index} must be a LinkedIn URL`);
    }
  });
  
  return errors;
}

export function validateJobSearchParams(searches) {
  const errors = [];
  
  if (!Array.isArray(searches) || searches.length === 0) {
    errors.push('Searches must be a non-empty array');
    return errors;
  }
  
  searches.forEach((search, index) => {
    if (!search.location) {
      errors.push(`Search at index ${index} must have a location`);
    }
    if (!search.keyword) {
      errors.push(`Search at index ${index} must have a keyword`);
    }
  });
  
  return errors;
}

export default apiClient;

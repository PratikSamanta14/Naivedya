const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:3001';

// Generic API request function
const apiRequest = async (endpoint: string, options: RequestInit = {}) => {
  const token = localStorage.getItem('token');
  
  const config: RequestInit = {
    headers: {
      'Content-Type': 'application/json',
      ...(token && { Authorization: `Bearer ${token}` }),
      ...options.headers,
    },
    ...options,
  };

  const response = await fetch(`${API_BASE_URL}${endpoint}`, config);
  
  if (!response.ok) {
    const error = await response.json();
    throw new Error(error.error || 'API request failed');
  }
  
  return response.json();
};

// Auth API
export const authAPI = {
  register: (userData: { name: string; email: string; password: string }) =>
    apiRequest('/api/auth/register', {
      method: 'POST',
      body: JSON.stringify(userData),
    }),
  
  login: (credentials: { email: string; password: string }) =>
    apiRequest('/api/auth/login', {
      method: 'POST',
      body: JSON.stringify(credentials),
    }),
};

// Products API
export const productsAPI = {
  getAll: (params?: { category?: string; featured?: boolean; limit?: number }) => {
    const queryParams = new URLSearchParams();
    if (params?.category) queryParams.append('category', params.category);
    if (params?.featured) queryParams.append('featured', 'true');
    if (params?.limit) queryParams.append('limit', params.limit.toString());
    
    const query = queryParams.toString() ? `?${queryParams}` : '';
    return apiRequest(`/api/products${query}`);
  },
  
  getById: (id: string) => apiRequest(`/api/products/${id}`),
};

// Categories API
export const categoriesAPI = {
  getAll: () => apiRequest('/api/categories'),
  getBySlug: (slug: string) => apiRequest(`/api/categories/${slug}`),
};

// Pandits API
export const panditsAPI = {
  getAll: () => apiRequest('/api/pandits'),
  getById: (id: string) => apiRequest(`/api/pandits/${id}`),
};

// Orders API
export const ordersAPI = {
  create: (orderData: any) =>
    apiRequest('/api/orders', {
      method: 'POST',
      body: JSON.stringify(orderData),
    }),
  
  getAll: () => apiRequest('/api/orders'),
  getById: (id: string) => apiRequest(`/api/orders/${id}`),
};

// User API
export const userAPI = {
  getProfile: () => apiRequest('/api/user/profile'),
  
  updateProfile: (userData: any) =>
    apiRequest('/api/user/profile', {
      method: 'PUT',
      body: JSON.stringify(userData),
    }),
  
  addToWishlist: (productId: string) =>
    apiRequest(`/api/user/wishlist/${productId}`, {
      method: 'POST',
    }),
  
  removeFromWishlist: (productId: string) =>
    apiRequest(`/api/user/wishlist/${productId}`, {
      method: 'DELETE',
    }),
  
  getWishlist: () => apiRequest('/api/user/wishlist'),
};

// Payment API
export const paymentAPI = {
  createPaymentIntent: (paymentData: { amount: number; currency?: string; customer: any }) =>
    apiRequest('/api/create-payment-intent', {
      method: 'POST',
      body: JSON.stringify(paymentData),
    }),
  
  confirmPayment: (paymentIntentId: string) =>
    apiRequest('/api/confirm-payment', {
      method: 'POST',
      body: JSON.stringify({ paymentIntentId }),
    }),
  
  createRazorpayOrder: (orderData: { amount: number; receipt: string }) =>
    apiRequest('/api/create-razorpay-order', {
      method: 'POST',
      body: JSON.stringify(orderData),
    }),
};

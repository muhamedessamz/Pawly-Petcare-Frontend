const API_URL = 'http://localhost:5044/api';

const handleResponse = async (response) => {
  if (!response.ok) {
    throw new Error('Network response was not ok');
  }
  return response.json();
};

export const api = {
  products: {
    getAll: async () => {
      const response = await fetch(`${API_URL}/products`);
      return handleResponse(response);
    },
    getById: async (id) => {
      const response = await fetch(`${API_URL}/products/${id}`);
      return handleResponse(response);
    },
    create: async (data) => {
      const response = await fetch(`${API_URL}/products`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      });
      return handleResponse(response);
    },
    delete: async (id) => {
      const response = await fetch(`${API_URL}/products/${id}`, {
        method: 'DELETE'
      });
      if (!response.ok) throw new Error('Failed to delete');
      return true;
    }
  },
  doctors: {
    getAll: async () => {
      const response = await fetch(`${API_URL}/doctors`);
      return handleResponse(response);
    },
    getById: async (id) => {
      const response = await fetch(`${API_URL}/doctors/${id}`);
      return handleResponse(response);
    },
    create: async (data) => {
      const response = await fetch(`${API_URL}/doctors`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      });
      return handleResponse(response);
    },
    delete: async (id) => {
      const response = await fetch(`${API_URL}/doctors/${id}`, {
        method: 'DELETE'
      });
      if (!response.ok) throw new Error('Failed to delete');
      return true;
    }
  },
  pets: {
    getAll: async () => {
      const response = await fetch(`${API_URL}/pets`);
      return handleResponse(response);
    },
    getById: async (id) => {
      const response = await fetch(`${API_URL}/pets/${id}`);
      return handleResponse(response);
    },
  },
  blog: {
    getAll: async () => {
      const response = await fetch(`${API_URL}/blog`);
      return handleResponse(response);
    },
    getById: async (id) => {
      const response = await fetch(`${API_URL}/blog/${id}`);
      return handleResponse(response);
    },
  },
  auth: {
    login: async (credentials) => {
      const response = await fetch(`${API_URL}/auth/login`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(credentials),
      });
      // Special case: handle 401
      if (response.status === 401) {
        throw new Error("Invalid credentials");
      }
      return handleResponse(response);
    },
    register: async (userData) => {
      const response = await fetch(`${API_URL}/auth/register`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(userData),
      });
      return handleResponse(response);
    },
  },
  // Admin specific (using other services mostly, but placeholder for stats if added)
  admin: {
    getStats: async () => {
      const response = await fetch(`${API_URL}/admin/stats`);
      return handleResponse(response);
    }
  }
};

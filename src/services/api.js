const API_URL = 'http://pawly-petcare.runasp.net/api';
const SERVER_URL = 'http://pawly-petcare.runasp.net';

// Helper function to get full image URL
export const getImageUrl = (imagePath) => {
  if (!imagePath) return null;
  // If it's already a full URL, return as is
  if (imagePath.startsWith('http')) return imagePath;
  // Otherwise, prepend server URL
  return SERVER_URL + imagePath;
};

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
    getPending: async () => {
      const response = await fetch(`${API_URL}/pets/pending`);
      return handleResponse(response);
    },
    getById: async (id) => {
      const response = await fetch(`${API_URL}/pets/${id}`);
      return handleResponse(response);
    },
    create: async (data) => {
      const response = await fetch(`${API_URL}/pets`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      });
      return handleResponse(response);
    },
    approve: async (id) => {
      const response = await fetch(`${API_URL}/pets/approve/${id}`, {
        method: 'POST'
      });
      if (!response.ok) throw new Error('Failed to approve');
      return true;
    },
    getMy: async (email) => {
      const response = await fetch(`${API_URL}/pets/my-pets?email=${email}`);
      return handleResponse(response);
    }
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
    verifyOtp: async (data) => {
      const response = await fetch(`${API_URL}/auth/verify-otp`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      });
      return handleResponse(response);
    },
    resendOtp: async (email) => {
      const response = await fetch(`${API_URL}/auth/resend-otp`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email }),
      });
      return handleResponse(response);
    },
    forgotPassword: async (email) => {
      const response = await fetch(`${API_URL}/auth/forgot-password`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email }),
      });
      return handleResponse(response);
    },
    resetPassword: async (data) => {
      const response = await fetch(`${API_URL}/auth/reset-password`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      });
      return handleResponse(response);
    },
  },
  // Admin specific (using other services mostly, but placeholder for stats if added)

  user: {
    getProfile: async (email) => {
      const response = await fetch(`${API_URL}/user/profile`, {
        method: 'POST', // Using POST for security/body if needed, or query param
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email })
      });
      return handleResponse(response);
    },
    updateProfile: async (email, formData) => {
      // FormData is handled differently, don't set Content-Type header manually
      const response = await fetch(`${API_URL}/user/profile?email=${email}`, {
        method: 'PUT',
        body: formData, // FormData object
      });
      return handleResponse(response);
    }
  },
  appointments: {
    create: async (data, userEmail) => {
      const response = await fetch(`${API_URL}/appointment`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'X-User-Email': userEmail
        },
        body: JSON.stringify(data)
      });
      return handleResponse(response);
    },
    getMy: async (email) => {
      const response = await fetch(`${API_URL}/appointment/my-appointments?email=${email}`);
      return handleResponse(response);
    },
    getAll: async () => {
      const response = await fetch(`${API_URL}/appointment`);
      return handleResponse(response);
    },
    updateStatus: async (id, status) => {
      const response = await fetch(`${API_URL}/appointment/${id}/status`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ status })
      });
      return handleResponse(response);
    }
  },
  orders: {
    create: async (data, userEmail) => {
      const response = await fetch(`${API_URL}/order`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'X-User-Email': userEmail
        },
        body: JSON.stringify(data)
      });
      return handleResponse(response);
    },
    getMy: async (email) => {
      const response = await fetch(`${API_URL}/order/my-orders?email=${email}`);
      return handleResponse(response);
    }
  },
  admin: {
    getStats: async () => {
      const response = await fetch(`${API_URL}/admin/stats`);
      return handleResponse(response);
    }
  },
  volunteers: {
    create: async (data) => {
      const response = await fetch(`${API_URL}/volunteer`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      });
      return handleResponse(response);
    },
    getAll: async () => {
      const response = await fetch(`${API_URL}/volunteer`);
      return handleResponse(response);
    },
    getMy: async (email) => {
      const response = await fetch(`${API_URL}/volunteer/my-volunteers?email=${email}`);
      return handleResponse(response);
    }
  }
};

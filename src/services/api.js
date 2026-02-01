import products from './mockData/products.json';
import doctors from './mockData/doctors.json';
import pets from './mockData/pets.json';
import blog from './mockData/blog.json';

// Simulate network delay
const delay = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

export const api = {
  products: {
    getAll: async () => {
      await delay(500);
      return products;
    },
    getById: async (id) => {
      await delay(300);
      return products.find((p) => p.id === Number(id));
    },
  },
  doctors: {
    getAll: async () => {
      await delay(500);
      return doctors;
    },
    getById: async (id) => {
      await delay(300);
      return doctors.find((d) => d.id === Number(id));
    },
  },
  pets: {
    getAll: async () => {
      await delay(500);
      return pets;
    },
    getById: async (id) => {
      await delay(300);
      return pets.find((p) => p.id === Number(id));
    },
  },
  blog: {
    getAll: async () => {
      await delay(500);
      return blog;
    },
    getById: async (id) => {
      await delay(300);
      return blog.find((b) => b.id === Number(id));
    },
  },
  auth: {
    login: async (credentials) => {
      await delay(800);
      if (credentials.email === 'admin@pawly.com' && credentials.password === 'admin') {
        return {
          user: { name: 'Admin User', email: 'admin@pawly.com', role: 'admin' },
          token: 'mock-jwt-token',
        };
      }
      return {
        user: { name: 'John Doe', email: credentials.email, role: 'user' },
        token: 'mock-jwt-token',
      };
    },
    register: async (userData) => {
      await delay(800);
      return {
        user: { ...userData, role: 'user' },
        token: 'mock-jwt-token',
      };
    },
  },
};

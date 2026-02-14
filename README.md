# 🐾 Pawly Petcare - Official Website

<div align="center">

![React](https://img.shields.io/badge/React-19.0-61DAFB?style=for-the-badge&logo=react)
![Vite](https://img.shields.io/badge/Vite-6.0-646CFF?style=for-the-badge&logo=vite)
![TailwindCSS](https://img.shields.io/badge/TailwindCSS-4.0-38B2AC?style=for-the-badge&logo=tailwind-css)
![Axios](https://img.shields.io/badge/Axios-HTTP-5A29E4?style=for-the-badge&logo=axios)

**The modern, user-friendly frontend for the Pawly Petcare Platform.**

[Features](#-features) • [Getting Started](#-getting-started) • [Project Structure](#-project-structure) • [Contributing](#-contributing)

</div>

---

## 📋 Table of Contents

- [Overview](#-overview)
- [Features](#-features)
- [Tech Stack](#-tech-stack)
- [Getting Started](#-getting-started)
- [Project Structure](#-project-structure)
- [Key Pages](#-key-pages)
- [Contributing](#-contributing)
- [License](#-license)

---

## 🎯 Overview

The **Pawly Petcare Website** is the client-facing application designed to connect pet lovers with their future companions. It offers a seamless experience for browsing available pets, reading educational blogs, and exploring veterinary services.

### 🌟 Key Enhancements

- **Modern UI/UX**: Built with **TailwindCSS** for a responsive and beautiful design.
- **Fast Performance**: Powered by **Vite** for lightning-fast HMR and builds.
- **Dynamic Content**: Fetches real-time data from the Pawly Backend API.

---

## ✨ Features

### 🐶 Pet Adoption
- **Browse Pets**: Filter available pets by type, breed, and size.
- **Pet Details**: comprehensive profiles with images and backstories.
- **Adoption Request**: Simple form to submit adoption applications.

### 🛒 Shop & Services
- **Product Catalog**: View pet-related products.
- **Doctor Listings**: Find and view profiles of veterinarians.

### 📚 Blog & Education
- **Articles**: Read tips and tricks for pet care.
- **Community**: Engage with content curated by experts.

### 👤 User Account
- **Authentication**: Secure Login and Registration.
- **Profile Management**: View adoption status and history.

---

## 🛠️ Tech Stack

- **Framework**: [React 19](https://react.dev/)
- **Build Tool**: [Vite](https://vitejs.dev/)
- **Styling**: [TailwindCSS v4](https://tailwindcss.com/)
- **Routing**: [React Router DOM](https://reactrouter.com/)
- **HTTP Client**: [Axios](https://axios-http.com/)
- **Icons**: [Lucide React](https://lucide.dev/)
- **Fonts**: [Inter](https://fontsource.org/fonts/inter) & [Outfit](https://fontsource.org/fonts/outfit)

---

## 🚀 Getting Started

### Prerequisites

- **Node.js** (v18 or higher)
- **npm** or **yarn**

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/muhamedessamz/Pawly-Petcare-Frontend.git
   cd Pawly-Petcare-Frontend
   ```

2. **Install Dependencies**
   ```bash
   npm install
   ```

3. **Configure Environment**
   Create a `.env` file in the root directory (if required) to set the API endpoint:
   ```env
   VITE_API_BASE_URL=https://localhost:7194/api
   ```

4. **Start Development Server**
   ```bash
   npm run dev
   ```
   Access the app at `http://localhost:5173`

---

## 📂 Project Structure

```
Pawly-Frontend/Main/
├── src/
│   ├── assets/          # Images, fonts, and global icons
│   ├── components/      # Reusable UI components (Buttons, Cards, Navbar)
│   ├── context/         # React Context (Auth, Global State)
│   ├── pages/           # Page components (Home, Pets, Login)
│   ├── services/        # API service functions (Axios setup)
│   ├── utils/           # Helper functions
│   ├── App.jsx          # Main App component & Routing
│   └── main.jsx         # Entry point
├── public/              # Static assets
├── index.html           # HTML entry point
├── package.json         # Dependencies and scripts
└── vite.config.js       # Vite configuration
```

---

## 🖥️ Key Pages

| Page | Route | Description |
|------|-------|-------------|
| **Home** | `/` | Landing page with featured pets and services. |
| **Pets** | `/pets` | Catalog of all adoptable pets. |
| **Pet Details** | `/pets/:id` | Specific info about a single pet. |
| **Login** | `/login` | User authentication. |
| **Register** | `/register` | New user signup. |

---

## 🤝 Contributing

We welcome contributions! Please follow these steps:

1. Fork the repository.
2. Create a new branch (`git checkout -b feature/AmazingFeature`).
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`).
4. Push to the branch (`git push origin feature/AmazingFeature`).
5. Open a Pull Request.

---

## 📄 License

Distributed under the MIT License. See `LICENSE` for more information.

---

<div align="center">

**Made with ❤️ for Pets**

</div>

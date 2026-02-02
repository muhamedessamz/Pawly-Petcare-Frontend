import { Routes, Route } from 'react-router-dom';
import Layout from './components/layout/Layout';
import ScrollToTop from './components/layout/ScrollToTop';
import Home from './pages/Home';
import Store from './pages/Store';
import ProductDetails from './pages/ProductDetails';
import Clinic from './pages/Clinic';
import DoctorDetails from './pages/DoctorDetails';
import BookAppointment from './pages/BookAppointment';
import Cart from './pages/Cart';
import Login from './pages/Login';
import Register from './pages/Register';
import Dashboard from './pages/Dashboard';
import Grooming from './pages/Grooming';
import Blog from './pages/Blog';
import BlogDetails from './pages/BlogDetails';
import Contact from './pages/Contact';
import Checkout from './pages/Checkout';
import Adoption from './pages/Adoption';
import PetDetails from './pages/PetDetails';
import AdoptionForm from './pages/AdoptionForm';
import './App.css';

import AdminLayout from './components/layout/AdminLayout';
import AdminDashboard from './pages/admin/AdminDashboard';
import ProductsAdmin from './pages/admin/ProductsAdmin';
import DoctorsAdmin from './pages/admin/DoctorsAdmin';
import BlogAdmin from './pages/admin/BlogAdmin';
import VerifyOtp from './pages/VerifyOtp';
import ForgotPassword from './pages/ForgotPassword';
import ResetPassword from './pages/ResetPassword';
import Profile from './pages/Profile';
import ListPet from './pages/ListPet';
import AdoptionRequests from './pages/admin/AdoptionRequests';

function App() {
  return (
    <>
      <ScrollToTop />
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Home />} />
          <Route path="store" element={<Store />} />
          <Route path="products/:id" element={<ProductDetails />} />
          <Route path="clinic" element={<Clinic />} />
          <Route path="doctors/:id" element={<DoctorDetails />} />
          <Route path="adoption" element={<Adoption />} />
          <Route path="list-pet" element={<ListPet />} />
          <Route path="pets/:id" element={<PetDetails />} />
          <Route path="adopt/:id" element={<AdoptionForm />} />
          <Route path="grooming" element={<Grooming />} />
          <Route path="blog" element={<Blog />} />
          <Route path="blog/:id" element={<BlogDetails />} />
          <Route path="contact" element={<Contact />} />
          <Route path="book-appointment/:doctorId" element={<BookAppointment />} />
          <Route path="cart" element={<Cart />} />
          <Route path="checkout" element={<Checkout />} />
          <Route path="login" element={<Login />} />
          <Route path="register" element={<Register />} />
          <Route path="verify-otp" element={<VerifyOtp />} />
          <Route path="forgot-password" element={<ForgotPassword />} />
          <Route path="reset-password" element={<ResetPassword />} />
          <Route path="profile" element={<Profile />} />
          <Route path="dashboard" element={<Dashboard />} />
        </Route>

        {/* Admin Routes */}
        <Route path="/admin" element={<AdminLayout />}>
          <Route index element={<AdminDashboard />} />
          <Route path="products" element={<ProductsAdmin />} />
          <Route path="doctors" element={<DoctorsAdmin />} />
          <Route path="blog" element={<BlogAdmin />} />
          <Route path="adoption-requests" element={<AdoptionRequests />} />
        </Route>
      </Routes>
    </>
  );
}

export default App;

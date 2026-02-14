import { Routes, Route } from 'react-router-dom';
import React, { Suspense } from 'react';
import Layout from './components/layout/Layout';
import ScrollToTop from './components/layout/ScrollToTop';
import './App.css';

// Admin Imports
import AdminLayout from './components/layout/AdminLayout';

// Lazy Load Pages
const Home = React.lazy(() => import('./pages/Home'));
const Store = React.lazy(() => import('./pages/Store'));
const ProductDetails = React.lazy(() => import('./pages/ProductDetails'));
const Clinic = React.lazy(() => import('./pages/Clinic'));
const DoctorDetails = React.lazy(() => import('./pages/DoctorDetails'));
const BookAppointment = React.lazy(() => import('./pages/BookAppointment'));
const Cart = React.lazy(() => import('./pages/Cart'));
const Login = React.lazy(() => import('./pages/Login'));
const Register = React.lazy(() => import('./pages/Register'));
const Dashboard = React.lazy(() => import('./pages/Dashboard'));
const Grooming = React.lazy(() => import('./pages/Grooming'));
const Blog = React.lazy(() => import('./pages/Blog'));
const BlogDetails = React.lazy(() => import('./pages/BlogDetails'));
const Contact = React.lazy(() => import('./pages/Contact'));
const Checkout = React.lazy(() => import('./pages/Checkout'));
const Adoption = React.lazy(() => import('./pages/Adoption'));
const PetDetails = React.lazy(() => import('./pages/PetDetails'));
const AdoptionForm = React.lazy(() => import('./pages/AdoptionForm'));
const OfferPet = React.lazy(() => import('./pages/OfferPet'));
const Volunteer = React.lazy(() => import('./pages/Volunteer'));
const VerifyOtp = React.lazy(() => import('./pages/VerifyOtp'));
const ForgotPassword = React.lazy(() => import('./pages/ForgotPassword'));
const ResetPassword = React.lazy(() => import('./pages/ResetPassword'));
const Profile = React.lazy(() => import('./pages/Profile'));
const ListPet = React.lazy(() => import('./pages/ListPet'));

// Admin Lazy Load
const AdminDashboard = React.lazy(() => import('./pages/admin/AdminDashboard'));
const ProductsAdmin = React.lazy(() => import('./pages/admin/ProductsAdmin'));
const DoctorsAdmin = React.lazy(() => import('./pages/admin/DoctorsAdmin'));
const AppointmentsAdmin = React.lazy(() => import('./pages/admin/AppointmentsAdmin'));
const BlogAdmin = React.lazy(() => import('./pages/admin/BlogAdmin'));
const AdoptionRequests = React.lazy(() => import('./pages/admin/AdoptionRequests'));
const VolunteersAdmin = React.lazy(() => import('./pages/admin/VolunteersAdmin'));

// Loading Fallback Component
const PageLoader = () => (
  <div className="min-h-[60vh] flex items-center justify-center">
    <div className="w-10 h-10 border-4 border-gray-200 border-t-primary rounded-full animate-spin"></div>
  </div>
);

function App() {
  return (
    <>
      <ScrollToTop />
      <Suspense fallback={<PageLoader />}>
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
            <Route path="adoption/offer" element={<OfferPet />} />
            <Route path="adoption/volunteer" element={<Volunteer />} />
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
            <Route path="appointments" element={<AppointmentsAdmin />} />
            <Route path="blog" element={<BlogAdmin />} />
            <Route path="adoption-requests" element={<AdoptionRequests />} />
            <Route path="volunteers" element={<VolunteersAdmin />} />
          </Route>
        </Routes>
      </Suspense>
    </>
  );
}

export default App;

import React from 'react';
import { Outlet, Link, useLocation } from 'react-router-dom';
import { LayoutDashboard, Package, Stethoscope, Users, Settings, LogOut, BookOpen, Heart, Calendar, Hand } from 'lucide-react';

const AdminLayout = () => {
    const location = useLocation();

    const isActive = (path) => {
        return location.pathname === path ? 'bg-primary text-white' : 'text-gray-500 hover:bg-gray-100';
    };

    return (
        <div className="flex h-screen bg-gray-50">
            {/* Sidebar */}
            <aside className="w-64 bg-white border-r border-gray-200 hidden md:flex flex-col">
                <div className="p-6 border-b border-gray-100">
                    <Link to="/" className="flex items-center gap-2">
                        <div className="h-8 w-8 bg-primary rounded-xl flex items-center justify-center">
                            <span className="text-white font-black text-xl">P</span>
                        </div>
                        <span className="text-xl font-black text-gray-900 tracking-tight">Pawly Admin</span>
                    </Link>
                </div>

                <nav className="flex-1 p-4 space-y-2 overflow-y-auto">
                    <p className="px-4 text-xs font-bold text-gray-400 uppercase tracking-widest mb-2 mt-4">Overview</p>

                    <Link to="/admin" className={`flex items-center gap-3 px-4 py-3 rounded-xl font-bold transition-colors ${isActive('/admin')}`}>
                        <LayoutDashboard size={20} /> Dashboard
                    </Link>

                    <p className="px-4 text-xs font-bold text-gray-400 uppercase tracking-widest mb-2 mt-6">Management</p>

                    <Link to="/admin/products" className={`flex items-center gap-3 px-4 py-3 rounded-xl font-bold transition-colors ${isActive('/admin/products')}`}>
                        <Package size={20} /> Products
                    </Link>

                    <Link to="/admin/doctors" className={`flex items-center gap-3 px-4 py-3 rounded-xl font-bold transition-colors ${isActive('/admin/doctors')}`}>
                        <Stethoscope size={20} /> Doctors
                    </Link>

                    <Link to="/admin/appointments" className={`flex items-center gap-3 px-4 py-3 rounded-xl font-bold transition-colors ${isActive('/admin/appointments')}`}>
                        <Calendar size={20} /> Appointments
                    </Link>

                    <Link to="/admin/blog" className={`flex items-center gap-3 px-4 py-3 rounded-xl font-bold transition-colors ${isActive('/admin/blog')}`}>
                        <BookOpen size={20} /> Blog & Articles
                    </Link>

                    <Link to="/admin/adoption-requests" className={`flex items-center gap-3 px-4 py-3 rounded-xl font-bold transition-colors ${isActive('/admin/adoption-requests')}`}>
                        <Heart size={20} /> Adoption Requests
                    </Link>

                    <Link to="/admin/users" className={`flex items-center gap-3 px-4 py-3 rounded-xl font-bold transition-colors ${isActive('/admin/users')}`}>
                        <Users size={20} /> Users
                    </Link>

                    <Link to="/admin/volunteers" className={`flex items-center gap-3 px-4 py-3 rounded-xl font-bold transition-colors ${isActive('/admin/volunteers')}`}>
                        <Hand size={20} /> Volunteers
                    </Link>

                    <p className="px-4 text-xs font-bold text-gray-400 uppercase tracking-widest mb-2 mt-6">Settings</p>

                    <Link to="/admin/settings" className={`flex items-center gap-3 px-4 py-3 rounded-xl font-bold transition-colors ${isActive('/admin/settings')}`}>
                        <Settings size={20} /> Settings
                    </Link>
                </nav>

                <div className="p-4 border-t border-gray-100">
                    <button className="flex items-center gap-3 px-4 py-3 rounded-xl font-bold text-red-500 hover:bg-red-50 w-full transition-colors">
                        <LogOut size={20} /> Logout
                    </button>
                </div>
            </aside>

            {/* Main Content */}
            <main className="flex-1 overflow-auto">
                <div className="p-8">
                    <Outlet />
                </div>
            </main>
        </div>
    );
};

export default AdminLayout;

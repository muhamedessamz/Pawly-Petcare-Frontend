import React, { useEffect, useState } from 'react';
import { ShoppingBag, Users, Activity, DollarSign, Heart } from 'lucide-react';
import { api } from '../../services/api';

const StatCard = ({ title, value, icon: Icon, color }) => (
    <div className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm flex items-center gap-4">
        <div className={`h-12 w-12 rounded-xl flex items-center justify-center ${color}`}>
            <Icon size={24} className="text-white" />
        </div>
        <div>
            <p className="text-gray-500 text-sm font-bold uppercase tracking-wide">{title}</p>
            <p className="text-2xl font-black text-gray-900">{value}</p>
        </div>
    </div>
);

const AdminDashboard = () => {
    const [stats, setStats] = useState({
        products: 0,
        doctors: 0,
        users: 0,
        orders: 0,
        pendingRequests: 0
    });

    useEffect(() => {
        // Fetch stats from API in real implementation
        // For now, allow mock data or simple counts if available
        const fetchStats = async () => {
            // Simulating for now or fetching if endpoints ready
            try {
                // In a real scenario, we might have a dashboard stats endpoint
                // const data = await api.admin.getStats();
                // setStats(data);

                // Fallback for now using basic gets if stats endpoint not in api.js yet
                const products = await api.products.getAll();
                const doctors = await api.doctors.getAll();
                const pendingPets = await api.pets.getPending();

                setStats({
                    products: products.length,
                    doctors: doctors.length,
                    users: 245, // Mock
                    orders: 12,   // Mock
                    pendingRequests: pendingPets.length
                });
            } catch (e) {
                console.error("Failed to load stats", e);
            }
        };
        fetchStats();
    }, []);

    return (
        <div className="space-y-8">
            <div>
                <h1 className="text-3xl font-black text-gray-900">Dashboard Overview</h1>
                <p className="text-gray-500 font-medium">Welcome back, Admin.</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                <StatCard title="Total Products" value={stats.products} icon={ShoppingBag} color="bg-primary" />
                <StatCard title="Total Doctors" value={stats.doctors} icon={Activity} color="bg-health" />
                <StatCard title="Total Users" value={stats.users} icon={Users} color="bg-playful" />
                <StatCard title="Total Orders" value={stats.orders} icon={DollarSign} color="bg-yellow-500" />
                <StatCard title="Pending Adoption Requests" value={stats.pendingRequests} icon={Heart} color="bg-orange-500" />
            </div>

            {/* Recent Activity or Charts could go here */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                <div className="bg-white p-6 rounded-3xl border border-gray-100 shadow-sm h-64 flex items-center justify-center text-gray-400 font-medium">
                    Sales Chart Placeholder
                </div>
                <div className="bg-white p-6 rounded-3xl border border-gray-100 shadow-sm h-64 flex items-center justify-center text-gray-400 font-medium">
                    Recent Orders Placeholder
                </div>
            </div>
        </div>
    );
};

export default AdminDashboard;

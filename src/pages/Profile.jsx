import React, { useState, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';
import { api } from '../services/api';
import Button from '../components/ui/Button';
import Input from '../components/ui/Input';
import { Card } from '../components/ui/Card';
import { User, Mail, Phone, MapPin, Camera, Save, LogOut, Calendar, Package, Clock, CheckCircle, XCircle } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const Profile = () => {
    const { user, logout, updateUser } = useAuth();
    const navigate = useNavigate();
    const [loading, setLoading] = useState(false);
    const [activeTab, setActiveTab] = useState('profile');
    const [profile, setProfile] = useState({
        name: '',
        username: '',
        phoneNumber: '',
        address: '',
        profilePictureUrl: ''
    });
    const [imageFile, setImageFile] = useState(null);
    const [previewUrl, setPreviewUrl] = useState('');
    const [appointments, setAppointments] = useState([]);
    const [orders, setOrders] = useState([]);

    useEffect(() => {
        if (!user) {
            navigate('/login');
            return;
        }

        const fetchData = async () => {
            try {
                const data = await api.user.getProfile(user.email);
                setProfile({
                    name: data.name || '',
                    username: data.username || '',
                    phoneNumber: data.phoneNumber || '',
                    address: data.address || '',
                    profilePictureUrl: data.profilePictureUrl || ''
                });
                if (data.profilePictureUrl) {
                    setPreviewUrl(`http://pawly-petcare.runasp.net${data.profilePictureUrl}`);
                }

                // Fetch appointments and orders
                const [appointmentsData, ordersData] = await Promise.all([
                    api.appointments.getMy(user.email),
                    api.orders.getMy(user.email)
                ]);
                setAppointments(appointmentsData);
                setOrders(ordersData);
            } catch (err) {
                console.error("Failed to fetch data", err);
            }
        };

        fetchData();
    }, [user, navigate]);

    const handleImageChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            setImageFile(file);
            setPreviewUrl(URL.createObjectURL(file));
        }
    };

    const handleSave = async (e) => {
        e.preventDefault();
        setLoading(true);
        try {
            const formData = new FormData();
            formData.append('name', profile.name);
            formData.append('phoneNumber', profile.phoneNumber);
            formData.append('address', profile.address);
            if (imageFile) {
                formData.append('profilePicture', imageFile);
            }

            const updatedProfile = await api.user.updateProfile(user.email, formData);
            updateUser(updatedProfile);
            alert('Profile updated successfully!');

            if (updatedProfile.profilePictureUrl) {
                setPreviewUrl(`http://pawly-petcare.runasp.net${updatedProfile.profilePictureUrl}`);
            }
        } catch (err) {
            console.error(err);
            alert('Failed to update profile.');
        } finally {
            setLoading(false);
        }
    };

    const getStatusBadge = (status) => {
        const styles = {
            Pending: 'bg-yellow-100 text-yellow-800',
            Confirmed: 'bg-blue-100 text-blue-800',
            Completed: 'bg-blue-100 text-blue-800',
            Cancelled: 'bg-red-100 text-red-800',
            Processing: 'bg-blue-100 text-blue-800',
            Shipped: 'bg-purple-100 text-purple-800',
            Delivered: 'bg-blue-100 text-blue-800'
        };
        return (
            <span className={`px-3 py-1 rounded-full text-xs font-bold ${styles[status] || 'bg-gray-100 text-gray-800'}`}>
                {status}
            </span>
        );
    };

    if (!user) return null;

    return (
        <div className="max-w-6xl mx-auto px-4 py-12">
            <h1 className="text-4xl font-black mb-8">My Account</h1>

            <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
                {/* Sidebar */}
                <div className="lg:col-span-1 space-y-6">
                    <Card className="p-6 text-center">
                        <div className="relative inline-block mb-4">
                            <div className="h-32 w-32 rounded-full overflow-hidden bg-gray-100 mx-auto border-4 border-white shadow-lg">
                                {previewUrl ? (
                                    <img src={previewUrl} alt="Profile" className="w-full h-full object-cover" />
                                ) : (
                                    <div className="h-full w-full flex items-center justify-center text-gray-300">
                                        <User size={48} />
                                    </div>
                                )}
                            </div>
                            {activeTab === 'profile' && (
                                <label className="absolute bottom-0 right-0 bg-primary text-white p-2 rounded-full cursor-pointer shadow-md hover:bg-primary/90 transition-colors">
                                    <Camera size={16} />
                                    <input type="file" accept="image/*" className="hidden" onChange={handleImageChange} />
                                </label>
                            )}
                        </div>

                        <h2 className="text-xl font-bold">{user.name}</h2>
                        <p className="text-primary text-sm font-bold">@{profile.username || user.username || 'username'}</p>

                        <div className="mt-6 pt-6 border-t border-gray-100 space-y-2">
                            <Button
                                variant={activeTab === 'profile' ? 'primary' : 'ghost'}
                                onClick={() => setActiveTab('profile')}
                                className="w-full justify-start"
                            >
                                <User size={16} className="mr-2" /> Profile
                            </Button>
                            <Button
                                variant={activeTab === 'appointments' ? 'primary' : 'ghost'}
                                onClick={() => setActiveTab('appointments')}
                                className="w-full justify-start"
                            >
                                <Calendar size={16} className="mr-2" /> Appointments
                            </Button>
                            <Button
                                variant={activeTab === 'orders' ? 'primary' : 'ghost'}
                                onClick={() => setActiveTab('orders')}
                                className="w-full justify-start"
                            >
                                <Package size={16} className="mr-2" /> Orders
                            </Button>
                            <Button variant="outline" onClick={logout} className="w-full text-red-500 border-red-100 hover:bg-red-50 justify-start">
                                <LogOut size={16} className="mr-2" /> Sign Out
                            </Button>
                        </div>
                    </Card>
                </div>

                {/* Main Content */}
                <div className="lg:col-span-3">
                    {activeTab === 'profile' && (
                        <Card className="p-8">
                            <h2 className="text-2xl font-black mb-6">Edit Profile</h2>
                            <form onSubmit={handleSave} className="space-y-6">
                                <div>
                                    <label className="block text-sm font-bold text-gray-700 mb-2">Full Name</label>
                                    <div className="relative">
                                        <User className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
                                        <Input
                                            value={profile.name}
                                            onChange={(e) => setProfile({ ...profile, name: e.target.value })}
                                            className="pl-12"
                                            placeholder="Your Name"
                                        />
                                    </div>
                                </div>

                                <div>
                                    <label className="block text-sm font-bold text-gray-700 mb-2">Username</label>
                                    <div className="relative">
                                        <Mail className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
                                        <Input
                                            value={profile.username}
                                            disabled
                                            className="pl-12 bg-gray-50"
                                            placeholder="username"
                                        />
                                    </div>
                                    <p className="text-xs text-gray-500 mt-1">Username is auto-generated and cannot be changed</p>
                                </div>

                                <div>
                                    <label className="block text-sm font-bold text-gray-700 mb-2">Phone Number</label>
                                    <div className="relative">
                                        <Phone className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
                                        <Input
                                            value={profile.phoneNumber}
                                            onChange={(e) => setProfile({ ...profile, phoneNumber: e.target.value })}
                                            className="pl-12"
                                            placeholder="+1 234 567 890"
                                        />
                                    </div>
                                </div>

                                <div>
                                    <label className="block text-sm font-bold text-gray-700 mb-2">Address</label>
                                    <div className="relative">
                                        <MapPin className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
                                        <Input
                                            value={profile.address}
                                            onChange={(e) => setProfile({ ...profile, address: e.target.value })}
                                            className="pl-12"
                                            placeholder="123 Pet Street, City"
                                        />
                                    </div>
                                </div>

                                <div className="pt-4">
                                    <Button type="submit" disabled={loading} className="w-full md:w-auto">
                                        {loading ? 'Saving...' : (
                                            <>
                                                <Save size={18} className="mr-2" /> Save Changes
                                            </>
                                        )}
                                    </Button>
                                </div>
                            </form>
                        </Card>
                    )}

                    {activeTab === 'appointments' && (
                        <Card className="p-8">
                            <h2 className="text-2xl font-black mb-6 flex items-center gap-3">
                                <Calendar className="text-health" size={28} />
                                My Appointments
                            </h2>
                            {appointments.length === 0 ? (
                                <div className="text-center py-12 text-gray-400">
                                    <Calendar size={48} className="mx-auto mb-4 opacity-50" />
                                    <p className="font-bold">No appointments yet</p>
                                </div>
                            ) : (
                                <div className="space-y-4">
                                    {appointments.map((appt) => (
                                        <div key={appt.id} className="border border-gray-100 rounded-2xl p-6 hover:shadow-md transition-shadow">
                                            <div className="flex justify-between items-start mb-4">
                                                <div>
                                                    <h3 className="font-black text-lg">{appt.doctorName}</h3>
                                                    <p className="text-sm text-gray-500">Pet: {appt.petName}</p>
                                                </div>
                                                {getStatusBadge(appt.status)}
                                            </div>
                                            <div className="grid grid-cols-2 gap-4 text-sm">
                                                <div className="flex items-center gap-2 text-gray-600">
                                                    <Calendar size={16} className="text-health" />
                                                    <span>{appt.date}</span>
                                                </div>
                                                <div className="flex items-center gap-2 text-gray-600">
                                                    <Clock size={16} className="text-health" />
                                                    <span>{appt.time}</span>
                                                </div>
                                            </div>
                                            <p className="mt-4 text-sm text-gray-600 italic">{appt.reason}</p>
                                        </div>
                                    ))}
                                </div>
                            )}
                        </Card>
                    )}

                    {activeTab === 'orders' && (
                        <Card className="p-8">
                            <h2 className="text-2xl font-black mb-6 flex items-center gap-3">
                                <Package className="text-primary" size={28} />
                                My Orders
                            </h2>
                            {orders.length === 0 ? (
                                <div className="text-center py-12 text-gray-400">
                                    <Package size={48} className="mx-auto mb-4 opacity-50" />
                                    <p className="font-bold">No orders yet</p>
                                </div>
                            ) : (
                                <div className="space-y-4">
                                    {orders.map((order) => (
                                        <div key={order.id} className="border border-gray-100 rounded-2xl p-6 hover:shadow-md transition-shadow">
                                            <div className="flex justify-between items-start mb-4">
                                                <div>
                                                    <h3 className="font-black text-lg">Order #{order.id}</h3>
                                                    <p className="text-sm text-gray-500">{new Date(order.createdAt).toLocaleDateString()}</p>
                                                </div>
                                                {getStatusBadge(order.status)}
                                            </div>
                                            <div className="space-y-2 mb-4">
                                                {order.items.map((item, idx) => (
                                                    <div key={idx} className="flex justify-between text-sm">
                                                        <span className="text-gray-600">{item.productName} x{item.quantity}</span>
                                                        <span className="font-bold">${(item.price * item.quantity).toFixed(2)}</span>
                                                    </div>
                                                ))}
                                            </div>
                                            <div className="pt-4 border-t border-gray-100 flex justify-between items-center">
                                                <span className="font-black text-gray-900">Total</span>
                                                <span className="text-2xl font-black text-primary">${order.totalAmount.toFixed(2)}</span>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            )}
                        </Card>
                    )}
                </div>
            </div>
        </div>
    );
};

export default Profile;

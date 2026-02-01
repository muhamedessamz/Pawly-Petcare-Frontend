import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '../components/ui/Card';
import Button from '../components/ui/Button';
import Badge from '../components/ui/Badge';
import { LayoutDashboard, ShoppingBag, Users, Activity, Plus, Search, MoreHorizontal, Bell, Settings, HeartPulse, Sparkles, TrendingUp } from 'lucide-react';

const Dashboard = () => {
    const [activeTab, setActiveTab] = useState('overview');

    const stats = [
        { label: 'Total Revenue', value: '$24,500', change: '+12.5%', icon: <TrendingUp className="text-health" />, color: 'bg-health/10' },
        { label: 'Appointments', value: '156', change: '+8%', icon: <Activity className="text-primary" />, color: 'bg-primary/10' },
        { label: 'Active Clients', value: '1,200', change: '+20%', icon: <Users className="text-playful" />, color: 'bg-playful/10' },
        { label: 'Store Sales', value: '430', change: '+5.4%', icon: <ShoppingBag className="text-purple-600" />, color: 'bg-purple-50' },
    ];

    const sidebarItems = [
        { id: 'overview', name: 'Overview', icon: <LayoutDashboard size={22} /> },
        { id: 'products', name: 'Inventory', icon: <ShoppingBag size={22} /> },
        { id: 'appointments', name: 'Scheduler', icon: <Activity size={22} /> },
        { id: 'clients', name: 'Pet Owners', icon: <Users size={22} /> },
    ];

    return (
        <div className="min-h-[90vh] flex flex-col lg:flex-row gap-8 py-8 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto lg:max-w-none">
            {/* Sidebar v2 */}
            <aside className="lg:w-80 space-y-4">
                <div className="bg-gray-900 rounded-[3rem] p-8 text-white h-full shadow-2xl relative overflow-hidden">
                    <div className="absolute bottom-0 right-0 p-4 opacity-10">
                        <Settings size={150} />
                    </div>

                    <div className="relative z-10">
                        <div className="flex items-center gap-4 mb-12">
                            <div className="h-14 w-14 bg-primary text-white rounded-2xl flex items-center justify-center shadow-lg shadow-primary/30 rotate-3">
                                <LayoutDashboard size={28} />
                            </div>
                            <div>
                                <p className="font-black text-xl tracking-tight">Admin Central</p>
                                <p className="text-xs font-bold text-gray-500 uppercase tracking-widest">System Controller</p>
                            </div>
                        </div>

                        <nav className="space-y-3 mb-12">
                            {sidebarItems.map(item => (
                                <button
                                    key={item.id}
                                    onClick={() => setActiveTab(item.id)}
                                    className={`w-full flex items-center gap-4 px-6 py-4 rounded-2xl font-black transition-all duration-300 ${activeTab === item.id
                                        ? 'bg-primary text-white shadow-xl shadow-primary/20 translate-x-3'
                                        : 'text-gray-500 hover:text-white hover:bg-white/5'
                                        }`}
                                >
                                    {item.icon} {item.name}
                                </button>
                            ))}
                        </nav>

                        <div className="pt-12 border-t border-white/10 space-y-6">
                            <div className="flex items-center gap-4 p-4 rounded-2xl bg-white/5 border border-white/10">
                                <div className="h-2 w-2 rounded-full bg-health animate-pulse"></div>
                                <p className="text-xs font-bold text-gray-400">System Status: Optimal</p>
                            </div>
                            <Button variant="outline" className="w-full border-white/10 text-white hover:bg-white/5 rounded-xl">View System Logs</Button>
                        </div>
                    </div>
                </div>
            </aside>

            {/* Main Dashboard Area */}
            <main className="flex-1 space-y-12">
                {/* Top Bar */}
                <div className="flex flex-col md:flex-row justify-between items-center gap-6">
                    <div>
                        <h1 className="text-4xl font-black text-gray-900 tracking-tight flex items-center gap-4">
                            Dashboard Overview <Sparkles className="text-playful" size={24} />
                        </h1>
                        <p className="text-gray-500 font-bold italic">Checking in: It's a busy day for Pawly PetCare!</p>
                    </div>
                    <div className="flex items-center gap-4 w-full md:w-auto">
                        <div className="relative flex-1 md:flex-none">
                            <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
                            <Input placeholder="Global Search..." className="pl-12 py-5 rounded-xl border-gray-100 bg-white shadow-sm w-full md:w-64" />
                        </div>
                        <Button variant="ghost" size="icon" className="rounded-xl border border-gray-100 bg-white relative">
                            <Bell size={20} />
                            <span className="absolute top-2 right-2 h-2.5 w-2.5 bg-red-500 rounded-full border-2 border-white"></span>
                        </Button>
                    </div>
                </div>

                {/* Top Bento Stats */}
                <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-6">
                    {stats.map((stat, i) => (
                        <Card key={i} className="rounded-[2.5rem] p-8 border-gray-100 shadow-sm hover:shadow-xl transition-all duration-500 group">
                            <div className="flex justify-between items-start mb-6">
                                <div className={`h-14 w-14 ${stat.color} rounded-2xl flex items-center justify-center transition-transform group-hover:rotate-6`}>
                                    {stat.icon}
                                </div>
                                <Badge variant="success" className="bg-health/10 text-health border-none font-black text-[10px]">{stat.change}</Badge>
                            </div>
                            <div>
                                <p className="text-sm font-black text-gray-400 uppercase tracking-widest mb-1">{stat.label}</p>
                                <p className="text-4xl font-black text-gray-1000 tracking-tighter">{stat.value}</p>
                            </div>
                        </Card>
                    ))}
                </div>

                {/* Content Sections */}
                {activeTab === 'overview' && (
                    <div className="grid grid-cols-1 xl:grid-cols-12 gap-8">
                        <Card className="xl:col-span-8 rounded-[3.5rem] border-gray-100 p-10 bg-white shadow-sm">
                            <div className="flex justify-between items-center mb-10">
                                <div>
                                    <h2 className="text-2xl font-black text-gray-900">Recent Appointments</h2>
                                    <p className="text-gray-500 font-bold text-sm">Real-time update from clinic sensors.</p>
                                </div>
                                <Button variant="outline" size="sm" className="rounded-xl border-gray-100 font-bold">Manage All</Button>
                            </div>

                            <div className="space-y-6">
                                {[
                                    { pet: 'Milo (Golden Retriever)', owner: 'Liam J.', time: '10:30 AM', status: 'In Progress', icon: <HeartPulse className="text-health" /> },
                                    { pet: 'Bella (Persian Cat)', owner: 'Emma W.', time: '11:15 AM', status: 'Waiting', icon: <Activity className="text-playful" /> },
                                    { pet: 'Duke (Doberman)', owner: 'Sarah K.', time: '01:00 PM', status: 'Scheduled', icon: <Activity className="text-gray-300" /> },
                                ].map((appt, i) => (
                                    <div key={i} className="flex items-center justify-between p-6 rounded-[2rem] bg-gray-50/50 border border-gray-100 hover:bg-white hover:shadow-lg transition-all duration-300 group">
                                        <div className="flex items-center gap-6">
                                            <div className="h-14 w-14 bg-white rounded-2xl flex items-center justify-center shadow-sm group-hover:scale-110 transition-transform">
                                                {appt.icon}
                                            </div>
                                            <div>
                                                <p className="font-black text-gray-900 text-lg leading-tight">{appt.pet}</p>
                                                <p className="text-sm font-bold text-gray-400">Owner: {appt.owner}</p>
                                            </div>
                                        </div>
                                        <div className="text-right">
                                            <p className="font-black text-gray-900 mb-1">{appt.time}</p>
                                            <Badge variant={appt.status === 'In Progress' ? 'success' : 'secondary'} className="rounded-lg">{appt.status}</Badge>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </Card>

                        <Card className="xl:col-span-4 rounded-[3.5rem] border-gray-100 bg-gray-900 text-white p-10 shadow-2xl relative overflow-hidden">
                            <div className="absolute top-0 right-0 p-4 opacity-[0.05]">
                                <ShoppingBag size={200} />
                            </div>
                            <h2 className="text-2xl font-black mb-10 relative z-10">Low Inventory</h2>
                            <div className="space-y-8 relative z-10">
                                {[
                                    { name: 'Dog Kibble (Gold)', stock: '3 units', color: 'bg-red-500' },
                                    { name: 'Catnip Spray', stock: '5 units', color: 'bg-amber-500' },
                                    { name: 'Pet Carrier XL', stock: '1 unit', color: 'bg-red-500' },
                                ].map((item, i) => (
                                    <div key={i} className="flex flex-col gap-2">
                                        <div className="flex justify-between font-bold text-sm tracking-tight text-gray-400">
                                            <span>{item.name}</span>
                                            <span className="text-white">{item.stock}</span>
                                        </div>
                                        <div className="h-2 w-full bg-white/10 rounded-full overflow-hidden">
                                            <div className={`h-full ${item.color} rounded-full`} style={{ width: item.stock.includes('1') ? '10%' : '30%' }}></div>
                                        </div>
                                    </div>
                                ))}
                                <Button className="w-full mt-10 rounded-2xl bg-white text-gray-900 hover:bg-gray-100 font-black h-14">Order Restock</Button>
                            </div>
                        </Card>
                    </div>
                )}
            </main>
        </div>
    );
};

export default Dashboard;

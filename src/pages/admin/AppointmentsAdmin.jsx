import React, { useEffect, useState } from 'react';
import { Check, X, Search, Calendar, User, Clock, Filter } from 'lucide-react';
import Button from '../../components/ui/Button';
import Badge from '../../components/ui/Badge';
import { api } from '../../services/api';

const AppointmentsAdmin = () => {
    const [appointments, setAppointments] = useState([]);
    const [loading, setLoading] = useState(true);
    const [filter, setFilter] = useState('All');

    useEffect(() => {
        fetchAppointments();
    }, []);

    const fetchAppointments = async () => {
        try {
            const data = await api.appointments.getAll();
            setAppointments(data);
        } catch (error) {
            console.error(error);
        } finally {
            setLoading(false);
        }
    };

    const handleStatusUpdate = async (id, status) => {
        try {
            await api.appointments.updateStatus(id, status);
            fetchAppointments(); // Refresh list
        } catch (error) {
            console.error("Failed to update status", error);
            alert("Failed to update status");
        }
    };

    const getStatusColor = (status) => {
        switch (status) {
            case 'Confirmed': return 'bg-green-100 text-green-800';
            case 'Cancelled': return 'bg-red-100 text-red-800';
            case 'Pending': return 'bg-yellow-100 text-yellow-800';
            default: return 'bg-gray-100 text-gray-800';
        }
    };

    const filteredAppointments = filter === 'All'
        ? appointments
        : appointments.filter(a => a.status === filter);

    return (
        <div className="space-y-6">
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
                <div>
                    <h1 className="text-3xl font-black text-gray-900">Appointments</h1>
                    <p className="text-gray-500 font-medium">Manage and approve booking requests.</p>
                </div>
                <div className="flex gap-2 bg-white p-1 rounded-xl border border-gray-100">
                    {['All', 'Pending', 'Confirmed', 'Cancelled'].map((f) => (
                        <button
                            key={f}
                            onClick={() => setFilter(f)}
                            className={`px-4 py-2 rounded-lg text-sm font-bold transition-all ${filter === f ? 'bg-primary text-white shadow-md' : 'text-gray-500 hover:bg-gray-50'
                                }`}
                        >
                            {f}
                        </button>
                    ))}
                </div>
            </div>

            <div className="bg-white rounded-3xl border border-gray-100 shadow-sm overflow-hidden">
                <div className="p-4 border-b border-gray-100">
                    <div className="relative max-w-md">
                        <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={20} />
                        <input
                            type="text"
                            placeholder="Search by owner or pet name..."
                            className="w-full pl-10 pr-4 py-3 rounded-xl bg-gray-50 border-none focus:ring-2 focus:ring-primary/20 outline-none font-medium"
                        />
                    </div>
                </div>

                <div className="overflow-x-auto">
                    <table className="w-full text-left">
                        <thead className="bg-gray-50 text-gray-500 font-black text-xs uppercase tracking-widest">
                            <tr>
                                <th className="p-6 rounded-tl-3xl">Owner & Pet</th>
                                <th className="p-6">Doctor</th>
                                <th className="p-6">Date & Time</th>
                                <th className="p-6">Status</th>
                                <th className="p-6 rounded-tr-3xl">Actions</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-100">
                            {filteredAppointments.length === 0 ? (
                                <tr>
                                    <td colSpan="5" className="p-12 text-center text-gray-400 font-bold">
                                        No appointments found.
                                    </td>
                                </tr>
                            ) : (
                                filteredAppointments.map((appt) => (
                                    <tr key={appt.id} className="hover:bg-gray-50/50 transition-colors">
                                        <td className="p-6">
                                            <div className="font-bold text-gray-900">{appt.ownerName}</div>
                                            <div className="text-sm text-gray-500 flex items-center gap-1">
                                                <User size={14} /> Pet: {appt.petName}
                                            </div>
                                        </td>
                                        <td className="p-6 font-medium text-gray-700">
                                            {appt.doctorName}
                                        </td>
                                        <td className="p-6">
                                            <div className="flex flex-col gap-1 text-sm font-medium text-gray-600">
                                                <div className="flex items-center gap-2">
                                                    <Calendar size={14} className="text-primary" /> {appt.date}
                                                </div>
                                                <div className="flex items-center gap-2">
                                                    <Clock size={14} className="text-primary" /> {appt.time}
                                                </div>
                                            </div>
                                        </td>
                                        <td className="p-6">
                                            <span className={`px-3 py-1 rounded-full text-xs font-black uppercase tracking-wider ${getStatusColor(appt.status)}`}>
                                                {appt.status}
                                            </span>
                                        </td>
                                        <td className="p-6">
                                            {appt.status === 'Pending' && (
                                                <div className="flex gap-2">
                                                    <button
                                                        onClick={() => handleStatusUpdate(appt.id, 'Confirmed')}
                                                        className="h-9 w-9 bg-green-100 text-green-600 rounded-xl flex items-center justify-center hover:bg-green-500 hover:text-white transition-all shadow-sm"
                                                        title="Approve"
                                                    >
                                                        <Check size={18} strokeWidth={3} />
                                                    </button>
                                                    <button
                                                        onClick={() => handleStatusUpdate(appt.id, 'Cancelled')}
                                                        className="h-9 w-9 bg-red-100 text-red-500 rounded-xl flex items-center justify-center hover:bg-red-500 hover:text-white transition-all shadow-sm"
                                                        title="Reject"
                                                    >
                                                        <X size={18} strokeWidth={3} />
                                                    </button>
                                                </div>
                                            )}
                                        </td>
                                    </tr>
                                ))
                            )}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
};

export default AppointmentsAdmin;

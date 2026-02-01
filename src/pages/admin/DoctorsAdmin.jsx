import React, { useEffect, useState } from 'react';
import { Plus, Edit2, Trash2, Search, MapPin, Star } from 'lucide-react';
import Button from '../../components/ui/Button';
import Badge from '../../components/ui/Badge';
import { api } from '../../services/api';

const DoctorsAdmin = () => {
    const [doctors, setDoctors] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetchDoctors();
    }, []);

    const fetchDoctors = async () => {
        try {
            const data = await api.doctors.getAll();
            setDoctors(data);
        } catch (error) {
            console.error(error);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="space-y-6">
            <div className="flex justify-between items-center">
                <div>
                    <h1 className="text-3xl font-black text-gray-900">Doctors</h1>
                    <p className="text-gray-500 font-medium">Manage veterinary specialists.</p>
                </div>
                <Button className="flex items-center gap-2">
                    <Plus size={20} /> Add Doctor
                </Button>
            </div>

            <div className="bg-white rounded-3xl border border-gray-100 shadow-sm overflow-hidden">
                <div className="p-4 border-b border-gray-100 flex gap-4">
                    <div className="relative flex-1">
                        <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={20} />
                        <input
                            type="text"
                            placeholder="Search doctors..."
                            className="w-full pl-10 pr-4 py-3 rounded-xl bg-gray-50 border-none focus:ring-2 focus:ring-primary/20 outline-none"
                        />
                    </div>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 p-6">
                    {doctors.map((doctor) => (
                        <div key={doctor.id} className="border border-gray-100 rounded-3xl p-6 hover:shadow-xl transition-shadow group relative bg-white">
                            <div className="absolute top-4 right-4 flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                                <button className="p-2 bg-white shadow-md rounded-full text-gray-500 hover:text-primary">
                                    <Edit2 size={16} />
                                </button>
                                <button className="p-2 bg-white shadow-md rounded-full text-gray-500 hover:text-red-500">
                                    <Trash2 size={16} />
                                </button>
                            </div>

                            <div className="flex items-center gap-4 mb-4">
                                <div className="h-16 w-16 rounded-2xl overflow-hidden bg-gray-100">
                                    <img src={doctor.image} alt={doctor.name} className="w-full h-full object-cover" />
                                </div>
                                <div>
                                    <h3 className="font-bold text-lg text-gray-900">{doctor.name}</h3>
                                    <p className="text-health font-medium text-sm">{doctor.specialty}</p>
                                </div>
                            </div>

                            <div className="space-y-3">
                                <div className="flex items-center gap-2 text-gray-500 text-sm">
                                    <MapPin size={16} /> {doctor.location}
                                </div>
                                <div className="flex items-center gap-2 text-gray-500 text-sm">
                                    <Star size={16} className="text-yellow-400 fill-current" /> {doctor.rating} Rating
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default DoctorsAdmin;

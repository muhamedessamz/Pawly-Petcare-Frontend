import React, { useEffect, useState } from 'react';
import DoctorCard from '../components/features/DoctorCard';
import Input from '../components/ui/Input';
import { Search, Stethoscope, MapPin, Sparkles, Filter, ArrowRight } from 'lucide-react';
import doctorsData from '../services/mockData/doctors.json';
import Button from '../components/ui/Button';



const Clinic = () => {
    const [doctors, setDoctors] = useState([]);
    const [filteredDoctors, setFilteredDoctors] = useState([]);
    const [loading, setLoading] = useState(true);
    const [searchTerm, setSearchTerm] = useState('');
    const [selectedSpecialty, setSelectedSpecialty] = useState('All');

    useEffect(() => {
        const fetchDoctors = async () => {
            try {
                // Simulate loading delay for better UX
                await new Promise(resolve => setTimeout(resolve, 800));
                setDoctors(doctorsData);
                setFilteredDoctors(doctorsData);
            } catch (error) {
                console.error('Error loading doctors:', error);
            } finally {
                setLoading(false);
            }
        };
        fetchDoctors();
    }, []);

    useEffect(() => {
        let result = doctors;

        if (searchTerm) {
            result = result.filter(d => d.name.toLowerCase().includes(searchTerm.toLowerCase()));
        }

        if (selectedSpecialty !== 'All') {
            result = result.filter(d => d.specialty === selectedSpecialty);
        }

        setFilteredDoctors(result);
    }, [searchTerm, selectedSpecialty, doctors]);

    const specialties = ['All', ...new Set(doctors.map(d => d.specialty))];

    return (
        <div className="space-y-16 pb-20">
            {/* Header Section */}
            <section className="bg-white py-16 md:py-24 border-b border-gray-100 overflow-hidden relative">
                <div className="max-w-7xl mx-auto px-4 relative z-10">
                    <div className="absolute top-0 right-0 p-8 opacity-10 hidden lg:block">
                        <img
                            src="https://img.icons8.com/?size=100&id=43344&format=png&color=000000"
                            alt="Dog Icon"
                            className="w-[250px] h-[250px] object-contain opacity-50"
                        />
                    </div>

                    <div className="max-w-2xl">
                        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-health/10 text-health text-xs font-black uppercase tracking-widest mb-6">
                            <Sparkles size={14} /> <span>Trusted Vet Network</span>
                        </div>
                        <h1 className="text-5xl font-black text-gray-900 mb-6 leading-tight">World-Class Care For Your Best Friend.</h1>
                        <p className="text-xl text-gray-500 font-medium mb-10 leading-relaxed">
                            Specialized veterinarians, modern equipment, and 24/7 care.
                            Find the perfect specialist for your pet's needs.
                        </p>

                        <div className="flex flex-col sm:flex-row gap-4">
                            <div className="relative flex-1 group">
                                <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 group-focus-within:text-health transition-colors" size={22} />
                                <Input
                                    placeholder="Search by doctor name..."
                                    className="pl-14 py-7 rounded-2xl border-gray-100 shadow-sm text-lg focus:border-health focus:ring-health"
                                    value={searchTerm}
                                    onChange={(e) => setSearchTerm(e.target.value)}
                                />
                            </div>
                            <Button className="bg-health hover:bg-emerald-600 px-8 py-7 rounded-2xl shadow-xl shadow-health/20 text-lg">
                                Find Doctor
                            </Button>
                        </div>
                    </div>
                </div>
            </section>

            <div className="max-w-7xl mx-auto px-4">
                <div className="flex flex-col lg:flex-row gap-12">
                    {/* Filters Sidebar */}
                    <aside className="lg:w-72 space-y-8 flex-shrink-0">
                        <div className="bg-white p-8 rounded-[2.5rem] border border-gray-100 shadow-sm sticky top-24">
                            <div className="flex items-center gap-2 font-black text-gray-900 mb-8 uppercase tracking-tighter text-lg">
                                <Filter size={20} className="text-health" /> Specialized Care
                            </div>

                            <div className="space-y-3">
                                {specialties.map(spec => (
                                    <button
                                        key={spec}
                                        onClick={() => setSelectedSpecialty(spec)}
                                        className={`w-full px-5 py-3.5 rounded-2xl text-left font-bold transition-all duration-300 flex items-center justify-between group ${selectedSpecialty === spec
                                            ? 'bg-health text-white shadow-xl shadow-health/10 scale-[1.05]'
                                            : 'bg-white text-gray-500 hover:bg-health/5 hover:text-health border border-transparent'
                                            }`}
                                    >
                                        <span>{spec}</span>
                                        <ArrowRight size={16} className={`transition-transform duration-300 ${selectedSpecialty === spec ? 'translate-x-0' : '-translate-x-4 opacity-0 group-hover:translate-x-0 group-hover:opacity-100'}`} />
                                    </button>
                                ))}
                            </div>

                            <div className="mt-12 pt-8 border-t border-gray-50">
                                <h4 className="font-bold text-gray-900 mb-4 flex items-center gap-2">
                                    <MapPin size={18} className="text-health" /> Location
                                </h4>
                                <p className="text-sm text-gray-500 font-medium leading-relaxed">
                                    Main Health Plaza, Suite 400<br />
                                    Downtown Brooklyn, NY 11201
                                </p>
                            </div>
                        </div>
                    </aside>

                    {/* Doctors Listing */}
                    <div className="flex-1">
                        {loading ? (
                            <div className="grid grid-cols-1 xl:grid-cols-2 gap-8">
                                {[...Array(4)].map((_, i) => (
                                    <div key={i} className="h-64 bg-gray-100 rounded-[3rem] animate-pulse"></div>
                                ))}
                            </div>
                        ) : (
                            <div className="grid grid-cols-1 xl:grid-cols-2 gap-8">
                                {filteredDoctors.length > 0 ? (
                                    filteredDoctors.map((doctor) => (
                                        <DoctorCard key={doctor.id} doctor={doctor} />
                                    ))
                                ) : (
                                    <div className="col-span-full py-32 flex flex-col items-center justify-center text-center bg-white rounded-[3rem] border border-dashed border-gray-200">
                                        <div className="h-24 w-24 bg-health/5 text-health/30 rounded-full flex items-center justify-center mb-6">
                                            <Stethoscope size={48} />
                                        </div>
                                        <h3 className="text-3xl font-black text-gray-900 mb-4">No specialists found</h3>
                                        <p className="text-gray-500 font-bold max-w-sm">We couldn't find any doctors matching your search criteria. Try a different filter.</p>
                                    </div>
                                )}
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Clinic;

import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { api } from '../services/api';
import Button from '../components/ui/Button';
import Badge from '../components/ui/Badge';
import { Star, Clock, MapPin, ArrowLeft, Award, Calendar, ShieldCheck, CheckCircle, GraduationCap } from 'lucide-react';

const DoctorDetails = () => {
    const { id } = useParams();
    const [doctor, setDoctor] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchDoctor = async () => {
            try {
                const data = await api.doctors.getById(id);
                setDoctor(data);
            } catch (error) {
                console.error('Failed to fetch doctor', error);
            } finally {
                setLoading(false);
            }
        };
        fetchDoctor();
    }, [id]);

    if (loading) return <div className="py-40 text-center flex flex-col items-center gap-4">
        <div className="h-12 w-12 border-4 border-health border-t-transparent rounded-full animate-spin"></div>
        <p className="font-bold text-gray-500 text-health uppercase tracking-widest text-xs">Fetching profile...</p>
    </div>;
    if (!doctor) return <div className="py-40 text-center font-bold text-gray-900">Doctor not found.</div>;

    return (
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
            <Link to="/clinic" className="inline-flex items-center text-sm font-bold text-gray-400 hover:text-health mb-12 transition-all group">
                <ArrowLeft size={18} className="mr-2 group-hover:-translate-x-1 transition-transform" /> Back to Clinic Specialists
            </Link>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
                {/* Profile Card (Sidebar-ish) */}
                <div className="lg:col-span-1">
                    <div className="sticky top-32">
                        <div className="bg-white rounded-[3rem] shadow-2xl shadow-health/5 border border-gray-100 p-10 overflow-hidden relative">
                            <div className="absolute top-0 right-0 p-4">
                                <ShieldCheck className="text-health opacity-20" size={80} />
                            </div>

                            <div className="relative z-10 flex flex-col items-center text-center">
                                <div className="w-48 h-48 rounded-3xl overflow-hidden mb-8 shadow-2xl shadow-gray-200 rotate-3 ring-8 ring-health/5">
                                    <img src={doctor.image} alt={doctor.name} className="w-full h-full object-cover" />
                                </div>
                                <Badge variant="success" className="mb-4 uppercase tracking-widest px-6 py-2 rounded-2xl">{doctor.specialty}</Badge>
                                <h1 className="text-3xl font-black text-gray-1000 mb-2">{doctor.name}</h1>
                                <div className="flex items-center gap-2 font-bold text-gray-500 mb-8">
                                    <GraduationCap size={18} className="text-health" /> {doctor.experience} Experience
                                </div>

                                <div className="flex items-center justify-center gap-3 bg-gray-50 w-full p-4 rounded-3xl border border-gray-100 mb-10">
                                    <div className="flex items-center gap-1.5 text-playful font-black text-xl">
                                        <Star fill="currentColor" size={24} /> {doctor.rating}
                                    </div>
                                    <div className="h-6 w-px bg-gray-200"></div>
                                    <div className="text-xs font-black text-gray-400 uppercase tracking-widest">Top Rated <br /> Specialist</div>
                                </div>

                                <Link to={`/book-appointment/${doctor.id}`} className="w-full">
                                    <Button size="lg" className="w-full bg-health hover:bg-emerald-600 rounded-[1.5rem] py-8 text-xl shadow-xl shadow-health/20 group">
                                        Reserve Slot <ArrowRight size={20} className="ml-2 group-hover:translate-x-1 transition-transform" />
                                    </Button>
                                </Link>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Main Content Area */}
                <div className="lg:col-span-2 space-y-12">
                    <section className="bg-white p-12 rounded-[3.5rem] border border-gray-100 shadow-sm">
                        <h2 className="text-2xl font-black text-gray-900 mb-8 flex items-center gap-4">
                            <div className="h-10 w-10 bg-health/10 text-health rounded-2xl flex items-center justify-center"><Award size={20} /></div>
                            Biography & Expertise
                        </h2>
                        <p className="text-gray-600 text-xl font-medium leading-[1.8] italic mb-10">
                            "{doctor.bio}"
                        </p>
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                            <div className="bg-health/5 p-6 rounded-3xl border border-health/10">
                                <p className="text-xs font-black text-health uppercase tracking-widest mb-2">Qualifications</p>
                                <p className="font-bold text-gray-900 leading-relaxed">Board Certified Veterinary Specialist in {doctor.specialty} with international fellowship.</p>
                            </div>
                            <div className="bg-primary/5 p-6 rounded-3xl border border-primary/10 text-primary">
                                <p className="text-xs font-black text-primary uppercase tracking-widest mb-2">Philosophy</p>
                                <p className="font-bold leading-relaxed italic">"Treatment focused on pet comfort and stress reduction."</p>
                            </div>
                        </div>
                    </section>

                    <section className="bg-white p-12 rounded-[3.5rem] border border-gray-100 shadow-sm relative overflow-hidden">
                        <h2 className="text-2xl font-black text-gray-900 mb-8 flex items-center gap-4">
                            <div className="h-10 w-10 bg-primary/10 text-primary rounded-2xl flex items-center justify-center"><Calendar size={20} /></div>
                            Clinic Schedule
                        </h2>

                        <div className="grid grid-cols-2 sm:grid-cols-4 md:grid-cols-7 gap-4">
                            {['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'].map(day => (
                                <div
                                    key={day}
                                    className={`flex flex-col items-center gap-3 p-5 rounded-[2rem] border-2 transition-all duration-500 ${doctor.availability.includes(day)
                                        ? 'bg-health/5 border-health/20 scale-105 shadow-xl shadow-health/5'
                                        : 'bg-gray-50/50 border-gray-100 opacity-40'
                                        }`}
                                >
                                    <span className={`text-xs font-black uppercase tracking-widest ${doctor.availability.includes(day) ? 'text-health' : 'text-gray-400'}`}>{day}</span>
                                    <div className={`h-2 w-2 rounded-full ${doctor.availability.includes(day) ? 'bg-health animate-pulse' : 'bg-gray-200'}`}></div>
                                    <span className={`text-[10px] font-bold ${doctor.availability.includes(day) ? 'text-health' : 'text-gray-300'}`}>
                                        {doctor.availability.includes(day) ? 'OPEN' : 'CLOSED'}
                                    </span>
                                </div>
                            ))}
                        </div>

                        <div className="mt-12 flex flex-col md:flex-row gap-6 p-6 bg-gray-50 rounded-3xl border border-gray-100 items-center justify-between">
                            <div className="flex items-center gap-4">
                                <MapPin className="text-health" size={24} />
                                <div>
                                    <p className="font-black text-gray-900">Pawly Health Plaza</p>
                                    <p className="text-sm text-gray-500 font-bold">400 Brooklyn Heights, NY</p>
                                </div>
                            </div>
                            <div className="h-10 w-px bg-gray-200 hidden md:block"></div>
                            <div className="flex gap-4">
                                <div className="flex items-center gap-2 text-sm font-bold text-gray-900"><CheckCircle size={16} className="text-health" /> Easy Parking</div>
                                <div className="flex items-center gap-2 text-sm font-bold text-gray-900"><CheckCircle size={16} className="text-health" /> Wheelchair Accessible</div>
                            </div>
                        </div>
                    </section>
                </div>
            </div>
        </div>
    );
};

export default DoctorDetails;

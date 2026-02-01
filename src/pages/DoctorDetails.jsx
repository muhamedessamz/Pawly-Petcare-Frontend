import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import doctorsData from '../services/mockData/doctors.json';
import Button from '../components/ui/Button';
import Badge from '../components/ui/Badge';
import { Clock, MapPin, Star, GraduationCap, Languages, ArrowLeft, HeartPulse, User, ShieldCheck } from 'lucide-react';

const DoctorDetails = () => {
    const { id } = useParams();
    const [doctor, setDoctor] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        // Simulate API fetch delay
        const fetchDoctor = async () => {
            try {
                await new Promise(resolve => setTimeout(resolve, 500));
                const doc = doctorsData.find(d => d.id === parseInt(id));
                setDoctor(doc);
            } catch (error) {
                console.error("Error finding doctor", error);
            } finally {
                setLoading(false);
            }
        };
        fetchDoctor();
    }, [id]);

    if (loading) {
        return (
            <div className="min-h-screen pt-24 pb-12 px-4 flex justify-center items-center">
                <div className="w-16 h-16 border-4 border-primary border-t-transparent rounded-full animate-spin"></div>
            </div>
        );
    }

    if (!doctor) {
        return (
            <div className="min-h-screen pt-32 pb-12 px-4 text-center">
                <h1 className="text-3xl font-bold text-gray-900 mb-4">Doctor Not Found</h1>
                <Link to="/clinic">
                    <Button variant="outline">Back to Clinic</Button>
                </Link>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-gray-50/50 pb-20">
            {/* Header / Breadcrumb */}
            <div className="bg-white border-b border-gray-100 pt-24 pb-8">
                <div className="max-w-7xl mx-auto px-4">
                    <Link to="/clinic" className="inline-flex items-center text-gray-500 hover:text-primary mb-6 transition-colors">
                        <ArrowLeft size={18} className="mr-2" /> Back to Clinic
                    </Link>
                    <div className="flex flex-col md:flex-row gap-8 md:items-start">
                        <div className="w-full md:w-auto flex-shrink-0">
                            <div className="aspect-[3/4] w-full md:w-72 rounded-[2rem] overflow-hidden shadow-2xl shadow-primary/10 relative group">
                                <img
                                    src={doctor.image}
                                    alt={doctor.name}
                                    className="w-full h-full object-cover object-top group-hover:scale-105 transition-transform duration-700"
                                    style={doctor.imageStyles}
                                />
                                <div className="absolute top-4 left-4">
                                    <Badge className="bg-white/90 backdrop-blur text-gray-900 shadow-sm border-none">
                                        <div className="flex items-center gap-1 font-bold">
                                            <Star size={14} className="text-yellow-400 fill-current" /> {doctor.rating}
                                        </div>
                                    </Badge>
                                </div>
                            </div>
                        </div>

                        <div className="flex-1">
                            <Badge variant="playful" className="bg-primary/10 text-primary border-none mb-4 inline-block">
                                {doctor.specialty}
                            </Badge>
                            <h1 className="text-4xl md:text-5xl font-black text-gray-900 mb-6 leading-tight">
                                {doctor.name}
                            </h1>

                            <div className="flex flex-wrap gap-4 mb-8">
                                <div className="bg-white px-5 py-3 rounded-2xl border border-gray-100 flex items-center gap-3 shadow-sm">
                                    <Clock className="text-primary" size={20} />
                                    <div>
                                        <p className="text-xs text-gray-400 font-bold uppercase">Experience</p>
                                        <p className="font-bold text-gray-900">{doctor.experience}</p>
                                    </div>
                                </div>
                                <div className="bg-white px-5 py-3 rounded-2xl border border-gray-100 flex items-center gap-3 shadow-sm">
                                    <Languages className="text-playful" size={20} />
                                    <div>
                                        <p className="text-xs text-gray-400 font-bold uppercase">Languages</p>
                                        <p className="font-bold text-gray-900">{doctor.languages?.join(', ') || 'English'}</p>
                                    </div>
                                </div>
                            </div>

                            <p className="text-xl text-gray-600 leading-relaxed mb-8 max-w-2xl">
                                {doctor.bio}
                            </p>

                            <div className="flex flex-col sm:flex-row gap-4">
                                <Button size="lg" className="shadow-xl shadow-primary/20">
                                    Book Appointment
                                </Button>
                                <Button variant="outline" size="lg" className="bg-white">
                                    Send Message
                                </Button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <div className="max-w-7xl mx-auto px-4 py-12 grid grid-cols-1 lg:grid-cols-3 gap-12">
                {/* Main Content */}
                <div className="lg:col-span-2 space-y-12">
                    {/* Education & Credentials */}
                    <section className="bg-white rounded-[2.5rem] p-8 md:p-10 border border-gray-100 shadow-sm">
                        <h2 className="text-2xl font-black text-gray-900 mb-6 flex items-center gap-3">
                            <GraduationCap className="text-secondary" size={28} /> Education & Credentials
                        </h2>
                        <div className="space-y-4">
                            <div className="flex gap-4 items-start">
                                <div className="mt-1.5 h-3 w-3 rounded-full bg-secondary flex-shrink-0" />
                                <div>
                                    <h3 className="text-lg font-bold text-gray-900">{doctor.education || 'Veterinary Medical Degree'}</h3>
                                    <p className="text-gray-500">Board Certified Specialist</p>
                                </div>
                            </div>
                            <div className="flex gap-4 items-start">
                                <div className="mt-1.5 h-3 w-3 rounded-full bg-secondary flex-shrink-0" />
                                <div>
                                    <h3 className="text-lg font-bold text-gray-900">Licensed Veterinary Surgeon</h3>
                                    <p className="text-gray-500">State Veterinary Board</p>
                                </div>
                            </div>
                        </div>
                    </section>

                    {/* About our Support Staff (Requested Feature) */}
                    <section className="bg-gray-900 rounded-[2.5rem] p-8 md:p-12 text-white relative overflow-hidden">
                        <div className="absolute top-0 right-0 w-64 h-64 bg-primary/20 rounded-full blur-3xl -mr-16 -mt-16 pointer-events-none"></div>

                        <div className="relative z-10">
                            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/10 text-white text-xs font-black uppercase tracking-widest mb-6">
                                <User size={14} /> <span>The Dream Team</span>
                            </div>
                            <h2 className="text-3xl font-black mb-6">Supported By World-Class Staff</h2>
                            <p className="text-lg text-gray-300 leading-relaxed mb-8">
                                Exceptional care requires a team effort. {doctor.name} works alongside our dedicated group of
                                certified veterinary technicians, compassionate nursing staff, and patient care coordinators.
                            </p>

                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                                <div className="bg-white/5 p-6 rounded-2xl border border-white/10">
                                    <HeartPulse className="text-red-400 mb-3" size={24} />
                                    <h3 className="font-bold text-lg mb-1">Nursing Team</h3>
                                    <p className="text-sm text-gray-400">24/7 monitoring and compassionate post-op care.</p>
                                </div>
                                <div className="bg-white/5 p-6 rounded-2xl border border-white/10">
                                    <ShieldCheck className="text-green-400 mb-3" size={24} />
                                    <h3 className="font-bold text-lg mb-1">Tech Specialists</h3>
                                    <p className="text-sm text-gray-400">Experts in imaging, lab work, and anesthesia safety.</p>
                                </div>
                            </div>
                        </div>
                    </section>
                </div>

                {/* Sidebar Info */}
                <div className="space-y-8">
                    <div className="bg-white rounded-[2rem] p-8 border border-gray-100 shadow-sm">
                        <h3 className="font-black text-gray-900 mb-6 text-lg">Weekly Availability</h3>
                        <div className="space-y-3">
                            {['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'].map(day => (
                                <div key={day} className="flex justify-between items-center py-2 border-b border-gray-50 last:border-0">
                                    <span className="font-medium text-gray-500">{day}</span>
                                    {doctor.availability.includes(day) ? (
                                        <Badge variant="outline" className="text-green-600 bg-green-50 border-green-100">Available</Badge>
                                    ) : (
                                        <span className="text-sm text-gray-300 font-bold">Off</span>
                                    )}
                                </div>
                            ))}
                        </div>
                    </div>

                    <div className="bg-playful/5 rounded-[2rem] p-8 border border-playful/10">
                        <h3 className="font-black text-gray-900 mb-4 text-lg">Location</h3>
                        <div className="flex gap-4">
                            <div className="h-10 w-10 bg-white rounded-full flex items-center justify-center shadow-sm text-playful flex-shrink-0">
                                <MapPin size={20} />
                            </div>
                            <div>
                                <p className="font-bold text-gray-900">Pawly Main Clinic</p>
                                <p className="text-sm text-gray-600 mt-1">
                                    123 Pet Street, Suite 101<br />
                                    New York, NY 10012
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default DoctorDetails;

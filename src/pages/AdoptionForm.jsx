import React, { useState, useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import petsData from '../services/mockData/pets.json';
import Button from '../components/ui/Button';
import Badge from '../components/ui/Badge';
import { Card } from '../components/ui/Card';
import Input from '../components/ui/Input';
import { ArrowLeft, CheckCircle2, Heart, Home, User, Phone, Mail, MessageSquare, Info, ShieldCheck } from 'lucide-react';

const AdoptionForm = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const [pet, setPet] = useState(null);
    const [loading, setLoading] = useState(true);
    const [submitted, setSubmitted] = useState(false);

    const [formData, setFormData] = useState({
        fullName: '',
        email: '',
        phone: '',
        address: '',
        occupation: '',
        homeType: 'House',
        hasOtherPets: 'No',
        experience: '',
        reason: ''
    });

    useEffect(() => {
        const foundPet = petsData.find(p => p.id === parseInt(id));
        setPet(foundPet);
        setLoading(false);
    }, [id]);

    const handleInput = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        setLoading(true);
        // Simulate API call
        setTimeout(() => {
            setLoading(false);
            setSubmitted(true);
        }, 1500);
    };

    if (loading && !submitted) return <div className="min-h-screen flex items-center justify-center"><div className="h-12 w-12 border-4 border-primary border-t-transparent rounded-full animate-spin"></div></div>;

    if (!pet) return <div className="min-h-screen flex flex-col items-center justify-center p-4">
        <h2 className="text-3xl font-black mb-4">Pet Not Found</h2>
        <Link to="/adoption"><Button>Back to Adoption Center</Button></Link>
    </div>;

    if (submitted) {
        return (
            <div className="max-w-3xl mx-auto px-4 py-32 text-center">
                <div className="h-24 w-24 bg-health/10 text-health rounded-[2rem] flex items-center justify-center mb-8 mx-auto animate-bounce">
                    <CheckCircle2 size={48} />
                </div>
                <h1 className="text-5xl font-black text-gray-900 mb-6 tracking-tight">Application Submitted!</h1>
                <p className="text-xl text-gray-500 font-medium leading-relaxed mb-12">
                    Thank you for wanting to give <span className="text-health font-bold">{pet.name}</span> a forever home.
                    Our team will review your application and contact you within 2-3 business days.
                </p>
                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                    <Button onClick={() => navigate('/adoption')} className="rounded-2xl px-10 h-16 font-black">Back to Adoption Center</Button>
                    <Button variant="outline" onClick={() => navigate('/profile')} className="rounded-2xl px-10 h-16 border-gray-200 font-black">View My Applications</Button>
                </div>
            </div>
        );
    }

    return (
        <div className="max-w-7xl mx-auto px-4 py-12 lg:py-20">
            <Link to={`/pets/${id}`} className="inline-flex items-center gap-2 text-gray-500 font-bold hover:text-primary transition-colors mb-12 group">
                <ArrowLeft size={18} className="group-hover:-translate-x-1 transition-transform" /> Back to {pet.name}'s Profile
            </Link>

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 items-start">
                {/* Pet Summary Card */}
                <div className="lg:col-span-4 sticky top-28">
                    <Card className="rounded-[3rem] border-gray-100 overflow-hidden shadow-2xl">
                        <div className="aspect-square relative">
                            <img src={pet.image} alt={pet.name} className="w-full h-full object-cover" />
                            <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent flex items-end p-8">
                                <div>
                                    <Badge variant="playful" className="bg-primary border-none text-white mb-2 uppercase tracking-widest text-[10px]">Adopting</Badge>
                                    <h2 className="text-3xl font-black text-white">{pet.name}</h2>
                                    <p className="text-gray-300 font-bold">{pet.breed} • {pet.age}</p>
                                </div>
                            </div>
                        </div>
                        <div className="p-8 space-y-4 bg-gray-50">
                            <div className="flex items-center justify-between text-sm">
                                <span className="text-gray-500 font-bold uppercase tracking-widest text-[10px]">Species</span>
                                <span className="font-black text-gray-900">{pet.species}</span>
                            </div>
                            <div className="flex items-center justify-between text-sm">
                                <span className="text-gray-500 font-bold uppercase tracking-widest text-[10px]">Gender</span>
                                <span className="font-black text-gray-900">{pet.gender}</span>
                            </div>
                        </div>
                    </Card>
                    <div className="mt-8 p-6 bg-health/5 rounded-3xl border border-health/10 flex items-start gap-4">
                        <ShieldCheck className="text-health shrink-0" size={24} />
                        <p className="text-xs font-bold text-health/70 leading-relaxed italic">
                            Your application is safe and secure. We review every home to ensure the best life for our pets.
                        </p>
                    </div>
                </div>

                {/* Application Form */}
                <div className="lg:col-span-8">
                    <header className="mb-12">
                        <h1 className="text-5xl font-black text-gray-900 mb-4 tracking-tight">Adoption Application</h1>
                        <p className="text-lg text-gray-500 font-medium">Please fill out the form below with as much detail as possible.</p>
                    </header>

                    <form onSubmit={handleSubmit} className="space-y-12">
                        {/* Section 1: Personal Info */}
                        <div className="space-y-8">
                            <div className="flex items-center gap-3 mb-2">
                                <div className="h-10 w-10 bg-primary/10 text-primary rounded-xl flex items-center justify-center">
                                    <User size={20} />
                                </div>
                                <h3 className="text-xl font-black text-gray-900">Personal Information</h3>
                            </div>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                <div className="space-y-2">
                                    <label className="text-[10px] font-black uppercase tracking-widest text-gray-400 ml-1">Full Name</label>
                                    <Input
                                        name="fullName"
                                        placeholder="John Doe"
                                        required
                                        value={formData.fullName}
                                        onChange={handleInput}
                                        className="h-14 rounded-2xl bg-gray-50 border-gray-100 focus:bg-white transition-all font-bold"
                                    />
                                </div>
                                <div className="space-y-2">
                                    <label className="text-[10px] font-black uppercase tracking-widest text-gray-400 ml-1">Email Address</label>
                                    <Input
                                        type="email"
                                        name="email"
                                        placeholder="john@example.com"
                                        required
                                        value={formData.email}
                                        onChange={handleInput}
                                        className="h-14 rounded-2xl bg-gray-50 border-gray-100 focus:bg-white transition-all font-bold"
                                    />
                                </div>
                                <div className="space-y-2">
                                    <label className="text-[10px] font-black uppercase tracking-widest text-gray-400 ml-1">Phone Number</label>
                                    <Input
                                        name="phone"
                                        placeholder="+1 (555) 000-0000"
                                        required
                                        value={formData.phone}
                                        onChange={handleInput}
                                        className="h-14 rounded-2xl bg-gray-50 border-gray-100 focus:bg-white transition-all font-bold"
                                    />
                                </div>
                                <div className="space-y-2">
                                    <label className="text-[10px] font-black uppercase tracking-widest text-gray-400 ml-1">Occupation</label>
                                    <Input
                                        name="occupation"
                                        placeholder="e.g. Software Engineer"
                                        required
                                        value={formData.occupation}
                                        onChange={handleInput}
                                        className="h-14 rounded-2xl bg-gray-50 border-gray-100 focus:bg-white transition-all font-bold"
                                    />
                                </div>
                            </div>
                            <div className="space-y-2">
                                <label className="text-[10px] font-black uppercase tracking-widest text-gray-400 ml-1">Current Address</label>
                                <Input
                                    name="address"
                                    placeholder="Full residential address"
                                    required
                                    value={formData.address}
                                    onChange={handleInput}
                                    className="h-14 rounded-2xl bg-gray-50 border-gray-100 focus:bg-white transition-all font-bold"
                                />
                            </div>
                        </div>

                        {/* Section 2: Home Environment */}
                        <div className="space-y-8">
                            <div className="flex items-center gap-3 mb-2">
                                <div className="h-10 w-10 bg-health/10 text-health rounded-xl flex items-center justify-center">
                                    <Home size={20} />
                                </div>
                                <h3 className="text-xl font-black text-gray-900">Home Environment</h3>
                            </div>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                <div className="space-y-3">
                                    <label className="text-[10px] font-black uppercase tracking-widest text-gray-400 ml-1">Type of Residence</label>
                                    <select
                                        name="homeType"
                                        value={formData.homeType}
                                        onChange={handleInput}
                                        className="w-full h-14 rounded-2xl bg-gray-50 border border-gray-100 px-6 font-bold focus:ring-2 focus:ring-primary/20 outline-none"
                                    >
                                        <option>House</option>
                                        <option>Apartment</option>
                                        <option>Condo</option>
                                        <option>Farm</option>
                                    </select>
                                </div>
                                <div className="space-y-3">
                                    <label className="text-[10px] font-black uppercase tracking-widest text-gray-400 ml-1">Do you have other pets?</label>
                                    <select
                                        name="hasOtherPets"
                                        value={formData.hasOtherPets}
                                        onChange={handleInput}
                                        className="w-full h-14 rounded-2xl bg-gray-50 border border-gray-100 px-6 font-bold focus:ring-2 focus:ring-primary/20 outline-none"
                                    >
                                        <option>No</option>
                                        <option>Yes (Dogs)</option>
                                        <option>Yes (Cats)</option>
                                        <option>Yes (Both/Other)</option>
                                    </select>
                                </div>
                            </div>
                            <div className="space-y-2">
                                <label className="text-[10px] font-black uppercase tracking-widest text-gray-400 ml-1">Previous Pet Experience</label>
                                <textarea
                                    name="experience"
                                    placeholder="Tell us about your previous history with pets..."
                                    rows={4}
                                    value={formData.experience}
                                    onChange={handleInput}
                                    className="w-full p-6 rounded-[2rem] bg-gray-50 border border-gray-100 focus:bg-white transition-all font-bold focus:ring-2 focus:ring-primary/20 outline-none resize-none"
                                />
                            </div>
                        </div>

                        {/* Section 3: Motivation */}
                        <div className="space-y-8">
                            <div className="flex items-center gap-3 mb-2">
                                <div className="h-10 w-10 bg-playful/10 text-playful rounded-xl flex items-center justify-center">
                                    <Heart size={20} />
                                </div>
                                <h3 className="text-xl font-black text-gray-900">Why {pet.name}?</h3>
                            </div>
                            <div className="space-y-2">
                                <label className="text-[10px] font-black uppercase tracking-widest text-gray-400 ml-1">Your Motivation</label>
                                <textarea
                                    name="reason"
                                    placeholder={`Why are you looking to adopt ${pet.name}? What kind of life can you provide?`}
                                    rows={6}
                                    required
                                    value={formData.reason}
                                    onChange={handleInput}
                                    className="w-full p-6 rounded-[2rem] bg-gray-50 border border-gray-100 focus:bg-white transition-all font-bold focus:ring-2 focus:ring-primary/20 outline-none resize-none"
                                />
                            </div>
                        </div>

                        <div className="pt-8">
                            <Button
                                type="submit"
                                size="lg"
                                className="w-full h-20 rounded-[1.5rem] text-xl font-black shadow-2xl shadow-primary/30 flex items-center justify-center gap-3 group"
                            >
                                Submit Application <ArrowLeft size={20} className="rotate-180 group-hover:translate-x-2 transition-transform" />
                            </Button>
                            <p className="mt-6 text-center text-xs font-bold text-gray-400 flex items-center justify-center gap-2">
                                <Info size={14} /> By submitting, you agree to our adoption terms and background check process.
                            </p>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
};
export default AdoptionForm;

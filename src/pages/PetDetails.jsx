import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { api } from '../services/api';
import Button from '../components/ui/Button';
import Badge from '../components/ui/Badge';
import { Card } from '../components/ui/Card';
import { ArrowLeft, Heart, Share2, ClipboardCheck, Info, MapPin, Bone, CheckCircle2 } from 'lucide-react';

const PetDetails = () => {
    const { id } = useParams();
    const [pet, setPet] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchPet = async () => {
            try {
                const data = await api.pets.getById(id);
                setPet(data);
            } catch (error) {
                console.error("Failed to fetch pet details", error);
            } finally {
                setLoading(false);
            }
        };
        fetchPet();
    }, [id]);

    if (loading) return <div className="min-h-screen flex items-center justify-center"><div className="h-12 w-12 border-4 border-primary border-t-transparent rounded-full animate-spin"></div></div>;

    if (!pet) return <div className="min-h-screen flex flex-col items-center justify-center p-4">
        <h2 className="text-3xl font-black mb-4">Pet Not Found</h2>
        <Link to="/adoption"><Button>Back to Adoption Center</Button></Link>
    </div>;

    return (
        <div className="max-w-7xl mx-auto px-4 py-12 lg:py-20">
            <Link to="/adoption" className="inline-flex items-center gap-2 text-gray-500 font-bold hover:text-primary transition-colors mb-12 group">
                <ArrowLeft size={18} className="group-hover:-translate-x-1 transition-transform" /> Back to Search
            </Link>

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 lg:gap-24">
                {/* Images & Quick Info */}
                <div className="lg:col-span-7 space-y-10">
                    <div className="aspect-[4/5] rounded-[4rem] overflow-hidden shadow-2xl relative group">
                        <img src={pet.image} alt={pet.name} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-[2s]" />
                        <div className="absolute top-8 right-8 flex flex-col gap-4">
                            <button className="h-14 w-14 bg-white/90 backdrop-blur-md rounded-2xl flex items-center justify-center shadow-xl hover:bg-primary hover:text-white transition-all">
                                <Heart size={24} />
                            </button>
                            <button className="h-14 w-14 bg-white/90 backdrop-blur-md rounded-2xl flex items-center justify-center shadow-xl hover:bg-primary hover:text-white transition-all">
                                <Share2 size={24} />
                            </button>
                        </div>
                    </div>

                    <div className="grid grid-cols-2 sm:grid-cols-4 gap-6">
                        {[
                            { label: 'Breed', value: pet.breed },
                            { label: 'Age', value: pet.age },
                            { label: 'Gender', value: pet.gender },
                            { label: 'Size', value: pet.size },
                        ].map((spec) => (
                            <div key={spec.label} className="bg-gray-50 p-6 rounded-3xl border border-gray-100 hover:bg-white hover:shadow-xl transition-all group">
                                <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest mb-1 group-hover:text-primary">{spec.label}</p>
                                <p className="text-lg font-black text-gray-900">{spec.value}</p>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Story & Adoption Action */}
                <div className="lg:col-span-5 flex flex-col pt-4">
                    <Badge variant="playful" className="mb-6 w-fit h-10 px-6 bg-primary/10 text-primary border-none">Ready for Adoption</Badge>
                    <h1 className="text-6xl md:text-7xl font-black text-gray-900 mb-4 tracking-tight leading-none">{pet.name}</h1>
                    <div className="flex items-center gap-2 text-gray-500 font-bold mb-10 italic">
                        <MapPin size={18} /> Currently at Brooklyn Shelter
                    </div>

                    <div className="p-10 bg-gray-50 rounded-[3rem] border border-gray-100 mb-10 relative overflow-hidden group hover:bg-white hover:shadow-2xl transition-all duration-500">
                        <div className="absolute -top-10 -right-10 opacity-[0.03] group-hover:opacity-[0.07] transition-opacity">
                            <Bone size={200} />
                        </div>
                        <h2 className="text-2xl font-black mb-6 text-gray-900">My Story</h2>
                        <p className="text-xl text-gray-600 font-medium leading-[1.8] relative z-10">
                            {pet.story}
                        </p>
                    </div>

                    <div className="space-y-6 mb-12">
                        <h3 className="font-black uppercase tracking-widest text-xs text-gray-400">Personal Traits</h3>
                        <div className="flex flex-wrap gap-3">
                            {pet.traits.map(trait => (
                                <Badge key={trait} className="bg-white border-gray-100 py-3 px-6 rounded-2xl shadow-sm text-gray-700 font-bold hover:scale-110 transition-transform">
                                    <CheckCircle2 size={16} className="text-health mr-2" /> {trait}
                                </Badge>
                            ))}
                        </div>
                    </div>

                    <div className="mt-auto pt-10 border-t border-gray-100">
                        <Button size="lg" className="w-full h-24 rounded-[1.8rem] text-2xl font-black flex items-center justify-center gap-4 shadow-2xl shadow-primary/30 group">
                            Start Adoption Process <ArrowLeft size={24} className="rotate-180 group-hover:translate-x-2 transition-transform" />
                        </Button>
                        <p className="mt-6 text-center text-sm font-bold text-gray-400 flex items-center justify-center gap-2">
                            <ClipboardCheck size={18} /> Full medical clearance provided
                        </p>
                    </div>
                </div>
            </div>

            {/* Preparation Section */}
            <section className="mt-40 grid grid-cols-1 md:grid-cols-2 gap-12">
                <Card className="rounded-[4rem] p-12 lg:p-20 bg-gray-50 border-none group hover:bg-white hover:shadow-2xl transition-all duration-500">
                    <h2 className="text-3xl font-black mb-8 leading-tight">Adoption Preparation</h2>
                    <ul className="space-y-6">
                        {[
                            'Proof of identification and residence',
                            'Application review & background check',
                            'Home visit coordination',
                            'A starter kit for your new family member',
                        ].map((item, i) => (
                            <li key={i} className="flex items-start gap-4 text-lg font-medium text-gray-600">
                                <div className="h-6 w-6 rounded-full bg-primary/10 flex items-center justify-center mt-1 shrink-0"><CheckCircle2 size={16} className="text-primary" /></div>
                                {item}
                            </li>
                        ))}
                    </ul>
                </Card>
                <div className="flex flex-col justify-center">
                    <h2 className="text-4xl lg:text-5xl font-black mb-8 leading-tight">We help you <br /><span className="text-primary">every step</span> of the way.</h2>
                    <p className="text-xl text-gray-500 font-medium leading-relaxed mb-10 max-w-lg">
                        Our adoption experts will help guide you through the transition and provide ongoing support for the first 90 days.
                    </p>
                    <Button variant="outline" size="lg" className="w-fit rounded-2xl border-gray-200">Talk to Adoption Expert</Button>
                </div>
            </section>
        </div>
    );
};

export default PetDetails;

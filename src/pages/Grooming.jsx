import React from 'react';
import Button from '../components/ui/Button';
import { Card, CardContent } from '../components/ui/Card';
import { Heart, CheckCircle2, Scissors, Sparkles, ShowerHead, Star, Clock } from 'lucide-react';

const Grooming = () => {
    const packages = [
        {
            name: "The Basic Refresh",
            price: 35,
            duration: "45 mins",
            features: ["Bath & Blow Dry", "Brush Out", "Ear Cleaning", "Nail Trim"],
            color: "bg-blue-50 text-primary",
            icon: <ShowerHead />,
            recommended: false
        },
        {
            name: "The Pawsome Premium",
            price: 65,
            duration: "1.5 hours",
            features: ["Full Haircut", "Berry Facial", "Teeth Brushing", "Scented Spray", "De-shedding"],
            color: "bg-primary text-white",
            icon: <Scissors />,
            recommended: true
        },
        {
            name: "The Ultra Spa Luxe",
            price: 95,
            duration: "2.5 hours",
            features: ["Mud Bath Treatment", "Paw Pad Therapy", "Luxury Blowout", "Silky Coat Polish", "Pet Massage"],
            color: "bg-gray-900 text-white",
            icon: <Sparkles />,
            recommended: false
        }
    ];

    return (
        <div className="max-w-7xl mx-auto px-4 py-20 space-y-32">
            {/* Hero Section */}
            <section className="relative overflow-hidden rounded-[4rem] bg-gray-900 p-12 md:p-24 text-white">
                <div className="absolute top-0 right-0 w-1/2 h-full opacity-20 pointer-events-none">
                    <img src="https://images.unsplash.com/photo-1516734212186-a967f81ad0d7?auto=format&fit=crop&q=80&w=600" className="w-full h-full object-cover" />
                </div>

                <div className="relative z-10 max-w-2xl">
                    <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/10 text-white text-xs font-black uppercase tracking-widest mb-8">
                        <Star size={14} className="text-playful" /> <span>5-Star Pet Spa</span>
                    </div>
                    <h1 className="text-5xl md:text-7xl font-black mb-8 leading-[1.1] tracking-tight">
                        Look Good. <br />
                        <span className="text-primary">Feel Better.</span>
                    </h1>
                    <p className="text-xl text-gray-400 font-medium mb-12 leading-relaxed">
                        Professional grooming services tailored to your pet's needs.
                        From a quick refresh to a luxury spa day, we handle it all with love.
                    </p>
                    <Button size="lg" className="rounded-2xl px-10 py-8 text-xl shadow-xl shadow-primary/20">
                        Book a Session
                    </Button>
                </div>
            </section>

            {/* Why Choose Us */}
            <section>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
                    <div className="space-y-6">
                        <div className="h-16 w-16 bg-health/10 text-health rounded-2xl flex items-center justify-center">
                            <Heart size={32} />
                        </div>
                        <h3 className="text-2xl font-black">Certified Stylists</h3>
                        <p className="text-gray-500 font-medium">Our groomers are certified professionals who specialize in stress-free handling.</p>
                    </div>
                    <div className="space-y-6">
                        <div className="h-16 w-16 bg-primary/10 text-primary rounded-2xl flex items-center justify-center">
                            <Sparkles size={32} />
                        </div>
                        <h3 className="text-2xl font-black">Eco-Friendly</h3>
                        <p className="text-gray-500 font-medium">We use 100% natural, hypoallergenic shampoos and conditioners for ultimate skin health.</p>
                    </div>
                    <div className="space-y-6">
                        <div className="h-16 w-16 bg-playful/10 text-playful rounded-2xl flex items-center justify-center">
                            <Clock size={32} />
                        </div>
                        <h3 className="text-2xl font-black">Speed & Care</h3>
                        <p className="text-gray-500 font-medium">Efficient service without ever rushing. Your pet's comfort is our top priority.</p>
                    </div>
                </div>
            </section>

            {/* Pricing Packages */}
            <section className="space-y-16">
                <div className="text-center max-w-2xl mx-auto">
                    <h2 className="text-4xl font-black mb-4">Choose Your Package</h2>
                    <p className="text-gray-500 font-bold italic">Transparent pricing for every budget and pet type.</p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                    {packages.map((pkg, i) => (
                        <Card key={i} className={`rounded-[3rem] p-4 border-gray-100 shadow-sm relative overflow-hidden transition-all duration-500 hover:shadow-2xl hover:-translate-y-2 ${pkg.recommended ? 'ring-2 ring-primary scale-105 z-10' : ''}`}>
                            {pkg.recommended && (
                                <div className="absolute top-6 right-6">
                                    <span className="bg-primary text-white text-[10px] font-black uppercase tracking-widest px-3 py-1 rounded-full">Recommended</span>
                                </div>
                            )}
                            <CardContent className="p-8">
                                <div className={`h-16 w-16 ${pkg.color} rounded-2xl flex items-center justify-center mb-8 shadow-lg`}>
                                    {React.cloneElement(pkg.icon, { size: 32 })}
                                </div>
                                <h3 className="text-2xl font-black mb-2">{pkg.name}</h3>
                                <div className="flex items-baseline gap-2 mb-8">
                                    <span className="text-4xl font-black">${pkg.price}</span>
                                    <span className="text-gray-400 font-bold">/session</span>
                                </div>

                                <ul className="space-y-4 mb-12">
                                    {pkg.features.map((feature, idx) => (
                                        <li key={idx} className="flex items-center gap-3 font-bold text-gray-600">
                                            <CheckCircle2 size={18} className="text-health" /> {feature}
                                        </li>
                                    ))}
                                </ul>

                                <Button
                                    className={`w-full py-6 rounded-2xl font-black transition-all ${pkg.recommended ? 'bg-primary shadow-lg shadow-primary/30' : 'bg-gray-100 text-gray-900'}`}
                                >
                                    Select Package
                                </Button>
                                <p className="text-center mt-6 text-xs text-gray-400 font-bold flex items-center justify-center gap-2">
                                    <Clock size={12} /> Approx {pkg.duration}
                                </p>
                            </CardContent>
                        </Card>
                    ))}
                </div>
            </section>
        </div>
    );
};

export default Grooming;

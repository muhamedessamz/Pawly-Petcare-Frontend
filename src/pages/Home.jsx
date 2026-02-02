import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { api } from '../services/api';
import ProductCard from '../components/features/ProductCard';
import DoctorCard from '../components/features/DoctorCard';
import Button from '../components/ui/Button';
import Badge from '../components/ui/Badge';
import { Card } from '../components/ui/Card';
import { ArrowRight, ShieldCheck, Truck, HeartPulse, Sparkles, Star, Calendar, Quote, Store, Heart, Clock, Shield, Users, CheckCircle2 } from 'lucide-react';
import doctorsData from '../services/mockData/doctors.json';
import staticBlogData from '../services/mockData/blog.json';

const Home = () => {
    const [featuredProducts, setFeaturedProducts] = useState([]);
    const [featuredDoctors, setFeaturedDoctors] = useState([]);
    const [latestArticles, setLatestArticles] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        // Load static/mock data immediately
        setFeaturedDoctors(doctorsData.filter(d => d.id !== 0).slice(0, 2));

        const fetchData = async () => {
            try {
                const [products, blog] = await Promise.all([
                    api.products.getAll().catch(() => []), // Safe fallback
                    api.blog.getAll().catch(() => []),
                ]);
                setFeaturedProducts(products.slice(0, 4));

                // Merge static data with backend data (Static first)
                setLatestArticles([...staticBlogData, ...blog].slice(0, 3));
            } catch (error) {
                console.error('Failed to fetch data', error);
            } finally {
                setLoading(false);
            }
        };
        fetchData();
    }, []);

    return (
        <div className="space-y-16 pb-24 overflow-hidden">
            {/* Hero Section */}
            <section className="relative px-4 pt-12 lg:pt-16">
                <div className="absolute top-0 right-0 -mr-24 -mt-24 h-96 w-96 bg-primary/10 rounded-full blur-3xl"></div>
                <div className="absolute bottom-0 left-0 -ml-24 -mb-24 h-96 w-96 bg-playful/10 rounded-full blur-3xl"></div>

                <div className="max-w-7xl mx-auto relative grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
                    <div className="max-w-2xl text-center lg:text-left">
                        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 text-primary text-sm font-bold mb-8 animate-bounce">
                            <Sparkles size={16} /> <span>New: Virtual Vet Consultations</span>
                        </div>
                        <h1 className="text-5xl md:text-7xl font-black text-gray-900 leading-[1.1] tracking-tight mb-8">
                            Love your pet <br />
                            <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-health">
                                Like Family.
                            </span>
                        </h1>
                        <p className="text-xl text-gray-500 leading-relaxed mb-10 max-w-lg mx-auto lg:mx-0 font-medium">
                            Join 50,000+ happy pets. We provide premium nutrition, expert medical care,
                            and professional grooming all in one place.
                        </p>
                        <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
                            <Link to="/store">
                                <Button size="lg" className="w-full sm:w-auto shadow-2xl shadow-primary/30 group">
                                    Explore Store <ArrowRight size={20} className="ml-2 group-hover:translate-x-1 transition-transform" />
                                </Button>
                            </Link>
                            <Link to="/clinic">
                                <Button variant="outline" size="lg" className="w-full sm:w-auto border-gray-200 hover:border-health hover:text-health">
                                    Find a Doctor
                                </Button>
                            </Link>
                        </div>

                        <div className="mt-12 flex items-center justify-center lg:justify-start gap-8 grayscale opacity-50">
                            <div className="flex items-center gap-1 font-bold text-gray-900">
                                <Star size={20} fill="currentColor" className="text-playful" /> 4.9/5 Rating
                            </div>
                            <div className="h-4 w-px bg-gray-200"></div>
                            <div className="flex items-center gap-1 font-bold text-gray-900 uppercase text-xs tracking-widest">
                                Verified Care
                            </div>
                        </div>
                    </div>

                    <div className="relative group">
                        <div className="relative z-10 w-full h-full transform transition-all duration-700 rotate-3 hover:rotate-0 hover:scale-105 rounded-[3.5rem] overflow-hidden shadow-2xl shadow-primary/10">
                            <img
                                src="https://www.mrmochaspet.com/cdn/shop/files/Screen_Shot_2024-02-28_at_7.27.25_PM.png?v=1709166485&width=1020"
                                alt="Pawly Pet"
                                className="w-full h-full object-cover"
                            />
                        </div>
                        <div className="absolute top-4 right-4 sm:-top-6 sm:-right-6 bg-white p-3 sm:p-4 rounded-xl sm:rounded-2xl shadow-xl z-20 animate-pulse border border-gray-100 flex items-center gap-3">
                            <div className="h-8 w-8 sm:h-10 sm:w-10 bg-blue-100 text-health rounded-full flex items-center justify-center">
                                <Calendar size={18} className="sm:w-5 sm:h-5" />
                            </div>
                            <div>
                                <p className="text-[10px] text-gray-400 font-bold uppercase tracking-tight">Next Visit</p>
                                <p className="text-xs sm:text-sm font-bold">Tomorrow, 10:00 AM</p>
                            </div>
                        </div>
                        <div className="absolute bottom-4 left-4 sm:-bottom-16 sm:-left-16 bg-white p-4 sm:p-6 rounded-2xl sm:rounded-3xl shadow-2xl z-20 border border-gray-100 flex flex-col max-w-[150px] sm:max-w-[200px]">
                            <div className="flex -space-x-2 sm:-space-x-3 mb-2 sm:mb-4">
                                {[1, 2, 3].map(i => (
                                    <div key={i} className="h-8 w-8 sm:h-10 sm:w-10 rounded-full border-2 sm:border-4 border-white overflow-hidden shadow-sm">
                                        <img src={`https://i.pravatar.cc/100?img=${i + 10}`} alt="User" />
                                    </div>
                                ))}
                            </div>
                            <p className="text-[10px] sm:text-sm font-bold text-gray-900 leading-tight">Trusted by over 10k owners locally.</p>
                        </div>
                    </div>
                </div>
            </section>

            {/* Services Grid (Bento Style) */}
            <section className="px-4 pt-12 lg:pt-32 pb-12">
                <div className="max-w-7xl mx-auto">
                    <div className="text-center mb-16 px-4">
                        <h2 className="text-4xl font-black text-gray-900 mb-4">Everything Under One Roof</h2>
                        <p className="text-gray-500 max-w-2xl mx-auto text-lg font-medium">Integrated services designed for the modern pet owner.</p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-12 gap-6">
                        <div className="md:col-span-8 bg-primary/5 rounded-[2.5rem] p-10 relative overflow-hidden group">
                            <div className="relative z-10 flex flex-col h-full">
                                <div className="h-14 w-14 bg-primary text-white rounded-2xl flex items-center justify-center mb-8 shadow-lg shadow-primary/30">
                                    <HeartPulse size={28} />
                                </div>
                                <h3 className="text-3xl font-bold mb-4">Health Clinic</h3>
                                <p className="text-gray-600 text-lg mb-8 max-w-sm">Certified vets available 24/7 for surgeries, vaccinations, and checkups.</p>
                                <Link to="/clinic" className="mt-auto">
                                    <Button className="rounded-xl shadow-lg shadow-primary/10">Book Online</Button>
                                </Link>
                            </div>
                            <div className="absolute top-0 right-0 w-3/5 h-full group-hover:scale-105 transition-transform duration-700 [mask-image:linear-gradient(to_left,black,transparent)]">
                                <img
                                    src="https://images.unsplash.com/photo-1599443015574-be5fe8a05783?auto=format&fit=crop&q=80&w=600"
                                    className="w-full h-full object-cover"
                                    alt="Health Clinic"
                                />
                            </div>
                        </div>

                        <div className="md:col-span-4 bg-playful/5 rounded-[2.5rem] p-10 flex flex-col">
                            <div className="h-14 w-14 bg-playful text-white rounded-2xl flex items-center justify-center mb-8 shadow-lg shadow-playful/30">
                                <Store size={28} />
                            </div>
                            <h3 className="text-3xl font-bold mb-4">Pet Store</h3>
                            <p className="text-gray-600 text-lg mb-8">Premium foods, treats, and accessories delivered.</p>
                            <Link to="/store" className="mt-auto">
                                <Button variant="playful" className="rounded-xl">Shop Collection</Button>
                            </Link>
                        </div>

                        <div className="md:col-span-4 bg-health/5 rounded-[2.5rem] p-10 flex flex-col">
                            <div className="h-14 w-14 bg-health text-white rounded-2xl flex items-center justify-center mb-8 shadow-lg shadow-health/30">
                                <ShieldCheck size={28} />
                            </div>
                            <h3 className="text-3xl font-bold mb-4">Health Records</h3>
                            <p className="text-gray-600 text-lg">Digital medical records at your fingertips.</p>
                        </div>

                        <div className="md:col-span-8 bg-gray-100 rounded-[2.5rem] p-10 flex flex-col md:flex-row items-center gap-8 justify-between group/delivery overflow-hidden relative">
                            <div className="relative z-10">
                                <div className="h-14 w-14 bg-gray-900 text-white rounded-2xl flex items-center justify-center mb-8 shadow-lg">
                                    <Truck size={28} />
                                </div>
                                <h3 className="text-3xl font-bold mb-4">Fast Delivery</h3>
                                <p className="text-gray-600 text-lg">Local doorstep delivery within 2 hours.</p>
                            </div>
                            <div className="flex gap-4 p-4 bg-white/50 backdrop-blur-sm rounded-3xl border border-white/50 relative z-10 transition-transform duration-500 group-hover/delivery:scale-105">
                                <div className="text-center px-4 border-r border-gray-200">
                                    <p className="text-2xl font-black">2h</p>
                                    <p className="text-xs font-bold text-gray-400 uppercase tracking-tighter">Avg. Time</p>
                                </div>
                                <div className="text-center px-4">
                                    <p className="text-2xl font-black">FREE</p>
                                    <p className="text-xs font-bold text-gray-400 uppercase tracking-tighter">Over $50</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Featured Products */}
            <section className="px-4 bg-gray-50/50 py-16 relative overflow-hidden">
                <div className="max-w-7xl mx-auto relative z-10">
                    <div className="flex flex-col md:flex-row justify-between items-center md:items-end mb-16 text-center md:text-left gap-6">
                        <div>
                            <h2 className="text-4xl font-black text-gray-900 mb-4 tracking-tight">Trending Essentials</h2>
                            <p className="text-gray-500 text-lg font-medium">Top picks for your furry best friend this week.</p>
                        </div>
                        <Link to="/store">
                            <Button variant="outline" className="rounded-xl flex items-center gap-2 group border-gray-200">
                                Browse Full Store <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
                            </Button>
                        </Link>
                    </div>

                    {loading ? (
                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
                            {[...Array(4)].map((_, i) => (
                                <div key={i} className="aspect-[4/5] bg-gray-200 rounded-[2rem] animate-pulse"></div>
                            ))}
                        </div>
                    ) : (
                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
                            {featuredProducts.map((product) => (
                                <ProductCard key={product.id} product={product} />
                            ))}
                        </div>
                    )}
                </div>
            </section>

            {/* Premium Accessories CTA */}
            <section className="px-4 py-4">
                <div className="max-w-7xl mx-auto">
                    <div className="flex flex-col lg:flex-row gap-6 items-stretch">
                        {/* Text Card */}
                        <div className="flex-1 bg-gray-900 rounded-[2rem] px-6 md:px-10 py-6 md:py-10 text-white group relative overflow-hidden flex flex-col justify-center border border-white/5">
                            <div className="relative z-10">
                                <Badge variant="playful" className="bg-primary/20 text-primary border-primary/30 mb-4 px-4 py-1.5 animate-pulse">New Collection</Badge>
                                <h2 className="text-3xl md:text-5xl font-black mb-4 leading-tight tracking-tight">Luxury <br /><span className="text-primary">Accessories</span> for Your Elite Pet</h2>
                                <p className="text-base md:text-lg text-gray-400 font-medium mb-6 leading-relaxed italic max-w-[90%]">
                                    From handcrafted leather collars to smart GPS trackers, give your pet the best in style and safety.
                                </p>

                                <div className="grid grid-cols-2 gap-4 mb-8">
                                    <div className="flex items-center gap-2 text-sm text-gray-300 font-medium">
                                        <div className="h-6 w-6 rounded-full bg-primary/10 flex items-center justify-center text-primary">
                                            <ShieldCheck size={14} />
                                        </div>
                                        Premium Quality
                                    </div>
                                    <div className="flex items-center gap-2 text-sm text-gray-300 font-medium">
                                        <div className="h-6 w-6 rounded-full bg-primary/10 flex items-center justify-center text-primary">
                                            <Truck size={14} />
                                        </div>
                                        Fast Delivery
                                    </div>
                                </div>

                                <Link to="/store?category=Accessories">
                                    <Button size="md" className="rounded-xl px-8 py-3.5 text-base shadow-2xl shadow-primary/20 hover:scale-105 transition-all duration-300 bg-primary border-none text-white font-bold">
                                        Explore Collection
                                    </Button>
                                </Link>
                            </div>
                            {/* Sophisticated background glow */}
                            <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-primary/20 rounded-full -mr-48 -mt-48 blur-[120px] group-hover:bg-primary/30 transition-all duration-700"></div>
                            <div className="absolute bottom-0 left-0 w-64 h-64 bg-playful/10 rounded-full -ml-32 -mb-32 blur-[80px]"></div>
                        </div>

                        {/* Image Card */}
                        <div className="lg:w-[35%] h-[380px] lg:h-auto rounded-[2rem] overflow-hidden group relative border border-white/5">
                            <img
                                src="https://images.unsplash.com/photo-1583337130417-3346a1be7dee?auto=format&fit=crop&q=80&w=800"
                                className="w-full h-full object-cover object-bottom transition-transform duration-1000 group-hover:scale-110"
                            />
                            <div className="absolute inset-0 bg-gradient-to-t from-gray-900/60 via-transparent to-transparent"></div>

                            {/* Floating Badge */}
                            <div className="absolute top-6 right-6">
                                <div className="bg-white/10 backdrop-blur-md px-4 py-2 rounded-full border border-white/20 text-xs font-bold text-white tracking-wider flex items-center gap-2 shadow-2xl">
                                    <Sparkles size={12} className="text-primary" />
                                    LIMITED EDITION
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Testimonials */}
            <section className="px-4 py-2 bg-white">
                <div className="max-w-7xl mx-auto">
                    <div className="flex flex-col lg:flex-row gap-6 items-stretch">
                        {/* Testimonial Card */}
                        <div className="flex-1 bg-gray-900 rounded-[2rem] px-6 md:px-10 py-6 md:py-10 text-white relative overflow-hidden flex flex-col justify-center border border-white/5 group">
                            <div className="relative z-10">
                                <div className="flex items-center gap-1 mb-4">
                                    {[1, 2, 3, 4, 5].map((s) => (
                                        <Star key={s} size={14} className="fill-playful text-playful" />
                                    ))}
                                    <span className="text-xs font-bold text-gray-500 ml-2 uppercase tracking-widest">Trustpilot 4.9/5</span>
                                </div>
                                <h2 className="text-3xl md:text-5xl font-black mb-4 tracking-tight">Owners love us. <br /> Pets do too.</h2>
                                <p className="text-gray-400 text-base md:text-lg font-medium leading-relaxed italic mb-8 max-w-[90%]">
                                    "I used to struggle with finding a reliable vet AND quality food.
                                    Pawly made it effortless. The clinic staff is amazing and the delivery is lightning fast!"
                                </p>
                                <div className="flex items-center gap-4">
                                    <div className="h-14 w-14 rounded-full overflow-hidden border-2 border-white/20 p-0.5 relative">
                                        <img src="https://i.pravatar.cc/150?u=4" alt="Happy Customer" className="w-full h-full rounded-full object-cover" />
                                        <div className="absolute -bottom-1 -right-1 bg-primary rounded-full p-1 border-2 border-gray-900">
                                            <CheckCircle2 size={10} className="text-white" />
                                        </div>
                                    </div>
                                    <div>
                                        <div className="flex items-center gap-2">
                                            <p className="text-white font-bold text-base">Alex Rivera</p>
                                            <Badge className="bg-white/5 text-[10px] py-0 px-2 h-4 border-white/10 text-gray-400">Verified Buyer</Badge>
                                        </div>
                                        <p className="text-gray-500 font-medium text-sm">Golden Retriever Mom</p>
                                    </div>
                                </div>
                            </div>
                            <div className="absolute -bottom-24 -left-24 w-64 h-64 bg-playful/10 rounded-full blur-[80px]"></div>
                        </div>

                        {/* Stats Card */}
                        <div className="lg:w-[35%] rounded-[2rem] overflow-hidden relative p-8 flex items-center justify-center bg-gray-900 group border border-white/5">
                            <div className="absolute inset-0 z-0 opacity-20">
                                <img
                                    src="https://images.unsplash.com/photo-1548199973-03cce0bbc87b?auto=format&fit=crop&q=80&w=600"
                                    className="w-full h-full object-cover grayscale transition-all duration-700 group-hover:scale-110"
                                />
                                <div className="absolute inset-0 bg-gray-900/60"></div>
                            </div>
                            <div className="relative z-10 w-full space-y-4">
                                <div className="grid grid-cols-2 gap-3">
                                    <div className="bg-white/5 backdrop-blur-xl p-5 rounded-3xl border border-white/10 hover:bg-white/10 transition-all duration-300">
                                        <div className="h-8 w-8 rounded-full bg-primary/20 flex items-center justify-center text-primary mb-3">
                                            <Users size={16} />
                                        </div>
                                        <p className="text-3xl font-black text-white mb-0.5">50k+</p>
                                        <p className="text-gray-500 font-bold uppercase text-[9px] tracking-widest">Active Pets</p>
                                    </div>
                                    <div className="bg-white/5 backdrop-blur-xl p-5 rounded-3xl border border-white/10 hover:bg-white/10 transition-all duration-300 mt-6">
                                        <div className="h-8 w-8 rounded-full bg-playful/20 flex items-center justify-center text-playful mb-3">
                                            <Heart size={16} />
                                        </div>
                                        <p className="text-3xl font-black text-white mb-0.5">100%</p>
                                        <p className="text-gray-500 font-bold uppercase text-[9px] tracking-widest">Happiness</p>
                                    </div>
                                </div>
                                <div className="bg-white/5 backdrop-blur-xl p-5 rounded-3xl border border-white/10 hover:bg-white/10 transition-all duration-300 w-full flex items-center gap-5">
                                    <div className="h-10 w-10 rounded-full bg-blue-500/20 flex items-center justify-center text-blue-400">
                                        <Shield size={20} />
                                    </div>
                                    <div>
                                        <p className="text-2xl font-black text-white">24/7 Safety</p>
                                        <p className="text-gray-500 font-bold uppercase text-[9px] tracking-widest">Expert Support Guaranteed</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Founder Note Section */}
            <section className="px-4 py-20 relative overflow-hidden">
                <div className="absolute top-0 left-0 w-full h-full bg-health/5 skew-y-3 transform origin-top-left -z-10 bg-opacity-30"></div>
                <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-center gap-12 lg:gap-20">
                    <div className="w-full md:w-1/3 relative flex justify-center md:block">
                        <div className="aspect-[3/4] w-full max-w-[320px] rounded-[3rem] overflow-hidden shadow-2xl shadow-health/20 md:rotate-3 border-4 border-white transition-transform duration-500 hover:rotate-0">
                            <img
                                src="https://img.freepik.com/free-photo/close-up-health-worker_23-2149112506.jpg?t=st=1769968108~exp=1769971708~hmac=776163d86f26ae815d19154eb6dbe230a0e53b173b9720bffdc9e4a243b970a1"
                                alt="Dr. Richard Hamilton"
                                className="w-full h-full object-cover object-top"
                            />
                        </div>
                        <div className="absolute -bottom-6 right-1/2 translate-x-1/2 md:translate-x-0 md:-right-6 bg-white p-6 rounded-3xl shadow-xl flex flex-col items-center border border-gray-100 animate-bounce-slow z-10">
                            <div className="text-3xl font-black text-health mb-1">20+</div>
                            <div className="text-xs font-bold text-gray-400 uppercase tracking-widest">Years Exp.</div>
                        </div>
                    </div>

                    <div className="w-full md:w-2/3 flex flex-col items-center md:items-start text-center md:text-left">
                        <Badge variant="playful" className="bg-health text-white border-none mb-6">Meet the Founder</Badge>
                        <h2 className="text-4xl md:text-5xl font-black text-gray-900 mb-8 leading-tight">
                            "Veterinary care isn't just a job.<br />
                            <span className="text-health">It's a lifelong promise.</span>"
                        </h2>
                        <div className="space-y-6 text-xl text-gray-600 font-medium leading-relaxed">
                            <p>
                                When I started Pawly, I had one simple mission: to create a place where medical excellence meets genuine compassion.
                                We're not just treating symptoms; we're nurturing the bond between you and your family member.
                            </p>
                            <p>
                                Every specialist on our team has been handpicked not just for their credentials, but for their heart.
                                We treat your pet exactly the same way we treat our own—with patience, respect, and infinite love.
                            </p>
                        </div>

                        <div className="mt-12 flex flex-col sm:flex-row items-center gap-6 sm:gap-8">
                            <div className="font-english-script text-4xl text-gray-900 transform -rotate-3 select-none" style={{ fontFamily: 'Brush Script MT, cursive' }}>
                                Richard Hamilton
                            </div>
                            <div className="h-px w-12 sm:h-10 sm:w-px bg-gray-200"></div>
                            <div className="text-center sm:text-left">
                                <p className="font-bold text-gray-900 text-lg">Dr. Richard Hamilton</p>
                                <p className="text-health font-bold text-sm uppercase tracking-wider">Chief Medical Officer</p>
                            </div>
                        </div>
                    </div>
                </div>
            </section >

            {/* Learning Center (Blog Preview) */}
            <section className="px-4 pt-10 pb-20 lg:py-20 bg-gray-50/50">
                <div className="max-w-7xl mx-auto">
                    <div className="flex flex-col md:flex-row justify-between items-center md:items-end mb-16 gap-6">
                        <div className="text-center md:text-left">
                            <h2 className="text-4xl font-black text-gray-900 mb-4 tracking-tight">The Learning Center</h2>
                            <p className="text-gray-500 text-lg font-medium">Expert advice to help you care for your best friends.</p>
                        </div>
                        <Link to="/blog">
                            <Button variant="ghost" className="text-primary hover:bg-primary/5 font-bold group">
                                View All Articles <ArrowRight size={18} className="ml-2 group-hover:translate-x-1 transition-transform" />
                            </Button>
                        </Link>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                        {loading ? (
                            [...Array(3)].map((_, i) => (
                                <div key={i} className="h-96 bg-gray-200 rounded-[2.5rem] animate-pulse"></div>
                            ))
                        ) : (
                            latestArticles.map((article) => (
                                <Card key={article.id} className="rounded-[2.5rem] border-gray-100 overflow-hidden hover:shadow-2xl transition-all duration-500 group flex flex-col h-full bg-white">
                                    <div className="aspect-video relative overflow-hidden">
                                        <img src={article.image} alt={article.title} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" />
                                        <div className="absolute top-4 left-4">
                                            {/* This badge is for blog articles, not doctor availability */}
                                            <Badge variant="playful" className="bg-white/90 backdrop-blur-sm border-none shadow-sm">{article.category}</Badge>
                                        </div>
                                    </div>
                                    <div className="p-8 flex flex-col flex-grow">
                                        <p className="text-xs font-bold text-gray-400 uppercase tracking-widest mb-3">{article.date}</p>
                                        <h3 className="text-2xl font-black text-gray-900 mb-4 group-hover:text-primary transition-colors leading-tight">
                                            {article.title}
                                        </h3>
                                        <p className="text-gray-500 font-medium mb-8 line-clamp-2">
                                            {article.excerpt}
                                        </p>
                                        <Link to={`/blog/${article.id}`} className="mt-auto inline-flex items-center gap-2 text-primary font-black uppercase text-xs tracking-widest hover:gap-4 transition-all">
                                            Read More <ArrowRight size={16} />
                                        </Link>
                                    </div>
                                </Card>
                            ))
                        )}
                    </div>
                </div>
            </section >

            {/* Final Meet Doctors CTA */}
            <section className="px-4 max-w-7xl mx-auto pt-6 md:pt-12 pb-12">
                <div className="flex flex-col md:flex-row justify-center md:justify-between items-center mb-12 gap-6 text-center md:text-left">
                    <h2 className="text-4xl font-black text-gray-900 tracking-tight">Top Veterinary Specialists</h2>
                    <Link to="/clinic">
                        <Button variant="ghost" className="text-health hover:bg-health/5 font-bold group">
                            See Full Directory <ArrowRight size={18} className="ml-2 group-hover:translate-x-1 transition-transform" />
                        </Button>
                    </Link>
                </div>

                {
                    loading ? (
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                            {[...Array(2)].map((_, i) => (
                                <div key={i} className="h-64 bg-gray-100 rounded-[2.5rem] animate-pulse"></div>
                            ))}
                        </div>
                    ) : (
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                            {featuredDoctors.map((doctor) => (
                                <DoctorCard key={doctor.id} doctor={doctor} />
                            ))}
                        </div>
                    )
                }
            </section >

            {/* Newsletter / Join */}
            <section className="px-4 py-8 bg-gray-50">
                <div className="max-w-4xl mx-auto text-center">
                    <h2 className="text-4xl font-black mb-6">Stay ahead on pet wellness.</h2>
                    <p className="text-gray-500 text-lg mb-10 font-medium">Join 20k+ pet owners who receive our weekly nutrition tips and clinic updates.</p>
                    <form className="flex flex-col sm:flex-row gap-4 max-w-md mx-auto" onSubmit={(e) => e.preventDefault()}>
                        <input
                            type="email"
                            placeholder="Enter your email"
                            className="flex-1 px-6 py-4 rounded-2xl border border-white shadow-xl focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition-all"
                        />
                        <Button className="py-4 shadow-xl shadow-primary/20">Subscribe</Button>
                    </form>
                </div>
            </section >
        </div >
    );
};

export default Home;

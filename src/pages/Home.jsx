import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { api } from '../services/api';
import ProductCard from '../components/features/ProductCard';
import DoctorCard from '../components/features/DoctorCard';
import Button from '../components/ui/Button';
import Badge from '../components/ui/Badge';
import { Card } from '../components/ui/Card';
import { ArrowRight, ShieldCheck, Truck, HeartPulse, Sparkles, Star, Calendar, Quote, Store } from 'lucide-react';
import doctorsData from '../services/mockData/doctors.json';
import staticBlogData from '../services/mockData/blog.json';

const Home = () => {
    const [featuredProducts, setFeaturedProducts] = useState([]);
    const [featuredDoctors, setFeaturedDoctors] = useState([]);
    const [latestArticles, setLatestArticles] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const [products, blog] = await Promise.all([
                    api.products.getAll(),
                    api.blog.getAll().catch(() => []), // Fallback if backend empty/fails
                ]);
                setFeaturedProducts(products.slice(0, 4));
                setFeaturedDoctors(doctorsData.filter(d => d.id !== 0).slice(0, 4));
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

                    <div className="relative">
                        <div className="aspect-square relative z-10 rounded-[3rem] overflow-hidden shadow-2xl shadow-primary/20 rotate-3 hover:rotate-0 transition-transform duration-700">
                            <img
                                src="https://images.unsplash.com/photo-1583511655857-d19b40a7a54e?auto=format&fit=crop&q=80&w=800"
                                alt="Happy Dog"
                                className="w-full h-full object-cover"
                            />
                        </div>
                        {/* Floating UI segments */}
                        <div className="absolute top-12 right-12 bg-white p-4 rounded-2xl shadow-xl z-20 animate-pulse border border-gray-100 hidden sm:block">
                            <div className="flex items-center gap-3">
                                <div className="h-10 w-10 bg-green-100 text-health rounded-full flex items-center justify-center">
                                    <Calendar size={20} />
                                </div>
                                <div>
                                    <p className="text-xs text-gray-400 font-bold uppercase">Next Visit</p>
                                    <p className="text-sm font-bold">Tomorrow, 10:00 AM</p>
                                </div>
                            </div>
                        </div>
                        <div className="absolute -bottom-10 -left-10 bg-white p-6 rounded-3xl shadow-2xl z-20 border border-gray-100 hidden lg:block max-w-[200px]">
                            <div className="flex -space-x-3 mb-4">
                                {[1, 2, 3].map(i => (
                                    <div key={i} className="h-10 w-10 rounded-full border-4 border-white overflow-hidden">
                                        <img src={`https://i.pravatar.cc/100?img=${i + 10}`} alt="User" />
                                    </div>
                                ))}
                            </div>
                            <p className="text-sm font-bold text-gray-900">Trusted by over 10k owners locally.</p>
                        </div>
                    </div>
                </div>
            </section>

            {/* Services Grid (Bento Style) */}
            <section className="px-4 py-12">
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
                            <div className="absolute top-0 right-0 w-1/2 h-full opacity-10 group-hover:scale-110 transition-transform duration-700">
                                <img src="https://images.unsplash.com/photo-1599443015574-be5fe8a05783?auto=format&fit=crop&q=80&w=400" className="w-full h-full object-cover" />
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

                        <div className="md:col-span-8 bg-gray-100 rounded-[2.5rem] p-10 flex flex-col md:flex-row items-center gap-8 justify-between">
                            <div>
                                <div className="h-14 w-14 bg-gray-900 text-white rounded-2xl flex items-center justify-center mb-8 shadow-lg">
                                    <Truck size={28} />
                                </div>
                                <h3 className="text-3xl font-bold mb-4">Fast Delivery</h3>
                                <p className="text-gray-600 text-lg">Local doorstep delivery within 2 hours.</p>
                            </div>
                            <div className="flex gap-4 p-4 bg-white/50 backdrop-blur-sm rounded-3xl border border-white/50">
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
            <section className="px-4 py-20">
                <div className="max-w-7xl mx-auto bg-gray-900 rounded-[3.5rem] p-12 md:p-20 text-white relative overflow-hidden group">
                    <div className="absolute top-0 right-0 w-1/2 h-full opacity-30 pointer-events-none group-hover:scale-110 transition-transform duration-1000">
                        <img src="https://images.unsplash.com/photo-1583337130417-3346a1be7dee?auto=format&fit=crop&q=80&w=800" className="w-full h-full object-cover" />
                    </div>
                    <div className="relative z-10 max-w-xl">
                        <Badge variant="playful" className="bg-primary text-white border-none mb-6">New Collection</Badge>
                        <h2 className="text-4xl md:text-6xl font-black mb-8 leading-tight tracking-tight">Luxury <br /><span className="text-primary">Accessories</span> for Your Elite Pet</h2>
                        <p className="text-xl text-gray-400 font-medium mb-10 leading-relaxed italic">
                            From handcrafted leather collars to smart GPS trackers, give your pet the best in style and safety.
                        </p>
                        <Link to="/store?category=Accessories">
                            <Button size="lg" className="rounded-2xl px-10 py-6 text-xl shadow-2xl shadow-primary/20">
                                Shop Accessories
                            </Button>
                        </Link>
                    </div>
                </div>
            </section>

            {/* Testimonials */}
            <section className="px-4 py-12 bg-white">
                <div className="max-w-7xl mx-auto">
                    <div className="bg-gray-900 rounded-[3rem] p-12 md:p-24 relative overflow-hidden">
                        <div className="absolute top-0 right-0 w-1/3 h-full opacity-20 pointer-events-none">
                            <img src="https://images.unsplash.com/photo-1548199973-03cce0bbc87b?auto=format&fit=crop&q=80&w=400" className="w-full h-full object-cover" />
                        </div>

                        <div className="relative z-10 grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
                            <div>
                                <div className="h-14 w-14 bg-playful rounded-2xl flex items-center justify-center text-white mb-8 shadow-xl shadow-playful/20">
                                    <Quote size={28} />
                                </div>
                                <h2 className="text-4xl md:text-5xl font-black text-white mb-8 tracking-tight">Owners love us. <br /> Pets do too.</h2>
                                <p className="text-gray-400 text-xl font-medium leading-relaxed italic">
                                    "I used to struggle with finding a reliable vet AND quality food.
                                    Pawly made it effortless. The clinic staff is amazing and the delivery is lightning fast!"
                                </p>
                                <div className="mt-10 flex items-center gap-4">
                                    <div className="h-16 w-16 rounded-full overflow-hidden border-4 border-white/10 ring-4 ring-primary/20">
                                        <img src="https://i.pravatar.cc/150?u=4" alt="Happy Customer" />
                                    </div>
                                    <div>
                                        <p className="text-white font-bold text-lg">Alex Rivera</p>
                                        <p className="text-gray-500 font-medium">Golden Retriever Mom</p>
                                    </div>
                                </div>
                            </div>

                            <div className="grid grid-cols-2 gap-4">
                                <div className="space-y-4">
                                    <div className="bg-white/5 backdrop-blur-md p-6 rounded-3xl border border-white/10 hover:border-white/20 transition-colors">
                                        <p className="text-4xl font-black text-white mb-1">50k+</p>
                                        <p className="text-gray-500 font-bold uppercase text-xs tracking-widest">Active Pets</p>
                                    </div>
                                    <div className="bg-white/5 backdrop-blur-md p-6 rounded-3xl border border-white/10 mt-8">
                                        <p className="text-4xl font-black text-white mb-1">24/7</p>
                                        <p className="text-gray-500 font-bold uppercase text-xs tracking-widest">Support</p>
                                    </div>
                                </div>
                                <div className="space-y-4 pt-12">
                                    <div className="bg-white/5 backdrop-blur-md p-6 rounded-3xl border border-white/10">
                                        <p className="text-4xl font-black text-white mb-1">100%</p>
                                        <p className="text-gray-500 font-bold uppercase text-xs tracking-widest">Happiness</p>
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
                    <div className="w-full md:w-1/3 relative">
                        <div className="aspect-[3/4] rounded-[3rem] overflow-hidden shadow-2xl shadow-health/20 rotate-3 border-4 border-white">
                            <img
                                src="https://img.freepik.com/free-photo/close-up-health-worker_23-2149112506.jpg?t=st=1769968108~exp=1769971708~hmac=776163d86f26ae815d19154eb6dbe230a0e53b173b9720bffdc9e4a243b970a1"
                                alt="Dr. Richard Hamilton"
                                className="w-full h-full object-cover object-top"
                            />
                        </div>
                        <div className="absolute -bottom-6 -right-6 bg-white p-6 rounded-3xl shadow-xl flex flex-col items-center border border-gray-100 animate-bounce-slow">
                            <div className="text-3xl font-black text-health mb-1">20+</div>
                            <div className="text-xs font-bold text-gray-400 uppercase tracking-widest">Years Exp.</div>
                        </div>
                    </div>

                    <div className="w-full md:w-2/3">
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

                        <div className="mt-12 flex items-center gap-8">
                            <div className="font-english-script text-4xl text-gray-900 transform -rotate-3 select-none" style={{ fontFamily: 'Brush Script MT, cursive' }}>
                                Richard Hamilton
                            </div>
                            <div className="h-10 w-px bg-gray-200"></div>
                            <div>
                                <p className="font-bold text-gray-900 text-lg">Dr. Richard Hamilton</p>
                                <p className="text-health font-bold text-sm uppercase tracking-wider">Chief Medical Officer</p>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Learning Center (Blog Preview) */}
            <section className="px-4 py-20 bg-gray-50/50">
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
            </section>

            {/* Final Meet Doctors CTA */}
            <section className="px-4 max-w-7xl mx-auto py-12">
                <div className="flex flex-col md:flex-row justify-between items-center mb-12 gap-6">
                    <h2 className="text-4xl font-black text-gray-900 tracking-tight">Top Veterinary Specialists</h2>
                    <Link to="/clinic">
                        <Button variant="ghost" className="text-health hover:bg-health/5 font-bold group">
                            See Full Directory <ArrowRight size={18} className="ml-2 group-hover:translate-x-1 transition-transform" />
                        </Button>
                    </Link>
                </div>

                {loading ? (
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
                )}
            </section>

            {/* Newsletter / Join */}
            <section className="px-4 py-20 bg-primary/5 -mx-4 sm:-mx-6 lg:-mx-8">
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
            </section>
        </div>
    );
};

export default Home;

import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { api } from '../services/api';
import Badge from '../components/ui/Badge';
import { Calendar, User, ArrowRight, Search } from 'lucide-react';

const Blog = () => {
    const [posts, setPosts] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchPosts = async () => {
            const data = await api.blog.getAll();
            setPosts(data);
            setLoading(false);
        };
        fetchPosts();
    }, []);

    if (loading) return <div className="py-40 text-center flex flex-col items-center gap-4">
        <div className="h-12 w-12 border-4 border-primary border-t-transparent rounded-full animate-spin"></div>
        <p className="font-bold text-gray-500">Loading articles...</p>
    </div>;

    return (
        <div className="max-w-7xl mx-auto px-4 py-20 space-y-20">
            <header className="text-center max-w-3xl mx-auto space-y-6">
                <Badge variant="playful" className="uppercase tracking-widest px-4 py-1">The Pawly Journal</Badge>
                <h1 className="text-5xl md:text-6xl font-black tracking-tight">Expert Advice for <br /><span className="text-primary">Happy, Healthy Pets</span></h1>
                <p className="text-xl text-gray-500 font-medium italic leading-relaxed">
                    Discover tips, tricks, and medical insights from our world-class veterinary team.
                </p>
            </header>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
                {posts.map((post) => (
                    <article key={post.id} className="group cursor-pointer">
                        <Link to={`/blog/${post.id}`} className="space-y-6 block">
                            <div className="aspect-[16/10] rounded-[2.5rem] overflow-hidden shadow-2xl shadow-gray-200/50 border border-gray-100 relative">
                                <img src={post.image} alt={post.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" />
                                <div className="absolute top-6 left-6">
                                    <Badge variant="secondary" className="bg-white/90 backdrop-blur-sm text-gray-900 border-none shadow-sm">{post.category}</Badge>
                                </div>
                            </div>

                            <div className="space-y-4 px-4">
                                <div className="flex items-center gap-4 text-xs font-black text-gray-400 uppercase tracking-widest">
                                    <span className="flex items-center gap-1.5"><Calendar size={14} className="text-primary" /> {post.date}</span>
                                    <span className="h-1 w-1 bg-gray-200 rounded-full"></span>
                                    <span className="flex items-center gap-1.5"><User size={14} className="text-primary" /> {post.author}</span>
                                </div>
                                <h2 className="text-2xl font-black text-gray-900 leading-tight group-hover:text-primary transition-colors">{post.title}</h2>
                                <p className="text-gray-500 font-medium leading-relaxed italic">{post.excerpt}</p>
                                <div className="pt-4 flex items-center gap-2 text-primary font-black uppercase tracking-widest text-xs group-hover:gap-4 transition-all">
                                    Read Full Story <ArrowRight size={16} />
                                </div>
                            </div>
                        </Link>
                    </article>
                ))}
            </div>

            {/* Newsletter Section */}
            <section className="bg-gray-900 rounded-[3.5rem] p-12 md:p-20 text-white relative overflow-hidden">
                <div className="absolute top-0 right-0 w-64 h-64 bg-primary/20 rounded-full blur-[100px] -mr-32 -mt-32"></div>
                <div className="relative z-10 grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
                    <div className="space-y-6">
                        <h2 className="text-4xl font-black tracking-tight leading-tight">Join 50k+ Pet Owners <br />In Our Weekly Newsletter</h2>
                        <p className="text-gray-400 font-medium">Get exclusive health tips, product deals, and cute pet stories delivered to your inbox.</p>
                    </div>
                    <form className="flex flex-col sm:flex-row gap-4">
                        <input
                            type="email"
                            placeholder="your@email.com"
                            className="flex-1 h-16 rounded-2xl bg-white/10 border border-white/10 px-6 font-bold text-white focus:outline-none focus:border-primary transition-colors"
                        />
                        <button className="h-16 px-10 rounded-2xl bg-primary text-white font-black text-lg shadow-xl shadow-primary/20 hover:scale-105 active:scale-95 transition-all">
                            Subscribe Now
                        </button>
                    </form>
                </div>
            </section>
        </div>
    );
};

export default Blog;

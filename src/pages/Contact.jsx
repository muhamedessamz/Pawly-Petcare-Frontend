import React from 'react';
import Button from '../components/ui/Button';
import Input from '../components/ui/Input';
import { Mail, Phone, MapPin, Send, Instagram, Facebook, Twitter, Heart } from 'lucide-react';

const Contact = () => {
    const handleSubmit = (e) => {
        e.preventDefault();
        alert('Thank you for reaching out! We will get back to you shortly.');
    };

    return (
        <div className="max-w-7xl mx-auto px-4 py-20">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-20">
                {/* Contact Info */}
                <div className="space-y-12">
                    <div className="space-y-6">
                        <h1 className="text-5xl md:text-7xl font-black tracking-tight leading-none">
                            Let's Talk <br /><span className="text-primary">About Your Pet.</span>
                        </h1>
                        <p className="text-xl text-gray-500 font-medium italic leading-relaxed max-w-lg">
                            Have questions about our services or need medical advice?
                            Our team is here to help you 24/7.
                        </p>
                    </div>

                    <div className="space-y-8">
                        <div className="flex items-center gap-6 group">
                            <div className="h-16 w-16 bg-primary/10 text-primary rounded-3xl flex items-center justify-center group-hover:bg-primary group-hover:text-white transition-all duration-500">
                                <Mail size={28} />
                            </div>
                            <div>
                                <p className="text-xs font-black text-gray-400 uppercase tracking-widest mb-1">Email Us</p>
                                <p className="text-xl font-black text-gray-900">hello@pawly.com</p>
                            </div>
                        </div>
                        <div className="flex items-center gap-6 group">
                            <div className="h-16 w-16 bg-health/10 text-health rounded-3xl flex items-center justify-center group-hover:bg-health group-hover:text-white transition-all duration-500">
                                <Phone size={28} />
                            </div>
                            <div>
                                <p className="text-xs font-black text-gray-400 uppercase tracking-widest mb-1">Call Us</p>
                                <p className="text-xl font-black text-gray-900">1-800-PAWLY</p>
                            </div>
                        </div>
                        <div className="flex items-center gap-6 group">
                            <div className="h-16 w-16 bg-playful/10 text-playful rounded-3xl flex items-center justify-center group-hover:bg-playful group-hover:text-white transition-all duration-500">
                                <MapPin size={28} />
                            </div>
                            <div>
                                <p className="text-xs font-black text-gray-400 uppercase tracking-widest mb-1">Visit Us</p>
                                <p className="text-xl font-black text-gray-900">400 Brooklyn Heights, NY 11201</p>
                            </div>
                        </div>
                    </div>

                    <div className="pt-12 border-t border-gray-100">
                        <p className="text-xs font-black text-gray-400 uppercase tracking-widest mb-6">Follow Our Community</p>
                        <div className="flex gap-4">
                            {[Instagram, Facebook, Twitter].map((Icon, i) => (
                                <button key={i} className="h-12 w-12 rounded-2xl bg-gray-50 border border-gray-100 flex items-center justify-center hover:bg-primary hover:text-white hover:border-primary transition-all group">
                                    <Icon size={20} />
                                </button>
                            ))}
                        </div>
                    </div>
                </div>

                {/* Contact Form */}
                <div className="bg-white rounded-[3.5rem] p-10 md:p-16 shadow-2xl shadow-gray-200/50 border border-gray-100 relative overflow-hidden">
                    <div className="absolute top-0 right-0 p-8 opacity-[0.03] pointer-events-none">
                        <Heart size={300} fill="currentColor" className="text-primary" />
                    </div>

                    <form onSubmit={handleSubmit} className="space-y-8 relative z-10">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div className="space-y-2">
                                <label className="text-xs font-black text-gray-400 uppercase tracking-widest ml-2">Your Name</label>
                                <Input placeholder="e.g. Alex Smith" className="rounded-2xl border-gray-100 h-16 px-6 font-bold" required />
                            </div>
                            <div className="space-y-2">
                                <label className="text-xs font-black text-gray-400 uppercase tracking-widest ml-2">Email Address</label>
                                <Input type="email" placeholder="alex@example.com" className="rounded-2xl border-gray-100 h-16 px-6 font-bold" required />
                            </div>
                        </div>
                        <div className="space-y-2">
                            <label className="text-xs font-black text-gray-400 uppercase tracking-widest ml-2">Subject</label>
                            <Input placeholder="What are you inquiring about?" className="rounded-2xl border-gray-100 h-16 px-6 font-bold" required />
                        </div>
                        <div className="space-y-2">
                            <label className="text-xs font-black text-gray-400 uppercase tracking-widest ml-2">Message</label>
                            <textarea
                                className="w-full min-h-[200px] rounded-3xl border border-gray-100 bg-white px-6 py-6 font-bold text-gray-900 placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-primary/10 focus:border-primary transition-all"
                                placeholder="Tell us more..."
                                required
                            ></textarea>
                        </div>
                        <Button type="submit" className="w-full h-20 rounded-[1.5rem] text-xl font-black shadow-xl shadow-primary/20 group">
                            Send Message <Send size={20} className="ml-2 group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
                        </Button>
                    </form>
                </div>
            </div>

            {/* Map Section Placeholder */}
            <div className="mt-32 h-[500px] rounded-[4rem] bg-gray-100 overflow-hidden relative border-8 border-white shadow-2xl">
                <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1526778548025-fa2f459cd5c1?auto=format&fit=crop&q=80&w=1200')] bg-cover bg-center grayscale opacity-30"></div>
                <div className="absolute inset-0 flex items-center justify-center">
                    <div className="bg-white/90 backdrop-blur-md p-10 rounded-[2.5rem] text-center shadow-xl border border-white">
                        <div className="h-16 w-16 bg-primary rounded-2xl flex items-center justify-center text-white mx-auto mb-6 shadow-lg rotate-3">
                            <MapPin size={32} />
                        </div>
                        <h3 className="text-2xl font-black mb-2">Find Us In Brooklyn</h3>
                        <p className="text-gray-500 font-bold italic">Interactive map coming soon...</p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Contact;

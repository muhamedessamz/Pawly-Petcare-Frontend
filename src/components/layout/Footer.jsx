import React from 'react';
import { Link } from 'react-router-dom';
import { Heart, Facebook, Twitter, Instagram, Mail, Phone, MapPin } from 'lucide-react';

const Footer = () => {
    return (
        <footer className="bg-gray-900 text-gray-400 pt-24 pb-12 overflow-hidden relative w-full mt-auto mb-0 block">
            <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-primary via-health to-playful"></div>

            <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-16 mb-20">
                    <div className="space-y-8">
                        <Link to="/" className="flex items-center gap-2">
                            <div className="h-12 w-12 bg-primary rounded-2xl flex items-center justify-center text-white shadow-xl shadow-primary/20">
                                <Heart size={28} fill="currentColor" />
                            </div>
                            <span className="text-3xl font-black tracking-tight text-white flex items-baseline">
                                Pawly<span className="text-primary">.</span>
                            </span>
                        </Link>
                        <p className="text-lg font-medium leading-relaxed italic max-w-xs">
                            World-class care for your best friend. Join a community of happy pets and their owners.
                        </p>
                        <div className="flex gap-4">
                            {[Facebook, Instagram, Twitter].map((Icon, i) => (
                                <button key={i} className="h-12 w-12 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center hover:bg-primary transition-all hover:text-white group">
                                    <Icon size={20} />
                                </button>
                            ))}
                        </div>
                    </div>

                    <div>
                        <h4 className="text-white font-black text-lg mb-8 uppercase tracking-widest text-xs">Navigation</h4>
                        <ul className="space-y-4">
                            {[
                                { name: 'Home', path: '/' },
                                { name: 'Pet Store', path: '/store' },
                                { name: 'Vet Clinic', path: '/clinic' },
                                { name: 'Pet Adoption', path: '/adoption' },
                                { name: 'Grooming', path: '/grooming' },
                                { name: 'Blog', path: '/blog' }
                            ].map((item) => (
                                <li key={item.name}>
                                    <Link to={item.path} className="font-bold hover:text-white transition-colors flex items-center gap-2 group">
                                        <span className="h-1.5 w-0 bg-primary rounded-full group-hover:w-3 transition-all"></span>
                                        {item.name}
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    </div>

                    <div>
                        <h4 className="text-white font-black text-lg mb-8 uppercase tracking-widest text-xs">Services</h4>
                        <ul className="space-y-4">
                            {['Online Consult', 'Emergency Care', 'Pet Insurance', 'Pharmacy', 'Rewards'].map((item) => (
                                <li key={item}>
                                    <Link to="#" className="font-bold hover:text-white transition-colors flex items-center gap-2 group">
                                        <span className="h-1.5 w-0 bg-health rounded-full group-hover:w-3 transition-all"></span>
                                        {item}
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    </div>

                    <div className="bg-white/5 p-8 rounded-[3rem] border border-white/10">
                        <h4 className="text-white font-black text-lg mb-8 uppercase tracking-widest text-xs">Reach Us</h4>
                        <ul className="space-y-6">
                            <li className="flex items-start gap-4">
                                <MapPin className="text-primary shrink-0" size={20} />
                                <Link to="/contact" className="text-sm font-bold hover:text-white transition-colors">400 Brooklyn Heights, NY 11201</Link>
                            </li>
                            <li className="flex items-center gap-4">
                                <Phone className="text-health shrink-0" size={20} />
                                <span className="text-sm font-bold">1-800-PAWLY</span>
                            </li>
                            <li className="flex items-center gap-4">
                                <Mail className="text-playful shrink-0" size={20} />
                                <span className="text-sm font-bold">hello@pawly.com</span>
                            </li>
                        </ul>
                    </div>
                </div>

                <div className="pt-12 border-t border-white/10 flex flex-col md:flex-row justify-between items-center gap-8">
                    <p className="text-sm font-bold">© 2026 Pawly PetCare. Handcrafted with love.</p>
                    <div className="flex gap-8 text-xs font-black uppercase tracking-[0.2em]">
                        <Link to="#" className="hover:text-white transition-colors">Privacy</Link>
                        <Link to="#" className="hover:text-white transition-colors">Terms</Link>
                        <Link to="#" className="hover:text-white transition-colors">Cookies</Link>
                    </div>
                </div>
            </div>
        </footer>
    );
};

export default Footer;

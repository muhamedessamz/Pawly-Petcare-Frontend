import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { ShoppingCart, User, Stethoscope, Store, Home, Menu, X, Heart, Activity, PawPrint, Scissors } from 'lucide-react';
import Button from '../ui/Button';
import { cn } from '../../utils/cn';
import { useCart } from '../../context/CartContext';
import { useAuth } from '../../context/AuthContext';

const Navbar = () => {
    const { cartCount } = useCart();
    const { user, logout } = useAuth();
    const [isMenuOpen, setIsMenuOpen] = React.useState(false);
    const location = useLocation();

    const isActive = (path) => location.pathname === path;

    const navLinks = [
        { name: 'Home', path: '/', icon: <Home size={18} /> },
        { name: 'Store', path: '/store', icon: <Store size={18} /> },
        { name: 'Clinic', path: '/clinic', icon: <Stethoscope size={18} /> },
        { name: 'Adoption', path: '/adoption', icon: <Heart size={18} /> },
        { name: 'Grooming', path: '/grooming', icon: <Scissors size={18} /> },
        { name: 'Blog', path: '/blog', icon: <Activity size={18} /> },
    ];

    return (
        <nav className="border-b border-gray-100 bg-white/80 backdrop-blur-md sticky top-0 z-50 w-full">
            <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                <div className="flex h-18 justify-between items-center">
                    <div className="flex items-center gap-16">
                        <Link to="/" className="flex items-center gap-2 group shrink-0">
                            <div className="h-9 w-9 bg-primary/10 rounded-xl flex items-center justify-center text-primary group-hover:scale-110 transition-transform">
                                <PawPrint size={24} strokeWidth={2.5} />
                            </div>
                            <span className="text-2xl font-black tracking-tight flex items-baseline">
                                <span className="text-gray-900">Pawly</span>
                                <span className="text-primary">.</span>
                            </span>
                        </Link>

                        <div className="hidden lg:flex items-center gap-2">
                            {navLinks.map((link) => (
                                <Link
                                    key={link.path}
                                    to={link.path}
                                    className={cn(
                                        'px-4 py-2.5 rounded-xl text-sm font-semibold transition-all duration-200 flex items-center gap-2',
                                        isActive(link.path)
                                            ? 'bg-primary/10 text-primary'
                                            : 'text-gray-500 hover:text-gray-900 hover:bg-gray-50'
                                    )}
                                >
                                    {link.icon} {link.name}
                                </Link>
                            ))}
                        </div>
                    </div>

                    <div className="hidden md:flex items-center gap-6">
                        <Link to="/cart">
                            <Button variant="ghost" className="relative group h-9 w-9 p-0 rounded-xl flex items-center justify-center">
                                <ShoppingCart size={20} className="group-hover:text-primary transition-colors" />
                                {cartCount > 0 && (
                                    <span className="absolute -top-1 -right-1 h-5 w-5 bg-playful text-white text-[10px] font-black rounded-full flex items-center justify-center ring-2 ring-white">
                                        {cartCount}
                                    </span>
                                )}
                            </Button>
                        </Link>
                        <div className="h-6 w-px bg-gray-100"></div>

                        {user ? (
                            <div className="flex items-center gap-6">
                                <Link to="/profile">
                                    <Button variant="ghost" size="sm" className="gap-2 font-bold text-gray-700 hover:bg-gray-50 rounded-xl">
                                        <User size={18} /> Account
                                    </Button>
                                </Link>
                                <Button onClick={logout} variant="outline" size="sm" className="rounded-xl border-gray-200 font-bold hover:bg-red-50 hover:text-red-500 hover:border-red-100 transition-colors">
                                    Sign Out
                                </Button>
                            </div>
                        ) : (
                            <Link to="/login">
                                <Button variant="primary" size="sm" className="rounded-xl shadow-lg shadow-primary/20">
                                    Sign In
                                </Button>
                            </Link>
                        )}
                    </div>

                    <div className="flex lg:hidden">
                        <button
                            onClick={() => setIsMenuOpen(!isMenuOpen)}
                            className="p-2 text-gray-500 hover:text-gray-900 hover:bg-gray-100 rounded-xl transition-colors"
                        >
                            {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
                        </button>
                    </div>
                </div>
            </div>

            {/* Mobile Menu */}
            {isMenuOpen && (
                <div className="lg:hidden border-t border-gray-50 bg-white p-4 space-y-2">
                    {navLinks.map((link) => (
                        <Link
                            key={link.path}
                            to={link.path}
                            onClick={() => setIsMenuOpen(false)}
                            className={cn(
                                'flex items-center gap-3 px-4 py-3 rounded-xl text-base font-semibold transition-colors',
                                isActive(link.path) ? 'bg-primary/10 text-primary' : 'text-gray-500 hover:bg-gray-50'
                            )}
                        >
                            {link.icon} {link.name}
                        </Link>
                    ))}
                    <div className="pt-4 border-t border-gray-50 flex flex-col gap-2">
                        <Link to="/cart" onClick={() => setIsMenuOpen(false)}>
                            <Button variant="outline" className="w-full justify-start gap-3">
                                <ShoppingCart size={20} /> My Cart
                            </Button>
                        </Link>
                        {user ? (
                            <>
                                <Link to="/profile" onClick={() => setIsMenuOpen(false)}>
                                    <Button variant="ghost" className="w-full justify-start gap-3">
                                        <User size={20} /> My Profile
                                    </Button>
                                </Link>
                                <Button onClick={() => { logout(); setIsMenuOpen(false); }} variant="outline" className="w-full justify-start gap-3 text-red-500 hover:text-red-600 hover:bg-red-50 border-red-100">
                                    Sign Out
                                </Button>
                            </>
                        ) : (
                            <Link to="/login" onClick={() => setIsMenuOpen(false)}>
                                <Button variant="primary" className="w-full shadow-lg shadow-primary/20">
                                    Sign In
                                </Button>
                            </Link>
                        )}
                    </div>
                </div>
            )}
        </nav>
    );
};

export default Navbar;

import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { api } from '../services/api';
import Button from '../components/ui/Button';
import Input from '../components/ui/Input';
import { Card, CardHeader, CardTitle, CardContent, CardFooter } from '../components/ui/Card';
import { Mail, Lock, User, ShieldCheck, Heart, ArrowRight } from 'lucide-react';

const Register = () => {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        password: ''
    });
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();

    const handleRegister = async (e) => {
        e.preventDefault();
        setLoading(true);
        try {
            await api.auth.register(formData);
            alert('Registration successful! Please sign in.');
            navigate('/login');
        } catch (err) {
            console.error(err);
        } finally {
            setLoading(false);
        }
    };

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    return (
        <div className="min-h-[80vh] flex items-center justify-center px-4 py-12 relative overflow-hidden">
            {/* Background Decorations */}
            <div className="absolute top-1/4 right-1/4 w-96 h-96 bg-primary/10 rounded-full blur-3xl -z-10 animate-pulse"></div>
            <div className="absolute bottom-1/4 left-1/4 w-96 h-96 bg-health/10 rounded-full blur-3xl -z-10 animate-pulse delay-700"></div>

            <Card className="w-full max-w-lg rounded-[3rem] border-gray-100 shadow-2xl p-4 sm:p-10 relative overflow-hidden backdrop-blur-sm bg-white/90">
                <CardHeader className="text-center pt-8 pb-8">
                    <div className="mx-auto h-16 w-16 bg-health rounded-[1.25rem] flex items-center justify-center text-white shadow-xl shadow-health/20 mb-8 -rotate-3">
                        <ShieldCheck size={36} />
                    </div>
                    <CardTitle className="text-4xl font-black mb-3 tracking-tight">Join The Family</CardTitle>
                    <p className="text-gray-500 font-bold italic">Start your pet's premium wellness journey today.</p>
                </CardHeader>

                <CardContent>
                    <form onSubmit={handleRegister} className="space-y-6">
                        <div className="space-y-2">
                            <label className="text-sm font-black text-gray-400 ml-2 uppercase tracking-widest">Full Name</label>
                            <div className="relative group">
                                <User className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 group-focus-within:text-health transition-colors" size={20} />
                                <Input name="name" placeholder="e.g. Charlie Parker" className="pl-12 py-7 rounded-2xl border-gray-100 shadow-sm text-lg focus:border-health focus:ring-health uppercase tracking-tight font-black" onChange={handleChange} required />
                            </div>
                        </div>
                        <div className="space-y-2">
                            <label className="text-sm font-black text-gray-400 ml-2 uppercase tracking-widest">Email Address</label>
                            <div className="relative group">
                                <Mail className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 group-focus-within:text-health transition-colors" size={20} />
                                <Input type="email" name="email" placeholder="hello@pawly.com" className="pl-12 py-7 rounded-2xl border-gray-100 shadow-sm text-lg focus:border-health focus:ring-health" onChange={handleChange} required />
                            </div>
                        </div>
                        <div className="space-y-2">
                            <label className="text-sm font-black text-gray-400 ml-2 uppercase tracking-widest">Create Password</label>
                            <div className="relative group">
                                <Lock className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 group-focus-within:text-health transition-colors" size={20} />
                                <Input type="password" name="password" placeholder="••••••••" className="pl-12 py-7 rounded-2xl border-gray-100 shadow-sm text-lg focus:border-health focus:ring-health" onChange={handleChange} required />
                            </div>
                        </div>

                        <Button type="submit" className="w-full py-8 rounded-[1.5rem] text-xl font-black shadow-xl shadow-health/20 bg-health hover:bg-emerald-600 mt-4 group" disabled={loading}>
                            {loading ? 'Creating Account...' : 'Get Started For Free'}
                            {!loading && <ArrowRight size={22} className="ml-2 group-hover:translate-x-1 transition-transform" />}
                        </Button>
                    </form>
                </CardContent>

                <CardFooter className="flex flex-col gap-6 pt-10 border-t border-gray-50 text-center pb-8">
                    <p className="text-gray-500 font-bold">
                        Already have an account?
                        <Link to="/login" className="text-health hover:underline ml-2">Sign In Instead</Link>
                    </p>
                    <div className="flex items-center gap-2 justify-center text-[10px] font-black text-gray-400 uppercase tracking-widest">
                        <Heart size={12} fill="currentColor" className="text-red-400" /> By joining you agree to our terms.
                    </div>
                </CardFooter>
            </Card>
        </div>
    );
};

export default Register;

import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { api } from '../services/api';
import Button from '../components/ui/Button';
import Input from '../components/ui/Input';
import { Card, CardHeader, CardTitle, CardContent, CardFooter } from '../components/ui/Card';
import { Mail, Lock, Heart, ArrowRight, Sparkles, AlertCircle } from 'lucide-react';

const Login = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();

    const handleLogin = async (e) => {
        e.preventDefault();
        setError('');
        setLoading(true);
        try {
            const user = await api.auth.login(email, password);
            if (email === 'admin@pawly.com') {
                navigate('/dashboard');
            } else {
                navigate('/');
            }
        } catch {
            setError('Invalid credentials. Try admin@pawly.com / admin');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="min-h-[80vh] flex items-center justify-center px-4 py-12 relative overflow-hidden">
            {/* Background Decorations */}
            <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-primary/10 rounded-full blur-3xl -z-10 animate-pulse"></div>
            <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-health/10 rounded-full blur-3xl -z-10 animate-pulse delay-700"></div>

            <Card className="w-full max-w-lg rounded-[3rem] border-gray-100 shadow-2xl p-4 sm:p-10 relative overflow-hidden backdrop-blur-sm bg-white/90">
                <div className="absolute top-0 right-0 p-8 opacity-[0.03]">
                    <Heart size={200} fill="currentColor" className="text-primary" />
                </div>

                <CardHeader className="text-center pt-8 pb-10">
                    <div className="mx-auto h-16 w-16 bg-primary rounded-[1.25rem] flex items-center justify-center text-white shadow-xl shadow-primary/20 mb-8 rotate-3">
                        <Heart size={36} fill="currentColor" />
                    </div>
                    <CardTitle className="text-4xl font-black mb-3 tracking-tight">Welcome Back!</CardTitle>
                    <p className="text-gray-500 font-bold italic">Your pet is waiting for you inside.</p>
                </CardHeader>

                <CardContent>
                    <form onSubmit={handleLogin} className="space-y-6">
                        {error && (
                            <div className="bg-red-50 border border-red-100 text-red-600 px-6 py-4 rounded-2xl flex items-center gap-3 font-bold text-sm animate-shake">
                                <AlertCircle size={20} /> {error}
                            </div>
                        )}
                        <div className="space-y-2">
                            <label className="text-sm font-black text-gray-400 ml-2 uppercase tracking-widest">Email Address</label>
                            <div className="relative group">
                                <Mail className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 group-focus-within:text-primary transition-colors" size={20} />
                                <Input
                                    type="email"
                                    placeholder="e.g. hello@pawly.com"
                                    className="pl-12 py-7 rounded-2xl border-gray-100 shadow-sm text-lg focus:border-primary focus:ring-primary"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    required
                                />
                            </div>
                        </div>
                        <div className="space-y-2">
                            <div className="flex justify-between items-center ml-2">
                                <label className="text-sm font-black text-gray-400 uppercase tracking-widest">Password</label>
                                <Link to="#" className="text-xs font-black text-primary hover:underline">Forgot?</Link>
                            </div>
                            <div className="relative group">
                                <Lock className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 group-focus-within:text-primary transition-colors" size={20} />
                                <Input
                                    type="password"
                                    placeholder="••••••••"
                                    className="pl-12 py-7 rounded-2xl border-gray-100 shadow-sm text-lg focus:border-primary focus:ring-primary"
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                    required
                                />
                            </div>
                        </div>
                        <Button type="submit" className="w-full py-8 rounded-[1.5rem] text-xl font-black shadow-xl shadow-primary/20 mt-4 group" disabled={loading}>
                            {loading ? 'Authenticating...' : 'Sign In To Account'}
                            {!loading && <ArrowRight size={22} className="ml-2 group-hover:translate-x-1 transition-transform" />}
                        </Button>
                    </form>
                </CardContent>

                <CardFooter className="flex flex-col gap-6 pt-10 border-t border-gray-50 text-center pb-8">
                    <p className="text-gray-500 font-bold">
                        Don't have an account yet?
                        <Link to="/register" className="text-primary hover:underline ml-2">Create One Free</Link>
                    </p>
                    <div className="flex items-center gap-2 justify-center text-[10px] font-black text-gray-300 uppercase tracking-widest">
                        <Sparkles size={12} className="text-playful" /> Trusted by 50k+ pet owners
                    </div>
                </CardFooter>
            </Card>
        </div>
    );
};

export default Login;

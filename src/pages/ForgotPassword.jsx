import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { api } from '../services/api';
import Button from '../components/ui/Button';
import Input from '../components/ui/Input';
import { Card, CardHeader, CardTitle, CardContent } from '../components/ui/Card';
import { Mail, ArrowRight } from 'lucide-react';

const ForgotPassword = () => {
    const [email, setEmail] = useState('');
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        try {
            await api.auth.forgotPassword(email);
            // Navigate to ResetPassword with email carried over
            navigate('/reset-password', { state: { email } });
        } catch (err) {
            alert('Error sending OTP. try again');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="min-h-[80vh] flex items-center justify-center px-4 py-12">
            <Card className="w-full max-w-lg rounded-[3rem] p-10 shadow-2xl border-gray-100 bg-white">
                <CardHeader className="text-center mb-8">
                    <CardTitle className="text-3xl font-black mb-2">Forgot Password?</CardTitle>
                    <p className="text-gray-500 font-bold">Enter your email to receive a reset code.</p>
                </CardHeader>
                <CardContent>
                    <form onSubmit={handleSubmit} className="space-y-6">
                        <div className="space-y-2">
                            <label className="text-sm font-black text-gray-400 ml-2 uppercase tracking-widest">Email Address</label>
                            <div className="relative group">
                                <Mail className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" size={20} />
                                <Input
                                    type="email"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    className="pl-12 py-6 rounded-2xl border-gray-200"
                                    placeholder="you@example.com"
                                    required
                                />
                            </div>
                        </div>
                        <Button type="submit" className="w-full py-6 rounded-2xl font-black bg-primary hover:bg-primary/90 shadow-xl" disabled={loading}>
                            {loading ? 'Sending...' : 'Send Reset Code'} <ArrowRight size={20} className="ml-2 inline" />
                        </Button>
                    </form>
                </CardContent>
            </Card>
        </div>
    );
};

export default ForgotPassword;

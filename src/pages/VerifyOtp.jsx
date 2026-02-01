import React, { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { api } from '../services/api';
import Button from '../components/ui/Button';
import Input from '../components/ui/Input';
import { Card, CardHeader, CardTitle, CardContent, CardFooter } from '../components/ui/Card';
import { ShieldCheck, Mail, RefreshCw } from 'lucide-react';

const VerifyOtp = () => {
    const location = useLocation();
    const navigate = useNavigate();
    const email = location.state?.email || '';

    const [otp, setOtp] = useState('');
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');

    const handleVerify = async (e) => {
        e.preventDefault();
        setLoading(true);
        setError('');
        try {
            await api.auth.verifyOtp({ email, otpCode: otp });
            alert('Account verified! Please login.');
            navigate('/login');
        } catch (err) {
            setError('Invalid OTP. Please try again.');
        } finally {
            setLoading(false);
        }
    };

    const handleResend = async () => {
        try {
            await api.auth.resendOtp(email);
            alert('New OTP sent to your email.');
        } catch (err) {
            alert('Failed to resend OTP.');
        }
    };

    if (!email) {
        return <div className="text-center p-10">Invalid Session. Return to Register.</div>;
    }

    return (
        <div className="min-h-[80vh] flex items-center justify-center px-4 py-12">
            <Card className="w-full max-w-lg rounded-[3rem] p-10 shadow-2xl border-gray-100 bg-white/90 backdrop-blur-sm">
                <CardHeader className="text-center">
                    <div className="mx-auto h-16 w-16 bg-blue-500 rounded-[1.25rem] flex items-center justify-center text-white shadow-xl shadow-blue-500/20 mb-6">
                        <Mail size={32} />
                    </div>
                    <CardTitle className="text-3xl font-black mb-2">Verify Your Email</CardTitle>
                    <p className="text-gray-500 font-bold">We sent a code to <span className="text-blue-600">{email}</span></p>
                </CardHeader>
                <CardContent>
                    <form onSubmit={handleVerify} className="space-y-6">
                        <div className="space-y-2">
                            <label className="text-sm font-black text-gray-400 ml-2 uppercase tracking-widest">Enter Verification Code</label>
                            <Input
                                value={otp}
                                onChange={(e) => setOtp(e.target.value)}
                                placeholder="123456"
                                className="text-center text-3xl tracking-[1rem] font-black py-4 rounded-2xl border-gray-200 focus:border-blue-500 focus:ring-blue-500"
                                maxLength={6}
                                required
                            />
                        </div>
                        {error && <p className="text-red-500 text-sm font-bold text-center">{error}</p>}

                        <Button type="submit" className="w-full py-6 rounded-2xl text-lg font-black bg-blue-600 hover:bg-blue-700 shadow-xl shadow-blue-600/20" disabled={loading}>
                            {loading ? 'Verifying...' : 'Verify Email'}
                        </Button>
                    </form>
                </CardContent>
                <CardFooter className="justify-center pt-6">
                    <button onClick={handleResend} className="flex items-center gap-2 text-gray-400 hover:text-blue-600 font-bold transition-colors">
                        <RefreshCw size={16} /> Resend Code
                    </button>
                </CardFooter>
            </Card>
        </div>
    );
};

export default VerifyOtp;

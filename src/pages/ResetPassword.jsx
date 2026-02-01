import React, { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { api } from '../services/api';
import Button from '../components/ui/Button';
import Input from '../components/ui/Input';
import { Card, CardHeader, CardTitle, CardContent } from '../components/ui/Card';
import { Lock, KeyRound } from 'lucide-react';

const ResetPassword = () => {
    const location = useLocation();
    const navigate = useNavigate();
    const email = location.state?.email || '';

    const [otp, setOtp] = useState('');
    const [newPassword, setNewPassword] = useState('');
    const [loading, setLoading] = useState(false);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        try {
            await api.auth.resetPassword({ email, otpCode: otp, newPassword });
            alert('Password reset successfully! Login now.');
            navigate('/login');
        } catch (err) {
            alert('Failed to reset password. Invalid OTP?');
        } finally {
            setLoading(false);
        }
    };

    if (!email) return <div className="text-center p-10">Invalid Session</div>;

    return (
        <div className="min-h-[80vh] flex items-center justify-center px-4 py-12">
            <Card className="w-full max-w-lg rounded-[3rem] p-10 shadow-2xl border-gray-100 bg-white">
                <CardHeader className="text-center mb-8">
                    <CardTitle className="text-3xl font-black mb-2">Reset Password</CardTitle>
                    <p className="text-gray-500 font-bold">Check your email for the code.</p>
                </CardHeader>
                <CardContent>
                    <form onSubmit={handleSubmit} className="space-y-6">
                        <div className="space-y-2">
                            <label className="text-sm font-black text-gray-400 ml-2 uppercase tracking-widest">OTP Code</label>
                            <Input
                                value={otp}
                                onChange={(e) => setOtp(e.target.value)}
                                placeholder="123456"
                                className="text-center text-2xl tracking-widest font-black"
                                maxLength={6}
                                required
                            />
                        </div>
                        <div className="space-y-2">
                            <label className="text-sm font-black text-gray-400 ml-2 uppercase tracking-widest">New Password</label>
                            <div className="relative">
                                <KeyRound className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" size={20} />
                                <Input
                                    type="password"
                                    value={newPassword}
                                    onChange={(e) => setNewPassword(e.target.value)}
                                    className="pl-12 py-6 rounded-2xl"
                                    placeholder="••••••••"
                                    required
                                />
                            </div>
                        </div>
                        <Button type="submit" className="w-full py-6 rounded-2xl font-black bg-primary text-white shadow-xl" disabled={loading}>
                            {loading ? 'Resetting...' : 'Set New Password'}
                        </Button>
                    </form>
                </CardContent>
            </Card>
        </div>
    );
};

export default ResetPassword;

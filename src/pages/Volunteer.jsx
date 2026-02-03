import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { api } from '../services/api';
import Input from '../components/ui/Input';
import Button from '../components/ui/Button';
import { Card } from '../components/ui/Card';
import Badge from '../components/ui/Badge';
import { ArrowLeft, CheckCircle2, Heart, Hand, Shield, Users } from 'lucide-react';

const Volunteer = () => {
    const navigate = useNavigate();
    const [loading, setLoading] = useState(false);
    const [submitted, setSubmitted] = useState(false);

    const [formData, setFormData] = useState({
        firstName: '',
        lastName: '',
        email: '',
        phone: '',
        interest: 'Dog Walking',
        experience: '',
        availability: ''
    });

    const handleInput = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);

        try {
            await api.volunteers.create(formData);
            setSubmitted(true);
        } catch (error) {
            console.error("Failed to submit volunteer application", error);
            alert("Failed to submit application. Please try again.");
        } finally {
            setLoading(false);
        }
    };

    if (submitted) {
        return (
            <div className="max-w-3xl mx-auto px-4 py-32 text-center">
                <div className="h-24 w-24 bg-primary/10 text-primary rounded-[2rem] flex items-center justify-center mb-8 mx-auto animate-pulse">
                    <Heart size={48} fill="currentColor" />
                </div>
                <h1 className="text-5xl font-black text-gray-900 mb-6 tracking-tight">Welcome to the Team!</h1>
                <p className="text-xl text-gray-500 font-medium leading-relaxed mb-12">
                    Thanks for offering your time and heart. We've received your application and our volunteer coordinator will be in touch shortly.
                </p>
                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                    <Button onClick={() => navigate('/adoption')} className="rounded-2xl px-10 h-16 font-black">Back to Adoption Center</Button>
                </div>
            </div>
        );
    }

    return (
        <div className="max-w-4xl mx-auto px-4 py-12">
            <Button variant="ghost" onClick={() => navigate('/adoption')} className="mb-8 pl-0 hover:bg-transparent text-gray-500 hover:text-primary font-bold">
                <ArrowLeft size={20} className="mr-2" /> Back to Adoption Center
            </Button>

            <div className="text-center mb-16">
                <Badge className="bg-primary/10 text-primary mb-4 border-none">Join the Mission</Badge>
                <h1 className="text-4xl md:text-5xl font-black text-gray-900 mb-6 tracking-tight">Become a Volunteer</h1>
                <p className="text-xl text-gray-500 font-medium max-w-2xl mx-auto leading-relaxed">
                    Make a difference in the lives of our furry friends. Whether you have an hour a week or a whole weekend, we need you!
                </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
                <div className="bg-white p-6 rounded-[2rem] shadow-lg border border-gray-50 text-center hover:-translate-y-1 transition-transform">
                    <div className="h-12 w-12 bg-blue-50 text-blue-500 rounded-2xl flex items-center justify-center mb-4 mx-auto">
                        <Hand size={24} />
                    </div>
                    <h3 className="text-lg font-black text-gray-900 mb-2">Hands-on Help</h3>
                    <p className="text-gray-500 text-sm font-medium">Dog walking, cat socializing, and daily care.</p>
                </div>
                <div className="bg-white p-6 rounded-[2rem] shadow-lg border border-gray-50 text-center hover:-translate-y-1 transition-transform">
                    <div className="h-12 w-12 bg-purple-50 text-purple-500 rounded-2xl flex items-center justify-center mb-4 mx-auto">
                        <Users size={24} />
                    </div>
                    <h3 className="text-lg font-black text-gray-900 mb-2">Events & Outreach</h3>
                    <p className="text-gray-500 text-sm font-medium">Help run adoption events and fundraisers.</p>
                </div>
                <div className="bg-white p-6 rounded-[2rem] shadow-lg border border-gray-50 text-center hover:-translate-y-1 transition-transform">
                    <div className="h-12 w-12 bg-emerald-50 text-emerald-500 rounded-2xl flex items-center justify-center mb-4 mx-auto">
                        <Shield size={24} />
                    </div>
                    <h3 className="text-lg font-black text-gray-900 mb-2">Fostering</h3>
                    <p className="text-gray-500 text-sm font-medium">Provide a temporary loving home for pets in need.</p>
                </div>
            </div>

            <Card className="p-8 md:p-12 rounded-[3rem] shadow-xl border-gray-100">
                <form onSubmit={handleSubmit} className="space-y-8">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div className="space-y-2">
                            <label className="text-xs font-black uppercase tracking-widest text-gray-400 ml-1">First Name</label>
                            <Input name="firstName" required value={formData.firstName} onChange={handleInput} placeholder="Jane" className="h-14 rounded-2xl" />
                        </div>
                        <div className="space-y-2">
                            <label className="text-xs font-black uppercase tracking-widest text-gray-400 ml-1">Last Name</label>
                            <Input name="lastName" required value={formData.lastName} onChange={handleInput} placeholder="Doe" className="h-14 rounded-2xl" />
                        </div>
                        <div className="space-y-2">
                            <label className="text-xs font-black uppercase tracking-widest text-gray-400 ml-1">Email</label>
                            <Input type="email" name="email" required value={formData.email} onChange={handleInput} placeholder="jane@example.com" className="h-14 rounded-2xl" />
                        </div>
                        <div className="space-y-2">
                            <label className="text-xs font-black uppercase tracking-widest text-gray-400 ml-1">Phone</label>
                            <Input name="phone" required value={formData.phone} onChange={handleInput} placeholder="+1 234 567 890" className="h-14 rounded-2xl" />
                        </div>
                    </div>

                    <div className="space-y-2">
                        <label className="text-xs font-black uppercase tracking-widest text-gray-400 ml-1">I'm interested in...</label>
                        <select name="interest" value={formData.interest} onChange={handleInput} className="w-full h-14 rounded-2xl bg-gray-50 border border-gray-100 px-6 font-bold focus:ring-2 focus:ring-primary/20 outline-none">
                            <option>Dog Walking / Care</option>
                            <option>Cat Socialization</option>
                            <option>Fostering</option>
                            <option>Events & Fundraising</option>
                            <option>Administrative Support</option>
                            <option>Transport</option>
                        </select>
                    </div>

                    <div className="space-y-2">
                        <label className="text-xs font-black uppercase tracking-widest text-gray-400 ml-1">Relevant Experience</label>
                        <textarea
                            name="experience"
                            rows={3}
                            value={formData.experience}
                            onChange={handleInput}
                            placeholder="Have you volunteered with animals before?"
                            className="w-full p-6 rounded-[2rem] bg-gray-50 border border-gray-100 focus:bg-white transition-all font-bold focus:ring-2 focus:ring-primary/20 outline-none resize-none"
                        />
                    </div>

                    <div className="space-y-2">
                        <label className="text-xs font-black uppercase tracking-widest text-gray-400 ml-1">Availability</label>
                        <Input name="availability" required value={formData.availability} onChange={handleInput} placeholder="e.g. Weekends, Tuesday evenings" className="h-14 rounded-2xl" />
                    </div>

                    <div className="pt-4">
                        <Button type="submit" size="lg" disabled={loading} className="w-full h-20 rounded-[2rem] text-xl font-black shadow-xl shadow-primary/20">
                            {loading ? 'Sending...' : 'Send Application'}
                        </Button>
                    </div>
                </form>
            </Card>
        </div>
    );
};

export default Volunteer;

import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { api } from '../services/api';
import Input from '../components/ui/Input';
import Button from '../components/ui/Button';
import Badge from '../components/ui/Badge';
import { Card } from '../components/ui/Card';
import { ArrowLeft, Upload, CheckCircle2, Info, Heart } from 'lucide-react';

const OfferPet = () => {
    const navigate = useNavigate();
    const [loading, setLoading] = useState(false);
    const [submitted, setSubmitted] = useState(false);

    // We'll use state for form data
    const [formData, setFormData] = useState({
        name: '',
        type: 'Dog',
        breed: '',
        age: '',
        gender: 'Male',
        size: 'Medium',
        location: '',
        image: '',
        description: '',
        traits: '', // Comma separated string for input, will parse on submit if needed or keep as string
        ownerEmail: '',
        ownerPhone: ''
    });

    const handleInput = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);

        try {
            // Prepare data for API
            // Start with a default generic image if none provided, or validation
            const petData = {
                ...formData,
                age: parseInt(formData.age) || 0, // Ensure age is number if backend expects it, though Entity has int Age
                // Traits is string in backend, so we can pass it directly or format it
            };

            await api.pets.create(petData);
            setSubmitted(true);
        } catch (error) {
            console.error("Failed to submit pet", error);
            alert("Failed to submit. Please try again.");
        } finally {
            setLoading(false);
        }
    };

    if (submitted) {
        return (
            <div className="max-w-3xl mx-auto px-4 py-32 text-center">
                <div className="h-24 w-24 bg-health/10 text-health rounded-[2rem] flex items-center justify-center mb-8 mx-auto animate-bounce">
                    <CheckCircle2 size={48} />
                </div>
                <h1 className="text-5xl font-black text-gray-900 mb-6 tracking-tight">Submission Received!</h1>
                <p className="text-xl text-gray-500 font-medium leading-relaxed mb-12">
                    Thank you for trusting us with <span className="text-health font-bold">{formData.name}</span>.
                    Our team will review the details and approve the listing shortly.
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

            <div className="text-center mb-12">
                <Badge className="bg-primary/10 text-primary mb-4 border-none">Rehome a Pet</Badge>
                <h1 className="text-4xl md:text-5xl font-black text-gray-900 mb-4 tracking-tight">Find a New Home</h1>
                <p className="text-xl text-gray-500 font-medium max-w-2xl mx-auto">
                    Fill out the details below to list your pet for adoption. We'll help find them a loving forever family.
                </p>
            </div>

            <Card className="p-8 md:p-12 rounded-[3rem] shadow-xl border-gray-100">
                <form onSubmit={handleSubmit} className="space-y-10">

                    {/* Section 1: Pet Details */}
                    <div className="space-y-6">
                        <div className="flex items-center gap-3 border-b border-gray-100 pb-4">
                            <div className="h-10 w-10 bg-playful/10 text-playful rounded-xl flex items-center justify-center">
                                <Heart size={20} />
                            </div>
                            <h3 className="text-xl font-black text-gray-900">Pet Information</h3>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div className="space-y-2">
                                <label className="text-xs font-black uppercase tracking-widest text-gray-400 ml-1">Name</label>
                                <Input name="name" required value={formData.name} onChange={handleInput} placeholder="Pet's Name" className="h-14 rounded-2xl" />
                            </div>
                            <div className="space-y-2">
                                <label className="text-xs font-black uppercase tracking-widest text-gray-400 ml-1">Type</label>
                                <select name="type" value={formData.type} onChange={handleInput} className="w-full h-14 rounded-2xl bg-gray-50 border border-gray-100 px-6 font-bold focus:ring-2 focus:ring-primary/20 outline-none">
                                    <option>Dog</option>
                                    <option>Cat</option>
                                    <option>Bird</option>
                                    <option>Rabbit</option>
                                    <option>Other</option>
                                </select>
                            </div>
                            <div className="space-y-2">
                                <label className="text-xs font-black uppercase tracking-widest text-gray-400 ml-1">Breed</label>
                                <Input name="breed" value={formData.breed} onChange={handleInput} placeholder="e.g. Golden Retriever" className="h-14 rounded-2xl" />
                            </div>
                            <div className="space-y-2">
                                <label className="text-xs font-black uppercase tracking-widest text-gray-400 ml-1">Age (Years)</label>
                                <Input type="number" name="age" required value={formData.age} onChange={handleInput} placeholder="e.g. 2" className="h-14 rounded-2xl" />
                            </div>
                            <div className="space-y-2">
                                <label className="text-xs font-black uppercase tracking-widest text-gray-400 ml-1">Gender</label>
                                <select name="gender" value={formData.gender} onChange={handleInput} className="w-full h-14 rounded-2xl bg-gray-50 border border-gray-100 px-6 font-bold focus:ring-2 focus:ring-primary/20 outline-none">
                                    <option>Male</option>
                                    <option>Female</option>
                                </select>
                            </div>
                            <div className="space-y-2">
                                <label className="text-xs font-black uppercase tracking-widest text-gray-400 ml-1">Size</label>
                                <select name="size" value={formData.size} onChange={handleInput} className="w-full h-14 rounded-2xl bg-gray-50 border border-gray-100 px-6 font-bold focus:ring-2 focus:ring-primary/20 outline-none">
                                    <option>Small</option>
                                    <option>Medium</option>
                                    <option>Large</option>
                                </select>
                            </div>
                        </div>

                        <div className="space-y-2">
                            <label className="text-xs font-black uppercase tracking-widest text-gray-400 ml-1">Location</label>
                            <Input name="location" required value={formData.location} onChange={handleInput} placeholder="City, State" className="h-14 rounded-2xl" />
                        </div>

                        <div className="space-y-2">
                            <label className="text-xs font-black uppercase tracking-widest text-gray-400 ml-1">Image URL</label>
                            <Input name="image" required value={formData.image} onChange={handleInput} placeholder="https://..." className="h-14 rounded-2xl" />
                            <p className="text-xs text-gray-400 font-medium ml-1">Please provide a direct link to a photo of the pet.</p>
                        </div>

                        <div className="space-y-2">
                            <label className="text-xs font-black uppercase tracking-widest text-gray-400 ml-1">Traits (Comma separated)</label>
                            <Input name="traits" value={formData.traits} onChange={handleInput} placeholder="Friendly, Energetic, Good with kids" className="h-14 rounded-2xl" />
                        </div>

                        <div className="space-y-2">
                            <label className="text-xs font-black uppercase tracking-widest text-gray-400 ml-1">Description / Story</label>
                            <textarea
                                name="description"
                                required
                                rows={4}
                                value={formData.description}
                                onChange={handleInput}
                                placeholder="Tell us about their personality, history, and what kind of home they need..."
                                className="w-full p-6 rounded-[2rem] bg-gray-50 border border-gray-100 focus:bg-white transition-all font-bold focus:ring-2 focus:ring-primary/20 outline-none resize-none"
                            />
                        </div>
                    </div>

                    {/* Section 2: Owner Contact */}
                    <div className="space-y-6">
                        <div className="flex items-center gap-3 border-b border-gray-100 pb-4">
                            <div className="h-10 w-10 bg-primary/10 text-primary rounded-xl flex items-center justify-center">
                                <Info size={20} />
                            </div>
                            <h3 className="text-xl font-black text-gray-900">Your Contact Info</h3>
                        </div>
                        <div className="bg-blue-50 p-6 rounded-3xl mb-6">
                            <p className="text-sm text-blue-800 font-bold flex gap-2">
                                <Info size={18} className="shrink-0" />
                                These details will be visible to our admins to coordinate with you. They won't be public initially.
                            </p>
                        </div>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div className="space-y-2">
                                <label className="text-xs font-black uppercase tracking-widest text-gray-400 ml-1">Email</label>
                                <Input type="email" name="ownerEmail" required value={formData.ownerEmail} onChange={handleInput} placeholder="your@email.com" className="h-14 rounded-2xl" />
                            </div>
                            <div className="space-y-2">
                                <label className="text-xs font-black uppercase tracking-widest text-gray-400 ml-1">Phone Number</label>
                                <Input name="ownerPhone" required value={formData.ownerPhone} onChange={handleInput} placeholder="+1 234 567 890" className="h-14 rounded-2xl" />
                            </div>
                        </div>
                    </div>

                    <div className="pt-8">
                        <Button type="submit" size="lg" disabled={loading} className="w-full h-20 rounded-[2rem] text-xl font-black shadow-xl shadow-primary/20">
                            {loading ? 'Submitting...' : 'Submit for Review'}
                        </Button>
                    </div>

                </form>
            </Card>
        </div>
    );
};



export default OfferPet;

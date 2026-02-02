import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { api } from '../services/api';
import Button from '../components/ui/Button';
import Input from '../components/ui/Input';
import { Card, CardHeader, CardTitle, CardContent } from '../components/ui/Card';
import { Dog, Cat, Camera, Heart, CheckCircle2, ArrowLeft, Info, MapPin, Bone } from 'lucide-react';

const ListPet = () => {
    const navigate = useNavigate();
    const [step, setStep] = useState(1);
    const [loading, setLoading] = useState(false);
    const [formData, setFormData] = useState({
        name: '',
        type: 'Dog',
        breed: '',
        age: '',
        gender: 'Male',
        size: 'Medium',
        location: '',
        image: 'https://images.unsplash.com/photo-1543466835-00a7907e9de1?auto=format&fit=crop&q=80&w=800', // Default if no upload
        description: '',
        traits: '',
        weight: ''
    });

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        try {
            await api.pets.create(formData);
            setStep(3); // Success step
        } catch (error) {
            console.error("Submission failed", error);
            alert("Failed to submit. Please check your data.");
        } finally {
            setLoading(false);
        }
    };

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    return (
        <div className="min-h-screen bg-gray-50 py-20 px-4">
            <div className="max-w-4xl mx-auto">
                {/* Header */}
                <div className="mb-12 flex items-center justify-between">
                    <button
                        onClick={() => navigate('/adoption')}
                        className="flex items-center gap-2 text-gray-500 font-bold hover:text-primary transition-colors"
                    >
                        <ArrowLeft size={20} /> Back to Adoption
                    </button>
                    <div className="flex gap-2">
                        {[1, 2, 3].map((s) => (
                            <div
                                key={s}
                                className={`h-2 w-12 rounded-full transition-all duration-500 ${step >= s ? 'bg-primary' : 'bg-gray-200'}`}
                            />
                        ))}
                    </div>
                </div>

                {step === 1 && (
                    <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-700">
                        <div className="text-center mb-12">
                            <h1 className="text-4xl md:text-5xl font-black text-gray-900 mb-4">Start a Pet's Journey</h1>
                            <p className="text-gray-500 font-medium text-lg">Tell us the basic details about your furry friend.</p>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                            <Card className="rounded-[2.5rem] border-gray-100 overflow-hidden shadow-xl">
                                <CardContent className="p-8 space-y-6">
                                    <div className="space-y-2">
                                        <label className="text-sm font-black text-gray-900 uppercase tracking-widest">Pet Name</label>
                                        <Input
                                            name="name"
                                            value={formData.name}
                                            onChange={handleInputChange}
                                            placeholder="e.g. Buddy"
                                            className="rounded-2xl border-gray-100 bg-gray-50 py-4 font-bold"
                                        />
                                    </div>

                                    <div className="space-y-2">
                                        <label className="text-sm font-black text-gray-900 uppercase tracking-widest">Species</label>
                                        <div className="flex gap-4">
                                            {['Dog', 'Cat', 'Other'].map(type => (
                                                <button
                                                    key={type}
                                                    type="button"
                                                    onClick={() => setFormData(p => ({ ...p, type }))}
                                                    className={`flex-1 py-4 rounded-2xl font-black border-2 transition-all flex items-center justify-center gap-2 ${formData.type === type
                                                            ? 'bg-primary border-primary text-white shadow-lg shadow-primary/20'
                                                            : 'bg-white border-gray-100 text-gray-500 hover:border-primary/30'
                                                        }`}
                                                >
                                                    {type === 'Dog' && <Dog size={18} />}
                                                    {type === 'Cat' && <Cat size={18} />}
                                                    {type}
                                                </button>
                                            ))}
                                        </div>
                                    </div>

                                    <div className="grid grid-cols-2 gap-4">
                                        <div className="space-y-2">
                                            <label className="text-sm font-black text-gray-900 uppercase tracking-widest">Age</label>
                                            <Input
                                                name="age"
                                                value={formData.age}
                                                onChange={handleInputChange}
                                                placeholder="e.g. 2 years"
                                                className="rounded-2xl border-gray-100 bg-gray-50 py-4 font-bold"
                                            />
                                        </div>
                                        <div className="space-y-2">
                                            <label className="text-sm font-black text-gray-900 uppercase tracking-widest">Gender</label>
                                            <select
                                                name="gender"
                                                value={formData.gender}
                                                onChange={handleInputChange}
                                                className="w-full h-12 px-4 rounded-2xl border-gray-100 bg-gray-50 font-bold focus:ring-2 focus:ring-primary/20 outline-none"
                                            >
                                                <option>Male</option>
                                                <option>Female</option>
                                            </select>
                                        </div>
                                    </div>
                                </CardContent>
                            </Card>

                            <div className="space-y-8">
                                <div className="bg-primary/5 rounded-[2.5rem] p-8 border border-primary/10">
                                    <div className="h-12 w-12 bg-primary/10 rounded-2xl flex items-center justify-center text-primary mb-6">
                                        <Bone size={24} />
                                    </div>
                                    <h3 className="text-xl font-black text-gray-900 mb-2">Help them find home</h3>
                                    <p className="text-gray-500 font-medium leading-relaxed">
                                        Accurate details help potential adopters find the perfect match. Your post will be reviewed by our team within 24 hours.
                                    </p>
                                </div>
                                <Button
                                    size="lg"
                                    className="w-full rounded-[2rem] py-8 text-xl font-black shadow-2xl shadow-primary/20"
                                    onClick={() => setStep(2)}
                                    disabled={!formData.name || !formData.age}
                                >
                                    Next: Personality & Photos
                                </Button>
                            </div>
                        </div>
                    </div>
                )}

                {step === 2 && (
                    <div className="space-y-8 animate-in fade-in slide-in-from-right-4 duration-700">
                        <div className="text-center mb-12">
                            <h1 className="text-4xl md:text-5xl font-black text-gray-900 mb-4">The Tiny Details</h1>
                            <p className="text-gray-500 font-medium text-lg">What makes your pet special?</p>
                        </div>

                        <Card className="rounded-[2.5rem] border-gray-100 overflow-hidden shadow-xl">
                            <CardContent className="p-10 grid grid-cols-1 md:grid-cols-2 gap-10">
                                <div className="space-y-6">
                                    <div className="space-y-2">
                                        <label className="text-sm font-black text-gray-900 uppercase tracking-widest">Breed</label>
                                        <Input
                                            name="breed"
                                            value={formData.breed}
                                            onChange={handleInputChange}
                                            placeholder="e.g. Golden Retriever"
                                            className="rounded-2xl border-gray-100 bg-gray-50 py-4 font-bold"
                                        />
                                    </div>
                                    <div className="space-y-2">
                                        <label className="text-sm font-black text-gray-900 uppercase tracking-widest">Location</label>
                                        <div className="relative">
                                            <MapPin className="absolute left-4 top-1/2 -translate-y-1/2 text-primary" size={18} />
                                            <Input
                                                name="location"
                                                value={formData.location}
                                                onChange={handleInputChange}
                                                placeholder="City, Area"
                                                className="pl-12 rounded-2xl border-gray-100 bg-gray-50 py-4 font-bold"
                                            />
                                        </div>
                                    </div>
                                    <div className="space-y-2">
                                        <label className="text-sm font-black text-gray-900 uppercase tracking-widest">Traits (Separate by comma)</label>
                                        <Input
                                            name="traits"
                                            value={formData.traits}
                                            onChange={handleInputChange}
                                            placeholder="Friendly, Playful, Calm"
                                            className="rounded-2xl border-gray-100 bg-gray-50 py-4 font-bold"
                                        />
                                    </div>
                                </div>

                                <div className="space-y-6">
                                    <div className="space-y-2">
                                        <label className="text-sm font-black text-gray-900 uppercase tracking-widest">About their story</label>
                                        <textarea
                                            name="description"
                                            value={formData.description}
                                            onChange={handleInputChange}
                                            className="w-full h-40 p-4 rounded-2xl border-gray-100 bg-gray-50 font-bold focus:ring-2 focus:ring-primary/20 outline-none resize-none px-6"
                                            placeholder="Share their personality, history, and why they need a home..."
                                        />
                                    </div>
                                    <div className="flex gap-4">
                                        <Button
                                            variant="outline"
                                            className="flex-1 rounded-2xl py-4 font-black border-gray-100"
                                            onClick={() => setStep(1)}
                                        >
                                            Back
                                        </Button>
                                        <Button
                                            className="flex-[2] rounded-2xl py-4 font-black shadow-lg shadow-primary/20"
                                            onClick={handleSubmit}
                                            disabled={loading}
                                        >
                                            {loading ? 'Submitting...' : 'Submit Entry'}
                                        </Button>
                                    </div>
                                </div>
                            </CardContent>
                        </Card>
                    </div>
                )}

                {step === 3 && (
                    <div className="text-center py-20 animate-in zoom-in-95 duration-700">
                        <div className="h-24 w-24 bg-health/10 text-health rounded-[2rem] flex items-center justify-center mb-8 mx-auto ring-8 ring-health/5">
                            <CheckCircle2 size={48} />
                        </div>
                        <h2 className="text-5xl font-black text-gray-900 mb-6">Submission Received!</h2>
                        <p className="text-xl text-gray-500 font-medium max-w-lg mx-auto leading-relaxed mb-12">
                            Buddy's application is now with our review team. You'll receive a notification once it's approved and listed on the site.
                        </p>
                        <div className="flex flex-col sm:flex-row gap-4 justify-center">
                            <Button size="lg" className="rounded-2xl px-12 font-black" onClick={() => navigate('/adoption')}>Back to Community</Button>
                            <Button variant="ghost" size="lg" className="rounded-2xl px-12 font-black text-primary">View My Applications</Button>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
};

export default ListPet;

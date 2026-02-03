import React, { useState, useEffect } from 'react';
import { api } from '../../services/api';
import Button from '../../components/ui/Button';
import Badge from '../../components/ui/Badge';
import { Card, CardContent } from '../../components/ui/Card';
import { Check, X, Eye, MapPin, Bone, Info, Calendar } from 'lucide-react';

const AdoptionRequests = () => {
    const [requests, setRequests] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetchRequests();
    }, []);

    const fetchRequests = async () => {
        try {
            const data = await api.pets.getPending();
            setRequests(data);
        } catch (error) {
            console.error("Failed to fetch pending pets", error);
        } finally {
            setLoading(false);
        }
    };

    const handleApprove = async (id) => {
        if (!window.confirm("Approve this pet for adoption? It will be publicly visible.")) return;
        try {
            await api.pets.approve(id);
            setRequests(prev => prev.filter(p => p.id !== id));
            alert("Pet approved successfully!");
        } catch (error) {
            alert("Failed to approve. Please try again.");
        }
    };

    if (loading) return <div className="p-8 animate-pulse text-gray-500 font-bold">Loading requests...</div>;

    return (
        <div className="space-y-8 p-8">
            <div className="flex items-center justify-between">
                <div>
                    <h1 className="text-3xl font-black text-gray-900 mb-1">Adoption Requests</h1>
                    <p className="text-gray-500 font-medium">Review and approve pet listings from the community.</p>
                </div>
                <Badge className="bg-primary/10 text-primary border-none px-4 py-2 rounded-xl font-black">
                    {requests.length} Pending
                </Badge>
            </div>

            {requests.length === 0 ? (
                <div className="bg-white rounded-[2.5rem] p-20 text-center border-2 border-dashed border-gray-100">
                    <div className="h-20 w-20 bg-gray-50 text-gray-200 rounded-3xl flex items-center justify-center mb-6 mx-auto">
                        <Check size={40} />
                    </div>
                    <h3 className="text-2xl font-black text-gray-900 mb-2">No pending requests</h3>
                    <p className="text-gray-500 font-medium">Everything is up to date!</p>
                </div>
            ) : (
                <div className="grid grid-cols-1 xl:grid-cols-2 gap-8">
                    {requests.map((pet) => (
                        <Card key={pet.id} className="rounded-[2.5rem] border-gray-100 overflow-hidden bg-white shadow-xl hover:shadow-2xl transition-all duration-500 group">
                            <div className="flex flex-col md:flex-row h-full">
                                <div className="md:w-48 h-48 md:h-auto relative overflow-hidden">
                                    <img src={pet.image} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" alt={pet.name} />
                                    <div className="absolute top-4 left-4">
                                        <Badge className="bg-white/90 backdrop-blur-sm border-none shadow-sm text-gray-900">{pet.type}</Badge>
                                    </div>
                                </div>
                                <div className="flex-1 p-8 flex flex-col justify-between">
                                    <div>
                                        <div className="flex justify-between items-start mb-4">
                                            <div>
                                                <h3 className="text-2xl font-black text-gray-900 mb-1">{pet.name}</h3>
                                                <p className="text-primary font-bold italic text-sm">{pet.breed} • {pet.age}</p>
                                            </div>
                                            <div className="flex gap-2">
                                                <button
                                                    onClick={() => handleApprove(pet.id)}
                                                    className="h-12 w-12 bg-health/10 text-health rounded-2xl flex items-center justify-center hover:bg-health hover:text-white transition-all shadow-lg shadow-health/10"
                                                    title="Approve"
                                                >
                                                    <Check size={20} />
                                                </button>
                                                <button
                                                    className="h-12 w-12 bg-red-50 text-red-500 rounded-2xl flex items-center justify-center hover:bg-red-500 hover:text-white transition-all shadow-lg shadow-red-500/10"
                                                    title="Reject"
                                                >
                                                    <X size={20} />
                                                </button>
                                            </div>
                                        </div>

                                        <div className="grid grid-cols-2 gap-4 mb-6">
                                            <div className="flex items-center gap-2 text-sm text-gray-500 font-bold">
                                                <MapPin size={16} className="text-primary" /> {pet.location || 'Not set'}
                                            </div>
                                            <div className="flex items-center gap-2 text-sm text-gray-500 font-bold">
                                                <Calendar size={16} className="text-primary" /> {new Date(pet.createdAt).toLocaleDateString()}
                                            </div>
                                        </div>

                                        <p className="text-gray-500 text-sm line-clamp-2 italic font-medium mb-4">"{pet.description}"</p>

                                        <div className="bg-gray-50 p-4 rounded-xl space-y-2">
                                            <p className="text-xs font-black uppercase text-gray-400 tracking-widest">Owner Contact</p>
                                            <div className="flex flex-col gap-1 text-sm font-bold text-gray-700">
                                                <span>{pet.ownerEmail || 'No email provided'}</span>
                                                <span>{pet.ownerPhone || 'No phone provided'}</span>
                                            </div>
                                        </div>
                                    </div>

                                    <div className="mt-8 pt-6 border-t border-gray-50 flex gap-4">
                                        <Button variant="ghost" className="rounded-xl flex-1 font-bold text-gray-500">
                                            <Eye size={18} className="mr-2" /> Preview
                                        </Button>
                                        <Button
                                            variant="primary"
                                            className="rounded-xl flex-1 font-black bg-health hover:bg-emerald-600"
                                            onClick={() => handleApprove(pet.id)}
                                        >
                                            Quick Approve
                                        </Button>
                                    </div>
                                </div>
                            </div>
                        </Card>
                    ))}
                </div>
            )}
        </div>
    );
};

export default AdoptionRequests;

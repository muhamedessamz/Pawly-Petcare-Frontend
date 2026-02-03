import React, { useState, useEffect } from 'react';
import { api } from '../../services/api';
import Badge from '../../components/ui/Badge';
import { Card } from '../../components/ui/Card';
import { Users, Mail, Phone, Calendar, Hand, Info } from 'lucide-react';

const VolunteersAdmin = () => {
    const [volunteers, setVolunteers] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetchVolunteers();
    }, []);

    const fetchVolunteers = async () => {
        try {
            const data = await api.volunteers.getAll();
            setVolunteers(data);
        } catch (error) {
            console.error("Failed to fetch volunteers", error);
        } finally {
            setLoading(false);
        }
    };

    if (loading) return <div className="p-8 animate-pulse text-gray-500 font-bold">Loading volunteers...</div>;

    return (
        <div className="space-y-8 p-8">
            <div className="flex items-center justify-between">
                <div>
                    <h1 className="text-3xl font-black text-gray-900 mb-1">Volunteer Applications</h1>
                    <p className="text-gray-500 font-medium">Manage incoming volunteer requests.</p>
                </div>
                <Badge className="bg-primary/10 text-primary border-none px-4 py-2 rounded-xl font-black">
                    {volunteers.length} Applicants
                </Badge>
            </div>

            {volunteers.length === 0 ? (
                <div className="bg-white rounded-[2.5rem] p-20 text-center border-2 border-dashed border-gray-100">
                    <div className="h-20 w-20 bg-gray-50 text-gray-200 rounded-3xl flex items-center justify-center mb-6 mx-auto">
                        <Users size={40} />
                    </div>
                    <h3 className="text-2xl font-black text-gray-900 mb-2">No applications yet</h3>
                    <p className="text-gray-500 font-medium">Share the volunteer page to get more applicants!</p>
                </div>
            ) : (
                <div className="grid grid-cols-1 xl:grid-cols-2 gap-8">
                    {volunteers.map((volunteer) => (
                        <Card key={volunteer.id} className="rounded-[2.5rem] border-gray-100 bg-white p-8 hover:shadow-xl transition-all duration-300">
                            <div className="flex justify-between items-start mb-6">
                                <div>
                                    <h3 className="text-2xl font-black text-gray-900">{volunteer.firstName} {volunteer.lastName}</h3>
                                    <Badge className="mt-2 bg-purple-50 text-purple-600 border-none font-bold">
                                        {volunteer.interest}
                                    </Badge>
                                </div>
                                <div className="text-right text-xs font-bold text-gray-400">
                                    {new Date(volunteer.createdAt).toLocaleDateString()}
                                </div>
                            </div>

                            <div className="space-y-4 mb-8">
                                <div className="flex items-center gap-3 text-gray-600 font-bold">
                                    <div className="h-8 w-8 bg-gray-50 rounded-lg flex items-center justify-center text-gray-400">
                                        <Mail size={16} />
                                    </div>
                                    <a href={`mailto:${volunteer.email}`} className="hover:text-primary transition-colors">{volunteer.email}</a>
                                </div>
                                <div className="flex items-center gap-3 text-gray-600 font-bold">
                                    <div className="h-8 w-8 bg-gray-50 rounded-lg flex items-center justify-center text-gray-400">
                                        <Phone size={16} />
                                    </div>
                                    <a href={`tel:${volunteer.phone}`} className="hover:text-primary transition-colors">{volunteer.phone}</a>
                                </div>
                                <div className="flex items-center gap-3 text-gray-600 font-bold">
                                    <div className="h-8 w-8 bg-gray-50 rounded-lg flex items-center justify-center text-gray-400">
                                        <Calendar size={16} />
                                    </div>
                                    <span>{volunteer.availability}</span>
                                </div>
                            </div>

                            {volunteer.experience && (
                                <div className="bg-gray-50 p-5 rounded-2xl">
                                    <div className="flex items-center gap-2 mb-2 text-gray-400 text-xs font-black uppercase tracking-widest">
                                        <Info size={14} /> Experience
                                    </div>
                                    <p className="text-gray-600 font-medium text-sm leading-relaxed">"{volunteer.experience}"</p>
                                </div>
                            )}
                        </Card>
                    ))}
                </div>
            )}
        </div>
    );
};

export default VolunteersAdmin;

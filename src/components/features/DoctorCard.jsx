import React from 'react';
import { Link } from 'react-router-dom';
import { Card, CardFooter, CardTitle } from '../ui/Card';
import Button from '../ui/Button';
import Badge from '../ui/Badge';
import { Star, Clock, ArrowRight, ShieldCheck } from 'lucide-react';

const DoctorCard = ({ doctor }) => {
    return (
        <Card className="group overflow-hidden border-gray-100 flex flex-col h-full hover:shadow-2xl hover:shadow-health/5 transition-all duration-500 bg-white">
            <div className="p-6 md:p-8 flex flex-col h-full">
                <div className="flex flex-col sm:flex-row gap-6 items-center sm:items-start text-center sm:text-left mb-6">
                    <div className="relative flex-shrink-0">
                        <div className="w-32 h-32 md:w-36 md:h-36 rounded-2xl overflow-hidden shadow-xl shadow-health/10 md:rotate-2 group-hover:rotate-0 transition-transform duration-500 ring-4 ring-white relative z-10">
                            <img
                                src={doctor.image}
                                alt={doctor.name}
                                className="object-cover object-top w-full h-full scale-110 group-hover:scale-100 transition-transform duration-700"
                                style={doctor.imageStyles}
                            />
                        </div>
                        <div className="absolute -bottom-2 -right-2 bg-health text-white p-2 rounded-xl shadow-lg ring-4 ring-white z-20">
                            <ShieldCheck size={20} />
                        </div>
                    </div>

                    <div className="flex-1 flex flex-col">
                        <Badge variant="success" className="mb-4 w-fit mx-auto sm:mx-0 uppercase tracking-wider bg-health/5 text-health border-health/10">
                            {doctor.specialty}
                        </Badge>
                        <CardTitle className="text-2xl md:text-3xl mb-3 group-hover:text-health transition-colors font-black leading-tight">
                            {doctor.name}
                        </CardTitle>
                        <div className="flex items-center justify-center sm:justify-start gap-4">
                            <div className="flex flex-col items-center sm:items-start">
                                <p className="text-gray-500 font-bold flex items-center gap-2 text-sm mb-1">
                                    <span className="h-1.5 w-1.5 rounded-full bg-health"></span>
                                    {doctor.experience} Exp.
                                </p>
                                <div className="flex items-center gap-1.5 bg-playful/5 text-playful px-2.5 py-1 rounded-lg font-black text-sm">
                                    <Star size={14} fill="currentColor" /> {doctor.rating}
                                </div>
                            </div>
                            <div className="h-10 w-px bg-gray-100 hidden sm:block"></div>
                            <div className="hidden sm:flex flex-col">
                                <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest">Status</p>
                                <p className="text-xs font-bold text-health">Verified Pro</p>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="flex flex-wrap gap-2 justify-center sm:justify-start mb-8">
                    {doctor.availability.map((day) => (
                        <span key={day} className="text-[10px] font-black bg-gray-50 text-gray-500 px-3 py-2 rounded-lg border border-gray-100 flex items-center gap-2 uppercase tracking-wider hover:bg-health/5 hover:text-health transition-colors">
                            <Clock size={12} className="text-health" /> {day}
                        </span>
                    ))}
                </div>

                <div className="mt-auto">
                    <Link to={`/book-appointment/${doctor.id}`} className="w-full">
                        <Button variant="primary" className="w-full bg-health hover:bg-blue-700 border-none shadow-xl shadow-health/20 group/btn rounded-xl py-4 flex items-center justify-center gap-2">
                            <span className="font-black uppercase tracking-widest text-xs">Book Appointment</span>
                            <ArrowRight size={18} className="group-hover/btn:translate-x-1 transition-transform" />
                        </Button>
                    </Link>
                </div>
            </div>
        </Card>
    );
};

export default DoctorCard;

import React from 'react';
import { Link } from 'react-router-dom';
import { Card, CardFooter, CardTitle } from '../ui/Card';
import Button from '../ui/Button';
import Badge from '../ui/Badge';
import { Star, Clock, ArrowRight, ShieldCheck } from 'lucide-react';

const DoctorCard = ({ doctor }) => {
    return (
        <Card className="group relative overflow-hidden border-gray-100 flex flex-col h-full hover:shadow-2xl hover:shadow-primary/5 transition-all duration-700 bg-white rounded-[2.5rem]">
            {/* Top Decorative Element */}
            <div className="absolute top-0 right-0 w-32 h-32 bg-health/5 rounded-full blur-3xl -mr-16 -mt-16 group-hover:bg-health/10 transition-all duration-700"></div>

            <div className="p-8 flex flex-col h-full relative z-10">
                {/* Header: Specialty & Rating */}
                <div className="flex justify-between items-start mb-8">
                    <Badge variant="playful" className="bg-health/10 text-health border-none font-black text-[10px] py-1.5 px-3 tracking-widest uppercase">
                        {doctor.specialty}
                    </Badge>
                    <div className="flex items-center gap-1.5 bg-yellow-400/10 text-yellow-600 px-2.5 py-1 rounded-xl font-black text-xs">
                        <Star size={12} fill="currentColor" /> {doctor.rating}
                    </div>
                </div>

                {/* Profile Section: Image + Info */}
                <div className="flex items-center gap-8 mb-10">
                    <div className="relative group-hover:scale-105 transition-transform duration-500 flex-shrink-0">
                        <div className="w-24 h-24 md:w-28 md:h-28 rounded-3xl overflow-hidden shadow-2xl shadow-gray-200 ring-4 ring-white relative z-10">
                            <img
                                src={doctor.image}
                                alt={doctor.name}
                                className="object-cover object-top w-full h-full"
                                style={doctor.imageStyles}
                            />
                        </div>
                        <div className="absolute -bottom-2 -right-2 bg-health text-white p-2 rounded-xl shadow-lg ring-4 ring-white z-20">
                            <ShieldCheck size={18} />
                        </div>
                    </div>

                    <div className="space-y-1">
                        <h3 className="text-2xl md:text-3xl font-black text-gray-900 leading-tight">
                            {doctor.name}
                        </h3>
                        <p className="text-sm font-bold text-health/60 uppercase tracking-widest">{doctor.experience} Experience</p>
                    </div>
                </div>

                {/* Content: Availability Tags */}
                <div className="space-y-4 mb-10 flex-grow">
                    <p className="text-[10px] font-black text-gray-400 uppercase tracking-[0.2em] ml-1">Weekly Schedule</p>
                    <div className="flex flex-wrap gap-2">
                        {doctor.availability.map((day) => (
                            <span key={day} className="text-[10px] font-black bg-gray-50 text-gray-500 px-4 py-2.5 rounded-2xl border border-gray-100 flex items-center gap-2 hover:bg-health/5 hover:text-health transition-all duration-300">
                                <Clock size={12} className="opacity-40" /> {day}
                            </span>
                        ))}
                    </div>
                </div>

                {/* Footer: Action Button */}
                <Link to={`/book-appointment/${doctor.id}`} className="mt-auto block" aria-label={`Book appointment with ${doctor.name}`}>
                    <Button variant="primary" className="w-full h-14 bg-health hover:bg-blue-700 border-none shadow-xl shadow-health/20 rounded-[1.25rem] group/btn overflow-hidden relative" tabIndex="-1">
                        <span className="relative z-10 font-bold uppercase tracking-widest text-[11px] flex items-center justify-center gap-2">
                            Book Online Now <ArrowRight size={16} className="group-hover/btn:translate-x-1 transition-transform" />
                        </span>
                        {/* Subtle inner button glow */}
                        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent -translate-x-full group-hover/btn:translate-x-full transition-transform duration-1000"></div>
                    </Button>
                </Link>
            </div>
        </Card>
    );
};

export default DoctorCard;

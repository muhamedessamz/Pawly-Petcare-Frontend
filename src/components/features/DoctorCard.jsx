import React from 'react';
import { Link } from 'react-router-dom';
import { Card, CardFooter, CardTitle } from '../ui/Card';
import Button from '../ui/Button';
import Badge from '../ui/Badge';
import { Star, Clock, ArrowRight, ShieldCheck } from 'lucide-react';

const DoctorCard = ({ doctor }) => {
    return (
        <Card className="group overflow-hidden border-gray-100 flex flex-col h-full hover:shadow-2xl hover:shadow-health/5 transition-all duration-500">
            <div className="p-6 md:p-8 flex flex-col sm:flex-row gap-6 items-center sm:items-start text-center sm:text-left">
                <div className="relative flex-shrink-0">
                    <div className="w-32 h-32 md:w-40 md:h-40 rounded-2xl overflow-hidden shadow-lg shadow-gray-200 rotate-2 group-hover:rotate-0 transition-transform duration-500 ring-4 ring-white">
                        <img
                            src={doctor.image}
                            alt={doctor.name}
                            className="object-cover w-full h-full scale-110 group-hover:scale-100 transition-transform duration-700"
                        />
                    </div>
                    <div className="absolute -bottom-2 -right-2 bg-health text-white p-2 rounded-xl shadow-lg ring-4 ring-white">
                        <ShieldCheck size={20} />
                    </div>
                </div>

                <div className="flex-1 mt-2">
                    <div className="mb-4">
                        <Badge variant="success" className="mb-3 uppercase tracking-wider">{doctor.specialty}</Badge>
                        <CardTitle className="text-2xl mb-1 group-hover:text-health transition-colors">{doctor.name}</CardTitle>
                        <p className="text-gray-500 font-medium flex items-center justify-center sm:justify-start gap-2">
                            <span className="h-1.5 w-1.5 rounded-full bg-health"></span>
                            {doctor.experience} Experience
                        </p>
                    </div>

                    <div className="flex items-center justify-center sm:justify-start gap-2 mb-6">
                        <div className="flex items-center gap-1 bg-playful/10 text-playful px-2 py-1 rounded-lg font-bold text-sm">
                            <Star size={14} fill="currentColor" /> {doctor.rating}
                        </div>
                        <span className="text-gray-400 text-sm">Verified Professional</span>
                    </div>

                    <div className="flex flex-wrap gap-2 justify-center sm:justify-start">
                        {doctor.availability.map((day) => (
                            <span key={day} className="text-xs font-bold bg-gray-50 text-gray-600 px-3 py-1.5 rounded-lg border border-gray-100 flex items-center gap-1.5">
                                <Clock size={12} className="text-health" /> {day}
                            </span>
                        ))}
                    </div>
                </div>
            </div>

            <CardFooter className="px-8 pb-8 pt-0 mt-auto flex-col sm:flex-row gap-4">
                <Link to={`/doctors/${doctor.id}`} className="w-full">
                    <Button variant="primary" className="w-full bg-health hover:bg-emerald-600 shadow-lg shadow-health/20 group/btn">
                        Book Appointment <ArrowRight size={18} className="ml-2 group-hover/btn:translate-x-1 transition-transform" />
                    </Button>
                </Link>
            </CardFooter>
        </Card>
    );
};

export default DoctorCard;

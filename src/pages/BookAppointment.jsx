import React, { useState, useEffect } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { api } from '../services/api';
import { useAuth } from '../context/AuthContext';
import Button from '../components/ui/Button';
import Input from '../components/ui/Input';
import { Card, CardHeader, CardTitle, CardContent } from '../components/ui/Card';
import { Calendar, User, Info, CheckCircle2, ArrowLeft, Clock } from 'lucide-react';

const BookAppointment = () => {
    const { doctorId } = useParams();
    const navigate = useNavigate();
    const { user } = useAuth();
    const [doctor, setDoctor] = useState(null);
    const [formData, setFormData] = useState({
        ownerName: '',
        petName: '',
        date: '',
        time: '',
        reason: ''
    });
    const [step, setStep] = useState(1);

    useEffect(() => {
        if (doctorId) {
            const fetchDoctor = async () => {
                const data = await api.doctors.getById(doctorId);
                setDoctor(data);
            };
            fetchDoctor();
        }
    }, [doctorId]);

    useEffect(() => {
        if (!user) {
            navigate('/login');
        }
    }, [user, navigate]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await api.appointments.create({
                doctorId: parseInt(doctorId),
                ownerName: formData.ownerName,
                petName: formData.petName,
                date: formData.date,
                time: formData.time,
                reason: formData.reason
            }, user.email);

            setStep(2);
            setTimeout(() => {
                navigate('/clinic');
            }, 3000);
        } catch (error) {
            console.error("Booking failed", error);
            alert("Failed to book appointment. Please try again.");
        }
    };

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    return (
        <div className="max-w-4xl mx-auto py-12 px-4">
            <Link to="/clinic" className="inline-flex items-center text-sm font-bold text-gray-400 hover:text-health mb-12 group">
                <ArrowLeft size={18} className="mr-2 group-hover:-translate-x-1 transition-transform" /> Cancel & Return
            </Link>

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
                <div className="lg:col-span-8">
                    <div className="mb-12">
                        <h1 className="text-4xl font-black text-gray-900 mb-4">Book Your Appointment</h1>
                        <p className="text-gray-500 font-medium text-lg italic">Complete the form below to secure your pet's visit.</p>
                    </div>

                    <Card className="rounded-[2.5rem] border-gray-100 shadow-2xl shadow-health/5 p-4 sm:p-8">
                        {step === 1 ? (
                            <form onSubmit={handleSubmit} className="space-y-8">
                                <div className="space-y-6">
                                    <div className="flex items-center gap-3 text-health font-black uppercase tracking-widest text-xs mb-4">
                                        <User size={16} /> 1. Primary Information
                                    </div>
                                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                                        <div className="space-y-2">
                                            <label className="text-sm font-bold text-gray-700 ml-2">Your Full Name</label>
                                            <Input name="ownerName" required onChange={handleChange} placeholder="e.g. Liam Johnson" className="rounded-2xl border-gray-100" />
                                        </div>
                                        <div className="space-y-2">
                                            <label className="text-sm font-bold text-gray-700 ml-2">Pet's Name</label>
                                            <Input name="petName" required onChange={handleChange} placeholder="e.g. Milo" className="rounded-2xl border-gray-100" />
                                        </div>
                                    </div>
                                </div>

                                <div className="space-y-6 pt-6 border-t border-gray-50">
                                    <div className="flex items-center gap-3 text-health font-black uppercase tracking-widest text-xs mb-4">
                                        <Calendar size={16} /> 2. Schedule & Reason
                                    </div>
                                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                                        <div className="space-y-2">
                                            <label className="text-sm font-bold text-gray-700 ml-2">Preferred Date</label>
                                            <Input type="date" name="date" required onChange={handleChange} className="rounded-2xl border-gray-100" />
                                        </div>
                                        <div className="space-y-2">
                                            <label className="text-sm font-bold text-gray-700 ml-2">Preferred Time</label>
                                            <Input type="time" name="time" required onChange={handleChange} className="rounded-2xl border-gray-100" />
                                        </div>
                                    </div>
                                    <div className="space-y-2 pt-2">
                                        <label className="text-sm font-bold text-gray-700 ml-2">Reason for Visit</label>
                                        <textarea
                                            name="reason"
                                            className="flex min-h-[120px] w-full rounded-2xl border border-gray-100 bg-white px-5 py-4 text-base font-medium placeholder:text-gray-400 focus-visible:outline-none focus:border-health focus:ring-2 focus:ring-health/10 transition-all duration-200"
                                            placeholder="Please describe your concerns (e.g. Annual vaccination, lethargy, skin rash...)"
                                            onChange={handleChange}
                                            required
                                        ></textarea>
                                    </div>
                                </div>

                                <Button type="submit" className="w-full h-16 rounded-2xl bg-health hover:bg-emerald-600 text-xl font-black shadow-xl shadow-health/20 group">
                                    Confirm Reservation Details <ArrowLeft className="ml-2 rotate-180 group-hover:translate-x-1 transition-transform" />
                                </Button>
                            </form>
                        ) : (
                            <div className="py-20 flex flex-col items-center text-center">
                                <div className="h-24 w-24 bg-health rounded-full flex items-center justify-center text-white mb-8 animate-bounce">
                                    <CheckCircle2 size={56} />
                                </div>
                                <h2 className="text-3xl font-black text-gray-900 mb-4 tracking-tight">Booking Requested!</h2>
                                <p className="text-gray-500 font-bold max-w-sm mb-10">We've sent your request to Dr. {doctor?.name.split(' ')[1]}. You will receive a notification once confirmed.</p>
                                <div className="flex flex-col gap-4 w-full max-w-xs">
                                    <Button variant="secondary" onClick={() => navigate('/clinic')}>Back to Clinic</Button>
                                    <Button variant="ghost" className="text-health font-bold" onClick={() => navigate('/profile')}>Manage Appointments</Button>
                                </div>
                            </div>
                        )}
                    </Card>
                </div>

                <div className="lg:col-span-4">
                    <div className="sticky top-32 space-y-6">
                        <div className="bg-gray-900 rounded-[2.5rem] p-8 text-white relative overflow-hidden shadow-2xl">
                            <div className="absolute top-0 right-0 p-4 opacity-10">
                                <Calendar size={120} />
                            </div>
                            <div className="relative z-10">
                                <p className="text-health font-black uppercase tracking-widest text-[10px] mb-6">Booking Summary</p>
                                <div className="flex items-center gap-4 mb-8">
                                    <img src={doctor?.image} className="h-16 w-16 rounded-2xl object-cover border-4 border-white/10" />
                                    <div>
                                        <p className="font-black text-xl leading-none mb-1">{doctor?.name}</p>
                                        <p className="text-health text-xs font-bold uppercase tracking-widest">{doctor?.specialty}</p>
                                    </div>
                                </div>

                                <div className="space-y-4 pt-6 border-t border-white/10">
                                    {formData.date && (
                                        <div className="flex items-center gap-3 text-sm font-bold text-gray-400">
                                            <Calendar size={16} className="text-health" /> {formData.date}
                                        </div>
                                    )}
                                    {formData.time && (
                                        <div className="flex items-center gap-3 text-sm font-bold text-gray-400">
                                            <Clock size={16} className="text-health" /> {formData.time}
                                        </div>
                                    )}
                                </div>
                            </div>
                        </div>

                        <div className="bg-blue-50 p-8 rounded-[2.5rem] border border-blue-100 flex items-start gap-4 shadow-sm">
                            <Info className="text-primary mt-1 shrink-0" size={24} />
                            <div>
                                <h4 className="font-black text-gray-900 text-lg mb-2">Need Help?</h4>
                                <p className="text-sm text-gray-500 font-bold leading-relaxed mb-4 italic">Having trouble with the booking process or need an emergency slot?</p>
                                <a href="tel:1800-PAWLY" className="text-primary font-black hover:underline cursor-pointer">Call 1-800-PAWLY</a>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default BookAppointment;

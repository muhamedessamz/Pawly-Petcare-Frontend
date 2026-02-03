import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import Button from '../components/ui/Button';
import Input from '../components/ui/Input';
import { Card, CardHeader, CardTitle, CardContent } from '../components/ui/Card';
import { CreditCard, Truck, ShieldCheck, ArrowRight, CheckCircle2, Lock, ShoppingBag } from 'lucide-react';
import { useCart } from '../context/CartContext';
import { useAuth } from '../context/AuthContext';
import { api } from '../services/api';

const Checkout = () => {
    const navigate = useNavigate();
    const { cartItems, cartTotal, clearCart } = useCart();
    const { user } = useAuth();
    const [step, setStep] = useState(1);

    const handlePurchase = async (e) => {
        e.preventDefault();
        try {
            await api.orders.create({
                totalAmount: cartTotal + 10.50, // Including Tax
                items: cartItems.map(item => ({
                    productId: item.id,
                    productName: item.name,
                    quantity: item.quantity,
                    price: item.price
                }))
            }, user?.email || 'guest@example.com');

            clearCart();
            setStep(2);
            setTimeout(() => {
                navigate('/');
            }, 5000);
        } catch (error) {
            console.error("Order failed", error);
            alert("Failed to place order. Please try again.");
        }
    };

    if (step === 2) {
        return (
            <div className="min-h-[80vh] flex items-center justify-center px-4">
                <div className="text-center space-y-8 max-w-lg">
                    <div className="h-32 w-32 bg-health rounded-full flex items-center justify-center text-white mx-auto shadow-2xl shadow-health/30 animate-bounce">
                        <CheckCircle2 size={70} />
                    </div>
                    <div className="space-y-4">
                        <h1 className="text-5xl font-black tracking-tight">Order Confirmed!</h1>
                        <p className="text-xl text-gray-500 font-medium italic">
                            Thank you for choosing Pawly. We've sent a confirmation email to you.
                            Redirecting to home in 5 seconds...
                        </p>
                    </div>
                    <Link to="/">
                        <Button variant="ghost" className="text-primary font-black uppercase tracking-widest">Back to Home Now</Button>
                    </Link>
                </div>
            </div>
        );
    }

    return (
        <div className="max-w-7xl mx-auto px-4 py-20">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-16">
                <div className="lg:col-span-8 space-y-12">
                    <header className="text-center">
                        <h1 className="text-4xl font-black mb-4">Complete Your Order</h1>
                        <div className="flex items-center justify-center gap-2 text-sm font-bold text-gray-400 border-b border-gray-100 pb-8">
                            <span className="text-primary">1. Shipping</span>
                            <ArrowRight size={14} />
                            <span className="text-primary">2. Payment</span>
                            <ArrowRight size={14} />
                            <span className="text-gray-300">3. Confirmation</span>
                        </div>
                    </header>

                    <form onSubmit={handlePurchase} className="space-y-16">
                        {/* Shipping Info */}
                        <section className="space-y-8 flex flex-col items-center">
                            <h2 className="text-2xl font-black flex items-center gap-3 w-full justify-center">
                                <div className="h-10 w-10 bg-primary/10 text-primary rounded-xl flex items-center justify-center"><Truck size={20} /></div>
                                Shipping Details
                            </h2>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 w-full">
                                <Input placeholder="Full Name" className="h-14 rounded-xl text-center placeholder:text-left" required />
                                <Input placeholder="Email Address" type="email" className="h-14 rounded-xl text-center placeholder:text-left" required />
                                <Input placeholder="Street Address" className="h-14 rounded-xl md:col-span-2 text-center placeholder:text-left" required />
                                <Input placeholder="City" className="h-14 rounded-xl text-center placeholder:text-left" required />
                                <Input placeholder="ZIP Code" className="h-14 rounded-xl text-center placeholder:text-left" required />
                            </div>
                        </section>

                        {/* Payment Info */}
                        <section className="space-y-8 flex flex-col items-center">
                            <h2 className="text-2xl font-black flex items-center gap-3 w-full justify-center">
                                <div className="h-10 w-10 bg-health/10 text-health rounded-xl flex items-center justify-center"><CreditCard size={20} /></div>
                                Payment Method
                            </h2>
                            <Card className="rounded-3xl border-gray-100 bg-gray-50/50 p-8 space-y-8 w-full">
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                    <div className="md:col-span-2 relative group">
                                        <Input placeholder="Card Number" className="h-16 rounded-2xl pl-16 font-black text-center placeholder:text-left" required />
                                        <CreditCard className="absolute left-6 top-1/2 -translate-y-1/2 text-gray-300" size={24} />
                                    </div>
                                    <Input placeholder="MM / YY" className="h-16 rounded-2xl font-black text-center placeholder:text-left" required />
                                    <Input placeholder="CVC" className="h-16 rounded-2xl font-black text-center placeholder:text-left" required />
                                </div>
                                <div className="flex items-center gap-3 text-xs font-bold text-gray-400 justify-center">
                                    <Lock size={14} className="text-health" /> SSL Encrypted & Secure Payment
                                </div>
                            </Card>
                        </section>

                        <Button type="submit" className="w-full h-20 rounded-[1.5rem] text-xl font-black shadow-xl shadow-primary/20">
                            Confirm & Pay ${(cartTotal + 10.50).toFixed(2)}
                        </Button>
                    </form>
                </div>

                {/* Summary Sidebar */}
                <div className="lg:col-span-4">
                    <div className="sticky top-32 space-y-6">
                        <Card className="rounded-[2.5rem] border-gray-100 shadow-2xl shadow-gray-200/50 p-8">
                            <h3 className="text-xl font-black mb-8 flex items-center gap-3">
                                <ShoppingBag size={20} className="text-primary" /> Order Summary
                            </h3>
                            <div className="space-y-4 pb-8 border-b border-gray-50">
                                <div className="flex justify-between font-bold text-gray-500 italic">
                                    <span>Subtotal</span>
                                    <span>${cartTotal.toFixed(2)}</span>
                                </div>
                                <div className="flex justify-between font-bold text-gray-500 italic">
                                    <span>Shipping</span>
                                    <span className="text-health text-xs uppercase tracking-widest pt-1">Free</span>
                                </div>
                                <div className="flex justify-between font-bold text-gray-500 italic">
                                    <span>Taxes</span>
                                    <span>$10.50</span>
                                </div>
                            </div>
                            <div className="pt-8 flex justify-between items-baseline mb-8">
                                <span className="text-sm font-black text-gray-900 uppercase tracking-widest">Total Price</span>
                                <span className="text-4xl font-black text-primary">${(cartTotal + 10.50).toFixed(2)}</span>
                            </div>
                            <div className="bg-blue-50/50 p-4 rounded-2xl flex items-center gap-3 text-xs font-bold text-primary">
                                <ShieldCheck size={16} /> 30-Day Money Back Guarantee
                            </div>
                        </Card>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Checkout;

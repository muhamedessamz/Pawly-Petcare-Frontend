import React from 'react';
import { Link } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import { Card } from '../components/ui/Card';
import Button from '../components/ui/Button';
import Badge from '../components/ui/Badge';
import { getImageUrl } from '../services/api';
import { ShoppingBag, Trash2, Plus, Minus, ArrowRight, ShieldCheck, Truck, ShoppingCart, Heart } from 'lucide-react';

const Cart = () => {
    const { cartItems, removeFromCart, updateQuantity, cartTotal } = useCart();

    const subtotal = cartTotal;
    const shipping = subtotal > 50 || cartItems.length === 0 ? 0 : 5.99;
    const total = subtotal + shipping;

    if (cartItems.length === 0) {
        return (
            <div className="py-40 text-center flex flex-col items-center max-w-lg mx-auto px-4">
                <div className="h-32 w-32 bg-gray-50 text-gray-200 rounded-[3rem] flex items-center justify-center mb-8 relative">
                    <ShoppingCart size={60} />
                    <div className="absolute -top-2 -right-2 h-10 w-10 bg-white rounded-full flex items-center justify-center shadow-lg text-primary rotate-12">
                        <Heart size={20} fill="currentColor" />
                    </div>
                </div>
                <h2 className="text-4xl font-black text-gray-900 mb-4 tracking-tight">Your cart is empty</h2>
                <p className="text-xl text-gray-500 font-medium mb-10 leading-relaxed italic">
                    "A pet's bowl is never truly empty when there's love... but a few toys wouldn't hurt!"
                </p>
                <Link to="/store" className="w-full">
                    <Button size="lg" className="w-full h-20 rounded-[1.5rem] text-xl font-black shadow-xl shadow-primary/20">
                        Start Shopping
                    </Button>
                </Link>
            </div>
        );
    }

    return (
        <div className="max-w-7xl mx-auto px-4 py-20">
            <header className="mb-16 flex flex-col md:flex-row md:items-end justify-between gap-8">
                <div className="space-y-4">
                    <Badge variant="playful" className="uppercase tracking-widest px-4 py-1.5">Checkout Securely</Badge>
                    <h1 className="text-5xl md:text-6xl font-black text-gray-900 tracking-tight flex items-center gap-4">
                        Your Cart <span className="text-primary text-2xl">({cartItems.length})</span>
                    </h1>
                </div>
                <Link to="/store" className="text-primary font-black uppercase tracking-widest text-xs hover:gap-4 flex items-center gap-2 transition-all">
                    Continue Shopping <ArrowRight size={16} />
                </Link>
            </header>

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-16">
                {/* List of Items */}
                <div className="lg:col-span-8 space-y-8">
                    {cartItems.map((item) => (
                        <Card key={item.id} className="rounded-[3rem] border-gray-100 p-6 overflow-hidden hover:shadow-2xl transition-all duration-500 group">
                            <div className="flex flex-col sm:flex-row items-center gap-8">
                                <div className="h-40 w-40 rounded-[2rem] overflow-hidden shadow-xl flex-shrink-0 relative">
                                    <img src={getImageUrl(item.image)} alt={item.name} className="h-full w-full object-cover group-hover:scale-110 transition-transform duration-700" />
                                </div>

                                <div className="flex-1 text-center sm:text-left space-y-2">
                                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                                        <h3 className="text-2xl font-black text-gray-900 leading-tight">{item.name}</h3>
                                        <button
                                            onClick={() => removeFromCart(item.id)}
                                            className="h-10 w-10 rounded-xl bg-red-50 text-red-400 flex items-center justify-center hover:bg-red-500 hover:text-white transition-all mx-auto sm:mx-0"
                                        >
                                            <Trash2 size={18} />
                                        </button>
                                    </div>
                                    <p className="text-xs font-black text-gray-400 uppercase tracking-widest">{item.category}</p>

                                    <div className="flex flex-col sm:flex-row sm:items-center justify-between pt-6 gap-6">
                                        <div className="flex items-center justify-center bg-gray-50 p-1.5 rounded-2xl border border-gray-100 h-14">
                                            <button
                                                onClick={() => updateQuantity(item.id, item.quantity - 1)}
                                                className="h-10 w-10 rounded-xl flex items-center justify-center hover:bg-white hover:shadow-sm transition-all"
                                                disabled={item.quantity === 1}
                                            >
                                                <Minus size={18} />
                                            </button>
                                            <span className="w-14 text-center font-black text-xl">{item.quantity}</span>
                                            <button
                                                onClick={() => updateQuantity(item.id, item.quantity + 1)}
                                                className="h-10 w-10 rounded-xl flex items-center justify-center hover:bg-white hover:shadow-sm transition-all text-primary"
                                            >
                                                <Plus size={18} />
                                            </button>
                                        </div>
                                        <p className="text-primary font-black text-3xl tracking-tighter">${(item.price * item.quantity).toFixed(2)}</p>
                                    </div>
                                </div>
                            </div>
                        </Card>
                    ))}

                    {/* Delivery Promo */}
                    <div className="p-10 bg-primary/5 rounded-[3rem] border border-primary/10 flex flex-col md:flex-row items-center gap-8 group">
                        <div className="h-16 w-16 bg-white rounded-2xl shadow-xl flex items-center justify-center text-primary group-hover:rotate-12 transition-transform">
                            <Truck size={32} />
                        </div>
                        <div className="flex-1 text-center md:text-left">
                            <p className="font-black text-xl text-gray-900">Pawly Priority Delivery</p>
                            <p className="text-gray-500 font-bold italic leading-relaxed">
                                You're eligible for free carbon-neutral shipping on this order!
                            </p>
                        </div>
                        <Badge variant="playful" className="h-12 px-8 text-sm font-black uppercase">Free</Badge>
                    </div>
                </div>

                {/* Checkout Summary */}
                <div className="lg:col-span-4">
                    <Card className="rounded-[3.5rem] border-gray-900 bg-gray-900 text-white p-12 sticky top-32 shadow-2xl">
                        <h2 className="text-2xl font-black mb-12 tracking-tight flex items-baseline gap-2">
                            Order Overview <span className="h-2 w-2 rounded-full bg-primary animate-pulse"></span>
                        </h2>

                        <div className="space-y-6 mb-12 border-b border-white/10 pb-12">
                            <div className="flex justify-between font-bold text-gray-400">
                                <span>Subtotal</span>
                                <span className="text-white">${subtotal.toFixed(2)}</span>
                            </div>
                            <div className="flex justify-between font-bold text-gray-400">
                                <span>Shipping</span>
                                <span className="text-health">{shipping === 0 ? 'FREE' : `$${shipping.toFixed(2)}`}</span>
                            </div>
                            <div className="flex justify-between font-bold text-gray-400">
                                <span>Est. Sales Tax</span>
                                <span className="text-white">$0.00</span>
                            </div>
                        </div>

                        <div className="flex justify-between items-end mb-16">
                            <span className="text-sm font-black text-gray-500 uppercase tracking-widest mb-1">Total Bill</span>
                            <span className="text-5xl font-black text-white tracking-tighter">${total.toFixed(2)}</span>
                        </div>

                        <Link to="/checkout" className="block w-full">
                            <Button className="w-full h-24 rounded-[1.5rem] bg-primary hover:scale-[1.02] active:scale-[0.98] text-2xl font-black shadow-2xl shadow-primary/30 group">
                                Checkout <ArrowRight className="ml-2 group-hover:translate-x-2 transition-transform" />
                            </Button>
                        </Link>

                        <div className="mt-12 flex items-center justify-center gap-3 text-gray-500 font-bold text-[10px] uppercase tracking-[0.2em]">
                            <ShieldCheck size={16} className="text-health" /> PCI-DSS Compliant Security
                        </div>
                    </Card>
                </div>
            </div>
        </div>
    );
};

export default Cart;

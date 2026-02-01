import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { api } from '../services/api';
import Button from '../components/ui/Button';
import Badge from '../components/ui/Badge';
import { Star, Truck, ShieldCheck, ArrowLeft, Heart, Share2, Info } from 'lucide-react';
import { useCart } from '../context/CartContext';

const ProductDetails = () => {
    const { addToCart } = useCart();
    const { id } = useParams();
    const [product, setProduct] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchProduct = async () => {
            try {
                const data = await api.products.getById(id);
                setProduct(data);
            } catch (error) {
                console.error('Failed to fetch product', error);
            } finally {
                setLoading(false);
            }
        };
        fetchProduct();
    }, [id]);

    if (loading) return <div className="py-40 text-center flex flex-col items-center gap-4">
        <div className="h-12 w-12 border-4 border-primary border-t-transparent rounded-full animate-spin"></div>
        <p className="font-bold text-gray-500">Preparing product details...</p>
    </div>;
    if (!product) return <div className="py-40 text-center font-bold text-gray-900">Product not found.</div>;

    return (
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
            <Link to="/store" className="inline-flex items-center text-sm font-bold text-gray-400 hover:text-primary mb-12 transition-colors group">
                <ArrowLeft size={18} className="mr-2 group-hover:-translate-x-1 transition-transform" /> Back to Store
            </Link>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
                {/* Sticky Gallery */}
                <div className="relative">
                    <div className="sticky top-32 space-y-4">
                        <div className="bg-white rounded-[3rem] overflow-hidden shadow-2xl shadow-gray-200/50 border border-gray-100 aspect-square group">
                            <img src={product.image} alt={product.name} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" />
                        </div>
                        <div className="grid grid-cols-4 gap-4">
                            {[...Array(4)].map((_, i) => (
                                <div key={i} className={`aspect-square rounded-2xl border-2 overflow-hidden cursor-pointer transition-all ${i === 0 ? 'border-primary' : 'border-transparent hover:border-gray-200'}`}>
                                    <img src={product.image} className="w-full h-full object-cover opacity-60 hover:opacity-100 transition-opacity" />
                                </div>
                            ))}
                        </div>
                    </div>
                </div>

                {/* Details Content */}
                <div className="flex flex-col">
                    <div className="mb-10">
                        <div className="flex items-center justify-between mb-4">
                            <Badge variant="playful" className="uppercase tracking-widest px-4 py-1.5">{product.category}</Badge>
                            <div className="flex gap-2">
                                <Button variant="ghost" size="icon" className="rounded-2xl border border-gray-100"><Heart size={20} /></Button>
                                <Button variant="ghost" size="icon" className="rounded-2xl border border-gray-100"><Share2 size={20} /></Button>
                            </div>
                        </div>
                        <h1 className="text-5xl font-black text-gray-900 leading-tight mb-4 tracking-tight">{product.name}</h1>
                        <div className="flex items-center gap-4">
                            <div className="flex items-center gap-1.5 bg-playful/10 text-playful px-3 py-1.5 rounded-xl font-black text-sm">
                                <Star fill="currentColor" size={16} /> {product.rating}
                            </div>
                            <span className="text-gray-400 font-bold text-sm tracking-tight">{product.reviews} Verified Reviews</span>
                            <span className="h-4 w-px bg-gray-200"></span>
                            <span className="text-health font-bold text-sm">In Stock</span>
                        </div>
                    </div>

                    <div className="flex items-baseline gap-2 mb-10">
                        <span className="text-5xl font-black text-primary tracking-tighter">${product.price.toFixed(2)}</span>
                        <span className="text-gray-400 font-medium line-through text-lg">${(product.price * 1.2).toFixed(2)}</span>
                    </div>

                    <div className="bg-blue-50/50 p-6 rounded-3xl border border-blue-100/50 mb-10">
                        <div className="flex items-start gap-3">
                            <Info size={20} className="text-primary mt-1 shrink-0" />
                            <p className="text-gray-600 font-medium leading-relaxed italic">{product.description}</p>
                        </div>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-12">
                        <Button
                            size="lg"
                            className="h-16 rounded-[1.25rem] text-lg font-black shadow-xl shadow-primary/20"
                            onClick={() => addToCart(product)}
                        >
                            Add to Cart
                        </Button>
                        <Button size="lg" variant="secondary" className="h-16 rounded-[1.25rem] bg-gray-900 text-white hover:bg-gray-800">Buy It Now</Button>
                    </div>

                    <div className="space-y-6 pt-10 border-t border-gray-100">
                        <div className="flex items-center gap-4 p-4 rounded-2xl hover:bg-gray-50 transition-colors group">
                            <div className="h-12 w-12 bg-primary/10 text-primary rounded-xl flex items-center justify-center group-hover:bg-primary group-hover:text-white transition-all">
                                <Truck size={24} />
                            </div>
                            <div>
                                <h4 className="font-black text-gray-900">Same Day Delivery</h4>
                                <p className="text-sm text-gray-500 font-bold">Free for orders over $50 in Brooklyn area.</p>
                            </div>
                        </div>
                        <div className="flex items-center gap-4 p-4 rounded-2xl hover:bg-gray-50 transition-colors group">
                            <div className="h-12 w-12 bg-health/10 text-health rounded-xl flex items-center justify-center group-hover:bg-health group-hover:text-white transition-all">
                                <ShieldCheck size={24} />
                            </div>
                            <div>
                                <h4 className="font-black text-gray-900">Health Guarantee</h4>
                                <p className="text-sm text-gray-500 font-bold">100% genuine products with 30-day returns.</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ProductDetails;

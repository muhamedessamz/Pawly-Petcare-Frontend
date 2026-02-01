import React, { useEffect, useState } from 'react';
import { api } from '../services/api';
import ProductCard from '../components/features/ProductCard';
import Input from '../components/ui/Input';
import { Search, SlidersHorizontal, Package, Tag, ArrowRight } from 'lucide-react';
import Button from '../components/ui/Button';

const Store = () => {
    const [products, setProducts] = useState([]);
    const [filteredProducts, setFilteredProducts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [searchTerm, setSearchTerm] = useState('');
    const [selectedCategory, setSelectedCategory] = useState(new URLSearchParams(window.location.search).get('category') || 'All');

    useEffect(() => {
        const fetchProducts = async () => {
            try {
                const data = await api.products.getAll();
                setProducts(data);
                setFilteredProducts(data);
            } catch (error) {
                console.error('Failed to fetch products', error);
            } finally {
                setLoading(false);
            }
        };
        fetchProducts();
    }, []);

    useEffect(() => {
        let result = products;

        if (searchTerm) {
            result = result.filter(p => p.name.toLowerCase().includes(searchTerm.toLowerCase()));
        }

        if (selectedCategory !== 'All') {
            result = result.filter(p => p.category === selectedCategory);
        }

        setFilteredProducts(result);
    }, [searchTerm, selectedCategory, products]);

    const categories = ['All', ...new Set(products.map(p => p.category))];

    return (
        <div className="max-w-7xl mx-auto px-4 py-12 space-y-12">
            <div className="flex flex-col md:flex-row justify-between items-center gap-6 bg-white p-8 rounded-[2rem] border border-gray-100 shadow-sm">
                <div className="max-w-md text-center md:text-left">
                    <div className="flex items-center gap-2 text-primary font-bold mb-2 justify-center md:justify-start">
                        <Package size={20} /> <span className="uppercase tracking-widest text-xs">Pet Marketplace</span>
                    </div>
                    <h1 className="text-4xl font-black text-gray-900 mb-2">The Pawly Shop</h1>
                    <p className="text-gray-500 font-medium italic">Premium nutrition and toys for your best friends.</p>
                </div>

                <div className="relative w-full md:w-96 group">
                    <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 group-focus-within:text-primary transition-colors" size={20} />
                    <Input
                        placeholder="Search products..."
                        className="pl-12 py-6 rounded-2xl shadow-sm border-gray-100 focus:shadow-lg focus:shadow-primary/5 transition-all text-base"
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                    />
                </div>
            </div>

            <div className="flex flex-col lg:flex-row gap-8">
                {/* Sidebar / Filter Toggle */}
                <aside className="lg:w-64 space-y-8 flex-shrink-0">
                    <div className="bg-white p-6 rounded-[2rem] border border-gray-100 shadow-sm h-fit">
                        <div className="flex items-center gap-2 font-black text-gray-900 mb-6 uppercase tracking-tighter">
                            <SlidersHorizontal size={18} className="text-primary" /> Filters
                        </div>

                        <div className="space-y-2">
                            <p className="text-xs font-black text-gray-400 uppercase tracking-widest mb-4 flex items-center gap-2">
                                <Tag size={12} /> Category
                            </p>
                            <div className="flex flex-wrap lg:flex-col gap-2">
                                {categories.map(cat => (
                                    <button
                                        key={cat}
                                        onClick={() => setSelectedCategory(cat)}
                                        className={`px-4 py-2.5 rounded-xl text-sm font-bold transition-all duration-300 text-left ${selectedCategory === cat
                                            ? 'bg-primary text-white shadow-lg shadow-primary/20 scale-[1.02]'
                                            : 'bg-gray-50 text-gray-500 hover:bg-gray-100 hover:text-gray-900'
                                            }`}
                                    >
                                        {cat}
                                    </button>
                                ))}
                            </div>
                        </div>
                    </div>

                    <div className="bg-primary rounded-[2rem] p-6 text-white relative overflow-hidden hidden lg:block">
                        <div className="relative z-10">
                            <p className="font-black text-lg mb-2">Member Discount</p>
                            <p className="text-sm opacity-80 mb-4">Get 20% off all food items with a Pawly+ subscription.</p>
                            <Button variant="secondary" size="sm" className="w-full rounded-xl font-bold">Learn More</Button>
                        </div>
                        <div className="absolute top-0 right-0 w-32 h-32 bg-white/10 rounded-full -mr-16 -mt-16 blur-xl"></div>
                    </div>
                </aside>

                {/* Product Grid */}
                <div className="flex-1">
                    {loading ? (
                        <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-8">
                            {[...Array(6)].map((_, i) => (
                                <div key={i} className="aspect-[4/5] bg-gray-100 rounded-[2.5rem] animate-pulse"></div>
                            ))}
                        </div>
                    ) : (
                        <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-8">
                            {filteredProducts.length > 0 ? (
                                filteredProducts.map((product) => (
                                    <ProductCard key={product.id} product={product} />
                                ))
                            ) : (
                                <div className="col-span-full py-32 flex flex-col items-center justify-center text-center bg-white rounded-[2.5rem] border border-dashed border-gray-200">
                                    <div className="h-20 w-20 bg-gray-50 text-gray-300 rounded-full flex items-center justify-center mb-6">
                                        <Package size={40} />
                                    </div>
                                    <h3 className="text-2xl font-bold text-gray-900 mb-2">No products found</h3>
                                    <p className="text-gray-500 font-medium mb-8">Try adjusting your filters or search keywords.</p>
                                    <Button variant="outline" onClick={() => { setSearchTerm(''); setSelectedCategory('All'); }}>Clear All Filters</Button>
                                </div>
                            )}
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default Store;

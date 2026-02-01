import React from 'react';
import { Link } from 'react-router-dom';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '../ui/Card';
import Button from '../ui/Button';
import Badge from '../ui/Badge';
import { Star, ShoppingCart, ArrowRight } from 'lucide-react';
import { useCart } from '../../context/CartContext';

const ProductCard = ({ product }) => {
    const { addToCart } = useCart();
    return (
        <Card className="group overflow-hidden border-gray-100 flex flex-col h-full hover:shadow-2xl hover:shadow-primary/5 transition-all duration-500">
            <div className="aspect-[4/5] relative overflow-hidden bg-gray-50">
                <img
                    src={product.image}
                    alt={product.name}
                    className="object-cover w-full h-full group-hover:scale-110 transition-transform duration-700"
                />
                <div className="absolute top-4 left-4 flex gap-2">
                    <Badge variant="playful" className="bg-white/90 backdrop-blur-sm border-none shadow-sm">{product.category}</Badge>
                </div>

                {/* Quick Shop Overlay */}
                <div className="absolute inset-x-0 bottom-0 p-4 translate-y-full group-hover:translate-y-0 transition-transform duration-300">
                    <Button
                        variant="primary"
                        className="w-full gap-2 shadow-xl shadow-primary/20"
                        onClick={() => addToCart(product)}
                    >
                        <ShoppingCart size={18} /> Add to Cart
                    </Button>
                </div>
            </div>

            <CardHeader className="pb-2 pt-6">
                <div className="flex justify-between items-start mb-1">
                    <CardTitle className="text-lg leading-tight group-hover:text-primary transition-colors line-clamp-1" title={product.name}>
                        {product.name}
                    </CardTitle>
                </div>
                <div className="flex items-center gap-1.5 text-sm font-bold text-playful">
                    <Star size={14} fill="currentColor" />
                    <span>{product.rating}</span>
                    <span className="text-gray-400 font-medium">({product.reviews})</span>
                </div>
            </CardHeader>

            <CardContent className="flex-grow pb-4 px-6">
                <p className="text-sm text-gray-500 line-clamp-2 md:line-clamp-3 leading-relaxed">{product.description}</p>
            </CardContent>

            <div className="px-6 pb-6 mt-auto">
                <div className="flex items-center justify-between border-t border-gray-50 pt-4">
                    <span className="text-2xl font-black text-gray-900 tracking-tight">
                        <span className="text-sm font-bold align-top mt-1 inline-block">$</span>
                        {product.price.toFixed(2)}
                    </span>
                    <Link to={`/products/${product.id}`}>
                        <Button variant="ghost" size="sm" className="text-primary hover:bg-primary/5 rounded-lg px-2 group/btn">
                            Details <ArrowRight size={16} className="ml-1 group-hover/btn:translate-x-1 transition-transform" />
                        </Button>
                    </Link>
                </div>
            </div>
        </Card>
    );
};

export default ProductCard;

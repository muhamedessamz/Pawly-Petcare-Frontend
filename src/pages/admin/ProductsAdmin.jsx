import React, { useEffect, useState } from 'react';
import { Plus, Edit2, Trash2, Search } from 'lucide-react';
import Button from '../../components/ui/Button';
import Badge from '../../components/ui/Badge';
import { api } from '../../services/api';

const ProductsAdmin = () => {
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetchProducts();
    }, []);

    const fetchProducts = async () => {
        try {
            const data = await api.products.getAll();
            setProducts(data);
        } catch (error) {
            console.error(error);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="space-y-6">
            <div className="flex justify-between items-center">
                <div>
                    <h1 className="text-3xl font-black text-gray-900">Products</h1>
                    <p className="text-gray-500 font-medium">Manage your store inventory.</p>
                </div>
                <Button className="flex items-center gap-2">
                    <Plus size={20} /> Add Product
                </Button>
            </div>

            <div className="bg-white rounded-3xl border border-gray-100 shadow-sm overflow-hidden">
                <div className="p-4 border-b border-gray-100 flex gap-4">
                    <div className="relative flex-1">
                        <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={20} />
                        <input
                            type="text"
                            placeholder="Search products..."
                            className="w-full pl-10 pr-4 py-3 rounded-xl bg-gray-50 border-none focus:ring-2 focus:ring-primary/20 outline-none"
                        />
                    </div>
                </div>
                <div className="overflow-x-auto">
                    <table className="w-full text-left">
                        <thead className="bg-gray-50 text-gray-500 font-bold uppercase text-xs tracking-wider">
                            <tr>
                                <th className="p-6">Product</th>
                                <th className="p-6">Category</th>
                                <th className="p-6">Price</th>
                                <th className="p-6">Stock</th>
                                <th className="p-6 text-right">Actions</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-100">
                            {products.map((product) => (
                                <tr key={product.id} className="hover:bg-gray-50/50 transition-colors">
                                    <td className="p-6">
                                        <div className="flex items-center gap-4">
                                            <div className="h-12 w-12 rounded-lg bg-gray-100 overflow-hidden">
                                                <img src={product.image || "https://placehold.co/100"} alt="" className="w-full h-full object-cover" />
                                            </div>
                                            <div>
                                                <p className="font-bold text-gray-900">{product.name}</p>
                                                <p className="text-xs text-gray-400">ID: #{product.id}</p>
                                            </div>
                                        </div>
                                    </td>
                                    <td className="p-6">
                                        <Badge variant="outline">{product.category}</Badge>
                                    </td>
                                    <td className="p-6 font-bold text-gray-900">
                                        ${product.price}
                                    </td>
                                    <td className="p-6">
                                        <span className={`font-bold ${product.stock > 10 ? 'text-blue-500' : 'text-red-500'}`}>
                                            {product.stock || 0} in stock
                                        </span>
                                    </td>
                                    <td className="p-6 text-right">
                                        <div className="flex items-center justify-end gap-2">
                                            <button className="p-2 hover:bg-gray-100 rounded-lg text-gray-500 hover:text-primary transition-colors">
                                                <Edit2 size={18} />
                                            </button>
                                            <button className="p-2 hover:bg-red-50 rounded-lg text-gray-500 hover:text-red-500 transition-colors">
                                                <Trash2 size={18} />
                                            </button>
                                        </div>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
};

export default ProductsAdmin;

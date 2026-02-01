import React, { useState, useEffect } from 'react';
import { api } from '../../services/api';
import Button from '../../components/ui/Button';
import Input from '../../components/ui/Input';
import { Plus, Trash2, Edit2, CheckCircle, XCircle } from 'lucide-react';

const BlogAdmin = () => {
    const [posts, setPosts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [showForm, setShowForm] = useState(false);

    // Form State
    const [formData, setFormData] = useState({
        title: '',
        excerpt: '',
        content: '',
        author: 'Pawly Team',
        image: '',
        category: 'Health'
    });

    useEffect(() => {
        fetchPosts();
    }, []);

    const fetchPosts = async () => {
        try {
            const data = await api.blog.getAll();
            setPosts(data);
        } catch (error) {
            console.error('Error fetching blog posts:', error);
        } finally {
            setLoading(false);
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            // Ideally backend returns the created post
            const newPost = await api.blog.create({
                ...formData,
                date: new Date().toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })
            });
            // If backend doesn't return date formatted, we might need to adjust, but let's assume it works or we reload.
            setPosts([...posts, newPost]);
            setShowForm(false);
            setFormData({ title: '', excerpt: '', content: '', author: 'Pawly Team', image: '', category: 'Health' });
        } catch (error) {
            console.error('Error creating post:', error);
            alert('Failed to create post');
        }
    };

    const handleDelete = async (id) => {
        if (!window.confirm('Are you sure you want to delete this post?')) return;
        try {
            // Check if api.blog.delete exists, if not we need to add it to API service
            await api.blog.delete(id).catch(err => {
                console.warn("Delete API might not be implemented yet", err);
                // Mock delete from UI if API fails for now (or throw)
                if (err.message.includes("404") || err) throw err;
            });
            setPosts(posts.filter(p => p.id !== id));
        } catch (error) {
            console.error('Error deleting post:', error);
        }
    };

    return (
        <div className="space-y-8">
            <div className="flex justify-between items-center">
                <div>
                    <h1 className="text-2xl font-black text-gray-900">Blog Management</h1>
                    <p className="text-gray-500">Manage your articles and news</p>
                </div>
                <Button onClick={() => setShowForm(!showForm)} className="flex items-center gap-2">
                    {showForm ? <XCircle size={18} /> : <Plus size={18} />}
                    {showForm ? 'Cancel' : 'New Article'}
                </Button>
            </div>

            {showForm && (
                <div className="bg-white p-8 rounded-3xl border border-gray-100 shadow-xl">
                    <h2 className="text-xl font-bold mb-6">Write New Article</h2>
                    <form onSubmit={handleSubmit} className="space-y-6">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <Input
                                label="Title"
                                value={formData.title}
                                onChange={e => setFormData({ ...formData, title: e.target.value })}
                                required
                            />
                            <Input
                                label="Category"
                                value={formData.category}
                                onChange={e => setFormData({ ...formData, category: e.target.value })}
                                required
                            />
                        </div>
                        <Input
                            label="Image URL"
                            value={formData.image}
                            onChange={e => setFormData({ ...formData, image: e.target.value })}
                            required
                        />
                        <div className="space-y-2">
                            <label className="block text-sm font-bold text-gray-700">Excerpt (Short Summary)</label>
                            <textarea
                                className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-health focus:ring-health min-h-[80px]"
                                value={formData.excerpt}
                                onChange={e => setFormData({ ...formData, excerpt: e.target.value })}
                                required
                            />
                        </div>
                        <div className="space-y-2">
                            <label className="block text-sm font-bold text-gray-700">Full Content</label>
                            <textarea
                                className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-health focus:ring-health min-h-[200px]"
                                value={formData.content}
                                onChange={e => setFormData({ ...formData, content: e.target.value })}
                                required
                            />
                        </div>
                        <div className="flex justify-end pt-4">
                            <Button type="submit" className="bg-health hover:bg-emerald-600 shadow-xl shadow-health/20">
                                Publish Article
                            </Button>
                        </div>
                    </form>
                </div>
            )}

            <div className="bg-white rounded-[2.5rem] border border-gray-100 shadow-sm overflow-hidden">
                <table className="w-full text-left">
                    <thead className="bg-gray-50 border-b border-gray-100">
                        <tr>
                            <th className="p-6 font-bold text-sm text-gray-500 uppercase tracking-wider">Article</th>
                            <th className="p-6 font-bold text-sm text-gray-500 uppercase tracking-wider">Category</th>
                            <th className="p-6 font-bold text-sm text-gray-500 uppercase tracking-wider">Date</th>
                            <th className="p-6 font-bold text-sm text-gray-500 uppercase tracking-wider text-right">Actions</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-100">
                        {posts.map((post) => (
                            <tr key={post.id} className="hover:bg-gray-50/50 transition-colors group">
                                <td className="p-6">
                                    <div className="flex items-center gap-4">
                                        <div className="h-12 w-16 rounded-lg overflow-hidden bg-gray-100">
                                            <img src={post.image} alt="" className="w-full h-full object-cover" />
                                        </div>
                                        <span className="font-bold text-gray-900 group-hover:text-health transition-colors">{post.title}</span>
                                    </div>
                                </td>
                                <td className="p-6">
                                    <span className="px-3 py-1 rounded-full bg-gray-100 text-xs font-bold text-gray-600">{post.category}</span>
                                </td>
                                <td className="p-6 text-sm text-gray-500 font-medium">
                                    {post.date}
                                </td>
                                <td className="p-6 text-right">
                                    <div className="flex items-center justify-end gap-2">
                                        <button onClick={() => handleDelete(post.id)} className="p-2 hover:bg-red-50 text-gray-400 hover:text-red-500 rounded-lg transition-colors">
                                            <Trash2 size={18} />
                                        </button>
                                    </div>
                                </td>
                            </tr>
                        ))}
                        {posts.length === 0 && !loading && (
                            <tr>
                                <td colSpan="4" className="p-12 text-center text-gray-500 font-medium">No articles found. Write your first one!</td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default BlogAdmin;

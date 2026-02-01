import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { api } from '../services/api';
import Badge from '../components/ui/Badge';
import { Calendar, User, ArrowLeft, Share2, Heart, MessageSquare } from 'lucide-react';

const BlogDetails = () => {
    const { id } = useParams();
    const [post, setPost] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchPost = async () => {
            const data = await api.blog.getById(id);
            setPost(data);
            setLoading(false);
        };
        fetchPost();
    }, [id]);

    if (loading) return <div className="py-40 text-center flex flex-col items-center gap-4">
        <div className="h-12 w-12 border-4 border-primary border-t-transparent rounded-full animate-spin"></div>
    </div>;

    if (!post) return <div className="py-40 text-center font-bold">Article not found.</div>;

    return (
        <div className="max-w-4xl mx-auto px-4 py-20 space-y-12">
            <Link to="/blog" className="inline-flex items-center text-sm font-bold text-gray-400 hover:text-primary transition-colors group">
                <ArrowLeft size={18} className="mr-2 group-hover:-translate-x-1 transition-transform" /> Back to Journal
            </Link>

            <header className="space-y-8">
                <div className="flex items-center justify-between">
                    <Badge variant="playful" className="uppercase tracking-widest px-4 py-1">{post.category}</Badge>
                    <div className="flex gap-2">
                        <button className="h-10 w-10 rounded-xl bg-gray-50 border border-gray-100 flex items-center justify-center text-gray-400 hover:text-primary hover:border-primary transition-all"><Share2 size={18} /></button>
                        <button className="h-10 w-10 rounded-xl bg-gray-50 border border-gray-100 flex items-center justify-center text-gray-400 hover:text-red-500 hover:border-red-200 transition-all"><Heart size={18} /></button>
                    </div>
                </div>

                <h1 className="text-4xl md:text-6xl font-black text-gray-900 leading-tight tracking-tight">{post.title}</h1>

                <div className="flex items-center gap-6 pt-4 border-t border-gray-50">
                    <div className="flex items-center gap-3">
                        <div className="h-12 w-12 rounded-full bg-primary/10 flex items-center justify-center text-primary font-black uppercase text-xs">
                            {post.author.split(' ')[1][0]}
                        </div>
                        <div>
                            <p className="text-sm font-black text-gray-900">{post.author}</p>
                            <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">Medical Expert</p>
                        </div>
                    </div>
                    <div className="h-8 w-px bg-gray-100"></div>
                    <div className="flex items-center gap-2 text-sm font-bold text-gray-400">
                        <Calendar size={16} className="text-primary" /> {post.date}
                    </div>
                </div>
            </header>

            <div className="aspect-[21/9] rounded-[3rem] overflow-hidden shadow-2xl border border-gray-100">
                <img src={post.image} alt={post.title} className="w-full h-full object-cover" />
            </div>

            <div className="prose prose-lg max-w-none text-gray-600 font-medium leading-[1.8] italic">
                {post.content}
                <br /><br />
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.
                <br /><br />
                Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum. Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam, eaque ipsa quae ab illo inventore veritatis et quasi architecto beatae vitae dicta sunt explicabo.
            </div>

            <footer className="pt-12 border-t border-gray-100 flex items-center justify-between">
                <div className="flex items-center gap-4">
                    <button className="flex items-center gap-2 text-sm font-black text-gray-400 hover:text-primary transition-colors">
                        <Heart size={18} /> Like
                    </button>
                    <button className="flex items-center gap-2 text-sm font-black text-gray-400 hover:text-primary transition-colors">
                        <MessageSquare size={18} /> Comment
                    </button>
                </div>
                <p className="text-xs font-bold text-gray-400 uppercase tracking-widest">5 min read</p>
            </footer>
        </div>
    );
};

export default BlogDetails;

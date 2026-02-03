import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { api } from '../services/api';
import staticBlogData from '../services/mockData/blog.json';
import { ArrowLeft, User, Calendar, Tag, Share2 } from 'lucide-react';
import Button from '../components/ui/Button';
import Badge from '../components/ui/Badge';

const BlogDetails = () => {
    const { id } = useParams();
    const [article, setArticle] = useState(null);
    const [loading, setLoading] = useState(true);
    const [relatedPosts, setRelatedPosts] = useState([]);

    useEffect(() => {
        const fetchArticle = async () => {
            setLoading(true);
            try {
                const staticId = parseInt(id);
                // Search static data first to avoid 404 network errors for mock posts
                let data = staticBlogData.find(p => p.id === staticId);

                if (!data) {
                    try {
                        data = await api.blog.getById(id);
                    } catch (e) {
                        // Suppress console error for known missing posts
                    }
                }

                setArticle(data);

                // Get related posts (exclude current) - silence API errors here too
                const allBlogs = await api.blog.getAll().catch(() => []);
                const merged = [...staticBlogData, ...allBlogs];
                setRelatedPosts(merged.filter(p => p.id !== staticId).slice(0, 3));
            } catch (error) {
                console.error('Failed to fetch blog detail', error);
            } finally {
                setLoading(false);
            }
        };
        fetchArticle();
    }, [id]);

    if (loading) {
        return (
            <div className="min-h-screen bg-gray-50 flex items-center justify-center">
                <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-b-4 border-health"></div>
            </div>
        );
    }

    if (!article) {
        return (
            <div className="min-h-screen bg-gray-50 flex flex-col items-center justify-center p-4">
                <h2 className="text-3xl font-black text-gray-900 mb-4">Article not found</h2>
                <Link to="/">
                    <Button variant="outline">Back to Home</Button>
                </Link>
            </div>
        );
    }

    return (
        <article className="pb-24 bg-white">
            {/* Hero Section */}
            <div className="min-h-[500px] md:h-[70vh] relative w-full overflow-hidden bg-gray-900">
                <img
                    src={article.image}
                    alt={article.title}
                    className="absolute inset-0 w-full h-full object-cover opacity-60 scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-gray-900 via-gray-900/40 to-black/30"></div>

                <div className="absolute top-6 left-6 z-30">
                    <Link to="/blog">
                        <Button variant="ghost" className="bg-black/20 backdrop-blur-md text-white/90 hover:bg-white/20 hover:text-white px-5 py-2 rounded-xl group transition-all border border-white/10">
                            <ArrowLeft size={20} className="mr-2 group-hover:-translate-x-1 transition-transform" /> Back
                        </Button>
                    </Link>
                </div>

                <div className="absolute inset-0 flex items-center pt-20">
                    <div className="w-full px-4 md:px-12 text-center md:text-left">
                        <div className="max-w-4xl mx-auto">
                            <div className="flex flex-col gap-6">
                                <div className="hidden md:flex items-center gap-3">
                                    <Badge variant="playful" className="bg-health text-white border-none">{article.category}</Badge>
                                    <span className="text-white/40 text-sm font-bold uppercase tracking-widest hidden sm:block">Article Details</span>
                                </div>
                                <h1 className="text-3xl md:text-5xl lg:text-6xl font-black text-white leading-tight">
                                    {article.title}
                                </h1>
                                <div className="hidden md:flex flex-wrap items-center gap-x-8 gap-y-4 text-white/90 font-bold text-sm md:text-base">
                                    <div className="flex items-center gap-2">
                                        <div className="h-8 w-8 rounded-full bg-health/20 flex items-center justify-center">
                                            <User size={16} className="text-health" />
                                        </div>
                                        {article.author}
                                    </div>
                                    <div className="flex items-center gap-2">
                                        <div className="h-8 w-8 rounded-full bg-health/20 flex items-center justify-center">
                                            <Calendar size={16} className="text-health" />
                                        </div>
                                        {article.date}
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Content */}
            <div className="max-w-4xl mx-auto px-4 -mt-16 md:-mt-20 relative z-20">
                <div className="bg-white rounded-[2.5rem] md:rounded-[3rem] p-6 md:p-16 shadow-2xl border border-gray-100">
                    {/* Mobile Only Metadata */}
                    <div className="md:hidden flex flex-col gap-6 mb-8 pb-8 border-b border-gray-100">
                        <div className="flex items-center gap-2">
                            <Badge variant="playful" className="bg-health text-white border-none">{article.category}</Badge>
                            <span className="text-gray-400 text-xs font-black uppercase tracking-widest italic">Journal Entry</span>
                        </div>
                        <div className="flex flex-wrap items-center gap-x-6 gap-y-2 text-gray-500 font-bold text-sm">
                            <div className="flex items-center gap-2">
                                <User size={14} className="text-health" />
                                {article.author}
                            </div>
                            <div className="flex items-center gap-2">
                                <Calendar size={14} className="text-health" />
                                {article.date}
                            </div>
                        </div>
                    </div>
                    <div className="prose prose-lg md:prose-xl max-w-none prose-headings:font-black prose-a:text-health text-gray-600 leading-relaxed whitespace-pre-line">
                        {article.content}
                    </div>

                    <div className="mt-16 pt-8 border-t border-gray-100 flex justify-between items-center">
                        <div className="flex gap-2">
                            <Badge variant="outline" className="text-gray-400">#petcare</Badge>
                            <Badge variant="outline" className="text-gray-400">#{article.category.toLowerCase()}</Badge>
                        </div>
                        <Button variant="ghost" className="text-gray-500 hover:text-health hover:bg-health/5">
                            <Share2 size={20} className="mr-2" /> Share Article
                        </Button>
                    </div>
                </div>
            </div>
        </article>
    );
};

export default BlogDetails;

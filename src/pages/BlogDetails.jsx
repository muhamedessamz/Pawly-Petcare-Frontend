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

    useEffect(() => {
        const fetchArticle = async () => {
            setLoading(true);
            try {
                // 1. Try to find in static data first
                const staticArticle = staticBlogData.find(p => p.id === parseInt(id));

                if (staticArticle) {
                    setArticle(staticArticle);
                } else {
                    // 2. Fallback to API
                    const apiArticle = await api.blog.getById(id);
                    setArticle(apiArticle);
                }
            } catch (error) {
                console.error("Failed to load article", error);
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
            {/* Hero Image */}
            <div className="h-[50vh] relative w-full overflow-hidden bg-gray-900">
                <img
                    src={article.image}
                    alt={article.title}
                    className="w-full h-full object-cover opacity-60"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-gray-900 via-transparent to-transparent"></div>

                <div className="absolute bottom-0 left-0 w-full p-6 md:p-12">
                    <div className="max-w-4xl mx-auto">
                        <Link to="/">
                            <Button variant="ghost" className="text-white/80 hover:bg-white/10 hover:text-white mb-6 p-0">
                                <ArrowLeft size={20} className="mr-2" /> Back to Home
                            </Button>
                        </Link>
                        <Badge variant="playful" className="bg-health text-white border-none mb-4">{article.category}</Badge>
                        <h1 className="text-4xl md:text-6xl font-black text-white leading-tight mb-6">
                            {article.title}
                        </h1>
                        <div className="flex flex-wrap items-center gap-6 text-white/90 font-medium">
                            <div className="flex items-center gap-2">
                                <User size={18} className="text-health" />
                                {article.author}
                            </div>
                            <div className="flex items-center gap-2">
                                <Calendar size={18} className="text-health" />
                                {article.date}
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Content */}
            <div className="max-w-4xl mx-auto px-4 -mt-10 relative z-10">
                <div className="bg-white rounded-[3rem] p-8 md:p-16 shadow-xl border border-gray-100">
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

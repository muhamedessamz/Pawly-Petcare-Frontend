import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { api } from '../services/api';
import Button from '../components/ui/Button';
import Badge from '../components/ui/Badge';
import { Card } from '../components/ui/Card';
import { Search, Filter, Heart, ArrowRight, Dog, Cat, Info, MapPin, PawPrint } from 'lucide-react';

const Adoption = () => {
    const [pets, setPets] = useState([]);
    const [filteredPets, setFilteredPets] = useState([]);
    const [loading, setLoading] = useState(true);
    const [selectedSpecies, setSelectedSpecies] = useState('All');
    const [searchTerm, setSearchTerm] = useState('');

    useEffect(() => {
        fetchPets();
    }, []);

    const fetchPets = async () => {
        try {
            setLoading(true);
            const data = await api.pets.getAll();
            setPets(data || []);
            setFilteredPets(data || []);
        } catch (error) {
            console.error('Failed to fetch pets:', error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        let result = pets;
        if (selectedSpecies !== 'All') {
            result = result.filter(pet => (pet.type || pet.species) === selectedSpecies);
        }
        if (searchTerm) {
            result = result.filter(pet =>
                pet.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                pet.breed.toLowerCase().includes(searchTerm.toLowerCase())
            );
        }
        setFilteredPets(result);
    }, [selectedSpecies, searchTerm, pets]);

    const getTraits = (traits) => {
        if (!traits) return [];
        if (Array.isArray(traits)) return traits;
        return typeof traits === 'string' ? traits.split(',').map(t => t.trim()) : [];
    };

    return (
        <div className="max-w-7xl mx-auto px-4 py-20">
            {/* Header */}
            <header className="mb-16 text-center max-w-3xl mx-auto">
                <Badge variant="playful" className="mb-6 uppercase tracking-widest px-4 py-1.5 bg-primary/10 text-primary border-none">Find Your Soulmate</Badge>
                <h1 className="text-4xl md:text-7xl font-black text-gray-900 mb-6 tracking-tight leading-[1.1]">
                    Adoption Center
                </h1>
                <p className="text-lg md:text-xl text-gray-500 font-medium leading-relaxed italic mb-10 px-4 md:px-0">
                    "Every pet deserves a loving home, and every home deserves a loving pet."
                </p>
                <Link to="/adoption/offer">
                    <Button size="lg" className="rounded-2xl px-8 py-4 md:px-12 md:py-6 text-base md:text-lg font-black shadow-xl shadow-primary/20 hover:scale-105 transition-transform">
                        List Your Pet for Adoption <ArrowRight size={20} className="ml-2 md:w-[22px] md:h-[22px]" />
                    </Button>
                </Link>
            </header>

            {/* Filters */}
            <div className="mb-12 flex flex-col md:flex-row gap-6 items-center justify-between">
                <div className="grid grid-cols-2 sm:flex bg-gray-100 p-1.5 rounded-2xl w-full md:w-auto gap-2 sm:gap-0">
                    {['All', 'Dog', 'Cat', 'Other'].map((species) => (
                        <button
                            key={species}
                            onClick={() => setSelectedSpecies(species)}
                            className={`px-4 py-3 sm:px-8 rounded-xl font-black transition-all text-sm sm:text-base ${selectedSpecies === species
                                ? 'bg-white text-gray-900 shadow-lg'
                                : 'text-gray-500 hover:text-gray-700'
                                }`}
                        >
                            <span className="flex items-center justify-center gap-2">
                                {species === 'All' && 'All Pets'}
                                {species === 'Dog' && <><Dog size={16} className="sm:w-[18px] sm:h-[18px]" /> Dogs</>}
                                {species === 'Cat' && <><Cat size={16} className="sm:w-[18px] sm:h-[18px]" /> Cats</>}
                                {species === 'Other' && <><Filter size={16} className="sm:w-[18px] sm:h-[18px]" /> Other</>}
                            </span>
                        </button>
                    ))}
                </div>

                <div className="relative w-full md:w-96">
                    <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" size={20} />
                    <input
                        type="text"
                        placeholder="Search by name or breed..."
                        className="w-full pl-12 pr-4 py-3 md:py-4 rounded-2xl border-gray-100 bg-gray-50 focus:bg-white focus:ring-2 focus:ring-primary/20 transition-all outline-none font-bold"
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                    />
                </div>
            </div>

            {/* Grid */}
            {loading ? (
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-10">
                    {[...Array(6)].map((_, i) => (
                        <div key={i} className="h-[500px] bg-gray-100 rounded-[3rem] animate-pulse"></div>
                    ))}
                </div>
            ) : filteredPets.length > 0 ? (
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-10">
                    {filteredPets.map((pet) => (
                        <Link to={`/pets/${pet.id}`} key={pet.id} className="group">
                            <Card className="rounded-[3rem] border-gray-100 overflow-hidden h-full flex flex-col hover:shadow-2xl transition-all duration-700 relative">
                                <div className="aspect-[4/5] relative overflow-hidden bg-gray-100 flex items-center justify-center">
                                    {pet.image ? (
                                        <img
                                            src={pet.image}
                                            alt={pet.name}
                                            className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-1000"
                                        />
                                    ) : (
                                        <PawPrint size={64} className="text-gray-300" />
                                    )}
                                    <div className="absolute top-6 left-6">
                                        <Badge variant="playful" className="bg-white/90 backdrop-blur-sm border-none shadow-sm text-gray-900">{pet.gender || 'Unknown'}</Badge>
                                    </div>
                                    <div className="absolute top-6 right-6">
                                        <button className="h-12 w-12 bg-white/20 backdrop-blur-md rounded-2xl flex items-center justify-center text-white hover:bg-white hover:text-red-500 transition-all">
                                            <Heart size={24} />
                                        </button>
                                    </div>

                                    {/* Overlay Info */}
                                    <div className="absolute inset-x-0 bottom-0 p-8 bg-gradient-to-t from-black/80 via-black/20 to-transparent text-white translate-y-4 group-hover:translate-y-0 transition-transform">
                                        <h3 className="text-3xl font-black mb-1">{pet.name}</h3>
                                        <p className="font-bold text-gray-300 italic">{pet.breed} • {pet.age} Years</p>
                                    </div>
                                </div>
                                <div className="p-8 bg-white flex-grow flex flex-col justify-between">
                                    <div className="flex gap-2 mb-6 flex-wrap">
                                        {getTraits(pet.traits).slice(0, 2).map(trait => (
                                            <span key={trait} className="px-3 py-1 bg-gray-100 rounded-lg text-[10px] font-black uppercase tracking-wider text-gray-500">{trait}</span>
                                        ))}
                                    </div>
                                    <Button className="w-full rounded-full bg-gray-50 text-gray-900 hover:bg-primary hover:text-white transition-all font-black py-3 shadow-sm hover:shadow-xl hover:-translate-y-1">
                                        View Story <ArrowRight size={18} className="ml-2" />
                                    </Button>
                                </div>
                            </Card>
                        </Link>
                    ))}
                </div>
            ) : (
                <div className="py-20 text-center">
                    <div className="h-20 w-20 bg-gray-50 text-gray-200 rounded-3xl flex items-center justify-center mb-6 mx-auto">
                        <Info size={40} />
                    </div>
                    <h3 className="text-2xl font-black text-gray-900 mb-2">No pets found</h3>
                    <p className="text-gray-500 font-medium">Try adjusting your filters or search terms.</p>
                </div>
            )}

            {/* Newsletter CTA */}
            <section className="mt-32 bg-gray-900 rounded-[2.5rem] md:rounded-[4rem] p-8 md:p-24 text-white relative overflow-hidden">
                <div className="absolute top-0 right-0 w-full md:w-1/2 h-full opacity-20 md:opacity-10 pointer-events-none grayscale">
                    <img src="https://images.unsplash.com/photo-1548199973-03cce0bbc87b?auto=format&fit=crop&q=80&w=800" className="w-full h-full object-cover" />
                </div>
                <div className="relative z-10 grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
                    <div className="flex flex-col items-center md:items-start text-center md:text-left mx-auto md:mx-0">
                        <h2 className="text-3xl md:text-5xl font-black mb-6 tracking-tight leading-tight md:max-w-xl">
                            Can't adopt right now? <br /> You can still help.
                        </h2>
                        <p className="text-lg md:text-xl text-gray-400 font-medium leading-relaxed mb-10 md:max-w-md">
                            Join our volunteer network or donate to help provide food and medical care for our rescue pets.
                        </p>
                        <div className="flex flex-col sm:flex-row gap-4 w-full sm:w-auto">
                            <Link to="/adoption/volunteer" className="w-full sm:w-auto">
                                <Button size="lg" className="rounded-2xl px-10 font-black w-full">Become Volunteer</Button>
                            </Link>
                            <Button variant="outline" size="lg" className="rounded-2xl px-10 border-white/10 text-white hover:bg-white/10 w-full sm:w-auto">Make a Donation</Button>
                        </div>
                    </div>
                    <div className="hidden lg:flex items-center justify-center">
                        <div className="h-32 w-32 border-8 border-primary/20 rounded-full flex items-center justify-center animate-spin-slow">
                            <Heart size={48} className="text-primary" fill="currentColor" />
                        </div>
                    </div>
                </div>
            </section>
        </div>
    );
};

export default Adoption;

"use client";

import { useState } from 'react';
import { Filter, Grid, List as ListIcon, ChevronDown, Search } from 'lucide-react';
import Link from 'next/link';
import { HORSES } from '@/mock/mockHorses';

const FILTERS = [
    { title: "Razas", items: ["Pura Sangre", "Cuarto de Milla", "Árabe", "Criollo", "Frisón"] },
    { title: "Disciplinas", items: ["Salto", "Doma", "Polo", "Endurance", "Carreras"] },
    { title: "Ubicación", items: ["Buenos Aires", "Córdoba", "Santa Fe", "Mendoza", "Salta"] },
];

export default function Catalogo() {
    const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');

    const [dateLabel, setDateLabel] = useState("Fecha de publicación");
    const [priceLabel, setPriceLabel] = useState("Precio");

    const [expandedFilters, setExpandedFilters] = useState<string[]>(FILTERS.map(f => f.title));
    const [selectedFilters, setSelectedFilters] = useState<string[]>([]);

    const toggleFilter = (title: string) => {
        setExpandedFilters(prev =>
            prev.includes(title)
                ? prev.filter(t => t !== title)
                : [...prev, title]
        );
    };

    const handleFilterChange = (item: string) => {
        setSelectedFilters(prev =>
            prev.includes(item)
                ? prev.filter(i => i !== item)
                : [...prev, item]
        );
    };

    const clearFilters = () => {
        setSelectedFilters([]);
        // Optional: Also clear the top selects if desired:
        // setDateLabel("Fecha de publicación");
        // setPriceLabel("Precio");
    };

    return (
        <div className="bg-gray-50 min-h-screen pt-2 pb-8">
            <div className="container mx-auto px-4">
                {/* Header Section */}
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-6">
                    <div>
                        <h1 className="text-3xl font-bold text-[#1F140D]">Catálogo de Equinos</h1>
                        <p className="text-gray-600">Explora los mejores ejemplares disponibles.</p>
                    </div>
                    <div className="hidden md:flex flex-1 max-w-2xl mx-6">
                        <div className="relative w-full">
                            <input
                                type="text"
                                placeholder="Buscar caballos, razas y más..."
                                className="w-full h-10 px-4 pr-10 rounded-lg border border-gray-600 focus:outline-none focus:ring-2 focus:ring-[#C9A24D]/50 focus:border-[#C9A24D] text-gray-700 placeholder-gray-400 bg-white transition-all duration-300"
                            />
                            <button className="absolute right-0 top-0 h-10 w-10 flex items-center justify-center text-gray-500 hover:text-[#C9A24D] transition-colors">
                                <Search size={20} />
                            </button>
                        </div>
                    </div>
                    <div className="flex items-center gap-3">




                        <select
                            value=""
                            onChange={(e) => setDateLabel(`Fecha de publicación: ${e.target.value}`)}
                            className="bg-white border border-gray-200 rounded-lg px-4 py-2 text-sm text-gray-700 focus:outline-none focus:ring-2 focus:ring-[#C9A24D] shadow-sm cursor-pointer"
                        >
                            <option value="" disabled hidden>{dateLabel}</option>
                            <option value="Nuevo">Nuevo</option>
                            <option value="Antiguo">Antiguo</option>
                        </select>

                        <select
                            value=""
                            onChange={(e) => setPriceLabel(`Precio: ${e.target.value}`)}
                            className="bg-white border border-gray-200 rounded-lg px-4 py-2 text-sm text-gray-700 focus:outline-none focus:ring-2 focus:ring-[#C9A24D] shadow-sm cursor-pointer"
                        >
                            <option value="" disabled hidden>{priceLabel}</option>
                            <option value="Menor precio">Menor precio</option>
                            <option value="Mayor precio">Mayor precio</option>
                        </select>

                        <div className="flex bg-white rounded-lg shadow-sm border border-gray-200 p-1">
                            <button
                                onClick={() => setViewMode('grid')}
                                className={`p-2 rounded-md transition-colors ${viewMode === 'grid' ? 'bg-[#C9A24D] text-white' : 'text-gray-500 hover:bg-gray-100'}`}
                            >
                                <Grid size={20} />
                            </button>
                            <button
                                onClick={() => setViewMode('list')}
                                className={`p-2 rounded-md transition-colors ${viewMode === 'list' ? 'bg-[#C9A24D] text-white' : 'text-gray-500 hover:bg-gray-100'}`}
                            >
                                <ListIcon size={20} />
                            </button>
                        </div>



                    </div>
                </div>

                <div className="flex flex-col lg:flex-row gap-6">
                    {/* Sidebar Filters */}
                    <aside className="lg:w-1/4 space-y-6">
                        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
                            <div className="flex items-center gap-2 mb-6 border-b border-gray-100 pb-4 text-[#1F140D] font-bold">
                                <Filter size={20} />
                                <h2>Filtros</h2>
                            </div>

                            {FILTERS.map((filter) => {
                                const isExpanded = expandedFilters.includes(filter.title);
                                return (
                                    <div key={filter.title} className="mb-6 last:mb-0">
                                        <button
                                            onClick={() => toggleFilter(filter.title)}
                                            className="flex items-center justify-between w-full text-left group mb-3"
                                        >
                                            <span className="font-semibold text-gray-800 group-hover:text-[#C9A24D] transition-colors">
                                                {filter.title}
                                            </span>
                                            <ChevronDown
                                                size={16}
                                                className={`text-gray-400 group-hover:text-[#C9A24D] transition-transform duration-200 ${isExpanded ? '' : '-rotate-90'}`}
                                            />
                                        </button>
                                        <div className={`overflow-hidden transition-all duration-300 ${isExpanded ? 'max-h-64 opacity-100' : 'max-h-0 opacity-0'}`}>
                                            <ul className="space-y-2 pl-1 pb-1">
                                                {filter.items.map((item) => (
                                                    <li key={item} className="flex items-center gap-2">
                                                        <input
                                                            type="checkbox"
                                                            id={item}
                                                            checked={selectedFilters.includes(item)}
                                                            onChange={() => handleFilterChange(item)}
                                                            className="w-4 h-4 rounded border-gray-300 text-[#C9A24D] focus:ring-[#C9A24D]"
                                                        />
                                                        <label htmlFor={item} className="text-sm text-gray-600 cursor-pointer hover:text-[#C9A24D] transition-colors">
                                                            {item}
                                                        </label>
                                                    </li>
                                                ))}
                                            </ul>
                                        </div>
                                    </div>
                                );
                            })}

                            <button
                                onClick={clearFilters}
                                className="w-full mt-6 py-2 px-4 bg-[#1F140D] text-white rounded-lg text-sm font-semibold hover:bg-black transition-colors"
                            >
                                Limpiar filtros
                            </button>
                        </div>
                    </aside>

                    {/* Main Content (Grid/List) */}
                    <main className="lg:w-3/4">
                        <div className={`grid gap-6 ${viewMode === 'grid' ? 'grid-cols-1 sm:grid-cols-2 xl:grid-cols-3' : 'grid-cols-1'}`}>
                            {HORSES.map((horse) => (
                                <Link href={`/equino/catalogo/${horse.id}`} key={horse.id} className="block">
                                    <div className={`bg-white rounded-xl shadow-sm hover:shadow-md transition-all duration-300 border border-gray-100 overflow-hidden group cursor-pointer ${viewMode === 'list' ? 'flex' : 'h-full flex flex-col'}`}>
                                        <div className={`${viewMode === 'list' ? 'w-1/3' : 'h-64'} relative border-b border-gray-100`}>
                                            <img
                                                src={horse.images[0]}
                                                alt={horse.name}
                                                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                                            />
                                            <div className="absolute top-3 left-3 flex gap-2">
                                                <span className="bg-white/90 backdrop-blur-sm text-[#1F140D] text-[10px] font-bold px-2 py-1 rounded-md shadow-sm uppercase tracking-wider">
                                                    {horse.category}
                                                </span>
                                            </div>
                                        </div>

                                        <div className="p-5 flex flex-col flex-1">
                                            <div className="mb-2">
                                                <span className="text-2xl font-bold text-[#1F140D]">{horse.price}</span>
                                            </div>
                                            <h3 className="text-gray-800 font-medium line-clamp-2 mb-3 leading-snug group-hover:text-[#C9A24D] transition-colors">
                                                {horse.name}
                                            </h3>

                                            <div className="mt-auto pt-4 border-t border-gray-50 flex items-center justify-between text-xs text-gray-500">
                                                <span>{horse.breed}</span>
                                                <span>{horse.location}</span>
                                            </div>
                                        </div>
                                    </div>
                                </Link>
                            ))}
                        </div>
                    </main>
                </div>
            </div>
        </div>
    );
}

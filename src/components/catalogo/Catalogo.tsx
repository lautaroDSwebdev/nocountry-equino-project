"use client";

import { useState, useEffect } from 'react';
import { Filter, Grid, List as ListIcon, ChevronDown, Search } from 'lucide-react';
import Link from 'next/link';
import Pagination from '@/components/ui/Pagination';
import CustomSelect from '@/components/ui/CustomSelect';
import HorseCard from '@/components/ui/HorseCard';

import { useFavoritesStore } from '@/store/useFavoritesStore';
import { useCatalogStore } from '@/store/useCatalogStore';
import { Heart, Loader2 } from 'lucide-react';

import { horseService } from '@/services/horseService';
import { Horse } from '@/types/horse';

import { DISCIPLINE_TRANSLATIONS } from '@/utils/translations';
import { CATALOG_FILTERS } from '@/constants/catalogFilters';

interface CatalogoProps {
    showFavoritesOnly?: boolean;
}

export default function Catalogo({ showFavoritesOnly = false }: CatalogoProps) {
    const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
    const [dateSort, setDateSort] = useState("");
    const [priceSort, setPriceSort] = useState("");
    const [expandedFilters, setExpandedFilters] = useState<string[]>(CATALOG_FILTERS.map(f => f.title));
    const [horses, setHorses] = useState<Horse[]>([]);
    const [isLoading, setIsLoading] = useState(true);

    // Global state Zustand
    const {
        currentPage,
        pageSize,
        totalPages,
        totalElements,
        filters,
        setPage,
        setFilters,
        resetFilters,
        setTotalPages,
        setTotalElements
    } = useCatalogStore();

    const savedHorses = useFavoritesStore((state) => state.savedHorses);


    useEffect(() => {
        const fetchHorses = async () => {
            setIsLoading(true);
            try {
                const apiFilters: Record<string, any> = {};

                if (filters.breeds && filters.breeds.length > 0) {
                    apiFilters.breed = filters.breeds[0];
                }
                if (filters.disciplines && filters.disciplines.length > 0) {
                    const selectedTranslation = filters.disciplines[0];
                    const enumKey = Object.keys(DISCIPLINE_TRANSLATIONS).find(k => DISCIPLINE_TRANSLATIONS[k] === selectedTranslation);
                    apiFilters.discipline = enumKey || selectedTranslation;
                }
                if (filters.locations && filters.locations.length > 0) {
                    apiFilters.location = filters.locations[0];
                }
                if (filters.verification && filters.verification.length > 0) {
                    apiFilters.isVerified = filters.verification[0] === 'Verificado';
                }

                const data = await horseService.getHorses(currentPage, pageSize, apiFilters);
                setHorses(data.content);
                setTotalElements(data.totalElements);
                setTotalPages(data.totalPages);
            } catch (error) {
                console.error("Error fetching horses", error);
                setHorses([]);
            } finally {
                setIsLoading(false);
            }
        };

        // Debounce or just call it directly since React handles state batches
        fetchHorses();
    }, [currentPage, pageSize, filters, setTotalElements, setTotalPages]);

    const filteredHorses = showFavoritesOnly ? horses.filter(h => savedHorses.includes(h.id)) : horses;

    const toggleFilterSection = (title: string) => {
        setExpandedFilters(prev =>
            prev.includes(title)
                ? prev.filter(t => t !== title)
                : [...prev, title]
        );
    };

    const handleFilterChange = (key: string, item: string) => {
        const currentItems = (filters as any)[key] as string[];
        const newItems = currentItems.includes(item)
            ? []
            : [item];

        setFilters({ [key]: newItems });
    };

    const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setFilters({ searchQuery: e.target.value });
    };

    return (
        <div className="bg-gray-50 min-h-screen pt-2 pb-8">
            <div className="container mx-auto px-4">
                {/* Header Section */}
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-6">
                    <div>
                        <h1 className="text-3xl font-bold text-[#1F140D]">
                            {showFavoritesOnly ? 'Mis Caballos Guardados' : 'Catálogo de Equinos'}
                        </h1>
                        <p className="text-gray-600">
                            {showFavoritesOnly
                                ? 'Tus ejemplares favoritos guardados para ver más tarde.'
                                : 'Explora los mejores ejemplares disponibles.'}
                        </p>
                    </div>
                    <div className="hidden md:flex flex-1 max-w-2xl mx-6">
                        <div className="relative w-full">
                            <input
                                type="text"
                                value={filters.searchQuery}
                                onChange={handleSearchChange}
                                placeholder="Buscar caballos, razas y más..."
                                className="w-full h-10 px-4 pr-10 rounded-lg border border-gray-600 focus:outline-none focus:ring-2 focus:ring-[#C9A24D]/50 focus:border-[#C9A24D] text-gray-700 placeholder-gray-400 bg-white transition-all duration-300"
                            />
                            <button className="absolute right-0 top-0 h-10 w-10 flex items-center justify-center text-gray-500 hover:text-[#C9A24D] transition-colors">
                                <Search size={20} />
                            </button>
                        </div>
                    </div>
                    <div className="flex items-center gap-3">
                        <CustomSelect
                            label="Fecha"
                            value={dateSort}
                            options={[
                                { value: 'Nuevo', label: 'Nuevo' },
                                { value: 'Antiguo', label: 'Antiguo' }
                            ]}
                            onChange={(val) => setDateSort(val)}
                            className="w-48"
                        />

                        <CustomSelect
                            label="Precio"
                            value={priceSort}
                            options={[
                                { value: 'Menor precio', label: 'Menor precio' },
                                { value: 'Mayor precio', label: 'Mayor precio' }
                            ]}
                            onChange={(val) => setPriceSort(val)}
                            className="w-48"
                        />

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

                            {CATALOG_FILTERS.map((section) => {
                                const isExpanded = expandedFilters.includes(section.title);
                                const selectedItems = (filters as any)[section.key] as string[];

                                return (
                                    <div key={section.title} className="mb-6 last:mb-0">
                                        <button
                                            onClick={() => toggleFilterSection(section.title)}
                                            className="flex items-center justify-between w-full text-left group mb-3"
                                        >
                                            <span className="font-semibold text-gray-800 group-hover:text-[#C9A24D] transition-colors">
                                                {section.title}
                                            </span>
                                            <ChevronDown
                                                size={16}
                                                className={`text-gray-400 group-hover:text-[#C9A24D] transition-transform duration-200 ${isExpanded ? '' : '-rotate-90'}`}
                                            />
                                        </button>
                                        <div className={`overflow-hidden transition-all duration-300 ${isExpanded ? 'max-h-64 opacity-100' : 'max-h-0 opacity-0'}`}>
                                            <ul className="space-y-2 pl-1 pb-1">
                                                {section.items.map((item: string) => (
                                                    <li key={item} className="flex items-center gap-2">
                                                        <input
                                                            type="checkbox"
                                                            id={item}
                                                            checked={selectedItems.includes(item)}
                                                            onChange={() => handleFilterChange(section.key, item)}
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
                                onClick={resetFilters}
                                className="w-full mt-6 py-2 px-4 bg-[#1F140D] text-white rounded-lg text-sm font-semibold hover:bg-black transition-colors"
                            >
                                Limpiar filtros
                            </button>
                        </div>
                    </aside>

                    {/* Main Content (Grid/List) */}
                    <main className="lg:w-3/4">
                        {isLoading ? (
                            <div className="flex flex-col items-center justify-center p-12 bg-white rounded-xl shadow-sm border border-gray-100 h-full min-h-[400px]">
                                <Loader2 size={48} className="text-[#C9A24D] animate-spin mb-4" />
                                <h3 className="text-xl font-medium text-gray-700">Cargando catálogo...</h3>
                            </div>
                        ) : filteredHorses.length === 0 ? (
                            <div className="flex flex-col items-center justify-center p-12 bg-white rounded-xl shadow-sm border border-gray-100 h-full min-h-[400px]">
                                <div className="text-[#C9A24D] mb-4">
                                    <Heart size={64} className="opacity-50" />
                                </div>
                                <h3 className="text-2xl font-bold text-[#1F140D] mb-2">No se encontraron resultados</h3>
                                <p className="text-gray-500 text-center max-w-md mb-6">
                                    Intenta ajustar tus filtros o búsqueda para encontrar lo que estás buscando.
                                </p>
                                {showFavoritesOnly && (
                                    <Link
                                        href="/equino/catalogo"
                                        className="px-6 py-3 bg-[#1F140D] text-white rounded-lg font-semibold hover:bg-black transition-colors shadow-md"
                                    >
                                        Ir al Catálogo
                                    </Link>
                                )}
                            </div>
                        ) : (
                            <>
                                <div className={`grid gap-6 ${viewMode === 'grid' ? 'grid-cols-1 sm:grid-cols-2 xl:grid-cols-3' : 'grid-cols-1'}`}>
                                    {filteredHorses.map((horse) => (
                                        <HorseCard key={horse.id} horse={horse} viewMode={viewMode} />
                                    ))}
                                </div>
                                <Pagination
                                    totalPages={totalPages}
                                    currentPage={currentPage}
                                    onPageChange={setPage}
                                    totalElements={totalElements}
                                    pageSize={pageSize}
                                />
                            </>
                        )}
                    </main>
                </div>
            </div>
        </div>
    );
}

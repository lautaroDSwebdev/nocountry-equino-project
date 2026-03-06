"use client";

import { Heart } from 'lucide-react';
import { useFavoritesStore } from '@/store/useFavoritesStore';

interface FavoriteButtonProps {
    horseId: number;
    className?: string; 
}

export default function FavoriteButton({ horseId, className = '' }: FavoriteButtonProps) {
    const isFavorite = useFavoritesStore((state) => state.isFavorite(horseId));
    const toggleFavorite = useFavoritesStore((state) => state.toggleFavorite);

    const handleClick = (e: React.MouseEvent<HTMLButtonElement>) => {
        e.preventDefault();
        e.stopPropagation();
        toggleFavorite(horseId);
    };

    return (
        <button
            onClick={handleClick}
            className={`p-1.5 rounded-full backdrop-blur-sm bg-white/70 hover:bg-white transition-colors duration-200 shadow-sm ${className}`}
            aria-label={isFavorite ? "Quitar de favoritos" : "Añadir a favoritos"}
            title={isFavorite ? "Quitar de favoritos" : "Añadir a favoritos"}
        >
            <Heart
                size={18}
                className={`transition-colors duration-200 ${isFavorite ? 'fill-[#C9A24D] text-[#C9A24D]' : 'text-gray-600 hover:text-[#C9A24D]'
                    }`}
            />
        </button>
    );
}

import React from 'react';
import Link from 'next/link';
import { translateDiscipline } from '@/utils/translations';
import { CheckCircle } from 'lucide-react';
import FavoriteButton from './FavoriteButton';
import { Horse } from '@/types/horse';

interface HorseCardProps {
    horse: Horse;
    viewMode?: 'grid' | 'list';
}

const formatPrice = (price: number) => {
    return new Intl.NumberFormat('en-US', {
        style: 'currency',
        currency: 'USD',
        minimumFractionDigits: 0,
        maximumFractionDigits: 0
    }).format(price);
};

export default function HorseCard({ horse, viewMode = 'grid' }: HorseCardProps) {
    const isVerified = horse.status === 'VERIFIED';

    return (
        <Link href={`/equino/catalogo/${horse.id}`} className="block h-full">
            <div className={`bg-white rounded-xl shadow-sm hover:shadow-md transition-all duration-300 border border-gray-100 overflow-hidden group cursor-pointer ${viewMode === 'list' ? 'flex' : 'h-full flex flex-col'}`}>
                <div className={`${viewMode === 'list' ? 'w-1/3 min-w-[200px]' : 'h-64'} relative border-b border-gray-100 bg-gray-100 flex-shrink-0`}>
                    {/* Assuming Cloudinary or simple img for now. If using a specific Cloudinary comp, update here. */
                        horse.imageIds && horse.imageIds.length > 0 ? (
                            <img
                                src={horse.imageIds[0]}
                                alt={`${horse.breed} - ${horse.id}`}
                                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                                onError={(e) => { e.currentTarget.src = 'https://via.placeholder.com/400x300?text=Horse+Image' }}
                            />
                        ) : (
                            <div className="w-full h-full flex items-center justify-center text-gray-400">
                                Sin Imagen
                            </div>
                        )}

                    <div className="absolute top-3 left-3 flex gap-2 flex-col items-start">
                        <span className="bg-white/90 backdrop-blur-sm text-[#1F140D] text-[10px] font-bold px-2 py-1 rounded-md shadow-sm uppercase tracking-wider">
                            {translateDiscipline(horse.discipline)}
                        </span>
                    </div>
                    <div className="absolute top-2 right-2 z-10 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                        <FavoriteButton horseId={horse.id} />
                    </div>
                </div>

                <div className="p-5 flex flex-col flex-1">
                    <h3 className="text-gray-800 font-medium line-clamp-2 mb-3 leading-snug group-hover:text-[#C9A24D] transition-colors">
                        {horse.description ? horse.description : `${horse.breed} de ${horse.age} años`}
                    </h3>

                    <div className="mt-auto pt-4 border-t border-gray-50 flex items-center justify-between text-xs text-gray-500">
                        <div className="flex items-center gap-1.5">
                            <span>{horse.breed}</span>
                            {isVerified && (
                                <div className="group/verified relative flex items-center">
                                    <CheckCircle size={14} className="text-green-500 fill-green-50/50" />
                                    <span className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 px-2 py-1 bg-gray-900 text-white text-[10px] rounded opacity-0 group-hover/verified:opacity-100 transition-opacity whitespace-nowrap pointer-events-none z-20 shadow-lg">
                                        Verificado
                                    </span>
                                </div>
                            )}
                        </div>
                        <span>{horse.location}</span>
                    </div>
                </div>
            </div>
        </Link>
    );
}

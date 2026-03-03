import Link from 'next/link';
import FavoriteButton from '@/components/ui/FavoriteButton';
import { CheckCircle } from 'lucide-react';
import { horseService } from '@/services/horseService';
import { translateDiscipline } from '@/utils/translations';
import { Horse } from '@/types/horse';

export default async function HorseGrid({ title }: { title: string }) {
    let horses: Horse[] = [];
    try {
        const response = await horseService.getHorses(0, 5);
        horses = response.content;
    } catch (error) {
        console.error("Error fetching horses for HorseGrid:", error);
    }

    const formatPrice = (price: number) => {
        return new Intl.NumberFormat('en-US', {
            style: 'currency',
            currency: 'USD',
            minimumFractionDigits: 0,
            maximumFractionDigits: 0
        }).format(price);
    };

    return (
        <section className="bg-gray-100 py-8">
            <div className="container mx-auto px-4">
                <div className="flex items-center gap-4 mb-6">
                    <h2 className="text-2xl md:text-3xl text-[#1F140D] font-bold tracking-tight">
                        {title}
                    </h2>
                </div>

                {horses.length === 0 ? (
                    <div className="text-center py-10 text-gray-500">
                        No hay caballos disponibles en este momento.
                    </div>
                ) : (
                    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
                        {horses.map((horse) => {
                            const isVerified = horse.status === 'VERIFIED';
                            const titleDisplay = horse.description ? horse.description : `${horse.breed} de ${horse.age} años`;

                            return (
                                <Link href={`/equino/catalogo/${horse.id}`} key={horse.id} className="block">
                                    <div className="bg-white rounded-xl shadow-sm hover:shadow-md transition-all duration-300 border border-gray-100 overflow-hidden group cursor-pointer h-full flex flex-col">
                                        <div className="h-56 relative border-b border-gray-100 bg-gray-100 flex-shrink-0">
                                            {horse.imageIds && horse.imageIds.length > 0 ? (
                                                <img
                                                    src={horse.imageIds[0]}
                                                    alt={horse.breed}
                                                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                                                />
                                            ) : (
                                                <div className="w-full h-full flex items-center justify-center text-gray-400">
                                                    Sin Imagen
                                                </div>
                                            )}
                                            <div className="absolute top-3 left-3 flex gap-2">
                                                <span className="bg-white/90 backdrop-blur-sm text-[#1F140D] text-[10px] font-bold px-2 py-1 rounded-md shadow-sm uppercase tracking-wider">
                                                    {translateDiscipline(horse.discipline)}
                                                </span>
                                            </div>
                                            <div className="absolute top-2 right-2 z-10 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                                                <FavoriteButton horseId={horse.id} />
                                            </div>
                                        </div>

                                        <div className="p-4 flex flex-col flex-1">
                                            <div className="mb-2">
                                                <span className="text-xl md:text-2xl font-bold text-[#1F140D]">
                                                    {formatPrice(horse.price)}
                                                </span>
                                            </div>
                                            <h3 className="text-sm text-gray-800 font-medium line-clamp-2 mb-3 leading-snug group-hover:text-[#C9A24D] transition-colors">
                                                {titleDisplay}
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
                        })}
                    </div>
                )}
            </div>
        </section>
    );
}

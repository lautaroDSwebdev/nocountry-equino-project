import Link from 'next/link';
import { HORSES } from '@/data/mockHorses';

export default function HorseGrid({ title }: { title: string }) {
    // Tomamos los primeros 5 caballos para la grilla del home
    const horses = HORSES.slice(0, 5);

    return (
        <section className="bg-gray-100 py-8">
            <div className="container mx-auto px-4">
                <div className="flex items-center gap-4 mb-6">
                    <h2 className="text-2xl md:text-3xl text-[#1F140D] font-bold tracking-tight">
                        {title}
                    </h2>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
                    {horses.map((horse) => (
                        <Link href={`/catalogo/${horse.id}`} key={horse.id} className="block">
                            <div className="bg-white rounded-xl shadow-sm hover:shadow-md transition-all duration-300 border border-gray-100 overflow-hidden group cursor-pointer h-full flex flex-col">
                                <div className="h-56 relative border-b border-gray-100">
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

                                <div className="p-4 flex flex-col flex-1">
                                    <div className="mb-2">
                                        <span className="text-xl md:text-2xl font-bold text-[#1F140D]">{horse.price}</span>
                                    </div>
                                    <h3 className="text-sm text-gray-800 font-medium line-clamp-2 mb-3 leading-snug group-hover:text-[#C9A24D] transition-colors">
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
            </div>
        </section>
    );
}

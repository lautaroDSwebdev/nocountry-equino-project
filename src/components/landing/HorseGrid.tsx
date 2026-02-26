"use client"
import { horses } from '@/mock/mock';
// import { DataComponentFilter } from '../filters/nav-filter';
// import { HorsesEntity } from '@/types/types';

export default function HorseGrid() {
    // Placeholder data
   
//  const horsesFilter: HorsesEntity[] = DataComponentFilter().filterHorse(horses)
//  console.log(horsesFilter);
 
    return (
        <section className="bg-gray-100 py-8">
            <div className="container mx-auto px-4">
                <div className="flex items-center gap-4 mb-6">

                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
                    {horses.map((horse) => (
                        <div key={horse.id} className="bg-white rounded-md shadow-sm hover:shadow-[0_4px_15px_rgba(201,162,77,0.5)] transition-shadow duration-300 border border-gray-100 cursor-pointer overflow-hidden flex flex-col">
                            <div className="relative h-56 w-full border-b border-gray-100">
                                <img
                                    src={horse.image}
                                    alt={horse.name}
                                    className="w-full h-full object-cover"
                                />
                            </div>
                            <div className="p-4 flex flex-col gap-1 flex-1">
                                <div className="mb-1">
                                    <span className="text-xl md:text-2xl text-gray-800 font-normal">{horse.price}</span>
                                </div>
                                {horse.installments && (
                                    <span className="text-xs md:text-sm text-[#1F140D] font-medium">{horse.installments}</span>
                                )}
                                {horse.shipping && (
                                    <span className="text-xs text-[#1F140D] font-bold mt-1 bg-green-50 w-fit px-1 rounded">{horse.shipping}</span>
                                )}
                                <h3 className="text-sm text-gray-600 font-light mt-2 line-clamp-2 leading-snug group-hover:text-gray-800">
                                    {horse.name}
                                </h3>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}

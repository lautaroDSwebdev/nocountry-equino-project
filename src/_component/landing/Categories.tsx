import { Trophy, Activity, Award, Heart, Star, ShieldCheck } from 'lucide-react';

export default function Categories() {
    const categories = [
        { name: 'Salto', icon: Trophy },
        { name: 'Polo', icon: Activity },
        { name: 'Carrera', icon: Award }, // Using Award as a proxy for racing/speed
        { name: 'Paseo', icon: Heart },   // Heart implies gentle/hobby
        { name: 'Yeguas Madre', icon: Star },
        { name: 'Potrillos', icon: ShieldCheck },
    ];

    return (
        <div className="bg-gray-100 pb-8">
            <div className="container mx-auto px-4">
                <div className="flex flex-wrap justify-between md:justify-center gap-6 md:gap-12 py-6">
                    {categories.map((cat, idx) => (
                        <div key={idx} className="flex flex-col items-center gap-3 group cursor-pointer">
                            <div className="w-16 h-16 bg-white rounded-full shadow-sm flex items-center justify-center text-[#5A2E14] group-hover:bg-[#5A2E14] group-hover:text-white transition-all duration-300 border border-gray-200">
                                <cat.icon size={28} strokeWidth={1.5} />
                            </div>
                            <span className="text-xs md:text-sm text-gray-500 group-hover:text-[#5A2E14] transition-colors font-light">{cat.name}</span>
                        </div>
                    ))}
                </div>
            </div>
        </div >
    );
}

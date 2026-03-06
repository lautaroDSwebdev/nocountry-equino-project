import HorseGrid from "@/components/landing/HorseGrid";
import { equino_path } from "@/constants/equino.path";
import { ArrowRight } from "lucide-react";
import Link from "next/link";

export default function Novedades() {
    return (
        <div className="min-h-screen bg-[#F4F1EC] font-sans">
            {/* Banner Section */}
            <div className="relative bg-[#1F140D] text-white py-24 px-6 overflow-hidden">
                <div className="absolute inset-0 opacity-20">
                    <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(201,162,77,0.15),transparent_50%)]" />
                </div>

                <div className="max-w-7xl mx-auto relative z-10 flex flex-col items-center text-center">

                    <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight mb-6">
                        Novedades <span className="text-[#C9A24D] font-light italic">HorseTrust</span>
                    </h1>

                    <p className="max-w-2xl text-lg md:text-xl text-gray-300 font-light mb-8">
                        Descubrí los últimos ingresos y las noticias más recientes sobre el mundo equino en nuestra plataforma.
                        Los mejores caballos, ahora al alcance de tu mano.
                    </p>

                    <div className="flex gap-4">
                        <a
                            href="#ultimos-ingresos"
                            className="bg-[#C9A24D] hover:bg-[#b08d42] text-white px-8 py-3 rounded-lg font-medium transition-colors flex items-center gap-2 cursor-pointer"
                        >
                            Ver Últimos Ingresos
                            <ArrowRight size={18} />
                        </a>
                    </div>
                </div>
            </div>

            {/* Main Content Grid */}
            <div id="ultimos-ingresos" className="pt-8 pb-16 space-y-12 scroll-mt-20">
                <HorseGrid title="Últimos Caballos Agregados" />

                <div className="container mx-auto px-4 mt-12 mb-4">
                    <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-8 md:p-12 flex flex-col md:flex-row items-center justify-between gap-8">
                        <div className="max-w-xl">
                            <h2 className="text-3xl font-bold text-[#1F140D] mb-4">¿Querés publicar tu caballo?</h2>
                            <p className="text-gray-600 mb-6">
                                Sumate a la comunidad HorseTrust y publicá tus caballos de manera fácil, rápida y segura.
                                Llegá a miles de compradores interesados todos los días.
                            </p>
                            <Link
                                href={`${equino_path}/vender`}
                                className="inline-flex items-center gap-2 text-[#C9A24D] font-semibold hover:text-[#1F140D] transition-colors"
                            >
                                Empezar ahora
                                <ArrowRight size={18} />
                            </Link>
                        </div>
                        <div className="w-full md:w-1/3 aspect-[4/3] bg-[#F4F1EC] rounded-xl flex items-center justify-center border border-gray-200 overflow-hidden relative">
                            {/* Optional: un placeholder de imagen si es necesario, pero un fondo limpio está bien */}
                            <div className="absolute inset-0 bg-[#1F140D]/5"></div>
                            <span className="text-[#1F140D]/30 font-bold text-lg rotate-[-15deg] uppercase tracking-widest">
                                HorseTrust
                            </span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

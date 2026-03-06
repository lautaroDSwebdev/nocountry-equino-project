"use client";

import Image from 'next/image';
import { ChevronDown } from 'lucide-react';

const HeroAbout = () => {
    return (
        <section className="relative h-[75vh] w-full bg-gray-900 overflow-hidden">
            {/* Background Image */}
            <div className="absolute inset-0">
                <Image
                    src="/images/about/photo3.jpg"
                    alt="Caballos galopando en libertad"
                    fill
                    className="object-cover scale-105"
                    priority
                />
                {/* overlay con gradiente */}
                <div className="absolute inset-0 bg-gradient-to-b from-black/70 via-black/40 to-black/80" />
            </div>

            {/* container */}
            <div className="relative h-full flex flex-col items-center justify-center text-center px-4 md:px-8">
                {/* linea amarilla */}
                <div className="w-16 h-0.5 bg-[#C9A24D] mb-6" />

                <h1 className="text-4xl md:text-5xl lg:text-7xl font-bold text-white mb-6 drop-shadow-lg tracking-tight">
                    Nuestra Pasión por{" "}
                    <span className="text-[#C9A24D] italic">Lo Equino</span>
                </h1>

                <p className="text-lg md:text-xl text-gray-200 max-w-3xl leading-relaxed drop-shadow-sm">
                    En <span className="font-semibold text-white">HorseTrust</span>, somos el puente entre
                    quienes aman los caballos y quienes buscan su compañero ideal. Desde 2023, hemos construido
                    la plataforma más confiable del mercado equino, donde cada transacción está respaldada por
                    verificación veterinaria, documentación certificada y una comunidad que prioriza el bienestar animal.
                </p>

                {/* linea amarilla */}
                <div className="w-16 h-0.5 bg-[#C9A24D] mt-6" />
            </div>

            {/* flecha para scrollear */}
            <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 text-white/60">
                <span className="text-xs uppercase tracking-widest">Descubrí más</span>
                <ChevronDown size={24} className="animate-bounce-slow" />
            </div>
        </section>
    );
};

export default HeroAbout;
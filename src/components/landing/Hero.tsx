"use client";

import { useState, useEffect, useCallback } from 'react';
import { CldImage } from 'next-cloudinary';
import { ChevronLeft, ChevronRight } from 'lucide-react';

const SLIDES = [
    {
        id: 1,
        title: "Los Mejores Equinos",
        subtitle: "Encuentra la calidad, raza y linaje que buscas",
        highlight: "en un solo lugar",
        image: "photo-1547581849-38ba650ad0de_ng9oyi", //public ID de cloudinary
        alt: "Caballo de carrera compitiendo"
    },
    {
        id: 2,
        title: "Pasión por el Deporte",
        subtitle: "Ejemplares seleccionados para alta competencia",
        highlight: "y rendimiento",
        image: "cld-sample-4",
        alt: "Caballo saltando vallas"
    },
    {
        id: 3,
        title: "Crianza de Excelencia",
        subtitle: "Genética premium certificada por expertos",
        highlight: "internacionales",
        image: "cld-sample-3",
        alt: "Caballo en el campo"
    },
    {
        id: 4,
        title: "Crianza de Excelencia",
        subtitle: "Genética premium certificada por expertos",
        highlight: "internacionales",
        image: "cld-sample-3",
        alt: "Caballo en el campo"
    }



];

export default function Hero() {
    const [currentSlide, setCurrentSlide] = useState(0);

    const nextSlide = useCallback(() => {
        setCurrentSlide((prev) => (prev === SLIDES.length - 1 ? 0 : prev + 1));
    }, []);

    const prevSlide = useCallback(() => {
        setCurrentSlide((prev) => (prev === 0 ? SLIDES.length - 1 : prev - 1));
    }, []);

    // Function to handle manual navigation (resets the timer)
    const handleManualNavigation = (direction: 'next' | 'prev' | number) => {
        if (direction === 'next') nextSlide();
        else if (direction === 'prev') prevSlide();
        else setCurrentSlide(direction);
    };

    useEffect(() => {
        const interval = setInterval(() => {
            nextSlide();
        }, 5000); // Changed to 5 seconds

        return () => clearInterval(interval);
    }, [currentSlide, nextSlide]); // Dependency on currentSlide ensures timer resets on state change

    return (
        <div className="w-full bg-gray-100 py-4">
            <div className="container mx-auto px-4">
                <div className="relative w-full h-[320px] md:h-[400px] rounded-lg overflow-hidden shadow-lg bg-gray-900 group">

                    {/* Slides Container */}
                    <div className="relative w-full h-full">
                        {SLIDES.map((slide, index) => (
                            <div
                                key={slide.id}
                                className={`absolute inset-0 transition-opacity duration-1000 ease-in-out ${index === currentSlide ? 'opacity-100 z-10' : 'opacity-0 z-0'
                                    }`}
                            >
                                {/* Background Image */}
                                <div className="absolute inset-0">
                                    <CldImage
                                        src={slide.image}
                                        alt={slide.alt}
                                        fill
                                        className="object-cover opacity-60"
                                        priority={index === 0}
                                    />
                                </div>

                                {/* Content Overlay */}
                                <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-black/40 to-transparent z-20 flex flex-col justify-center px-8 md:px-16">
                                    <h2 className="text-white text-4xl md:text-5xl font-bold mb-4 drop-shadow-md animate-fade-in-up">
                                        {slide.title} <br />
                                        <span className="text-[#C9A24D]">{slide.highlight}</span>
                                    </h2>
                                    <p className="text-gray-200 text-lg mb-8 max-w-lg drop-shadow-sm animate-fade-in-up delay-100">
                                        {slide.subtitle}
                                    </p>
                                    <button className="bg-[#C9A24D] hover:bg-[#9E7C32] text-white font-semibold py-3 px-8 rounded-md w-fit transition-all shadow-md hover:shadow-xl hover:-translate-y-1 animate-fade-in-up delay-200">
                                        Ver ofertas
                                    </button>
                                </div>
                            </div>
                        ))}
                    </div>

                    {/* Navigation Arrows */}
                    <button
                        onClick={() => handleManualNavigation('prev')}
                        className="absolute left-2 top-1/2 -translate-y-1/2 z-30 p-2 text-white/70 hover:text-[#C9A24D] transition-all opacity-0 group-hover:opacity-100 focus:opacity-100"
                        aria-label="Anterior"
                    >
                        <ChevronLeft size={48} strokeWidth={1} />
                    </button>
                    <button
                        onClick={() => handleManualNavigation('next')}
                        className="absolute right-2 top-1/2 -translate-y-1/2 z-30 p-2 text-white/70 hover:text-[#C9A24D] transition-all opacity-0 group-hover:opacity-100 focus:opacity-100"
                        aria-label="Siguiente"
                    >
                        <ChevronRight size={48} strokeWidth={1} />
                    </button>

                    {/* Indicators */}
                    <div className="absolute bottom-6 left-1/2 -translate-x-1/2 z-30 flex gap-3">
                        {SLIDES.map((_, index) => (
                            <button
                                key={index}
                                onClick={() => handleManualNavigation(index)}
                                className={`w-3 h-3 rounded-full transition-all duration-300 border-2 border-white ${index === currentSlide
                                    ? 'bg-white scale-110'
                                    : 'bg-transparent hover:bg-white/50'
                                    }`}
                                aria-label={`Ir a diapositiva ${index + 1}`}
                            />
                        ))}
                    </div>

                </div>
            </div>
        </div>
    );
}

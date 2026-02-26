"use client";

import { useState } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';

interface HorseGalleryProps {
    images: string[];
    category: string;
}

export default function HorseGallery({ images, category }: HorseGalleryProps) {
    const [currentIndex, setCurrentIndex] = useState(0);

    const nextImage = () => {
        setCurrentIndex((prevIndex) => (prevIndex === images.length - 1 ? 0 : prevIndex + 1));
    };

    const prevImage = () => {
        setCurrentIndex((prevIndex) => (prevIndex === 0 ? images.length - 1 : prevIndex - 1));
    };

    return (
        <div className="bg-gray-100 relative min-h-[400px] h-full group overflow-hidden">
            {/* Images */}
            {images.map((image, index) => (
                <img
                    key={index}
                    src={image}
                    alt={`Imagen ${index + 1} de ${category}`}
                    className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-500 ease-in-out ${index === currentIndex ? 'opacity-100' : 'opacity-0'}`}
                />
            ))}

            {/* Category Badge */}
            <div className="absolute top-4 left-4 flex gap-2 z-10">
                <span className="bg-white/90 backdrop-blur-sm text-[#1F140D] text-xs font-bold px-3 py-1.5 rounded-md shadow-sm uppercase tracking-wider">
                    {category}
                </span>
            </div>

            {/* Arrows */}
            {images.length > 1 && (
                <>
                    <button
                        onClick={prevImage}
                        className="absolute left-2 top-1/2 -translate-y-1/2 z-30 p-2 text-white/70 hover:text-[#C9A24D] hover:scale-110 transition-all"
                        aria-label="Imagen anterior"
                    >
                        <ChevronLeft size={48} strokeWidth={1} />
                    </button>
                    <button
                        onClick={nextImage}
                        className="absolute right-2 top-1/2 -translate-y-1/2 z-30 p-2 text-white/70 hover:text-[#C9A24D] hover:scale-110 transition-all"
                        aria-label="Siguiente imagen"
                    >
                        <ChevronRight size={48} strokeWidth={1} />
                    </button>

                    {/* Dots / Indicators */}
                    <div className="absolute bottom-6 left-1/2 -translate-x-1/2 z-30 flex gap-3">
                        {images.map((_, index) => (
                            <button
                                key={index}
                                onClick={() => setCurrentIndex(index)}
                                className={`w-3 h-3 rounded-full transition-all duration-300 border-2 border-white ${index === currentIndex
                                    ? 'bg-white scale-110'
                                    : 'bg-transparent hover:bg-white/50'
                                    }`}
                                aria-label={`Ir a la imagen ${index + 1}`}
                            />
                        ))}
                    </div>
                </>
            )}
        </div>
    );
}

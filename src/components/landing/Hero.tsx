import Image from 'next/image';

export default function Hero() {
    return (
        <div className="w-full bg-gray-100 py-4">
            <div className="container mx-auto px-4">
                <div className="relative w-full h-[320px] md:h-[400px] rounded-lg overflow-hidden shadow-lg bg-gray-900">
                    {/* Gradient Overlay for text readability if we had a real image, acting as placeholder style */}
                    <div className="absolute inset-0 bg-gradient-to-r from-black/60 to-transparent z-10 flex flex-col justify-center px-12">
                        <h2 className="text-white text-4xl md:text-5xl font-bold mb-4 drop-shadow-md">
                            Los Mejores Equinos <br /> en un solo lugar
                        </h2>
                        <p className="text-gray-200 text-lg mb-6 max-w-lg">
                            Encuentra la calidad, raza y linaje que buscas con la seguridad de EQUI HORSE.
                        </p>
                        <button className="bg-[#C9A24D] hover:bg-[#9E7C32] text-white font-semibold py-3 px-8 rounded-md w-fit transition-colors shadow-md">
                            Ver ofertas
                        </button>
                    </div>

                    {/* Semantic Image Placeholder */}
                    <div className="absolute inset-0 bg-gray-800 flex items-center justify-center text-gray-600">
                        {/* In a real app, use next/image here */}
                        <span className="sr-only">Banner de caballos</span>
                        {/* Abstract pattern or placeholder */}
                        <div className="w-full h-full bg-[url('https://images.unsplash.com/photo-1553284965-83fd3e82fa5a?q=80&w=1471&auto=format&fit=crop')] bg-cover bg-center opacity-60"></div>
                    </div>
                </div>
            </div>
        </div>
    );
}

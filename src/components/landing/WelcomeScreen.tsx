"use client";

import Image from "next/image";

export default function WelcomeScreen() {
    return (
        <div className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-[#1F140D]">
            <div className="relative flex flex-col items-center animate-pulse">
                <div className="relative w-40 h-40 mb-6">
                    <img
                        src="/images/LOGO.png"
                        alt="EquiHorse Logo"
                        className="w-full h-full object-contain"
                    />
                </div>
                <h1 className="text-4xl md:text-6xl font-bold text-white tracking-widest mb-2">
                    EQUI<span className="font-light text-[#C9A24D]">HORSE</span>
                </h1>
                <p className="text-[#C9A24D] text-lg md:text-xl font-light tracking-wide uppercase mt-4 border-t border-[#C9A24D]/30 pt-4">
                    La excelencia en cada galope
                </p>
            </div>

            <div className="absolute bottom-10 flex flex-col items-center gap-2">
                <div className="w-16 h-1 bg-gray-800 rounded-full overflow-hidden">
                    <div className="h-full bg-[#C9A24D] animate-[loading_2s_ease-in-out_infinite]"></div>
                </div>
            </div>

            <style jsx>{`
        @keyframes loading {
          0% { transform: translateX(-100%); }
          50% { transform: translateX(0); }
          100% { transform: translateX(100%); }
        }
      `}</style>
        </div>
    );
}

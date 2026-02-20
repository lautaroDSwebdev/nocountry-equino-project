"use client";

import Hero from "@/components/landing/Hero";
import Categories from "@/components/landing/Categories";
import HorseGrid from "@/components/landing/HorseGrid";
import { useState } from "react";

export default function Home() {
  const [showWelcome, setShowWelcome] = useState(true);

  return (
    <div className="min-h-screen bg-[#F4F1EC] font-sans">
      <Hero />
      <Categories />
      <div className="space-y-4">
        <HorseGrid title="Basado en tu última visita" />
        <HorseGrid title="Ofertas de la semana" />
        <div className="container mx-auto px-4 py-8">
          {/* Banner/Ad placeholder like Mercado Libre often has between grids */}
          <div className="w-full h-32 bg-[#C9A24D] shadow-sm flex items-center justify-center text-white text-xl font-light">
            Financia tu compra
          </div>
        </div>
        <HorseGrid title="Inspirado en lo que viste" />
      </div>
    </div>
  )}
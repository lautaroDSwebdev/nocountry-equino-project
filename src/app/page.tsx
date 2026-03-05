"use client";

import Hero from "@/components/landing/Hero";
import Categories from "@/components/landing/Categories";
import HorseGrid from "@/components/landing/HorseGrid";
import HeaderHome from "@/components/layout/HeaderHome";
import Footer from "@/components/layout/Footer";
import { useState } from "react";
import SectionHome from "@/components/layout/SectionHome";
import SectionHome2 from "@/components/layout/SectionHome2";

export default function Home() {

  const [showWelcome, setShowWelcome] = useState(true);

  return (



    <>
      <div className="min-h-screen bg-[#F4F1EC] font-sans">
        <HeaderHome/>
        <Hero />
        <Categories />
        <SectionHome/>
        <div className="space-y-4">
          <HorseGrid title="Basado en tu última visita" />
          <SectionHome2/>
          <HorseGrid title="Ofertas de la semana" />
          <div className="container mx-auto px-4 py-8">
            <div className="w-full h-32 bg-[#C9A24D] shadow-sm flex items-center justify-center text-white text-xl font-light">
              Financia tu compra
            </div>
          </div>
          <HorseGrid title="Inspirado en lo que viste" />
        </div>
        <Footer/>
      </div>


    </>
  )
}



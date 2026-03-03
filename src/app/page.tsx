"use client";

import Hero from "@/components/landing/Hero";
import Categories from "@/components/landing/Categories";
import { useState } from "react";

export default function Home() {

  const [showWelcome, setShowWelcome] = useState(true);

  return (



    <>
      <div className="min-h-screen bg-[#F4F1EC] font-sans">

        <Hero />
        <Categories />
      </div>


    </>
  )
}



"use client";

import Hero from "@/components/landing/Hero";
import Categories from "@/components/landing/Categories";
import HeaderHome from "@/components/layout/HeaderHome";

export default function Home() {


  return (



    <>
      <div className="min-h-screen bg-[#F4F1EC] font-sans">
        <HeaderHome/>
        <Hero />
        <Categories />
      </div>


    </>
  )
}



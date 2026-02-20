"use client";

import HistoryTimeline from "@/_component/about/HistoryTimeline";
import LocationSection from "@/_component/about/LocationSection";
import HeroAbout from "@/_component/about/HeroAbout";
import MissionVision from "@/_component/about/MissionVision";
import TeamGrid from "@/_component/about/TeamGrid";
import Header from "@/_component/landing/Header";
import Footer from "@/components/layout/Footer";

export default function QuienesSomos() {
    return (
        <div className="min-h-screen bg-[#F4F1EC] font-sans">
            <Header />
            <main>
                <HeroAbout />
                <MissionVision />
                <HistoryTimeline />
                <TeamGrid />
                <LocationSection />
            </main>
            <Footer />
        </div>
    );
}
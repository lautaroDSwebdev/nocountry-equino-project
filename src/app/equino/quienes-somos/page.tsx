"use client";


import HeroAbout from "@/components/about/HeroAbout";
import HistoryTimeline from "@/components/about/HistoryTimeline";
import LocationSection from "@/components/about/LocationSection";
import MissionVision from "@/components/about/MissionVision";
import TeamGrid from "@/components/about/TeamGrid";
import Footer from "@/components/layout/Footer";

export default function QuienesSomos() {
    return (
        <div className="min-h-screen bg-[#F4F1EC] font-sans">
                <HeroAbout />
                <MissionVision />
                <HistoryTimeline />
                <TeamGrid />
                <LocationSection />
        </div>
    );
}
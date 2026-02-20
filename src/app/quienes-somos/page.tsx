"use client";

import HistoryTimeline from "@/components/about/HistoryTimeline";
import LocationSection from "@/components/about/LocationSection";
import HeroAbout from "@/components/about/HeroAbout";
import MissionVision from "@/components/about/MissionVision";
import TeamGrid from "@/components/about/TeamGrid";

export default function QuienesSomos() {
    return (
        <div className="min-h-screen bg-[#F4F1EC] font-sans">
            <main>
                <HeroAbout />
                <MissionVision />
                <HistoryTimeline />
                <TeamGrid />
                <LocationSection />
            </main>
        </div>
    );
}
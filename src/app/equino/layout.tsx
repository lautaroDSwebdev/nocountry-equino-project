"use client";

import Hero from "@/components/landing/Hero";
import WelcomeScreen from "@/components/landing/WelcomeScreen";
import Footer from "@/components/layout/Footer";
import Header from "@/components/layout/Header";
import { useState } from "react";



export default function EquinoLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    const [showWelcome, setShowWelcome] = useState(true);

    return (
        <div className="min-h-screen bg-[#F4F1EC] font-sans">
            {showWelcome && <WelcomeScreen onComplete={() => setShowWelcome(false)} />}

            <div className={`transition-opacity duration-1000 ${showWelcome ? 'opacity-0 h-0 overflow-hidden' : 'opacity-100'}`}>
                <main>
                    {children}
                </main>
            </div>
        </div>
    );
}

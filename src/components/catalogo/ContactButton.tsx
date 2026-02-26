"use client";

import { useChatStore } from '@/store/useChatStore';

export function ContactButton({ horseId, horseName, vendorId, vendorName }: { horseId: string, horseName: string, vendorId: string, vendorName: string }) {
    const { openChat } = useChatStore();

    return (
        <button
            onClick={() => openChat(horseId, horseName, vendorId, vendorName)}
            className="flex-1 bg-[#1F140D] hover:bg-black text-white px-6 py-3.5 rounded-xl font-bold transition-colors shadow-sm"
        >
            Contactar Vendedor
        </button>
    );
}

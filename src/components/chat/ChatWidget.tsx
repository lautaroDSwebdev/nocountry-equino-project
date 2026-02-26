"use client";

import { useChatStore } from '@/store/useChatStore';
import { ChatPanel } from '@/components/chat/ChatPanel';
import { X, Minimize2, Maximize2, MessageSquare, ChevronLeft } from 'lucide-react';
import { useState, useEffect } from 'react';

export function ChatWidget() {
    const { isOpen, sessions, activeHorseId, currentUsername, closeChat, setActiveSession } = useChatStore();
    const [isMinimized, setIsMinimized] = useState(false);

    // Auto-expand when a new chat is opened
    useEffect(() => {
        if (isOpen) {
            setIsMinimized(false);
        }
    }, [isOpen, activeHorseId]);

    // Active session object
    const activeSession = sessions.find(s => s.horseId === activeHorseId);

    if (!isOpen) return null;

    return (
        <div
            className={`fixed bottom-0 right-4 z-50 w-80 md:w-96 bg-white shadow-2xl rounded-t-xl overflow-hidden transition-all duration-300 ease-in-out flex flex-col border border-gray-200 ${isMinimized ? 'h-14' : 'h-[550px]'}`}
        >
            {/* Custom Header for the Widget */}
            <div
                className="bg-white border-b border-gray-100 px-4 py-3 flex items-center justify-between cursor-pointer hover:bg-gray-50 transition-colors"
                onClick={() => setIsMinimized(!isMinimized)}
            >
                <div>
                    <h3 className="text-gray-900 font-semibold text-sm flex items-center gap-2">
                        {activeSession ? (
                            <>
                                <button
                                    onClick={(e) => {
                                        e.stopPropagation();
                                        setActiveSession(null); // Go back to list
                                    }}
                                    className="text-gray-400 hover:text-gray-600 p-1 -ml-1 rounded-md"
                                >
                                    <ChevronLeft size={16} />
                                </button>
                                <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse"></span>
                                Chat con {activeSession.vendorName}
                            </>
                        ) : (
                            <>
                                <MessageSquare size={16} className="text-[#C9A24D]" />
                                Tus Conversaciones
                            </>
                        )}
                    </h3>
                    {!isMinimized && activeSession && (
                        <p className="text-xs text-gray-500 truncate w-48 pl-8">{activeSession.horseName}</p>
                    )}
                </div>
                <div className="flex gap-2">
                    <button
                        onClick={(e) => {
                            e.stopPropagation();
                            setIsMinimized(!isMinimized);
                        }}
                        className="text-gray-400 hover:text-gray-600 transition-colors"
                    >
                        {isMinimized ? <Maximize2 size={16} /> : <Minimize2 size={16} />}
                    </button>
                    <button
                        onClick={(e) => {
                            e.stopPropagation();
                            closeChat();
                        }}
                        className="text-gray-400 hover:text-red-500 transition-colors"
                    >
                        <X size={18} />
                    </button>
                </div>
            </div>

            {/* Content Area */}
            <div className={`flex-1 overflow-hidden transition-opacity duration-300 ${isMinimized ? 'opacity-0 invisible' : 'opacity-100 visible'} flex flex-col bg-slate-50`}>

                {/* View 1: Chat List */}
                {!activeSession && (
                    <div className="flex-1 overflow-y-auto w-full">
                        {sessions.length === 0 ? (
                            <div className="flex flex-col items-center justify-center h-full p-6 text-center text-gray-500 space-y-3">
                                <MessageSquare size={32} className="text-gray-300" />
                                <p>No tienes chats activos.</p>
                                <p className="text-xs">Contacta a un vendedor desde el catálogo para comenzar.</p>
                            </div>
                        ) : (
                            <ul className="divide-y divide-gray-100">
                                {sessions.map(session => (
                                    <li
                                        key={session.horseId}
                                        className="p-4 hover:bg-white cursor-pointer transition-colors"
                                        onClick={() => setActiveSession(session.horseId)}
                                    >
                                        <h4 className="font-semibold text-gray-800 text-sm overflow-hidden text-ellipsis whitespace-nowrap">
                                            {session.vendorName}
                                        </h4>
                                        <p className="text-xs text-gray-500 mt-1 overflow-hidden text-ellipsis whitespace-nowrap">
                                            Sobre: {session.horseName}
                                        </p>
                                    </li>
                                ))}
                            </ul>
                        )}
                    </div>
                )}

                {/* View 2: Active Chat Room */}
                {activeSession && (
                    <div className="h-full relative chat-widget-override w-full">
                        <ChatPanel
                            horseId={activeSession.horseId}
                            currentUsername={currentUsername}
                        />
                    </div>
                )}
            </div>

            {/* CSS override to fix ChatPanel's hardcoded header and border radius */}
            <style jsx global>{`
                .chat-widget-override > div {
                    border: none !important;
                    border-radius: 0 !important;
                    box-shadow: none !important;
                    height: 100% !important;
                    max-height: 100% !important;
                }
                .chat-widget-override .bg-gradient-to-r.from-blue-600.to-blue-700 {
                    display: none !important; /* Hide original ChatPanel header since we built a new custom one */
                }
            `}</style>
        </div>
    );
}

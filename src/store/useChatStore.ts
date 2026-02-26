import { create } from 'zustand';

export interface ChatSession {
    horseId: string;
    horseName: string;
    vendorId: string;
    vendorName: string;
}

interface ChatState {
    isOpen: boolean;
    sessions: ChatSession[];
    activeHorseId: string | null;
    currentUsername: string;
    openChat: (horseId: string, horseName: string, vendorId: string, vendorName: string) => void;
    closeChat: () => void;
    toggleChat: () => void;
    setUsername: (name: string) => void;
    setActiveSession: (horseId: string | null) => void;
}

export const useChatStore = create<ChatState>((set) => ({
    isOpen: false,
    sessions: [],
    activeHorseId: null,
    currentUsername: 'Usuario Demo', // Simulate an already logged in user

    // openChat opens the widget AND creates a session if it doesn't exist
    openChat: (horseId, horseName, vendorId, vendorName) => set((state) => {
        const sessionExists = state.sessions.find(s => s.horseId === horseId);

        return {
            isOpen: true,
            activeHorseId: horseId,
            sessions: sessionExists
                ? state.sessions
                : [...state.sessions, { horseId, horseName, vendorId, vendorName }]
        };
    }),

    closeChat: () => set({ isOpen: false }),

    toggleChat: () => set((state) => ({ isOpen: !state.isOpen })),

    setUsername: (name: string) => set({ currentUsername: name }),

    setActiveSession: (horseId: string | null) => set({ activeHorseId: horseId })
}));

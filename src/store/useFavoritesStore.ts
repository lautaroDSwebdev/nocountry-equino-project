import { create } from 'zustand';
import { persist } from 'zustand/middleware';

interface FavoritesState {
    savedHorses: number[];
    toggleFavorite: (id: number) => void;
    isFavorite: (id: number) => boolean;
}

export const useFavoritesStore = create<FavoritesState>()(
    persist(
        (set, get) => ({
            savedHorses: [],
            toggleFavorite: (id) =>
                set((state) => ({
                    savedHorses: state.savedHorses.includes(id)
                        ? state.savedHorses.filter((horseId) => horseId !== id)
                        : [...state.savedHorses, id],
                })),
            isFavorite: (id) => get().savedHorses.includes(id),
        }),
        {
            name: 'favorites-storage', // name of the item in the storage (must be unique)
        }
    )
);

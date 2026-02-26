import { create } from 'zustand';

interface CatalogFilters {
    breeds: string[];
    disciplines: string[];
    locations: string[];
    searchQuery: string;
    verification: string[];
}

interface CatalogState {
    // Pagination state
    currentPage: number; // 0-indexed for Spring Boot backend
    pageSize: number;
    totalPages: number;
    totalElements: number;

    // Filter state
    filters: CatalogFilters;

    // Actions
    setPage: (page: number) => void;
    setPageSize: (size: number) => void;
    setTotalPages: (total: number) => void;
    setTotalElements: (total: number) => void;

    setFilters: (filters: Partial<CatalogFilters>) => void;
    resetFilters: () => void;
}

const initialFilters: CatalogFilters = {
    breeds: [],
    disciplines: [],
    locations: [],
    searchQuery: '',
    verification: [],
};

export const useCatalogStore = create<CatalogState>((set) => ({
    currentPage: 0,
    pageSize: 3,
    totalPages: 1,
    totalElements: 0,
    filters: initialFilters,

    setPage: (page) => set({ currentPage: page }),

    setPageSize: (size) => set({ pageSize: size, currentPage: 0 }),

    setTotalPages: (total) => set({ totalPages: total }),

    setTotalElements: (total) => set({ totalElements: total }),

    setFilters: (newFilters) => set((state) => ({
        filters: { ...state.filters, ...newFilters },
        currentPage: 0, // Reset to first page on filter change
    })),

    resetFilters: () => set({
        filters: initialFilters,
        currentPage: 0,
    }),
}));

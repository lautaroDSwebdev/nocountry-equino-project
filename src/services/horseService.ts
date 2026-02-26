import { PageHorseResponse, Horse } from '../types/horse';

const API_BASE_URL = 'https://equitrust-backend.onrender.com/api/v1';

export const horseService = {
    getHorses: async (page: number = 0, size: number = 10, otherFilters?: any): Promise<PageHorseResponse> => {
        try {
            const queryParams = new URLSearchParams({
                page: page.toString(),
                size: size.toString(),
                ...otherFilters,
            });

            const response = await fetch(`${API_BASE_URL}/horses?${queryParams.toString()}`);

            if (!response.ok) {
                throw new Error('Failed to fetch horses');
            }

            const data: PageHorseResponse = await response.json();
            return data;
        } catch (error) {
            console.error('Error fetching horses:', error);
            throw error;
        }
    },

    getHorseById: async (id: number): Promise<Horse> => {
        try {
            const response = await fetch(`${API_BASE_URL}/horses/${id}`);

            if (!response.ok) {
                throw new Error(`Failed to fetch horse with id ${id}`);
            }

            const data: Horse = await response.json();
            return data;
        } catch (error) {
            console.error(`Error fetching horse ${id}:`, error);
            throw error;
        }
    }
};

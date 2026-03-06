import { PageHorseResponse, Horse } from '../types/horse';

const API_BASE_URL = 'https://equitrust-backend.onrender.com/api/v1';

export const horseService = {
    getHorses: async (page: number = 0, size: number = 10, otherFilters?: any): Promise<PageHorseResponse> => {
        try {
            const params: Record<string, string> = {
                page: page.toString(),
                size: size.toString(),
            };

            if (otherFilters) {
                Object.entries(otherFilters).forEach(([key, value]) => {
                    if (value !== undefined && value !== null && value !== '') {
                        params[key] = value.toString();
                    }
                });
            }

            const queryParams = new URLSearchParams(params);

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
    },

    createHorse: async (horseData: any, token: string): Promise<Horse> => {
        try {
            const response = await fetch(`${API_BASE_URL}/horses`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                },
                body: JSON.stringify(horseData),
            });

            if (!response.ok) {
                const errorText = await response.text().catch(() => "Could not read text");
                console.error(`Error backend response (Status: ${response.status}):`, errorText);
                throw new Error('Failed to create horse');
            }

            const data: Horse = await response.json();
            return data;
        } catch (error) {
            console.error(`Error creating horse:`, error);
            throw error;
        }
    }
};

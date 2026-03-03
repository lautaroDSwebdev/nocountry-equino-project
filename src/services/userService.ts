import { User } from '../types/types';

const API_BASE_URL = 'https://equitrust-backend.onrender.com/api/v1';

export const userService = {
    getCurrentUser: async (token: string): Promise<User> => {
        try {
            const response = await fetch(`${API_BASE_URL}/users/me`, {
                method: 'GET',
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json'
                }
            });

            if (!response.ok) {
                if (response.status === 401) {
                    throw new Error('Unauthorized');
                }
                throw new Error('Failed to fetch user profile');
            }

            const data: User = await response.json();
            return data;
        } catch (error) {
            console.error('Error fetching user profile:', error);
            throw error;
        }
    }
};

import api from '../api-general';

// Global function that returns all REST use-case functions
// GET request
const endpoint = "/api/recordatorios";
export const getRequest = async <T>(): Promise<T> => {
    const response = await api.get<T>(endpoint);
    return response.data;
};

// POST request
export const postRequest = async (data: string) => {
    const response = await api.post(endpoint, data);
    return response.data;
};

// PUT request
export const putRequest = async (id: number, data: string) => {
    const response = await api.put(`${endpoint}/${id}`, data);
    return response.data;
};

// PATCH request


// DELETE request
export const deleteRequest = async (id: string) => {
    const response = await api.delete(`${endpoint}/${id}`);
    return response.data;
};



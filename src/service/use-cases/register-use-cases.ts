import api, { endpoint_register } from '../api-general';

// Global function that returns all REST use-case functions
// GET request

export const getRequest = async <T>(): Promise<T> => {
    const response = await api.get<T>(endpoint_register);
    return response.data;
};

// POST request
export const postRequest = async (data: string) => {
    const response = await api.post(endpoint_register, data);
    return response.data;
};

// PUT request
export const putRequest = async (id: number, data: string) => {
    const response = await api.put(`${endpoint_register}/${id}`, data);
    return response.data;
};

// PATCH request


// DELETE request
export const deleteRequest = async (id: string) => {
    const response = await api.delete(`${endpoint_register}/${id}`);
    return response.data;
};



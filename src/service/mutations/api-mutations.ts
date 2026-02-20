'use client';

import { useMutation, useQueryClient, UseMutationOptions, useQuery } from '@tanstack/react-query';
import { deleteRequest, getRequest, postRequest, putRequest } from '../use-cases/api-use-cases';
import { Data } from '@/types/types';

// Generic mutation types

// hola esto es un cambio en dev

// Global function that returns all REST mutation hooks
export const RestMutations = () => {
    const queryClient = useQueryClient();

    const GetQueryRecordatorio = useQuery({
        queryKey: ["key_"],
        queryFn: () => {
            return getRequest();
        },
    });
    // POST Mutation
    const usePostMutation = () => {

        return useMutation({
            mutationFn: async ({ data }: Data) => {
                return postRequest(data);
            },
            onSuccess: () => {
                queryClient.invalidateQueries({
                    queryKey: ["key_"],
                });
                console.log("exitoso");
                alert("registro de recordatorio exitoso");
            }
        });
    };

    // PUT Mutation
    const usePutMutation = () => {

        return useMutation({
            mutationFn: async ({ data, id }: Data) => {
                if (!id) {
                    throw new Error('ID is required for PUT request');
                }
                return putRequest(id, data);
            },
            onSuccess: () => {
                queryClient.invalidateQueries({
                    queryKey: ["key_recordatorio"],
                });
                console.log("exitoso");
                alert("registro de recordatorio exitoso");
            }
        });
    };


    // DELETE Mutation
    const useDeleteMutation = (id: string) => {

        return useMutation({
            mutationFn: async (id: string) => {
                return deleteRequest(id);
            },
            onSuccess: () => {
                queryClient.invalidateQueries({
                    queryKey: ["key_recordatorio"],
                });
                console.log("exitoso");
                alert("registro de recordatorio exitoso");
            }
        });
    };

    return {
        usePostMutation,
        usePutMutation,
        useDeleteMutation,
        GetQueryRecordatorio
    };
};

//import {Selling} from ".././components/vender/Selling"

import { endpoint_selling } from "@/service/api-general";
import { METHODS } from "http";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";

export function useFormSelling() {

const sellHorse = async (formData: any) => {

    const storedToken = localStorage.getItem("access_token");

    let token = null;

    if (storedToken) {
        const parsed = JSON.parse(storedToken);
        token = parsed.access_token;
    }

    try {

        const extractYoutubeId = (url: string) => {
        const match = url.match(/v=([^&]+)/);
        return match ? match[1] : url;
    };

        console.log("FORM DATA:", formData);
        const dataToSend = {
            breed: formData.breed,
            age: Number(formData.age),
            gender: formData.gender,
            temperament: formData.temperament,
            discipline: formData.discipline,
            price: Number(formData.price),
            location: formData.location,
            description: formData.description,
            imageIds: formData.imageIds,
            videoId: formData.videoId
            ? extractYoutubeId(formData.videoId)
            : null,
            ...(formData.discountPrice && {
                discountPrice: Number(formData.discountPrice)
            })
        };

        const response = await fetch (endpoint_selling , {
            method:'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization' : `Bearer ${token}`
            },
            body: JSON.stringify(dataToSend),
        })

        if(!response.ok) {
            throw new Error (`Error HTTP: ${response.status}`)
        }

        const data = await response.json();
        console.log('Datos del caballo' , data);
        
        return data;

    } catch(error) {
        console.error("Error al vender el caballo" , error)
        throw error;
    }
}

return {sellHorse};

}

export default useFormSelling

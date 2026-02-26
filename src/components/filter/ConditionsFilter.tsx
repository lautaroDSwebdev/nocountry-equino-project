"use client"
import { useContext } from "react"
import { ContextData } from "../context/UseContextProvider"
import { horses } from "@/mock/mock"
import {  HorsesEntity } from "@/types/types"

export const ConditionsFilter = () => { 
    const {filters, setFilters } = useContext(ContextData)

    const filterHorse = (data: any) => {
        // console.log(data);
        return data.filter((e: HorsesEntity) => {
            return (
                // si el precio que recibe es mayor e igual al precio minimo y 
                e.price >= filters.minPrice &&  
                filters.breed === 'all' || e.breed === filters.breed &&
                // filters.moreSales >= 4 || e.sales >  filters.moreSales &&
                filters.moreAgeThan3 >= 3 || e.moreAgeThan3 > filters.moreAgeThan3 
                // filters.installments === "all" || e.installments === filters.installments &&
                // filters.temperament === "all" || e.temperament === filters.temperament &&
                // filters.shipping === "all" || e.shipping == filters.shipping
            )
        })
    }
    return { filters, filterHorse, setFilters }
}
"use client"
import { useContext } from "react"
import { ContextData } from "../context/UseContextProvider"
import { horses } from "@/mock/mock"
import { HorsesEntity } from "@/types/types"

export const ConditionsFilter = () => {
    const context = useContext(ContextData);
    if (!context) {
        throw new Error("ConditionsFilter must be used within a UseContextProvider");
    }
    const { filters, setFilters } = context;

    const filterHorse = (data: any) => {
        // console.log(data);
        return data.filter((e: HorsesEntity) => {
            return (
                (filters.breed === 'all' || e.breed === filters.breed) &&
                (filters.moreAgeThan3 === "moreAgeThan3" || e.moreAgeThan3 === filters.moreAgeThan3)
            )
        })
    }
    return { filters, filterHorse, setFilters }
}
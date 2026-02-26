"use client";
import { createContext, useState } from "react";
import {  FilterHorses, HorsesEntity } from "@/types/types";

export interface ContextFilterType {
  filters: FilterHorses;
  setFilters: (state: any) => any;
}

export const ContextData = createContext<ContextFilterType | undefined>(
  undefined,
);

export const UseContextProvider = ({ children }: { children: any }) => {
  const [filters, setFilters] = useState<FilterHorses>({
    // raza
    breed: "all",
    moreSales: 0,
    age: 2,
    temperament: "all",
    moreAgeThan3: "moreAgeThan3",
    // ofertas
    installments: "all",
    // velocidad de envios
    shipping: "all"
  });

  return (
    <ContextData.Provider value={{ setFilters, filters }}>
      {children}
    </ContextData.Provider>
  );
};

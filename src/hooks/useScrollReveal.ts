"use client";

import { useEffect, useRef } from "react";

/**
 * Hook personalizado que agrega una animación de scroll-reveal a un elemento.
 * Cuando el elemento entra en el viewport, agrega la clase 'in-view'.
 * 
 * @param threshold - Cuánto del elemento debe ser visible (0 a 1). Default: 0.15
 * @returns Un ref para adjuntar al elemento que deseas animar
 */
export function useScrollReveal<T extends HTMLElement = HTMLDivElement>(threshold = 0.15) {
    const ref = useRef<T>(null);

    useEffect(() => {
        const element = ref.current;
        if (!element) return;

        const observer = new IntersectionObserver(
            ([entry]) => {
                if (entry.isIntersecting) {
                    element.classList.add("in-view");
                    observer.unobserve(element);
                }
            },
            { threshold }
        );

        observer.observe(element);

        return () => observer.disconnect();
    }, [threshold]);

    return ref;
}

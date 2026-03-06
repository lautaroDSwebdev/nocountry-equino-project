"use client";

import { useState, useRef, useEffect } from 'react';
import { ChevronDown } from 'lucide-react';

interface Option {
    value: string;
    label: string;
}

interface CustomSelectProps {
    value: string;
    label: string; // The text shown when nothing is selected or as a prefix
    options: Option[];
    onChange: (value: string) => void;
    className?: string;
}

export default function CustomSelect({
    value,
    label,
    options,
    onChange,
    className = ""
}: CustomSelectProps) {
    const [isOpen, setIsOpen] = useState(false);
    const containerRef = useRef<HTMLDivElement>(null);

    // Close when clicking outside
    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (containerRef.current && !containerRef.current.contains(event.target as Node)) {
                setIsOpen(false);
            }
        };
        document.addEventListener('mousedown', handleClickOutside);
        return () => document.removeEventListener('mousedown', handleClickOutside);
    }, []);

    const handleSelect = (optionValue: string) => {
        onChange(optionValue);
        setIsOpen(false);
    };

    const selectedOption = options.find(opt => opt.value === value);

    return (
        <div className={`relative ${className}`} ref={containerRef}>
            <button
                type="button"
                onClick={() => setIsOpen(!isOpen)}
                className="w-full bg-white border border-gray-200 rounded-lg px-4 py-2 text-sm text-gray-700 flex items-center justify-between gap-2 hover:border-[#C9A24D] focus:outline-none focus:ring-2 focus:ring-[#C9A24D]/20 transition-all duration-200 shadow-sm"
            >
                <span className="truncate">
                    {selectedOption ? `${label}: ${selectedOption.label}` : label}
                </span>
                <ChevronDown
                    size={16}
                    className={`text-gray-400 transition-transform duration-200 ${isOpen ? 'rotate-180' : ''}`}
                />
            </button>

            {isOpen && (
                <div className="absolute z-50 mt-2 w-full bg-white border border-gray-100 rounded-xl shadow-xl overflow-hidden animate-in fade-in slide-in-from-top-2 duration-200">
                    <div className="py-1">
                        {options.map((option) => (
                            <button
                                key={option.value}
                                onClick={() => handleSelect(option.value)}
                                className={`w-full text-left px-4 py-2.5 text-sm transition-colors flex items-center justify-between
                                    ${value === option.value
                                        ? 'bg-[#C9A24D]/10 text-[#5A2E14] font-medium'
                                        : 'text-gray-600 hover:bg-gray-50'
                                    }`}
                            >
                                {option.label}
                                {value === option.value && (
                                    <div className="w-1.5 h-1.5 rounded-full bg-[#C9A24D]" />
                                )}
                            </button>
                        ))}
                    </div>
                </div>
            )}
        </div>
    );
}

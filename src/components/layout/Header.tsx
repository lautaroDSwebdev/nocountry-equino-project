"use client";

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useState, useEffect, useRef } from 'react';
import { Search, ShoppingCart, Menu, ChevronDown } from 'lucide-react';

const navLinksLeft = [
    { href: "/categorias", label: "Categorías", hasDropdown: true },
    { href: "/ofertas", label: "Ofertas" },
    { href: "/novedades", label: "Novedades" },
    { href: "/vender", label: "Vender" },
];

const navLinksRight = [
    { href: "/quienes-somos", label: "Quiénes Somos" },
    { href: "/ayuda", label: "Ayuda" },
    { href: "/contacto", label: "Contacto" },
];

const categorias = [
    { title: "Razas", items: ["Pura Sangre", "Cuarto de Milla", "Árabe", "Criollo", "Frisón"] },
    { title: "Disciplinas", items: ["Salto", "Doma", "Polo", "Endurance", "Carreras"] },
    { title: "Edades", items: ["Potro (0-2)", "Joven (2-5)", "Adulto (5-15)", "Senior (15+)"] },
    { title: "Rango de Precio", items: ["Hasta $500.000", "$500k - $2M", "$2M - $5M", "Más de $5M"] },
];

export default function Header() {
    const pathname = usePathname();
    const [isScrolled, setIsScrolled] = useState(false);
    const [showCategorias, setShowCategorias] = useState(false);
    const dropdownRef = useRef<HTMLDivElement>(null);

    const cartCount = 3;

    useEffect(() => {
        const handleScroll = () => {
            setIsScrolled(window.scrollY > 10);
        };
        window.addEventListener('scroll', handleScroll, { passive: true });
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    useEffect(() => {
        const handleClickOutside = (e: MouseEvent) => {
            if (dropdownRef.current && !dropdownRef.current.contains(e.target as Node)) {
                setShowCategorias(false);
            }
        };
        if (showCategorias) {
            document.addEventListener('mousedown', handleClickOutside);
        }
        return () => document.removeEventListener('mousedown', handleClickOutside);
    }, [showCategorias]);

    const renderNavLink = (link: { href: string; label: string; hasDropdown?: boolean }) => {
        const isActive = pathname === link.href;

        if (link.hasDropdown) {
            return (
                <div key={link.href} className="relative" ref={dropdownRef}>
                    <button
                        onClick={() => setShowCategorias(!showCategorias)}
                        className={`flex items-center gap-1 px-4 py-3 text-sm transition-all duration-200 border-b-2 ${isActive || showCategorias
                            ? 'text-[#C9A24D] font-semibold border-[#C9A24D]'
                            : 'text-gray-300 border-transparent hover:text-white hover:border-white/30'
                            }`}
                    >
                        {link.label}
                        <ChevronDown
                            size={14}
                            className={`transition-transform duration-200 ${showCategorias ? 'rotate-180' : ''}`}
                        />
                    </button>

                    {showCategorias && (
                        <div className="absolute top-full left-0 mt-0 w-[600px] bg-white rounded-b-2xl shadow-2xl border border-gray-100 p-6 grid grid-cols-4 gap-6 z-50">
                            {categorias.map((cat) => (
                                <div key={cat.title}>
                                    <h4 className="font-bold text-[#1F140D] text-sm mb-3 pb-2 border-b border-gray-100">
                                        {cat.title}
                                    </h4>
                                    <ul className="space-y-2">
                                        {cat.items.map((item) => (
                                            <li key={item}>
                                                <Link
                                                    href="#"
                                                    className="text-sm text-gray-600 hover:text-[#C9A24D] transition-colors"
                                                    onClick={() => setShowCategorias(false)}
                                                >
                                                    {item}
                                                </Link>
                                            </li>
                                        ))}
                                    </ul>
                                </div>
                            ))}
                        </div>
                    )}
                </div>
            );
        }

        return (
            <Link
                key={link.href}
                href={link.href}
                className={`px-4 py-3 text-sm transition-all duration-200 border-b-2 ${isActive
                    ? 'text-[#C9A24D] font-semibold border-[#C9A24D]'
                    : 'text-gray-300 border-transparent hover:text-white hover:border-white/30'
                    }`}
            >
                {link.label}
            </Link>
        );
    };

    return (
        <header
            className={`sticky top-0 z-50 bg-[#1F140D] transition-all duration-300 ${isScrolled ? 'shadow-lg shadow-black/30 backdrop-blur-md bg-[#1F140D]/95' : ''
                }`}
        >
            <div className="w-full px-6 py-3">
                <div className="flex items-center justify-between gap-4">
                    {/* Logo */}
                    <Link href="/" className="flex-shrink-0 flex items-center gap-2">
                        <img
                            src="/images/LOGO.png"
                            alt="HorseTrust Logo"
                            className="h-16 w-auto object-contain"
                        />
                        <span className="text-2xl font-bold text-white tracking-tight">
                            HORSE<span className="font-light">TRUST</span>
                        </span>
                    </Link>

                    {/* Barra de búsqueda - Desktop */}
                    <div className="hidden md:flex flex-1 max-w-2xl mx-6">
                        <div className="relative w-full">
                            <input
                                type="text"
                                placeholder="Buscar caballos, razas y más..."
                                className="w-full h-10 px-4 pr-10 rounded-lg border border-gray-600 focus:outline-none focus:ring-2 focus:ring-[#C9A24D]/50 focus:border-[#C9A24D] text-gray-700 placeholder-gray-400 bg-white transition-all duration-300"
                            />
                            <button className="absolute right-0 top-0 h-10 w-10 flex items-center justify-center text-gray-500 hover:text-[#C9A24D] transition-colors">
                                <Search size={20} />
                            </button>
                        </div>
                    </div>

                    {/* Botón hamburguesa - Mobile */}
                    <button className="md:hidden p-2 text-white">
                        <Menu size={24} />
                    </button>

                    {/* Acciones de usuario - Desktop */}
                    <div className="hidden md:flex items-center gap-5 text-sm text-white">
                        <Link href="#" className="hover:text-[#C9A24D] transition-colors">
                            Crea tu cuenta
                        </Link>
                        <Link href="#" className="font-semibold hover:text-[#C9A24D] transition-colors">
                            Ingresá
                        </Link>
                        <Link href="#" className="hover:text-[#C9A24D] transition-colors">
                            Mis compras
                        </Link>

                        {/* Carrito con badge */}
                        <Link href="#" className="relative hover:text-[#C9A24D] transition-colors">
                            <ShoppingCart size={22} strokeWidth={1.5} />
                            {cartCount > 0 && (
                                <span className="absolute -top-2 -right-2.5 bg-[#C9A24D] text-white text-[10px] font-bold w-5 h-5 rounded-full flex items-center justify-center">
                                    {cartCount}
                                </span>
                            )}
                        </Link>
                    </div>
                </div>

                <div className="mt-3 md:hidden">
                    <div className="relative w-full">
                        <input
                            type="text"
                            className="w-full h-10 px-4 pr-10 rounded-lg border-none text-gray-700 placeholder-gray-400 bg-white"
                        />
                        <button className="absolute right-0 top-0 h-10 w-10 flex items-center justify-center text-gray-500">
                            <Search size={20} />
                        </button>
                    </div>
                </div>
            </div>

    
            <div className="hidden md:block border-t border-white/10">
                <div className="w-full px-6">
                    <nav className="flex items-center justify-between">
                        <div className="flex items-center gap-1">
                            {navLinksLeft.map(renderNavLink)}
                        </div>

                        <div className="flex items-center gap-1">
                            {navLinksRight.map(renderNavLink)}
                        </div>
                    </nav>
                </div>
            </div>
        </header>
    );
}

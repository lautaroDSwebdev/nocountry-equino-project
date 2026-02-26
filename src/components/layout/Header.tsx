"use client";

import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import { useState, useEffect, useRef } from 'react';
import { Search, Menu, User, Settings, MessageSquare, Heart } from 'lucide-react';
import { useChatStore } from '@/store/useChatStore';

const path = "/equino"
const navLinksLeft = [
    { href: path + "/catalogo", label: "Catálogo" },
    { href: path + "/novedades", label: "Novedades" },
    { href: path + "/vender", label: "Vender" },
];

const navLinksRight = [
    { href: path + "/quienes-somos", label: "Quiénes Somos" },
    { href: path + "/ayuda", label: "Ayuda" },
    { href: path + "/contacto", label: "Contacto" },
];



export default function Header() {
    const router = useRouter()
    const pathname = usePathname();
    const [isScrolled, setIsScrolled] = useState(false);
    const [isProfileOpen, setIsProfileOpen] = useState(false);
    const { currentUsername, toggleChat } = useChatStore();
    const profileRef = useRef<HTMLDivElement>(null);

    // Cerrar el dropdown al hacer clic fuera
    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (profileRef.current && !profileRef.current.contains(event.target as Node)) {
                setIsProfileOpen(false);
            }
        };
        document.addEventListener('mousedown', handleClickOutside);
        return () => document.removeEventListener('mousedown', handleClickOutside);
    }, []);

    useEffect(() => {
        const handleScroll = () => {
            setIsScrolled(window.scrollY > 10);
        };
        window.addEventListener('scroll', handleScroll, { passive: true });
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);


    const renderNavLink = (link: { href: string; label: string }) => {
        const isActive = pathname === link.href;

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
                    <Link href="/equino" className="flex-shrink-0 flex items-center gap-2 transition-transform hover:scale-[1.02] duration-300">
                        <img
                            src="/images/LOGO.png"
                            alt="HorseTrust Logo"
                            className="h-14 md:h-16 w-auto object-contain drop-shadow-[0_0_15px_rgba(201,162,77,0.3)]"
                        />
                        <span className="text-2xl md:text-3xl font-bold text-white tracking-tight drop-shadow-md">
                            HORSE<span className="font-light text-[#C9A24D]">TRUST</span>
                        </span>
                    </Link>



                    {/* Botón hamburguesa - Mobile */}
                    <button className="md:hidden p-2 text-white">
                        <Menu size={24} />
                    </button>

                    {/* Acciones de usuario - Desktop */}
                    <div className="hidden md:flex items-center gap-5 text-sm text-white">
                        <Link href="/register" className="hover:text-[#C9A24D] transition-colors">
                            Crea tu cuenta
                        </Link>
                        <Link href="/login" className="font-semibold hover:text-[#C9A24D] transition-colors">
                            Ingresá
                        </Link>

                        {/* Contenedor del Perfil de Usuario con Dropdown */}
                        <div className="relative" ref={profileRef}>
                            <button
                                onClick={() => setIsProfileOpen(!isProfileOpen)}
                                className="flex items-center gap-2 hover:text-[#C9A24D] transition-colors group p-2"
                            >
                                <div className="bg-white/10 p-2 rounded-full group-hover:bg-[#C9A24D] group-hover:text-white transition-all duration-300">
                                    <User size={20} strokeWidth={2} />
                                </div>
                                <span className="font-medium group-hover:text-[#C9A24D] transition-colors hidden lg:block">
                                    {currentUsername || "User"}
                                </span>
                            </button>

                            {/* Dropdown Menu */}
                            {isProfileOpen && (
                                <div className="absolute right-0 mt-2 w-48 bg-white rounded-xl shadow-xl border border-gray-100 overflow-hidden py-2 animate-in fade-in slide-in-from-top-2 duration-200">
                                    <div className="px-4 py-2 border-b border-gray-100 mb-2 block lg:hidden">
                                        <p className="text-sm font-semibold text-gray-800 truncate">{currentUsername || "User"}</p>
                                    </div>
                                    <Link
                                        href="/perfil"
                                        onClick={() => setIsProfileOpen(false)}
                                        className="flex items-center gap-3 px-4 py-2.5 text-sm text-gray-700 hover:bg-gray-50 hover:text-[#C9A24D] transition-colors"
                                    >
                                        <Settings size={16} />
                                        <span>Mi perfil</span>
                                    </Link>
                                    <button
                                        onClick={() => {
                                            setIsProfileOpen(false);
                                            toggleChat();
                                        }}
                                        className="w-full flex items-center gap-3 px-4 py-2.5 text-sm text-gray-700 hover:bg-gray-50 hover:text-[#C9A24D] transition-colors text-left"
                                    >
                                        <MessageSquare size={16} />
                                        <span>Chat</span>
                                    </button>
                                    <Link
                                        href="/guardados"
                                        onClick={() => setIsProfileOpen(false)}
                                        className="flex items-center gap-3 px-4 py-2.5 text-sm text-gray-700 hover:bg-gray-50 hover:text-[#C9A24D] transition-colors"
                                    >
                                        <Heart size={16} />
                                        <span>Guardado</span>
                                    </Link>
                                    <div className="border-t border-gray-100 mt-2 pt-2">
                                        <button
                                            className="w-full text-left px-4 py-2.5 text-sm text-red-600 hover:bg-red-50 transition-colors"
                                            onClick={() => router.push("/login")}
                                        >
                                            Cerrar sesión
                                        </button>
                                    </div>
                                </div>
                            )}
                        </div>
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

    
            <div className="hidden md:block border-t border-white/10 ">
                <div className="w-full px-6">
                    <nav className="flex items-center justify-between">
                        <div className="flex items-center gap-1">
                            {navLinksLeft.map(renderNavLink)}
                        </div>

                        <div className="flex items-center gap-1 ">
                            {navLinksRight.map(renderNavLink)}
                        </div>
                    </nav>
                </div>
            </div>
        </header>
    );
}

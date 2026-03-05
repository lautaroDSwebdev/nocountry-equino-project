import react from "react";
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import { useState, useEffect, useRef } from 'react';
import { Search, Menu, User, Settings, MessageSquare, Heart } from 'lucide-react';
import { useChatStore } from '@/store/useChatStore';

interface FormsProps {
  children?: React.ReactNode;
}


export function HeaderHome () {

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

    return (
        <>
        <header
            className={`sticky top-0 z-50 bg-[#1F140D] transition-all duration-300 ${isScrolled ? 'shadow-lg shadow-black/30 backdrop-blur-md bg-[#1F140D]/95' : ''
                }`}
        >
            <div className="w-full px-6 py-3">
                <div className="flex items-center justify-between gap-4">
                    {/* Logo */}
                        <img
                            src="/images/LOGO.png"
                            alt="HorseTrust Logo"
                            className="h-14 md:h-16 w-auto object-contain drop-shadow-[0_0_15px_rgba(201,162,77,0.3)]"
                        />
                        <span className="text-2xl md:text-3xl font-bold text-white tracking-tight drop-shadow-md">
                            Equi<span className="font-light text-[#C9A24D]">Trust</span>
                        </span>
                    



                    {/* Botón hamburguesa - Mobile */}
                    <button className="md:hidden p-2 text-white">
                        <Menu size={24} />
                    </button>

                    {/* Acciones de usuario - Desktop */}
                    <div style={{margin: '1%'}} className="hidden md:flex items-center gap-5 text-sm text-white">
                        <Link href="/register"  className="hover:text-[#C9A24D] transition-colors">
                            Crea tu cuenta
                        </Link>
                        <Link href="/login" style={{background:'#C9A24D' , padding:'10px'}} className="font-semibold" /*hover:text-[#C9A24D] transition-colors"*/>
                            Iniciar sesión
                        </Link>
                    </div>
                </div>
            </div>
        </header>
        </>
    )

}

export default HeaderHome
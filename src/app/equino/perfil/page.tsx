"use client";

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { authStore } from '@/store/token-store';
import { userService } from '@/services/userService';
import { User as UserType } from '@/types/types';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import { User, Mail, Phone, MapPin, Calendar, Shield, Edit, Loader2 } from 'lucide-react';
import Link from 'next/link';
import Image from 'next/image';

export default function MiPerfilPage() {
    const router = useRouter();
    const tokenOptions = authStore((state) => state.token);
    const [user, setUser] = useState<UserType | null>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const fetchUserProfile = async () => {
            try {
                if (!tokenOptions || !tokenOptions.access_token) {
                    router.push('/login');
                    return;
                }

                const userData = await userService.getCurrentUser(tokenOptions.access_token);
                setUser(userData);
            } catch (err: any) {
                console.error("Error cargando perfil:", err);
                if (err.message === 'Unauthorized') {
                    // Token expirado o inválido
                    authStore.getState().removeToken();
                    router.push('/login');
                } else {
                    setError('No se pudo cargar la información del perfil. Por favor, intenta de nuevo más tarde.');
                }
            } finally {
                setLoading(false);
            }
        };

        fetchUserProfile();
    }, [tokenOptions, router]);

    if (loading) {
        return (
            <div className="min-h-screen bg-[#F4F1EC] flex flex-col">
                <main className="flex-grow flex items-center justify-center">
                    <div className="flex flex-col items-center gap-4">
                        <Loader2 className="w-12 h-12 text-[#C9A24D] animate-spin" />
                        <p className="text-gray-600 font-medium">Cargando tu perfil...</p>
                    </div>
                </main>
            </div>
        );
    }

    if (error || !user) {
        return (
            <div className="min-h-screen bg-[#F4F1EC] flex flex-col">
                <main className="flex-grow flex items-center justify-center p-6">
                    <div className="bg-white p-8 rounded-2xl shadow-lg max-w-md w-full text-center">
                        <div className="bg-red-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                            <Shield className="w-8 h-8 text-red-600" />
                        </div>
                        <h2 className="text-2xl font-bold text-gray-800 mb-2">Oops! Algo salió mal</h2>
                        <p className="text-gray-600 mb-6">{error || 'No se encontró la información del usuario.'}</p>
                        <button
                            onClick={() => window.location.reload()}
                            className="w-full bg-[#1F140D] hover:bg-[#C9A24D] text-white py-3 rounded-xl transition-colors font-medium"
                        >
                            Intentar de nuevo
                        </button>
                    </div>
                </main>
            </div>
        );
    }

    // Formatear la fecha
    const formatDate = (dateString: string) => {
        if (!dateString) return 'No disponible';
        try {
            const date = new Date(dateString);
            return new Intl.DateTimeFormat('es-AR', {
                day: '2-digit',
                month: 'long',
                year: 'numeric'
            }).format(date);
        } catch (e) {
            return dateString;
        }
    };

    // Obtener las iniciales para el avatar por defecto
    const getInitials = () => {
        return `${user.name?.charAt(0) || ''}${user.lastName?.charAt(0) || ''}`.toUpperCase();
    };

    return (
        <div className="min-h-screen bg-[#F4F1EC] flex flex-col font-sans">

            <main className="flex-grow py-12 px-4 sm:px-6 lg:px-8">
                <div className="max-w-4xl mx-auto">

                    {/* Sección Header del Perfil */}
                    <div className="bg-[#1F140D] rounded-t-3xl p-8 relative overflow-hidden">
                        {/* Motif decorativo de fondo */}
                        <div className="absolute top-0 right-0 opacity-10 pointer-events-none">
                            <svg width="400" height="400" viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path d="M50 0 L100 50 L50 100 L0 50 Z" fill="#C9A24D" />
                            </svg>
                        </div>

                        <div className="relative z-10 flex flex-col md:flex-row items-center gap-6">
                            {/* Avatar */}
                            <div className="w-32 h-32 rounded-full border-4 border-[#C9A24D] bg-white flex items-center justify-center flex-shrink-0 shadow-xl overflow-hidden relative">
                                {/* Imagen de perfil vacía - usando iniciales */}
                                <span className="text-4xl font-bold text-[#1F140D]">{getInitials()}</span>
                            </div>

                            {/* Información principal */}
                            <div className="text-center md:text-left flex-grow">
                                <h1 className="text-3xl md:text-4xl font-bold text-white mb-2">
                                    {user.name} {user.lastName}
                                </h1>
                                <div className="inline-flex items-center px-3 py-1 bg-white/10 rounded-full border border-[#C9A24D]/30 backdrop-blur-sm">
                                    <Shield className="w-4 h-4 text-[#C9A24D] mr-2" />
                                    <span className="text-[#C9A24D] text-sm font-medium uppercase tracking-wider">
                                        Usuario
                                    </span>
                                </div>
                            </div>

                            {/* Acciones */}
                            <div className="mt-4 md:mt-0">
                                {/* Funcionalidad futura */}
                                <button className="flex items-center gap-2 bg-[#C9A24D] hover:bg-[#b08d43] text-white px-6 py-3 rounded-xl transition-all duration-300 font-medium shadow-lg hover:shadow-xl hover:-translate-y-1">
                                    <Edit className="w-4 h-4" />
                                    <span>Editar Perfil</span>
                                </button>
                            </div>
                        </div>
                    </div>

                    {/* Contenido principal del perfil */}
                    <div className="bg-white rounded-b-3xl shadow-xl p-8 border border-gray-100/50">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">

                            {/* Columna Izquierda - Datos Personales */}
                            <div className="space-y-6">
                                <h3 className="text-xl font-bold text-[#1F140D] border-b border-gray-100 pb-3 flex items-center gap-2">
                                    <User className="w-5 h-5 text-[#C9A24D]" />
                                    Datos Personales
                                </h3>

                                <div className="space-y-4">
                                    <div className="flex flex-col">
                                        <span className="text-sm text-gray-500 font-medium mb-1">Nombre Completo</span>
                                        <span className="text-gray-800 font-semibold">{user.name} {user.lastName}</span>
                                    </div>

                                    <div className="flex flex-col">
                                        <span className="text-sm text-gray-500 font-medium mb-1">DNI</span>
                                        <span className="text-gray-800 font-semibold">{user.dni || 'No especificado'}</span>
                                    </div>

                                    <div className="flex flex-col">
                                        <span className="text-sm text-gray-500 font-medium mb-1 inline-flex items-center gap-1.5">
                                            <Calendar className="w-4 h-4 text-gray-400" />
                                            Miembro desde
                                        </span>
                                        <span className="text-gray-800 font-semibold">{formatDate(user.createdAt)}</span>
                                    </div>
                                </div>
                            </div>

                            {/* Columna Derecha - Contacto */}
                            <div className="space-y-6">
                                <h3 className="text-xl font-bold text-[#1F140D] border-b border-gray-100 pb-3 flex items-center gap-2">
                                    <Mail className="w-5 h-5 text-[#C9A24D]" />
                                    Información de Contacto
                                </h3>

                                <div className="space-y-4">
                                    <div className="flex flex-col group">
                                        <span className="text-sm text-gray-500 font-medium mb-1 inline-flex items-center gap-1.5">
                                            <Mail className="w-4 h-4 text-gray-400 group-hover:text-[#C9A24D] transition-colors" />
                                            Correo Electrónico
                                        </span>
                                        <span className="text-gray-800 font-semibold truncate">{user.email}</span>
                                    </div>

                                    <div className="flex flex-col group">
                                        <span className="text-sm text-gray-500 font-medium mb-1 inline-flex items-center gap-1.5">
                                            <Phone className="w-4 h-4 text-gray-400 group-hover:text-[#C9A24D] transition-colors" />
                                            Número de Teléfono
                                        </span>
                                        <span className="text-gray-800 font-semibold">{user.number || 'No especificado'}</span>
                                    </div>

                                    <div className="flex flex-col group">
                                        <span className="text-sm text-gray-500 font-medium mb-1 inline-flex items-center gap-1.5">
                                            <MapPin className="w-4 h-4 text-gray-400 group-hover:text-[#C9A24D] transition-colors" />
                                            Dirección
                                        </span>
                                        <span className="text-gray-800 font-semibold leading-relaxed">
                                            {user.address || 'No especificada'}
                                        </span>
                                    </div>
                                </div>
                            </div>

                        </div>

                        {/* Banner Inferior Informativo */}
                        <div className="mt-10 p-5 bg-[#F4F1EC] rounded-2xl border border-[#C9A24D]/20 flex items-start gap-4">
                            <div className="bg-white p-2 rounded-full shadow-sm flex-shrink-0">
                                <Shield className="w-6 h-6 text-[#1F140D]" />
                            </div>
                            <div>
                                <h4 className="text-[#1F140D] font-bold mb-1">Privacidad y Seguridad</h4>
                                <p className="text-gray-600 text-sm leading-relaxed">
                                    Tus datos personales están protegidos. HorseTrust utiliza esta información únicamente para facilitar tus transacciones y garantizar la seguridad de la comunidad.
                                </p>
                            </div>
                        </div>

                    </div>
                </div>
            </main>
        </div>
    );
}

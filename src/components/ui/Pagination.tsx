import React from 'react';
import { ChevronLeft, ChevronRight, MoreHorizontal } from 'lucide-react';

interface PaginationProps {
    totalPages: number;
    currentPage: number; // 0-indexed
    onPageChange: (page: number) => void;
    totalElements?: number;
    pageSize?: number;
}

export default function Pagination({
    totalPages,
    currentPage,
    onPageChange,
    totalElements,
    pageSize = 10
}: PaginationProps) {
    if (totalPages <= 1) return null;

    const renderPageNumbers = () => {
        const pages = [];
        const maxVisiblePages = 5;

        if (totalPages <= maxVisiblePages) {
            for (let i = 0; i < totalPages; i++) {
                pages.push(renderPageButton(i));
            }
        } else {
            // Logic for ellipsis
            // Always show first page
            pages.push(renderPageButton(0));

            const startPage = Math.max(1, currentPage - 1);
            const endPage = Math.min(totalPages - 2, currentPage + 1);

            if (startPage > 1) {
                pages.push(
                    <span key="ellipsis-1" className="px-2 py-2 text-gray-400">
                        <MoreHorizontal size={16} />
                    </span>
                );
            }

            for (let i = startPage; i <= endPage; i++) {
                pages.push(renderPageButton(i));
            }

            if (endPage < totalPages - 2) {
                pages.push(
                    <span key="ellipsis-2" className="px-2 py-2 text-gray-400">
                        <MoreHorizontal size={16} />
                    </span>
                );
            }

            // Always show last page
            pages.push(renderPageButton(totalPages - 1));
        }

        return pages;
    };

    const renderPageButton = (page: number) => {
        const isActive = page === currentPage;
        return (
            <button
                key={page}
                onClick={() => onPageChange(page)}
                className={`min-w-[40px] h-10 flex items-center justify-center rounded-lg text-sm font-medium transition-all duration-200 ${isActive
                    ? 'bg-[#C9A24D] text-white shadow-md shadow-[#C9A24D]/20'
                    : 'bg-white text-gray-600 hover:bg-gray-50 border border-gray-100 hover:border-[#C9A24D]/30'
                    }`}
                aria-current={isActive ? 'page' : undefined}
            >
                {page + 1}
            </button>
        );
    };

    return (
        <nav className="flex flex-col sm:flex-row items-center justify-between gap-4 mt-8 py-4 border-t border-gray-100">
            <div className="text-sm text-gray-500">
                {totalElements !== undefined && (
                    <span>
                        Mostrando <span className="font-semibold text-gray-900">{totalElements > 0 ? currentPage * pageSize + 1 : 0}</span> a{' '}
                        <span className="font-semibold text-gray-900">
                            {Math.min((currentPage + 1) * pageSize, totalElements)}
                        </span>{' '}
                        de <span className="font-semibold text-gray-900">{totalElements}</span> resultados
                    </span>
                )}
            </div>

            <div className="flex items-center gap-2">
                <button
                    onClick={() => onPageChange(currentPage - 1)}
                    disabled={currentPage === 0}
                    className="flex items-center justify-center w-10 h-10 rounded-lg bg-white text-gray-600 border border-gray-100 hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200 group"
                    aria-label="Página anterior"
                >
                    <ChevronLeft size={18} className="group-hover:-translate-x-0.5 transition-transform" />
                </button>

                <div className="flex items-center gap-1.5" aria-label="Navegación de páginas">
                    {renderPageNumbers()}
                </div>

                <button
                    onClick={() => onPageChange(currentPage + 1)}
                    disabled={currentPage === totalPages - 1}
                    className="flex items-center justify-center w-10 h-10 rounded-lg bg-white text-gray-600 border border-gray-100 hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200 group"
                    aria-label="Página siguiente"
                >
                    <ChevronRight size={18} className="group-hover:translate-x-0.5 transition-transform" />
                </button>
            </div>
        </nav>
    );
}

'use client';

import { useState, useEffect, useRef } from 'react';
import { useChat } from '@/service/hooks/useChat';
import { ChatMessage as ChatMessageType, MessageType } from '@/types/ChatMessage';

export interface ChatPanelProps {
    /** ID of the horse listing */
    horseId: string;

    /** Current user's username */
    currentUsername: string;

    /** Backend WebSocket URL (optional, defaults to localhost:8080) */
    backendUrl?: string;
}

/**
 * Premium chat panel component for HorseTrust platform
 * Displays real-time chat messages with a high-trust aesthetic
 */
export function ChatPanel({ horseId, currentUsername, backendUrl }: ChatPanelProps) {
    const [messageInput, setMessageInput] = useState('');
    const [hasJoined, setHasJoined] = useState(false);
    const messagesEndRef = useRef<HTMLDivElement>(null);

    const {
        messages,
        connectionState,
        error,
        sendMessage,
        joinChat,
        leaveChat,
    } = useChat(horseId, backendUrl);

    // Auto-join chat when connected
    useEffect(() => {
        if (connectionState === 'connected' && !hasJoined) {
            joinChat(currentUsername);
            setHasJoined(true);
        }
    }, [connectionState, hasJoined, currentUsername, joinChat]);

    // Auto-scroll to latest message
    useEffect(() => {
        messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    }, [messages]);

    // Handle send message
    const handleSendMessage = () => {
        const trimmed = messageInput.trim();
        if (!trimmed) return;

        sendMessage(trimmed);
        setMessageInput('');
    };

    // Handle Enter key
    const handleKeyPress = (e: React.KeyboardEvent) => {
        if (e.key === 'Enter' && !e.shiftKey) {
            e.preventDefault();
            handleSendMessage();
        }
    };

    // Format timestamp
    const formatTime = (timestamp: string) => {
        const date = new Date(timestamp);
        return date.toLocaleTimeString('es-AR', {
            hour: '2-digit',
            minute: '2-digit'
        });
    };

    // Render connection status
    const renderConnectionStatus = () => {
        const statusConfig = {
            disconnected: { text: 'Desconectado', color: 'bg-gray-400', icon: '○' },
            connecting: { text: 'Conectando...', color: 'bg-yellow-400', icon: '◐' },
            connected: { text: 'Conectado', color: 'bg-green-500', icon: '●' },
            error: { text: 'Error de conexión', color: 'bg-red-500', icon: '✕' },
        };

        const status = statusConfig[connectionState];

        return (
            <div className="flex items-center gap-2 px-4 py-2 bg-slate-50 border-b border-slate-200">
                <span className={`w-2 h-2 rounded-full ${status.color} animate-pulse`} />
                <span className="text-sm text-slate-600 font-medium">{status.text}</span>
            </div>
        );
    };

    // Render individual message
    const renderMessage = (msg: ChatMessageType, index: number) => {
        const isSystemMessage = msg.type === MessageType.JOIN || msg.type === MessageType.LEAVE;
        const isOwnMessage = msg.sender === currentUsername && msg.type === MessageType.CHAT;

        if (isSystemMessage) {
            return (
                <div key={index} className="flex justify-center my-3">
                    <div className="px-4 py-2 bg-blue-50 rounded-full border border-blue-100">
                        <p className="text-sm text-blue-700 font-medium">
                            {msg.content}
                        </p>
                    </div>
                </div>
            );
        }

        return (
            <div
                key={index}
                className={`flex ${isOwnMessage ? 'justify-end' : 'justify-start'} mb-4`}
            >
                <div className={`max-w-[70%] ${isOwnMessage ? 'items-end' : 'items-start'} flex flex-col gap-1`}>
                    {!isOwnMessage && (
                        <span className="text-xs font-semibold text-slate-700 px-2">
                            {msg.sender}
                        </span>
                    )}
                    <div
                        className={`px-4 py-3 rounded-2xl shadow-sm ${isOwnMessage
                            ? 'bg-blue-600 text-white rounded-br-md'
                            : 'bg-white text-slate-800 border border-slate-200 rounded-bl-md'
                            }`}
                    >
                        <p className="text-sm leading-relaxed break-words">{msg.content}</p>
                    </div>
                    <span className={`text-xs text-slate-400 px-2`}>
                        {formatTime(msg.timestamp)}
                    </span>
                </div>
            </div>
        );
    };

    return (
        <div className="flex flex-col h-full max-h-[600px] bg-white rounded-xl shadow-lg border border-slate-200 overflow-hidden">
            {/* Header */}
            <div className="px-6 py-4 bg-gradient-to-r from-blue-600 to-blue-700 text-white">
                <h2 className="text-lg font-bold">Chat en Vivo</h2>
                <p className="text-sm text-blue-100">Conversación sobre este caballo</p>
            </div>

            {/* Connection Status */}
            {renderConnectionStatus()}

            {/* Error Banner */}
            {error && (
                <div className="px-4 py-3 bg-red-50 border-b border-red-200">
                    <div className="flex items-start gap-2">
                        <span className="text-red-600 font-bold">⚠</span>
                        <div className="flex-1">
                            <p className="text-sm text-red-800 font-medium">{error}</p>
                        </div>
                    </div>
                </div>
            )}

            {/* Messages Area */}
            <div className="flex-1 overflow-y-auto px-4 py-4 bg-slate-50">
                {connectionState === 'connecting' && (
                    <div className="flex flex-col items-center justify-center h-full gap-4">
                        <div className="w-12 h-12 border-4 border-blue-200 border-t-blue-600 rounded-full animate-spin" />
                        <p className="text-slate-500 font-medium">Conectando al chat...</p>
                    </div>
                )}

                {connectionState === 'error' && (
                    <div className="flex flex-col items-center justify-center h-full gap-4 text-center px-6">
                        <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center">
                            <span className="text-3xl text-red-600">✕</span>
                        </div>
                        <div>
                            <p className="text-slate-700 font-semibold mb-2">No se pudo conectar</p>
                            <p className="text-sm text-slate-500">
                                Verifica que el servidor esté funcionando e intenta nuevamente.
                            </p>
                        </div>
                    </div>
                )}

                {connectionState === 'connected' && messages.length === 0 && (
                    <div className="flex flex-col items-center justify-center h-full gap-4 text-center px-6">
                        <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center">
                            <span className="text-3xl">💬</span>
                        </div>
                        <div>
                            <p className="text-slate-700 font-semibold mb-2">No hay mensajes aún</p>
                            <p className="text-sm text-slate-500">
                                Sé el primero en iniciar la conversación
                            </p>
                        </div>
                    </div>
                )}

                {connectionState === 'connected' && messages.length > 0 && (
                    <>
                        {messages.map((msg, index) => renderMessage(msg, index))}
                        <div ref={messagesEndRef} />
                    </>
                )}
            </div>

            {/* Input Area */}
            <div className="px-4 py-4 bg-white border-t border-slate-200">
                <div className="flex gap-2">
                    <input
                        type="text"
                        value={messageInput}
                        onChange={(e) => setMessageInput(e.target.value)}
                        onKeyPress={handleKeyPress}
                        placeholder="Escribe un mensaje..."
                        disabled={connectionState !== 'connected'}
                        maxLength={1000}
                        className="flex-1 px-4 py-3 bg-slate-50 border border-slate-300 rounded-lg 
                     focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent
                     disabled:bg-slate-100 disabled:text-slate-400 disabled:cursor-not-allowed
                     text-sm transition-all"
                        aria-label="Mensaje de chat"
                    />
                    <button
                        onClick={handleSendMessage}
                        disabled={connectionState !== 'connected' || !messageInput.trim()}
                        className="px-6 py-3 bg-blue-600 text-white font-semibold rounded-lg
                     hover:bg-blue-700 active:bg-blue-800
                     disabled:bg-slate-300 disabled:cursor-not-allowed
                     transition-all duration-200 shadow-sm hover:shadow-md
                     focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
                        aria-label="Enviar mensaje"
                    >
                        Enviar
                    </button>
                </div>
                <p className="text-xs text-slate-400 mt-2">
                    Presiona Enter para enviar • {messageInput.length}/1000 caracteres
                </p>
            </div>
        </div>
    );
}

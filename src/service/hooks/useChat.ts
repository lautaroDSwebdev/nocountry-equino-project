import { useEffect, useRef, useState, useCallback } from 'react';
import { Client, IMessage } from '@stomp/stompjs';
import SockJS from 'sockjs-client';
import { ChatMessage, MessageType, createChatMessage } from '@/types/ChatMessage';

/**
 * Connection states for the WebSocket chat
 */
export type ConnectionState = 'disconnected' | 'connecting' | 'connected' | 'error';

/**
 * Return type for the useChat hook
 */
export interface UseChatReturn {
    /** Array of all received messages */
    messages: ChatMessage[];

    /** Current WebSocket connection state */
    connectionState: ConnectionState;

    /** Error message if connection failed */
    error: string | null;

    /** Send a chat message */
    sendMessage: (content: string) => void;

    /** Join the chat room */
    joinChat: (username: string) => void;

    /** Leave the chat room */
    leaveChat: () => void;

    /** Clear all messages */
    clearMessages: () => void;
}

/**
 * Custom hook to manage WebSocket chat connection using STOMP over SockJS
 * 
 * @param horseId - ID of the horse listing for this chat
 * @param backendUrl - Backend WebSocket URL (default: http://localhost:8080)
 * @returns Chat state and control functions
 */
export function useChat(
    horseId: string,
    backendUrl: string = 'http://localhost:8080'
): UseChatReturn {
    const [messages, setMessages] = useState<ChatMessage[]>([]);
    const [connectionState, setConnectionState] = useState<ConnectionState>('disconnected');
    const [error, setError] = useState<string | null>(null);

    const stompClientRef = useRef<Client | null>(null);
    const currentUsernameRef = useRef<string | null>(null);

    /**
     * Connect to WebSocket and subscribe to messages
     */
    const connect = useCallback(() => {
        if (stompClientRef.current?.connected) {
            return; // Already connected
        }

        setConnectionState('connecting');
        setError(null);

        try {
            // Create STOMP client with SockJS
            const client = new Client({
                webSocketFactory: () => new SockJS(`${backendUrl}/ws-horse`),

                // Connection callbacks
                onConnect: () => {
                    console.log('WebSocket connected');
                    setConnectionState('connected');
                    setError(null);

                    // Subscribe to public topic for all messages
                    client.subscribe('/topic/public', (message: IMessage) => {
                        try {
                            const chatMessage: ChatMessage = JSON.parse(message.body);
                            setMessages((prev) => [...prev, chatMessage]);
                        } catch (err) {
                            console.error('Error parsing message:', err);
                        }
                    });
                },

                onStompError: (frame) => {
                    console.error('STOMP error:', frame);
                    setConnectionState('error');
                    setError(`Error de conexión: ${frame.headers['message'] || 'Error desconocido'}`);
                },

                onWebSocketError: (event) => {
                    console.error('WebSocket error:', event);
                    setConnectionState('error');
                    setError('Error de conexión WebSocket');
                },

                onDisconnect: () => {
                    console.log('WebSocket disconnected');
                    setConnectionState('disconnected');
                },

                // Reconnect configuration
                reconnectDelay: 5000,
                heartbeatIncoming: 4000,
                heartbeatOutgoing: 4000,
            });

            stompClientRef.current = client;
            client.activate();
        } catch (err) {
            console.error('Error creating WebSocket connection:', err);
            setConnectionState('error');
            setError('No se pudo establecer la conexión');
        }
    }, [backendUrl]);

    /**
     * Disconnect from WebSocket
     */
    const disconnect = useCallback(() => {
        if (stompClientRef.current) {
            stompClientRef.current.deactivate();
            stompClientRef.current = null;
        }
        setConnectionState('disconnected');
    }, []);

    /**
     * Send a chat message
     */
    const sendMessage = useCallback((content: string) => {
        if (!stompClientRef.current?.connected) {
            setError('No hay conexión activa');
            return;
        }

        if (!currentUsernameRef.current) {
            setError('Debes unirte al chat primero');
            return;
        }

        // Validate message content
        const trimmedContent = content.trim();
        if (!trimmedContent) {
            setError('El mensaje no puede estar vacío');
            return;
        }

        if (trimmedContent.length > 1000) {
            setError('El mensaje no puede exceder 1000 caracteres');
            return;
        }

        try {
            const message = createChatMessage(
                currentUsernameRef.current,
                trimmedContent,
                horseId,
                MessageType.CHAT
            );

            stompClientRef.current.publish({
                destination: '/app/chat.sendMessage',
                body: JSON.stringify(message),
            });

            setError(null);
        } catch (err) {
            console.error('Error sending message:', err);
            setError('Error al enviar el mensaje');
        }
    }, [horseId]);

    /**
     * Join the chat room
     */
    const joinChat = useCallback((username: string) => {
        if (!stompClientRef.current?.connected) {
            setError('No hay conexión activa');
            return;
        }

        const trimmedUsername = username.trim();
        if (!trimmedUsername) {
            setError('El nombre de usuario no puede estar vacío');
            return;
        }

        if (trimmedUsername.length > 100) {
            setError('El nombre de usuario no puede exceder 100 caracteres');
            return;
        }

        try {
            currentUsernameRef.current = trimmedUsername;

            const joinMessage = createChatMessage(
                trimmedUsername,
                `${trimmedUsername} se unió al chat`,
                horseId,
                MessageType.JOIN
            );

            stompClientRef.current.publish({
                destination: '/app/chat.addUser',
                body: JSON.stringify(joinMessage),
            });

            setError(null);
        } catch (err) {
            console.error('Error joining chat:', err);
            setError('Error al unirse al chat');
        }
    }, [horseId]);

    /**
     * Leave the chat room
     */
    const leaveChat = useCallback(() => {
        if (!stompClientRef.current?.connected || !currentUsernameRef.current) {
            return;
        }

        try {
            const leaveMessage = createChatMessage(
                currentUsernameRef.current,
                `${currentUsernameRef.current} salió del chat`,
                horseId,
                MessageType.LEAVE
            );

            stompClientRef.current.publish({
                destination: '/app/chat.sendMessage',
                body: JSON.stringify(leaveMessage),
            });

            currentUsernameRef.current = null;
        } catch (err) {
            console.error('Error leaving chat:', err);
        }
    }, [horseId]);

    /**
     * Clear all messages
     */
    const clearMessages = useCallback(() => {
        setMessages([]);
    }, []);

    // Connect on mount, disconnect on unmount
    useEffect(() => {
        connect();

        return () => {
            leaveChat();
            disconnect();
        };
    }, [connect, disconnect, leaveChat]);

    return {
        messages,
        connectionState,
        error,
        sendMessage,
        joinChat,
        leaveChat,
        clearMessages,
    };
}

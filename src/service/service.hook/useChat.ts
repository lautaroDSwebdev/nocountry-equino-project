import { useEffect, useRef, useState, useCallback } from 'react';
import { Client, IMessage } from '@stomp/stompjs';
import SockJS from 'sockjs-client';
import { ChatMessage, MessageType, createChatMessage } from '@/types/ChatMessage';

/**
 * Estados de conexión para el chat WebSocket
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


export function useChat(
    horseId: string,
    backendUrl: string = 'http://localhost:8080'
): UseChatReturn {
    const [messages, setMessages] = useState<ChatMessage[]>([]);
    const [connectionState, setConnectionState] = useState<ConnectionState>('disconnected');
    const [error, setError] = useState<string | null>(null);

    const stompClientRef = useRef<Client | null>(null);
    const currentUsernameRef = useRef<string | null>(null);



    const connect = useCallback(() => {
        if (stompClientRef.current?.connected) {
            return; //ya esta conectado
        }

        setConnectionState('connecting');
        setError(null);

        try {
            // Create STOMP client with SockJS
            const client = new Client({
                webSocketFactory: () => new SockJS(`${backendUrl}/ws-horse`),

                // Callbacks de conexión
                onConnect: () => {
                    console.log('WebSocket connected');
                    setConnectionState('connected');
                    setError(null);

                    // Suscribirse al topic público para todos los mensajes
                    client.subscribe('/topic/public', (message: IMessage) => {
                        try {
                            const chatMessage: ChatMessage = JSON.parse(message.body);
                            // Only append the message if it belongs to the current horse context session
                            if (chatMessage.horseId === horseId) {
                                setMessages((prev) => [...prev, chatMessage]);
                            }
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

                // Configuración de reconexión
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
     * Desconectar del WebSocket
     */
    const disconnect = useCallback(() => {
        if (stompClientRef.current) {
            stompClientRef.current.deactivate();
            stompClientRef.current = null;
        }
        setConnectionState('disconnected');
    }, []);

    /**
     * Enviar un mensaje
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

        // Validar contenido del mensaje
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
     * Unirse al chat
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
     * Salir del chat
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
     * Limpiar todos los mensajes
     */
    const clearMessages = useCallback(() => {
        setMessages([]);
    }, []);

    // Connect al entrar, disconnect al salir
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

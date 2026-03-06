/**
 * Enum for message types in the chat system
 * Matches the backend MessageType enum
 */
export enum MessageType {
    CHAT = 'CHAT',
    JOIN = 'JOIN',
    LEAVE = 'LEAVE'
}

/**
 * Chat message interface matching the backend ChatMessage record
 * Used for WebSocket communication via STOMP
 */
export interface ChatMessage {
    /** Username or ID of the message sender */
    sender: string;

    /** Text content of the message (max 1000 characters) */
    content: string;

    /** ID of the horse listing this chat is associated with */
    horseId: string;

    /** Type of message (CHAT, JOIN, or LEAVE) */
    type: MessageType;

    /** ISO timestamp string from backend LocalDateTime */
    timestamp: string;
}

/**
 * Helper function to create a new chat message
 */
export function createChatMessage(
    sender: string,
    content: string,
    horseId: string,
    type: MessageType = MessageType.CHAT
): Omit<ChatMessage, 'timestamp'> {
    return {
        sender,
        content,
        horseId,
        type
    };
}

/**
 * Helper function to parse timestamp from backend
 */
export function parseMessageTimestamp(timestamp: string): Date {
    return new Date(timestamp);
}

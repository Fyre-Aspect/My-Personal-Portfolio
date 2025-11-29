// Chat Types for Gemini AI Chatbot

export type ChatMode = 'tour' | 'chat';

export type MessageRole = 'user' | 'assistant' | 'system';

export interface ChatMessage {
  id: string;
  role: MessageRole;
  content: string;
  timestamp: Date;
}

export interface ChatRequest {
  messages: ChatMessage[];
  mode: ChatMode;
}

export interface ChatResponse {
  message: string;
  error?: string;
}

export interface ChatState {
  messages: ChatMessage[];
  mode: ChatMode;
  isOpen: boolean;
  isLoading: boolean;
  error: string | null;
}

// Helper to generate unique message IDs
export const generateMessageId = (): string => {
  return `msg_${Date.now()}_${Math.random().toString(36).substring(2, 9)}`;
};

// Helper to create a new message
export const createMessage = (
  role: MessageRole,
  content: string
): ChatMessage => ({
  id: generateMessageId(),
  role,
  content,
  timestamp: new Date(),
});

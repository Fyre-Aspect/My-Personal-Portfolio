'use client';

import { useState, useCallback, useRef } from 'react';
import { ChatMessage, ChatMode, createMessage } from '@/types/chat';

interface UseChatReturn {
  messages: ChatMessage[];
  mode: ChatMode;
  isLoading: boolean;
  error: string | null;
  sendMessage: (content: string) => Promise<void>;
  setMode: (mode: ChatMode) => void;
  startTour: () => void;
  clearChat: () => void;
}

export function useChat(): UseChatReturn {
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [mode, setModeState] = useState<ChatMode>('chat');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const abortControllerRef = useRef<AbortController | null>(null);

  const sendMessage = useCallback(async (content: string) => {
    if (!content.trim() || isLoading) return;

    setError(null);
    setIsLoading(true);

    // Add user message
    const userMessage = createMessage('user', content);
    setMessages((prev) => [...prev, userMessage]);

    // Create placeholder for assistant response
    const assistantMessage = createMessage('assistant', '');
    setMessages((prev) => [...prev, assistantMessage]);

    try {
      // Cancel any previous request
      if (abortControllerRef.current) {
        abortControllerRef.current.abort();
      }
      abortControllerRef.current = new AbortController();

      const response = await fetch('/api/chat', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          messages: [...messages, userMessage],
          mode,
        }),
        signal: abortControllerRef.current.signal,
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || 'Failed to get response');
      }

      // Handle streaming response
      const reader = response.body?.getReader();
      const decoder = new TextDecoder();

      if (!reader) {
        throw new Error('No response body');
      }

      let fullContent = '';

      while (true) {
        const { done, value } = await reader.read();
        
        if (done) break;

        const chunk = decoder.decode(value, { stream: true });
        fullContent += chunk;

        // Update the assistant message with streamed content
        setMessages((prev) =>
          prev.map((msg) =>
            msg.id === assistantMessage.id
              ? { ...msg, content: fullContent }
              : msg
          )
        );
      }
    } catch (err) {
      if (err instanceof Error && err.name === 'AbortError') {
        return; // Request was cancelled, ignore
      }

      const errorMessage = err instanceof Error ? err.message : 'An error occurred';
      setError(errorMessage);

      // Remove the empty assistant message on error
      setMessages((prev) =>
        prev.filter((msg) => msg.id !== assistantMessage.id)
      );
    } finally {
      setIsLoading(false);
    }
  }, [messages, mode, isLoading]);

  const setMode = useCallback((newMode: ChatMode) => {
    setModeState(newMode);
    setMessages([]);
    setError(null);
  }, []);

  const startTour = useCallback(() => {
    setMode('tour');
    // Automatically send a tour start message
    setTimeout(() => {
      sendMessage("Hi! I'd like to take a guided tour of Aamir's portfolio.");
    }, 100);
  }, [setMode, sendMessage]);

  const clearChat = useCallback(() => {
    setMessages([]);
    setError(null);
  }, []);

  return {
    messages,
    mode,
    isLoading,
    error,
    sendMessage,
    setMode,
    startTour,
    clearChat,
  };
}

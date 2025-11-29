'use client';

import { useState, useRef, useEffect, FormEvent, KeyboardEvent } from 'react';
import { useRouter } from 'next/navigation';
import { useChat } from '@/hooks/useChat';
import { ChatMode } from '@/types/chat';

interface ChatPanelProps {
  isOpen: boolean;
  onClose: () => void;
}

// Helper to parse navigation tag
const parseMessageContent = (content: string) => {
  const navMatch = content.match(/{{BUTTON:\s*([^}]+)}}/);
  const cleanContent = content.replace(/{{BUTTON:\s*[^}]+}}/, '').trim();
  return { cleanContent, navPath: navMatch ? navMatch[1].trim() : null };
};

export default function ChatPanel({ isOpen, onClose }: ChatPanelProps) {
  const router = useRouter();
  const {
    messages,
    mode,
    isLoading,
    error,
    sendMessage,
    setMode,
    startTour,
    clearChat,
  } = useChat();

  const [inputValue, setInputValue] = useState('');
  const [hasStarted, setHasStarted] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLTextAreaElement>(null);

  // Auto-scroll to bottom when new messages arrive
  useEffect(() => {
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  }, [messages]);

  // Focus input when panel opens
  useEffect(() => {
    if (isOpen && hasStarted && inputRef.current) {
      inputRef.current.focus();
    }
  }, [isOpen, hasStarted]);

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    if (inputValue.trim() && !isLoading) {
      sendMessage(inputValue.trim());
      setInputValue('');
    }
  };

  const handleKeyDown = (e: KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSubmit(e as unknown as FormEvent);
    }
  };

  const handleStartTour = () => {
    setHasStarted(true);
    startTour();
  };

  const handleStartChat = () => {
    setHasStarted(true);
    setMode('chat');
  };

  const handleModeSwitch = (newMode: ChatMode) => {
    setMode(newMode);
    if (newMode === 'tour') {
      startTour();
    }
  };

  const handleReset = () => {
    setHasStarted(false);
    clearChat();
  };

  return (
    <div className={`chat-panel ${isOpen ? 'chat-panel--open' : ''}`}>
      {/* Header */}
      <div className="chat-header">
        <div className="chat-header__info">
          <div className="chat-header__avatar">
            <span>AT</span>
          </div>
          <div className="chat-header__text">
            <h3 className="chat-header__title">Aamir&apos;s AI Assistant</h3>
            <span className="chat-header__status">
              {isLoading ? 'Typing...' : 'Online'}
            </span>
          </div>
        </div>
        <div className="chat-header__actions">
          {hasStarted && (
            <button
              className="chat-header__btn"
              onClick={handleReset}
              title="Reset chat"
            >
              <svg
                width="18"
                height="18"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="M3 12a9 9 0 1 0 9-9 9.75 9.75 0 0 0-6.74 2.74L3 8" />
                <path d="M3 3v5h5" />
              </svg>
            </button>
          )}
          <button
            className="chat-header__btn chat-header__btn--close"
            onClick={onClose}
            title="Close chat"
          >
            <svg
              width="18"
              height="18"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <line x1="18" y1="6" x2="6" y2="18" />
              <line x1="6" y1="6" x2="18" y2="18" />
            </svg>
          </button>
        </div>
      </div>

      {/* Content */}
      <div className="chat-content">
        {!hasStarted ? (
          // Welcome Screen
          <div className="chat-welcome">
            <div className="chat-welcome__icon">
              <svg
                width="48"
                height="48"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="M12 2L2 7l10 5 10-5-10-5z" />
                <path d="M2 17l10 5 10-5" />
                <path d="M2 12l10 5 10-5" />
              </svg>
            </div>
            <h4 className="chat-welcome__title">Welcome to my Portfolio!</h4>
            <p className="chat-welcome__text">
              I&apos;m an AI assistant that knows all about Aamir&apos;s work,
              projects, and experience. How would you like to explore?
            </p>
            <div className="chat-welcome__buttons">
              <button
                className="chat-btn chat-btn--primary"
                onClick={handleStartTour}
              >
                <svg
                  width="18"
                  height="18"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <circle cx="12" cy="12" r="10" />
                  <polygon points="10 8 16 12 10 16 10 8" />
                </svg>
                Take a Guided Tour
              </button>
              <button
                className="chat-btn chat-btn--secondary"
                onClick={handleStartChat}
              >
                <svg
                  width="18"
                  height="18"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
                </svg>
                Chat with me
              </button>
            </div>
          </div>
        ) : (
          // Chat Messages
          <>
            {/* Mode Toggle */}
            <div className="chat-mode-toggle">
              <button
                className={`chat-mode-btn ${mode === 'tour' ? 'chat-mode-btn--active' : ''}`}
                onClick={() => handleModeSwitch('tour')}
              >
                Tour Mode
              </button>
              <button
                className={`chat-mode-btn ${mode === 'chat' ? 'chat-mode-btn--active' : ''}`}
                onClick={() => handleModeSwitch('chat')}
              >
                Chat Mode
              </button>
            </div>

            {/* Messages List */}
            <div className="chat-messages">
              {messages.length === 0 && mode === 'chat' && (
                <div className="chat-empty">
                  <p>Ask me anything about Aamir&apos;s work, projects, or experience!</p>
                </div>
              )}
              {messages.map((message) => {
                const { cleanContent, navPath } = parseMessageContent(message.content);
                return (
                  <div
                    key={message.id}
                    className={`chat-message chat-message--${message.role}`}
                  >
                    {message.role === 'assistant' && (
                      <div className="chat-message__avatar">
                        <span>AT</span>
                      </div>
                    )}
                    <div className="chat-message__bubble">
                      <p 
                        className="chat-message__text"
                        dangerouslySetInnerHTML={{ 
                          __html: cleanContent || '<span class="chat-typing"><span></span><span></span><span></span></span>' 
                        }}
                      />
                      {navPath && (
                        <button
                          className="chat-nav-btn"
                          onClick={() => {
                            router.push(navPath);
                            // Trigger next step
                            const nextStepMap: Record<string, string> = {
                              '/projects': "I'm ready to see the projects.",
                              '/activities': "I'm ready to see the experiences.",
                              '/achievements': "I'm ready to see the achievements.",
                              '/contact': "I'm ready to see the contact info.",
                              '/': "Thanks for the tour!"
                            };
                            const msg = nextStepMap[navPath] || "Continue tour.";
                            sendMessage(msg);
                          }}
                        >
                          Continue Tour →
                        </button>
                      )}
                    </div>
                  </div>
                );
              })}
              {error && (
                <div className="chat-error">
                  <p>{error}</p>
                </div>
              )}
              <div ref={messagesEndRef} />
            </div>
          </>
        )}
      </div>

      {/* Input */}
      {hasStarted && (
        <form className="chat-input-container" onSubmit={handleSubmit}>
          <textarea
            ref={inputRef}
            className="chat-input"
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            onKeyDown={handleKeyDown}
            placeholder="Type your message..."
            rows={1}
            disabled={isLoading}
          />
          <button
            type="submit"
            className="chat-send-btn"
            disabled={!inputValue.trim() || isLoading}
            title="Send message"
          >
            <svg
              width="20"
              height="20"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <line x1="22" y1="2" x2="11" y2="13" />
              <polygon points="22 2 15 22 11 13 2 9 22 2" />
            </svg>
          </button>
        </form>
      )}
    </div>
  );
}

"use client";

import { cn } from "@/lib/utils";
import { motion, useReducedMotion, AnimatePresence } from "framer-motion";
import { useState, useRef, useEffect, KeyboardEvent } from "react";

export interface PromptDockProps {
  // Event handlers
  onMessageSend?: (message: string) => Promise<string> | void;
  onTourStart?: () => void;
  
  // Response state
  response?: string;
  isLoading?: boolean;
  
  // Styling & layout
  className?: string;
  position?: "bottom" | "top";
  
  // Animation settings
  enableAnimations?: boolean;
  
  // UI customization
  placeholder?: string;
  tourButtonLabel?: string;
  icon?: string;
  iconBackgroundColor?: string;
  gradientColors?: string;
  theme?: "light" | "dark";
  
  // Advanced settings
  autoFocus?: boolean;
  closeOnClickOutside?: boolean;
  closeOnEscape?: boolean;
}

export function PromptDock({
  onMessageSend,
  onTourStart,
  response,
  isLoading = false,
  className,
  position = "bottom",
  enableAnimations = true,
  placeholder = "Send a message...",
  tourButtonLabel = "Guided Tour",
  icon = "🦄",
  iconBackgroundColor = "bg-purple-300",
  gradientColors = "#c084fc, #f3e8ff",
  theme = "dark",
  autoFocus = false,
  closeOnClickOutside = true,
  closeOnEscape = true,
}: PromptDockProps) {
  const shouldReduceMotion = useReducedMotion();
  const [messageInput, setMessageInput] = useState("");
  const [showResponse, setShowResponse] = useState(false);
  const [localResponse, setLocalResponse] = useState<string>("");
  const dockRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  // Click outside handler
  useEffect(() => {
    if (!closeOnClickOutside) return;
    
    const handleClickOutside = (event: MouseEvent) => {
      if (dockRef.current && !dockRef.current.contains(event.target as Node)) {
        setShowResponse(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [closeOnClickOutside]);

  // Update local response when prop changes
  useEffect(() => {
    if (response) {
      setLocalResponse(response);
      setShowResponse(true);
    }
  }, [response]);

  const containerVariants = {
    hidden: {
      opacity: 0,
      y: 100,
      scale: 0.8,
    },
    visible: {
      opacity: 1,
      y: 0,
      scale: 1,
      transition: {
        type: "spring",
        stiffness: 300,
        damping: 30,
        mass: 0.8,
      },
    },
  };

  const handleSendMessage = async () => {
    if (messageInput.trim() && !isLoading) {
      const result = onMessageSend?.(messageInput.trim());
      if (result instanceof Promise) {
        const responseText = await result;
        if (responseText) {
          setLocalResponse(responseText);
          setShowResponse(true);
        }
      }
      setMessageInput("");
    }
  };

  const handleKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
    if (e.key === "Escape" && closeOnEscape) {
      setShowResponse(false);
    }
  };

  const positionClasses = position === "top" 
    ? "fixed top-6 left-1/2 -translate-x-1/2 z-50"
    : "fixed bottom-6 left-1/2 -translate-x-1/2 z-50";

  const bgColor = theme === "dark" ? "#1f2937" : "#ffffff";
  const textColor = theme === "dark" ? "text-gray-100" : "text-gray-700";
  const placeholderColor = theme === "dark" ? "placeholder-gray-400" : "placeholder-gray-500";

  return (
    <motion.div
      ref={dockRef}
      className={cn(positionClasses, "flex items-center gap-3", className)}
      initial={enableAnimations ? "hidden" : "visible"}
      animate="visible"
      variants={enableAnimations ? containerVariants : {}}
    >
      {/* Main Prompt Dock */}
      <motion.div
        className="relative"
        layout
      >
        {/* Response popup - appears above the dock */}
        <AnimatePresence>
          {showResponse && localResponse && (
            <motion.div
              className={cn(
                "absolute bottom-full left-0 right-0 mb-3 p-4 rounded-2xl shadow-xl border max-w-md",
                theme === "dark" 
                  ? "bg-gray-800 border-gray-700 text-gray-100" 
                  : "bg-white border-gray-200 text-gray-700"
              )}
              initial={{ opacity: 0, y: 10, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 10, scale: 0.95 }}
              transition={{ type: "spring", stiffness: 400, damping: 30 }}
            >
              <p className="text-sm leading-relaxed">{localResponse}</p>
              <button
                onClick={() => setShowResponse(false)}
                className={cn(
                  "absolute top-2 right-2 w-6 h-6 rounded-full flex items-center justify-center transition-colors",
                  theme === "dark" ? "hover:bg-gray-700" : "hover:bg-gray-100"
                )}
              >
                <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <line x1="18" y1="6" x2="6" y2="18" />
                  <line x1="6" y1="6" x2="18" y2="18" />
                </svg>
              </button>
            </motion.div>
          )}
        </AnimatePresence>

        {/* The dock bar */}
        <motion.div
          className="rounded-full px-3 py-2 shadow-2xl border border-gray-700/50 flex items-center gap-3"
          style={{
            background: `linear-gradient(to right, ${gradientColors})`,
            minWidth: 400,
          }}
        >
          {/* Icon with online indicator */}
          <div className="relative flex-shrink-0">
            <div className={cn(
              "w-10 h-10 rounded-full flex items-center justify-center text-xl",
              iconBackgroundColor
            )}>
              <span>{icon}</span>
            </div>
            {/* Online indicator */}
            <div className="absolute bottom-0 right-0 w-3 h-3 bg-green-500 border-2 border-white rounded-full" />
          </div>

          {/* Text input */}
          <input
            ref={inputRef}
            type="text"
            value={messageInput}
            onChange={(e) => setMessageInput(e.target.value)}
            onKeyDown={handleKeyDown}
            placeholder={placeholder}
            className={cn(
              "flex-1 bg-transparent border-none outline-none text-sm font-medium min-w-0",
              textColor,
              placeholderColor
            )}
            autoFocus={autoFocus}
            disabled={isLoading}
          />

          {/* Send button */}
          <motion.button
            onClick={handleSendMessage}
            className={cn(
              "w-9 h-9 rounded-full flex items-center justify-center transition-colors cursor-pointer flex-shrink-0",
              "bg-white/20 hover:bg-white/30 disabled:opacity-50"
            )}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            disabled={!messageInput.trim() || isLoading}
          >
            {isLoading ? (
              <motion.svg
                className="animate-spin"
                width="16"
                height="16"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
              >
                <circle cx="12" cy="12" r="10" strokeOpacity="0.25" />
                <path d="M12 2a10 10 0 0 1 10 10" strokeOpacity="1" />
              </motion.svg>
            ) : (
              <svg
                width="16"
                height="16"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                className="text-gray-700"
              >
                <path d="m22 2-7 20-4-9-9-4z" />
                <path d="M22 2 11 13" />
              </svg>
            )}
          </motion.button>
        </motion.div>
      </motion.div>

      {/* Guided Tour Button - separate from the dock */}
      <motion.button
        className={cn(
          "flex items-center gap-2 px-4 py-3 rounded-full cursor-pointer transition-colors shadow-2xl",
          "bg-gradient-to-r from-indigo-500 to-purple-500 hover:from-indigo-600 hover:to-purple-600 text-white"
        )}
        onClick={onTourStart}
        whileHover={{
          scale: 1.03,
          transition: { type: "spring", stiffness: 400, damping: 25 },
        }}
        whileTap={{ scale: 0.97 }}
        aria-label={tourButtonLabel}
        initial={enableAnimations ? { opacity: 0, x: 20 } : {}}
        animate={{ opacity: 1, x: 0 }}
        transition={{ delay: 0.2, type: "spring", stiffness: 300, damping: 30 }}
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
          <polygon points="16.24 7.76 14.12 14.12 7.76 16.24 9.88 9.88 16.24 7.76" fill="currentColor" />
        </svg>
        <span className="text-sm font-medium whitespace-nowrap">{tourButtonLabel}</span>
      </motion.button>
    </motion.div>
  );
}

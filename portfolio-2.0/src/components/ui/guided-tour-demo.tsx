"use client";

import { PromptDock } from "@/components/ui/guided-tour-dock";
import { useState } from "react";

export default function PromptDockDemo() {
  const [response, setResponse] = useState<string>("");
  const [isLoading, setIsLoading] = useState(false);

  const handleMessageSend = async (message: string): Promise<string> => {
    setIsLoading(true);
    
    // Simulate API call - replace with your actual API
    // No chat history context - just single question/response to save tokens
    try {
      // Example: call your Gemini API endpoint
      // const res = await fetch('/api/chat', { 
      //   method: 'POST', 
      //   body: JSON.stringify({ message }) 
      // });
      // const data = await res.json();
      // return data.response;

      // Simulated response for demo
      await new Promise(resolve => setTimeout(resolve, 1000));
      const mockResponse = `Here's what I know about "${message}": This is a demo response. Connect this to your AI API for real responses!`;
      setResponse(mockResponse);
      return mockResponse;
    } finally {
      setIsLoading(false);
    }
  };

  const handleTourStart = () => {
    console.log("Guided Tour started!");
    // Open your existing ChatWidget in tour mode
    // Example: setIsChatOpen(true); startTour();
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-900">
      <PromptDock 
        onMessageSend={handleMessageSend}
        onTourStart={handleTourStart}
        response={response}
        isLoading={isLoading}
        placeholder="Send a message to Unicorn..."
        tourButtonLabel="Guided Tour"
        icon="🦄"
        iconBackgroundColor="bg-purple-300"
        gradientColors="#c084fc, #f3e8ff"
        theme="dark"
        position="bottom"
        enableAnimations={true}
      />
    </div>
  );
}

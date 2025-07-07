"use client";

import React, { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  ChatBubbleLeftRightIcon,
  PaperAirplaneIcon,
  XMarkIcon,
  ComputerDesktopIcon,
  UserIcon,
  SparklesIcon,
} from "@heroicons/react/24/outline";

interface ChatMessage {
  id: string;
  message: string;
  isUser: boolean;
  timestamp: Date;
  sources?: any[];
  confidence?: number;
  suggestedQuestions?: string[];
}

interface ChatbotResponse {
  response: string;
  sources: any[];
  conversation_id: string;
  timestamp: string;
  confidence: number;
  suggested_questions: string[];
}

const PortfolioChatbot: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [inputMessage, setInputMessage] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [conversationId, setConversationId] = useState<string | null>(null);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  // Auto-scroll to bottom of messages
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  // Focus input when chatbot opens
  useEffect(() => {
    if (isOpen && inputRef.current) {
      setTimeout(() => inputRef.current?.focus(), 100);
    }
  }, [isOpen]);

  // Initialize chatbot with welcome message
  useEffect(() => {
    if (isOpen && messages.length === 0) {
      const welcomeMessage: ChatMessage = {
        id: "welcome",
        message:
          "Hi! I'm Hunter's AI assistant. I can help you learn about his projects, skills, experience, and how to contact him. What would you like to know?",
        isUser: false,
        timestamp: new Date(),
        suggestedQuestions: [
          "What projects has Hunter worked on?",
          "What are Hunter's technical skills?",
          "How can I contact Hunter?",
          "Tell me about Hunter's education",
        ],
      };
      setMessages([welcomeMessage]);
    }
  }, [isOpen, messages.length]);

  const sendMessage = async (messageText?: string) => {
    const text = messageText || inputMessage.trim();
    if (!text || isLoading) return;

    const userMessage: ChatMessage = {
      id: `user-${Date.now()}`,
      message: text,
      isUser: true,
      timestamp: new Date(),
    };

    setMessages((prev) => [...prev, userMessage]);
    setInputMessage("");
    setIsLoading(true);

    try {
      const response = await fetch("/api/chat", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          message: text,
          conversation_id: conversationId,
        }),
      });

      if (!response.ok) {
        throw new Error("Failed to get response");
      }

      const data: ChatbotResponse = await response.json();

      const botMessage: ChatMessage = {
        id: `bot-${Date.now()}`,
        message: data.response,
        isUser: false,
        timestamp: new Date(data.timestamp),
        sources: data.sources,
        confidence: data.confidence,
        suggestedQuestions: data.suggested_questions,
      };

      setMessages((prev) => [...prev, botMessage]);
      setConversationId(data.conversation_id);
    } catch (error) {
      console.error("Chat error:", error);
      const errorMessage: ChatMessage = {
        id: `error-${Date.now()}`,
        message:
          "I'm sorry, I'm having trouble connecting right now. Please try again in a moment or check out Hunter's portfolio directly!",
        isUser: false,
        timestamp: new Date(),
        suggestedQuestions: [
          "What projects has Hunter worked on?",
          "What are Hunter's skills?",
          "How can I contact Hunter?",
        ],
      };
      setMessages((prev) => [...prev, errorMessage]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      sendMessage();
    }
  };

  const clearChat = () => {
    setMessages([]);
    setConversationId(null);
  };

  return (
    <>
      {/* Chatbot Toggle Button */}
      <motion.button
        onClick={() => setIsOpen(!isOpen)}
        className={`fixed bottom-6 right-6 md:bottom-32 md:right-8 z-50 p-4 rounded-full shadow-lg transition-all duration-300 ${
          isOpen
            ? "bg-cyber-black border-2 border-neon-blue text-neon-blue"
            : "bg-neon-blue hover:bg-neon-blue/80 text-cyber-black hover:shadow-[0_0_20px_rgba(51,153,255,0.5)]"
        }`}
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        animate={{ rotate: isOpen ? 180 : 0 }}
      >
        {isOpen ? (
          <XMarkIcon className="w-6 h-6" />
        ) : (
          <ChatBubbleLeftRightIcon className="w-6 h-6" />
        )}
      </motion.button>

      {/* Chatbot Window */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.9 }}
            className="fixed bottom-24 right-6 md:bottom-[9.5rem] md:right-8 w-96 h-[32rem] bg-cyber-black border-2 border-neon-blue/50 rounded-lg shadow-2xl z-40 flex flex-col overflow-hidden backdrop-blur-sm"
          >
            {/* Header */}
            <div className="bg-tech-gray/80 border-b border-neon-blue/30 p-4 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 bg-neon-blue/20 rounded-full flex items-center justify-center">
                  <ComputerDesktopIcon className="w-5 h-5 text-neon-blue" />
                </div>
                <div>
                  <h3 className="text-neon-blue font-tech font-semibold">
                    Hunter's AI Assistant
                  </h3>
                  <p className="text-cyber-white/60 text-xs font-tech">
                    Ask me about Hunter's portfolio
                  </p>
                </div>
              </div>
              <button
                onClick={clearChat}
                className="text-cyber-white/60 hover:text-neon-blue transition-colors"
                title="Clear chat"
              >
                <SparklesIcon className="w-4 h-4" />
              </button>
            </div>

            {/* Messages */}
            <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-cyber-black/50">
              {messages.map((message) => (
                <motion.div
                  key={message.id}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className={`flex gap-3 ${
                    message.isUser ? "flex-row-reverse" : "flex-row"
                  }`}
                >
                  {/* Avatar */}
                  <div
                    className={`w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 ${
                      message.isUser
                        ? "bg-michigan-maize/20 text-michigan-maize"
                        : "bg-neon-blue/20 text-neon-blue"
                    }`}
                  >
                    {message.isUser ? (
                      <UserIcon className="w-5 h-5" />
                    ) : (
                      <ComputerDesktopIcon className="w-5 h-5" />
                    )}
                  </div>

                  {/* Message Content */}
                  <div
                    className={`flex-1 ${
                      message.isUser ? "text-right" : "text-left"
                    }`}
                  >
                    <div
                      className={`inline-block p-3 rounded-lg max-w-[85%] ${
                        message.isUser
                          ? "bg-michigan-maize/20 text-cyber-white border border-michigan-maize/30"
                          : "bg-cyber-white/10 text-cyber-white border border-cyber-white/20"
                      }`}
                    >
                      <p className="text-sm font-tech whitespace-pre-wrap">
                        {message.message}
                      </p>

                      {/* Confidence indicator for bot messages */}
                      {!message.isUser && message.confidence !== undefined && (
                        <div className="mt-2 text-xs text-cyber-white/60">
                          Confidence: {Math.round(message.confidence * 100)}%
                        </div>
                      )}
                    </div>

                    {/* Suggested Questions */}
                    {!message.isUser &&
                      message.suggestedQuestions &&
                      message.suggestedQuestions.length > 0 && (
                        <div className="mt-3 space-y-1">
                          <p className="text-xs text-cyber-white/60 font-tech">
                            Suggested questions:
                          </p>
                          {message.suggestedQuestions
                            .slice(0, 3)
                            .map((question, index) => (
                              <button
                                key={index}
                                onClick={() => sendMessage(question)}
                                disabled={isLoading}
                                className="block text-left w-full p-2 text-xs bg-neon-blue/10 border border-neon-blue/30 rounded text-neon-blue hover:bg-neon-blue/20 transition-colors font-tech"
                              >
                                {question}
                              </button>
                            ))}
                        </div>
                      )}

                    {/* Timestamp */}
                    <div
                      className={`mt-1 text-xs text-cyber-white/40 font-tech ${
                        message.isUser ? "text-right" : "text-left"
                      }`}
                    >
                      {message.timestamp.toLocaleTimeString([], {
                        hour: "2-digit",
                        minute: "2-digit",
                      })}
                    </div>
                  </div>
                </motion.div>
              ))}

              {/* Loading indicator */}
              {isLoading && (
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="flex gap-3"
                >
                  <div className="w-8 h-8 bg-neon-blue/20 rounded-full flex items-center justify-center">
                    <ComputerDesktopIcon className="w-5 h-5 text-neon-blue" />
                  </div>
                  <div className="bg-cyber-white/10 border border-cyber-white/20 rounded-lg p-3">
                    <div className="flex space-x-1">
                      <div
                        className="w-2 h-2 bg-neon-blue rounded-full animate-bounce"
                        style={{ animationDelay: "0ms" }}
                      />
                      <div
                        className="w-2 h-2 bg-neon-blue rounded-full animate-bounce"
                        style={{ animationDelay: "150ms" }}
                      />
                      <div
                        className="w-2 h-2 bg-neon-blue rounded-full animate-bounce"
                        style={{ animationDelay: "300ms" }}
                      />
                    </div>
                  </div>
                </motion.div>
              )}

              <div ref={messagesEndRef} />
            </div>

            {/* Input */}
            <div className="border-t border-neon-blue/30 p-4 bg-tech-gray/50">
              <div className="flex gap-2">
                <input
                  ref={inputRef}
                  type="text"
                  value={inputMessage}
                  onChange={(e) => setInputMessage(e.target.value)}
                  onKeyPress={handleKeyPress}
                  placeholder="Ask me about Hunter's portfolio..."
                  disabled={isLoading}
                  className="flex-1 bg-cyber-black/50 border border-cyber-white/20 rounded-sm px-3 py-2 text-cyber-white placeholder-cyber-white/60 font-tech text-sm focus:outline-none focus:border-neon-blue/50 focus:ring-1 focus:ring-neon-blue/50"
                />
                <button
                  onClick={() => sendMessage()}
                  disabled={!inputMessage.trim() || isLoading}
                  className="p-2 bg-neon-blue hover:bg-neon-blue/80 disabled:bg-cyber-white/20 disabled:text-cyber-white/40 text-cyber-black rounded-sm transition-colors"
                >
                  <PaperAirplaneIcon className="w-5 h-5" />
                </button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default PortfolioChatbot;

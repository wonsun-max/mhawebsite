"use client";

import { useState, useRef, useEffect } from "react";
import { MessageCircle, X, Send, Sparkles, Bot } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { cn } from "@/lib/utils";

interface Message {
  role: "user" | "assistant";
  content: string;
}

export default function Chatbot() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    {
      role: "assistant",
      content: "안녕하세요! MHA AI 챗봇입니다. 🤖\n학교 생활, 입학, 교육과정 등 무엇이든 물어보세요!",
    },
  ]);
  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, isOpen, isLoading]);

  const handleSend = async () => {
    if (!input.trim() || isLoading) return;

    const userMessage = input.trim();
    setInput("");
    setMessages((prev) => [...prev, { role: "user", content: userMessage }]);
    setIsLoading(true);

    try {
      const response = await fetch("/api/chatbot", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          message: userMessage,
          history: messages.map((m) => ({ role: m.role, content: m.content })),
        }),
      });

      const data = await response.json();

      if (data.success) {
        setMessages((prev) => [
          ...prev,
          { role: "assistant", content: data.data.reply },
        ]);
      } else {
        setMessages((prev) => [
          ...prev,
          {
            role: "assistant",
            content: "죄송합니다. 오류가 발생했습니다. 잠시 후 다시 시도해주세요.",
          },
        ]);
      }
    } catch (error) {
      console.error("Chat error:", error);
      setMessages((prev) => [
        ...prev,
        {
          role: "assistant",
          content: "죄송합니다. 네트워크 오류가 발생했습니다.",
        },
      ]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  return (
    <>
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.95, filter: 'blur(10px)' }}
            animate={{ opacity: 1, y: 0, scale: 1, filter: 'blur(0px)' }}
            exit={{ opacity: 0, y: 20, scale: 0.95, filter: 'blur(10px)' }}
            transition={{ type: "spring", stiffness: 300, damping: 30 }}
            className="fixed bottom-24 right-4 left-4 sm:left-auto sm:right-6 z-50 sm:w-[380px] h-[600px] max-h-[70vh] sm:max-h-[80vh] bg-[#0A1929]/95 backdrop-blur-xl rounded-3xl shadow-2xl border border-[#D4AF37]/30 flex flex-col overflow-hidden"
          >
            {/* Header */}
            <div className="bg-[#050B14] p-5 flex items-center justify-between text-white relative overflow-hidden border-b border-[#D4AF37]/20">
              <div className="absolute inset-0 bg-[url('/images/pattern.png')] opacity-5" />
              <div className="flex items-center gap-3 relative z-10">
                <div className="w-10 h-10 bg-[#D4AF37]/20 rounded-full flex items-center justify-center backdrop-blur-sm border border-[#D4AF37]/50">
                  <Bot className="w-6 h-6 text-[#D4AF37]" />
                </div>
                <div>
                  <h3 className="font-bold text-lg flex items-center gap-2 text-[#D4AF37]" style={{ fontFamily: 'var(--font-cormorant)' }}>
                    MHA Assistant
                    <Sparkles className="w-4 h-4 text-white animate-pulse" />
                  </h3>
                  <p className="text-xs text-slate-400 font-medium">무엇이든 물어보세요!</p>
                </div>
              </div>
              <button
                onClick={() => setIsOpen(false)}
                className="p-2 hover:bg-white/10 rounded-full transition-colors relative z-10 text-slate-400 hover:text-white"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Messages */}
            <div className="flex-1 overflow-y-auto p-5 space-y-4 bg-[#0A1929]">
              {messages.map((msg, idx) => (
                <motion.div
                  key={idx}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className={cn(
                    "flex w-full",
                    msg.role === "user" ? "justify-end" : "justify-start"
                  )}
                >
                  <div
                    className={cn(
                      "max-w-[85%] p-4 rounded-2xl text-sm shadow-sm leading-relaxed whitespace-pre-wrap",
                      msg.role === "user"
                        ? "bg-[#D4AF37] text-[#0A1929] font-medium rounded-tr-none shadow-[0_2px_8px_rgba(212,175,55,0.2)]"
                        : "bg-[#1E2D3D] text-slate-200 rounded-tl-none border border-white/5"
                    )}
                  >
                    {msg.content}
                  </div>
                </motion.div>
              ))}
              {isLoading && (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="flex justify-start"
                >
                  <div className="bg-[#1E2D3D] p-4 rounded-2xl rounded-tl-none border border-white/5 shadow-sm">
                    <div className="flex gap-1.5">
                      <div className="w-2 h-2 bg-[#D4AF37] rounded-full animate-bounce" />
                      <div className="w-2 h-2 bg-[#D4AF37] rounded-full animate-bounce delay-100" />
                      <div className="w-2 h-2 bg-[#D4AF37] rounded-full animate-bounce delay-200" />
                    </div>
                  </div>
                </motion.div>
              )}
              <div ref={messagesEndRef} />
            </div>

            {/* Input */}
            <div className="p-4 bg-[#050B14] border-t border-[#D4AF37]/20">
              <div className="flex gap-2 items-center bg-[#1E2D3D] rounded-full p-1 pl-4 focus-within:ring-2 focus-within:ring-[#D4AF37]/50 transition-all border border-white/5">
                <input
                  type="text"
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  onKeyDown={handleKeyDown}
                  placeholder="메시지를 입력하세요..."
                  className="flex-1 bg-transparent text-sm focus:outline-none text-white placeholder:text-slate-500"
                  disabled={isLoading}
                />
                <button
                  onClick={handleSend}
                  disabled={!input.trim() || isLoading}
                  className="p-2.5 bg-[#D4AF37] text-[#0A1929] rounded-full hover:bg-[#C5A028] disabled:opacity-50 disabled:hover:bg-[#D4AF37] transition-all shadow-lg active:scale-95"
                >
                  <Send className="w-4 h-4" />
                </button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Toggle Button */}
      <motion.button
        whileHover={{ scale: 1.1, rotate: 5 }}
        whileTap={{ scale: 0.9 }}
        onClick={() => setIsOpen(!isOpen)}
        className="fixed bottom-6 right-6 z-50 w-14 h-14 sm:w-16 sm:h-16 bg-[#D4AF37] text-[#0A1929] rounded-full shadow-[0_0_20px_rgba(212,175,55,0.4)] hover:shadow-[0_0_30px_rgba(212,175,55,0.6)] transition-all flex items-center justify-center border border-white/20"
      >
        <AnimatePresence mode="wait">
          {isOpen ? (
            <motion.div
              key="close"
              initial={{ rotate: -90, opacity: 0 }}
              animate={{ rotate: 0, opacity: 1 }}
              exit={{ rotate: 90, opacity: 0 }}
            >
              <X className="w-7 h-7" />
            </motion.div>
          ) : (
            <motion.div
              key="open"
              initial={{ rotate: 90, opacity: 0 }}
              animate={{ rotate: 0, opacity: 1 }}
              exit={{ rotate: -90, opacity: 0 }}
            >
              <MessageCircle className="w-7 h-7" />
            </motion.div>
          )}
        </AnimatePresence>
        {!isOpen && (
          <span className="absolute -top-1 -right-1 w-4 h-4 bg-red-500 rounded-full border-2 border-[#0A1929] animate-pulse" />
        )}
      </motion.button>
    </>
  );
}


// FILE: components/ChatbotWindow.tsx
'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import { X, Send } from 'lucide-react'

export default function ChatbotWindow({ onClose }: { onClose: () => void }) {
  const [messages, setMessages] = useState<{ role: string; text: string }[]>([])
  const [input, setInput] = useState('')

  const sendMessage = async () => {
    if (!input.trim()) return
    const userMessage = { role: 'user', text: input }
    setMessages((prev) => [...prev, userMessage])
    setInput('')

    // API call → /api/chat (we’ll connect it later)
    const res = await fetch('/api/chat', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ message: input }),
    })
    const data = await res.json()
    const botMessage = { role: 'assistant', text: data.answer ?? '...' }
    setMessages((prev) => [...prev, botMessage])
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 60 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: 60 }}
      transition={{ duration: 0.3 }}
      className="fixed bottom-24 left-6 w-80 sm:w-96 glass
                 border border-white/20 rounded-2xl shadow-xl text-white flex flex-col z-50"
    >
      {/* Header */}
      <div className="flex justify-between items-center px-4 py-3 border-b border-white/10">
        <h3 className="font-semibold text-lg">MHA Assistant 🤖</h3>
        <button onClick={onClose} className="text-white/70 hover:text-white">
          <X className="w-5 h-5" />
        </button>
      </div>

      {/* Chat Body */}
      <div className="flex-1 overflow-y-auto px-4 py-3 space-y-3 text-sm max-h-80">
        {messages.length === 0 ? (
          <p className="text-white/50 italic">Hi there! How can I help you today?</p>
        ) : (
          messages.map((m, i) => (
            <div
              key={i}
              className={`p-2 rounded-lg ${
                m.role === 'user'
                  ? 'bg-sky-600/60 self-end text-right ml-8'
                  : 'bg-white/10 text-left mr-8'
              }`}
            >
              {m.text}
            </div>
          ))
        )}
      </div>

      {/* Input */}
      <div className="flex border-t border-white/10">
        <input
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={(e) => e.key === 'Enter' && sendMessage()}
          placeholder="Type a message..."
          className="flex-1 bg-transparent text-white px-3 py-2 outline-none text-sm"
        />
        <button
          onClick={sendMessage}
          className="p-3 text-sky-400 hover:text-sky-300 transition"
        >
          <Send className="w-4 h-4" />
        </button>
      </div>
    </motion.div>
  )
}

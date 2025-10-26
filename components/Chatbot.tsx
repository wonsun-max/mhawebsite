
'use client'
import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { MessageSquareText, Send } from 'lucide-react';

interface ChatMessage {
  id: number;
  text: string;
  sender: 'user' | 'bot';
}

export default function Chatbot() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [inputMessage, setInputMessage] = useState('');
  const [isTyping, setIsTyping] = useState(false);

  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const toggleChat = () => {
    setIsOpen(!isOpen);
    if (!isOpen && messages.length === 0) {
      // Greet first-time users
      setTimeout(() => {
        setMessages([
          { id: 1, text: '안녕하세요! 마닐라한국아카데미 AI 도우미입니다. 무엇을 도와드릴까요?', sender: 'bot' },
        ]);
      }, 500);
    }
  };

  const handleSendMessage = async () => {
    if (inputMessage.trim() === '') return;

    const newUserMessage: ChatMessage = {
      id: messages.length + 1,
      text: inputMessage,
      sender: 'user',
    };
    setMessages((prevMessages) => [...prevMessages, newUserMessage]);
    setInputMessage('');
    setIsTyping(true);

    // Simulate API call and bot response
    setTimeout(() => {
      const botResponse = generatePlaceholderResponse(inputMessage);
      setMessages((prevMessages) => [
        ...prevMessages,
        { id: prevMessages.length + 1, text: botResponse, sender: 'bot' },
      ]);
      setIsTyping(false);
    }, 1500);
  };

  const generatePlaceholderResponse = (query: string): string => {
    const lowerQuery = query.toLowerCase();
    if (lowerQuery.includes('입학')) {
      return '입학 절차에 대해 안내해 드릴 수 있습니다. 초등 입학전형, 중/고등 입학전형 중 어떤 정보가 필요하신가요? 자세한 내용은 입학안내 페이지를 참조해주세요.';
    } else if (lowerQuery.includes('위치')) {
      return '저희 학교는 필리핀 안티폴로 시티에 위치하고 있습니다. 자세한 주소는 P.O. BOX 1084 Antipolo City, Philppines (B3&4 Lot 1 C. Lawis St. Brgy San Luis, Antipolo City. 1870) 입니다.';
    } else if (lowerQuery.includes('행사')) {
      return '현재 예정된 행사는 다음과 같습니다: 8월 20일 개교기념일, 9월 15일 연례 스포츠의 날, 10월 5일 학부모-교사 회의가 있습니다. 더 많은 정보는 학교소식 페이지에서 확인하실 수 있습니다.';
    } else if (lowerQuery.includes('갤러리') || lowerQuery.includes('사진')) {
      return '학교 갤러리에서는 다양한 학교 활동 사진들을 보실 수 있습니다. 학교 앨범 페이지를 방문해 주세요.';
    } else if (lowerQuery.includes('안녕') || lowerQuery.includes('반가워')) {
        return '반갑습니다! 무엇이 궁금하신가요?';
    } else if (lowerQuery.includes('고마워') || lowerQuery.includes('감사')) {
        return '천만에요! 더 궁금한 점이 있으시면 언제든지 물어보세요.';
    }
    return '죄송합니다. 현재 질문에 대한 정확한 답변을 찾을 수 없습니다. 다른 질문을 해주시거나 학교 웹사이트의 관련 페이지를 확인해 주시면 감사하겠습니다.';
  };

  const chatWindowVariants = {
    hidden: { opacity: 0, y: 100, x: 100, scale: 0.8 },
    visible: { opacity: 1, y: 0, x: 0, scale: 1 },
    exit: { opacity: 0, y: 100, x: 100, scale: 0.8 },
  };

  const messageVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 },
  };

  return (
    <>
      <motion.button
        className="fixed bottom-8 right-8 bg-blue-600 text-white rounded-full p-4 shadow-lg z-50 hover:bg-blue-700 transition-colors focus:outline-none focus:ring-2 focus:ring-blue-400 focus:ring-opacity-75"
        onClick={toggleChat}
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
      >
        <MessageSquareText size={28} />
      </motion.button>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            className="fixed bottom-24 right-8 w-80 h-[500px] bg-gray-900 rounded-2xl shadow-xl flex flex-col z-50 overflow-hidden border border-gray-700 backdrop-blur-sm bg-gradient-to-br from-navy-blue to-blue-900"
            variants={chatWindowVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
            transition={{ type: 'spring', stiffness: 100, damping: 15 }}
          >
            <div className="flex-none bg-blue-800 p-4 rounded-t-2xl flex items-center justify-between shadow-md">
              <h3 className="text-xl font-bold text-white">AI 도우미</h3>
              <button onClick={toggleChat} className="text-white hover:text-gray-200">
                &times;
              </button>
            </div>

            <div className="flex-grow p-4 overflow-y-auto space-y-4 custom-scrollbar">
              <AnimatePresence initial={false}>
                {messages.map((msg) => (
                  <motion.div
                    key={msg.id}
                    className={`flex ${msg.sender === 'user' ? 'justify-end' : 'justify-start'}`}
                    variants={messageVariants}
                    initial="hidden"
                    animate="visible"
                    exit="hidden"
                    transition={{ duration: 0.2 }}
                  >
                    <div
                      className={`max-w-[70%] p-3 rounded-xl shadow-md ${
                        msg.sender === 'user'
                          ? 'bg-blue-600 text-white rounded-br-none'
                          : 'bg-gray-700 text-white rounded-bl-none'
                      }`}
                    >
                      {msg.text}
                    </div>
                  </motion.div>
                ))}
              </AnimatePresence>
              {isTyping && (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  className="flex justify-start"
                >
                  <div className="bg-gray-700 text-white p-3 rounded-xl rounded-bl-none">
                    <div className="flex space-x-1">
                      <motion.span
                        animate={{ y: ["0%", "-50%", "0%"] }}
                        transition={{ repeat: Infinity, duration: 0.8, delay: 0 }}
                        className="block w-2 h-2 bg-gray-400 rounded-full"
                      ></motion.span>
                      <motion.span
                        animate={{ y: ["0%", "-50%", "0%"] }}
                        transition={{ repeat: Infinity, duration: 0.8, delay: 0.2 }}
                        className="block w-2 h-2 bg-gray-400 rounded-full"
                      ></motion.span>
                      <motion.span
                        animate={{ y: ["0%", "-50%", "0%"] }}
                        transition={{ repeat: Infinity, duration: 0.8, delay: 0.4 }}
                        className="block w-2 h-2 bg-gray-400 rounded-full"
                      ></motion.span>
                    </div>
                  </div>
                </motion.div>
              )}
              <div ref={messagesEndRef} />
            </div>

            <div className="flex-none p-4 border-t border-gray-700 bg-gray-800">
              <div className="flex rounded-full overflow-hidden shadow-lg bg-gray-700">
                <input
                  type="text"
                  className="flex-grow p-3 bg-transparent text-white placeholder-gray-400 focus:outline-none"
                  placeholder="메시지를 입력하세요..."
                  value={inputMessage}
                  onChange={(e) => setInputMessage(e.target.value)}
                  onKeyPress={(e) => {
                    if (e.key === 'Enter') {
                      handleSendMessage();
                    }
                  }}
                />
                <motion.button
                  className="px-4 py-2 bg-blue-600 text-white hover:bg-blue-700 transition-colors"
                  onClick={handleSendMessage}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <Send size={20} />
                </motion.button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}

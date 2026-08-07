'use client';

import React, { useState, useRef, useEffect } from 'react';
import { Bot, X, Send, Sparkles, User, Minimize2, Trash2, Cpu } from 'lucide-react';
import { useSoundFX } from '@/components/providers/SoundProvider';

interface Message {
  id: string;
  sender: 'user' | 'ai';
  text: string;
  timestamp: string;
}

export function AIChatWidget() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [poweredByBadge, setPoweredByBadge] = useState('Gemini 3.1 Flash Lite');
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const { playClick, playHover, playSuccess } = useSoundFX();

  // Load chat history from localStorage on mount
  useEffect(() => {
    const initialMsg: Message = {
      id: 'welcome',
      sender: 'ai',
      text: "👋 Hi! I'm **RUDY AI**, powered by **Google Gemini 3.1 Flash Lite**.\n\nAsk me anything about Rudraksha's experience, 4 flagship projects, 7 verified certifications, or technical stack!",
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
    };

    const saved = localStorage.getItem('portfolio_rudy_ai_history');
    if (saved) {
      try {
        const parsed = JSON.parse(saved);
        if (Array.isArray(parsed) && parsed.length > 0) {
          setMessages(parsed);
          return;
        }
      } catch {
        // ignore fallback
      }
    }

    setMessages([initialMsg]);
  }, []);

  // Save chat history to localStorage on message update
  useEffect(() => {
    if (messages.length > 0) {
      localStorage.setItem('portfolio_rudy_ai_history', JSON.stringify(messages));
    }
  }, [messages]);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    if (isOpen) {
      scrollToBottom();
    }
  }, [messages, isOpen]);

  const handleClearHistory = () => {
    playClick();
    const resetMsg: Message = {
      id: Date.now().toString(),
      sender: 'ai',
      text: "Chat history cleared! Ask me anything about Rudraksha's projects, experience, or skills.",
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
    };
    setMessages([resetMsg]);
    localStorage.removeItem('portfolio_rudy_ai_history');
  };

  const quickPrompts = [
    '🤖 Ask Gemini 3.1 about DisasterLink',
    '🛍️ Tell me about Collections App',
    '🌱 What is CarbonLens?',
    '🌿 Tell me about Terralife Android App',
    '📜 7 Verified Google & Meta Certs',
    '💼 CodSoft Internship Details',
    '⚡ Full Stack & Mobile Stack',
    '📩 Phone & Email Contact',
  ];

  const handleSend = async (textToSend?: string) => {
    const text = textToSend || input;
    if (!text.trim() || isTyping) return;

    playClick();

    const userMsg: Message = {
      id: Date.now().toString(),
      sender: 'user',
      text: text,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
    };

    const newMessages = [...messages, userMsg];
    setMessages(newMessages);
    if (!textToSend) setInput('');
    setIsTyping(true);

    try {
      // POST to Gemini API route (/api/chat)
      const res = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ messages: newMessages }),
      });

      const data = await res.json();
      const replyText = data.reply || "I am here to answer any question about Rudraksha's portfolio!";
      if (data.poweredBy) setPoweredByBadge(data.poweredBy);

      const aiMsg: Message = {
        id: (Date.now() + 1).toString(),
        sender: 'ai',
        text: replyText,
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      };

      setMessages((prev) => [...prev, aiMsg]);
      playSuccess();
    } catch {
      // Graceful fallback response if network request fails
      const aiMsg: Message = {
        id: (Date.now() + 1).toString(),
        sender: 'ai',
        text: `🤖 Rudraksha is a Software Engineer skilled in Flutter, Next.js 15, React.js, TypeScript, Node.js, Express, MongoDB & Java/Android. Contact him at **Rudrakshajadhav.work@gmail.com** or **+91 8010422174**!`,
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      };
      setMessages((prev) => [...prev, aiMsg]);
    } finally {
      setIsTyping(false);
    }
  };

  return (
    <div className="fixed bottom-6 right-6 z-[100]">
      {/* Floating Toggle Button */}
      {!isOpen && (
        <button
          onMouseEnter={playHover}
          onClick={() => {
            playClick();
            setIsOpen(true);
          }}
          className="group relative flex items-center gap-3 bg-[#111111] text-white px-5 py-4 border-4 border-[#111111] neo-shadow-hard hover:bg-[#4F8EFF] hover:text-[#111111] transition-all cursor-pointer"
        >
          <div className="relative">
            <Bot className="w-6 h-6 stroke-[2.5]" />
            <span className="absolute -top-1 -right-1 w-3 h-3 bg-[#8BFFB0] rounded-full border-2 border-[#111111] animate-ping" />
          </div>
          <span className="font-display font-black text-sm uppercase tracking-wider">ASK GEMINI 3.1 AI</span>
          <Sparkles className="w-4 h-4 text-[#FFD54F] group-hover:rotate-12 transition-transform" />
        </button>
      )}

      {/* Expanded Chat Widget */}
      {isOpen && (
        <div
          data-lenis-prevent
          onWheel={(e) => e.stopPropagation()}
          onTouchMove={(e) => e.stopPropagation()}
          className="w-[92vw] sm:w-[420px] h-[580px] bg-white border-4 border-[#111111] neo-shadow-hard flex flex-col overflow-hidden animate-in fade-in slide-in-from-bottom-5 duration-200"
        >
          {/* Header */}
          <div className="bg-[#111111] text-white p-4 border-b-4 border-[#111111] flex justify-between items-center shrink-0">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-[#4F8EFF] text-[#111111] border-2 border-white font-bold">
                <Bot className="w-5 h-5 stroke-[2.5]" />
              </div>
              <div>
                <div className="flex items-center gap-2">
                  <h3 className="font-display font-black text-base text-white tracking-tight">
                    RUDY AI
                  </h3>
                  <span className="px-2 py-0.5 bg-[#8BFFB0] text-[#111111] font-mono text-[9px] font-black uppercase border border-white">
                    GEMINI 3.1 LITE
                  </span>
                </div>
                <div className="flex items-center gap-1 font-mono text-[10px] text-white/70">
                  <Cpu className="w-3 h-3 text-[#FFD54F]" />
                  <span>Powered by Google {poweredByBadge}</span>
                </div>
              </div>
            </div>

            <div className="flex items-center gap-2">
              <button
                onMouseEnter={playHover}
                onClick={handleClearHistory}
                className="p-1.5 text-white/80 hover:text-[#FF8A8A] transition-colors"
                title="Clear Chat History"
              >
                <Trash2 className="w-4 h-4" />
              </button>
              <button
                onMouseEnter={playHover}
                onClick={() => {
                  playClick();
                  setIsOpen(false);
                }}
                className="p-1.5 text-white/80 hover:text-white transition-colors"
                title="Minimize Chat"
              >
                <Minimize2 className="w-4 h-4" />
              </button>
            </div>
          </div>

          {/* Quick Prompts Bar */}
          <div className="p-2 bg-[#FFF9F0] border-b-2 border-[#111111] overflow-x-auto flex gap-2 shrink-0 scrollbar-none">
            {quickPrompts.map((prompt, i) => (
              <button
                key={i}
                onClick={() => handleSend(prompt.replace(/^[^\w\s]+/, '').trim())}
                className="px-2.5 py-1 bg-white border border-[#111111] font-mono text-[10px] font-bold text-[#111111] hover:bg-[#FFD54F] whitespace-nowrap transition-colors shrink-0 cursor-pointer"
              >
                {prompt}
              </button>
            ))}
          </div>

          {/* Messages Area */}
          <div className="flex-1 p-4 overflow-y-auto space-y-4 bg-dots">
            {messages.map((msg) => (
              <div
                key={msg.id}
                className={`flex gap-3 ${msg.sender === 'user' ? 'justify-end' : 'justify-start'}`}
              >
                {msg.sender === 'ai' && (
                  <div className="w-7 h-7 bg-[#4F8EFF] border-2 border-[#111111] text-[#111111] flex items-center justify-center shrink-0 font-bold text-xs">
                    <Bot className="w-4 h-4" />
                  </div>
                )}

                <div
                  className={`max-w-[82%] p-3.5 border-2 border-[#111111] text-xs font-sans font-medium neo-shadow-premium ${
                    msg.sender === 'user'
                      ? 'bg-[#FFD54F] text-[#111111]'
                      : 'bg-white text-[#111111]'
                  }`}
                >
                  <div className="whitespace-pre-line leading-relaxed">{msg.text}</div>
                  <div className="text-[9px] font-mono opacity-50 text-right mt-1 font-bold">
                    {msg.timestamp}
                  </div>
                </div>

                {msg.sender === 'user' && (
                  <div className="w-7 h-7 bg-[#111111] border-2 border-[#111111] text-white flex items-center justify-center shrink-0 font-bold text-xs">
                    <User className="w-4 h-4" />
                  </div>
                )}
              </div>
            ))}

            {isTyping && (
              <div className="flex gap-3 justify-start items-center">
                <div className="w-7 h-7 bg-[#4F8EFF] border-2 border-[#111111] text-[#111111] flex items-center justify-center shrink-0 font-bold text-xs">
                  <Bot className="w-4 h-4 animate-bounce" />
                </div>
                <div className="p-3 bg-white border-2 border-[#111111] font-mono text-xs font-bold flex items-center gap-2">
                  <span className="w-2 h-2 bg-[#4F8EFF] rounded-full animate-ping" />
                  <span>Gemini 3.1 Flash Lite thinking...</span>
                </div>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>

          {/* Input Footer */}
          <form
            onSubmit={(e) => {
              e.preventDefault();
              handleSend();
            }}
            className="p-3 bg-white border-t-4 border-[#111111] flex gap-2 shrink-0"
          >
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Ask Gemini 3.1 Flash Lite about Rudraksha..."
              className="flex-1 px-3 py-2 bg-[#FFF9F0] border-2 border-[#111111] font-sans font-bold text-xs text-[#111111] placeholder:text-[#111111]/40 outline-none focus:border-[#4F8EFF]"
            />
            <button
              type="submit"
              disabled={isTyping || !input.trim()}
              className="p-2 bg-[#111111] text-white border-2 border-[#111111] hover:bg-[#4F8EFF] hover:text-[#111111] transition-colors disabled:opacity-50 cursor-pointer"
            >
              <Send className="w-4 h-4 stroke-[2.5]" />
            </button>
          </form>
        </div>
      )}
    </div>
  );
}

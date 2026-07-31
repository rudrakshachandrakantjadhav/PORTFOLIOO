'use client';

import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Bot, X, Send, RefreshCw, Trash2 } from 'lucide-react';
import { PERSONAL_INFO, PROJECTS } from '@/constants/portfolio';
import { useSoundFX } from '@/components/providers/SoundProvider';

interface Message {
  id: string;
  sender: 'user' | 'ai';
  text: string;
  timestamp: string;
}

const INITIAL_WELCOME: Message = {
  id: 'welcome',
  sender: 'ai',
  text: `Hello! I'm Rudy AI 🤖, your virtual assistant. Ask me anything about Rudraksha C. Jadhav's resume, projects (DisasterLink, CarbonLens, DRISHTI), CodSoft internship, Parul University degree, 7 verified Google & Meta certs, or contact info!`,
  timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
};

export function AIChatWidget() {
  const [isOpen, setIsOpen] = useState(false);
  const [input, setInput] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [messages, setMessages] = useState<Message[]>([INITIAL_WELCOME]);

  const messagesEndRef = useRef<HTMLDivElement | null>(null);
  const { playClick, playHover, playSuccess } = useSoundFX();

  // Load chat history from localStorage on mount
  useEffect(() => {
    try {
      const saved = localStorage.getItem('portfolio_rudy_ai_history');
      if (saved) {
        const parsed = JSON.parse(saved);
        if (Array.isArray(parsed) && parsed.length > 0) {
          setMessages(parsed);
        }
      }
    } catch {
      // Ignore storage errors
    }
  }, []);

  // Save chat history to localStorage whenever messages change
  useEffect(() => {
    try {
      if (messages.length > 0) {
        localStorage.setItem('portfolio_rudy_ai_history', JSON.stringify(messages));
      }
    } catch {
      // Ignore
    }
  }, [messages]);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    if (isOpen) {
      setTimeout(scrollToBottom, 100);
    }
  }, [messages, isOpen]);

  const clearChatHistory = () => {
    playClick();
    const resetMsg: Message = {
      ...INITIAL_WELCOME,
      id: Date.now().toString(),
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
    };
    setMessages([resetMsg]);
    localStorage.removeItem('portfolio_rudy_ai_history');
  };

  const quickPrompts = [
    '🚨 Tell me about DisasterLink',
    '🌱 What is CarbonLens?',
    '👁️ Tell me about DRISHTI AI',
    '📜 7 Verified Google & Meta Certs',
    '💼 CodSoft Internship Details',
    '🎓 Education & Parul University',
    '⚡ Full Stack & AI Skills',
    '📩 Phone & Email Contact',
  ];

  const generateAIResponse = (query: string): string => {
    const q = query.toLowerCase();

    if (q.includes('disasterlink') || q.includes('disaster') || q.includes('sos') || q.includes('emergency')) {
      return `🚨 **DisasterLink Platform**: Rudraksha's flagship real-time community disaster response platform.\n\n• **Architecture**: Government-grade emergency platform built in Next.js 15 & TypeScript.\n• **Highlights**: 20+ reusable React components across 5 route groups, Zustand global state management, live SOS workflows, role-based dashboards, ARIA accessibility, and mobile-first responsiveness across 4 viewports.\n• **Tech**: Next.js 15, TypeScript, Tailwind CSS, Zustand, Framer Motion, REST APIs, Mapbox, Socket.IO, YOLOv8.\n• **GitHub**: https://github.com/rudrakshachandrakantjadhav/disasterlink`;
    }

    if (q.includes('carbonlens') || q.includes('carbon') || q.includes('sustainability')) {
      return `🌱 **CarbonLens Platform**: AI Carbon Footprint Analyzer & Sustainability Analytics.\n\n• **Highlights**: Constructed complete React.js frontend with clean ES6+ JavaScript. Enables real-time logging of transport, energy & lifestyle data with Chart.js emissions dashboards maintaining sub-200ms UI feedback.\n• **Tech**: React.js, JavaScript (ES6+), Chart.js, Node.js, MongoDB, AI APIs, Tailwind CSS.\n• **GitHub**: https://github.com/rudrakshachandrakantjadhav/CarbonLens-AI-Powered-Carbon-Intelligence-Sustainability-Analytics-Platform`;
    }

    if (q.includes('drishti') || q.includes('surveillance') || q.includes('vision') || q.includes('opencv')) {
      return `👁️ **DRISHTI AI Defense**: Intelligent Computer Vision Surveillance Command.\n\n• **Highlights**: Ingests multi-camera RTSP video streams with sub-30ms bounding-box object classification and automated perimeter breach alerts.\n• **Tech**: OpenCV, TensorFlow, Express, Docker, Python, React.\n• **GitHub**: https://github.com/anandjadhav42004/Drishti`;
    }

    if (q.includes('intern') || q.includes('codsoft') || q.includes('experience') || q.includes('work')) {
      return `💼 **Experience — Frontend Development Intern at CodSoft (Remote)** (*Jun 2025 – Jul 2025*):\n\n• Delivered 3 client-facing web applications end-to-end using HTML5, CSS3, and ES6+ JavaScript within sprint deadlines.\n• Diagnosed & resolved cross-device rendering failures via Chrome DevTools across mobile, tablet & desktop viewports, reducing visual regressions.\n• Structured JS modules following component-level separation of concerns, cutting review iteration cycles.`;
    }

    if (q.includes('education') || q.includes('parul') || q.includes('polytechnic') || q.includes('diploma') || q.includes('degree') || q.includes('college')) {
      return `🎓 **Official Academic Credentials**:\n\n1. **B.Tech in Computer Science Engineering**\n   *Parul Institute of Engineering & Technology, Vadodara* (Jul 2024 — May 2027)\n2. **Diploma in Mechanical Engineering**\n   *Puranmal Lahoti Government Polytechnic* (Jun 2020 — May 2024)`;
    }

    if (q.includes('cert') || q.includes('google') || q.includes('meta') || q.includes('ibm') || q.includes('coursera')) {
      return `📜 **7 Verified Industry Certifications**:\n\n1. **Google Cloud Generative AI Leader** (5 Courses, Coursera)\n2. **Google Cloud Generative AI Engineering** (Coursera)\n3. **Meta Advanced React** (Coursera)\n4. **Meta Programming with JavaScript** (Coursera)\n5. **Meta Version Control** (Coursera)\n6. **Google Prompting Essentials** (4 Courses, Coursera)\n7. **IBM Generative AI for Growth Marketing** (3 Courses, Coursera)\n8. **AI & ML Certificate** (California Institute of Professional Studies)\n\nAll credentials feature live official verification links in the Credentials section!`;
    }

    if (q.includes('stack') || q.includes('skill') || q.includes('technolog') || q.includes('react') || q.includes('next')) {
      return `⚡ **Comprehensive Technical Skillset**:\n\n• **Frontend & Core**: React.js, Next.js 15, JavaScript (ES6+), TypeScript, Tailwind CSS, SCSS, Framer Motion, Three.js, Mapbox, ARIA (a11y)\n• **Backend & APIs**: Node.js, Express.js, Python, FastAPI, Go, Socket.IO, Zustand, REST APIs, Firebase, JWT Auth\n• **AI/ML & Vision**: YOLOv8, OpenCV, PyTorch, TensorFlow, NLP/LLMs, LangChain, Chart.js Analytics\n• **Data, Cloud & Tools**: MongoDB Atlas, PostgreSQL, Redis, Docker, Vercel, Git/GitHub, Chrome DevTools, Postman`;
    }

    if (q.includes('contact') || q.includes('hire') || q.includes('email') || q.includes('phone') || q.includes('linkedin') || q.includes('reach')) {
      return `📫 **Official Contact Information**:\n\n• **Full Name**: Rudraksha C. Jadhav\n• **Email**: Rudrakshajadhav.work@gmail.com\n• **Phone**: +91 8010422174\n• **LinkedIn**: https://www.linkedin.com/in/rudrakshajadhav/\n• **GitHub**: https://github.com/rudrakshachandrakantjadhav\n• **Location**: Vadodara, India\n• **Availability**: Available for software engineering roles & collaborations!`;
    }

    return `🤖 Thank you for your inquiry! Rudraksha C. Jadhav is a Senior Software Engineer skilled in Next.js 15, React.js, TypeScript, Python, Socket.IO, and AI models. Feel free to ask about his CodSoft internship, 3 major projects, 7 verified certifications, or official email/phone!`;
  };

  const handleSend = (textToSend?: string) => {
    const text = textToSend || input;
    if (!text.trim()) return;

    playClick();

    const userMsg: Message = {
      id: Date.now().toString(),
      sender: 'user',
      text: text,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
    };

    setMessages((prev) => [...prev, userMsg]);
    if (!textToSend) setInput('');
    setIsTyping(true);

    setTimeout(() => {
      const responseText = generateAIResponse(text);
      const aiMsg: Message = {
        id: (Date.now() + 1).toString(),
        sender: 'ai',
        text: responseText,
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      };
      setMessages((prev) => [...prev, aiMsg]);
      setIsTyping(false);
      playSuccess();
    }, 500);
  };

  return (
    <>
      {/* Floating Launcher Button */}
      <motion.button
        onMouseEnter={playHover}
        onClick={() => {
          playClick();
          setIsOpen(!isOpen);
        }}
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        className="fixed bottom-6 right-6 z-[150] bg-[#FFD54F] text-[#111111] border-4 border-[#111111] p-4 neo-shadow-hard flex items-center gap-3 cursor-pointer hover:bg-[#4F8EFF] hover:text-white transition-colors"
        title="Open Rudy AI Assistant"
      >
        <div className="relative">
          <Bot className="w-7 h-7 stroke-[2.5]" />
          <span className="absolute -top-1 -right-1 w-3 h-3 bg-[#8BFFB0] border-2 border-[#111111] rounded-full animate-ping" />
        </div>
        <span className="font-display font-black text-sm uppercase hidden sm:inline-block tracking-wider">
          RUDY AI
        </span>
      </motion.button>

      {/* Chat Popover Window */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 30, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 30, scale: 0.95 }}
            transition={{ duration: 0.25 }}
            className="fixed bottom-24 right-4 sm:right-8 z-[150] w-[92vw] sm:w-[440px] bg-white border-4 border-[#111111] neo-shadow-hard flex flex-col overflow-hidden text-[#111111]"
          >
            {/* Modal Header */}
            <div className="bg-[#111111] text-white p-4 flex justify-between items-center border-b-4 border-[#111111] shrink-0">
              <div className="flex items-center gap-2.5">
                <div className="p-1.5 bg-[#4F8EFF] text-[#111111] border-2 border-white">
                  <Bot className="w-5 h-5 stroke-[2.5]" />
                </div>
                <div>
                  <h3 className="font-display font-black text-sm uppercase tracking-wider text-white">
                    RUDY AI ASSISTANT
                  </h3>
                  <span className="font-mono text-[10px] text-[#8BFFB0] font-bold block">
                    ● ONLINE • READY TO HELP
                  </span>
                </div>
              </div>

              <div className="flex items-center gap-2">
                <button
                  onMouseEnter={playHover}
                  onClick={clearChatHistory}
                  className="p-1.5 bg-[#FFD54F] text-[#111111] border-2 border-white hover:bg-white transition-colors cursor-pointer"
                  title="Clear Chat History"
                >
                  <Trash2 className="w-4 h-4 stroke-[2.5]" />
                </button>

                <button
                  onMouseEnter={playHover}
                  onClick={() => {
                    playClick();
                    setIsOpen(false);
                  }}
                  className="p-1.5 bg-[#FF8A8A] text-[#111111] border-2 border-white hover:bg-white transition-colors cursor-pointer"
                  title="Close"
                >
                  <X className="w-4 h-4 stroke-[3]" />
                </button>
              </div>
            </div>

            {/* Quick Prompts Horizontal Scroll Bar */}
            <div
              data-lenis-prevent
              onWheel={(e) => e.stopPropagation()}
              onTouchMove={(e) => e.stopPropagation()}
              className="p-3 bg-[#FFF9F0] border-b-4 border-[#111111] flex gap-2 overflow-x-auto shrink-0 select-none"
            >
              {quickPrompts.map((prompt, i) => (
                <button
                  key={i}
                  onMouseEnter={playHover}
                  onClick={() => handleSend(prompt)}
                  className="px-3 py-1.5 bg-white border-2 border-[#111111] font-mono text-[11px] font-bold text-[#111111] whitespace-nowrap hover:bg-[#FFD54F] transition-colors shrink-0 neo-shadow-premium cursor-pointer"
                >
                  {prompt}
                </button>
              ))}
            </div>

            {/* Messages Scrollable Container */}
            <div
              data-lenis-prevent
              onWheel={(e) => e.stopPropagation()}
              onTouchMove={(e) => e.stopPropagation()}
              className="p-4 h-[350px] overflow-y-auto space-y-4 bg-white font-sans text-xs shrink-0"
            >
              {messages.map((msg) => (
                <div
                  key={msg.id}
                  className={`flex items-start gap-2.5 ${
                    msg.sender === 'user' ? 'flex-row-reverse' : ''
                  }`}
                >
                  <div
                    className={`w-7 h-7 shrink-0 flex items-center justify-center border-2 border-[#111111] font-mono text-[10px] font-black ${
                      msg.sender === 'user'
                        ? 'bg-[#FFD54F] text-[#111111]'
                        : 'bg-[#4F8EFF] text-white'
                    }`}
                  >
                    {msg.sender === 'user' ? 'YOU' : 'RUDY'}
                  </div>

                  <div
                    className={`p-3.5 border-2 border-[#111111] max-w-[85%] neo-shadow-premium font-medium whitespace-pre-wrap leading-relaxed ${
                      msg.sender === 'user'
                        ? 'bg-[#FFD54F]/30 text-[#111111]'
                        : 'bg-[#FFF9F0] text-[#111111]'
                    }`}
                  >
                    {msg.text}
                    <span className="block font-mono text-[9px] opacity-50 mt-1 text-right">
                      {msg.timestamp}
                    </span>
                  </div>
                </div>
              ))}

              {isTyping && (
                <div className="flex items-center gap-2 font-mono text-xs font-bold text-[#4F8EFF]">
                  <RefreshCw className="w-3.5 h-3.5 animate-spin" />
                  <span>Rudy AI is typing...</span>
                </div>
              )}
              <div ref={messagesEndRef} />
            </div>

            {/* Input Form */}
            <form
              onSubmit={(e) => {
                e.preventDefault();
                handleSend();
              }}
              className="p-3 bg-[#111111]/5 border-t-4 border-[#111111] flex gap-2 shrink-0"
            >
              <input
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder="Ask Rudy about projects, stack, certs..."
                className="flex-1 px-4 py-2.5 bg-white text-[#111111] border-2 border-[#111111] font-sans font-bold text-xs outline-none focus:border-[#4F8EFF] placeholder:text-[#111111]/40"
              />
              <button
                type="submit"
                onMouseEnter={playHover}
                disabled={!input.trim() || isTyping}
                className="px-4 py-2.5 bg-[#4F8EFF] text-[#111111] border-2 border-[#111111] font-display font-black text-xs hover:bg-[#FFD54F] transition-colors disabled:opacity-50 flex items-center justify-center cursor-pointer neo-shadow-premium"
              >
                <Send className="w-4 h-4 stroke-[2.5]" />
              </button>
            </form>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}

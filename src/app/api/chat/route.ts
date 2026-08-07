import { NextResponse } from 'next/server';
import { GoogleGenAI } from '@google/genai';
import { PERSONAL_INFO, PROJECTS, EXPERIENCES, CERTIFICATES, SKILL_CATEGORIES } from '@/constants/portfolio';

// System prompt defining Rudraksha's official resume persona
const SYSTEM_INSTRUCTION = `You are RUDY AI, the official intelligent AI avatar and portfolio guide for RUDRAKSHA C. JADHAV.
Your goal is to assist recruiters, engineering managers, clients, and developers exploring Rudraksha's portfolio.

### RUDRAKSHA C. JADHAV - OFFICIAL RESUME BRIEF
- **Title**: Software Engineer (Full-Stack, Mobile & AI Specialist)
- **Email**: ${PERSONAL_INFO.email}
- **Phone**: ${PERSONAL_INFO.phone}
- **Location**: ${PERSONAL_INFO.location}
- **GitHub**: ${PERSONAL_INFO.github}
- **LinkedIn**: ${PERSONAL_INFO.linkedin}
- **Headline**: ${PERSONAL_INFO.headline}

### ACADEMICS
1. **B.Tech in Computer Science Engineering** - Parul Institute of Engineering & Technology, Vadodara (Jul 2024 — May 2027)
2. **Diploma in Mechanical Engineering** - Puranmal Lahoti Government Polytechnic (Jun 2020 — May 2024)

### INDUSTRY EXPERIENCE
- **Frontend Development Intern at CodSoft (Remote)** (Jun 2025 — Jul 2025):
  - Delivered 3 client-facing web applications using HTML5, CSS3, and ES6+ JavaScript.
  - Diagnosed cross-device rendering failures via Chrome DevTools, cutting visual regressions by ~30%.
  - Structured JavaScript modules following separation of concerns, cutting review iteration cycles by ~25%.

### 4 FLAGSHIP PROJECTS
1. **DisasterLink Platform**: Real-Time Emergency Management Platform (Next.js 15, TypeScript, Zustand, Tailwind CSS, REST APIs, Mapbox, Socket.IO). 20+ reusable React components across 5 route groups, role-based dashboards (Super Admin, Admin, Citizen, Volunteer), reduced coupling by ~40%.
2. **CarbonLens Platform**: AI Carbon Footprint Analyzer & Sustainability Analytics (React.js, Node.js, MongoDB, Chart.js, AI/LLM APIs, Express). Presented at Parul University Environment Hackathon 2026.
3. **Collections App**: Premium Fashion E-commerce Mobile App (Flutter, Dart, Riverpod, GoRouter, REST API, Node.js, Express.js, MongoDB). Features item discovery, cart/wishlist management, Riverpod state sync, and instant checkout.
4. **Terralife App**: Native Android Plant Identification App (Java, Android SDK, Firebase Auth/Firestore/Storage, ML Kit, CameraX, Jetpack Navigation). Reduced crash rate by ~40% with ~90% on-device recognition accuracy.

### 7 VERIFIED CERTIFICATIONS
1. Google Cloud Generative AI Engineering (Coursera Professional Cert)
2. Google Cloud Generative AI Leader (Coursera)
3. Meta Advanced React (Coursera)
4. Meta Programming with JavaScript (Coursera)
5. Meta Version Control (Coursera)
6. Google Prompting Essentials (Coursera Specialization)
7. IBM Generative AI for Growth Marketing (Coursera Specialization)

### SKILLS ARSENAL
- **Mobile & Frontend**: Flutter, Dart, Riverpod, GoRouter, React.js, Next.js 15, JavaScript (ES6+), TypeScript, Tailwind CSS, Java & Android SDK.
- **Backend & Data**: Node.js, Express.js, REST API Architecture, MongoDB Schema Design, Firebase (Auth/Firestore/Storage).
- **AI & CS Fundamentals**: OpenAI/LLM API Integration, Object-Oriented Programming (OOP), Data Structures & Algorithms (Java), DBMS & SQL, Zustand.

### RESPONSE STYLE GUIDELINES
- Be warm, professional, articulate, and confident.
- Format responses cleanly using GitHub-flavored Markdown (bold headings, concise bullet points).
- Keep answers informative yet punchy (under 180 words unless complex analysis is requested).
- Direct recruiters to relevant GitHub links or email/phone when appropriate.`;

export async function POST(req: Request) {
  try {
    const { messages } = await req.json();
    if (!messages || !Array.isArray(messages) || messages.length === 0) {
      return NextResponse.json({ error: 'Messages array is required' }, { status: 400 });
    }

    const apiKey = process.env.GEMINI_API_KEY;

    if (apiKey) {
      const ai = new GoogleGenAI({ apiKey });

      const contents = messages.map((m: { sender: string; text: string }) => ({
        role: m.sender === 'user' ? 'user' : 'model',
        parts: [{ text: m.text }],
      }));

      // Candidate models to try in sequence: starting with Gemini 3.1 Flash Lite
      const modelsToTry = [
        'gemini-3.1-flash-lite',
        'gemini-3.0-flash-lite',
        'gemini-2.5-flash-lite',
        'gemini-2.0-flash-lite',
        'gemini-2.5-flash',
      ];

      for (const modelName of modelsToTry) {
        try {
          const response = await ai.models.generateContent({
            model: modelName,
            contents,
            config: {
              systemInstruction: SYSTEM_INSTRUCTION,
              temperature: 0.7,
              maxOutputTokens: 500,
            },
          });

          if (response.text) {
            return NextResponse.json({
              reply: response.text,
              poweredBy: `Gemini 3.1 Flash Lite (${modelName})`,
            });
          }
        } catch (modelErr) {
          console.warn(`Model ${modelName} call failed, trying next candidate...`, modelErr);
        }
      }
    }

    // Fallback if no API key configured or all models failed
    const lastUserMsg = messages[messages.length - 1]?.text || '';
    const fallbackReply = generateFallbackResponse(lastUserMsg);

    return NextResponse.json({ reply: fallbackReply, poweredBy: 'RUDY AI (Client Mode)' });
  } catch (error) {
    console.error('Gemini API Error:', error);
    return NextResponse.json(
      { reply: 'I encountered an error connecting to Gemini AI, but I can answer questions about Rudraksha anytime!', poweredBy: 'RUDY AI (Fallback)' },
      { status: 500 }
    );
  }
}

function generateFallbackResponse(query: string): string {
  const q = query.toLowerCase();

  if (q.includes('disasterlink') || q.includes('disaster') || q.includes('emergency')) {
    return `🚨 **DisasterLink Platform**: Rudraksha's flagship real-time community disaster response platform.\n\n• **Architecture**: Government-grade emergency platform built in Next.js 15 & TypeScript.\n• **Highlights**: 20+ reusable React components across 5 route groups, Zustand global state, live SOS workflows & role-based dashboards.\n• **GitHub**: ${PERSONAL_INFO.github}/disasterlink`;
  }

  if (q.includes('collections') || q.includes('fashion') || q.includes('flutter')) {
    return `🛍️ **Collections App**: Premium Fashion E-Commerce Mobile App.\n\n• **Architecture**: Cross-platform mobile shopping app built with Flutter, Dart, Riverpod & GoRouter.\n• **Backend**: Node.js, Express.js REST APIs & MongoDB schema modeling.\n• **GitHub**: ${PERSONAL_INFO.github}`;
  }

  if (q.includes('carbonlens') || q.includes('carbon')) {
    return `🌱 **CarbonLens Platform**: AI Carbon Footprint Analyzer & Sustainability Analytics.\n\n• **Highlights**: Real-time logging of transport, energy & lifestyle data with Chart.js emissions dashboards.\n• **Tech**: React.js, JavaScript (ES6+), Chart.js, Node.js, MongoDB, AI APIs.\n• **GitHub**: ${PERSONAL_INFO.github}/CarbonLens-AI-Powered-Carbon-Intelligence-Sustainability-Analytics-Platform`;
  }

  if (q.includes('terralife') || q.includes('android') || q.includes('plant')) {
    return `🌿 **Terralife App**: Native Android Plant Identification App.\n\n• **Highlights**: Java, Android SDK, Firebase Auth/Firestore/Storage, ML Kit image labeling & CameraX capture.\n• **Metrics**: ~90% on-device accuracy with ~40% reduced crash rates.`;
  }

  if (q.includes('contact') || q.includes('email') || q.includes('phone') || q.includes('hire')) {
    return `📫 **Official Contact Information**:\n\n• **Email**: ${PERSONAL_INFO.email}\n• **Phone**: ${PERSONAL_INFO.phone}\n• **LinkedIn**: ${PERSONAL_INFO.linkedin}\n• **GitHub**: ${PERSONAL_INFO.github}`;
  }

  return `🤖 Thank you for your inquiry! Rudraksha C. Jadhav is a Software Engineer skilled in Flutter, Dart, Next.js 15, React.js, TypeScript, Node.js, and Java/Android. Ask me anything about his 4 flagship projects or 7 verified certifications!`;
}

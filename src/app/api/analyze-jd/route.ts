import { NextResponse } from 'next/server';
import { GoogleGenAI } from '@google/genai';
import { PERSONAL_INFO, PROJECTS, EXPERIENCES, CERTIFICATES, SKILL_CATEGORIES } from '@/constants/portfolio';

const RESUME_SUMMARY = `
CANDIDATE: RUDRAKSHA C. JADHAV
TITLE: Software Engineer (Full-Stack, Mobile & AI Specialist)
EMAIL: ${PERSONAL_INFO.email}
PHONE: ${PERSONAL_INFO.phone}
GITHUB: ${PERSONAL_INFO.github}
LINKEDIN: ${PERSONAL_INFO.linkedin}

ACADEMICS:
- B.Tech CSE at Parul Institute of Engineering & Technology, Vadodara (2024-2027)
- Diploma in Mechanical Engineering from Puranmal Lahoti Polytechnic (2020-2024)

EXPERIENCE:
- Frontend Development Intern at CodSoft (Jun 2025 - Jul 2025): Delivered 3 client web apps, cut visual regressions by ~30%, cut review cycles by ~25%.

4 FLAGSHIP PROJECTS:
1. DisasterLink Platform: Next.js 15, TypeScript, Zustand, Mapbox, Socket.IO real-time emergency dashboard.
2. CarbonLens Platform: React.js, Node.js, MongoDB, Chart.js, AI APIs sustainability tracker (Parul Environment Hackathon 2026).
3. Collections App: Flutter, Dart, Riverpod, GoRouter, REST API, Node.js, Express.js, MongoDB fashion e-commerce mobile app.
4. Terralife App: Native Java Android app, Firebase, ML Kit image labeling, CameraX, Jetpack Navigation (~90% accuracy).

7 VERIFIED CERTIFICATIONS:
Google Cloud Generative AI Engineering, Google Cloud Generative AI Leader, Meta Advanced React, Meta JavaScript, Meta Version Control, Google Prompting Essentials, IBM Generative AI for Growth Marketing.

SKILLS:
Flutter, Dart, Riverpod, GoRouter, React.js, Next.js 15, JavaScript (ES6+), TypeScript, Tailwind CSS, Java, Android SDK, Node.js, Express.js, REST APIs, MongoDB, Firebase, AI/LLM APIs, Data Structures & Algorithms.
`;

export async function POST(req: Request) {
  try {
    const { jobDescription, jobTitle } = await req.json();

    if (!jobDescription || typeof jobDescription !== 'string' || jobDescription.trim().length < 10) {
      return NextResponse.json({ error: 'Please provide a valid Job Description' }, { status: 400 });
    }

    const apiKey = process.env.GEMINI_API_KEY;

    if (apiKey) {
      const ai = new GoogleGenAI({ apiKey });

      const prompt = `
You are an expert technical recruiter analyzing job compatibility for candidate RUDRAKSHA C. JADHAV.

Target Job Title/Role: ${jobTitle || 'Software Engineer'}
Job Description Provided:
"""
${jobDescription}
"""

Candidate Resume & Portfolio Data:
"""
${RESUME_SUMMARY}
"""

Your task is to analyze how well Rudraksha matches this job description and generate a structured JSON analysis strictly following this format:
{
  "matchScore": number (between 75 and 98),
  "matchCategory": string ("EXCELLENT MATCH" or "STRONG MATCH" or "GREAT FIT"),
  "summary": string (2 concise sentences summarizing why Rudraksha is a great fit),
  "matchingSkills": [string, string, string, string],
  "matchingProjects": [
    { "title": string, "reason": string },
    { "title": string, "reason": string }
  ],
  "tailoredPitch": string (A 2-3 sentence compelling elevator pitch addressed to the hiring manager)
}

DO NOT include any markdown code blocks (like \`\`\`json). Return ONLY raw valid JSON text.
`;

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
            contents: [{ role: 'user', parts: [{ text: prompt }] }],
            config: {
              temperature: 0.3,
              maxOutputTokens: 800,
            },
          });

          const rawText = response.text?.trim() || '';
          const cleanedText = rawText.replace(/^```json\s*/i, '').replace(/```$/i, '').trim();
          const parsedJSON = JSON.parse(cleanedText);

          return NextResponse.json({
            success: true,
            analysis: parsedJSON,
            poweredBy: modelName,
          });
        } catch (err) {
          console.warn(`Model ${modelName} JD analysis failed, trying next fallback...`, err);
        }
      }
    }

    // Fallback static analysis if no API key or network failure
    return NextResponse.json({
      success: true,
      analysis: {
        matchScore: 94,
        matchCategory: 'EXCELLENT MATCH',
        summary: `Rudraksha C. Jadhav brings full-stack development experience across Next.js 15, React, Flutter, Node.js, and Java/Android that closely aligns with your technical requirements.`,
        matchingSkills: ['React.js & Next.js 15', 'Flutter & Dart', 'Node.js & Express REST APIs', 'MongoDB & State Management'],
        matchingProjects: [
          { title: 'DisasterLink Platform', reason: 'Demonstrates Next.js 15, TypeScript, Zustand, and real-time dashboard engineering.' },
          { title: 'Collections App', reason: 'Highlights cross-platform Flutter/Dart mobile development with Riverpod and Node.js REST APIs.' }
        ],
        tailoredPitch: `With 4 production-grade projects spanning web dashboards, native mobile apps, and AI platforms—backed by 7 Google & Meta certifications—I am ready to deliver high-impact engineering solutions for your team.`
      },
      poweredBy: 'RUDY AI (Client Fallback)',
    });
  } catch (error) {
    console.error('JD Match API Error:', error);
    return NextResponse.json(
      { error: 'Failed to analyze Job Description with Gemini AI' },
      { status: 500 }
    );
  }
}

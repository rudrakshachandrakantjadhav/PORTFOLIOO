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
    const { jobDescription, jobTitle, companyName } = await req.json();

    if (!jobDescription || typeof jobDescription !== 'string' || jobDescription.trim().length < 5) {
      return NextResponse.json({ error: 'Please provide a valid Job Description' }, { status: 400 });
    }

    const apiKey = process.env.GEMINI_API_KEY;

    if (apiKey) {
      const ai = new GoogleGenAI({ apiKey });

      const prompt = `
You are an elite technical hiring director and ATS compatibility analyzer evaluating candidate RUDRAKSHA C. JADHAV.

Target Job Title: ${jobTitle || 'Software Engineer'}
Company: ${companyName || 'Target Organization'}
Job Description Provided:
"""
${jobDescription}
"""

Candidate Resume & Portfolio Data:
"""
${RESUME_SUMMARY}
"""

Analyze how well Rudraksha matches this job description and generate a complete structured JSON response matching this EXACT schema:
{
  "matchScore": number (between 78 and 98),
  "atsScore": number (between 82 and 99),
  "matchCategory": string ("EXCELLENT MATCH" or "STRONG MATCH" or "GREAT FIT"),
  "verdictRating": string ("★★★★★ Excellent Fit" or "★★★★☆ Strong Fit"),
  "recommendedAction": string ("INTERVIEW CANDIDATE" or "SHORTLIST IMMEDIATELY"),
  "summary": string (2-3 concise sentences summarizing why Rudraksha is an outstanding candidate),
  "strengths": [string, string, string, string],
  "matchingSkills": [string, string, string, string, string, string],
  "missingSkills": [string, string],
  "matchingProjects": [
    { "title": string, "score": number, "reason": string },
    { "title": string, "score": number, "reason": string },
    { "title": string, "score": number, "reason": string }
  ],
  "interviewQuestions": [
    { "question": string, "answer": string },
    { "question": string, "answer": string },
    { "question": string, "answer": string }
  ],
  "salaryBenchmark": { "typical": "₹8–14 LPA", "marketDemand": "Very High", "competition": "Medium" },
  "hiringProbability": { "recruiterInterest": "🔥🔥🔥🔥☆", "likelyInterview": "89%", "likelyShortlist": "91%" },
  "tailoredPitch": string (A 2-3 sentence elevator pitch),
  "coverLetter": string (A formal 3-paragraph cover letter snippet),
  "linkedinMessage": string (A 2-sentence LinkedIn connection message),
  "suggestedPath": [string, string, string, string]
}

DO NOT include markdown backticks (like \`\`\`json). Return ONLY valid raw JSON text.
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
              maxOutputTokens: 1200,
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
          console.warn(`Model ${modelName} JD analysis failed, trying fallback...`, err);
        }
      }
    }

    // Fallback static ATS analysis
    return NextResponse.json({
      success: true,
      analysis: {
        matchScore: 94,
        atsScore: 97,
        matchCategory: 'EXCELLENT MATCH',
        verdictRating: '★★★★★ Excellent Fit',
        recommendedAction: 'INTERVIEW CANDIDATE',
        summary: `Rudraksha C. Jadhav brings full-stack development experience across Next.js 15, React, Flutter, Node.js, and Java/Android that closely aligns with your technical requirements.`,
        strengths: ['Full-Stack Web & Mobile Architecture', 'Flutter & Riverpod State Management', 'AI/LLM API Integration', 'Production 4-Project Portfolio'],
        matchingSkills: ['React.js', 'Next.js 15', 'TypeScript', 'Flutter & Dart', 'Node.js & Express', 'MongoDB'],
        missingSkills: ['Docker & Containerization', 'AWS Cloud Services'],
        matchingProjects: [
          { title: 'CarbonLens Platform', score: 95, reason: 'Demonstrates React, Node.js, MongoDB, Chart.js & AI APIs.' },
          { title: 'Collections App', score: 92, reason: 'Highlights cross-platform Flutter/Dart development with Riverpod and Express REST APIs.' },
          { title: 'DisasterLink Platform', score: 89, reason: 'Government-grade Next.js 15 emergency management command dashboard.' }
        ],
        interviewQuestions: [
          { question: 'How do you manage complex state in Next.js 15 vs Flutter apps?', answer: 'In Next.js 15, I utilize Zustand for global state. In Flutter, I leverage Riverpod StateNotifiers for declarative reactive state binding.' },
          { question: 'Describe your experience building AI-integrated web applications.', answer: 'In CarbonLens, I connected OpenAI/LLM API endpoints with Node.js controllers to compute real-time carbon mitigation recommendations.' },
          { question: 'How do you ensure 100% visual responsiveness across mobile and web viewports?', answer: 'I perform DevTools responsive testing across 4 viewports, enforcing ARIA accessibility and Tailwind CSS utilities.' }
        ],
        salaryBenchmark: { typical: '₹8–14 LPA', marketDemand: 'Very High', competition: 'Medium' },
        hiringProbability: { recruiterInterest: '🔥🔥🔥🔥☆', likelyInterview: '89%', likelyShortlist: '91%' },
        tailoredPitch: `Based on your job requirements, my experience building Next.js 15 emergency platforms, Flutter mobile apps, and AI tools makes me an immediate high-impact addition to your engineering team.`,
        coverLetter: `Dear Hiring Manager,\n\nI am writing to express my strong interest in your Software Engineer position. Having built production platforms with Next.js 15, Flutter, Node.js, and MongoDB—backed by 7 verified Google and Meta certifications—I bring the end-to-end technical capabilities required to deliver scale from Day 1.\n\nSincerely,\nRudraksha C. Jadhav`,
        linkedinMessage: `Hi! I noticed your opening for a Software Engineer. My background spans Next.js 15, Flutter, Node.js, and AI integrations with 4 production projects. Would love to share my portfolio: https://github.com/rudraksha-jadhav`,
        suggestedPath: ['Projects Section', 'CarbonLens AI App', 'Collections Flutter App', 'Full Resume PDF']
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

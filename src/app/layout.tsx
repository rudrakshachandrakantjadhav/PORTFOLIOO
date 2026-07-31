import type { Metadata } from 'next';
import { Space_Grotesk, Inter, JetBrains_Mono } from 'next/font/google';
import '@/styles/globals.css';
import { ThemeProvider } from '@/components/theme/ThemeProvider';
import { SoundProvider } from '@/components/providers/SoundProvider';
import { LenisProvider } from '@/components/animations/LenisProvider';
import { CommandPalette } from '@/components/layout/CommandPalette';
import { Analytics } from '@vercel/analytics/react';
import { SpeedInsights } from '@vercel/speed-insights/next';

const spaceGrotesk = Space_Grotesk({
  subsets: ['latin'],
  variable: '--font-space-grotesk',
  weight: ['300', '400', '500', '600', '700'],
  display: 'swap',
});

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
  weight: ['300', '400', '500', '600', '700'],
  display: 'swap',
});

const jetbrainsMono = JetBrains_Mono({
  subsets: ['latin'],
  variable: '--font-mono',
  weight: ['400', '500', '600', '700'],
  display: 'swap',
});

export const metadata: Metadata = {
  title: 'RUDRAKSHA JADHAV | Senior Software Engineer & AI Specialist',
  description: 'Portfolio of Rudraksha Jadhav — Building scalable web applications, AI-powered solutions, and modern digital experiences with technical precision.',
  keywords: ['Rudraksha Jadhav', 'Software Engineer', 'Full Stack Developer', 'AI Engineer', 'Next.js', 'React', 'TypeScript', 'Portfolio'],
  authors: [{ name: 'Rudraksha Jadhav' }],
  creator: 'Rudraksha Jadhav',
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: 'https://rudraksha.dev',
    title: 'RUDRAKSHA JADHAV | Senior Software Engineer & AI Specialist',
    description: 'Building scalable web applications, AI-powered solutions, and modern digital experiences.',
    siteName: 'Rudraksha Jadhav Portfolio',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'RUDRAKSHA JADHAV | Senior Software Engineer & AI Specialist',
    description: 'Building scalable web applications, AI-powered solutions, and modern digital experiences.',
    creator: '@rudraksha',
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="en"
      suppressHydrationWarning
      className={`${spaceGrotesk.variable} ${inter.variable} ${jetbrainsMono.variable} scroll-smooth light`}
    >
      <head>
        <link
          rel="stylesheet"
          href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:wght,FILL@100..700,0..1&display=swap"
        />
      </head>
      <body
        suppressHydrationWarning
        className="font-body-md overflow-x-hidden antialiased selection:bg-[#FFD54F] selection:text-[#111111] bg-[#FFF9F0] text-[#111111]"
      >
        <ThemeProvider defaultTheme="light">
          <SoundProvider>
            <LenisProvider>
              {children}
              <CommandPalette />
              <Analytics />
              <SpeedInsights />
            </LenisProvider>
          </SoundProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}

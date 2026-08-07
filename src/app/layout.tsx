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
  metadataBase: new URL('https://github.com/rudraksha-jadhav/PORTFOLIOO'),
  title: 'RUDRAKSHA C. JADHAV | Software Engineer & AI Specialist',
  description: 'Official Portfolio of Rudraksha C. Jadhav — Software Engineer skilled in Flutter, React.js, Next.js 15, Node.js, Express, MongoDB, Java/Android, and Gemini AI API integrations.',
  keywords: [
    'Rudraksha Jadhav',
    'Software Engineer',
    'Full Stack Developer',
    'Flutter Developer',
    'React Developer',
    'Next.js 15',
    'AI Engineer',
    'Gemini AI',
    'Portfolio'
  ],
  authors: [{ name: 'Rudraksha C. Jadhav' }],
  creator: 'Rudraksha C. Jadhav',
  icons: {
    icon: '/favicon.svg',
    shortcut: '/favicon.svg',
    apple: '/favicon.svg',
  },
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: 'https://github.com/rudraksha-jadhav/PORTFOLIOO',
    title: 'RUDRAKSHA C. JADHAV | Software Engineer & AI Specialist',
    description: 'Building government-grade emergency platforms, AI-powered sustainability tools, and native cross-platform mobile applications.',
    siteName: 'Rudraksha C. Jadhav Portfolio',
    images: [
      {
        url: '/rudraksha.jpg',
        width: 1200,
        height: 630,
        alt: 'Rudraksha C. Jadhav Software Engineer Portfolio',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'RUDRAKSHA C. JADHAV | Software Engineer & AI Specialist',
    description: 'Building government-grade emergency platforms, AI-powered tools, and Flutter mobile applications.',
    images: ['/rudraksha.jpg'],
    creator: '@rudrakshajadhav',
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

export interface Project {
  id: string;
  slug: string;
  title: string;
  subtitle: string;
  description: string;
  fullDescription: string;
  tags: string[];
  techStack: string[];
  category: 'AI' | 'FINTECH' | 'DATA' | 'WEB3' | 'ECOMMERCE';
  image: string;
  imageAlt: string;
  liveUrl?: string;
  githubUrl?: string;
  featured: boolean;
  size?: 'sm' | 'lg';
  highlights: string[];
  metrics?: { label: string; value: string }[];
}

export interface SkillCategory {
  title: string;
  accentColor: 'blue' | 'green' | 'coral' | 'yellow' | 'lavender';
  skills: {
    name: string;
    icon?: string;
    level?: string;
  }[];
}

export interface ExperienceItem {
  id: string;
  period: string;
  role: string;
  company: string;
  description: string;
  accentColor: 'blue' | 'green' | 'coral' | 'yellow';
  highlights: string[];
}

export interface CertificateItem {
  id: string;
  title: string;
  subtitle?: string;
  issuer: string;
  issuerBadge?: string;
  date: string;
  verifyUrl?: string;
  coursesCount?: number;
  courses?: string[];
  registrationNo?: string;
  certificateNo?: string;
  accentColor: 'yellow' | 'lavender' | 'green' | 'coral' | 'blue';
  rotation: string;
}

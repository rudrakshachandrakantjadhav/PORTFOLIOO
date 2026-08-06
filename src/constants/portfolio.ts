import { Project, SkillCategory, ExperienceItem, CertificateItem } from '@/types';

export const PERSONAL_INFO = {
  name: 'RUDRAKSHA C. JADHAV',
  shortName: 'RJ.',
  title: 'SOFTWARE ENGINEER',
  headline: 'Final-year B.Tech Computer Engineering student who builds complete products end-to-end – frontend, backend, data layer, and deployment – across React, Next.js, Flutter, Node.js, and Java/Android.',
  aboutBioLight: 'Final-year B.Tech Computer Engineering student at Parul Institute of Engineering & Technology, Vadodara. Work spans an emergency-response dashboard (DisasterLink), an AI-integrated analytics platform (CarbonLens), a native Android app (Terralife), and a Flutter fashion e-commerce app (Collections), backed by two Generative AI certifications (Google Cloud, via Coursera) and self-directed Data Structures & Algorithms study (Java).',
  aboutBioDark: 'Experienced in architecting role-based dashboards, modeling MongoDB schemas, building native Java Android & Flutter cross-platform apps with Riverpod & GoRouter, and integrating third-party AI/LLM APIs. Hold a Diploma in Mechanical Engineering from Puranmal Lahoti Government Polytechnic.',
  education: {
    degree: 'B.Tech in Computer Science Engineering',
    institution: 'Parul Institute of Engineering & Technology, Vadodara',
    period: 'Jul 2024 — May 2027',
  },
  diploma: {
    degree: 'Diploma in Mechanical Engineering',
    institution: 'Puranmal Lahoti Government Polytechnic',
    period: 'Jun 2020 — May 2024',
  },
  stats: [
    { label: 'Major Projects', value: '4' },
    { label: 'Certifications', value: '7' },
    { label: 'Degree Focus', value: 'B.Tech CSE' },
    { label: 'Open Source', value: '50+' },
  ],
  email: 'Rudrakshajadhav.work@gmail.com',
  phone: '+91 8010422174',
  github: 'https://github.com/rudraksha-jadhav',
  linkedin: 'https://www.linkedin.com/in/rudrakshajadhav/',
  twitter: 'https://twitter.com',
  location: 'Vadodara, India',
  availableForWork: true,
};

export const PROJECTS: Project[] = [
  {
    id: '1',
    slug: 'disasterlink',
    title: 'DisasterLink Platform',
    subtitle: 'Real-Time Emergency Management Platform',
    description: 'Next.js 15, TypeScript, Tailwind CSS, Zustand & REST APIs emergency management platform featuring role-based incident-command dashboards.',
    fullDescription: 'DisasterLink is a real-time emergency management platform connecting Super Admins, Admins, Citizens, and Volunteers during disaster situations. Architected role-based dashboards with a real-time incident-command view, engineering 20+ reusable React components across 5 route groups. Configured Zustand for global state and a service-layer abstraction over REST APIs, reducing coupling issues by ~40%, while resolving Windows-specific build and hydration errors to keep the pipeline stable.',
    tags: ['NEXTJS 15', 'TYPESCRIPT', 'ZUSTAND', 'EMERGENCY'],
    techStack: ['Next.js 15', 'TypeScript', 'Tailwind CSS', 'Zustand', 'Framer Motion', 'REST APIs', 'Mapbox', 'Socket.IO'],
    category: 'AI',
    image: '/disasterlink_mockup.jpg',
    imageAlt: 'DisasterLink Real-Time Emergency Command Dashboard',
    liveUrl: 'https://github.com/rudraksha-jadhav/disasterlink',
    githubUrl: 'https://github.com/rudraksha-jadhav/disasterlink',
    featured: true,
    size: 'lg',
    highlights: [
      'Architected role-based dashboards (Super Admin, Admin, Citizen, Volunteer) with real-time incident command view',
      'Engineered 20+ reusable React components across 5 route groups in Next.js 15 & TypeScript',
      'Configured Zustand global state & service-layer abstraction over REST APIs, reducing coupling by ~40%',
      'Resolved Windows-specific build and hydration errors keeping the production pipeline 100% stable'
    ],
    metrics: [
      { label: 'React Components', value: '20+' },
      { label: 'Route Groups', value: '5 Groups' },
      { label: 'Coupling Reduced', value: '~40%' }
    ]
  },
  {
    id: '2',
    slug: 'carbonlens',
    title: 'CarbonLens Platform',
    subtitle: 'AI-Powered Carbon Tracking Platform',
    description: 'Full-stack platform tracking emissions across transport, food, electricity, and screen time, integrating third-party AI/LLM APIs for real-time analysis.',
    fullDescription: 'CarbonLens is an AI-Powered Carbon Tracking Platform developed with React.js, Node.js, MongoDB, Chart.js, and AI/LLM APIs. Developed a full-stack platform tracking emissions across transport, food, electricity, and screen time, integrating third-party AI/LLM APIs for real-time personalized analysis. Modeled the MongoDB schema and backend API layer, designed Chart.js dashboards for sustainability trends, and presented the platform at the Parul University Environment Hackathon 2026.',
    tags: ['REACT.JS', 'NODE.JS', 'MONGODB', 'AI/LLM APIS'],
    techStack: ['React.js', 'Node.js', 'MongoDB', 'Chart.js', 'AI/LLM APIs', 'Tailwind CSS', 'Express'],
    category: 'AI',
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuC2babhh_bJ_fdHLR31BrcoOvPaS20TQmSYgdieXsjyXRx7-65jEFeiDo0a62NFEpB2Wv3Gctrvm8qCfdK8I567fwvsgxz_OgJyqu1-FAMnCo9zyX2fnZm63eBPm74nSVnU2ITXDmpk9pxng4UzpqSEqSCxx9cQL0L7rNmCok4su_tp7jKApNgHRIvcq6D1b-6c0mE02KKzKwK2ZFKLzmv1GVfRjdsOxTmHxIG_KltNhvFvAPQrLGrx9A',
    imageAlt: 'CarbonLens AI Carbon Intelligence Dashboard',
    liveUrl: 'https://github.com/rudraksha-jadhav/CarbonLens-AI-Powered-Carbon-Intelligence-Sustainability-Analytics-Platform',
    githubUrl: 'https://github.com/rudraksha-jadhav/CarbonLens-AI-Powered-Carbon-Intelligence-Sustainability-Analytics-Platform',
    featured: true,
    size: 'lg',
    highlights: [
      'Developed full-stack platform tracking emissions across transport, food, electricity & screen time',
      'Integrated third-party AI/LLM APIs for real-time personalized sustainability analysis',
      'Modeled MongoDB schema, backend API layer & Chart.js dashboards for sustainability trends',
      'Presented platform at the Parul University Environment Hackathon 2026'
    ],
    metrics: [
      { label: 'AI Analysis', value: 'Real-Time' },
      { label: 'Hackathon', value: 'Parul 2026' },
      { label: 'Database', value: 'MongoDB' }
    ]
  },
  {
    id: '3',
    slug: 'collections',
    title: 'Collections App',
    subtitle: 'Fashion E-commerce Mobile App',
    description: 'A premium fashion e-commerce mobile application built with Flutter, Dart, Riverpod, GoRouter, REST API, Node.js, Express.js, and MongoDB.',
    fullDescription: 'Collections is a premium fashion e-commerce mobile application built with Flutter that provides users with a seamless shopping experience. The app allows users to browse fashion products, view detailed product information, manage cart and wishlist items, authenticate accounts, and complete purchases through an intuitive and modern interface.',
    tags: ['FLUTTER', 'DART', 'RIVERPOD', 'ECOMMERCE'],
    techStack: ['Flutter', 'Dart', 'Riverpod', 'GoRouter', 'REST API', 'Node.js', 'Express.js', 'MongoDB'],
    category: 'ECOMMERCE',
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDfJM8c1nuxfqWxeDT4HsY3o6uFm-QAqr5QER2XPIWR1sDL58rt_8emmwuNnA-eO-KGVry_YAMsxgNCmfZMXkwKzFGY1jBVtnKgY6naS7rnAys9rAZ-MOWxE7wdKqLHNRYo6J6mGb-Z3WZ_X8WdJketh7V1LcxXm4-pWEQQxygmGzSx3CV1FhxDS-hOtIKYlzQLi2AcqRRUoLhFQFBzgW2Rbz2S00ClLV178H9fcxoFvDHhBI1mjvSVTQ',
    imageAlt: 'Collections Fashion E-commerce Mobile App',
    liveUrl: 'https://github.com/rudraksha-jadhav',
    githubUrl: 'https://github.com/rudraksha-jadhav',
    featured: true,
    size: 'lg',
    highlights: [
      'Engineered cross-platform mobile shopping UX with Flutter, Dart & Riverpod state management',
      'Implemented GoRouter navigation, cart/wishlist state persistence & secure auth flows',
      'Modeled Node.js, Express.js & MongoDB REST API backend for real-time catalog & order processing',
      'Created intuitive, modern mobile UI with seamless checkout and product discovery'
    ],
    metrics: [
      { label: 'State Sync', value: 'Riverpod' },
      { label: 'Platform', value: 'Flutter/Dart' },
      { label: 'Backend', value: 'Node/MongoDB' }
    ]
  },
  {
    id: '4',
    slug: 'terralife',
    title: 'Terralife App',
    subtitle: 'Native Android Plant Identification App',
    description: 'Native Java Android app featuring Firebase Auth/Firestore/Storage, ML Kit image labeling, CameraX capture, and Jetpack Navigation.',
    fullDescription: 'Terralife is a Native Android Plant Identification App constructed using Java, Android SDK, Firebase (Auth, Firestore, Storage), ML Kit, CameraX, and Jetpack Navigation. Constructed the complete Java project structure from scratch, fixed Gradle version conflicts, XML layout corruption, and MaterialCardView cast crashes, reducing crash rate by ~40% and reaching ~90% on-device recognition accuracy.',
    tags: ['JAVA', 'ANDROID SDK', 'FIREBASE', 'ML KIT'],
    techStack: ['Java', 'Android SDK', 'Firebase Auth', 'Firestore', 'Firebase Storage', 'ML Kit', 'CameraX', 'Jetpack Navigation'],
    category: 'AI',
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuA7QYTB8FE7gAutxb-F2uTc120Tp3_xGMADJnXkZB4Nw3zib0W_-7zP6Okc0F27NlI5wH1PV9GZMn5yovEBzDtIRmQhVfygHHwJsWztNi2pmSFFo3IhPvZ7fu5PlYm3xeIy08Gq3xamIbjRJpT2jrttFO3RVdNb_h32EusOOgbbYTa6aqKCmA_iv4hFfvIqpkemW0gI7TXe64sTkdiM4BaTw9uqygHQV1SACTa_cvHKrU9bZG38Vr4cUg',
    imageAlt: 'Terralife Native Android Plant App',
    liveUrl: 'https://github.com/rudraksha-jadhav',
    githubUrl: 'https://github.com/rudraksha-jadhav',
    featured: true,
    size: 'lg',
    highlights: [
      'Constructed complete Java Android project structure with Firebase Auth/Firestore/Storage & CameraX',
      'Implemented ML Kit on-device image labeling & Jetpack Navigation UI flows',
      'Fixed Gradle version conflicts, XML layout corruption & MaterialCardView crashes',
      'Reduced crash rate by ~40% while achieving ~90% on-device plant recognition accuracy'
    ],
    metrics: [
      { label: 'ML Accuracy', value: '~90%' },
      { label: 'Crash Reduction', value: '~40%' },
      { label: 'Framework', value: 'Android SDK' }
    ]
  }
];

export const SKILL_CATEGORIES: SkillCategory[] = [
  {
    title: 'FLUTTER & MOBILE FRONTEND',
    accentColor: 'blue',
    skills: [
      { name: 'Flutter', level: 'Expert' },
      { name: 'Dart', level: 'Expert' },
      { name: 'Riverpod State Mgmt', level: 'Expert' },
      { name: 'GoRouter Navigation', level: 'Expert' },
      { name: 'React.js & Next.js 15', level: 'Expert' },
      { name: 'JavaScript (ES6+) & TypeScript', level: 'Expert' },
      { name: 'Tailwind CSS & SCSS', level: 'Expert' },
      { name: 'Java & Android SDK', level: 'Expert' },
    ]
  },
  {
    title: 'BACKEND, APIS & DATA',
    accentColor: 'green',
    skills: [
      { name: 'Node.js', level: 'Expert' },
      { name: 'Express.js', level: 'Expert' },
      { name: 'REST API Architecture', level: 'Expert' },
      { name: 'MongoDB & Schema Modeling', level: 'Expert' },
      { name: 'Firebase (Auth, Firestore, Storage)', level: 'Advanced' },
      { name: 'CameraX & Jetpack Navigation', level: 'Advanced' },
      { name: 'ML Kit On-Device Vision', level: 'Advanced' },
    ]
  },
  {
    title: 'AI, LLMS & CS FUNDAMENTALS',
    accentColor: 'coral',
    skills: [
      { name: 'AI/LLM API Integration (OpenAI)', level: 'Advanced' },
      { name: 'AI-Assisted Dev (Claude, Copilot)', level: 'Expert' },
      { name: 'Object-Oriented Programming (OOP)', level: 'Expert' },
      { name: 'Data Structures & Algorithms (Java)', level: 'Advanced' },
      { name: 'DBMS Basics & SQL', level: 'Advanced' },
      { name: 'Zustand Global State', level: 'Advanced' },
    ]
  },
  {
    title: 'TOOLING & ARCHITECTURE',
    accentColor: 'yellow',
    skills: [
      { name: 'Git & GitHub Workflow', level: 'Expert' },
      { name: 'Chrome DevTools & Postman', level: 'Expert' },
      { name: 'Vercel Deployment', level: 'Expert' },
      { name: 'Building Toward: Kotlin', level: 'Learning' },
      { name: 'Building Toward: Python & PostgreSQL', level: 'Learning' },
      { name: 'Building Toward: Selenium & Jest', level: 'Learning' },
    ]
  }
];

export const EXPERIENCES: ExperienceItem[] = [
  {
    id: 'exp-1',
    period: 'Jun 2025 — Jul 2025',
    role: 'Frontend Development Intern',
    company: 'CodSoft (Remote)',
    description: 'Delivered 3 client-facing web applications using HTML5, CSS3, and ES6+ JavaScript within sprint-style deadlines, achieving 100% first-submission acceptance.',
    accentColor: 'green',
    highlights: [
      'Delivered 3 client-facing web applications using HTML5, CSS3, and ES6+ JavaScript within sprint deadlines, achieving 100% first-submission acceptance.',
      'Diagnosed cross-device rendering failures with Chrome DevTools, cutting visual regressions by ~30%.',
      'Organized JavaScript modules around component-level separation of concerns, cutting review cycles by ~25%.'
    ]
  }
];

export const CERTIFICATES: CertificateItem[] = [
  {
    id: 'cert-1',
    title: 'Generative AI Engineering',
    subtitle: 'Coursera Professional Certificate',
    issuer: 'Google Cloud',
    issuerBadge: 'Google Cloud',
    date: 'Aug 2025',
    verifyUrl: 'https://coursera.org/verify/professional-cert/Z1O9ATG5VRRX',
    accentColor: 'blue',
    rotation: 'rotate-1'
  },
  {
    id: 'cert-2',
    title: 'Generative AI Leader',
    subtitle: 'Coursera Certificate',
    issuer: 'Google Cloud',
    issuerBadge: 'Google Cloud',
    date: 'Aug 2025',
    verifyUrl: 'https://coursera.org/verify/professional-cert/Z1O9ATG5VRRX',
    accentColor: 'yellow',
    rotation: '-rotate-1'
  },
  {
    id: 'cert-3',
    title: 'Advanced React',
    subtitle: 'Meta Course Certificate',
    issuer: 'Meta',
    issuerBadge: 'Meta',
    date: 'Aug 18, 2025',
    verifyUrl: 'https://coursera.org/verify/F2CV91XJ2DQH',
    accentColor: 'coral',
    rotation: 'rotate-2'
  },
  {
    id: 'cert-4',
    title: 'Programming with JavaScript',
    subtitle: 'Meta Course Certificate',
    issuer: 'Meta',
    issuerBadge: 'Meta',
    date: 'Aug 16, 2025',
    verifyUrl: 'https://coursera.org/verify/JSE0844MJM44',
    accentColor: 'lavender',
    rotation: '-rotate-2'
  },
  {
    id: 'cert-5',
    title: 'Version Control',
    subtitle: 'Meta Course Certificate',
    issuer: 'Meta',
    issuerBadge: 'Meta',
    date: 'Aug 17, 2025',
    verifyUrl: 'https://coursera.org/verify/PMUIPJJS7ZWE',
    accentColor: 'green',
    rotation: 'rotate-1'
  },
  {
    id: 'cert-6',
    title: 'Google Prompting Essentials',
    subtitle: 'Specialization Certificate',
    issuer: 'Google',
    issuerBadge: 'Google',
    date: 'Aug 16, 2025',
    verifyUrl: 'https://coursera.org/verify/specialization/VW9J14OZ88NT',
    accentColor: 'yellow',
    rotation: '-rotate-1'
  },
  {
    id: 'cert-7',
    title: 'Generative AI for Growth Marketing',
    subtitle: 'Specialization Certificate',
    issuer: 'IBM & Starweaver',
    issuerBadge: 'IBM',
    date: 'Aug 17, 2025',
    verifyUrl: 'https://coursera.org/verify/specialization/AD4PMKWX9R9D',
    accentColor: 'blue',
    rotation: 'rotate-2'
  }
];

import { Project, SkillCategory, ExperienceItem, CertificateItem } from '@/types';

export const PERSONAL_INFO = {
  name: 'RUDRAKSHA C. JADHAV',
  shortName: 'RJ.',
  title: 'SOFTWARE ENGINEER',
  headline: 'Final-year B.Tech Computer Engineering student with hands-on experience crafting responsive, interaction-rich UIs using React.js, Next.js 15, and TypeScript.',
  aboutBioLight: 'Final-year B.Tech Computer Engineering student at Parul Institute of Engineering & Technology, Vadodara. Proficient in translating Figma designs to production-grade code, integrating REST APIs, and implementing DOM-level animations. Comfortable owning the complete frontend layer from component architecture to deployment on Vercel.',
  aboutBioDark: 'Experienced in building government-grade emergency disaster response platforms (DisasterLink) and AI carbon footprint intelligence tools (CarbonLens). Hold a Diploma in Mechanical Engineering from Puranmal Lahoti Government Polytechnic and a B.Tech in Computer Science & Engineering.',
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
    { label: 'Major Projects', value: '3' },
    { label: 'Certifications', value: '7' },
    { label: 'Degree Focus', value: 'B.Tech CSE' },
    { label: 'Open Source', value: '50+' },
  ],
  email: 'Rudrakshajadhav.work@gmail.com',
  phone: '+91 8010422174',
  github: 'https://github.com/rudrakshachandrakantjadhav',
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
    subtitle: 'Real-Time Community Disaster Response Platform',
    description: 'Government-grade emergency response platform in Next.js 15 and TypeScript, delivering role-based UI flows, live SOS workflows, and incident command dashboards.',
    fullDescription: 'DisasterLink is a full-stack disaster management and emergency response platform connecting citizens, rescue teams, relief organizations, and government authorities during natural disasters. Architected using Next.js 15, TypeScript, Tailwind CSS, Zustand, and REST APIs, it features live SOS workflows, role-based UI dashboards across 5 route groups, keyboard accessibility (ARIA), and mobile-first responsiveness across 4 viewport breakpoints.',
    tags: ['NEXTJS 15', 'TYPESCRIPT', 'ZUSTAND', 'EMERGENCY'],
    techStack: ['Next.js 15', 'TypeScript', 'Tailwind CSS', 'Zustand', 'Framer Motion', 'REST APIs', 'Mapbox', 'Socket.IO', 'YOLOv8'],
    category: 'AI',
    image: '/disasterlink_mockup.jpg',
    imageAlt: 'DisasterLink Real-Time Emergency Command Dashboard',
    liveUrl: 'https://github.com/rudrakshachandrakantjadhav/disasterlink',
    githubUrl: 'https://github.com/rudrakshachandrakantjadhav/disasterlink',
    featured: true,
    size: 'lg',
    highlights: [
      'Architected full frontend in Next.js 15 & TypeScript with role-based UI flows & live SOS workflows',
      'Engineered 20+ reusable React components across 5 route groups with Zustand global state management',
      'Implemented keyboard navigation, ARIA accessibility attributes, and semantic HTML5 across all flows',
      'Mobile-first responsive design with Tailwind CSS achieving consistent behavior across 4 viewport breakpoints'
    ],
    metrics: [
      { label: 'React Components', value: '20+' },
      { label: 'Route Groups', value: '5 Groups' },
      { label: 'Breakpoints', value: '4 Viewports' }
    ]
  },
  {
    id: '2',
    slug: 'carbonlens',
    title: 'CarbonLens Platform',
    subtitle: 'AI Carbon Footprint Analyzer & Sustainability Analytics',
    description: 'React.js AI Carbon footprint intelligence platform enabling users to log transport, energy, and lifestyle data and visualize AI-generated footprint analysis in real time.',
    fullDescription: 'CarbonLens is an AI-powered sustainability analytics platform constructed with React.js, clean ES6+ JavaScript, Chart.js, Node.js, MongoDB, and AI APIs. It visualizes sustainability scores and monthly emissions trends with dynamic Chart.js dashboards, maintaining sub-200ms UI feedback under concurrent user interactions.',
    tags: ['REACT.JS', 'CHART.JS', 'NODE.JS', 'AI APIS'],
    techStack: ['React.js', 'JavaScript (ES6+)', 'Chart.js', 'Node.js', 'MongoDB', 'AI APIs', 'Tailwind CSS'],
    category: 'AI',
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuC2babhh_bJ_fdHLR31BrcoOvPaS20TQmSYgdieXsjyXRx7-65jEFeiDo0a62NFEpB2Wv3Gctrvm8qCfdK8I567fwvsgxz_OgJyqu1-FAMnCo9zyX2fnZm63eBPm74nSVnU2ITXDmpk9pxng4UzpqSEqSCxx9cQL0L7rNmCok4su_tp7jKApNgHRIvcq6D1b-6c0mE02KKzKwK2ZFKLzmv1GVfRjdsOxTmHxIG_KltNhvFvAPQrLGrx9A',
    imageAlt: 'CarbonLens AI Carbon Intelligence Dashboard',
    liveUrl: 'https://github.com/rudrakshachandrakantjadhav/CarbonLens-AI-Powered-Carbon-Intelligence-Sustainability-Analytics-Platform',
    githubUrl: 'https://github.com/rudrakshachandrakantjadhav/CarbonLens-AI-Powered-Carbon-Intelligence-Sustainability-Analytics-Platform',
    featured: true,
    size: 'lg',
    highlights: [
      'Constructed complete React.js frontend with clean ES6+ JS for real-time transport & energy logging',
      'Designed Chart.js dashboards visualizing sustainability scores and monthly emissions trends without unnecessary re-renders',
      'Integrated REST API responses into the presentation layer with optimized state reconciliation maintaining sub-200ms feedback'
    ],
    metrics: [
      { label: 'UI Feedback', value: '<200ms' },
      { label: 'Visualizations', value: 'Chart.js' },
      { label: 'State Sync', value: 'Sub-second' }
    ]
  },
  {
    id: '3',
    slug: 'drishti',
    title: 'DRISHTI AI Defense',
    subtitle: 'Intelligent Computer Vision Surveillance Command',
    description: 'Intelligent Surveillance system leveraging computer vision for anomaly detection and automated security protocols in high-traffic urban environments.',
    fullDescription: 'DRISHTI is an advanced computer vision surveillance command platform designed for real-time video stream ingestion and neural object detection. Utilizing OpenCV, TensorFlow, and Dockerized microservices, it tracks target trajectories, flags unauthorized perimeter breaches, and triggers instant alerts.',
    tags: ['AI', 'SURVEILLANCE', 'OPENCV'],
    techStack: ['OpenCV', 'TensorFlow', 'Express', 'Docker', 'Python', 'React'],
    category: 'AI',
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuA7QYTB8FE7gAutxb-F2uTc120Tp3_xGMADJnXkZB4Nw3zib0W_-7zP6Okc0F27NlI5wH1PV9GZMn5yovEBzDtIRmQhVfygHHwJsWztNi2pmSFFo3IhPvZ7fu5PlYm3xeIy08Gq3xamIbjRJpT2jrttFO3RVdNb_h32EusOOgbbYTa6aqKCmA_iv4hFfvIqpkemW0gI7TXe64sTkdiM4BaTw9uqygHQV1SACTa_cvHKrU9bZG38Vr4cUg',
    imageAlt: 'DRISHTI High-Tech Surveillance Station',
    liveUrl: 'https://github.com/anandjadhav42004/Drishti',
    githubUrl: 'https://github.com/anandjadhav42004/Drishti',
    featured: true,
    size: 'lg',
    highlights: [
      'Multi-camera concurrent RTSP stream ingestion',
      'Sub-30ms bounding-box object classification',
      'Tactical HUD dashboard with cyber-intelligence styling',
      'Edge-device deployment via Docker containers'
    ],
    metrics: [
      { label: 'Stream Latency', value: '<30ms' },
      { label: 'Concurrent Feeds', value: '16 Channels' },
      { label: 'Detection Speed', value: '60 FPS' }
    ]
  }
];

export const SKILL_CATEGORIES: SkillCategory[] = [
  {
    title: 'FRONTEND & CORE',
    accentColor: 'blue',
    skills: [
      { name: 'React.js', level: 'Expert' },
      { name: 'Next.js 15', level: 'Expert' },
      { name: 'JavaScript (ES6+)', level: 'Expert' },
      { name: 'TypeScript', level: 'Expert' },
      { name: 'Tailwind CSS & SCSS', level: 'Expert' },
      { name: 'Framer Motion & Three.js', level: 'Expert' },
      { name: 'Mapbox & Leaflet GIS', level: 'Advanced' },
      { name: 'HTML5 & Accessibility (a11y)', level: 'Expert' },
    ]
  },
  {
    title: 'BACKEND & APIS',
    accentColor: 'green',
    skills: [
      { name: 'Node.js & Express.js', level: 'Advanced' },
      { name: 'Python & FastAPI', level: 'Advanced' },
      { name: 'Go (Golang)', level: 'Intermediate' },
      { name: 'Socket.IO (Real-Time)', level: 'Advanced' },
      { name: 'Zustand & REST APIs', level: 'Advanced' },
      { name: 'Firebase & JWT Auth', level: 'Advanced' },
    ]
  },
  {
    title: 'AI, ML & VISION',
    accentColor: 'coral',
    skills: [
      { name: 'YOLOv8 & OpenCV', level: 'Advanced' },
      { name: 'PyTorch & TensorFlow', level: 'Intermediate' },
      { name: 'NLP, LLMs & LangChain', level: 'Advanced' },
      { name: 'Chart.js Analytics', level: 'Advanced' },
      { name: 'AI APIs & Model Inference', level: 'Advanced' },
      { name: 'Predictive Telemetry', level: 'Advanced' },
    ]
  },
  {
    title: 'DATA, CLOUD & TOOLS',
    accentColor: 'yellow',
    skills: [
      { name: 'MongoDB Atlas & PostgreSQL', level: 'Advanced' },
      { name: 'Redis In-Memory Cache', level: 'Intermediate' },
      { name: 'Docker Containers', level: 'Advanced' },
      { name: 'Git / GitHub Workflow', level: 'Expert' },
      { name: 'Vercel & Cloudinary', level: 'Expert' },
      { name: 'Chrome DevTools & Postman', level: 'Expert' },
    ]
  }
];

export const EXPERIENCES: ExperienceItem[] = [
  {
    id: 'exp-1',
    period: 'Jun 2025 — Jul 2025',
    role: 'Frontend Development Intern',
    company: 'CodSoft (Remote)',
    description: 'Delivered client-facing web applications end-to-end using HTML5, CSS3, and ES6+ JavaScript within sprint deadlines, resolving cross-device rendering regressions.',
    accentColor: 'green',
    highlights: [
      'Delivered 3 client-facing web applications end-to-end using HTML5, CSS3, and ES6+ JavaScript within sprint-style deadlines, meeting all acceptance criteria on first submission.',
      'Diagnosed and resolved cross-device rendering failures via Chrome DevTools; corrected responsive layout breakpoints across mobile, tablet, and desktop viewports, reducing visual regressions.',
      'Structured JavaScript modules following component-level separation of concerns, improving code reusability and cutting review iteration cycles per project.'
    ]
  }
];

export const CERTIFICATES: CertificateItem[] = [
  {
    id: 'cert-1',
    title: 'Generative AI Leader',
    subtitle: 'Professional Certificate (5 Courses)',
    issuer: 'Google Cloud Training',
    issuerBadge: 'Google Cloud',
    date: 'Aug 17, 2025',
    verifyUrl: 'https://coursera.org/verify/professional-cert/Z1O9ATG5VRRX',
    coursesCount: 5,
    courses: [
      'Gen AI: Beyond the Chatbot',
      'Gen AI: Unlock Foundational Concepts',
      'Gen AI: Navigate the Landscape',
      'Gen AI Apps: Transform Your Work',
      'Gen AI Agents: Transform Your Organization'
    ],
    accentColor: 'blue',
    rotation: 'rotate-1'
  },
  {
    id: 'cert-2',
    title: 'Generative AI Engineering',
    subtitle: 'Coursera Professional Certificate',
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
    subtitle: 'Specialization Certificate (4 Courses)',
    issuer: 'Google',
    issuerBadge: 'Google',
    date: 'Aug 16, 2025',
    verifyUrl: 'https://coursera.org/verify/specialization/VW9J14OZ88NT',
    coursesCount: 4,
    courses: [
      'Start Writing Prompts like a Pro',
      'Design Prompts for Everyday Work Tasks',
      'Speed Up Data Analysis & Presentation Building',
      'Use AI as a Creative or Expert Partner'
    ],
    accentColor: 'yellow',
    rotation: '-rotate-1'
  },
  {
    id: 'cert-7',
    title: 'Generative AI for Growth Marketing',
    subtitle: 'Specialization Certificate (3 Courses)',
    issuer: 'IBM & Starweaver',
    issuerBadge: 'IBM',
    date: 'Aug 17, 2025',
    verifyUrl: 'https://coursera.org/verify/specialization/AD4PMKWX9R9D',
    coursesCount: 3,
    courses: [
      'Generative AI: Introduction & Applications',
      'Generative AI: Prompt Engineering Basics',
      'Grow with AI: Your AI-Driven Strategy'
    ],
    accentColor: 'blue',
    rotation: 'rotate-2'
  }
];

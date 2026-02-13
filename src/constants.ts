
import { Project, ProjectCategory, BlogPost, Quote, Stats } from './types';

export const PERSONAL_INFO = {
  name: "Vignesh Prakash",
  tagline: "Project Controls Specialist / AI Integration Architect / Creator / Founder",
  bio: "I build high-performance systems at the intersection of infrastructure, technology, and artificial intelligence. With a strong background in project controls, cost planning, and large-scale rail and construction projects, I specialize in transforming complex ideas into efficient, measurable, and scalable outcomes. My professional journey spans major infrastructure ecosystems, where precision in planning, execution, and financial control is critical. Today, I integrate AI-powered tools and digital workflows into engineering and management processes, helping individuals and organizations work smarter, faster, and with greater clarity. I focus on creating practical solutions that combine engineering discipline with modern technology. My work reflects a commitment to continuous learning, innovation, and building sustainable systems-both physical and digital. Driven by purpose and data, I aim to contribute to smarter cities, resilient infrastructure, and future-ready digital platforms.",
  location: "India",
  email: "hello@vigneshprakash.com",
  social: {
    linkedin: "https://linkedin.com/in/vigneshprakash",
    github: "https://github.com/vigneshprakash",
    twitter: ""
  },
};

export const INITIAL_PROJECTS: Project[] = [
  

  // ===== Academic Projects =====

  {
    id: "ug-1",
    title: "G+2 Offshore Mall Design",
    category: ProjectCategory.Academic,
    image: "/images/projects/mall-design.jpg",
    description:
      "I designed and planned a multi-storey commercial building from concept to execution readiness, covering structural analysis, layout optimization, and construction planning. This project built my fundamentals in real-world engineering design",
  },

  {
    id: "ug-2",
    title: "Retrofitting Using GFRP",
    category: ProjectCategory.Academic,
    image: "/images/projects/gfrp.jpg",
    description:
      "A technical research project focused on strengthening an existing G+2 structure using Glass Fibre Reinforced Polymer. I explored durability, load enhancement, and lifecycle performance laying your foundation in sustainable engineering.",
  },

  {
    id: "pg-1",
    title: "PERT/CPM Network Analysis",
    category: ProjectCategory.Academic,
    image: "/images/projects/pert-cpm.jpg",
    description:
      "A case study applying PERT & CPM techniques for scheduling and decision-making. I analyzed critical paths, delays, and optimization strategies for better project control.",
  },

  {
    id: "pg-2",
    title: "G+3 Supermarket Budget Planning",
    category: ProjectCategory.Academic,
    image: "/images/projects/budget.jpg",
    description:
      "End-to-end budgeting and financial tracking from project initiation to closure. This developed my skills in cost estimation, cash flow monitoring, and performance measurement.",
  },

  // ===== Professional Projects =====

  {
    id: "pro-1",
    title: "Mumbai Metro Line-3 (Underground)",
    category: ProjectCategory.Infrastructure,
    image: "/images/projects/metro.jpg",
    description:
      "Ground stabilization and soil improvement work, Progress monitoring and reporting, Client coordination and site planning, Quality and safety compliance across 16 underground stations under MML-03 package.",
  },

  {
    id: "pro-2",
    title: "Lodha Supremus-Facade Works",
    category: ProjectCategory.Infrastructure,
    image: "/images/projects/lodha.jpg",
    description:
      "Elevation engineering coordination, Project Invoicing, Interface management with structural and architectural teams",
  },

  {
    id: "pro-3",
    title: "Samsung Office-Worli",
    category: ProjectCategory.Infrastructure,
    image: "/images/projects/samsung.jpg",
    description:
      "Interior wall panel installation, Project Invoicing, Coordination with MEP and interior designers.",
  },

  {
    id: "pro-4",
    title: "Lodha MTM-Clubhouse",
    category: ProjectCategory.Infrastructure,
    image: "/images/projects/clubhouse.jpg",
    description:
      "Structural and architectural coordination, Vendor management, Project Invoicing.",
  },

  {
    id: "pro-5",
    title: "Mumbai–Ahmedabad High-Speed Rail",
    category: ProjectCategory.Infrastructure,
    image: "/images/projects/mahsr.jpg",
    description:
      "Project planning and scheduling, Progress tracking and reporting, Cost monitoring and control, Coordination with cross functional teams for Viaducts,Tunnels and Stations",
  },

  // ===== Ongoing & Startup =====

  {
    id: "ongoing-1",
    title: "Colt RMZ Data Centre – Mumbai",
    category: ProjectCategory.Ongoing,
    image: "/images/projects/datacenter.jpg",
    description:
      "End-to-end planning, scheduling, Cost planning and monitoring, Risk and milestone management for mission-critical data centre project.",
  },

  {
    id: "startup-1",
    title: "Startly – Procrastination Breaker",
    category: ProjectCategory.Startup,
    image: "/images/projects/startly.jpg",
    description:
      "Building an AI-powered productivity app from scratch to help users improve focus and discipline.",
  },

];

export const INITIAL_BLOGS: BlogPost[] = [
  {
    id: 'b1',
    title: 'The Engineering of Human Connection',
    excerpt: 'How transit systems and social networks share the same structural DNA.',
    content: 'Long form content here...',
    category: 'Philosophy',
    date: 'Oct 20, 2023',
    author: 'Vignesh Prakash',
    image: 'https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?auto=format&fit=crop&q=80&w=800'
  }
];

export const INITIAL_QUOTES: Quote[] = [
  {
    id: 'q1',
    text: "எண்ணிய முடிதல் வேண்டும், நல்லவே எண்ணல் வேண்டும். (Think clearly, and act with a pure heart.)",
    author: "Mahakavi Bharathiyar",
    source: "Thirukkural / Tamil Literature",
    approved: true
  }
];

// Fix: Added missing NAV_LINKS constant for Navigation.tsx
export const NAV_LINKS = [
  { name: 'Home', href: '#home' },
  { name: 'Journey', href: '#journey' },
  { name: 'Work', href: '#projects' },
  { name: 'Blog', href: '#blog' },
  { name: 'Hire', href: '#hire' },
];

// Fix: Added missing INITIAL_STATS constant for App.tsx
export const INITIAL_STATS: Stats = {
  projectsCount: 11,
  blogsCount: 1,
  appsBuilt: 0,
  followers: '0',
  subscribers: 0
};


export enum ProjectCategory {
  Academic = 'Academic',
  Infrastructure = 'Infrastructure',
  Ongoing = 'Ongoing',
  Startup = 'Startup',
  Freelance = 'Freelance'
}

export interface Project {
  id: string;
  title: string;
  description: string;
  role: string;
  result: string;
  image: string;
  link: string;
  category: ProjectCategory;
  tools: string[];
}

export interface BlogPost {
  id: string;
  title: string;
  excerpt: string;
  content: string;
  category: string;
  date: string;
  author: string;
  image: string;
}

export interface Quote {
  id: string;
  text: string;
  author: string;
  source?: string;
  approved: boolean;
  submittedBy?: string;
}

export interface Stats {
  projectsCount: number;
  blogsCount: number;
  appsBuilt: number;
  followers: string;
  subscribers: number;
}

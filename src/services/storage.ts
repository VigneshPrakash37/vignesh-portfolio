
import { Project, BlogPost, Quote, Stats } from '../types';
import { INITIAL_PROJECTS, INITIAL_BLOGS, INITIAL_QUOTES } from '../constants';

const KEY_PREFIX = 'vignesh_brand_';

export const storage = {
  get: <T,>(key: string, defaultValue: T): T => {
    const data = localStorage.getItem(`${KEY_PREFIX}${key}`);
    return data ? JSON.parse(data) : defaultValue;
  },
  set: <T,>(key: string, value: T): void => {
    localStorage.setItem(`${KEY_PREFIX}${key}`, JSON.stringify(value));
  }
};

export const cmsService = {
  getProjects: () => storage.get<Project[]>('projects', INITIAL_PROJECTS),
  saveProject: (project: Project) => {
    const items = cmsService.getProjects();
    const existingIndex = items.findIndex(p => p.id === project.id);
    if (existingIndex > -1) items[existingIndex] = project;
    else items.push(project);
    storage.set('projects', items);
  },
  
  getBlogs: () => storage.get<BlogPost[]>('blogs', INITIAL_BLOGS),
  saveBlog: (blog: BlogPost) => {
    const items = cmsService.getBlogs();
    items.push(blog);
    storage.set('blogs', items);
  },

  getQuotes: () => storage.get<Quote[]>('quotes', INITIAL_QUOTES),
  addQuote: (quote: Quote) => {
    const items = cmsService.getQuotes();
    items.push(quote);
    storage.set('quotes', items);
  },
  approveQuote: (id: string) => {
    const items = cmsService.getQuotes();
    const item = items.find(q => q.id === id);
    if (item) item.approved = true;
    storage.set('quotes', items);
  }
};

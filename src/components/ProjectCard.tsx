
import React from 'react';
import { Project } from '../types';
import { ExternalLink, ArrowRight } from 'lucide-react';

interface Props {
  project: Project;
}

export const ProjectCard: React.FC<Props> = ({ project }) => {
  return (
    <div className="group bg-white border border-slate-200 rounded-2xl overflow-hidden hover:shadow-xl hover:shadow-blue-500/5 transition-all duration-300">
      <div className="aspect-video overflow-hidden">
        <img 
          src={project.image} 
          alt={project.title} 
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
        />
      </div>
      <div className="p-6">
        <div className="flex justify-between items-start mb-2">
          <span className="text-[10px] font-bold uppercase tracking-widest text-blue-500 px-2 py-1 bg-blue-50 rounded-full">
            {project.category}
          </span>
          <a href={project.link} className="text-slate-400 hover:text-blue-600">
            <ExternalLink size={18} />
          </a>
        </div>
        <h3 className="text-xl font-bold mb-2 group-hover:text-blue-600 transition-colors">{project.title}</h3>
        <p className="text-slate-500 text-sm mb-4 leading-relaxed line-clamp-2">{project.description}</p>
        
        <div className="space-y-3 pt-4 border-t border-slate-50">
          <div>
            <span className="text-[10px] font-semibold text-slate-400 uppercase tracking-wide block">My Role</span>
            <span className="text-sm text-slate-700">{project.role}</span>
          </div>
          <div>
            <span className="text-[10px] font-semibold text-slate-400 uppercase tracking-wide block">The Result</span>
            <span className="text-sm font-medium text-slate-900">{project.result}</span>
          </div>
        </div>

        <a href={project.link} className="inline-flex items-center gap-2 mt-6 text-sm font-semibold text-blue-600 hover:gap-3 transition-all">
          Case Study <ArrowRight size={16} />
        </a>
      </div>
    </div>
  );
};

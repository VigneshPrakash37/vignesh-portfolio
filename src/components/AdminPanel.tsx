
import React, { useState } from 'react';
import { cmsService } from '../services/storage';
import { Project, ProjectCategory, BlogPost, Quote } from '../types';
import { Plus, Trash2, CheckCircle, X, LogOut, Layout, FileText, Quote as QuoteIcon, MessageSquare } from 'lucide-react';

export const AdminPanel: React.FC<{ onClose: () => void }> = ({ onClose }) => {
  const [activeTab, setActiveTab] = useState<'projects' | 'blogs' | 'quotes' | 'newsletter'>('projects');
  const [projects, setProjects] = useState(cmsService.getProjects());
  const [blogs, setBlogs] = useState(cmsService.getBlogs());
  const [quotes, setQuotes] = useState(cmsService.getQuotes());

  const handleAddProject = () => {
    const newProject: Project = {
      id: Date.now().toString(),
      title: 'Major Urban Hub Integration',
      description: 'Strategic planning and infrastructure integration for a metropolitan nexus.',
      role: 'Project Lead',
      result: 'Pending implementation',
      image: 'https://images.unsplash.com/photo-1517433367423-c7e5b0f35086?auto=format&fit=crop&q=80&w=800',
      link: '#',
      category: ProjectCategory.PROFESSIONAL,
      tools: ['GIS', 'AutoCAD']
    };
    cmsService.saveProject(newProject);
    setProjects(cmsService.getProjects());
  };

  const handleAddBlog = () => {
    const newBlog: BlogPost = {
      id: Date.now().toString(),
      title: 'New Technical Insight',
      excerpt: 'Brief summary of the engineering challenge and solution.',
      content: 'Detailed markdown content here...',
      category: 'Engineering',
      date: new Date().toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' }),
      author: 'Vignesh Prakash',
      image: 'https://images.unsplash.com/photo-1451187580459-43490279c0fa?auto=format&fit=crop&q=80&w=800'
    };
    cmsService.saveBlog(newBlog);
    setBlogs(cmsService.getBlogs());
  };

  const handleApproveQuote = (id: string) => {
    cmsService.approveQuote(id);
    setQuotes(cmsService.getQuotes());
  };

  return (
    <div className="fixed inset-0 z-[60] bg-white dark:bg-slate-950 flex flex-col overflow-hidden animate-in fade-in zoom-in duration-300">
      <header className="px-10 py-6 border-b dark:border-slate-800 flex justify-between items-center bg-slate-900 text-white">
        <div className="flex items-center gap-6">
          <div className="text-2xl font-black tracking-tighter">OS.</div>
          <div className="h-6 w-px bg-white/20"></div>
          <h2 className="font-bold text-sm tracking-widest uppercase text-blue-400">Master Brand Manager</h2>
        </div>
        <button onClick={onClose} className="bg-white/10 p-3 rounded-full hover:bg-white/20 transition-all"><LogOut size={20} /></button>
      </header>

      <div className="flex flex-1 overflow-hidden">
        <aside className="w-80 border-r dark:border-slate-800 bg-slate-50 dark:bg-slate-900/50 p-8 space-y-3">
          {[
            { id: 'projects', icon: Layout, label: 'Ecosystem' },
            { id: 'blogs', icon: FileText, label: 'Insights' },
            { id: 'quotes', icon: QuoteIcon, label: 'Wisdom' },
            { id: 'newsletter', icon: MessageSquare, label: 'Communal' },
          ].map(tab => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id as any)}
              className={`w-full flex items-center justify-between px-6 py-4 rounded-2xl font-black text-xs uppercase tracking-widest transition-all ${activeTab === tab.id ? 'bg-blue-600 text-white shadow-xl shadow-blue-500/20' : 'text-slate-500 hover:bg-slate-200 dark:hover:bg-slate-800'}`}
            >
              <div className="flex items-center gap-4">
                <tab.icon size={18} /> {tab.label}
              </div>
              {tab.id === 'quotes' && quotes.filter(q => !q.approved).length > 0 && (
                <span className="bg-red-500 text-white px-2 py-0.5 rounded-full text-[8px]">{quotes.filter(q => !q.approved).length}</span>
              )}
            </button>
          ))}
        </aside>

        <main className="flex-1 overflow-y-auto p-12 bg-white dark:bg-slate-950">
          <div className="flex justify-between items-end mb-12">
            <div>
              <h3 className="text-4xl font-black tracking-tighter capitalize">{activeTab} Control</h3>
              <p className="text-slate-400 font-medium mt-2">Manage all public-facing brand content.</p>
            </div>
            {activeTab !== 'quotes' && activeTab !== 'newsletter' && (
              <button 
                onClick={activeTab === 'projects' ? handleAddProject : handleAddBlog}
                className="flex items-center gap-3 bg-blue-600 text-white px-8 py-4 rounded-[1.5rem] font-black hover:bg-blue-700 transition-all shadow-xl shadow-blue-500/20"
              >
                <Plus size={20} /> Create Item
              </button>
            )}
          </div>

          <div className="grid gap-6">
            {activeTab === 'projects' && projects.map(p => (
              <div key={p.id} className="bg-white dark:bg-slate-900 border dark:border-slate-800 rounded-3xl p-8 flex justify-between items-center group hover:shadow-lg transition-all">
                <div className="flex items-center gap-6">
                  <div className="w-20 h-20 rounded-2xl overflow-hidden border dark:border-slate-700">
                    <img src={p.image} className="w-full h-full object-cover" />
                  </div>
                  <div>
                    <h4 className="font-black text-xl">{p.title}</h4>
                    <p className="text-sm font-bold text-blue-600 uppercase tracking-widest">{p.category}</p>
                  </div>
                </div>
                <div className="flex gap-4">
                  <button className="p-3 text-slate-400 hover:text-blue-600 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-xl transition-all"><Layout size={18} /></button>
                  <button className="p-3 text-slate-400 hover:text-red-600 hover:bg-red-50 dark:hover:bg-red-900/10 rounded-xl transition-all"><Trash2 size={18} /></button>
                </div>
              </div>
            ))}

            {activeTab === 'blogs' && blogs.map(b => (
              <div key={b.id} className="bg-white dark:bg-slate-900 border dark:border-slate-800 rounded-3xl p-8 flex justify-between items-center group hover:shadow-lg transition-all">
                <div className="flex items-center gap-6">
                  <div className="w-20 h-20 rounded-2xl overflow-hidden border dark:border-slate-700">
                    <img src={b.image} className="w-full h-full object-cover" />
                  </div>
                  <div>
                    <h4 className="font-black text-xl">{b.title}</h4>
                    <p className="text-sm font-bold text-slate-400">{b.date}</p>
                  </div>
                </div>
                <div className="flex gap-4">
                  <button className="p-3 text-slate-400 hover:text-blue-600 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-xl transition-all"><FileText size={18} /></button>
                  <button className="p-3 text-slate-400 hover:text-red-600 hover:bg-red-50 dark:hover:bg-red-900/10 rounded-xl transition-all"><Trash2 size={18} /></button>
                </div>
              </div>
            ))}

            {activeTab === 'quotes' && (
              <div className="space-y-6">
                <div className="bg-blue-50 dark:bg-blue-900/10 p-6 rounded-2xl border border-blue-100 dark:border-blue-900/30">
                  <p className="text-xs font-black uppercase tracking-widest text-blue-600">Tip: Moderate visitor submissions before they go live on the hero section.</p>
                </div>
                {quotes.map(q => (
                  <div key={q.id} className={`bg-white dark:bg-slate-900 border dark:border-slate-800 rounded-3xl p-8 flex justify-between items-center ${!q.approved ? 'border-l-4 border-l-red-500' : ''}`}>
                    <div className="flex-1 pr-12">
                      <p className="font-bold text-lg italic mb-2">"{q.text}"</p>
                      <div className="flex items-center gap-3">
                        <span className="text-sm font-black text-blue-600">— {q.author}</span>
                        {q.submittedBy === 'Visitor' && <span className="text-[8px] font-black bg-slate-100 dark:bg-slate-800 px-2 py-0.5 rounded uppercase tracking-tighter">Visitor</span>}
                      </div>
                    </div>
                    <div className="flex gap-4 shrink-0">
                      {!q.approved && (
                        <button onClick={() => handleApproveQuote(q.id)} className="flex items-center gap-2 bg-green-500 text-white px-6 py-3 rounded-2xl font-black text-xs uppercase tracking-widest hover:bg-green-600 shadow-lg shadow-green-500/20">
                          <CheckCircle size={14} /> Approve
                        </button>
                      )}
                      <button className="p-3 text-slate-400 hover:text-red-600 hover:bg-red-50 dark:hover:bg-red-900/10 rounded-xl transition-all"><Trash2 size={18} /></button>
                    </div>
                  </div>
                ))}
              </div>
            )}

            {activeTab === 'newsletter' && (
              <div className="text-center py-20 bg-slate-50 dark:bg-slate-900/30 rounded-[3rem] border-2 border-dashed border-slate-200 dark:border-slate-800">
                <MessageSquare className="mx-auto text-slate-300 mb-6" size={48} />
                <h4 className="text-2xl font-black mb-2">No Active Discussions</h4>
                <p className="text-slate-400 font-medium">Comments and feedback threads will appear here once enabled.</p>
              </div>
            )}
          </div>
        </main>
      </div>
    </div>
  );
};

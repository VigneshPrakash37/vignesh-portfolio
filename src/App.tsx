PERSONAL_INFO
import React, { useState, useEffect, useMemo } from 'react';
import { Navigation } from "./components/Navigation.tsx";
import { ProjectCard } from "./components/ProjectCard.tsx";
import { SectionHeader } from "./components/SectionHeader.tsx";
import { AdminPanel } from "./components/AdminPanel.tsx";
import { PERSONAL_INFO, INITIAL_STATS } from './constants';
import { ProjectCategory, Quote } from './types';
import { cmsService } from './services/storage';
import { 
  Zap, 
  Mail, 
  Send,
  Download,
  CheckCircle2,
  ArrowRight,
  Search,
  Lock,
  MessageSquare,
  Linkedin,
  Github,
  Award,
  Users,
  Layers,
  Sparkles,
  Layout,
  ExternalLink,
  HeartHandshake,
  Settings,
  BrainCircuit,
  BrainCircuitIcon,
  Target
} from 'lucide-react';
import { AreaChart, Area, XAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import Admin from "./pages/Admin";


const App: React.FC = () => {
  const [filter, setFilter] = useState<ProjectCategory | 'All'>('All');
  const [blogSearch, setBlogSearch] = useState('');
  const [isAdminOpen, setIsAdminOpen] = useState(false);
  const [showAdminGate, setShowAdminGate] = useState(false);
  const [password, setPassword] = useState('');
  const [showFullJourney, setShowFullJourney] = useState(false);
  
  // CMS State
  const [projects, setProjects] = useState(cmsService.getProjects());
  const [blogs, setBlogs] = useState(cmsService.getBlogs());
  const [quotes, setQuotes] = useState(cmsService.getQuotes().filter(q => q.approved));
  const [currentQuoteIndex, setCurrentQuoteIndex] = useState(0);

  // Quote Submission State
  const [newQuoteText, setNewQuoteText] = useState('');
  const [newQuoteAuthor, setNewQuoteAuthor] = useState('');

  // Newsletter State
  const [subscriberEmail, setSubscriberEmail] = useState('');
  const [isSubscribed, setIsSubscribed] = useState(false);

  useEffect(() => {
    const timer = setInterval(() => {
      if (quotes.length > 0) {
        setCurrentQuoteIndex((prev) => (prev + 1) % quotes.length);
      }
    }, 10800000);
    return () => clearInterval(timer);
  }, [quotes]);

  useEffect(() => {
    const refreshQuotes = setInterval(() => {
      setQuotes(cmsService.getQuotes().filter(q=>q.approved));
    }, 60000);
    return () => clearInterval(refreshQuotes);
  }, []);

  const filteredProjects = useMemo(() => {
    return filter === 'All' ? projects : projects.filter(p => p.category === filter);
  }, [filter, projects]);

  const filteredBlogs = useMemo(() => {
    return blogs.filter(b => b.title.toLowerCase().includes(blogSearch.toLowerCase()));
  }, [blogSearch, blogs]);

  const handleQuoteSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const q: Quote = {
      id: Date.now().toString(),
      text: newQuoteText,
      author: newQuoteAuthor,
      approved: false,
      submittedBy: 'Visitor'
    };
    cmsService.addQuote(q);
    setNewQuoteText('');
    setNewQuoteAuthor('');
    alert('Thank you! Your quote has been submitted for review.');
  };

  const checkAdmin = (e: React.FormEvent) => {
    e.preventDefault();
    if (password === 'startly2024') {
      setIsAdminOpen(true);
      setShowAdminGate(false);
      setPassword('');
    } else {
      alert('Unauthorized access attempt logged.');
    }
  };

  const chartData = [
    { name: 'Mon', value: 400 },
    { name: 'Tue', value: 300 },
    { name: 'Wed', value: 600 },
    { name: 'Thu', value: 800 },
    { name: 'Fri', value: 500 },
    { name: 'Sat', value: 900 },
    { name: 'Sun', value: 1100 },
  ];

  return (
    <div className="min-h-screen selection:bg-blue-600 selection:text-white transition-colors duration-300">
      <Navigation />
      
      {isAdminOpen && <AdminPanel onClose={() => {
        setIsAdminOpen(false);
        setProjects(cmsService.getProjects());
        setBlogs(cmsService.getBlogs());
        setQuotes(cmsService.getQuotes().filter(q => q.approved));
      }} />}

      {showAdminGate && (
        <div className="fixed inset-0 z-[100] apple-glass flex items-center justify-center p-6">
          <div className="bg-white dark:bg-slate-900 p-8 rounded-[3rem] shadow-2xl max-w-sm w-full border border-slate-100 dark:border-slate-800">
            <div className="flex justify-center mb-6"><Lock className="text-blue-600" size={40} /></div>
            <h3 className="text-xl font-bold text-center mb-6">Master Key Required</h3>
            <form onSubmit={checkAdmin} className="space-y-4">
              <input 
                type="password" 
                placeholder="Access Code" 
                autoFocus
                className="w-full px-5 py-4 bg-slate-100 dark:bg-slate-800 border-none rounded-2xl focus:ring-2 focus:ring-blue-500 outline-none transition-all" 
                onChange={(e) => setPassword(e.target.value)}
              />
              <div className="flex gap-3">
                <button type="button" onClick={() => setShowAdminGate(false)} className="flex-1 py-4 font-bold text-slate-500">Cancel</button>
                <button type="submit" className="flex-1 bg-blue-600 text-white py-4 rounded-2xl font-bold hover:bg-blue-700 transition-colors">Unlock</button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* 1. HERO & 9. QUOTE OF THE DAY */}
      <section id="home" className="pt-40 pb-20 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="grid lg:grid-cols-12 gap-16 items-center">
            <div className="lg:col-span-7 space-y-10">
              <div className="inline-flex items-center gap-2 px-4 py-2 bg-blue-50 dark:bg-blue-900/20 text-blue-600 dark:text-blue-400 rounded-full border border-blue-100 dark:border-blue-800">
                <Sparkles size={14} className="animate-pulse" />
                <span className="text-xs font-black uppercase tracking-widest">{PERSONAL_INFO.tagline.split('|')[0]}</span>
              </div>
              <h1 className="text-5xl md:text-7xl font-black tracking-tighter leading-[0.85]">
                {PERSONAL_INFO.name.split(' ')[0]}<br/>
                <span className="gradient-text">{PERSONAL_INFO.name.split(' ')[1]}</span>
              </h1>
              <p className="text-lg text-slate-500 dark:text-slate-400 max-w-2xl leading-relaxed font-medium">
                {PERSONAL_INFO.bio}
              </p>
              
              <div className="flex flex-wrap gap-4">
                <a href="#projects" className="px-10 py-5 bg-blue-600 text-white font-bold rounded-[2rem] hover:bg-blue-700 hover:scale-105 transition-all shadow-2xl shadow-blue-500/20">
                  Explore Ecosystem
                </a>
                <a href="#hire" className="px-10 py-5 bg-white dark:bg-slate-800 text-slate-900 dark:text-white font-bold border border-slate-200 dark:border-slate-700 rounded-[2rem] hover:border-blue-600 transition-all">
                  Collaborate
                </a>
              </div>

              {/* Quick Contact Links */}
              <div className="flex items-center gap-8 pt-4">
                <a href={PERSONAL_INFO.social.linkedin} className="text-slate-400 hover:text-blue-600 transition-colors"><Linkedin size={24} /></a>
                <a href={PERSONAL_INFO.social.github} className="text-slate-400 hover:text-slate-900 dark:hover:text-white transition-colors"><Github size={24} /></a>
                <button onClick={() => setShowAdminGate(true)} className="text-slate-400 hover:text-red-500 transition-colors"><Lock size={24} /></button>
              </div>
            </div>

            <div className="lg:col-span-5 relative group">
              <div className="aspect-[4/5] rounded-[4rem] overflow-hidden shadow-2xl relative border-8 border-white dark:border-slate-800 bg-slate-100 dark:bg-slate-800 transform group-hover:-rotate-1 transition-transform duration-700">
                <img 
                  src="profile.jpg" 
                  alt={PERSONAL_INFO.name} 
                  className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-1000"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-blue-900/40 via-transparent to-transparent"></div>
              </div>
              <div className="absolute -bottom-10 -left-10 w-full h-full border-2 border-blue-600/10 rounded-[4rem] -z-10 transform -rotate-3"></div>
            </div>
          </div>

          {/* Quote Section at Bottom of Hero */}
          {quotes.length > 0 && (
            <div className="mt-24 pt-10 border-t border-slate-100 dark:border-slate-800 flex flex-col md:flex-row justify-between items-start md:items-center gap-8">
              <div className="flex-1">
                <span className="text-[10px] font-black tracking-[0.3em] text-slate-300 dark:text-slate-700 uppercase mb-4 block">Quote of the moment</span>
                <p className="text-2xl md:text-3xl font-bold tracking-tight text-slate-800 dark:text-slate-200 leading-tight">
                  "{quotes[currentQuoteIndex].text}"
                </p>
                <div className="text-sm font-black text-blue-600 dark:text-blue-400 mt-2">— {quotes[currentQuoteIndex].author}</div>
              </div>
              <button 
                onClick={() => document.getElementById('quotes-submit')?.scrollIntoView({ behavior: 'smooth' })}
                className="text-xs font-black uppercase tracking-widest text-slate-400 hover:text-blue-600 transition-colors flex items-center gap-2"
              >
                Submit Yours <ArrowRight size={14} />
              </button>
            </div>
          )}
        </div>
      </section>

      {/* 2. WHY I BUILD & 3. THE JOURNEY */}
      <section id="journey" className="section-spacing bg-slate-50 dark:bg-slate-900/50">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid lg:grid-cols-2 gap-20">
            <div className="space-y-12">
              <SectionHeader 
                title="Philosophy of the Build" 
                subtitle="Why I choose the projects I do. It’s about purpose, people, and sustainable impact."
              />
              <div className="space-y-8">
                {[
                  { icon: HeartHandshake, title: "Purpose Before Profit", text: "Every system I build, physical or digital, must serve a real human need. Growth is meaningful only when it creates stability for families, communities, and future generations." },
                  { icon: Settings, title: "Discipline Through Systems", text: "From rail infrastructure to digital platforms, I believe strong foundations, data-driven planning, and consistent execution are the backbone of lasting success." },
                  { icon: BrainCircuit, title: "Technology With Humanity", text: "AI and automation are powerful tools. I use them to improve efficiency, reduce friction, and support better decision-making, never to replace empathy and responsibility." },
                  { icon: Target, title: "Impact Over Recognition", text: "I focus on outcomes, not applause. True progress is measured by how many lives are improved, today and tomorrow." },
                ].map((item, i) => (
                  <div key={i} className="flex gap-6 group">
                    <div className="w-14 h-14 bg-white dark:bg-slate-800 rounded-2xl flex items-center justify-center shrink-0 shadow-sm border border-slate-100 dark:border-slate-800 group-hover:bg-blue-600 group-hover:text-white transition-all">
                      <item.icon size={28} />
                    </div>
                    <div>
                      <h4 className="text-xl font-bold mb-2">{item.title}</h4>
                      <p className="text-slate-500 dark:text-slate-800 leading-relaxed">{item.text}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="bg-white dark:bg-slate-800 p-12 md:p-20 rounded-[4rem] shadow-3xl shadow-blue-900/5 relative">
              <h3 className="text-3xl font-black mb-8">The Journey</h3>
              <div
                className={`space-y-6 text-sl text-slate-600 dark:text-slate-400 leading-relaxed font-medium transition-all duration-500 ${
                  showFullJourney ? "max-h-[2000px]" : "max-h-[260px] overflow-hidden"
                }`}
              >
                <p>
                    I don’t see life as a series of certificates or titles.
                    I see it as a journey of learning, resilience, and responsibility.
                </p>
                <p>
                    My journey began in Madurai and took shape in Coimbatore,
                    where I completed my education and developed curiosity for systems and cities.
                </p>
                <p>
                    After graduation, I began my professional journey in Mumbai,
                    learning discipline, accountability, and precision. Working on large-scale rail and infrastructure projects taught me
                    that <span className="text-blue-600 font-bold italic">behind every drawing, schedule, and cost sheet are real lives.</span>
                </p>
                       
                      <p>
                        While I am naturally introverted, I believe deeply in kindness,
                        empathy, and integrity. My work is driven by responsibility.
                      </p>

                  {showFullJourney && (
                    <>
                      <p>
                        With the rise of AI and digital transformation, I saw an opportunity
                        to amplify my impact by combining infrastructure expertise with
                        intelligent systems.
                      </p>

                      <p>
                        Today, I aim to build tools that help individuals and organizations
                        grow responsibly and contribute meaningfully to society.
                      </p>

                      <p className="text-blue-600 font-bold">
                      <p>Build with purpose.</p> <p>Lead with compassion.</p> <p>Grow with integrity.</p>
                        And use every success to give back.
                      </p>
                    </>
                  )}

              </div>
                <button
                  onClick={() => setShowFullJourney(!showFullJourney)}
                  className="mt-4 text-blue-600 font-bold hover:underline transition"
                >
                  {showFullJourney ? "Read Less ▲" : "Read Full Journey ▼"}
                </button>

              <div className="pt-20 flex gap-20">

                <div className="text-center">
                  <div className="text-3xl font-black text-blue-600 mb-1 tracking-tighter">8+</div>
                  <div className="text-[10px] font-black uppercase text-slate-400 tracking-widest">Years</div>
                </div>
                <div className="text-center">
                  <div className="text-3xl font-black text-blue-600 mb-1 tracking-tighter">7</div>
                  <div className="text-[10px] font-black uppercase text-slate-400 tracking-widest">Major Projects</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 4. PROJECTS SHOWCASE */}
      <section id="projects" className="section-spacing px-6">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col md:flex-row justify-between items-end mb-16 gap-8">
            <SectionHeader 
              title="Project Portfolio" 
              subtitle="Integrating Infrastructure Engineering with Cloud and AI Technologies."
            />
            <div className="flex p-1.5 bg-slate-100 dark:bg-slate-800 rounded-2xl overflow-x-auto no-scrollbar">
              {['All', ...Object.values(ProjectCategory)].map(cat => (
                <button
                  key={cat}
                  onClick={() => setFilter(cat as any)}
                  className={`px-8 py-3 rounded-xl text-xs font-black uppercase tracking-widest transition-all ${filter === cat ? 'bg-white dark:bg-slate-700 text-blue-600 dark:text-blue-400 shadow-xl' : 'text-slate-400 hover:text-slate-800 dark:hover:text-white'}`}
                >
                  {cat}
                </button>
              ))}
            </div>
          </div>
          
          <div className="grid md:grid-cols-2 gap-12">
            {filteredProjects.map(project => (
              <ProjectCard key={project.id} project={project} />
            ))}
          </div>
        </div>
      </section>

      {/* 7. STARTLY APP PAGE (PROMINENT SECTION) */}
      <section className="section-spacing px-6">
        <div className="max-w-7xl mx-auto">
          <div className="bg-blue-600 dark:bg-blue-900/40 rounded-[4rem] p-10 md:p-24 text-white flex flex-col lg:flex-row gap-20 items-center relative overflow-hidden">
            <div className="absolute top-0 right-0 w-full h-full bg-[radial-gradient(circle_at_top_right,_var(--tw-gradient-stops))] from-blue-400/20 via-transparent to-transparent"></div>
            
            <div className="flex-1 space-y-10 relative z-10">
              <div className="inline-block px-4 py-1.5 bg-white/20 rounded-full text-[10px] font-black uppercase tracking-widest">Flagship Product</div>
              <h2 className="text-5xl md:text-7xl font-black tracking-tighter leading-tight">STARTLY.<br/>OS for the Solo-Builder.</h2>
              <p className="text-xl text-blue-100 font-medium leading-relaxed">The ultimate workspace to manage your brand, publish insights, and track impact. Built by a builder, for builders.</p>
              
              <ul className="grid grid-cols-2 gap-6">
                {[
                  'Markdown CMS',
                  'AI Brainstorming',
                  'SEO Optimizer',
                  'Live Dashboard'
                ].map(f => (
                  <li key={f} className="flex items-center gap-3 font-bold">
                    <CheckCircle2 size={20} className="text-blue-300 shrink-0" /> {f}
                  </li>
                ))}
              </ul>

              <div className="flex flex-wrap gap-4 pt-4">
                <button className="flex items-center gap-3 bg-white text-blue-600 px-10 py-5 rounded-[2rem] font-black hover:scale-105 transition-all">
                  <Download size={20} /> View Projects
                </button>
                <button className="flex items-center gap-3 bg-blue-500/30 text-white border border-white/20 px-10 py-5 rounded-[2rem] font-black hover:bg-blue-500/50 transition-all">
                  Product Hunt <ExternalLink size={18} />
                </button>
              </div>
            </div>

            <div className="flex-1 relative">
              <div className="bg-slate-900 rounded-[3rem] p-4 shadow-2xl border-[12px] border-slate-800 rotate-3 transform hover:rotate-0 transition-transform duration-700">
                <img 
                  src="/profile.jpg"
                  alt="Startly App" 
                  className="rounded-[2rem] w-full"
                />
              </div>
              <div className="absolute -top-10 -right-10 w-40 h-40 bg-white/10 rounded-full blur-3xl"></div>
            </div>
          </div>
        </div>
      </section>

      {/* 8. DASHBOARD (PUBLIC STATS) */}
      <section id="dashboard" className="section-spacing px-6">
        <div className="max-w-7xl mx-auto">
          <SectionHeader 
            centered
            title="Impact Metrics" 
            subtitle="Hard data from the last 12 months. Transparency is key."
          />
          
          <div className="grid grid-cols-2 md:grid-cols-5 gap-8 mb-16">
            {[
              { label: 'Projects', value: INITIAL_STATS.projectsCount, icon: Layout },
              { label: 'Followers', value: INITIAL_STATS.followers, icon: Users },
              { label: 'Articles', value: INITIAL_STATS.blogsCount, icon: MessageSquare },
              { label: 'Subs', value: INITIAL_STATS.subscribers, icon: Mail },
              { label: 'Apps Built', value: INITIAL_STATS.appsBuilt, icon: Zap },
            ].map((stat, i) => (
              <div key={i} className="text-center p-10 bg-white dark:bg-slate-800 rounded-[3rem] border border-slate-100 dark:border-slate-800 shadow-sm hover:shadow-xl transition-all">
                <stat.icon className="mx-auto text-blue-600 mb-4" size={32} />
                <div className="text-4xl font-black tracking-tighter mb-1">{stat.value}</div>
                <div className="text-[10px] font-bold uppercase tracking-widest text-slate-400">{stat.label}</div>
              </div>
            ))}
          </div>

          <div className="bg-slate-900 text-white rounded-[4rem] p-8 md:p-16 h-[500px] shadow-2xl relative overflow-hidden">
            <div className="flex justify-between items-center mb-12 relative z-10">
              <h3 className="text-3xl font-black">Engagement Pulse</h3>
              <div className="flex gap-4">
                <span className="flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-slate-400">
                  <span className="w-2 h-2 rounded-full bg-blue-500"></span> User Growth
                </span>
              </div>
            </div>
            <div className="w-full h-full relative z-10">
              <ResponsiveContainer width="100%" height="80%">
                <AreaChart data={chartData}>
                  <defs>
                    <linearGradient id="colorValue" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#3b82f6" stopOpacity={0.4}/>
                      <stop offset="95%" stopColor="#3b82f6" stopOpacity={0}/>
                    </linearGradient>
                  </defs>
                  <CartesianGrid strokeDasharray="3 3" stroke="#ffffff10" vertical={false} />
                  <XAxis dataKey="name" stroke="#94a3b8" fontSize={12} tickLine={false} axisLine={false} dy={10} />
                  <Tooltip 
                    contentStyle={{ backgroundColor: '#0f172a', border: 'none', borderRadius: '16px', color: '#fff' }}
                    itemStyle={{ color: '#3b82f6' }}
                  />
                  <Area type="monotone" dataKey="value" stroke="#3b82f6" strokeWidth={6} fillOpacity={1} fill="url(#colorValue)" />
                </AreaChart>
              </ResponsiveContainer>
            </div>
            <div className="absolute bottom-0 right-0 w-full h-full bg-[radial-gradient(circle_at_bottom_right,_var(--tw-gradient-stops))] from-blue-900/30 via-transparent to-transparent"></div>
          </div>
        </div>
      </section>

      {/* 5. BLOG SECTION & 6. NEWSLETTER */}
      <section id="blog" className="section-spacing bg-slate-50 dark:bg-slate-950/50 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col md:flex-row justify-between items-center mb-16 gap-8">
             <SectionHeader title="Deep Dives" subtitle="Technical essays and philosophical musings on the built environment." />
             <div className="relative w-full md:w-96 group">
                <Search className="absolute left-5 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-blue-600 transition-colors" size={20} />
                <input 
                  type="text" 
                  placeholder="Search articles by topic..." 
                  className="w-full pl-14 pr-6 py-5 bg-white dark:bg-slate-800 border-none rounded-[2rem] shadow-sm focus:ring-4 focus:ring-blue-500/10 transition-all font-bold"
                  onChange={(e) => setBlogSearch(e.target.value)}
                />
             </div>
          </div>

          <div className="grid lg:grid-cols-2 gap-12 mb-24">
            {filteredBlogs.map(post => (
              <div key={post.id} className="group bg-white dark:bg-slate-800 p-8 rounded-[3.5rem] border border-slate-100 dark:border-slate-800 hover:shadow-2xl transition-all">
                <div className="aspect-video rounded-[2.5rem] overflow-hidden mb-8">
                  <img src={post.image} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" />
                </div>
                <div className="space-y-4">
                  <div className="flex items-center gap-4">
                    <span className="text-[10px] font-black uppercase tracking-widest bg-blue-50 dark:bg-blue-900/20 text-blue-600 px-3 py-1.5 rounded-lg">{post.category}</span>
                    <span className="text-xs text-slate-400 font-bold">{post.date}</span>
                  </div>
                  <h3 className="text-3xl font-black leading-tight group-hover:text-blue-600 transition-colors">{post.title}</h3>
                  <p className="text-slate-500 dark:text-slate-400 font-medium line-clamp-2">{post.excerpt}</p>
                  <a href="#" className="inline-flex items-center gap-2 text-sm font-black text-slate-900 dark:text-white pt-4">
                    Read Essay <ArrowRight size={18} />
                  </a>
                </div>
              </div>
            ))}
          </div>

          {/* 6. Newsletter CTA */}
          <div className="bg-white dark:bg-slate-800 rounded-[4rem] p-12 md:p-24 text-center border border-slate-100 dark:border-slate-800 shadow-2xl relative overflow-hidden">
            <div className="max-w-2xl mx-auto space-y-8 relative z-10">
              <div className="w-20 h-20 bg-blue-50 dark:bg-blue-900/20 rounded-[2rem] flex items-center justify-center mx-auto mb-8 text-blue-600">
                <Mail size={32} />
              </div>
              <h2 className="text-4xl md:text-5xl font-black tracking-tighter">The Infrastructure Weekly.</h2>
              <p className="text-lg text-slate-500 dark:text-slate-400 font-medium">Join 450+ founders and engineers. No spam, just high-signal architecture and planning insights.</p>
              
              <form onSubmit={(e) => { e.preventDefault(); setIsSubscribed(true); }} className="relative max-w-lg mx-auto">
                <input 
                  type="email" 
                  required
                  placeholder="name@email.com" 
                  value={subscriberEmail}
                  onChange={(e) => setSubscriberEmail(e.target.value)}
                  className="w-full pl-8 pr-44 py-6 bg-slate-50 dark:bg-slate-900/50 border-none rounded-[2rem] focus:ring-4 focus:ring-blue-500/10 transition-all font-bold outline-none"
                />
                <button 
                  type="submit" 
                  disabled={isSubscribed}
                  className="absolute right-2 top-2 bottom-2 bg-blue-600 text-white px-10 rounded-[1.5rem] font-black hover:bg-blue-700 transition-colors disabled:opacity-50"
                >
                  {isSubscribed ? 'Sent!' : 'Join Free'}
                </button>
              </form>
              <div className="text-xs font-bold text-slate-300 dark:text-slate-600 uppercase tracking-widest pt-4">
                View Newsletter Archive <ArrowRight size={10} className="inline ml-1" />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 9. QUOTES SUBMISSION SECTION */}
      <section id="quotes-submit" className="section-spacing px-6">
        <div className="max-w-2xl mx-auto text-center">
           <SectionHeader 
            centered
            title="Wisdom Repository" 
            subtitle="I collect thoughts that shift paradigms. Contribute a quote that defines your journey."
           />
           <div className="bg-slate-900 text-white rounded-[4rem] p-10 md:p-20 text-left relative overflow-hidden">
              <form onSubmit={handleQuoteSubmit} className="space-y-8 relative z-10">
                 <div className="space-y-4">
                   <label className="text-xs font-black uppercase tracking-widest text-slate-500">The Wisdom</label>
                   <textarea 
                    required
                    rows={4}
                    placeholder="Enter quote text or verse..."
                    className="w-full bg-white/5 border border-white/10 rounded-[2rem] p-8 text-xl font-bold focus:border-blue-500 outline-none transition-colors"
                    value={newQuoteText}
                    onChange={(e) => setNewQuoteText(e.target.value)}
                   />
                 </div>
                 <div className="grid md:grid-cols-2 gap-8">
                    <div className="space-y-4">
                      <label className="text-xs font-black uppercase tracking-widest text-slate-500">The Source/Author</label>
                      <input 
                        required
                        type="text" 
                        placeholder="e.g. Thiruvalluvar"
                        className="w-full bg-white/5 border border-white/10 rounded-2xl px-8 py-5 font-bold focus:border-blue-500 outline-none transition-colors"
                        value={newQuoteAuthor}
                        onChange={(e) => setNewQuoteAuthor(e.target.value)}
                      />
                    </div>
                    <div className="flex items-end">
                      <button className="w-full bg-blue-600 text-white py-5 rounded-2xl font-black hover:bg-blue-700 transition-all flex items-center justify-center gap-3">
                        Submit for Moderation <Send size={20} />
                      </button>
                    </div>
                 </div>
              </form>
              <div className="absolute top-0 right-0 w-80 h-80 bg-blue-600/10 blur-[100px] rounded-full"></div>
           </div>
        </div>
      </section>

      {/* 11. HIRE ME & 12. CONTACT */}
      <section id="hire" className="section-spacing bg-slate-950 text-white px-6">
        <div className="max-w-7xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-24">
            <div className="space-y-12">
              <SectionHeader 
                title="Professional Collaboration" 
                subtitle="I focus on working closely with a few chosen partners, ensuring our projects generate maximum impact."
              />
              <div className="space-y-10 mt-12">
                {[
                  {
                    title: 'Project Controls & Planning',
                    desc: 'End-to-end planning, scheduling, cost control, and performance monitoring for infrastructure and construction projects.'
                  },
                  {
                    title: 'AI & Digital Integration',
                    desc: 'Building AI-powered dashboards and workflows to improve productivity, reporting, and decision-making.'
                  },
                  {
                    title: 'Digital Product Development',
                    desc: 'Designing and developing productivity tools and internal systems such as Startly.'
                  }
                ].map((s, i) => (
                  <div key={i} className="flex gap-8 items-start group">
                    <div className="w-16 h-16 bg-white/5 border border-white/10 rounded-3xl flex items-center justify-center shrink-0 group-hover:bg-blue-600 group-hover:border-blue-500 transition-all duration-500">
                      <Zap size={28} className="text-blue-500 group-hover:text-white" />
                    </div>
                    <div>
                      <h4 className="text-2xl font-bold mb-2 tracking-tight">{s.title}</h4>
                      <p className="text-slate-400 font-medium leading-relaxed">{s.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="bg-white/5 border border-white/10 p-12 md:p-16 rounded-[4rem]">
              <h3 className="text-3xl font-black mb-10">Start a Conversation</h3>
              <form className="space-y-8">
                <div className="grid md:grid-cols-2 gap-8">
                  <div className="space-y-3">
                    <label className="text-[10px] font-black uppercase tracking-widest text-slate-500">Name</label>
                    <input type="text" required className="w-full bg-white/5 border border-white/10 rounded-2xl px-6 py-5 focus:border-blue-500 outline-none transition-all" />
                  </div>
                  <div className="space-y-3">
                    <label className="text-[10px] font-black uppercase tracking-widest text-slate-500">Email</label>
                    <input type="email" required className="w-full bg-white/5 border border-white/10 rounded-2xl px-6 py-5 focus:border-blue-500 outline-none transition-all" />
                  </div>
                </div>
                <div className="space-y-3">
                  <label className="text-[10px] font-black uppercase tracking-widest text-slate-500">Service Category</label>
                  <select className="w-full bg-white/5 border border-white/10 rounded-2xl px-6 py-5 focus:border-blue-500 outline-none transition-all">
                    <option className="bg-slate-900">Project Controls & Planning</option>
                    <option className="bg-slate-900">Infrastructure / EPC Consulting</option>
                    <option className="bg-slate-900">AI & Digital Integration</option>
                    <option className="bg-slate-900">Digital Product Development</option>
                    <option className="bg-slate-900">Career / Mentorship</option>
                    <option className="bg-slate-900">General Inquiry</option>
                  </select>

                </div>
                <div className="space-y-3">
                  <label className="text-[10px] font-black uppercase tracking-widest text-slate-500">Message</label>
                  <textarea rows={5} required className="w-full bg-white/5 border border-white/10 rounded-2xl px-6 py-5 focus:border-blue-500 outline-none transition-all"></textarea>
                </div>
                <button type="submit" className="w-full bg-blue-600 text-white font-black py-6 rounded-[2rem] hover:bg-blue-700 hover:scale-[1.02] transition-all flex items-center justify-center gap-4">
                  Send Message <Send size={20} />
                </button>
              </form>
            </div>
          </div>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="bg-white dark:bg-slate-950 py-24 px-6 border-t border-slate-100 dark:border-slate-800">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col md:flex-row justify-between items-center gap-16 mb-20">
            <div className="text-center md:text-left space-y-4">
              <div className="text-5xl font-black tracking-tighter text-blue-600">VP</div>
              <p className="text-slate-400 font-bold uppercase tracking-[0.2em] text-[10px]">Build | Lead | Grow </p>
            </div>
            <div className="flex flex-wrap justify-center gap-12 font-black text-xs uppercase tracking-widest text-slate-400">
              <a href="#home" className="hover:text-blue-600 transition-colors">Home</a>
              <a href="#journey" className="hover:text-blue-600 transition-colors">Story</a>
              <a href="#projects" className="hover:text-blue-600 transition-colors">Ecosystem</a>
              <a href="#blog" className="hover:text-blue-600 transition-colors">Insights</a>
              <a href="#hire" className="hover:text-blue-600 transition-colors">Hire Me</a>
            </div>
          </div>
          <div className="pt-12 border-t border-slate-50 dark:border-slate-900 flex flex-col md:flex-row justify-between items-center gap-6">
            <p className="text-[10px] font-black uppercase text-slate-300 dark:text-slate-700 tracking-widest">
              <span className="text-blue-600">© 2024 VIGNESH PRAKASH. ALL RIGHTS RESERVED. BUILT & DESIGNED WITH INTENT</span>.
            </p>
            <div className="flex gap-8">
              <a href={PERSONAL_INFO.social.linkedin} className="text-slate-300 hover:text-blue-600 transition-colors"><Linkedin size={20} /></a>
              <a href={PERSONAL_INFO.social.github} className="text-slate-300 hover:text-slate-900 dark:hover:text-white transition-colors"><Github size={20} /></a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default App;

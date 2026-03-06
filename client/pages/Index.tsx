import { motion, AnimatePresence } from "framer-motion";
import { Layout } from "@/components/Layout";
import { 
  ArrowRight, Github, ExternalLink, Award, Code, Briefcase, Zap, Mail, Linkedin, 
  Download, GraduationCap, Trophy, Terminal, Cpu, Globe, MapPin, Phone 
} from "lucide-react";
import { usePortfolio } from "@/hooks/usePortfolio";
import { LoginModal } from "@/components/LoginModal";
import { AdminDashboard } from "@/components/AdminDashboard";
import { cn } from "@/lib/utils";
import { useState } from "react";

const MagneticButton = ({ children, className, onClick }: { children: React.ReactNode; className?: string; onClick?: () => void }) => {
  const [position, setPosition] = useState({ x: 0, y: 0 });

  const handleMouseMove = (e: React.MouseEvent) => {
    const { clientX, clientY, currentTarget } = e;
    const { left, top, width, height } = currentTarget.getBoundingClientRect();
    const x = (clientX - (left + width / 2)) * 0.35;
    const y = (clientY - (top + height / 2)) * 0.35;
    setPosition({ x, y });
  };

  const handleMouseLeave = () => {
    setPosition({ x: 0, y: 0 });
  };

  return (
    <motion.button
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      animate={{ x: position.x, y: position.y }}
      transition={{ type: "spring", stiffness: 150, damping: 15, mass: 0.1 }}
      onClick={onClick}
      className={className}
    >
      {children}
    </motion.button>
  );
};

export default function Index() {
  const { 
    data, 
    updateData, 
    isAdminOpen, 
    setIsAdminOpen, 
    isLoggedIn, 
    login, 
    logout 
  } = usePortfolio();

  return (
    <Layout>
      <Hero data={data.profile} />
      <About data={data.profile} />
      <EducationSection data={data.education} />
      <SkillsSection categories={data.skillCategories} />
      <ProjectsSection projects={data.projects} />
      <ExperienceSection internships={data.internships} />
      <CertificationsSection certifications={data.certifications} />
      <AchievementsSection achievements={data.achievements} />
      <CodingProfilesSection profiles={data.codingProfiles} />
      <ContactSection profile={data.profile} />

      <AnimatePresence>
        {isAdminOpen && !isLoggedIn && (
          <LoginModal onLogin={login} onClose={() => setIsAdminOpen(false)} />
        )}
        {isAdminOpen && isLoggedIn && (
          <AdminDashboard data={data} onUpdate={updateData} onLogout={logout} />
        )}
      </AnimatePresence>
    </Layout>
  );
}

const Hero = ({ data }: { data: any }) => {
  return (
    <section id="hero" className="min-h-screen flex items-center justify-center relative overflow-hidden px-4 py-20">
      <div className="container relative z-10 flex flex-col items-center text-center">
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8 }}
          className="relative mb-12"
        >
          <div className="w-48 h-48 rounded-full border-4 border-primary/50 p-2 neon-glow-cyan animate-pulse">
            <div className="w-full h-full rounded-full bg-white/5 backdrop-blur-sm flex items-center justify-center overflow-hidden">
               <img src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=400&fit=crop" alt="Profile" className="w-full h-full object-cover" />
            </div>
          </div>
          <motion.div
            animate={{ rotate: 360 }}
            transition={{ duration: 15, repeat: Infinity, ease: "linear" }}
            className="absolute -inset-6 border-2 border-dashed border-secondary/30 rounded-full"
          />
          <motion.div
            animate={{ rotate: -360 }}
            transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
            className="absolute -inset-10 border border-primary/10 rounded-full"
          />
        </motion.div>

        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="text-5xl md:text-8xl font-black font-orbitron mb-6 leading-tight tracking-tighter"
        >
          <span className="block text-white opacity-80">HI, I'M</span>
          <span className="block neon-text uppercase">{data.name}</span>
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="text-xl md:text-2xl text-primary font-space-grotesk mb-8 max-w-3xl leading-relaxed font-bold uppercase tracking-[0.2em]"
        >
          {data.tagline}
        </motion.p>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.5 }}
          className="text-muted-foreground text-lg mb-12 max-w-2xl leading-relaxed"
        >
          {data.intro}
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.6 }}
          className="flex flex-wrap gap-6 justify-center items-center"
        >
          <MagneticButton
            onClick={() => document.getElementById('projects')?.scrollIntoView({ behavior: 'smooth' })}
            className="px-10 py-4 bg-primary text-primary-foreground rounded-full font-black uppercase tracking-[0.2em] flex items-center gap-3 hover:neon-glow-cyan hover:scale-105 transition-all group shadow-[0_0_20px_rgba(0,255,255,0.4)]"
          >
            View Projects
            <ArrowRight className="w-5 h-5 group-hover:translate-x-2 transition-transform" />
          </MagneticButton>
          <MagneticButton
            onClick={() => document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' })}
            className="px-10 py-4 border-2 border-secondary/50 rounded-full font-black uppercase tracking-[0.2em] text-secondary hover:bg-secondary/10 hover:neon-glow-purple hover:scale-105 transition-all"
          >
            Contact Me
          </MagneticButton>
          <button className="flex items-center gap-2 text-muted-foreground hover:text-white transition-colors uppercase font-bold tracking-widest text-xs">
            <Download className="w-4 h-4" /> Download Resume
          </button>
        </motion.div>
      </div>

      {/* Decorative Grid and Elements */}
      <div className="absolute inset-0 bg-cyber-grid opacity-20 -z-10" />
      <div className="absolute top-1/2 left-0 w-full h-px bg-gradient-to-r from-transparent via-primary/40 to-transparent -z-10 rotate-12 blur-sm" />
      <div className="absolute top-1/2 left-0 w-full h-px bg-gradient-to-r from-transparent via-secondary/40 to-transparent -z-10 -rotate-12 blur-sm" />
    </section>
  );
};

const About = ({ data }: { data: any }) => {
  return (
    <section id="about" className="py-32 px-4 relative overflow-hidden">
      <div className="container relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 items-center">
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <SectionHeader title="System Profile" subtitle="About the Developer" />
            <div className="space-y-6 text-muted-foreground text-lg leading-relaxed mb-12">
              <p>
                I am a Computer Science Engineering student at the <span className="text-primary font-bold">Institute of Aeronautical Engineering, Hyderabad</span>. I specialize in building modern web applications and solving real-world problems using technology.
              </p>
              <p>
                I enjoy developing innovative platforms, experimenting with AI-driven solutions, and creating intuitive user interfaces. My focus areas include frontend development, full-stack systems, and intelligent automation tools.
              </p>
            </div>
            
            <div className="grid grid-cols-2 gap-8">
              <div className="space-y-2">
                <span className="block text-xs font-bold text-primary uppercase tracking-[0.3em]">Location</span>
                <span className="text-xl font-bold flex items-center gap-2"><MapPin className="w-5 h-5 text-secondary" /> {data.location}</span>
              </div>
              <div className="space-y-2">
                <span className="block text-xs font-bold text-primary uppercase tracking-[0.3em]">Contact</span>
                <span className="text-xl font-bold flex items-center gap-2"><Phone className="w-5 h-5 text-secondary" /> {data.phone}</span>
              </div>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="relative"
          >
            <div className="glass-card p-10 rounded-[2.5rem] border-primary/20 relative z-10 overflow-hidden group">
              <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-primary to-secondary" />
              <div className="space-y-10">
                <div className="flex items-center gap-8 group-hover:translate-x-2 transition-transform">
                  <div className="w-16 h-16 glass rounded-2xl flex items-center justify-center text-primary border border-primary/20 shadow-[0_0_15px_rgba(0,255,255,0.2)]">
                    <Cpu className="w-8 h-8" />
                  </div>
                  <div>
                    <h4 className="font-orbitron font-bold text-xl mb-1 uppercase tracking-widest">Full-Stack Capability</h4>
                    <p className="text-muted-foreground text-sm">Bridging the gap between sleek frontends and robust backends.</p>
                  </div>
                </div>
                <div className="flex items-center gap-8 group-hover:translate-x-2 transition-transform">
                  <div className="w-16 h-16 glass rounded-2xl flex items-center justify-center text-secondary border border-secondary/20 shadow-[0_0_15px_rgba(168,85,247,0.2)]">
                    <Terminal className="w-8 h-8" />
                  </div>
                  <div>
                    <h4 className="font-orbitron font-bold text-xl mb-1 uppercase tracking-widest">AI Integration</h4>
                    <p className="text-muted-foreground text-sm">Leveraging large language models to build intelligent assistants.</p>
                  </div>
                </div>
                <div className="flex items-center gap-8 group-hover:translate-x-2 transition-transform">
                  <div className="w-16 h-16 glass rounded-2xl flex items-center justify-center text-accent border border-accent/20 shadow-[0_0_15px_rgba(236,72,153,0.2)]">
                    <Globe className="w-8 h-8" />
                  </div>
                  <div>
                    <h4 className="font-orbitron font-bold text-xl mb-1 uppercase tracking-widest">Web Innovation</h4>
                    <p className="text-muted-foreground text-sm">Constantly exploring new frameworks and UI trends.</p>
                  </div>
                </div>
              </div>
            </div>
            <div className="absolute -inset-10 bg-primary/10 blur-[100px] -z-10 rounded-full animate-pulse" />
          </motion.div>
        </div>
      </div>
    </section>
  );
};

const EducationSection = ({ data }: { data: any[] }) => {
  return (
    <section id="education" className="py-32 px-4 bg-black/40 relative">
      <div className="container relative z-10">
        <SectionHeader title="Education Path" subtitle="Academic Background" align="center" />
        <div className="max-w-4xl mx-auto space-y-8">
          {data.map((edu, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.1 }}
              viewport={{ once: true }}
              className="glass-card p-8 rounded-3xl border-white/5 group hover:border-primary/30 transition-all duration-500"
            >
              <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
                <div className="flex items-center gap-6">
                  <div className="w-16 h-16 glass rounded-2xl flex items-center justify-center text-primary shrink-0">
                    <GraduationCap className="w-8 h-8" />
                  </div>
                  <div>
                    <h4 className="text-2xl font-black font-orbitron group-hover:text-primary transition-colors">{edu.school}</h4>
                    <p className="text-muted-foreground font-bold tracking-widest uppercase text-sm mt-1">{edu.degree}</p>
                  </div>
                </div>
                <div className="text-right w-full md:w-auto">
                  <span className="block text-primary font-bold text-sm tracking-widest mb-1">{edu.period}</span>
                  <div className="px-4 py-2 glass rounded-full inline-block">
                    <span className="text-xs uppercase font-bold tracking-widest text-muted-foreground mr-2">CGPA:</span>
                    <span className="font-orbitron font-bold text-white">{edu.cgpa}</span>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

const SkillsSection = ({ categories }: { categories: any[] }) => {
  return (
    <section id="skills" className="py-32 px-4 relative">
      <div className="container relative z-10">
        <SectionHeader title="Neural Arsenal" subtitle="Technical Skills" align="center" />
        <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
          {categories.map((cat, i) => (
            <motion.div
              key={cat.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: i * 0.1 }}
              viewport={{ once: true }}
              className="glass-card p-10 rounded-[2.5rem] border-white/5 hover:neon-glow-cyan transition-all duration-500 group"
            >
              <h4 className="font-orbitron font-bold text-2xl mb-10 uppercase tracking-[0.2em] text-primary flex items-center gap-4">
                <div className="w-2 h-10 bg-primary rounded-full group-hover:scale-y-125 transition-transform" />
                {cat.title}
              </h4>
              <div className="grid grid-cols-1 gap-8">
                {cat.skills.map((skill: any) => (
                  <div key={skill.name}>
                    <div className="flex justify-between items-center mb-3">
                      <span className="font-black text-xs uppercase tracking-[0.2em] group-hover:text-white transition-colors">{skill.name}</span>
                      <span className="text-[10px] font-bold text-muted-foreground tracking-widest">{skill.level}%</span>
                    </div>
                    <div className="h-2 bg-white/5 rounded-full overflow-hidden p-[1px] border border-white/10">
                      <motion.div
                        initial={{ width: 0 }}
                        whileInView={{ width: `${skill.level}%` }}
                        transition={{ duration: 1.5, ease: "easeOut" }}
                        viewport={{ once: true }}
                        className={cn("h-full rounded-full relative", skill.color)}
                      >
                        <div className="absolute inset-0 bg-white/40 blur-sm animate-pulse" />
                      </motion.div>
                    </div>
                  </div>
                ))}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

const ProjectsSection = ({ projects }: { projects: any[] }) => {
  return (
    <section id="projects" className="py-32 px-4 bg-black/40 relative">
      <div className="container relative z-10">
        <SectionHeader title="Core Projects" subtitle="Code Repositories" />
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {projects.map((project, i) => (
            <motion.div
              key={project.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: i * 0.1 }}
              viewport={{ once: true }}
              whileHover={{
                rotateX: 5,
                rotateY: -5,
                scale: 1.02,
                transition: { duration: 0.3 }
              }}
              style={{ transformStyle: "preserve-3d" }}
              className={cn(
                "glass-card rounded-[3rem] overflow-hidden flex flex-col group transition-all duration-700 border-white/5",
                `hover:${project.neon}`
              )}
            >
              <div className={cn("h-64 bg-gradient-to-br relative flex items-center justify-center group-hover:scale-105 transition-transform duration-700", project.color)}>
                 <div className="absolute inset-0 bg-black/40 group-hover:bg-black/10 transition-colors" />
                 <Terminal className="w-24 h-24 text-white/10 relative z-10" />
                 <div className="absolute top-8 right-8 flex gap-3 opacity-0 group-hover:opacity-100 transition-opacity">
                    <a href={project.github} className="w-12 h-12 glass rounded-2xl flex items-center justify-center hover:text-primary transition-colors border border-white/10">
                      <Github className="w-6 h-6" />
                    </a>
                 </div>
              </div>
              <div className="p-12 flex flex-col flex-grow" style={{ transform: "translateZ(30px)" }}>
                <div className="flex justify-between items-start mb-6">
                  <h4 className="text-4xl font-black font-orbitron tracking-tighter uppercase group-hover:text-primary transition-colors leading-none">
                    {project.title}
                  </h4>
                </div>
                <p className="text-muted-foreground text-lg mb-8 leading-relaxed">
                  {project.desc}
                </p>
                <div className="space-y-4 mb-10">
                  <h5 className="text-[10px] font-black uppercase tracking-[0.3em] text-primary/50">Key Features</h5>
                  <div className="flex flex-wrap gap-2">
                    {project.features.map((f: string) => (
                      <span key={f} className="px-4 py-2 glass rounded-xl text-xs font-bold border border-white/5 flex items-center gap-2 group-hover:border-primary/20 transition-colors">
                        <Zap className="w-3 h-3 text-secondary" /> {f}
                      </span>
                    ))}
                  </div>
                </div>
                <div className="mt-auto pt-8 border-t border-white/5 flex flex-wrap gap-3">
                  {project.tags.map(tag => (
                    <span key={tag} className="text-[10px] uppercase font-bold tracking-widest px-3 py-1 bg-white/5 rounded-full border border-white/10 text-muted-foreground">
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

const ExperienceSection = ({ internships }: { internships: any[] }) => {
  return (
    <section id="experience" className="py-32 px-4 relative overflow-hidden">
      <div className="container relative z-10">
        <SectionHeader title="Professional Grid" subtitle="Experience & Internships" align="center" />
        <div className="max-w-4xl mx-auto">
          {internships.map((exp, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, delay: i * 0.2 }}
              viewport={{ once: true }}
              className="relative pl-16 pb-20 border-l-2 border-primary/20 last:pb-0"
            >
              <div className="absolute left-[-11px] top-0 w-5 h-5 rounded-full bg-primary shadow-[0_0_20px_rgba(0,255,255,0.8)] border-4 border-black" />
              <div className="glass-card p-12 rounded-[2.5rem] relative overflow-hidden group hover:neon-glow-cyan transition-all duration-500">
                <div className="absolute top-0 right-0 p-8 opacity-5 group-hover:opacity-10 transition-opacity">
                  <Briefcase className="w-24 h-24" />
                </div>
                <span className="text-primary font-orbitron font-bold text-sm tracking-[0.3em] mb-4 block uppercase">{exp.period}</span>
                <h4 className="text-3xl font-black mb-2 font-orbitron uppercase tracking-tight group-hover:text-primary transition-colors">{exp.role}</h4>
                <p className="text-secondary font-black mb-8 uppercase tracking-[0.2em] text-sm flex items-center gap-2">
                  <Globe className="w-4 h-4" /> {exp.company}
                </p>
                <ul className="space-y-4">
                  {exp.desc.map((item: string, idx: number) => (
                    <li key={idx} className="flex gap-4 text-muted-foreground leading-relaxed">
                      <div className="w-1.5 h-1.5 rounded-full bg-primary mt-2 shrink-0 group-hover:scale-150 transition-transform" />
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

const CertificationsSection = ({ certifications }: { certifications: any[] }) => {
  return (
    <section id="certifications" className="py-32 px-4 bg-black/40 relative">
      <div className="container relative z-10">
        <SectionHeader title="System Verified" subtitle="Certifications" />
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {certifications.map((cert, i) => (
            <motion.div
              key={i}
              whileHover={{ scale: 1.05, y: -10 }}
              className="glass-card p-8 rounded-[2rem] flex items-center gap-6 border-white/5 hover:neon-glow-purple transition-all duration-300 group"
            >
              <div className="w-16 h-16 glass rounded-2xl flex items-center justify-center text-secondary border border-secondary/20 shadow-[0_0_15px_rgba(168,85,247,0.2)] group-hover:shadow-[0_0_25px_rgba(168,85,247,0.5)] transition-all">
                <Award className="w-8 h-8" />
              </div>
              <div>
                <h4 className="font-orbitron font-bold text-lg mb-1 group-hover:text-white transition-colors uppercase leading-tight">{cert.name}</h4>
                <p className="text-muted-foreground text-[10px] font-black uppercase tracking-[0.2em]">{cert.issuer}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

const AchievementsSection = ({ achievements }: { achievements: any[] }) => {
  return (
    <section id="achievements" className="py-32 px-4 relative">
      <div className="container relative z-10">
        <SectionHeader title="High Scores" subtitle="Achievements & Milestones" align="center" />
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {achievements.map((item, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ delay: i * 0.1 }}
              viewport={{ once: true }}
              className="glass-card p-8 rounded-3xl text-center border-white/5 hover:neon-glow-blue transition-all group"
            >
              <div className="w-16 h-16 glass rounded-full flex items-center justify-center text-primary mx-auto mb-6 border-primary/20 group-hover:scale-110 transition-transform">
                <Trophy className="w-8 h-8" />
              </div>
              <h4 className="font-orbitron font-bold text-xl mb-4 group-hover:text-primary transition-colors">{item.title}</h4>
              <p className="text-muted-foreground text-sm leading-relaxed">{item.desc}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

const CodingProfilesSection = ({ profiles }: { profiles: any[] }) => {
  return (
    <section id="profiles" className="py-32 px-4 bg-black/40 relative">
      <div className="container relative z-10">
        <SectionHeader title="Neural Stats" subtitle="Coding Profiles" align="center" />
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
          {profiles.map((profile, i) => (
            <motion.div
              key={i}
              whileHover={{ y: -15 }}
              className="glass-card p-10 rounded-[2.5rem] border-white/5 group hover:border-primary/40 transition-all duration-500"
            >
              <div className="flex flex-col items-center text-center">
                <div className="w-20 h-20 glass rounded-3xl flex items-center justify-center text-secondary mb-8 group-hover:neon-glow-purple transition-all border border-secondary/20">
                  <Code className="w-10 h-10" />
                </div>
                <h4 className="text-3xl font-black font-orbitron mb-2 uppercase tracking-tighter group-hover:text-primary transition-colors">{profile.name}</h4>
                <p className="text-muted-foreground text-xs uppercase tracking-[0.4em] mb-8 font-bold">{profile.username}</p>
                <div className="w-full py-4 glass rounded-2xl border border-white/5 group-hover:border-primary/20 transition-all">
                  <span className="block text-[10px] text-muted-foreground uppercase font-black tracking-widest mb-1">Solved</span>
                  <span className="text-2xl font-black font-orbitron neon-text">{profile.solved}</span>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

const ContactSection = ({ profile }: { profile: any }) => {
  return (
    <section id="contact" className="py-32 px-4 relative">
      <div className="container relative z-10">
        <SectionHeader title="Signal Terminal" subtitle="Get in touch" align="center" />
        <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-20">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <h4 className="text-5xl font-black font-orbitron mb-8 neon-text tracking-tighter uppercase leading-none">ESTABLISH<br/>CONNECTION</h4>
            <p className="text-muted-foreground text-xl mb-12 leading-relaxed max-w-lg">
              I'm always open to new opportunities and collaborations. Whether you have a project in mind or just want to say hello, my neural pathways are ready.
            </p>
            <div className="space-y-8">
              <a href={`mailto:${profile.email}`} className="flex items-center gap-6 group">
                <div className="w-14 h-14 glass rounded-2xl flex items-center justify-center group-hover:neon-glow-cyan transition-all border border-primary/20">
                  <Mail className="w-6 h-6 text-primary" />
                </div>
                <div>
                  <span className="block text-[10px] font-black text-muted-foreground uppercase tracking-widest mb-1">Direct Signal</span>
                  <span className="text-xl font-bold group-hover:text-primary transition-colors">{profile.email}</span>
                </div>
              </a>
              <div className="flex gap-6 pt-6">
                <a href={profile.github} className="w-16 h-16 glass rounded-2xl flex items-center justify-center hover:neon-glow-purple transition-all border border-secondary/20 hover:text-secondary"><Github className="w-8 h-8" /></a>
                <a href={profile.linkedin} className="w-16 h-16 glass rounded-2xl flex items-center justify-center hover:neon-glow-blue transition-all border border-blue-500/20 hover:text-blue-400"><Linkedin className="w-8 h-8" /></a>
              </div>
            </div>
          </motion.div>

          <motion.form
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="glass-card p-12 rounded-[3rem] space-y-8 border-white/5 relative overflow-hidden group"
          >
            <div className="absolute top-0 right-0 w-32 h-32 bg-primary/5 blur-[60px] -z-10 group-hover:bg-primary/20 transition-all duration-700" />
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div>
                <label className="block text-xs font-black uppercase tracking-[0.3em] mb-3 text-primary">Identity</label>
                <input type="text" className="w-full bg-white/5 border border-white/10 rounded-2xl px-6 py-4 focus:border-primary outline-none transition-all placeholder:text-muted-foreground/30" placeholder="Agent Name" />
              </div>
              <div>
                <label className="block text-xs font-black uppercase tracking-[0.3em] mb-3 text-primary">Channel</label>
                <input type="email" className="w-full bg-white/5 border border-white/10 rounded-2xl px-6 py-4 focus:border-primary outline-none transition-all placeholder:text-muted-foreground/30" placeholder="your@email.com" />
              </div>
            </div>
            <div>
              <label className="block text-xs font-black uppercase tracking-[0.3em] mb-3 text-primary">Data Packet</label>
              <textarea rows={5} className="w-full bg-white/5 border border-white/10 rounded-2xl px-6 py-4 focus:border-primary outline-none transition-all placeholder:text-muted-foreground/30" placeholder="Type your message here..." />
            </div>
            <button className="w-full py-5 bg-primary text-primary-foreground font-black uppercase tracking-[0.3em] rounded-2xl hover:neon-glow-cyan transition-all transform hover:scale-[1.02] active:scale-95 shadow-[0_0_20px_rgba(0,255,255,0.3)]">
              Transmit Signal
            </button>
          </motion.form>
        </div>
      </div>
    </section>
  );
};

const SectionHeader = ({ title, subtitle, align = "left" }: { title: string; subtitle: string; align?: "left" | "center" }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      className={`mb-24 ${align === "center" ? "text-center" : "text-left"}`}
    >
      <span className="text-primary font-orbitron font-black text-sm tracking-[0.5em] uppercase mb-6 block opacity-70">
        {subtitle}
      </span>
      <h2 className="text-5xl md:text-7xl font-black font-orbitron uppercase tracking-tighter leading-none">
        {title}
        <span className="text-primary">.</span>
      </h2>
      <div className={`h-1.5 w-32 bg-gradient-to-r from-primary to-secondary mt-8 rounded-full ${align === "center" ? "mx-auto" : ""}`} />
    </motion.div>
  );
};

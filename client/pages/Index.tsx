import { motion, AnimatePresence, useScroll, useTransform } from "framer-motion";
import { Layout } from "@/components/Layout";
import { 
  ArrowRight, Github, ExternalLink, Award, Code, Briefcase, Zap, Mail, Linkedin, 
  Download, GraduationCap, Trophy, Terminal, Cpu, Globe, MapPin, Phone 
} from "lucide-react";
import { usePortfolio } from "@/hooks/usePortfolio";
import { LoginModal } from "@/components/LoginModal";
import { AdminDashboard } from "@/components/AdminDashboard";
import { cn } from "@/lib/utils";
import { useState, useRef } from "react";

const SectionWrapper = ({ children, className, id, align = "left" }: { children: React.ReactNode; className?: string; id?: string; align?: "left" | "center" }) => {
  return (
    <motion.section
      id={id}
      initial={{ opacity: 0, y: 50, filter: "blur(10px)" }}
      whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
      viewport={{ once: true, margin: "-10%" }}
      transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }}
      className={cn("py-32 px-4 relative", className)}
    >
      {children}
    </motion.section>
  );
};

const MagneticButton = ({ children, className, onClick, variant = "primary" }: { children: React.ReactNode; className?: string; onClick?: () => void; variant?: "primary" | "secondary" }) => {
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
      className={cn(
        "relative overflow-hidden px-10 py-4 rounded-full font-black uppercase tracking-[0.2em] transition-all group",
        variant === "primary" ? "bg-primary text-primary-foreground shadow-[0_0_20px_rgba(0,255,255,0.3)] hover:shadow-[0_0_40px_rgba(0,255,255,0.6)]" : "border-2 border-secondary/50 text-secondary hover:bg-secondary/10",
        className
      )}
    >
      <div className="absolute inset-0 bg-white/20 translate-y-full group-hover:translate-y-0 transition-transform duration-500" />
      <span className="relative z-10 flex items-center gap-3">{children}</span>
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
      
      <SectionWrapper id="about">
        <About data={data.profile} />
      </SectionWrapper>

      <SectionWrapper id="education" className="bg-black/40">
        <EducationSection data={data.education} />
      </SectionWrapper>

      <SectionWrapper id="skills">
        <SkillsSection categories={data.skillCategories} />
      </SectionWrapper>

      <SectionWrapper id="projects" className="bg-black/40">
        <ProjectsSection projects={data.projects} />
      </SectionWrapper>

      <SectionWrapper id="experience">
        <ExperienceSection internships={data.internships} />
      </SectionWrapper>

      <SectionWrapper id="certifications" className="bg-black/40">
        <CertificationsSection certifications={data.certifications} />
      </SectionWrapper>

      <SectionWrapper id="achievements">
        <AchievementsSection achievements={data.achievements} />
      </SectionWrapper>

      <SectionWrapper id="profiles" className="bg-black/40">
        <CodingProfilesSection profiles={data.codingProfiles} />
      </SectionWrapper>

      <SectionWrapper id="contact">
        <ContactSection profile={data.profile} />
      </SectionWrapper>

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
  const letters = data.name.toUpperCase().split("");
  
  return (
    <section id="hero" className="min-h-screen flex items-center justify-center relative overflow-hidden px-4 py-20">
      <div className="container relative z-10 flex flex-col items-center text-center">
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1.2, ease: [0.22, 1, 0.36, 1] }}
          className="relative mb-16"
        >
          <div className="w-56 h-56 rounded-[3rem] p-2 relative group">
            <div className="absolute inset-0 bg-gradient-to-br from-primary via-secondary to-accent animate-spin-slow rounded-[3.2rem] opacity-40 blur-xl group-hover:opacity-80 transition-opacity" />
            <div className="absolute inset-0 border-2 border-primary/30 rounded-[3rem] animate-pulse" />
            <div className="w-full h-full rounded-[2.8rem] bg-black border border-white/10 flex items-center justify-center overflow-hidden relative z-10">
               <img src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=400&fit=crop" alt="Profile" className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-700" />
            </div>
          </div>
        </motion.div>

        <div className="mb-8">
           <motion.span 
             initial={{ opacity: 0, letterSpacing: "1em" }}
             animate={{ opacity: 0.5, letterSpacing: "0.5em" }}
             transition={{ duration: 1.5 }}
             className="text-xs font-black uppercase text-white tracking-[0.6em] mb-4 block"
           >
             Initializing Developer Matrix
           </motion.span>
           
           <h1 className="text-5xl md:text-9xl font-black font-orbitron mb-6 flex flex-wrap justify-center gap-x-4 tracking-tighter">
             {letters.map((char: string, i: number) => (
               <motion.span
                 key={i}
                 initial={{ opacity: 0, y: 100, filter: "blur(10px)" }}
                 animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
                 transition={{ 
                   duration: 0.8, 
                   delay: 0.5 + i * 0.05,
                   ease: [0.33, 1, 0.68, 1]
                 }}
                 className="inline-block text-glow"
               >
                 {char === " " ? "\u00A0" : char}
               </motion.span>
             ))}
           </h1>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 1.5 }}
          className="text-primary font-space-grotesk mb-12 max-w-3xl leading-relaxed font-black uppercase tracking-[0.3em] flex items-center gap-4 bg-white/5 px-8 py-3 rounded-full border border-white/10 backdrop-blur-md"
        >
          <span className="w-2 h-2 rounded-full bg-primary animate-ping" />
          {data.tagline}
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 1.8 }}
          className="flex flex-wrap gap-8 justify-center items-center"
        >
          <MagneticButton 
            onClick={() => document.getElementById('projects')?.scrollIntoView({ behavior: 'smooth' })}
          >
            Execute Projects <ArrowRight className="w-5 h-5 group-hover:translate-x-2 transition-transform" />
          </MagneticButton>
          
          <MagneticButton 
            variant="secondary"
            onClick={() => document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' })}
          >
            System Contact
          </MagneticButton>
          
          <motion.button 
            whileHover={{ scale: 1.05 }}
            className="flex items-center gap-2 text-muted-foreground hover:text-white transition-colors uppercase font-bold tracking-[0.3em] text-[10px]"
          >
            <Download className="w-4 h-4" /> Download_Core_Resume
          </motion.button>
        </motion.div>
      </div>

      {/* Hero Specific Parallax Layers */}
      <motion.div 
        animate={{
          y: [-100, 100],
          opacity: [0, 0.3, 0],
        }}
        transition={{
          duration: 10,
          repeat: Infinity,
          ease: "linear",
        }}
        className="absolute inset-0 bg-cyber-grid opacity-10 pointer-events-none"
      />
    </section>
  );
};

const About = ({ data }: { data: any }) => {
  return (
    <div className="container relative z-10">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-24 items-center">
        <motion.div
          initial={{ opacity: 0, x: -50 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 1 }}
          viewport={{ once: true }}
        >
          <SectionHeader title="Bio_Process" subtitle="Who am I?" />
          <div className="space-y-8 text-muted-foreground text-xl leading-relaxed mb-12 font-medium">
            <p className="border-l-4 border-primary pl-8 py-2">
              I am a Computer Science Engineering student at the <span className="text-primary font-bold">Institute of Aeronautical Engineering</span>. I specialize in building modern web applications and solving real-world problems.
            </p>
            <p>
              I enjoy developing innovative platforms, experimenting with AI-driven solutions, and creating intuitive user interfaces. My focus is on <span className="text-secondary font-bold">intelligent automation</span> and <span className="text-accent font-bold">premium UI architecture</span>.
            </p>
          </div>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-10">
            <InfoBox icon={<MapPin className="text-secondary" />} label="Base_Station" value={data.location} />
            <InfoBox icon={<Phone className="text-accent" />} label="Secure_Line" value={data.phone} />
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, x: 50 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 1 }}
          viewport={{ once: true }}
          className="relative"
        >
          <div className="glass-premium p-12 rounded-[3.5rem] relative z-10 overflow-hidden group">
            <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-secondary/5 to-accent/5 opacity-0 group-hover:opacity-100 transition-opacity duration-700" />
            <div className="space-y-12">
              <AboutItem icon={<Cpu />} title="Full-Stack_Engine" desc="Bridging sleak frontends with robust backend kernels." color="primary" />
              <AboutItem icon={<Terminal />} title="AI_Processing" desc="Leveraging LLMs to build high-intelligence tools." color="secondary" />
              <AboutItem icon={<Globe />} title="Web_Evolution" desc="Constantly exploring the next wave of web tech." color="accent" />
            </div>
          </div>
          <div className="absolute -inset-10 bg-primary/20 blur-[120px] -z-10 rounded-full animate-pulse" />
        </motion.div>
      </div>
    </div>
  );
};

const AboutItem = ({ icon, title, desc, color }: any) => (
  <div className="flex items-center gap-10 group/item hover:translate-x-3 transition-transform duration-500">
    <div className={cn(
      "w-20 h-20 glass rounded-3xl flex items-center justify-center border transition-all duration-500",
      color === "primary" ? "text-primary border-primary/20 shadow-[0_0_20px_rgba(0,255,255,0.1)] group-hover/item:neon-glow-cyan" :
      color === "secondary" ? "text-secondary border-secondary/20 shadow-[0_0_20px_rgba(168,85,247,0.1)] group-hover/item:neon-glow-purple" :
      "text-accent border-accent/20 shadow-[0_0_20px_rgba(236,72,153,0.1)] group-hover/item:neon-glow-magenta"
    )}>
      {icon}
    </div>
    <div>
      <h4 className="font-orbitron font-black text-xl mb-2 uppercase tracking-widest">{title}</h4>
      <p className="text-muted-foreground text-base leading-relaxed">{desc}</p>
    </div>
  </div>
);

const InfoBox = ({ icon, label, value }: any) => (
  <div className="glass-card p-6 rounded-3xl border-white/5 hover:border-white/20 transition-all group">
    <span className="block text-[10px] font-black text-primary uppercase tracking-[0.4em] mb-3 opacity-50">{label}</span>
    <span className="text-lg font-black flex items-center gap-3 group-hover:text-primary transition-colors">
      <div className="w-10 h-10 glass rounded-xl flex items-center justify-center group-hover:scale-110 transition-transform">{icon}</div>
      {value}
    </span>
  </div>
);

const EducationSection = ({ data }: { data: any[] }) => {
  return (
    <div className="container relative z-10">
      <SectionHeader title="Edu_Node" subtitle="Academic Kernel" align="center" />
      <div className="max-w-5xl mx-auto space-y-12">
        {data.map((edu, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, x: i % 2 === 0 ? -50 : 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: i * 0.1 }}
            viewport={{ once: true }}
            className="glass-premium p-10 rounded-[3rem] group hover:border-primary/40 transition-all duration-500"
          >
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-8">
              <div className="flex items-center gap-10">
                <div className="w-20 h-20 glass rounded-[2rem] flex items-center justify-center text-primary border border-primary/20 group-hover:neon-glow-cyan transition-all">
                  <GraduationCap className="w-10 h-10" />
                </div>
                <div>
                  <h4 className="text-3xl font-black font-orbitron group-hover:text-primary transition-colors tracking-tighter uppercase">{edu.school}</h4>
                  <p className="text-muted-foreground font-black tracking-[0.3em] uppercase text-xs mt-2">{edu.degree}</p>
                </div>
              </div>
              <div className="text-right w-full md:w-auto flex md:flex-col items-center md:items-end justify-between md:justify-center">
                <span className="text-primary font-black text-base tracking-[0.2em] mb-2">{edu.period}</span>
                <div className="px-6 py-3 glass rounded-2xl border border-white/10 group-hover:border-primary/30 transition-all">
                  <span className="text-[10px] uppercase font-black tracking-[0.4em] text-muted-foreground mr-3">CGPA:</span>
                  <span className="font-orbitron font-black text-2xl text-white group-hover:neon-text transition-all">{edu.cgpa}</span>
                </div>
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
};

const SkillsSection = ({ categories }: { categories: any[] }) => {
  return (
    <div className="container relative z-10">
      <SectionHeader title="Tech_Stack" subtitle="The Engine Room" align="center" />
      <div className="grid grid-cols-1 md:grid-cols-2 gap-16">
        {categories.map((cat, i) => (
          <motion.div
            key={cat.title}
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: i * 0.1 }}
            viewport={{ once: true }}
            className="glass-premium p-12 rounded-[4rem] group"
          >
            <h4 className="font-orbitron font-black text-3xl mb-12 uppercase tracking-[0.3em] text-primary flex items-center gap-6">
              <div className="w-3 h-12 bg-primary rounded-full animate-glow-pulse" />
              {cat.title}
            </h4>
            <div className="space-y-10">
              {cat.skills.map((skill: any, sIdx: number) => (
                <motion.div 
                  key={skill.name}
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.5 + sIdx * 0.1 }}
                  viewport={{ once: true }}
                >
                  <div className="flex justify-between items-center mb-4">
                    <span className="font-black text-sm uppercase tracking-[0.3em] group-hover:text-white transition-colors">{skill.name}</span>
                    <span className="text-xs font-black text-primary tracking-widest">{skill.level}%</span>
                  </div>
                  <div className="h-3 bg-white/5 rounded-full overflow-hidden p-[2px] border border-white/10 group-hover:border-primary/20 transition-all">
                    <motion.div
                      initial={{ width: 0 }}
                      whileInView={{ width: `${skill.level}%` }}
                      transition={{ duration: 2, ease: "circOut" }}
                      viewport={{ once: true }}
                      className={cn("h-full rounded-full relative", skill.color)}
                    >
                      <div className="absolute inset-0 bg-white/30 blur-sm animate-pulse" />
                    </motion.div>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
};

const ProjectCard = ({ project, i }: { project: any; i: number }) => {
  const cardRef = useRef<HTMLDivElement>(null);
  const [tilt, setTilt] = useState({ x: 0, y: 0 });

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    const x = (e.clientX - (rect.left + rect.width / 2)) / 25;
    const y = (e.clientY - (rect.top + rect.height / 2)) / 25;
    setTilt({ x: -y, y: x });
  };

  const handleMouseLeave = () => {
    setTilt({ x: 0, y: 0 });
  };

  return (
    <motion.div
      ref={cardRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8, delay: i * 0.2 }}
      viewport={{ once: true }}
      animate={{ rotateX: tilt.x, rotateY: tilt.y }}
      style={{ transformStyle: "preserve-3d" }}
      className={cn(
        "glass-premium rounded-[4rem] overflow-hidden flex flex-col group transition-all duration-700 border-white/5 hover:border-primary/30",
        `hover:${project.neon}`
      )}
    >
      <div className={cn("h-80 bg-gradient-to-br relative flex items-center justify-center overflow-hidden", project.color)}>
         <div className="absolute inset-0 bg-black/60 group-hover:bg-black/20 transition-colors duration-700" />
         <motion.div 
           whileHover={{ scale: 1.1, rotate: 5 }}
           className="relative z-10"
         >
           <Terminal className="w-32 h-32 text-white/10 group-hover:text-primary transition-colors duration-700" />
         </motion.div>
         
         <div className="absolute top-10 right-10 flex gap-4 opacity-0 group-hover:opacity-100 transition-all duration-500 translate-y-5 group-hover:translate-y-0">
            <a href={project.github} className="w-14 h-14 glass rounded-2xl flex items-center justify-center hover:text-primary transition-all hover:scale-110 border border-white/10 shadow-2xl">
              <Github className="w-7 h-7" />
            </a>
         </div>
      </div>
      
      <div className="p-16 flex flex-col flex-grow" style={{ transform: "translateZ(50px)" }}>
        <h4 className="text-5xl font-black font-orbitron tracking-tighter uppercase group-hover:text-primary transition-colors leading-none mb-8">
          {project.title}
        </h4>
        <p className="text-muted-foreground text-xl mb-12 leading-relaxed">
          {project.desc}
        </p>
        
        <div className="space-y-6 mb-12">
          <h5 className="text-[10px] font-black uppercase tracking-[0.5em] text-primary/40">Core_Systems</h5>
          <div className="flex flex-wrap gap-4">
            {project.features.map((f: string) => (
              <span key={f} className="px-6 py-3 glass rounded-2xl text-xs font-black uppercase tracking-widest border border-white/5 flex items-center gap-3 hover:border-primary/40 transition-all group/feat">
                <Zap className="w-4 h-4 text-secondary group-hover/feat:animate-ping" /> {f}
              </span>
            ))}
          </div>
        </div>
        
        <div className="mt-auto pt-10 border-t border-white/10 flex flex-wrap gap-4">
          {project.tags.map(tag => (
            <span key={tag} className="text-[10px] uppercase font-black tracking-[0.4em] px-4 py-2 bg-white/5 rounded-full border border-white/5 text-muted-foreground group-hover:text-primary transition-colors">
              {tag}
            </span>
          ))}
        </div>
      </div>
    </motion.div>
  );
};

const ProjectsSection = ({ projects }: { projects: any[] }) => {
  return (
    <div className="container relative z-10">
      <SectionHeader title="Repo_Matrix" subtitle="Code Repositories" />
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-20">
        {projects.map((project, i) => (
          <ProjectCard key={project.id} project={project} i={i} />
        ))}
      </div>
    </div>
  );
};

const ExperienceSection = ({ internships }: { internships: any[] }) => {
  return (
    <div className="container relative z-10">
      <SectionHeader title="System_Logic" subtitle="Professional Journey" align="center" />
      <div className="max-w-5xl mx-auto">
        {internships.map((exp, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, scale: 0.9, y: 30 }}
            whileInView={{ opacity: 1, scale: 1, y: 0 }}
            transition={{ duration: 1, delay: i * 0.2 }}
            viewport={{ once: true }}
            className="relative pl-24 pb-32 border-l-4 border-primary/20 last:pb-0 group"
          >
            <div className="absolute left-[-22px] top-0 w-10 h-10 rounded-full bg-black border-4 border-primary shadow-[0_0_30px_rgba(0,255,255,1)] z-10 flex items-center justify-center">
               <div className="w-3 h-3 bg-primary rounded-full animate-ping" />
            </div>
            
            <div className="glass-premium p-16 rounded-[4rem] relative overflow-hidden group hover:border-primary/40 transition-all duration-700">
              <div className="absolute -top-10 -right-10 p-12 opacity-5 group-hover:opacity-20 transition-all duration-700 group-hover:-rotate-12 group-hover:scale-150">
                <Briefcase className="w-48 h-48" />
              </div>
              
              <span className="text-primary font-orbitron font-black text-sm tracking-[0.5em] mb-6 block uppercase">{exp.period}</span>
              <h4 className="text-4xl md:text-5xl font-black mb-4 font-orbitron uppercase tracking-tighter group-hover:text-primary transition-colors leading-none">{exp.role}</h4>
              <p className="text-secondary font-black mb-12 uppercase tracking-[0.4em] text-sm flex items-center gap-4">
                <Globe className="w-5 h-5" /> {exp.company}
              </p>
              
              <ul className="space-y-6">
                {exp.desc.map((item: string, idx: number) => (
                  <li key={idx} className="flex gap-6 text-muted-foreground text-lg leading-relaxed group/li">
                    <div className="w-2 h-2 rounded-full bg-primary mt-3 shrink-0 group-hover/li:scale-150 transition-transform shadow-[0_0_10px_#0ff]" />
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
};

const CertificationsSection = ({ certifications }: { certifications: any[] }) => {
  return (
    <div className="container relative z-10">
      <SectionHeader title="Verified_Core" subtitle="System Certificates" />
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
        {certifications.map((cert, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, scale: 0.8 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ delay: i * 0.1 }}
            viewport={{ once: true }}
            whileHover={{ y: -15, scale: 1.05 }}
            className="glass-premium p-10 rounded-[3rem] flex flex-col items-center text-center gap-8 border-white/5 hover:border-primary/40 transition-all duration-500 group"
          >
            <div className="w-24 h-24 glass rounded-[2rem] flex items-center justify-center text-secondary border border-secondary/20 shadow-[0_0_30px_rgba(168,85,247,0.2)] group-hover:neon-glow-purple transition-all duration-500">
              <Award className="w-12 h-12" />
            </div>
            <div>
              <h4 className="font-orbitron font-black text-2xl mb-4 group-hover:text-white transition-colors uppercase leading-tight tracking-tighter">{cert.name}</h4>
              <p className="text-muted-foreground text-xs font-black uppercase tracking-[0.3em]">{cert.issuer}</p>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
};

const AchievementsSection = ({ achievements }: { achievements: any[] }) => {
  return (
    <div className="container relative z-10">
      <SectionHeader title="Global_Stats" subtitle="System Achievements" align="center" />
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10">
        {achievements.map((item, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.1 }}
            viewport={{ once: true }}
            className="glass-premium p-10 rounded-[3.5rem] text-center border-white/5 hover:border-primary/30 transition-all group"
          >
            <div className="w-20 h-20 glass rounded-full flex items-center justify-center text-primary mx-auto mb-8 border-primary/20 group-hover:scale-110 group-hover:neon-glow-cyan transition-all duration-500">
              <Trophy className="w-10 h-10" />
            </div>
            <h4 className="font-orbitron font-black text-2xl mb-6 group-hover:text-primary transition-colors tracking-tighter uppercase leading-none">{item.title}</h4>
            <p className="text-muted-foreground text-base leading-relaxed font-medium">{item.desc}</p>
          </motion.div>
        ))}
      </div>
    </div>
  );
};

const CodingProfilesSection = ({ profiles }: { profiles: any[] }) => {
  return (
    <div className="container relative z-10">
      <SectionHeader title="Neural_Data" subtitle="Coding Profiles" align="center" />
      <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
        {profiles.map((profile, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: i * 0.1 }}
            viewport={{ once: true }}
            whileHover={{ y: -20 }}
            className="glass-premium p-12 rounded-[4.5rem] border-white/5 group hover:border-primary/50 transition-all duration-700"
          >
            <div className="flex flex-col items-center text-center">
              <div className="w-24 h-24 glass rounded-[2.5rem] flex items-center justify-center text-secondary mb-10 group-hover:neon-glow-purple transition-all border border-secondary/20 shadow-2xl">
                <Code className="w-12 h-12" />
              </div>
              <h4 className="text-4xl font-black font-orbitron mb-3 uppercase tracking-tighter group-hover:text-primary transition-colors leading-none">{profile.name}</h4>
              <p className="text-muted-foreground text-xs uppercase tracking-[0.5em] mb-10 font-black">{profile.username}</p>
              <div className="w-full py-6 glass rounded-3xl border border-white/5 group-hover:border-primary/20 transition-all shadow-inner">
                <span className="block text-[10px] text-muted-foreground uppercase font-black tracking-[0.4em] mb-2">Processed_Tasks</span>
                <span className="text-4xl font-black font-orbitron neon-text tracking-tighter">{profile.solved}</span>
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
};

const ContactSection = ({ profile }: { profile: any }) => {
  return (
    <div className="container relative z-10">
      <SectionHeader title="Terminal_Link" subtitle="Establish Signal" align="center" />
      <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-32">
        <motion.div
          initial={{ opacity: 0, x: -50 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 1 }}
          viewport={{ once: true }}
        >
          <h4 className="text-6xl md:text-8xl font-black font-orbitron mb-10 neon-text-gradient tracking-tighter uppercase leading-none">CONNECT<br/>TO_CORE</h4>
          <p className="text-muted-foreground text-2xl mb-16 leading-relaxed max-w-xl font-medium">
            Signal pathways are open for collaboration. Whether a high-level project or a simple ping, I am ready for input.
          </p>
          <div className="space-y-12">
            <a href={`mailto:${profile.email}`} className="flex items-center gap-10 group">
              <div className="w-20 h-20 glass rounded-[2rem] flex items-center justify-center group-hover:neon-glow-cyan transition-all duration-500 border border-primary/20 shadow-2xl">
                <Mail className="w-8 h-8 text-primary group-hover:scale-110 transition-transform" />
              </div>
              <div>
                <span className="block text-xs font-black text-muted-foreground uppercase tracking-[0.5em] mb-2">Direct_Channel</span>
                <span className="text-2xl font-black font-orbitron tracking-tight group-hover:text-primary transition-colors">{profile.email}</span>
              </div>
            </a>
            <div className="flex gap-8 pt-8">
              <SocialBtn href={profile.github} icon={<Github />} color="primary" />
              <SocialBtn href={profile.linkedin} icon={<Linkedin />} color="secondary" />
            </div>
          </div>
        </motion.div>

        <motion.form
          initial={{ opacity: 0, x: 50 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 1 }}
          viewport={{ once: true }}
          className="glass-premium p-16 rounded-[4.5rem] space-y-10 border-white/5 relative overflow-hidden group shadow-2xl"
        >
          <div className="absolute top-0 right-0 w-64 h-64 bg-primary/10 blur-[100px] -z-10 group-hover:bg-primary/20 transition-all duration-1000" />
          <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
            <div className="space-y-4">
              <label className="block text-[10px] font-black uppercase tracking-[0.4em] text-primary ml-2">Agent_ID</label>
              <input type="text" className="w-full bg-white/5 border border-white/10 rounded-3xl px-8 py-5 focus:border-primary outline-none transition-all placeholder:text-muted-foreground/20 font-bold" placeholder="YOUR_NAME" />
            </div>
            <div className="space-y-4">
              <label className="block text-[10px] font-black uppercase tracking-[0.4em] text-primary ml-2">Return_Path</label>
              <input type="email" className="w-full bg-white/5 border border-white/10 rounded-3xl px-8 py-5 focus:border-primary outline-none transition-all placeholder:text-muted-foreground/20 font-bold" placeholder="YOUR_EMAIL" />
            </div>
          </div>
          <div className="space-y-4">
            <label className="block text-[10px] font-black uppercase tracking-[0.4em] text-primary ml-2">Data_Packet</label>
            <textarea rows={6} className="w-full bg-white/5 border border-white/10 rounded-[2.5rem] px-8 py-6 focus:border-primary outline-none transition-all placeholder:text-muted-foreground/20 font-bold" placeholder="ENCODE_YOUR_MESSAGE_HERE..." />
          </div>
          <MagneticButton className="w-full py-6 text-xl tracking-[0.4em]">
            Transmit_Data
          </MagneticButton>
        </motion.form>
      </div>
    </div>
  );
};

const SocialBtn = ({ href, icon, color }: any) => (
  <motion.a 
    href={href} 
    whileHover={{ y: -10, scale: 1.1 }}
    className={cn(
      "w-20 h-20 glass rounded-[2rem] flex items-center justify-center border transition-all duration-500 shadow-2xl",
      color === "primary" ? "hover:text-primary hover:border-primary/40 hover:neon-glow-cyan" : "hover:text-secondary hover:border-secondary/40 hover:neon-glow-purple"
    )}
  >
    {icon}
  </motion.a>
);

const SectionHeader = ({ title, subtitle, align = "left" }: { title: string; subtitle: string; align?: "left" | "center" }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 1 }}
      viewport={{ once: true }}
      className={`mb-32 ${align === "center" ? "text-center" : "text-left"}`}
    >
      <span className="text-primary font-orbitron font-black text-xs tracking-[0.8em] uppercase mb-8 block opacity-40">
        // {subtitle}
      </span>
      <h2 className="text-6xl md:text-9xl font-black font-orbitron uppercase tracking-tighter leading-none relative inline-block group">
        {title}
        <span className="text-primary group-hover:animate-ping absolute -right-4 top-0 text-3xl">.</span>
      </h2>
      <div className={`h-2 w-48 bg-gradient-to-r from-primary via-secondary to-transparent mt-12 rounded-full ${align === "center" ? "mx-auto" : ""}`} />
    </motion.div>
  );
};

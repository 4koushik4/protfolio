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
    <>
      <div className="section-divider" />
      <motion.section
        id={id}
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-5%" }}
        transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
        className={cn("py-20 px-4 relative", className)}
      >
        {children}
      </motion.section>
    </>
  );
};

const MagneticButton = ({ children, className, onClick, variant = "primary" }: { children: React.ReactNode; className?: string; onClick?: () => void; variant?: "primary" | "secondary" }) => {
  const [position, setPosition] = useState({ x: 0, y: 0 });

  const handleMouseMove = (e: React.MouseEvent) => {
    const { clientX, clientY, currentTarget } = e;
    const { left, top, width, height } = currentTarget.getBoundingClientRect();
    const x = (clientX - (left + width / 2)) * 0.3;
    const y = (clientY - (top + height / 2)) * 0.3;
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
      whileHover={{ scale: 1.04 }}
      whileTap={{ scale: 0.97 }}
      transition={{ type: "spring", stiffness: 150, damping: 15, mass: 0.1 }}
      onClick={onClick}
      className={cn(
        "relative overflow-hidden px-8 py-3 rounded-full font-bold uppercase tracking-wider transition-all group ripple-click",
        variant === "primary"
          ? "btn-vibrant-primary"
          : "btn-vibrant-secondary",
        className
      )}
    >
      <div className="absolute inset-0 bg-white/20 translate-y-full group-hover:translate-y-0 transition-transform duration-500 rounded-full" />
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

      <SectionWrapper id="education" className="bg-white/[0.02]">
        <EducationSection data={data.education} />
      </SectionWrapper>

      <SectionWrapper id="skills">
        <SkillsSection categories={data.skillCategories} />
      </SectionWrapper>

      <SectionWrapper id="projects" className="bg-white/[0.02]">
        <ProjectsSection projects={data.projects} />
      </SectionWrapper>

      <SectionWrapper id="experience">
        <ExperienceSection internships={data.internships} />
      </SectionWrapper>

      <SectionWrapper id="certifications" className="bg-white/[0.02]">
        <CertificationsSection certifications={data.certifications} />
      </SectionWrapper>

      <SectionWrapper id="achievements">
        <AchievementsSection achievements={data.achievements} />
      </SectionWrapper>

      <SectionWrapper id="profiles" className="bg-white/[0.02]">
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
  const heroRef = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({ target: heroRef, offset: ["start start", "end start"] });
  const heroY = useTransform(scrollYProgress, [0, 1], [0, 150]);
  const heroOpacity = useTransform(scrollYProgress, [0, 0.8], [1, 0]);
  const heroScale = useTransform(scrollYProgress, [0, 1], [1, 0.95]);
  
  return (
    <motion.section
      ref={heroRef}
      id="hero"
      className="min-h-[80vh] flex items-center justify-center relative overflow-hidden px-4 py-16"
      style={{ opacity: heroOpacity, scale: heroScale }}
    >
      {/* Animated gradient background layers */}
      <motion.div
        animate={{
          background: [
            "radial-gradient(ellipse at 30% 40%, rgba(255,0,204,0.12) 0%, transparent 60%)",
            "radial-gradient(ellipse at 70% 60%, rgba(0,234,255,0.12) 0%, transparent 60%)",
            "radial-gradient(ellipse at 50% 30%, rgba(255,138,0,0.1) 0%, transparent 60%)",
            "radial-gradient(ellipse at 30% 40%, rgba(255,0,204,0.12) 0%, transparent 60%)",
          ],
        }}
        transition={{ duration: 15, repeat: Infinity, ease: "easeInOut" }}
        className="absolute inset-0 -z-10"
      />

      {/* Floating neon grid – parallax */}
      <motion.div 
        style={{ y: heroY }}
        className="absolute inset-0 bg-cyber-grid opacity-[0.08] -z-10"
      />

      {/* Glow wave – top */}
      <motion.div
        animate={{ opacity: [0.2, 0.5, 0.2], scale: [1, 1.1, 1] }}
        transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
        className="absolute top-0 left-1/2 -translate-x-1/2 w-[80%] h-[400px] bg-[radial-gradient(ellipse,rgba(0,255,255,0.06)_0%,transparent_70%)] -z-10 blur-3xl"
      />

      <motion.div style={{ y: heroY }} className="container max-w-[1100px] relative z-10 flex flex-col items-center text-center">
        {/* Profile avatar */}
        <motion.div
          initial={{ opacity: 0, scale: 0.85 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
          className="relative mb-10"
        >
          <div className="w-40 h-40 rounded-[2rem] p-1.5 relative group glow-pulse-avatar">
            <div className="absolute inset-0 bg-gradient-to-br from-[#00ffff] via-[#a855f7] to-[#ff00cc] animate-spin-slow rounded-[2.2rem] opacity-30 blur-lg group-hover:opacity-70 transition-opacity duration-700" />
            <div className="absolute inset-0 border border-white/20 rounded-[2rem]" />
            <div className="w-full h-full rounded-[1.8rem] bg-black border border-white/10 flex items-center justify-center overflow-hidden relative z-10">
               <img src="https://i.ibb.co/ym7TLL0z/profile.jpg" alt="Profile" className="w-full h-full object-cover group-hover:scale-110 transition-all duration-700" />
            </div>
          </div>
        </motion.div>

        <div className="mb-8">
           <motion.span 
             initial={{ opacity: 0, letterSpacing: "0.8em" }}
             animate={{ opacity: 0.4, letterSpacing: "0.5em" }}
             transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
             className="text-xs font-black uppercase text-white tracking-[0.6em] mb-4 block"
           >
             Initializing Developer Matrix
           </motion.span>
           
           <h1 style={{ fontSize: 'clamp(2.5rem, 5vw, 4rem)' }} className="font-black font-orbitron mb-4 flex flex-wrap justify-center gap-x-2 tracking-tighter">
             {letters.map((char: string, i: number) => (
               <motion.span
                 key={i}
                 initial={{ opacity: 0, y: 20 }}
                 animate={{ opacity: 1, y: 0 }}
                 transition={{ 
                   duration: 0.4, 
                   delay: 0.1 + i * 0.025,
                   ease: [0.22, 1, 0.36, 1]
                 }}
                 className="inline-block text-gradient-vibrant text-glow"
               >
                 {char === " " ? "\u00A0" : char}
               </motion.span>
             ))}
           </h1>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, delay: 0.6, ease: [0.22, 1, 0.36, 1] }}
          className="font-space-grotesk mb-8 max-w-2xl leading-relaxed font-bold uppercase tracking-[0.2em] text-sm flex items-center gap-3 bg-white/[0.05] px-6 py-2.5 rounded-full border border-white/[0.1] backdrop-blur-lg"
        >
          <span className="w-2 h-2 rounded-full bg-[#00ffff] animate-ping" />
          <span className="text-gradient-vibrant">{data.tagline}</span>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, delay: 0.8 }}
          className="flex flex-wrap gap-6 justify-center items-center"
        >
          <MagneticButton 
            onClick={() => document.getElementById('projects')?.scrollIntoView({ behavior: 'smooth' })}
          >
            View Projects <ArrowRight className="w-4 h-4 group-hover:translate-x-2 transition-transform" />
          </MagneticButton>
          
          <MagneticButton 
            variant="secondary"
            onClick={() => document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' })}
          >
            Contact Me
          </MagneticButton>
          
          <motion.button 
            whileHover={{ scale: 1.05 }}
            className="flex items-center gap-2 text-muted-foreground hover:text-white transition-colors uppercase font-bold tracking-[0.2em] text-xs"
          >
            <Download className="w-4 h-4" /> Download Resume
          </motion.button>
        </motion.div>
      </motion.div>

      {/* Floating particles in hero */}
      <motion.div 
        animate={{ opacity: [0.06, 0.12, 0.06] }}
        transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
        className="absolute inset-0 bg-cyber-grid pointer-events-none -z-10"
      />

      {/* Bottom gradient fade */}
      <div className="absolute bottom-0 left-0 right-0 h-40 bg-gradient-to-t from-[#0f0c29]/80 to-transparent pointer-events-none z-10" />
    </motion.section>
  );
};

const About = ({ data }: { data: any }) => {
  return (
    <div className="container relative z-10">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
          viewport={{ once: true }}
        >
          <SectionHeader title="Bio_Process" subtitle="Who am I?" />
          <div className="space-y-6 text-muted-foreground text-base leading-relaxed mb-8">
            <p className="border-l-4 border-primary pl-8 py-2">
              I am a Computer Science Engineering student at the <span className="text-primary font-bold">Institute of Aeronautical Engineering</span>. I specialize in building modern web applications and solving real-world problems.
            </p>
            <p>
              I enjoy developing innovative platforms, experimenting with AI-driven solutions, and creating intuitive user interfaces. My focus is on <span className="text-secondary font-bold">intelligent automation</span> and <span className="text-accent font-bold">premium UI architecture</span>.
            </p>
          </div>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            <InfoBox icon={<MapPin className="text-secondary" />} label="Base_Station" value={data.location} />
            <InfoBox icon={<Phone className="text-accent" />} label="Secure_Line" value={data.phone} />
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, x: 20 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
          viewport={{ once: true }}
          className="relative"
        >
          <div className="glass-premium p-8 rounded-2xl relative z-10 overflow-hidden group">
            <div className="absolute inset-0 bg-gradient-to-br from-primary/[0.03] via-secondary/[0.03] to-accent/[0.03] opacity-0 group-hover:opacity-100 transition-opacity duration-1000" />
            <div className="space-y-8">
              <AboutItem icon={<Cpu />} title="Full-Stack_Engine" desc="Bridging sleak frontends with robust backend kernels." color="primary" />
              <AboutItem icon={<Terminal />} title="AI_Processing" desc="Leveraging LLMs to build high-intelligence tools." color="secondary" />
              <AboutItem icon={<Globe />} title="Web_Evolution" desc="Constantly exploring the next wave of web tech." color="accent" />
            </div>
          </div>
          <div className="absolute -inset-10 bg-primary/10 blur-[80px] -z-10 rounded-full animate-pulse" />
        </motion.div>
      </div>
    </div>
  );
};

const AboutItem = ({ icon, title, desc, color }: any) => (
  <div className="flex items-center gap-6 group/item hover:translate-x-2 transition-transform duration-500">
    <div className={cn(
      "w-14 h-14 glass rounded-2xl flex items-center justify-center border transition-all duration-500",
      color === "primary" ? "text-primary border-primary/20 shadow-[0_0_20px_rgba(0,255,255,0.1)] group-hover/item:neon-glow-cyan" :
      color === "secondary" ? "text-secondary border-secondary/20 shadow-[0_0_20px_rgba(168,85,247,0.1)] group-hover/item:neon-glow-purple" :
      "text-accent border-accent/20 shadow-[0_0_20px_rgba(236,72,153,0.1)] group-hover/item:neon-glow-magenta"
    )}>
      {icon}
    </div>
    <div>
      <h4 className="font-orbitron font-bold text-base mb-1 uppercase tracking-wider">{title}</h4>
      <p className="text-muted-foreground text-sm leading-relaxed">{desc}</p>
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
            initial={{ opacity: 0, x: i % 2 === 0 ? -30 : 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.4, delay: i * 0.05 }}
            viewport={{ once: true }}
            className="glass-premium p-8 rounded-2xl group hover:border-primary/40 transition-all duration-500"
          >
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
              <div className="flex items-center gap-6">
                <div className="w-14 h-14 glass rounded-xl flex items-center justify-center text-primary border border-primary/20 group-hover:neon-glow-cyan transition-all">
                  <GraduationCap className="w-7 h-7" />
                </div>
                <div>
                  <h4 className="text-xl font-bold font-orbitron group-hover:text-primary transition-colors tracking-tight uppercase">{edu.school}</h4>
                  <p className="text-muted-foreground font-bold tracking-[0.2em] uppercase text-xs mt-1">{edu.degree}</p>
                </div>
              </div>
              <div className="text-right w-full md:w-auto flex md:flex-col items-center md:items-end justify-between md:justify-center">
                <span className="text-primary font-bold text-sm tracking-[0.15em] mb-1">{edu.period}</span>
                <div className="px-4 py-2 glass rounded-xl border border-white/10 group-hover:border-primary/30 transition-all">
                  <span className="text-[10px] uppercase font-bold tracking-[0.3em] text-muted-foreground mr-2">CGPA:</span>
                  <span className="font-orbitron font-bold text-lg text-white group-hover:neon-text transition-all">{edu.cgpa}</span>
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
      <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
        {categories.map((cat, i) => (
          <motion.div
            key={cat.title}
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.4, delay: i * 0.05 }}
            viewport={{ once: true }}
            className={cn(
              "glass-premium p-8 rounded-2xl group transition-all duration-500",
              i % 4 === 0 ? "skill-card-glow-cyan" :
              i % 4 === 1 ? "skill-card-glow-purple" :
              i % 4 === 2 ? "skill-card-glow-pink" :
              "skill-card-glow-orange"
            )}
          >
            <h4 className="font-orbitron font-bold text-xl mb-8 uppercase tracking-wider text-primary flex items-center gap-4">
              <div className="w-2 h-8 bg-primary rounded-full animate-glow-pulse" />
              {cat.title}
            </h4>
            <div className="space-y-6">
              {cat.skills.map((skill: any, sIdx: number) => (
                <motion.div 
                  key={skill.name}
                  initial={{ opacity: 0, x: -15 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  transition={{ delay: sIdx * 0.05 }}
                  viewport={{ once: true }}
                >
                  <div className="flex justify-between items-center mb-2">
                    <span className="font-bold text-sm uppercase tracking-wider group-hover:text-white transition-colors">{skill.name}</span>
                    <span className="text-xs font-bold text-primary tracking-wider">{skill.level}%</span>
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
  const [glowPos, setGlowPos] = useState({ x: 50, y: 50 });

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    const x = (e.clientX - (rect.left + rect.width / 2)) / 20;
    const y = (e.clientY - (rect.top + rect.height / 2)) / 20;
    const gx = ((e.clientX - rect.left) / rect.width) * 100;
    const gy = ((e.clientY - rect.top) / rect.height) * 100;
    setTilt({ x: -y, y: x });
    setGlowPos({ x: gx, y: gy });
  };

  const handleMouseLeave = () => {
    setTilt({ x: 0, y: 0 });
    setGlowPos({ x: 50, y: 50 });
  };

  return (
    <motion.div
      ref={cardRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, delay: i * 0.05, ease: [0.22, 1, 0.36, 1] }}
      viewport={{ once: true }}
      animate={{ rotateX: tilt.x, rotateY: tilt.y }}
      style={{ transformStyle: "preserve-3d", perspective: 1000 }}
      className={cn(
        "glass-premium rounded-2xl overflow-hidden flex flex-col group transition-all duration-700 border-white/5 hover:border-primary/30 relative animate-float-slow",
      )}
    >
      {/* Animated gradient border */}
      <div className="absolute inset-0 rounded-2xl opacity-50 group-hover:opacity-100 transition-opacity duration-700 -z-[1]" style={{
        background: "linear-gradient(135deg, #00ffff, #a855f7, #ec4899, #3b82f6, #ff8a00)",
        backgroundSize: "300% 300%",
        animation: "gradient-shift 4s ease infinite",
        padding: "2px",
        mask: "linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)",
        maskComposite: "exclude",
        WebkitMaskComposite: "xor",
      }} />
      <div
        className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none z-0"
        style={{
          background: `radial-gradient(circle at ${glowPos.x}% ${glowPos.y}%, rgba(0,255,255,0.15) 0%, transparent 50%)`,
        }}
      />
      <div className={cn("h-48 bg-gradient-to-br relative flex items-center justify-center overflow-hidden", project.color)}>
         <div className="absolute inset-0 bg-black/40 group-hover:bg-black/10 transition-colors duration-1000" />
         <motion.div 
           className="relative z-10"
           whileHover={{ scale: 1.15, rotate: 8 }}
           transition={{ type: "spring", stiffness: 200, damping: 15 }}
         >
           <Terminal className="w-16 h-16 text-white/10 group-hover:text-primary/30 transition-colors duration-700" />
         </motion.div>
         
         <div className="absolute top-6 right-6 flex gap-3 opacity-0 group-hover:opacity-100 transition-all duration-500 translate-y-3 group-hover:translate-y-0">
            <a href={project.github} className="w-10 h-10 glass rounded-xl flex items-center justify-center hover:text-primary transition-all hover:scale-110 border border-white/10 shadow-lg">
              <Github className="w-5 h-5" />
            </a>
         </div>
      </div>
      
      <div className="p-8 flex flex-col flex-grow" style={{ transform: "translateZ(50px)" }}>
        <h4 className="text-2xl font-bold font-orbitron tracking-tight uppercase group-hover:text-primary transition-colors leading-none mb-4">
          {project.title}
        </h4>
        <p className="text-muted-foreground text-sm mb-8 leading-relaxed">
          {project.desc}
        </p>
        
        <div className="space-y-4 mb-8">
          <h5 className="text-[10px] font-bold uppercase tracking-[0.4em] text-primary/40">Features</h5>
          <div className="flex flex-wrap gap-2">
            {project.features.map((f: string) => (
              <span key={f} className="px-4 py-2 glass rounded-lg text-xs font-bold uppercase tracking-wider border border-white/5 flex items-center gap-2 hover:border-primary/40 transition-all group/feat">
                <Zap className="w-3 h-3 text-secondary" /> {f}
              </span>
            ))}
          </div>
        </div>
        
        <div className="mt-auto pt-6 border-t border-white/10 flex flex-wrap gap-2">
          {project.tags.map((tag: string, tIdx: number) => {
            const tagColors = [
              "border-cyan-500/30 text-cyan-400 bg-cyan-500/10",
              "border-purple-500/30 text-purple-400 bg-purple-500/10",
              "border-pink-500/30 text-pink-400 bg-pink-500/10",
              "border-blue-500/30 text-blue-400 bg-blue-500/10",
              "border-emerald-500/30 text-emerald-400 bg-emerald-500/10",
            ];
            return (
              <span key={tag} className={cn(
                "text-[10px] uppercase font-bold tracking-[0.2em] px-3 py-1.5 rounded-full border transition-all",
                tagColors[tIdx % tagColors.length]
              )}>
                {tag}
              </span>
            );
          })}
        </div>
      </div>
    </motion.div>
  );
};

const ProjectsSection = ({ projects }: { projects: any[] }) => {
  return (
    <div className="container relative z-10">
      <SectionHeader title="Repo_Matrix" subtitle="Code Repositories" />
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
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
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: i * 0.05, ease: [0.22, 1, 0.36, 1] }}
            viewport={{ once: true }}
            className="relative pl-16 pb-20 border-l-4 border-gradient last:pb-0 group"
          >
            <div className="absolute left-[-16px] top-0 w-8 h-8 rounded-full bg-black border-2 border-primary shadow-[0_0_25px_rgba(0,255,255,1)] z-10 flex items-center justify-center">
               <div className="w-3 h-3 bg-primary rounded-full animate-ping shadow-[0_0_10px_#0ff]" />
            </div>
            
            <div className="glass-premium p-10 rounded-2xl relative overflow-hidden group hover:border-primary/40 transition-all duration-700">
              <div className="absolute -top-10 -right-10 p-8 opacity-5 group-hover:opacity-15 transition-all duration-700 group-hover:-rotate-12 group-hover:scale-150">
                <Briefcase className="w-32 h-32" />
              </div>
              
              <span className="text-primary font-orbitron font-bold text-sm tracking-[0.3em] mb-4 block uppercase">{exp.period}</span>
              <h4 className="text-2xl md:text-3xl font-bold mb-2 font-orbitron uppercase tracking-tight group-hover:text-primary transition-colors leading-none">{exp.role}</h4>
              <p className="text-secondary font-bold mb-8 uppercase tracking-[0.3em] text-xs flex items-center gap-3">
                <Globe className="w-4 h-4" /> {exp.company}
              </p>
              
              <ul className="space-y-4">
                {exp.desc.map((item: string, idx: number) => (
                  <li key={idx} className="flex gap-4 text-muted-foreground text-base leading-relaxed group/li">
                    <div className="w-1.5 h-1.5 rounded-full bg-primary mt-2.5 shrink-0 group-hover/li:scale-150 transition-transform shadow-[0_0_6px_#0ff]" />
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
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: i * 0.03, ease: [0.22, 1, 0.36, 1] }}
            viewport={{ once: true }}
            whileHover={{ y: -8, scale: 1.02 }}
            className="glass-premium p-8 rounded-2xl flex flex-col items-center text-center gap-6 border-white/5 hover:border-primary/40 transition-all duration-500 group"
          >
            <div className="w-16 h-16 glass rounded-xl flex items-center justify-center text-secondary border border-secondary/20 shadow-[0_0_12px_rgba(168,85,247,0.15)] group-hover:neon-glow-purple transition-all duration-500">
              <Award className="w-8 h-8" />
            </div>
            <div>
              <h4 className="font-orbitron font-bold text-lg mb-2 group-hover:text-white transition-colors uppercase leading-tight tracking-tight">{cert.name}</h4>
              <p className="text-muted-foreground text-xs font-bold uppercase tracking-[0.2em]">{cert.issuer}</p>
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
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: i * 0.03, ease: [0.22, 1, 0.36, 1] }}
            viewport={{ once: true }}
            whileHover={{ y: -6 }}
            className="glass-premium p-8 rounded-2xl text-center border-white/5 hover:border-primary/30 transition-all group"
          >
            <div className="w-14 h-14 glass rounded-full flex items-center justify-center text-primary mx-auto mb-6 border-primary/20 group-hover:scale-110 group-hover:neon-glow-cyan transition-all duration-500">
              <Trophy className="w-7 h-7" />
            </div>
            <h4 className="font-orbitron font-bold text-lg mb-4 group-hover:text-primary transition-colors tracking-tight uppercase leading-none">{item.title}</h4>
            <p className="text-muted-foreground text-sm leading-relaxed">{item.desc}</p>
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
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: i * 0.05, ease: [0.22, 1, 0.36, 1] }}
            viewport={{ once: true }}
            whileHover={{ y: -10 }}
            className="glass-premium p-8 rounded-2xl border-white/5 group hover:border-primary/50 transition-all duration-700"
          >
            <div className="flex flex-col items-center text-center">
              <div className="w-16 h-16 glass rounded-xl flex items-center justify-center text-secondary mb-6 group-hover:neon-glow-purple transition-all border border-secondary/20 shadow-lg">
                <Code className="w-8 h-8" />
              </div>
              <h4 className="text-2xl font-bold font-orbitron mb-2 uppercase tracking-tight group-hover:text-primary transition-colors leading-none">{profile.name}</h4>
              <p className="text-muted-foreground text-xs uppercase tracking-[0.3em] mb-6 font-bold">{profile.username}</p>
              <div className="w-full py-4 glass rounded-xl border border-white/5 group-hover:border-primary/20 transition-all">
                <span className="block text-[10px] text-muted-foreground uppercase font-bold tracking-[0.3em] mb-1">Solved</span>
                <span className="text-2xl font-bold font-orbitron neon-text tracking-tight">{profile.solved}</span>
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
      <div className="max-w-5xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-16">
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
          viewport={{ once: true }}
        >
          <h4 className="text-4xl md:text-5xl font-bold font-orbitron mb-6 neon-text-gradient tracking-tight uppercase leading-none">CONNECT<br/>WITH ME</h4>
          <p className="text-muted-foreground text-base mb-10 leading-relaxed max-w-xl">
            Open for collaboration. Whether a project or a quick chat, feel free to reach out.
          </p>
          <div className="space-y-8">
            <a href={`mailto:${profile.email}`} className="flex items-center gap-6 group">
              <div className="w-14 h-14 glass rounded-xl flex items-center justify-center group-hover:neon-glow-cyan transition-all duration-500 border border-primary/20 shadow-lg">
                <Mail className="w-6 h-6 text-primary group-hover:scale-110 transition-transform" />
              </div>
              <div>
                <span className="block text-xs font-bold text-muted-foreground uppercase tracking-[0.3em] mb-1">Email</span>
                <span className="text-lg font-bold font-orbitron tracking-tight group-hover:text-primary transition-colors">{profile.email}</span>
              </div>
            </a>
            <div className="flex gap-6 pt-6">
              <SocialBtn href={profile.github} icon={<Github />} color="primary" />
              <SocialBtn href={profile.linkedin} icon={<Linkedin />} color="secondary" />
            </div>
          </div>
        </motion.div>

        <motion.form
          initial={{ opacity: 0, x: 20 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
          viewport={{ once: true }}
          className="glass-premium p-10 rounded-2xl space-y-6 border-white/5 relative overflow-hidden group shadow-lg"
        >
          <div className="absolute top-0 right-0 w-48 h-48 bg-primary/5 blur-[80px] -z-10 group-hover:bg-primary/10 transition-all duration-1000" />
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-2">
              <label className="block text-[10px] font-bold uppercase tracking-[0.3em] text-primary ml-1">Name</label>
              <input type="text" className="w-full bg-white/5 border border-white/10 rounded-xl px-5 py-3 focus:border-primary outline-none transition-all placeholder:text-muted-foreground/20 font-medium" placeholder="Your name" />
            </div>
            <div className="space-y-2">
              <label className="block text-[10px] font-bold uppercase tracking-[0.3em] text-primary ml-1">Email</label>
              <input type="email" className="w-full bg-white/5 border border-white/10 rounded-xl px-5 py-3 focus:border-primary outline-none transition-all placeholder:text-muted-foreground/20 font-medium" placeholder="Your email" />
            </div>
          </div>
          <div className="space-y-2">
            <label className="block text-[10px] font-bold uppercase tracking-[0.3em] text-primary ml-1">Message</label>
            <textarea rows={5} className="w-full bg-white/5 border border-white/10 rounded-xl px-5 py-3 focus:border-primary outline-none transition-all placeholder:text-muted-foreground/20 font-medium" placeholder="Your message..." />
          </div>
          <MagneticButton className="w-full py-4 text-base tracking-wider">
            Send Message
          </MagneticButton>
        </motion.form>
      </div>
    </div>
  );
};

const SocialBtn = ({ href, icon, color }: any) => (
  <motion.a 
    href={href} 
    whileHover={{ y: -6, scale: 1.05 }}
    className={cn(
      "w-14 h-14 glass rounded-xl flex items-center justify-center border transition-all duration-500 shadow-lg",
      color === "primary" ? "hover:text-primary hover:border-primary/40 hover:neon-glow-cyan" : "hover:text-secondary hover:border-secondary/40 hover:neon-glow-purple"
    )}
  >
    {icon}
  </motion.a>
);

const SectionHeader = ({ title, subtitle, align = "left" }: { title: string; subtitle: string; align?: "left" | "center" }) => {
  const headerLetters = title.split("");
  return (
    <motion.div
      initial={{ opacity: 0, y: 15 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
      viewport={{ once: true }}
      className={`mb-16 ${align === "center" ? "text-center" : "text-left"}`}
    >
      <motion.span
        initial={{ opacity: 0, letterSpacing: "0.8em" }}
        whileInView={{ opacity: 0.4, letterSpacing: "0.5em" }}
        transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }}
        viewport={{ once: true }}
        className="text-primary font-orbitron font-bold text-xs tracking-[0.5em] uppercase mb-4 block"
      >
        // {subtitle}
      </motion.span>
      <h2 style={{ fontSize: 'clamp(1.5rem, 3vw, 2.5rem)' }} className="font-black font-orbitron uppercase tracking-tight leading-none relative inline-block group text-gradient-vibrant">
        {headerLetters.map((char, i) => (
          <motion.span
            key={i}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: i * 0.02, ease: [0.22, 1, 0.36, 1] }}
            viewport={{ once: true }}
            className="inline-block"
          >
            {char}
          </motion.span>
        ))}
        <motion.span
          animate={{ opacity: [1, 0.3, 1] }}
          transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
          className="text-primary absolute -right-4 top-0 text-3xl"
        >
          .
        </motion.span>
      </h2>
      <motion.div
        initial={{ scaleX: 0 }}
        whileInView={{ scaleX: 1 }}
        transition={{ duration: 1.2, delay: 0.3, ease: [0.22, 1, 0.36, 1] }}
        viewport={{ once: true }}
        className={cn(
          "h-[2px] w-32 bg-gradient-to-r from-primary via-secondary to-transparent mt-6 rounded-full origin-left",
          "shadow-[0_0_6px_rgba(0,255,255,0.2)]",
          align === "center" ? "mx-auto" : ""
        )}
      />
    </motion.div>
  );
};

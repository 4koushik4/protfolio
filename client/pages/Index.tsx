import { motion } from "framer-motion";
import { Layout } from "@/components/Layout";
import { ArrowRight, Github, ExternalLink, Award, Code, Briefcase, Zap } from "lucide-react";

export default function Index() {
  return (
    <Layout>
      <Hero />
      <About />
      <Skills />
      <Projects />
      <Experience />
      <Certifications />
      <Contact />
    </Layout>
  );
}

const Hero = () => {
  return (
    <section id="hero" className="min-h-screen flex items-center justify-center relative overflow-hidden px-4">
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
            transition={{ duration: 10, repeat: Infinity, ease: "linear" }}
            className="absolute -inset-4 border-2 border-dashed border-secondary/30 rounded-full"
          />
        </motion.div>

        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="text-6xl md:text-8xl font-black font-orbitron mb-6 leading-tight"
        >
          <span className="block text-white">HI, I'M</span>
          <span className="block neon-text">KOUSHIK JULURI</span>
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="text-xl md:text-2xl text-muted-foreground font-space-grotesk mb-12 max-w-3xl leading-relaxed"
        >
          Frontend Developer | AI Projects | Web Innovator
          <br />
          <span className="text-white/70 italic text-lg block mt-2">"Building the future of digital interactions with neon-infused code."</span>
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.6 }}
          className="flex flex-col sm:flex-row gap-6 items-center"
        >
          <button 
            onClick={() => document.getElementById('projects')?.scrollIntoView({ behavior: 'smooth' })}
            className="px-8 py-4 glass-card rounded-full font-bold uppercase tracking-widest flex items-center gap-3 hover:neon-glow-cyan hover:scale-105 transition-all group"
          >
            View Projects
            <ArrowRight className="w-5 h-5 group-hover:translate-x-2 transition-transform" />
          </button>
          <button 
            onClick={() => document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' })}
            className="px-8 py-4 border-2 border-secondary/50 rounded-full font-bold uppercase tracking-widest text-secondary hover:bg-secondary/10 hover:neon-glow-purple hover:scale-105 transition-all"
          >
            Contact Me
          </button>
        </motion.div>
      </div>

      {/* Decorative Hero elements */}
      <div className="absolute top-1/2 left-0 w-full h-px bg-gradient-to-r from-transparent via-primary/20 to-transparent -z-10 rotate-12" />
      <div className="absolute top-1/2 left-0 w-full h-px bg-gradient-to-r from-transparent via-secondary/20 to-transparent -z-10 -rotate-12" />
    </section>
  );
};

const About = () => {
  const skills = ["JavaScript", "React", "TypeScript", "Node.js", "AI Integration", "Tailwind CSS"];

  return (
    <section id="about" className="py-24 px-4 bg-black/40">
      <div className="container">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <SectionHeader title="About Me" subtitle="The person behind the code" />
            <p className="text-muted-foreground text-lg leading-relaxed mb-8">
              I am a passionate developer dedicated to building innovative AI-driven tools and immersive web experiences. With a focus on modern technologies and futuristic designs, I strive to push the boundaries of what's possible on the web.
            </p>
            <p className="text-muted-foreground text-lg leading-relaxed mb-12">
              My journey started with a fascination for technology and has evolved into a career centered around AI integration, web performance, and user-centric designs. I thrive in solving complex problems and building things that matter.
            </p>
            
            <div className="flex flex-wrap gap-4">
              {skills.map((skill, i) => (
                <motion.span
                  key={skill}
                  initial={{ opacity: 0, scale: 0.8 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  transition={{ delay: i * 0.1 }}
                  viewport={{ once: true }}
                  className="px-6 py-2 glass-card rounded-full text-sm font-bold uppercase tracking-wider text-primary border border-primary/20"
                >
                  {skill}
                </motion.span>
              ))}
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="relative"
          >
            <div className="glass-card p-8 rounded-3xl border-primary/20 relative z-10">
              <div className="space-y-8">
                <div className="flex items-center gap-6">
                  <div className="w-16 h-16 glass rounded-2xl flex items-center justify-center text-primary">
                    <Zap className="w-8 h-8" />
                  </div>
                  <div>
                    <h4 className="font-orbitron font-bold text-xl mb-1">Innovation First</h4>
                    <p className="text-muted-foreground">Always looking for the latest tech stack.</p>
                  </div>
                </div>
                <div className="flex items-center gap-6">
                  <div className="w-16 h-16 glass rounded-2xl flex items-center justify-center text-secondary">
                    <Code className="w-8 h-8" />
                  </div>
                  <div>
                    <h4 className="font-orbitron font-bold text-xl mb-1">Clean Architecture</h4>
                    <p className="text-muted-foreground">Focus on maintainable and efficient code.</p>
                  </div>
                </div>
                <div className="flex items-center gap-6">
                  <div className="w-16 h-16 glass rounded-2xl flex items-center justify-center text-accent">
                    <Briefcase className="w-8 h-8" />
                  </div>
                  <div>
                    <h4 className="font-orbitron font-bold text-xl mb-1">AI Enthusiast</h4>
                    <p className="text-muted-foreground">Integrating AI to automate and enhance.</p>
                  </div>
                </div>
              </div>
            </div>
            <div className="absolute -inset-4 bg-primary/10 blur-3xl -z-10 rounded-full" />
          </motion.div>
        </div>
      </div>
    </section>
  );
};

const Skills = () => {
  const categories = [
    {
      title: "Languages",
      skills: [
        { name: "JavaScript", level: 90, color: "bg-yellow-400 shadow-[0_0_10px_#facc15]" },
        { name: "Java", level: 85, color: "bg-red-500 shadow-[0_0_10px_#ef4444]" },
        { name: "HTML/CSS", level: 95, color: "bg-blue-400 shadow-[0_0_10px_#60a5fa]" },
      ],
    },
    {
      title: "Frameworks & Libraries",
      skills: [
        { name: "React", level: 92, color: "bg-cyan-400 shadow-[0_0_10px_#22d3ee]" },
        { name: "Bootstrap", level: 80, color: "bg-purple-500 shadow-[0_0_10px_#a855f7]" },
        { name: "Tailwind CSS", level: 95, color: "bg-blue-500 shadow-[0_0_10px_#3b82f6]" },
      ],
    },
    {
      title: "Tools & Concepts",
      skills: [
        { name: "Git / GitHub", level: 88, color: "bg-gray-400 shadow-[0_0_10px_#9ca3af]" },
        { name: "Supabase", level: 75, color: "bg-emerald-500 shadow-[0_0_10px_#10b981]" },
        { name: "REST APIs", level: 90, color: "bg-indigo-500 shadow-[0_0_10px_#6366f1]" },
      ],
    },
  ];

  return (
    <section id="skills" className="py-24 px-4">
      <div className="container">
        <SectionHeader title="Skills & expertise" subtitle="Technical arsenal" align="center" />
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {categories.map((cat, i) => (
            <motion.div
              key={cat.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: i * 0.1 }}
              viewport={{ once: true }}
              className="glass-card p-8 rounded-2xl hover:neon-glow-cyan transition-all duration-300"
            >
              <h4 className="font-orbitron font-bold text-xl mb-8 uppercase tracking-widest text-primary">{cat.title}</h4>
              <div className="space-y-8">
                {cat.skills.map((skill) => (
                  <div key={skill.name}>
                    <div className="flex justify-between items-center mb-2">
                      <span className="font-bold text-sm tracking-widest">{skill.name}</span>
                      <span className="text-xs text-muted-foreground">{skill.level}%</span>
                    </div>
                    <div className="h-2 bg-white/5 rounded-full overflow-hidden">
                      <motion.div
                        initial={{ width: 0 }}
                        whileInView={{ width: `${skill.level}%` }}
                        transition={{ duration: 1.5, ease: "easeOut" }}
                        viewport={{ once: true }}
                        className={`h-full ${skill.color}`}
                      />
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

const Projects = () => {
  const projects = [
    {
      title: "ZENIX – Desktop AI Assistant",
      desc: "Voice-enabled assistant that performs multi-step computer tasks such as launching apps and browsing websites.",
      tags: ["Python", "OpenAI", "React", "Electron"],
      link: "#",
      github: "#",
      color: "from-cyan-500/20 to-blue-500/20",
      neon: "neon-glow-cyan"
    },
    {
      title: "MobiVerse – Smart Mobility",
      desc: "Platform integrating AI-based mobility insights, digital twin systems, and intelligent vehicle analytics.",
      tags: ["Three.js", "React", "Supabase", "AI"],
      link: "#",
      github: "#",
      color: "from-purple-500/20 to-pink-500/20",
      neon: "neon-glow-purple"
    },
    {
      title: "GenPDFNode – PDF Tool Suite",
      desc: "A modern web application providing powerful PDF utilities with innovative features beyond traditional tools.",
      tags: ["Node.js", "React", "PDFLib", "Tailwind"],
      link: "#",
      github: "#",
      color: "from-blue-500/20 to-indigo-500/20",
      neon: "neon-glow-blue"
    },
  ];

  return (
    <section id="projects" className="py-24 px-4 bg-black/40">
      <div className="container">
        <SectionHeader title="Project showcase" subtitle="Innovative creations" />
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {projects.map((project, i) => (
            <motion.div
              key={project.title}
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5, delay: i * 0.1 }}
              viewport={{ once: true }}
              whileHover={{ y: -10 }}
              className={`glass-card rounded-3xl overflow-hidden flex flex-col h-full group hover:${project.neon} transition-all duration-500 border-white/5`}
            >
              <div className={`h-48 bg-gradient-to-br ${project.color} flex items-center justify-center relative overflow-hidden`}>
                 <Code className="w-16 h-16 text-white/20" />
                 <div className="absolute inset-0 bg-black/40 group-hover:bg-transparent transition-colors duration-500" />
              </div>
              <div className="p-8 flex flex-col flex-grow">
                <h4 className="font-orbitron font-bold text-xl mb-4 leading-tight group-hover:text-primary transition-colors">
                  {project.title}
                </h4>
                <p className="text-muted-foreground mb-6 line-clamp-3">
                  {project.desc}
                </p>
                <div className="flex flex-wrap gap-2 mb-8 mt-auto">
                  {project.tags.map(tag => (
                    <span key={tag} className="text-[10px] uppercase font-bold tracking-widest px-3 py-1 bg-white/5 rounded-full border border-white/10">
                      {tag}
                    </span>
                  ))}
                </div>
                <div className="flex gap-4">
                  <a href={project.link} className="flex-1 py-3 bg-primary text-primary-foreground text-center rounded-xl font-bold uppercase tracking-widest text-xs hover:neon-glow-cyan transition-all">
                    Live Demo
                  </a>
                  <a href={project.github} className="w-12 h-12 glass flex items-center justify-center rounded-xl hover:text-primary transition-colors">
                    <Github className="w-5 h-5" />
                  </a>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

const Experience = () => {
  const experiences = [
    {
      role: "Frontend Developer Intern",
      company: "TechNova Solutions",
      period: "2023 - Present",
      desc: "Developed responsive UI components using React and Tailwind CSS. Integrated AI APIs for real-time data processing.",
    },
    {
      role: "Web Development Intern",
      company: "Digital Edge",
      period: "2022 - 2023",
      desc: "Assisted in building E-commerce platforms. Optimized web performance and improved SEO rankings by 40%.",
    },
  ];

  return (
    <section id="experience" className="py-24 px-4">
      <div className="container">
        <SectionHeader title="Career Timeline" subtitle="My professional journey" align="center" />
        <div className="max-w-4xl mx-auto">
          {experiences.map((exp, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, delay: i * 0.2 }}
              viewport={{ once: true }}
              className="relative pl-12 pb-16 border-l-2 border-primary/20 last:pb-0"
            >
              <div className="absolute left-[-9px] top-0 w-4 h-4 rounded-full bg-primary neon-glow-cyan" />
              <div className="glass-card p-8 rounded-2xl relative overflow-hidden group hover:neon-glow-cyan transition-all duration-300">
                <span className="text-primary font-orbitron font-bold text-sm tracking-widest mb-2 block">{exp.period}</span>
                <h4 className="text-2xl font-bold mb-1">{exp.role}</h4>
                <p className="text-muted-foreground font-bold mb-4 uppercase tracking-widest text-sm">{exp.company}</p>
                <p className="text-muted-foreground leading-relaxed">{exp.desc}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

const Certifications = () => {
  const certs = [
    { name: "Java Basic Certificate", issuer: "HackerRank", date: "2023" },
    { name: "React Development", issuer: "Meta", date: "2022" },
  ];

  return (
    <section className="py-24 px-4 bg-black/40">
      <div className="container">
        <SectionHeader title="Certifications" subtitle="Verified expertise" />
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl">
          {certs.map((cert, i) => (
            <motion.div
              key={i}
              whileHover={{ scale: 1.05 }}
              className="glass-card p-8 rounded-2xl flex items-center gap-6 border-white/5 hover:neon-glow-purple transition-all duration-300"
            >
              <div className="w-16 h-16 glass rounded-2xl flex items-center justify-center text-secondary shrink-0">
                <Award className="w-8 h-8" />
              </div>
              <div>
                <h4 className="font-orbitron font-bold text-lg mb-1">{cert.name}</h4>
                <p className="text-muted-foreground text-sm uppercase tracking-widest">{cert.issuer} • {cert.date}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

const Contact = () => {
  return (
    <section id="contact" className="py-24 px-4">
      <div className="container">
        <SectionHeader title="Get in touch" subtitle="Let's build something" align="center" />
        <div className="max-w-4xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-16">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <h4 className="text-3xl font-bold font-orbitron mb-6 neon-text">HIRE ME</h4>
            <p className="text-muted-foreground text-lg mb-8 leading-relaxed">
              I'm always open to new opportunities and collaborations. Whether you have a question or just want to say hi, I'll try my best to get back to you!
            </p>
            <div className="space-y-6">
              <a href="mailto:hello@zenix.com" className="flex items-center gap-4 text-white hover:text-primary transition-colors group">
                <div className="w-12 h-12 glass rounded-full flex items-center justify-center group-hover:neon-glow-cyan">
                  <Mail className="w-5 h-5" />
                </div>
                <span className="font-bold tracking-widest uppercase text-sm">hello@zenix.com</span>
              </a>
              <div className="flex gap-4 pt-4">
                <a href="#" className="w-14 h-14 glass rounded-2xl flex items-center justify-center hover:neon-glow-purple transition-all"><Github className="w-6 h-6" /></a>
                <a href="#" className="w-14 h-14 glass rounded-2xl flex items-center justify-center hover:neon-glow-blue transition-all"><Linkedin className="w-6 h-6" /></a>
              </div>
            </div>
          </motion.div>

          <motion.form
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="glass-card p-8 rounded-3xl space-y-6 border-white/5"
          >
            <div>
              <label className="block text-xs font-bold uppercase tracking-widest mb-2 text-primary">Name</label>
              <input type="text" className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 focus:border-primary outline-none transition-colors" placeholder="Your Name" />
            </div>
            <div>
              <label className="block text-xs font-bold uppercase tracking-widest mb-2 text-primary">Email</label>
              <input type="email" className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 focus:border-primary outline-none transition-colors" placeholder="your@email.com" />
            </div>
            <div>
              <label className="block text-xs font-bold uppercase tracking-widest mb-2 text-primary">Message</label>
              <textarea rows={4} className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 focus:border-primary outline-none transition-colors" placeholder="What's on your mind?" />
            </div>
            <button className="w-full py-4 bg-primary text-primary-foreground font-black uppercase tracking-[0.2em] rounded-xl hover:neon-glow-cyan transition-all transform hover:scale-[1.02]">
              Send Message
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
      className={`mb-16 ${align === "center" ? "text-center" : "text-left"}`}
    >
      <span className="text-primary font-orbitron font-bold text-sm tracking-[0.3em] uppercase mb-4 block">
        {subtitle}
      </span>
      <h2 className="text-4xl md:text-5xl font-black font-orbitron uppercase tracking-tighter">
        {title}
        <span className="text-primary">.</span>
      </h2>
      <div className={`h-1 w-24 bg-primary mt-4 ${align === "center" ? "mx-auto" : ""}`} />
    </motion.div>
  );
};

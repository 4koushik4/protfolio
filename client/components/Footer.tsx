import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { Github, Linkedin, Mail, Twitter, Code, ExternalLink, ArrowRight } from "lucide-react";
import { cn } from "@/lib/utils";

export const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="py-24 relative overflow-hidden border-t border-white/[0.05] bg-[#05050a]">
      {/* Background patterns */}
      <div className="absolute inset-0 tech-grid opacity-[0.03] -z-10" />
      
      {/* Animated top gradient line */}
      <motion.div
        animate={{ backgroundPosition: ["0% 50%", "200% 50%"] }}
        transition={{ duration: 10, repeat: Infinity, ease: "linear" }}
        className="absolute top-0 left-0 right-0 h-[1px]"
        style={{
          background: "linear-gradient(90deg, transparent, #00ffff, #a855f7, #ff00cc, transparent)",
          backgroundSize: "200% 100%",
        }}
      />

      <div className="container px-6 max-w-6xl">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-16 mb-20 items-start">
          <div className="lg:col-span-2">
            <Link to="/" className="group flex items-center gap-4 mb-8">
              <div className="relative h-10 w-10 overflow-hidden rounded-lg border border-white/10 glass p-2 transition-all duration-500 group-hover:neon-glow-cyan">
                 <img src="https://i.ibb.co/21mHj556/logo.png" alt="Logo" className="h-full w-full object-contain" />
              </div>
              <span className="font-orbitron text-xl font-black tracking-tighter text-gradient-futuristic uppercase">
                KOUSHIK.JS
              </span>
            </Link>
            <p className="text-muted-foreground text-lg max-w-md leading-relaxed mb-10 font-medium">
              Designing and building the next generation of digital experiences with a focus on <span className="text-white">clean code</span> and <span className="text-white">futuristic UI</span>.
            </p>
            <div className="flex gap-4">
              <SocialBtn href="https://github.com/4koushik4" icon={<Github size={20} />} color="cyan" />
              <SocialBtn href="https://linkedin.com/in/4koushik4" icon={<Linkedin size={20} />} color="purple" />
              <SocialBtn href="mailto:juluribhavanikoushik@gmail.com" icon={<Mail size={20} />} color="pink" />
            </div>
          </div>
          
          <div>
            <h4 className="font-orbitron text-xs font-black uppercase tracking-[0.4em] mb-8 text-[#00ffff]/60 flex items-center gap-3">
               Navigation
            </h4>
            <ul className="space-y-5">
              <li><FooterLink href="#hero" label="Home" /></li>
              <li><FooterLink href="#about" label="About" /></li>
              <li><FooterLink href="#projects" label="Projects" /></li>
              <li><FooterLink href="#contact" label="Contact" /></li>
            </ul>
          </div>

          <div>
            <h4 className="font-orbitron text-xs font-black uppercase tracking-[0.4em] mb-8 text-[#a855f7]/60">
              Stack_Kernel
            </h4>
            <div className="flex flex-wrap gap-2">
              {["React", "TypeScript", "Node.js", "Tailwind", "Framer"].map((tech) => (
                <span key={tech} className="px-3 py-1.5 glass rounded-lg text-[9px] font-black uppercase tracking-widest text-muted-foreground border border-white/5">
                  {tech}
                </span>
              ))}
            </div>
          </div>
        </div>

        <div className="pt-10 border-t border-white/[0.05] flex flex-col md:flex-row justify-between items-center gap-8">
          <p className="text-[10px] font-black uppercase tracking-[0.3em] text-muted-foreground text-center md:text-left">
            © {currentYear} <span className="text-white">KOUSHIK JULURI</span> • ESTABLISHED IN THE MATRIX
          </p>
          <div className="flex items-center gap-6">
            <span className="text-[10px] font-black uppercase tracking-widest text-muted-foreground flex items-center gap-3">
               Status: <span className="text-[#00ffff] flex items-center gap-2"><div className="h-1.5 w-1.5 rounded-full bg-[#00ffff] animate-ping shadow-[0_0_6px_#00ffff]" /> Operational</span>
            </span>
          </div>
        </div>
      </div>
    </footer>
  );
};

const FooterLink = ({ href, label }: { href: string; label: string }) => (
  <a 
    href={href} 
    onClick={(e) => {
      e.preventDefault();
      document.getElementById(href.replace('#', ''))?.scrollIntoView({ behavior: 'smooth' });
    }}
    className="text-muted-foreground hover:text-white transition-all duration-300 flex items-center gap-3 group text-sm font-bold uppercase tracking-widest"
  >
    <ArrowRight size={14} className="opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all text-[#00ffff]" />
    {label}
  </a>
);

const SocialBtn = ({ href, icon, color }: any) => (
  <motion.a 
    href={href} 
    target="_blank"
    rel="noopener"
    whileHover={{ y: -5, scale: 1.1 }}
    whileTap={{ scale: 0.9 }}
    className={cn(
      "h-12 w-12 glass rounded-xl flex items-center justify-center transition-all duration-500 border border-white/5 text-muted-foreground hover:text-white",
      color === "cyan" ? "hover:neon-glow-cyan hover:border-cyan-500/30" : 
      color === "purple" ? "hover:neon-glow-purple hover:border-purple-500/30" : 
      "hover:border-pink-500/30 shadow-[0_0_15px_rgba(236,72,153,0.1)] hover:shadow-[0_0_20px_rgba(236,72,153,0.2)]"
    )}
  >
    {icon}
  </motion.a>
);

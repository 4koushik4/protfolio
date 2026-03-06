import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { Github, Linkedin, Mail, Twitter, Cpu, Code, Zap } from "lucide-react";

export const Footer = () => {
  return (
    <footer className="py-24 relative overflow-hidden border-t border-white/5 bg-black/80 backdrop-blur-3xl mt-24">
      <div className="absolute inset-0 bg-cyber-grid opacity-5 -z-10" />
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-6xl h-px bg-gradient-to-r from-transparent via-primary/50 to-transparent shadow-[0_0_10px_rgba(0,255,255,0.5)]" />
      
      <div className="container px-6">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-20 mb-20 items-start">
          <div className="col-span-1 md:col-span-2">
            <Link to="/" className="text-3xl font-black font-orbitron neon-text-gradient mb-8 flex items-center gap-4 group">
              <div className="w-12 h-12 glass rounded-2xl flex items-center justify-center border border-primary/20 group-hover:neon-border transition-all">
                <Cpu className="w-6 h-6 text-primary animate-pulse" />
              </div>
              KOUSHIK.DEV
            </Link>
            <p className="text-muted-foreground text-xl max-w-md leading-relaxed font-medium">
              Building innovative digital experiences through modern technologies and futuristic designs. Let's engineer the future together.
            </p>
            <div className="mt-12 flex flex-wrap gap-4">
              <TechBadge name="React" />
              <TechBadge name="Tailwind CSS" />
              <TechBadge name="Framer Motion" />
              <TechBadge name="Supabase" />
            </div>
          </div>
          
          <div>
            <h4 className="font-orbitron text-xs font-black uppercase tracking-[0.4em] mb-10 text-primary flex items-center gap-3">
              <Code className="w-4 h-4" /> Navigation
            </h4>
            <ul className="space-y-6 text-muted-foreground font-bold tracking-widest uppercase text-xs">
              <li><a href="#hero" className="hover:text-primary transition-all flex items-center gap-2 group"><Zap className="w-3 h-3 group-hover:translate-x-1 transition-transform" /> Home</a></li>
              <li><a href="#about" className="hover:text-primary transition-all flex items-center gap-2 group"><Zap className="w-3 h-3 group-hover:translate-x-1 transition-transform" /> About</a></li>
              <li><a href="#projects" className="hover:text-primary transition-all flex items-center gap-2 group"><Zap className="w-3 h-3 group-hover:translate-x-1 transition-transform" /> Projects</a></li>
              <li><a href="#contact" className="hover:text-primary transition-all flex items-center gap-2 group"><Zap className="w-3 h-3 group-hover:translate-x-1 transition-transform" /> Contact</a></li>
            </ul>
          </div>

          <div>
            <h4 className="font-orbitron text-xs font-black uppercase tracking-[0.4em] mb-10 text-primary flex items-center gap-3">
               Connect Signal
            </h4>
            <div className="grid grid-cols-2 gap-4">
              <SocialLink href="https://github.com/4koushik4" icon={<Github />} label="GitHub" color="cyan" />
              <SocialLink href="https://linkedin.com/in/4koushik4" icon={<Linkedin />} label="LinkedIn" color="purple" />
              <SocialLink href="mailto:juluribhavanikoushik@gmail.com" icon={<Mail />} label="Email" color="magenta" />
              <SocialLink href="#" icon={<Twitter />} label="X-Feed" color="blue" />
            </div>
          </div>
        </div>

        <div className="pt-12 border-t border-white/5 flex flex-col md:flex-row justify-between items-center gap-8">
          <p className="text-[10px] font-black uppercase tracking-[0.5em] text-muted-foreground text-center md:text-left">
            © {new Date().getFullYear()} <span className="neon-text">KOUSHIK.DEV</span> | 
            <span className="opacity-50 ml-2">DESIGNED & DEVELOPED FOR THE FUTURE.</span>
          </p>
          <div className="flex items-center gap-6">
            <div className="h-1 w-12 bg-white/10 rounded-full" />
            <span className="text-[10px] font-black uppercase tracking-[0.3em] text-primary/40">SYSTEM STATUS: ONLINE</span>
            <div className="w-2 h-2 rounded-full bg-primary animate-pulse shadow-[0_0_10px_#00ffff]" />
          </div>
        </div>
      </div>
    </footer>
  );
};

const TechBadge = ({ name }: { name: string }) => (
  <span className="px-4 py-2 glass rounded-xl text-[10px] font-black uppercase tracking-widest text-muted-foreground border border-white/5 hover:border-primary/30 hover:text-primary transition-all">
    {name}
  </span>
);

const SocialLink = ({ href, icon, label, color }: { href: string; icon: React.ReactNode; label: string; color: string }) => (
  <a 
    href={href} 
    className={`glass p-4 rounded-2xl flex flex-col items-center gap-2 hover:neon-glow-${color} transition-all duration-500 border border-white/5 group`}
  >
    <div className="text-muted-foreground group-hover:text-white transition-colors">
      {icon}
    </div>
    <span className="text-[8px] font-black uppercase tracking-widest opacity-0 group-hover:opacity-100 transition-opacity">
      {label}
    </span>
  </a>
);

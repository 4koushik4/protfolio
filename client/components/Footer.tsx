import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { Github, Linkedin, Mail, Twitter, Cpu, Code, Zap } from "lucide-react";

export const Footer = () => {
  return (
    <footer className="py-32 relative overflow-hidden border-t border-white/5 bg-black/80 backdrop-blur-3xl mt-32">
      <div className="absolute inset-0 bg-cyber-grid opacity-5 -z-10" />
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-7xl h-px bg-gradient-to-r from-transparent via-primary/50 to-transparent shadow-[0_0_30px_rgba(0,255,255,0.5)]" />
      
      <div className="container px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-24 mb-24 items-start">
          <div className="col-span-1 md:col-span-2">
            <Link to="/" className="text-4xl font-black font-orbitron neon-text-gradient mb-10 flex items-center gap-6 group">
              <motion.div 
                whileHover={{ rotate: 180 }}
                transition={{ duration: 0.8 }}
                className="w-16 h-16 glass rounded-[1.5rem] flex items-center justify-center border border-primary/20 group-hover:neon-border transition-all duration-500 shadow-2xl"
              >
                <Cpu className="w-8 h-8 text-primary animate-pulse" />
              </motion.div>
              KOUSHIK.DEV
            </Link>
            <p className="text-muted-foreground text-2xl max-w-xl leading-relaxed font-medium mb-12">
              Building innovative digital experiences through modern technologies and futuristic designs. Let's engineer the future together.
            </p>
            <div className="flex flex-wrap gap-6">
              <TechBadge name="React_Engine" />
              <TechBadge name="Tailwind_Core" />
              <TechBadge name="Framer_Motion" />
              <TechBadge name="Supabase_DB" />
            </div>
          </div>
          
          <div>
            <h4 className="font-orbitron text-xs font-black uppercase tracking-[0.6em] mb-12 text-primary flex items-center gap-4">
              <Code className="w-5 h-5 opacity-50" /> System_Map
            </h4>
            <ul className="space-y-8 text-muted-foreground font-black tracking-[0.3em] uppercase text-[10px]">
              <li><FooterLink href="#hero" label="Core_Home" /></li>
              <li><FooterLink href="#about" label="Bio_Sector" /></li>
              <li><FooterLink href="#projects" label="Repo_Grid" /></li>
              <li><FooterLink href="#contact" label="Signal_Link" /></li>
            </ul>
          </div>

          <div>
            <h4 className="font-orbitron text-xs font-black uppercase tracking-[0.6em] mb-12 text-primary flex items-center gap-4">
               Establish_Link
            </h4>
            <div className="grid grid-cols-2 gap-6">
              <SocialIcon href="https://github.com/4koushik4" icon={<Github />} label="GitHub" color="cyan" />
              <SocialIcon href="https://linkedin.com/in/4koushik4" icon={<Linkedin />} label="LinkedIn" color="purple" />
              <SocialIcon href="mailto:juluribhavanikoushik@gmail.com" icon={<Mail />} label="Email" color="magenta" />
              <SocialIcon href="#" icon={<Twitter />} label="X-Feed" color="blue" />
            </div>
          </div>
        </div>

        <div className="pt-16 border-t border-white/5 flex flex-col md:flex-row justify-between items-center gap-12">
          <motion.p 
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            className="text-[10px] font-black uppercase tracking-[0.6em] text-muted-foreground text-center md:text-left leading-loose"
          >
            © {new Date().getFullYear()} <span className="neon-text font-bold">KOUSHIK.DEV</span> | 
            <span className="opacity-30 ml-4">DESIGNED & DEVELOPED FOR THE FUTURE_STATE.</span>
          </motion.p>
          <div className="flex items-center gap-10">
            <div className="h-1 w-20 bg-white/5 rounded-full relative overflow-hidden">
               <motion.div 
                 animate={{ x: [-80, 80] }}
                 transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
                 className="absolute inset-0 w-1/2 bg-primary/20 blur-sm" 
               />
            </div>
            <span className="text-[10px] font-black uppercase tracking-[0.4em] text-primary/30">SYSTEM_STATUS: ACTIVE</span>
            <div className="w-3 h-3 rounded-full bg-primary animate-pulse shadow-[0_0_20px_#0ff]" />
          </div>
        </div>
      </div>
    </footer>
  );
};

const FooterLink = ({ href, label }: { href: string; label: string }) => (
  <a href={href} className="hover:text-primary transition-all flex items-center gap-4 group">
    <div className="w-1.5 h-1.5 rounded-full bg-white/10 group-hover:bg-primary group-hover:scale-150 transition-all shadow-[0_0_10px_#0ff]" />
    {label}
  </a>
);

const TechBadge = ({ name }: { name: string }) => (
  <motion.span 
    whileHover={{ scale: 1.1, border: "1px solid rgba(0,255,255,0.3)" }}
    className="px-6 py-3 glass rounded-2xl text-[10px] font-black uppercase tracking-widest text-muted-foreground border border-white/5 transition-all shadow-xl"
  >
    {name}
  </motion.span>
);

const SocialIcon = ({ href, icon, label, color }: any) => (
  <motion.a 
    href={href} 
    target="_blank"
    rel="noopener"
    whileHover={{ y: -8, scale: 1.1 }}
    className={cn(
      "glass p-6 rounded-3xl flex flex-col items-center gap-4 transition-all duration-500 border border-white/5 group shadow-2xl",
      color === "cyan" ? "hover:neon-glow-cyan" : color === "purple" ? "hover:neon-glow-purple" : color === "magenta" ? "hover:neon-glow-magenta" : "hover:neon-glow-blue"
    )}
  >
    <div className="text-muted-foreground group-hover:text-white transition-colors scale-125">
      {icon}
    </div>
    <span className="text-[8px] font-black uppercase tracking-widest opacity-30 group-hover:opacity-100 transition-opacity">
      {label}
    </span>
  </motion.a>
);

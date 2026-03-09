import { motion } from "framer-motion";
import { MapPin, Terminal, Cpu, Zap, Globe } from "lucide-react";
import { Card } from "./ui/PortfolioCard";

export const About = ({ data }: { data: any }) => {
  return (
    <div className="container max-w-6xl">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 items-center">
        <motion.div
          initial={{ opacity: 0, x: -50 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
        >
          <div className="mb-8">
            <span className="text-[#00ffff] font-black uppercase tracking-[0.4em] text-xs mb-4 block">// ABOUT_SYSTEM</span>
            <h2 className="text-5xl font-black uppercase tracking-tighter text-white mb-8">Designing the <br/><span className="text-gradient-futuristic">Future</span></h2>
          </div>
          <div className="space-y-6 text-muted-foreground text-lg leading-relaxed mb-12">
            <p>
              I am a Computer Science Engineering student at the <span className="text-white font-bold">Institute of Aeronautical Engineering</span>. I specialize in building modern web applications and solving real-world problems.
            </p>
            <p>
              My focus is on <span className="text-[#a855f7] font-bold">intelligent automation</span> and <span className="text-[#ff00cc] font-bold">premium UI architecture</span>. I strive to blend clean design with robust code.
            </p>
          </div>
          
          <div className="grid grid-cols-2 gap-8">
            <div className="glass p-6 rounded-2xl border-white/5 group hover:border-cyan-500/30 transition-all duration-500">
              <div className="h-12 w-12 rounded-xl bg-cyan-500/10 flex items-center justify-center text-cyan-400 mb-4 group-hover:scale-110 transition-transform">
                <MapPin size={24} />
              </div>
              <p className="text-[10px] font-black text-muted-foreground uppercase tracking-widest mb-1">Base_Location</p>
              <p className="text-white font-bold">{data.location}</p>
            </div>
            <div className="glass p-6 rounded-2xl border-white/5 group hover:border-purple-500/30 transition-all duration-500">
              <div className="h-12 w-12 rounded-xl bg-purple-500/10 flex items-center justify-center text-purple-400 mb-4 group-hover:scale-110 transition-transform">
                <Terminal size={24} />
              </div>
              <p className="text-[10px] font-black text-muted-foreground uppercase tracking-widest mb-1">Tech_Kernel</p>
              <p className="text-white font-bold">Node.js / React</p>
            </div>
          </div>
        </motion.div>

        <Card hoverGlow="purple" className="relative p-12 overflow-hidden">
          <div className="absolute -top-10 -right-10 w-40 h-40 bg-purple-500/10 blur-[80px]" />
          <div className="absolute -bottom-10 -left-10 w-40 h-40 bg-cyan-500/10 blur-[80px]" />
          <div className="space-y-10 relative z-10">
            <AboutItem icon={<Cpu />} title="Full-Stack Dev" desc="Bridging sleak frontends with robust backend kernels." color="#00ffff" />
            <AboutItem icon={<Zap />} title="AI Integration" desc="Leveraging LLMs to build high-intelligence tools." color="#a855f7" />
            <AboutItem icon={<Globe />} title="Cloud Native" desc="Building scalable systems on modern infrastructure." color="#ff00cc" />
          </div>
        </Card>
      </div>
    </div>
  );
};

const AboutItem = ({ icon, title, desc, color }: any) => (
  <div className="flex gap-8 group">
    <div 
      className="h-16 w-16 min-w-[64px] rounded-2xl flex items-center justify-center border border-white/10 glass transition-all duration-500 group-hover:scale-110"
      style={{ color }}
    >
      {icon}
    </div>
    <div>
      <h4 className="font-bold text-xl text-white mb-2 uppercase tracking-wide group-hover:text-gradient-futuristic transition-all">{title}</h4>
      <p className="text-muted-foreground leading-relaxed">{desc}</p>
    </div>
  </div>
);

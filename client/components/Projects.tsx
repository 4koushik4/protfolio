import { motion } from "framer-motion";
import { Github, Code } from "lucide-react";
import { cn } from "@/lib/utils";
import { Card } from "./ui/PortfolioCard";

export const ProjectsSection = ({ projects }: { projects: any[] }) => {
  return (
    <div className="container max-w-6xl">
      <div className="flex flex-col md:flex-row justify-between items-end gap-8 mb-20">
        <div>
          <span className="text-[#00ffff] font-black uppercase tracking-[0.4em] text-xs mb-4 block">// RECENT_DEPLOYMENTS</span>
          <h2 className="text-5xl font-black uppercase tracking-tighter text-white">Project <span className="text-gradient-futuristic">Matrix</span></h2>
        </div>
        <p className="text-muted-foreground max-w-md text-right font-medium">A selection of high-impact platforms and tools developed using modern stack.</p>
      </div>
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
        {projects.map((project, i) => (
          <Card key={i} hoverGlow={i % 2 === 0 ? "pink" : "orange"} className="p-0 overflow-hidden flex flex-col group">
            <div className={cn("h-64 relative overflow-hidden flex items-center justify-center p-12 bg-gradient-to-br", project.color)}>
               <div className="absolute inset-0 bg-black/40 group-hover:bg-black/10 transition-all duration-1000" />
               <motion.div 
                 whileHover={{ scale: 1.2, rotate: 10 }}
                 className="relative z-10"
               >
                 <Code size={100} className="text-white/20 group-hover:text-white transition-all duration-700 drop-shadow-[0_0_20px_rgba(255,255,255,0.4)]" />
               </motion.div>
               <div className="absolute top-8 right-8 flex gap-4 opacity-0 group-hover:opacity-100 transition-all translate-y-4 group-hover:translate-y-0 duration-500">
                  <a href={project.github} target="_blank" className="h-12 w-12 glass rounded-2xl flex items-center justify-center hover:scale-110 transition-all text-white border border-white/20">
                    <Github size={20} />
                  </a>
               </div>
            </div>
            <div className="p-10 flex flex-col flex-grow">
               <div className="flex flex-wrap gap-2 mb-6">
                 {project.tags.map((tag: string, tidx: number) => (
                   <span key={tidx} className="text-[9px] font-black uppercase tracking-[0.2em] px-3 py-1.5 rounded-full border border-white/10 glass text-white/60">
                     {tag}
                   </span>
                 ))}
               </div>
               <h4 className="text-3xl font-black uppercase tracking-tighter text-white mb-4 group-hover:text-gradient-futuristic transition-all">
                 {project.title}
               </h4>
               <p className="text-muted-foreground leading-relaxed mb-8 flex-grow">
                 {project.desc}
               </p>
               <div className="flex flex-wrap gap-3">
                 {project.features.slice(0, 3).map((f: string, fidx: number) => (
                   <span key={fidx} className="text-[10px] font-bold uppercase tracking-widest text-[#00ffff]/80 flex items-center gap-2">
                     <div className="h-1.5 w-1.5 rounded-full bg-[#00ffff] shadow-[0_0_6px_#00ffff]" /> {f}
                   </span>
                 ))}
               </div>
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
};

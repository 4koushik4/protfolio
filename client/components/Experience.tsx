import { Briefcase, Globe } from "lucide-react";
import { cn } from "@/lib/utils";
import { Card } from "./ui/PortfolioCard";

export const ExperienceSection = ({ internships }: { internships: any[] }) => {
  return (
    <div className="container max-w-5xl">
      <div className="text-center mb-24">
        <span className="text-[#00ffff] font-black uppercase tracking-[0.4em] text-xs mb-4 block">// CAREER_TIMELINE</span>
        <h2 className="text-5xl font-black uppercase tracking-tighter text-white">System <span className="text-gradient-futuristic">Logic</span></h2>
      </div>
      <div className="relative">
        <div className="absolute left-1/2 -translate-x-1/2 top-0 bottom-0 w-[2px] bg-gradient-to-b from-cyan-500 via-purple-500 to-transparent opacity-20 hidden md:block" />
        {internships.map((exp, i) => (
          <div key={i} className={cn(
            "flex flex-col md:flex-row items-center gap-12 mb-20 md:mb-32 relative z-10",
            i % 2 !== 0 ? "md:flex-row-reverse" : ""
          )}>
            <div className="flex-1 w-full">
              <Card hoverGlow={i % 2 === 0 ? "cyan" : "purple"} className="relative p-10 overflow-hidden group">
                 <div className="absolute -top-10 -right-10 p-10 opacity-[0.03] group-hover:opacity-10 transition-all duration-700 group-hover:rotate-12">
                   <Briefcase size={120} />
                 </div>
                 <span className="text-[#a855f7] font-black uppercase tracking-[0.3em] text-[10px] mb-4 block">{exp.period}</span>
                 <h4 className="text-2xl font-black uppercase tracking-tighter text-white mb-2">{exp.role}</h4>
                 <p className="text-[#00ffff] font-bold uppercase tracking-widest text-xs mb-8 flex items-center gap-2">
                   <Globe size={14} /> {exp.company}
                 </p>
                 <ul className="space-y-4">
                    {exp.desc.map((item: string, idx: number) => (
                      <li key={idx} className="flex gap-4 text-muted-foreground text-sm leading-relaxed group/li">
                        <div className="h-1.5 w-1.5 min-w-[6px] rounded-full bg-gradient-to-br from-cyan-400 to-purple-400 mt-2 shadow-[0_0_8px_rgba(0,255,255,0.4)] transition-all group-hover/li:scale-150" />
                        {item}
                      </li>
                    ))}
                 </ul>
              </Card>
            </div>
            
            <div className="hidden md:flex h-12 w-12 rounded-full glass border-2 border-white/20 items-center justify-center z-20 shrink-0 relative">
               <div className="h-4 w-4 rounded-full bg-gradient-to-br from-cyan-400 to-purple-400 shadow-[0_0_15px_#00ffff]" />
               <div className="absolute inset-0 rounded-full border border-[#00ffff]/50 animate-ping opacity-20" />
            </div>
            
            <div className="flex-1 hidden md:block" />
          </div>
        ))}
      </div>
    </div>
  );
};

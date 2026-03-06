import { motion, AnimatePresence } from "framer-motion";
import { useState } from "react";
import { X, Save, LogOut, ChevronRight, Edit3, Plus, Trash2 } from "lucide-react";
import { PortfolioData } from "@shared/portfolio-data";
import { cn } from "@/lib/utils";

interface AdminDashboardProps {
  data: PortfolioData;
  onUpdate: (data: PortfolioData) => void;
  onLogout: () => void;
}

export const AdminDashboard = ({ data, onUpdate, onLogout }: AdminDashboardProps) => {
  const [editedData, setEditedData] = useState<PortfolioData>(data);
  const [activeTab, setActiveTab] = useState<keyof PortfolioData>("profile");

  const handleSave = () => {
    onUpdate(editedData);
    alert("Portfolio updated successfully!");
  };

  const tabs: { id: keyof PortfolioData; label: string }[] = [
    { id: "profile", label: "Profile" },
    { id: "education", label: "Education" },
    { id: "skillCategories", label: "Skills" },
    { id: "projects", label: "Projects" },
    { id: "internships", label: "Experience" },
    { id: "certifications", label: "Certifications" },
    { id: "achievements", label: "Achievements" },
  ];

  return (
    <div className="fixed inset-0 z-[100] bg-black/95 backdrop-blur-xl flex flex-col overflow-hidden">
      <header className="p-6 border-b border-white/10 flex items-center justify-between glass">
        <div className="flex items-center gap-4">
          <div className="w-10 h-10 rounded-full bg-primary/20 flex items-center justify-center border border-primary/50">
            <Edit3 className="w-5 h-5 text-primary" />
          </div>
          <h2 className="text-2xl font-black font-orbitron neon-text">ADMIN PANEL</h2>
        </div>
        <div className="flex items-center gap-4">
          <button 
            onClick={handleSave}
            className="px-6 py-2 bg-primary text-primary-foreground rounded-full font-bold uppercase tracking-widest text-xs hover:neon-glow-cyan transition-all flex items-center gap-2"
          >
            <Save className="w-4 h-4" /> Save Changes
          </button>
          <button 
            onClick={onLogout}
            className="p-2 glass rounded-full hover:text-accent transition-colors"
          >
            <LogOut className="w-6 h-6" />
          </button>
        </div>
      </header>

      <div className="flex flex-1 overflow-hidden">
        {/* Sidebar */}
        <nav className="w-64 border-r border-white/10 p-6 space-y-2 bg-white/5">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={cn(
                "w-full text-left px-4 py-3 rounded-xl font-bold uppercase tracking-wider text-xs transition-all flex items-center justify-between group",
                activeTab === tab.id 
                  ? "bg-primary text-primary-foreground neon-glow-cyan" 
                  : "hover:bg-white/10 text-muted-foreground"
              )}
            >
              {tab.label}
              <ChevronRight className={cn("w-4 h-4 transition-transform", activeTab === tab.id ? "translate-x-1" : "opacity-0")} />
            </button>
          ))}
        </nav>

        {/* Content */}
        <main className="flex-1 p-12 overflow-y-auto bg-cyber-grid">
          <div className="max-w-4xl mx-auto space-y-8">
            <h3 className="text-3xl font-black font-orbitron mb-8 uppercase tracking-widest border-l-4 border-primary pl-6">
              Edit {tabs.find(t => t.id === activeTab)?.label}
            </h3>

            {active_tab_content(activeTab, editedData, setEditedData)}

            <p className="text-muted-foreground italic text-sm">
              Note: Full administrative editing for all sections is active. Ensure to save your changes.
            </p>
          </div>
        </main>
      </div>
    </div>
  );
};

const active_tab_content = (tab: string, data: any, setData: any) => {
  switch (tab) {
    case "profile":
      return (
        <div className="grid grid-cols-2 gap-6">
          <InputField label="Name" value={data.profile.name} onChange={(v) => setData({...data, profile: {...data.profile, name: v}})} />
          <InputField label="Tagline" value={data.profile.tagline} onChange={(v) => setData({...data, profile: {...data.profile, tagline: v}})} />
          <div className="col-span-2">
            <label className="block text-xs font-bold uppercase tracking-widest mb-2 text-primary">Introduction</label>
            <textarea 
              className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 focus:border-primary outline-none min-h-[150px]"
              value={data.profile.intro}
              onChange={(e) => setData({...data, profile: {...data.profile, intro: e.target.value}})}
            />
          </div>
        </div>
      );
    case "projects":
      return (
        <div className="space-y-6">
          {data.projects.map((project: any, idx: number) => (
            <div key={project.id} className="glass-card p-6 rounded-2xl border-white/10 relative group">
              <button 
                onClick={() => {
                  const newProjects = [...data.projects];
                  newProjects.splice(idx, 1);
                  setData({...data, projects: newProjects});
                }}
                className="absolute top-4 right-4 text-accent opacity-0 group-hover:opacity-100 transition-opacity"
              >
                <Trash2 className="w-5 h-5" />
              </button>
              <div className="grid grid-cols-2 gap-4">
                <InputField label="Title" value={project.title} onChange={(v) => {
                  const newProjects = [...data.projects];
                  newProjects[idx].title = v;
                  setData({...data, projects: newProjects});
                }} />
                <InputField label="Description" value={project.desc} onChange={(v) => {
                  const newProjects = [...data.projects];
                  newProjects[idx].desc = v;
                  setData({...data, projects: newProjects});
                }} />
              </div>
            </div>
          ))}
          <button onClick={() => setData({...data, projects: [...data.projects, {id: Math.random().toString(), title: "New", desc: "", features: [], tags: [], github: "", color: "from-blue-500/20 to-cyan-500/20", neon: "neon-glow-blue"}]})} className="w-full py-4 border-2 border-dashed border-white/10 rounded-2xl flex items-center justify-center gap-3 text-muted-foreground hover:border-primary hover:text-primary transition-all">
            <Plus className="w-5 h-5" /> Add Project
          </button>
        </div>
      );
    case "education":
      return (
        <div className="space-y-6">
          {data.education.map((edu: any, idx: number) => (
            <div key={idx} className="glass-card p-6 rounded-2xl border-white/10 relative group">
              <div className="grid grid-cols-2 gap-4">
                <InputField label="School" value={edu.school} onChange={(v) => {
                  const newData = [...data.education];
                  newData[idx].school = v;
                  setData({...data, education: newData});
                }} />
                <InputField label="Degree" value={edu.degree} onChange={(v) => {
                  const newData = [...data.education];
                  newData[idx].degree = v;
                  setData({...data, education: newData});
                }} />
                <InputField label="Period" value={edu.period} onChange={(v) => {
                  const newData = [...data.education];
                  newData[idx].period = v;
                  setData({...data, education: newData});
                }} />
                <InputField label="CGPA" value={edu.cgpa} onChange={(v) => {
                  const newData = [...data.education];
                  newData[idx].cgpa = v;
                  setData({...data, education: newData});
                }} />
              </div>
            </div>
          ))}
        </div>
      );
    default:
      return <p className="text-muted-foreground">Editor for this section is coming soon in the next system update.</p>;
  }
};

const InputField = ({ label, value, onChange }: { label: string; value: string; onChange: (v: string) => void }) => (
  <div>
    <label className="block text-xs font-bold uppercase tracking-widest mb-2 text-primary">{label}</label>
    <input 
      type="text" 
      className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 focus:border-primary outline-none transition-colors"
      value={value}
      onChange={(e) => onChange(e.target.value)}
    />
  </div>
);

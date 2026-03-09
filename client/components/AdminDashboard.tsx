import { motion } from "framer-motion";
import { useState } from "react";
import { X, Save, LogOut, ChevronRight, Edit3, Plus, Trash2 } from "lucide-react";
import { PortfolioData } from "@shared/portfolio-data";
import { cn } from "@/lib/utils";
import { toast } from "sonner";

interface AdminDashboardProps {
  data: PortfolioData;
  onUpdate: (data: PortfolioData) => void;
  onLogout: () => void;
  onClose: () => void;
}

export const AdminDashboard = ({ data, onUpdate, onLogout, onClose }: AdminDashboardProps) => {
  const [editedData, setEditedData] = useState<PortfolioData>(data);
  const [activeTab, setActiveTab] = useState<string>("profile");

  const handleSave = () => {
    onUpdate(editedData);
    toast.success("System Update Successful", {
      description: "Portfolio parameters have been recalibrated dynamically."
    });
  };

  const tabs = [
    { id: "profile", label: "Profile" },
    { id: "education", label: "Education" },
    { id: "skillCategories", label: "Skills" },
    { id: "projects", label: "Projects" },
    { id: "internships", label: "Experience" },
    { id: "certifications", label: "Certifications" },
    { id: "achievements", label: "Achievements" },
    { id: "codingProfiles", label: "Coding Profiles" },
  ];

  return (
    <div className="fixed inset-0 z-[110] bg-[#05050a]/98 backdrop-blur-[24px] flex flex-col overflow-hidden">
      <header className="p-5 border-b border-white/[0.08] flex items-center justify-between glass-premium">
        <div className="flex items-center gap-4">
          <div className="w-10 h-10 rounded-xl bg-[#00ffff]/10 flex items-center justify-center border border-[#00ffff]/30 shadow-[0_0_15px_rgba(0,255,255,0.1)]">
            <Edit3 size={20} className="text-[#00ffff]" />
          </div>
          <h2 className="text-xl font-black font-orbitron text-white uppercase tracking-tighter">System_Console</h2>
        </div>
        <div className="flex items-center gap-4">
          <button
            onClick={handleSave}
            className="btn-primary-gradient px-6 py-2.5 text-xs uppercase tracking-[0.2em] font-black flex items-center gap-3"
          >
            <Save size={16} /> Deploy_Update
          </button>
          <button
            onClick={onClose}
            className="h-10 w-10 glass rounded-xl flex items-center justify-center text-muted-foreground hover:text-[#00ffff] transition-all border-white/10"
          >
            <X size={20} />
          </button>
          <button
            onClick={onLogout}
            className="h-10 w-10 glass rounded-xl flex items-center justify-center text-muted-foreground hover:text-red-400 transition-all border-white/10 hover:border-red-500/30"
          >
            <LogOut size={20} />
          </button>
        </div>
      </header>

      <div className="flex flex-1 overflow-hidden">
        <nav className="w-64 border-r border-white/10 p-6 space-y-2 bg-white/[0.01] overflow-y-auto">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={cn(
                "w-full text-left px-4 py-3.5 rounded-xl font-black uppercase tracking-[0.15em] text-[10px] transition-all flex items-center justify-between group",
                activeTab === tab.id
                  ? "bg-gradient-to-r from-[#00ffff] to-[#0072ff] text-white shadow-[0_4px_15px_rgba(0,198,255,0.3)]"
                  : "hover:bg-white/5 text-muted-foreground/60 hover:text-white"
              )}
            >
              {tab.label}
              <ChevronRight size={14} className={cn("transition-transform", activeTab === tab.id ? "translate-x-1" : "opacity-0")} />
            </button>
          ))}
        </nav>

        <main className="flex-1 p-10 overflow-y-auto relative">
          <div className="absolute top-0 right-0 w-[40%] h-[40%] bg-[radial-gradient(circle,rgba(0,255,255,0.05)_0%,transparent_70%)] blur-[100px] -z-10" />
          <div className="max-w-4xl mx-auto">
            <h3 className="text-3xl font-black font-orbitron mb-10 uppercase tracking-tighter text-white border-l-4 border-[#00ffff] pl-6">
              Update {tabs.find(t => t.id === activeTab)?.label}_Node
            </h3>

            <div className="glass-premium p-10 rounded-3xl border-white/5 relative overflow-hidden">
               <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-[#00ffff] via-[#a855f7] to-[#ff00cc] opacity-30" />
               {activeTab === "profile" && <ProfileEditor data={editedData} setData={setEditedData} />}
               {activeTab === "education" && <EducationEditor data={editedData} setData={setEditedData} />}
               {activeTab === "skillCategories" && <SkillsEditor data={editedData} setData={setEditedData} />}
               {activeTab === "projects" && <ProjectsEditor data={editedData} setData={setEditedData} />}
               {activeTab === "internships" && <ExperienceEditor data={editedData} setData={setEditedData} />}
               {activeTab === "certifications" && <CertificationsEditor data={editedData} setData={setEditedData} />}
               {activeTab === "achievements" && <AchievementsEditor data={editedData} setData={setEditedData} />}
               {activeTab === "codingProfiles" && <CodingProfilesEditor data={editedData} setData={setEditedData} />}
            </div>
          </div>
        </main>
      </div>
    </div>
  );
};

// ── Profile Editor ──
const ProfileEditor = ({ data, setData }: { data: PortfolioData; setData: (d: PortfolioData) => void }) => (
  <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
    <InputField label="Name" value={data.profile.name} onChange={(v) => setData({...data, profile: {...data.profile, name: v}})} />
    <InputField label="Tagline" value={data.profile.tagline} onChange={(v) => setData({...data, profile: {...data.profile, tagline: v}})} />
    <InputField label="Email" value={data.profile.email} onChange={(v) => setData({...data, profile: {...data.profile, email: v}})} />
    <InputField label="Phone" value={data.profile.phone} onChange={(v) => setData({...data, profile: {...data.profile, phone: v}})} />
    <InputField label="Location" value={data.profile.location} onChange={(v) => setData({...data, profile: {...data.profile, location: v}})} />
    <InputField label="GitHub URL" value={data.profile.github} onChange={(v) => setData({...data, profile: {...data.profile, github: v}})} />
    <InputField label="LinkedIn URL" value={data.profile.linkedin} onChange={(v) => setData({...data, profile: {...data.profile, linkedin: v}})} />
    <InputField label="Telegram" value={data.profile.telegram} onChange={(v) => setData({...data, profile: {...data.profile, telegram: v}})} />
    <div className="md:col-span-2">
      <label className="block text-[9px] font-black uppercase tracking-[0.3em] mb-2 text-[#a855f7] ml-1">Kernel_Intro</label>
      <textarea
        className="w-full bg-white/5 border border-white/10 rounded-2xl px-5 py-4 focus:border-[#a855f7]/50 outline-none min-h-[150px] text-sm font-medium transition-all"
        value={data.profile.intro}
        onChange={(e) => setData({...data, profile: {...data.profile, intro: e.target.value}})}
      />
    </div>
  </div>
);

// ── Education Editor ──
const EducationEditor = ({ data, setData }: { data: PortfolioData; setData: (d: PortfolioData) => void }) => {
  const update = (idx: number, field: string, value: string) => {
    const arr = [...data.education];
    (arr[idx] as any)[field] = value;
    setData({...data, education: arr});
  };
  const remove = (idx: number) => setData({...data, education: data.education.filter((_, i) => i !== idx)});
  const add = () => setData({...data, education: [...data.education, { school: "", degree: "", period: "", cgpa: "" }]});

  return (
    <div className="space-y-4">
      {data.education.map((edu, idx) => (
        <ItemCard key={idx} onDelete={() => remove(idx)}>
          <div className="grid grid-cols-2 gap-3">
            <InputField label="School" value={edu.school} onChange={(v) => update(idx, "school", v)} />
            <InputField label="Degree" value={edu.degree} onChange={(v) => update(idx, "degree", v)} />
            <InputField label="Period" value={edu.period} onChange={(v) => update(idx, "period", v)} />
            <InputField label="CGPA" value={edu.cgpa} onChange={(v) => update(idx, "cgpa", v)} />
          </div>
        </ItemCard>
      ))}
      <AddButton onClick={add} label="Add Education" />
    </div>
  );
};

// ── Skills Editor ──
const SkillsEditor = ({ data, setData }: { data: PortfolioData; setData: (d: PortfolioData) => void }) => {
  const updateCategory = (cIdx: number, field: string, value: string) => {
    const cats = [...data.skillCategories];
    (cats[cIdx] as any)[field] = value;
    setData({...data, skillCategories: cats});
  };
  const updateSkill = (cIdx: number, sIdx: number, field: string, value: any) => {
    const cats = [...data.skillCategories];
    (cats[cIdx].skills[sIdx] as any)[field] = value;
    setData({...data, skillCategories: cats});
  };
  const removeSkill = (cIdx: number, sIdx: number) => {
    const cats = [...data.skillCategories];
    cats[cIdx].skills.splice(sIdx, 1);
    setData({...data, skillCategories: cats});
  };
  const addSkill = (cIdx: number) => {
    const cats = [...data.skillCategories];
    cats[cIdx].skills.push({ name: "", level: 50, color: "bg-cyan-400" });
    setData({...data, skillCategories: cats});
  };
  const removeCategory = (cIdx: number) => setData({...data, skillCategories: data.skillCategories.filter((_, i) => i !== cIdx)});
  const addCategory = () => setData({...data, skillCategories: [...data.skillCategories, { title: "New Category", skills: [] }]});

  return (
    <div className="space-y-6">
      {data.skillCategories.map((cat, cIdx) => (
        <ItemCard key={cIdx} onDelete={() => removeCategory(cIdx)}>
          <InputField label="Category Name" value={cat.title} onChange={(v) => updateCategory(cIdx, "title", v)} />
          <div className="mt-4 space-y-3">
            {cat.skills.map((skill, sIdx) => (
              <div key={sIdx} className="flex items-end gap-3 bg-white/[0.02] p-3 rounded-lg">
                <div className="flex-1">
                  <InputField label="Skill" value={skill.name} onChange={(v) => updateSkill(cIdx, sIdx, "name", v)} />
                </div>
                <div className="w-24">
                  <InputField label="Level %" value={String(skill.level)} onChange={(v) => updateSkill(cIdx, sIdx, "level", Number(v) || 0)} />
                </div>
                <button onClick={() => removeSkill(cIdx, sIdx)} className="p-2 text-accent hover:text-red-400 transition-colors mb-0.5">
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
            ))}
            <button onClick={() => addSkill(cIdx)} className="text-xs text-primary hover:text-white transition-colors font-bold uppercase tracking-wider flex items-center gap-1 mt-2">
              <Plus className="w-3 h-3" /> Add Skill
            </button>
          </div>
        </ItemCard>
      ))}
      <AddButton onClick={addCategory} label="Add Category" />
    </div>
  );
};

// ── Projects Editor ──
const ProjectsEditor = ({ data, setData }: { data: PortfolioData; setData: (d: PortfolioData) => void }) => {
  const update = (idx: number, field: string, value: any) => {
    const arr = [...data.projects];
    (arr[idx] as any)[field] = value;
    setData({...data, projects: arr});
  };
  const remove = (idx: number) => setData({...data, projects: data.projects.filter((_, i) => i !== idx)});
  const add = () => setData({...data, projects: [...data.projects, { id: crypto.randomUUID(), title: "", desc: "", features: [], tags: [], github: "", link: "", color: "from-blue-500/20 to-cyan-500/20", neon: "neon-glow-blue" }]});

  return (
    <div className="space-y-4">
      {data.projects.map((project, idx) => (
        <ItemCard key={project.id} onDelete={() => remove(idx)}>
          <div className="grid grid-cols-2 gap-3">
            <InputField label="Title" value={project.title} onChange={(v) => update(idx, "title", v)} />
            <InputField label="GitHub URL" value={project.github} onChange={(v) => update(idx, "github", v)} />
            <InputField label="Live Demo URL" value={project.link || ""} onChange={(v) => update(idx, "link", v)} />
            <div className="col-span-2">
              <InputField label="Description" value={project.desc} onChange={(v) => update(idx, "desc", v)} />
            </div>
            <div className="col-span-2">
              <InputField label="Tags (comma separated)" value={project.tags.join(", ")} onChange={(v) => update(idx, "tags", v.split(",").map(s => s.trim()).filter(Boolean))} />
            </div>
            <div className="col-span-2">
              <InputField label="Features (comma separated)" value={project.features.join(", ")} onChange={(v) => update(idx, "features", v.split(",").map(s => s.trim()).filter(Boolean))} />
            </div>
          </div>
        </ItemCard>
      ))}
      <AddButton onClick={add} label="Add Project" />
    </div>
  );
};

// ── Experience Editor ──
const ExperienceEditor = ({ data, setData }: { data: PortfolioData; setData: (d: PortfolioData) => void }) => {
  const update = (idx: number, field: string, value: any) => {
    const arr = [...data.internships];
    (arr[idx] as any)[field] = value;
    setData({...data, internships: arr});
  };
  const remove = (idx: number) => setData({...data, internships: data.internships.filter((_, i) => i !== idx)});
  const add = () => setData({...data, internships: [...data.internships, { role: "", company: "", period: "", desc: [] }]});

  return (
    <div className="space-y-4">
      {data.internships.map((exp, idx) => (
        <ItemCard key={idx} onDelete={() => remove(idx)}>
          <div className="grid grid-cols-2 gap-3">
            <InputField label="Role" value={exp.role} onChange={(v) => update(idx, "role", v)} />
            <InputField label="Company" value={exp.company} onChange={(v) => update(idx, "company", v)} />
            <InputField label="Period" value={exp.period} onChange={(v) => update(idx, "period", v)} />
            <div className="col-span-2">
              <label className="block text-[9px] font-black uppercase tracking-[0.3em] mb-2 text-[#a855f7] ml-1">Logic_Chain (one per line)</label>
              <textarea
                className="w-full bg-white/5 border border-white/10 rounded-2xl px-5 py-4 focus:border-[#a855f7]/50 outline-none min-h-[100px] text-sm font-medium transition-all"
                value={exp.desc.join("\n")}
                onChange={(e) => update(idx, "desc", e.target.value.split("\n").filter(Boolean))}
              />
            </div>
          </div>
        </ItemCard>
      ))}
      <AddButton onClick={add} label="Add Experience" />
    </div>
  );
};

// ── Certifications Editor ──
const CertificationsEditor = ({ data, setData }: { data: PortfolioData; setData: (d: PortfolioData) => void }) => {
  const update = (idx: number, field: string, value: string) => {
    const arr = [...data.certifications];
    (arr[idx] as any)[field] = value;
    setData({...data, certifications: arr});
  };
  const remove = (idx: number) => setData({...data, certifications: data.certifications.filter((_, i) => i !== idx)});
  const add = () => setData({...data, certifications: [...data.certifications, { name: "", issuer: "" }]});

  return (
    <div className="space-y-4">
      {data.certifications.map((cert, idx) => (
        <ItemCard key={idx} onDelete={() => remove(idx)}>
          <div className="grid grid-cols-2 gap-3">
            <InputField label="Name" value={cert.name} onChange={(v) => update(idx, "name", v)} />
            <InputField label="Issuer" value={cert.issuer} onChange={(v) => update(idx, "issuer", v)} />
          </div>
        </ItemCard>
      ))}
      <AddButton onClick={add} label="Add Certification" />
    </div>
  );
};

// ── Achievements Editor ──
const AchievementsEditor = ({ data, setData }: { data: PortfolioData; setData: (d: PortfolioData) => void }) => {
  const update = (idx: number, field: string, value: string) => {
    const arr = [...data.achievements];
    (arr[idx] as any)[field] = value;
    setData({...data, achievements: arr});
  };
  const remove = (idx: number) => setData({...data, achievements: data.achievements.filter((_, i) => i !== idx)});
  const add = () => setData({...data, achievements: [...data.achievements, { title: "", desc: "" }]});

  return (
    <div className="space-y-4">
      {data.achievements.map((item, idx) => (
        <ItemCard key={idx} onDelete={() => remove(idx)}>
          <div className="grid grid-cols-2 gap-3">
            <InputField label="Title" value={item.title} onChange={(v) => update(idx, "title", v)} />
            <InputField label="Description" value={item.desc} onChange={(v) => update(idx, "desc", v)} />
          </div>
        </ItemCard>
      ))}
      <AddButton onClick={add} label="Add Achievement" />
    </div>
  );
};

// ── Coding Profiles Editor ──
const CodingProfilesEditor = ({ data, setData }: { data: PortfolioData; setData: (d: PortfolioData) => void }) => {
  const update = (idx: number, field: string, value: string) => {
    const arr = [...data.codingProfiles];
    (arr[idx] as any)[field] = value;
    setData({...data, codingProfiles: arr});
  };
  const remove = (idx: number) => setData({...data, codingProfiles: data.codingProfiles.filter((_, i) => i !== idx)});
  const add = () => setData({...data, codingProfiles: [...data.codingProfiles, { name: "", username: "", solved: "" }]});

  return (
    <div className="space-y-4">
      {data.codingProfiles.map((profile, idx) => (
        <ItemCard key={idx} onDelete={() => remove(idx)}>
          <div className="grid grid-cols-3 gap-3">
            <InputField label="Platform" value={profile.name} onChange={(v) => update(idx, "name", v)} />
            <InputField label="Username" value={profile.username} onChange={(v) => update(idx, "username", v)} />
            <InputField label="Solved" value={profile.solved} onChange={(v) => update(idx, "solved", v)} />
          </div>
        </ItemCard>
      ))}
      <AddButton onClick={add} label="Add Profile" />
    </div>
  );
};

// ── Shared Components ──
const ItemCard = ({ children, onDelete }: { children: React.ReactNode; onDelete: () => void }) => (
  <div className="glass-premium p-6 rounded-2xl border-white/10 relative group mb-4">
    <button onClick={onDelete} className="absolute top-4 right-4 text-red-400 opacity-0 group-hover:opacity-100 transition-opacity hover:scale-125">
      <Trash2 size={16} />
    </button>
    {children}
  </div>
);

const AddButton = ({ onClick, label }: { onClick: () => void; label: string }) => (
  <button onClick={onClick} className="w-full py-4 border-2 border-dashed border-white/10 rounded-2xl flex items-center justify-center gap-3 text-xs font-black uppercase tracking-widest text-muted-foreground/60 hover:border-[#00ffff] hover:text-[#00ffff] transition-all bg-white/[0.01]">
    <Plus size={16} /> {label}
  </button>
);

const InputField = ({ label, value, onChange }: { label: string; value: string; onChange: (v: string) => void }) => (
  <div>
    <label className="block text-[9px] font-black uppercase tracking-[0.3em] mb-2 text-[#00ffff] ml-1">{label}</label>
    <input
      type="text"
      className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3.5 focus:border-[#00ffff]/50 outline-none transition-all text-sm font-medium placeholder:text-white/5"
      value={value}
      onChange={(e) => onChange(e.target.value)}
    />
  </div>
);

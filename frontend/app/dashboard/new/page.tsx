"use client";

import { Plus, Maximize, Smartphone, Monitor, Code } from "lucide-react";
import { useRouter } from "next/navigation";
import { useState } from "react";

export default function DraftsPage() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  const handleCreateFile = async (templateName: string = "Untitled") => {
    setLoading(true);
    try {
      const token = localStorage.getItem("token");
      
      // 1. Get or create a project
      const projRes = await fetch("http://localhost:5000/api/projects", {
        headers: { "Authorization": `Bearer ${token}` }
      });
      let projects = await projRes.json();
      
      let projectId;
      if (projects && projects.length > 0) {
        projectId = projects[0]._id;
      } else {
        const createProjRes = await fetch("http://localhost:5000/api/projects", {
          method: "POST",
          headers: { "Content-Type": "application/json", "Authorization": `Bearer ${token}` },
          body: JSON.stringify({ name: "My Workspace" })
        });
        const newProj = await createProjRes.json();
        projectId = newProj._id;
      }

      // 2. Create the file
      const fileRes = await fetch("http://localhost:5000/api/files", {
        method: "POST",
        headers: { "Content-Type": "application/json", "Authorization": `Bearer ${token}` },
        body: JSON.stringify({ name: templateName, projectId })
      });
      const newFile = await fileRes.json();

      // 3. Navigate to the dynamic canvas route
      router.push(`/canvas/${newFile._id}`);
    } catch (err) {
      console.error(err);
      alert("Failed to create file");
      setLoading(false);
    }
  };
  const templates = [
    { title: "Blank Canvas", desc: "Start from a clean slate", icon: Maximize, color: "text-blue-500", bg: "bg-blue-500/10" },
    { title: "Mobile App", desc: "iOS & Android ready", icon: Smartphone, color: "text-purple-500", bg: "bg-purple-500/10" },
    { title: "Web Dashboard", desc: "Admin interfaces", icon: Monitor, color: "text-emerald-500", bg: "bg-emerald-500/10" },
    { title: "Code Component", desc: "React/Next.js setup", icon: Code, color: "text-orange-500", bg: "bg-orange-500/10" },
  ];

  return (
    <div className="flex-1 w-full max-w-full">
      <div className="flex items-center px-6 h-14 border-b border-border/40 backdrop-blur-md sticky top-0 z-20">
        <h1 className="text-sm font-semibold text-foreground">Drafts & New</h1>
      </div>

      <div className="p-8 max-w-[1400px] mx-auto w-full">
        {/* Hero Create */}
        <div className="relative rounded-3xl bg-gradient-to-br from-primary/10 via-background to-accent/5 border border-border/50 p-10 mb-12 overflow-hidden flex items-center justify-between shadow-sm">
           <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-primary/10 blur-[100px] rounded-full mix-blend-screen pointer-events-none" />
           <div className="relative z-10 max-w-xl">
             <h2 className="text-4xl font-bold tracking-tight text-foreground mb-4">What will you design today?</h2>
             <p className="text-lg text-muted-foreground mb-8 text-balance">Choose a starting point or dive into a blank canvas. Your drafts are autosaved and private until you share them.</p>
             <button 
               onClick={() => handleCreateFile("Untitled")}
               disabled={loading}
               className="inline-flex items-center gap-2 bg-foreground hover:bg-foreground/90 text-background px-6 py-3 rounded-xl font-semibold transition-all duration-300 shadow-xl hover:-translate-y-1 disabled:opacity-50"
             >
               <Plus className="w-5 h-5" /> {loading ? "Creating..." : "Let's Go"}
             </button>
           </div>
        </div>

        <h3 className="text-lg font-semibold text-foreground mb-6">Start with a template</h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {templates.map((t, i) => (
            <button 
              key={i} 
              onClick={() => handleCreateFile(t.title)}
              disabled={loading}
              className="text-left group p-6 rounded-2xl bg-card border border-border/50 hover:border-primary/40 transition-all duration-300 shadow-sm hover:shadow-xl hover:-translate-y-1 cursor-pointer flex flex-col justify-between h-48 disabled:opacity-50"
            >
              <div className={`w-14 h-14 rounded-2xl ${t.bg} flex items-center justify-center mb-6 group-hover:scale-110 transition-transform shadow-sm`}>
                <t.icon className={`w-7 h-7 ${t.color}`} />
              </div>
              <div>
                <h4 className="font-semibold text-lg text-foreground mb-1 group-hover:text-primary transition-colors">{t.title}</h4>
                <p className="text-sm text-muted-foreground">{t.desc}</p>
              </div>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}

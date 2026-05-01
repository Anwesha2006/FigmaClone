"use client";

import { PlusSquare, FolderOpen, Star, MoreHorizontal, CheckCircle2, Share2, Zap } from "lucide-react";
import Link from "next/link";
import { useEffect, useState } from "react";
import { ShareDialog } from "@/src/components/ShareDialog";

export default function ProjectsPage() {
  const [projects, setProjects] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [shareDialogTarget, setShareDialogTarget] = useState<string | null>(null);
  const [filter, setFilter] = useState<"all" | "draft" | "published">("all");

  useEffect(() => {
    fetch("http://localhost:5000/api/projects", {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    })
      .then((res) => res.json())
      .then((data) => {
        const projectsArray = Array.isArray(data) ? data : [];
        // Sort projects by lastModified (most recent first)
        projectsArray.sort((a, b) => 
          new Date(b.lastModified || b.updatedAt).getTime() - 
          new Date(a.lastModified || a.updatedAt).getTime()
        );
        setProjects(projectsArray);
        setLoading(false);
      })
      .catch((err) => {
        console.error(err);
        setLoading(false);
      });
  }, []);

  const filteredProjects = projects.filter(p => {
    if(filter === "draft") return p.status === "draft";
    if(filter === "published") return p.status === "published";
    return true;
  });

  const draftProjects = projects.filter(p => p.status === "draft");
  const publishedProjects = projects.filter(p => p.status === "published");

  const handlePublish = async (projectId: string) => {
    try {
      const token = localStorage.getItem("token");
      const res = await fetch(`http://localhost:5000/api/projects/${projectId}/status`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${token}`,
        },
        body: JSON.stringify({ status: "published" }),
      });
      
      if (res.ok) {
        const updated = await res.json();
        setProjects(projects.map(p => p._id === projectId ? updated : p));
      }
    } catch (err) {
      console.error("Failed to publish project:", err);
    }
  };

  return (
    <div className="flex-1 w-full max-w-full">
      <div className="flex items-center justify-between px-6 h-14 border-b border-border/40 backdrop-blur-md sticky top-0 z-20 bg-background/80">
        <h1 className="text-sm font-semibold text-foreground">All Projects</h1>
      </div>

      <div className="p-8 max-w-[1400px] mx-auto w-full">
        {/* Header CTA */}
        <div className="flex items-center justify-between mb-10">
          <div>
             <h2 className="text-3xl font-bold tracking-tight text-foreground mb-2">Team Workspace</h2>
             <p className="text-muted-foreground text-sm">Manage all your folders and project files in one place.</p>
          </div>
          <Link href="/dashboard/new" className="hidden sm:flex items-center gap-2 bg-gradient-to-b from-primary to-primary/80 shadow-inner hover:brightness-110 text-primary-foreground px-4 py-2.5 rounded-xl font-medium text-sm transition-all duration-300">
            <PlusSquare className="w-4 h-4" />
            New Project
          </Link>
        </div>

        {/* Filter Tabs */}
        <div className="flex gap-3 mb-8">
          <button
            onClick={() => setFilter("all")}
            className={`px-4 py-2 rounded-lg font-medium text-sm transition-all ${
              filter === "all" 
                ? "bg-primary text-primary-foreground" 
                : "bg-secondary/50 text-muted-foreground hover:bg-secondary"
            }`}
          >
            All Projects ({projects.length})
          </button>
          <button
            onClick={() => setFilter("draft")}
            className={`px-4 py-2 rounded-lg font-medium text-sm transition-all flex items-center gap-2 ${
              filter === "draft" 
                ? "bg-primary text-primary-foreground" 
                : "bg-secondary/50 text-muted-foreground hover:bg-secondary"
            }`}
          >
            <Zap className="w-4 h-4" /> Drafts ({draftProjects.length})
          </button>
          <button
            onClick={() => setFilter("published")}
            className={`px-4 py-2 rounded-lg font-medium text-sm transition-all flex items-center gap-2 ${
              filter === "published" 
                ? "bg-primary text-primary-foreground" 
                : "bg-secondary/50 text-muted-foreground hover:bg-secondary"
            }`}
          >
            <CheckCircle2 className="w-4 h-4" /> Published ({publishedProjects.length})
          </button>
        </div>

        {/* Folders Loop */}
        {loading ? (
          <div className="flex justify-center p-10"><div className="animate-spin w-8 h-8 border-4 border-primary border-t-transparent rounded-full" /></div>
        ) : filteredProjects.length === 0 ? (
          <div className="text-center py-20 border border-dashed border-border rounded-xl">
             <p className="text-muted-foreground">
               {filter === "all" ? "No projects yet. Create your first workspace!" : `No ${filter} projects yet.`}
             </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredProjects.map((p, i) => (
              <div key={p._id || i} className="group relative rounded-2xl bg-card border border-border/50 p-6 hover:border-primary/40 transition-all duration-300 shadow-sm hover:shadow-lg hover:-translate-y-0.5 cursor-pointer">
                {/* Status Badge */}
                <div className="absolute top-4 left-4">
                  <span className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold ${
                    p.status === "draft" 
                      ? "bg-yellow-500/10 text-yellow-700 dark:text-yellow-400" 
                      : "bg-green-500/10 text-green-700 dark:text-green-400"
                  }`}>
                    {p.status === "draft" ? <Zap className="w-3 h-3" /> : <CheckCircle2 className="w-3 h-3" />}
                    {p.status === "draft" ? "Draft" : "Published"}
                  </span>
                </div>

                <div className="absolute top-4 right-4 opacity-0 group-hover:opacity-100 transition-opacity flex items-center gap-2">
                   <button 
                     onClick={(e) => { e.stopPropagation(); setShareDialogTarget(p._id); }}
                     className="text-muted-foreground hover:text-foreground p-1"
                     title="Share workspace"
                   ><Share2 className="w-4 h-4" /></button>
                   {p.status === "draft" && (
                     <button 
                       onClick={(e) => { e.stopPropagation(); handlePublish(p._id); }}
                       className="text-muted-foreground hover:text-green-500 p-1 transition-colors"
                       title="Publish project"
                     ><CheckCircle2 className="w-4 h-4" /></button>
                   )}
                   <button className="text-muted-foreground hover:text-foreground p-1"><MoreHorizontal className="w-4 h-4" /></button>
                </div>

                <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-primary/10 to-accent/10 border border-primary/20 flex items-center justify-center mb-5 group-hover:scale-110 transition-transform shadow-sm mt-6">
                  <FolderOpen className="w-6 h-6 text-primary" />
                </div>
                
                <h3 className="font-semibold text-lg text-foreground mb-1 group-hover:text-primary transition-colors">{p.name}</h3>
                <div className="flex items-center gap-3 text-xs font-medium text-muted-foreground">
                   <span>{p.members?.length || 1} members</span>
                   <span className="w-1 h-1 rounded-full bg-border"></span>
                   <span>{new Date(p.lastModified || p.updatedAt || p.createdAt).toLocaleDateString()}</span>
                </div>
              </div>
            ))}
          </div>
        )}

        <div className="mt-12">
            <h3 className="text-lg font-semibold text-foreground mb-6">Recent Deliverables</h3>
            <div className="bg-card border border-border/50 rounded-xl overflow-hidden shadow-sm">
               <table className="w-full text-sm text-left">
                  <thead className="bg-secondary/40 text-muted-foreground text-[11px] uppercase font-bold tracking-wider border-b border-border/50">
                     <tr>
                       <th className="px-6 py-4">Name</th>
                       <th className="px-6 py-4">Status</th>
                       <th className="px-6 py-4">Members</th>
                       <th className="px-6 py-4 text-right">Last Updated</th>
                     </tr>
                  </thead>
                  <tbody className="divide-y divide-border/30">
                     {filteredProjects.slice(0, 3).map(p => (
                        <tr key={p._id} className="hover:bg-secondary/20 transition-colors group cursor-pointer">
                           <td className="px-6 py-4 font-medium flex items-center gap-3 text-foreground group-hover:text-primary transition-colors">
                             <div className="w-8 h-8 rounded-lg bg-chart-2/10 flex items-center justify-center">
                               {p.status === "draft" ? <Zap className="w-4 h-4 text-yellow-500" /> : <CheckCircle2 className="w-4 h-4 text-green-500" />}
                             </div>
                             {p.name}
                           </td>
                           <td className="px-6 py-4">
                             <span className={`inline-flex items-center px-2 py-1 rounded text-xs font-medium ${
                               p.status === "draft" 
                                 ? "bg-yellow-500/10 text-yellow-700 dark:text-yellow-400" 
                                 : "bg-green-500/10 text-green-700 dark:text-green-400"
                             }`}>
                               {p.status === "draft" ? "Draft" : "Published"}
                             </span>
                           </td>
                           <td className="px-6 py-4">
                             <div className="flex -space-x-2">
                                <div className="w-6 h-6 rounded-full bg-chart-1 border-2 border-card shadow-sm z-20"></div>
                                <div className="w-6 h-6 rounded-full bg-chart-3 border-2 border-card shadow-sm z-10"></div>
                             </div>
                           </td>
                           <td className="px-6 py-4 text-muted-foreground text-right">{new Date(p.lastModified || p.updatedAt).toLocaleDateString()}</td>
                        </tr>
                     ))}
                  </tbody>
               </table>
            </div>
        </div>

      </div>

      {shareDialogTarget && (
        <ShareDialog
          isOpen={true}
          onClose={() => setShareDialogTarget(null)}
          projectId={shareDialogTarget}
        />
      )}
    </div>
  );
}

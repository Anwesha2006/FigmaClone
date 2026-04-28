"use client";

import { PlusSquare, FolderOpen, Star, MoreHorizontal, CheckCircle2, Share2 } from "lucide-react";
import Link from "next/link";
import { useEffect, useState } from "react";
import { ShareDialog } from "@/src/components/ShareDialog";

export default function ProjectsPage() {
  const [projects, setProjects] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [shareDialogTarget, setShareDialogTarget] = useState<string | null>(null);

  useEffect(() => {
    fetch("http://localhost:5000/api/projects", {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    })
      .then((res) => res.json())
      .then((data) => {
        setProjects(Array.isArray(data) ? data : []);
        setLoading(false);
      })
      .catch((err) => {
        console.error(err);
        setLoading(false);
      });
  }, []);

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

        {/* Folders Loop */}
        {loading ? (
          <div className="flex justify-center p-10"><div className="animate-spin w-8 h-8 border-4 border-primary border-t-transparent rounded-full" /></div>
        ) : projects.length === 0 ? (
          <div className="text-center py-20 border border-dashed border-border rounded-xl">
             <p className="text-muted-foreground">No projects yet. Create your first workspace!</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {projects.map((p, i) => (
              <div key={p._id || i} className="group relative rounded-2xl bg-card border border-border/50 p-6 hover:border-primary/40 transition-all duration-300 shadow-sm hover:shadow-lg hover:-translate-y-0.5 cursor-pointer">
                <div className="absolute top-4 right-4 opacity-0 group-hover:opacity-100 transition-opacity flex items-center gap-2">
                   <button 
                     onClick={(e) => { e.stopPropagation(); setShareDialogTarget(p._id); }}
                     className="text-muted-foreground hover:text-foreground p-1"
                     title="Share workspace"
                   ><Share2 className="w-4 h-4" /></button>
                   <button className="text-muted-foreground hover:text-foreground p-1"><MoreHorizontal className="w-4 h-4" /></button>
                </div>

                <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-primary/10 to-accent/10 border border-primary/20 flex items-center justify-center mb-5 group-hover:scale-110 transition-transform shadow-sm">
                  <FolderOpen className="w-6 h-6 text-primary" />
                </div>
                
                <h3 className="font-semibold text-lg text-foreground mb-1 group-hover:text-primary transition-colors">{p.name}</h3>
                <div className="flex items-center gap-3 text-xs font-medium text-muted-foreground">
                   <span>{p.members?.length || 1} members</span>
                   <span className="w-1 h-1 rounded-full bg-border"></span>
                   <span>{new Date(p.updatedAt || p.createdAt).toLocaleDateString()}</span>
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
                     {[1,2,3].map(i => (
                        <tr key={i} className="hover:bg-secondary/20 transition-colors group cursor-pointer">
                           <td className="px-6 py-4 font-medium flex items-center gap-3 text-foreground group-hover:text-primary transition-colors">
                             <div className="w-8 h-8 rounded-lg bg-chart-2/10 flex items-center justify-center">
                               <CheckCircle2 className="w-4 h-4 text-chart-2" />
                             </div>
                             Final Review UI {i}
                           </td>
                           <td className="px-6 py-4">
                             <span className="inline-flex items-center px-2 py-1 rounded bg-green-500/10 text-green-500 text-xs font-medium border border-green-500/20">In Progress</span>
                           </td>
                           <td className="px-6 py-4">
                             <div className="flex -space-x-2">
                                <div className="w-6 h-6 rounded-full bg-chart-1 border-2 border-card shadow-sm z-20"></div>
                                <div className="w-6 h-6 rounded-full bg-chart-3 border-2 border-card shadow-sm z-10"></div>
                             </div>
                           </td>
                           <td className="px-6 py-4 text-muted-foreground text-right">Oct {14 + i}, 2026</td>
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
